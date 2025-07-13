import { _ceil, _floor, _min, _round }   from "../d_utl/F_Math";
import { T_MakeEnumType }                from "../d_utl/T_MakeEnumType";
import { C_Hero }                        from "../d_mdl/C_Hero";
import { C_CtlCursor }                   from "../d_ctl/C_CtlCursor";
import { get_new_hero }                  from '../d_cmn/F_load_and_save';
import { _alert, g_mes }                 from "../d_cmn/global";

import { act_guld_menu }                 from "./F_guild_menu";
import { hero_info_clear, hero_info_create, hero_info_form_set }   from "./F_hero_menu";
import { g_mvm, g_team, g_guld, g_ctls, g_vsw } from "./global_for_guild";

let dom_team_fields : HTMLFieldSetElement;
let dom_team_list:    HTMLUListElement;

let dom_guld_fields : HTMLFieldSetElement;
let dom_guld_list:    HTMLUListElement;

let dom_appd_fields : HTMLFieldSetElement;
let dom_appd_list:    HTMLUListElement;

let dom_menu_fields : HTMLFieldSetElement;
let dom_menu_list:    HTMLUListElement;

let dom_inpt_fields : HTMLFieldSetElement;
let dom_inpt_list:    HTMLUListElement;

let dom_hero_fields : HTMLFieldSetElement;
let dom_hero_detail : HTMLUListElement;

let team_list: C_Hero[];
let guld_list: C_Hero[];
let appd_list: C_Hero[];
let hero_detail: {[key: string]: HTMLLIElement};

let new_hres: C_Hero[] = [];

type T_menu_list = {id: string, title: string, fnc: ()=>void}[];
let menu_list_for_team: T_menu_list;
let menu_list_for_guld: T_menu_list;
let menu_list_for_appd: T_menu_list;

let inpt_name_list: {[id: string]: {id: string, label: HTMLLabelElement, input: HTMLInputElement}};

const T_TGA_mode: {[kind: string]: number}  = {
    Hide: 0,
    Team: 1,
    Guld: 2,
    Appd: 3,
} as const;
type T_TGA_mode = T_MakeEnumType<typeof T_TGA_mode>;
let TGA_mode: T_TGA_mode;

const T_SubView: {[kind: string]: number}  = {
    Hide: 0,
    Team: 1,
    Guld: 2,
    Appd: 3,
    Menu: 5,
    MnCk: 6,
    IpNm: 7,
    IpCk: 8,
} as const;
type T_SubView = T_MakeEnumType<typeof T_SubView>;


type T_cursor = {kind: T_SubView, crsr: C_CtlCursor}
let cursor: T_cursor; 
let cursor_Hide: T_cursor;
let cursor_Team: T_cursor;
let cursor_Guld: T_cursor;
let cursor_Appd: T_cursor;
let cursor_Menu: T_cursor;

let mode    = 'view';

export function init_hres_menu(): void {
    init_all(); 
    return;
}

export function act_hres_menu(): void {
    mode    = 'view';
    update_all().then(()=>{ 
        if (exist_data()) {
            g_ctls.act(ctls_hres_nor);
            g_vsw.view(g_vsw.Hres());
            display_default_message(); 
        } else {
            act_guld_menu();
        }
    }); 
    return;
}

function exist_data(): boolean {
    return exist_team() ||  exist_guld() || exist_appd();
}


async function init_all(): Promise<boolean> { 
    mode = 'view'; 
    if (!init_data()) return false; 
    if (!init_view()) return false; 
    if (!init_ctls()) return false; 
    return true; 
}

async function update_all(): Promise<void> {
    return await update_data_list().then(()=>{
        start_TGA();
        update_view();
        update_ctls();
    });
}

function start_TGA(): boolean {
    if (exist_team()) { 
        TGA_mode = T_TGA_mode.Team;
    }
    else if (exist_guld()) { 
        TGA_mode = T_TGA_mode.Guld;
    }
    else if (exist_appd()) { 
        TGA_mode = T_TGA_mode.Appd;
    }
    else { 
        TGA_mode = T_TGA_mode.Hide;
    } 
    return true;
}

// ******************************
// モデル関係
// ******************************

function init_data(): boolean { 
    if (!init_team_list()) return false; 
    if (!init_guld_list()) return false; 
    if (!init_appd_list()) return false; 
    if (!init_menu_list()) return false; 
    return true;
}

function init_team_list(): boolean { 
    team_list = [];
    return true;
}
function init_guld_list(): boolean { 
    guld_list = [];
    return true;
}
function init_appd_list(): boolean { 
    appd_list = [];
    return true;
}
function init_menu_list():boolean { 
    menu_list_for_team = [
        {id: 'name',  fnc: _go_ipnm, title: '名前を変える'},
        {id: 'leav',  fnc: _go_leav, title: 'チームから外す'},
    ];
    menu_list_for_guld = [
        {id: 'name',  fnc: _go_ipnm, title: '名前を変える'},
        {id: 'join',  fnc: _go_join, title: 'チームに入れる'},
        {id: 'fire',  fnc: _go_fire, title: 'ギルドをクビにする'},
    ]; 
    menu_list_for_appd = [
        {id: 'name',  fnc: _go_ipnm, title: '名前を変える'},
        {id: 'adpt',  fnc: _go_adpt, title: 'ギルドに採用する'},
        {id: 'away',  fnc: _go_away, title: '追い返す！'},
    ]; 
    return true;
}
function _go_ipnm(): void {
    subview_act(T_SubView.IpNm);
    mode = 'ipnm';
    display_default_message();
    g_ctls.act(ctls_hres_ipnm);

    inpt_name_list['hres_name_li'].input.focus({preventScroll: false});
}
function _go_leav(): void {
    if (!exist_team()) return;
    if (max_of_guld()) {
        g_mvm.notice_message('ギルドが満員です。誰かクビにしてください');
        return;
    }
    subview_act(T_SubView.MnCk);
    mode = 'leav';
    display_default_message();
    g_ctls.act(ctls_hres_leav);
}
function _go_join(): void {
    if (!exist_guld()) return;
    if (max_of_team()) {
        g_mvm.notice_message('チームが満員です。誰か外してください');
        return;
    }
    subview_act(T_SubView.MnCk);
    mode = 'join';
    display_default_message();
    g_ctls.act(ctls_hres_join);
}
function _go_fire(): void {
    if (!exist_guld()) return;

    subview_act(T_SubView.MnCk);
    mode = 'fire';
    display_default_message();
    g_ctls.act(ctls_hres_fire);
}
function _go_adpt(): void {
    if (!exist_appd()) return;
    if (max_of_guld()) {
        g_mvm.notice_message('ギルドが満員です。誰かクビにしてください');
        return;
    }

    subview_act(T_SubView.MnCk);
    mode = 'adpt';
    display_default_message();
    g_ctls.act(ctls_hres_adpt);
}
function _go_away(): void {
    if (!exist_appd()) return;

    subview_act(T_SubView.MnCk);
    mode = 'away';
    display_default_message();
    g_ctls.act(ctls_hres_away);
}


async function update_data_list(): Promise<void> { 
    return await update_appd_list().then(()=>{
        update_team_list(); 
        update_guld_list(); 
        update_menu_list(); 
    }); 
}

function update_team_list(): void { 
    team_list = []; 
    for (let hero of g_team.hres()) team_list.push(hero);
}
function exist_team(): boolean {
    return team_list.length > 0;
}
function max_of_team(): boolean {
    return team_list.length > 3;
}

function update_guld_list(): void {
    guld_list = []; 
    for (let hero of g_guld.hres()) guld_list.push(hero);
}
function exist_guld(): boolean {
    return guld_list.length > 0;
}
function max_of_guld(): boolean {
    return guld_list.length > 99;
}

async function update_appd_list(): Promise<void> {
//    appd_list = [];
    if (appd_list.length < 1) return await _get_appd_list();
    return;
}
async function _get_appd_list(): Promise<void> {
    return get_new_hero(8)?.then((jsonObj:any)=>{
        if (jsonObj.hres === undefined) {
            g_mes.warning_message('不正なデータを受信しました' + jsonObj.emsg);
            _alert(jsonObj.emsg);
            return;
        }
        for (let hero_data of jsonObj.hres) {
            appd_list.push(new C_Hero(hero_data));
        }
    });
}
function exist_appd(): boolean {
    return appd_list.length > 0;
}
function max_of_appd(): boolean {
    return appd_list.length > 99;
}

function update_menu_list(): void {}
function exist_menu(): boolean {
    return _min([menu_list_for_team.length, menu_list_for_guld.length, menu_list_for_appd.length]) > 0;
}



// ******************************
// ビュー関係
// ******************************

function init_view(): boolean { 
    if (!init_dom_team_list()) return false; 
    if (!init_dom_guld_list()) return false; 
    if (!init_dom_appd_list()) return false; 
    if (!init_dom_menu_list()) return false; 
    if (!init_dom_inpt_list()) return false; 

    if (!init_cursor())          return false; 
    if (!init_dom_hero_detail()) return false; 
    return true;
}

function update_view() {
    update_dom_team_list();
    update_dom_guld_list();
    update_dom_appd_list();
    update_dom_menu_list();
//    update_dom_inpt_list();

    update_cursor();
    update_dom_hero_detail();
}

function clear_view() {
    clear_dom_team_list();
    clear_dom_guld_list();
    clear_dom_appd_list();
    clear_dom_menu_list();
    clear_dom_inpt_list();
    clear_dom_hero_detail();
}

// ******************************
// チームリスト表示　関係
// ******************************

function init_dom_team_list(): boolean {
    //パーティ情報
    try {
        dom_team_fields = document.getElementById('hres_team_fields') as HTMLFieldSetElement;
        dom_team_list   = document.getElementById('team_list')        as HTMLUListElement;
    } catch(err) {
        return false;
    }
    if (dom_team_fields === null) return false;
    if (dom_team_list   === null) return false;

    dom_team_fields.style.display = 'none';
    return true;
}
function update_dom_team_list():void {
    clear_dom_team_list();
    for (let ii in team_list) {
        const li = document.createElement('li') as HTMLLIElement;
        li.innerHTML = `${team_list[ii].name()}<p></p>`;

        li.id = ii.toString();
        li.addEventListener("click", _OK_team_Fnc, false);
        dom_team_list.appendChild(li);
    }
//    cursor_Team.crsr.set(dom_team_list); 
}
function _OK_team_Fnc(this: HTMLLIElement, e: MouseEvent): void {
    subview_act(T_SubView.Team);
    cursor.crsr.set_pos(Number(this.id)); 
    update_dom_hero_detail();

    isOK();
//    display_default_message();
}

function clear_dom_team_list(): void {
    while (dom_team_list.firstChild !== null) {
        dom_team_list.removeChild(dom_team_list.firstChild);
    }
}


// ******************************
// 冒険者リスト表示　関係
// ******************************

function init_dom_guld_list(): boolean {
    // 冒険者情報
    try {
        dom_guld_fields = document.getElementById('hres_guld_fields') as HTMLFieldSetElement;
        dom_guld_list   = document.getElementById('guld_list')        as HTMLUListElement;
    } catch (err) {
        return false;
    }
    if (dom_guld_fields === null) return false;
    if (dom_guld_list   === null) return false;

    dom_guld_fields.style.display = 'none';
    return true;

}
function update_dom_guld_list(): void {
    clear_dom_guld_list();
    for (let ii in guld_list) {
        const li = document.createElement('li') as HTMLLIElement;
        li.innerHTML = `${guld_list[ii].name()}<p></p>`;

        li.id = ii.toString();
        li.addEventListener("click", _OK_guld_Fnc, false);
        dom_guld_list.appendChild(li);
    }
}
function _OK_guld_Fnc(this: HTMLLIElement, e: MouseEvent): void {
    subview_act(T_SubView.Guld);
    cursor.crsr.set_pos(Number(this.id)); 
    update_dom_hero_detail();

    isOK();
//    display_default_message();
}

function clear_dom_guld_list():void  {
    while (dom_guld_list.firstChild !== null) {
        dom_guld_list.removeChild(dom_guld_list.firstChild);
    }
}


// ******************************
// 新人募集リスト表示　関係
// ******************************

function init_dom_appd_list(): boolean {
    // 冒険者情報
    try {
        dom_appd_fields = document.getElementById('hres_appd_fields') as HTMLFieldSetElement;
        dom_appd_list   = document.getElementById('appd_list')        as HTMLUListElement;
    } catch (err) {
        return false;
    }
    if (dom_appd_fields === null) return false;
    if (dom_appd_list   === null) return false;

    dom_appd_fields.style.display = 'none';
    return true;

}
function update_dom_appd_list(): void {
    clear_dom_appd_list();
    for (let ii in appd_list) {
        const li = document.createElement('li') as HTMLLIElement;
        li.innerHTML = `${appd_list[ii].name()}<p></p>`;

        li.id = ii.toString();
        li.addEventListener("click", _OK_appd_Fnc, false);
        dom_appd_list.appendChild(li);
    }
}
function _OK_appd_Fnc(this: HTMLLIElement, e: MouseEvent): void {
    subview_act(T_SubView.Appd);
    cursor.crsr.set_pos(Number(this.id)); 
    update_dom_hero_detail();

    isOK();
}

function clear_dom_appd_list():void  {
    while (dom_appd_list.firstChild !== null) {
        dom_appd_list.removeChild(dom_appd_list.firstChild);
    }
}


// ******************************
// サブメニュー表示　関係
// ******************************

function init_dom_menu_list(): boolean {
    // コマンド情報
    try {
        dom_menu_fields = document.getElementById('hres_menu_fields') as HTMLFieldSetElement;
        dom_menu_list   = document.getElementById('menu_list')        as HTMLUListElement;
    } catch (err) {
        return false;        
    }
    if (dom_menu_fields === null) return false;
    if (dom_menu_list   === null) return false;

    dom_menu_fields.style.display = 'none';
    return true;
}
function update_dom_menu_list(): void {
    clear_dom_menu_list();

    let menu_list: T_menu_list;
    switch (TGA_mode) {
        case T_TGA_mode.Team: menu_list = menu_list_for_team;break;
        case T_TGA_mode.Guld: menu_list = menu_list_for_guld;break;
        case T_TGA_mode.Appd: menu_list = menu_list_for_appd;break;
        default: return;
    }
    for (let ii in menu_list) {
        const li = document.createElement('li') as HTMLLIElement;
        li.innerHTML = `${menu_list[ii].title}<p></p>`;

        li.id = ii.toString();
        li.addEventListener("click", _OK_menu_Fnc, false);
        dom_menu_list.appendChild(li);
    }
}
function _OK_menu_Fnc(this: HTMLLIElement, e: MouseEvent): void {
    cursor = cursor_Menu;
    subview_act(T_SubView.Menu);
    cursor.crsr.set_pos(Number(this.id)); 

    do_menu();
}

function clear_dom_menu_list(): void {
    while (dom_menu_list.firstChild !== null) {
        dom_menu_list.removeChild(dom_menu_list.firstChild);
    }
}


// ******************************
// 入力欄の表示　関係
// ******************************

function init_dom_inpt_list(): boolean {
    // コマンド情報
    try {
        dom_inpt_fields = document.getElementById('hres_inpt_fields') as HTMLFieldSetElement;
        dom_inpt_list   = document.getElementById('inpt_list')        as HTMLUListElement;
    } catch (err) {
        return false;        
    }
    if (dom_inpt_fields === null) return false;
    if (dom_inpt_list   === null) return false;

    if (!_init_dom_ipnm())   return false;

    dom_inpt_fields.style.display = 'none';
    return true;
}
function _init_dom_ipnm(): boolean {
    inpt_name_list = {};
    
    const name_input     = document.createElement('input') as HTMLInputElement;
    name_input.id        = 'hres_name_inpt';
    name_input.type      = 'text';
    name_input.name      = 'name';
    name_input.value     = '';
    name_input.minLength = 3;
    name_input.maxLength = 30;
    name_input.size      = name_input.maxLength;

    const name_label     = document.createElement('label') as HTMLLabelElement;
    name_label.id        = 'hres_name_label';
    name_label.htmlFor   = name_input.id;
    name_label.innerHTML = '新しい名前: ';

    const li = {id: 'hres_name_li', label: name_label, input: name_input};
    inpt_name_list[li.id] = li;

    return true;
}

function update_dom_inpt_list(): void {
    clear_dom_inpt_list();
    update_dom_ipnm();
}
function update_dom_ipnm(): void {
    const name_label = inpt_name_list['hres_name_li'].label;
    const name_input = inpt_name_list['hres_name_li'].input;

    switch (TGA_mode) {
        case T_TGA_mode.Team: 
            name_input.value = team_list[cursor_Team.crsr.pos()].name();
            break;
        case T_TGA_mode.Guld: 
            name_input.value = guld_list[cursor_Guld.crsr.pos()].name();
            break;
        case T_TGA_mode.Appd: 
            name_input.value = appd_list[cursor_Appd.crsr.pos()].name();
            break;
        default: return;
    }

    const li = document.createElement('li') as HTMLLIElement;
    li.appendChild(name_label);
    li.appendChild(name_input);
    dom_inpt_list.appendChild(li);

    name_input.setAttribute('autocomplete', 'name');
    name_input.focus({preventScroll: false});
}

function clear_dom_inpt_list(): void {
    while (dom_inpt_list.firstChild !== null) {
        dom_inpt_list.removeChild(dom_inpt_list.firstChild);
    }
}


// ******************************
// 冒険者詳細情報の表示　関係
// ******************************

function init_dom_hero_detail(): boolean {
    // 冒険者詳細情報
    try {
        dom_hero_fields = document.getElementById('hres_hero_fields') as HTMLFieldSetElement;
        dom_hero_detail = document.getElementById('hres_hero_info')   as HTMLUListElement;
    } catch (err) {
        return false;
    }
    if (dom_hero_fields === null) return false;
    if (dom_hero_detail === null) return false;

    return true;
}

function update_dom_hero_detail() {
    hero_detail = hero_info_create(dom_hero_detail);
    switch (TGA_mode) {
        case T_TGA_mode.Team:
            hero_info_form_set(team_list, hero_detail, cursor_Team.crsr.pos());
            break;
        case T_TGA_mode.Guld:
            hero_info_form_set(guld_list, hero_detail, cursor_Guld.crsr.pos());
            break;
        case T_TGA_mode.Appd:
            hero_info_form_set(appd_list, hero_detail, cursor_Appd.crsr.pos());
            break;
    }
}

function clear_dom_hero_detail() {
    hero_info_clear(dom_hero_detail);
}


// ******************************
// リスト表示のカーソル　関係
// ******************************

function init_cursor(): boolean {
    cursor_Hide = {kind: T_SubView.Hide, crsr: C_CtlCursor.getObj(undefined)}; 
    cursor_Team = {kind: T_SubView.Team, crsr: C_CtlCursor.getObj(dom_team_list)}; 
    cursor_Guld = {kind: T_SubView.Guld, crsr: C_CtlCursor.getObj(dom_guld_list)}; 
    cursor_Appd = {kind: T_SubView.Appd, crsr: C_CtlCursor.getObj(dom_appd_list)}; 
    cursor_Menu = {kind: T_SubView.Menu, crsr: C_CtlCursor.getObj(dom_menu_list)}; 
    return true;
}

function update_cursor(): boolean {
    if (!reset_cursor())           return false; 
    if (!start_cursor())           return false; 
    return true;
}

function reset_cursor(): boolean {
    cursor_Team.crsr.set(dom_team_list);
    cursor_Guld.crsr.set(dom_guld_list);
    cursor_Appd.crsr.set(dom_appd_list);
    cursor_Menu.crsr.set(dom_menu_list);
    return true;
}
function start_cursor(): boolean {
    switch (TGA_mode) { 
        case T_TGA_mode.Team: cursor  = cursor_Team; break;
        case T_TGA_mode.Guld: cursor  = cursor_Guld; break;
        case T_TGA_mode.Appd: cursor  = cursor_Appd; break;
        default:              cursor  = cursor_Hide; return false;
    }
    return true;
}


// ******************************
// コントロール　関係
// ******************************

// カーソルやイベントの初期化
function init_ctls(): boolean { 
    if (!init_default_ctls()) return false;
    return true;
}
function init_default_ctls(): boolean {
    try {
        if (!g_ctls.set(ctls_hres_nor))  return false;
        if (!g_ctls.set(ctls_hres_rtn))  return false;
        if (!g_ctls.set(ctls_hres_ipnm)) return false;
        if (!g_ctls.set(ctls_hres_cknm)) return false;
        if (!g_ctls.set(ctls_hres_leav)) return false;
        if (!g_ctls.set(ctls_hres_join)) return false;
        if (!g_ctls.set(ctls_hres_fire)) return false;
        if (!g_ctls.set(ctls_hres_adpt)) return false;
        if (!g_ctls.set(ctls_hres_away)) return false;
    } catch (err) {
        return false;
    }
    return true;
}
const ctls_hres_rtn = {
    name: 'hres_rtn', 
    isOK:  isRT,
    isNG:  isRT,
    cpOK:  isRT,
    cpNG:  isRT,
    isRT:  isRT,
    cpRT:  isRT,
}
const ctls_hres_nor = {
    name: 'hres_nor', 
    do_U:  do_U,
    do_D:  do_D,
    do_L:  do_L,
    do_R:  do_R,
    isOK:  isOK,
    isNG:  isNG,
    isSL:  isSL,
    isRT:  isRT,
    cpOK:  isOK,
    cpNG:  isNG,
    cpSL:  isSL,
    cpRT:  isRT,
}
const ctls_hres_ipnm = {
    name: 'hres_ipnm', 
    isOK:  isOK_ipnm,
    isNG:  isNG_chek,
    cpOK:  isOK_ipnm,
    cpNG:  isNG_chek,
}
const ctls_hres_cknm = {
    name: 'hres_cknm', 
    isOK:  isOK_cknm,
    isNG:  isNG_cknm,
    cpOK:  isOK_cknm,
    cpNG:  isNG_cknm,
}
const ctls_hres_leav = {
    name: 'hres_leav', 
    isOK:  isOK_leav,
    isNG:  isNG_chek,
    cpOK:  isOK_leav,
    cpNG:  isNG_chek,
}
const ctls_hres_join = {
    name: 'hres_join', 
    isOK:  isOK_join,
    isNG:  isNG_chek,
    cpOK:  isOK_join,
    cpNG:  isNG_chek,
}
const ctls_hres_fire = {
    name: 'hres_fire', 
    isOK:  isOK_fire,
    isNG:  isNG_chek,
    cpOK:  isOK_fire,
    cpNG:  isNG_chek,
}
const ctls_hres_adpt = {
    name: 'hres_adpt', 
    isOK:  isOK_adpt,
    isNG:  isNG_chek,
    cpOK:  isOK_adpt,
    cpNG:  isNG_chek,
}
const ctls_hres_away = {
    name: 'hres_away', 
    isOK:  isOK_away,
    isNG:  isNG_chek,
    cpOK:  isOK_away,
    cpNG:  isNG_chek,
}


function update_ctls(): boolean { 
    if (!subview_hide_all())       return false; 
    if (!subview_act(cursor.kind)) return false; 
    return true;
}

// **********************************
// サブ・リスト表示の切り替え関係
// **********************************
function subview_hide_all(): boolean {
    dom_team_fields.style.display = 'none';
    dom_guld_fields.style.display = 'none';
    dom_appd_fields.style.display = 'none';
    dom_menu_fields.style.display = 'none';
    dom_inpt_fields.style.display = 'none';
    return true;
}

function subview_act(sview: T_SubView): boolean {
//    clear_dom_menu_list();

    switch (sview) {
        case T_SubView.Team: subview_act_team();break;
        case T_SubView.Guld: subview_act_guld();break;
        case T_SubView.Appd: subview_act_appd();break;
        case T_SubView.Menu: subview_act_menu();break;
        case T_SubView.MnCk: subview_act_mnck();break;
        case T_SubView.IpNm: subview_act_ipnm();break;
        case T_SubView.IpCk: subview_act_ipck();break;
        case T_SubView.Hide: subview_hide_all();break;
        default:             subview_hide_all();return false;
    }
    cursor.crsr.high_light_on();
    return true;
} 

function subview_act_team() {
    subview_hide_all();
    cursor  = cursor_Team;

    update_view();
    dom_team_fields.style.display = 'block';
}

function subview_act_guld() {
    subview_hide_all();
    cursor  = cursor_Guld;

    update_view();
    dom_guld_fields.style.display = 'block';
}

function subview_act_appd() { 
    subview_hide_all();
    cursor  = cursor_Appd;

    update_view();
    dom_appd_fields.style.display = 'block';
}

function subview_act_menu() {
    clear_dom_inpt_list();
    dom_inpt_fields.style.display = 'none';

    cursor  = cursor_Menu; 
    cursor.crsr.set_pos(0);

    update_dom_menu_list();
    dom_menu_fields.style.display = 'block';
}    

function subview_act_mnck() {
    dom_inpt_fields.style.display = 'none';
}    

function subview_act_ipnm() {
    update_dom_inpt_list();
    dom_inpt_fields.style.display = 'block';
}    

function subview_act_ipck() {
    update_dom_inpt_list();
    dom_inpt_fields.style.display = 'block';
}    


// カーソルの移動と決定・解除
function do_U(): void {
    cursor.crsr.pos_U(); 
    update_dom_hero_detail(); 
    display_default_message();
}
function do_D(): void {
    cursor.crsr.pos_D(); 
    update_dom_hero_detail(); 
    display_default_message();
}
function do_L(): void {
    cursor.crsr.pos_L(); 
    update_dom_hero_detail(); 
    display_default_message();
}
function do_R(): void {
    cursor.crsr.pos_R(); 
    update_dom_hero_detail(); 
    display_default_message();
}


// **************************************
// 決定ボタン・キャンセルボタン・切替ボタン
// **************************************


function isOK(): void { 
    switch (cursor.kind) {
        case T_SubView.Team:
            mode = 'menu';
            subview_act(T_SubView.Menu);
            display_default_message();
            break;
        case T_SubView.Guld:
            mode = 'menu';
            subview_act(T_SubView.Menu);
            display_default_message();
            break;
        case T_SubView.Appd:
            mode = 'menu';
            subview_act(T_SubView.Menu);
            display_default_message();
            break;
        case T_SubView.Menu:
            do_menu();
            break;
    }
}
function do_menu(): void {
    let menu_list: T_menu_list;
    switch (TGA_mode) {
        case T_TGA_mode.Team: menu_list = menu_list_for_team; break;
        case T_TGA_mode.Guld: menu_list = menu_list_for_guld; break;
        case T_TGA_mode.Appd: menu_list = menu_list_for_appd; break;
        default: return;
    }
    menu_list[cursor_Menu.crsr.pos()].fnc();
}


function isOK_ipnm(): void {
    mode = 'cknm';

    g_ctls.act(ctls_hres_cknm);
    display_default_message();
}

function isOK_cknm(): void {
    switch (TGA_mode) {
        case T_TGA_mode.Team: 
            change_hero_name(team_list[cursor_Team.crsr.pos()]); 
            subview_act(T_SubView.Team);
            break;
        case T_TGA_mode.Guld: 
            change_hero_name(guld_list[cursor_Guld.crsr.pos()]); 
            subview_act(T_SubView.Guld);
            break;
        case T_TGA_mode.Appd: 
            change_hero_name(appd_list[cursor_Appd.crsr.pos()]); 
            subview_act(T_SubView.Appd);
            break;
    };
    clear_dom_inpt_list();
    go_back_view_mode('改名しました');
}

function isOK_leav(): void {
    const hero = team_list[cursor_Team.crsr.pos()];

    g_guld.add_hero(hero);
    g_team.rmv_hero(hero);
    update_data_list().then(()=>{
        if (!exist_team()) isSL();

        cursor_Team.crsr.set_pos(0);
        go_back_view_mode('チームから外しました');
    });
}

function isOK_join(): void {
    const hero = guld_list[cursor_Guld.crsr.pos()];

    g_team.add_hero(hero);
    g_guld.rmv_hero(hero);
    update_data_list().then(()=>{
        if (!exist_guld()) isSL();

        cursor_Guld.crsr.set_pos(0);
        go_back_view_mode('チームに入れました');
    });
}

function isOK_fire(): void {
    g_guld.rmv_hero(guld_list[cursor_Guld.crsr.pos()]);
    update_data_list().then(()=>{
        if (!exist_guld()) isSL();

        cursor_Guld.crsr.set_pos(0);
        go_back_view_mode('クビにしました。。。');
    });
}

function isOK_adpt(): void {
    const hero = appd_list[cursor_Appd.crsr.pos()];

    g_guld.add_hero(hero);
    appd_list.splice(cursor_Appd.crsr.pos(), 1);
    update_data_list().then(()=>{
        cursor_Appd.crsr.set_pos(0);
        go_back_view_mode('ギルドに採用しました');
    });
}

function isOK_away(): void {
    const hero = appd_list[cursor_Appd.crsr.pos()];

    appd_list.splice(cursor_Appd.crsr.pos(), 1);
    update_data_list().then(()=>{
        cursor_Appd.crsr.set_pos(0);
        go_back_view_mode('叩き出しました。。。');
    });
}

function go_back_view_mode(msg: string): void {
    mode = 'view';
    switch (TGA_mode) {
        case T_TGA_mode.Team: 
            subview_act(T_SubView.Team);
            break;
        case T_TGA_mode.Guld: 
            subview_act(T_SubView.Guld);
            break;
        case T_TGA_mode.Appd: 
            subview_act(T_SubView.Appd);
            break;
    }
    g_ctls.act(ctls_hres_nor);
    g_mvm.normal_message(msg);
}

function change_hero_name(hero: C_Hero): void {
    let inpt_name: HTMLInputElement;
    try {
        inpt_name = document.getElementById('hres_name_inpt') as HTMLInputElement;
    } catch (err) {
        return;
    }
    if (inpt_name == null) return;

    hero.set_name(inpt_name.value);
}


function isNG(): void {
    switch (cursor.kind) {
        case T_SubView.Team:
            isRT();
            break;
        case T_SubView.Guld:
            isRT();
            break;
        case T_SubView.Appd:
            isRT();
            break;
        case T_SubView.Menu:
            mode = 'view';
            switch (TGA_mode) {
                case T_TGA_mode.Team: subview_act(T_SubView.Team); break;
                case T_TGA_mode.Guld: subview_act(T_SubView.Guld); break;
                case T_TGA_mode.Appd: subview_act(T_SubView.Appd); break;
            }
            clear_dom_menu_list();
            display_default_message();
            break;
    }
}
function isNG_chek(): void {
    mode = 'menu';
    subview_act(T_SubView.Menu);
    g_ctls.act(ctls_hres_nor);
    display_default_message();
}
function isNG_cknm(): void {
    isNG_chek();
    clear_dom_inpt_list();
}

function isSL(): void {
    g_mvm.clear_message();
    switch (TGA_mode) {
        case T_TGA_mode.Team:
            if (exist_guld()) {
                TGA_mode = T_TGA_mode.Guld;
                break;
            }
            TGA_mode = T_TGA_mode.Appd;
            break;
        case T_TGA_mode.Guld:
            TGA_mode = T_TGA_mode.Appd;
            break;
        case T_TGA_mode.Appd:
            if (exist_team()) {
                TGA_mode = T_TGA_mode.Team;
                break;
            }
            if (exist_guld()) {
                TGA_mode = T_TGA_mode.Guld;
                break;
            }
            break;
    }
    subview_act(TGA_mode);
    display_default_message();
}
function isRT(): void {
    g_mvm.clear_message();
    go_back_guld_menu();
}


function display_default_message(): void {
    switch (mode) {
        case 'view':
            g_mvm.normal_message('冒険者を指名してください');
            break;
        case 'menu':
            g_mvm.normal_message('どうしますか？');
            break;
        case 'ipnm':
            g_mvm.normal_message('新しい名前を入力してください');
            break;
        case 'cknm':
            g_mvm.normal_message('この名前でよろしいですか？');
            break;
        case 'join':
            g_mvm.normal_message('チームに加えますか？');
            break;
        case 'leav':
            g_mvm.normal_message('チームから外しますか？');
            break;
        case 'fire':
            g_mvm.notice_message('ギルドをクビにしますか？クビにしたメンバーは復帰できません');
            break;
        case 'adpt':
            g_mvm.notice_message('ギルドに採用しますか？');
            break;
        case 'away':
            g_mvm.notice_message('応募者を追い返しますか？追い返したメンバーは復帰できません');
            break;
        default:
            g_mvm.clear_message();
            break;
    }
}

function go_back_guld_menu() {
    clear_view();
    g_ctls.deact();
    act_guld_menu();
}
