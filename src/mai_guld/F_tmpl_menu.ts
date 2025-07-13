import { _ceil, _floor, _min, _round }   from "../d_utl/F_Math";
import { T_MakeEnumType }                from "../d_utl/T_MakeEnumType";
import { C_Hero }                        from "../d_mdl/C_Hero";
import { C_CtlCursor }                   from "../d_ctl/C_CtlCursor";
import { get_new_hero }                  from '../d_cmn/F_load_and_save';
import { _alert, g_mes }                 from "../d_cmn/global";

import { act_guld_menu }                 from "./F_guild_menu";
import { hero_info_clear, hero_info_create, hero_info_form_set }   from "./F_hero_menu";
import { g_mvm, g_team, g_guld, g_ctls, g_vsw } from "./global_for_guild";
import { _json_alert, _json_to_str } from '../d_utl/F_Utility';

let dom_team_fields : HTMLFieldSetElement;
let dom_team_list:    HTMLUListElement;

let dom_guld_fields : HTMLFieldSetElement;
let dom_guld_list:    HTMLUListElement;

let dom_menu_fields : HTMLFieldSetElement;
let dom_menu_list:    HTMLUListElement;

let dom_hero_fields : HTMLFieldSetElement;
let dom_hero_detail : HTMLUListElement;

let team_list: C_Hero[];
let guld_list: C_Hero[];
let hero_detail: {[key: string]: HTMLLIElement};

type T_menu_list = {id: string, title: string, fnc: ()=>void}[];
let menu_list_for_team: T_menu_list;
let menu_list_for_guld: T_menu_list;

const T_TGA_mode: {[kind: string]: number}  = {
    Hide: 0,
    Team: 1,
    Guld: 2,
} as const;
type T_TGA_mode = T_MakeEnumType<typeof T_TGA_mode>;
let TGA_mode: T_TGA_mode;

const T_SubView: {[kind: string]: number}  = {
    Hide: 0,
    Team: 1,
    Guld: 2,
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
let cursor_Menu: T_cursor;

let mode    = 'view';

export function init_tmpl_menu(): void {
    init_all(); 
    return;
}

export function act_tmpl_menu(): void {
    mode    = 'view';

    update_all();
    if (exist_data()) {
        g_ctls.act(ctls_tmpl_nor);
        g_vsw.view(g_vsw.Tmpl());
        display_default_message(); 
    } else {
        act_guld_menu();
    }
    return;
}

function exist_data(): boolean {
    return exist_team() ||  exist_guld();
}


async function init_all(): Promise<boolean> { 
    mode = 'view'; 
    if (!init_data()) return false; 
    if (!init_view()) return false; 
    if (!init_ctls()) return false; 
    return true; 
}

function update_all(): void {
    update_data_list();
    start_TGA();
    update_view();
    update_ctls();
}

function start_TGA(): boolean {
    if (exist_team()) { 
        TGA_mode = T_TGA_mode.Team;
    }
    else if (exist_guld()) { 
        TGA_mode = T_TGA_mode.Guld;
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
function init_menu_list():boolean { 
    menu_list_for_team = [
        {id: 'hprc',  fnc: _go_hprc, title: 'ＨＰを回復'},
        {id: 'mprc',  fnc: _go_mprc, title: 'ＭＰを回復'},
        {id: 'sick',  fnc: _go_sick, title: '異常を回復'},
    ];
    menu_list_for_guld = [
        {id: 'hprc',  fnc: _go_hprc, title: 'ＨＰを回復'},
        {id: 'mprc',  fnc: _go_mprc, title: 'ＭＰを回復'},
        {id: 'sick',  fnc: _go_sick, title: '異常を回復'},
    ]; 
    return true;
}
function _go_hprc(): void {
    subview_act(T_SubView.HpRc);
    mode = 'hprc';
    display_default_message();
    g_ctls.act(ctls_tmpl_hprc);
}
function _go_mprc(): void {
    subview_act(T_SubView.MpRc);
    mode = 'mprc';
    display_default_message();
    g_ctls.act(ctls_tmpl_mprc);
}
function _go_sick(): void {
    subview_act(T_SubView.Sick);
    mode = 'sick';
    display_default_message();
    g_ctls.act(ctls_tmpl_sick);
}

function update_data_list(): void { 
    update_team_list(); 
    update_guld_list(); 
    update_menu_list(); 
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

function update_menu_list(): void {}
function exist_menu(): boolean {
    return _min([menu_list_for_team.length, menu_list_for_guld.length]) > 0;
}



// ******************************
// ビュー関係
// ******************************

function init_view(): boolean { 
    if (!init_dom_team_list()) return false; 
    if (!init_dom_guld_list()) return false; 
    if (!init_dom_menu_list()) return false; 
//    if (!init_dom_inpt_list()) return false; 

    if (!init_cursor())          return false; 
    if (!init_dom_hero_detail()) return false; 
    return true;
}

function update_view() {
    update_dom_team_list();
    update_dom_guld_list();
    update_dom_menu_list();
//    update_dom_inpt_list();

    update_cursor();
    update_dom_hero_detail();
}

function clear_view() {
    clear_dom_team_list();
    clear_dom_guld_list();
    clear_dom_menu_list();
//    clear_dom_inpt_list();
    clear_dom_hero_detail();
}

// ******************************
// チームリスト表示　関係
// ******************************

function init_dom_team_list(): boolean {
    //パーティ情報
    try {
        dom_team_fields = document.getElementById('tmpl_team_fields') as HTMLFieldSetElement;
        dom_team_list   = document.getElementById('tmpl_list')        as HTMLUListElement;
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
}

function clear_dom_team_list(): void {
    dom_team_list.innerHTML = '';
//    while (dom_team_list.firstChild !== null) {
//        dom_team_list.removeChild(dom_team_list.firstChild);
//    }
}


// ******************************
// 冒険者リスト表示　関係
// ******************************

function init_dom_guld_list(): boolean {
    // 冒険者情報
    try {
        dom_guld_fields = document.getElementById('tmpl_guld_fields') as HTMLFieldSetElement;
        dom_guld_list   = document.getElementById('tmpl_list')        as HTMLUListElement;
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
// サブメニュー表示　関係
// ******************************

function init_dom_menu_list(): boolean {
    // コマンド情報
    try {
        dom_menu_fields = document.getElementById('tmpl_menu_fields') as HTMLFieldSetElement;
        dom_menu_list   = document.getElementById('tmpl_menu_list')   as HTMLUListElement;
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
// 冒険者詳細情報の表示　関係
// ******************************

function init_dom_hero_detail(): boolean {
    // 冒険者詳細情報
    try {
        dom_hero_fields = document.getElementById('tmpl_hero_fields') as HTMLFieldSetElement;
        dom_hero_detail = document.getElementById('tmpl_hero_info')   as HTMLUListElement;
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
    cursor_Menu.crsr.set(dom_menu_list);
    return true;
}
function start_cursor(): boolean {
    switch (TGA_mode) { 
        case T_TGA_mode.Team: cursor  = cursor_Team; break;
        case T_TGA_mode.Guld: cursor  = cursor_Guld; break;
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
        if (!g_ctls.set(ctls_tmpl_nor))  return false;
        if (!g_ctls.set(ctls_tmpl_rtn))  return false;
//        if (!g_ctls.set(ctls_tmpl_ipnm)) return false;
//        if (!g_ctls.set(ctls_tmpl_cknm)) return false;
        if (!g_ctls.set(ctls_tmpl_hprc)) return false;
        if (!g_ctls.set(ctls_tmpl_mprc)) return false;
        if (!g_ctls.set(ctls_tmpl_sick)) return false;
    } catch (err) {
        return false;
    }
    return true;
}
const ctls_tmpl_rtn = {
    name: 'hres_rtn', 
    isOK:  isRT,
    isNG:  isRT,
    cpOK:  isRT,
    cpNG:  isRT,
    isRT:  isRT,
    cpRT:  isRT,
}
const ctls_tmpl_nor = {
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
/*****************
const ctls_hres_ipnm = {
    name: 'tmpl_ipnm', 
    isOK:  isOK_ipnm,
    isNG:  isNG_chek,
    cpOK:  isOK_ipnm,
    cpNG:  isNG_chek,
}
const ctls_hres_cknm = {
    name: 'tmpl_cknm', 
    isOK:  isOK_cknm,
    isNG:  isNG_cknm,
    cpOK:  isOK_cknm,
    cpNG:  isNG_cknm,
}
******************/
const ctls_tmpl_hprc = {
    name: 'tmpl_hprc', 
    isOK:  isOK_hprc,
    isNG:  isNG_chek,
    cpOK:  isOK_hprc,
    cpNG:  isNG_chek,
}
const ctls_tmpl_mprc = {
    name: 'tmpl_mprc', 
    isOK:  isOK_mprc,
    isNG:  isNG_chek,
    cpOK:  isOK_mprc,
    cpNG:  isNG_chek,
}
const ctls_tmpl_sick = {
    name: 'tmpl_sick', 
    isOK:  isOK_sick,
    isNG:  isNG_chek,
    cpOK:  isOK_sick,
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
    dom_menu_fields.style.display = 'none';
    return true;
}

function subview_act(sview: T_SubView): boolean {
//    clear_dom_menu_list();

    switch (sview) {
        case T_SubView.Team: subview_act_team();break;
        case T_SubView.Guld: subview_act_guld();break;
        case T_SubView.Menu: subview_act_menu();break;
        case T_SubView.MnCk: subview_act_mnck();break;
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

function subview_act_menu() {
//    clear_dom_inpt_list();
//    dom_inpt_fields.style.display = 'none';

    cursor  = cursor_Menu; 
    cursor.crsr.set_pos(0);

    update_dom_menu_list();
    dom_menu_fields.style.display = 'block';
}    

function subview_act_mnck() {
//    dom_inpt_fields.style.display = 'none';
}    

/************************************************
function subview_act_ipnm() {
    update_dom_inpt_list();
    dom_inpt_fields.style.display = 'block';
}    

function subview_act_ipck() {
    update_dom_inpt_list();
    dom_inpt_fields.style.display = 'block';
}    
*************************************************/

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
        default: return;
    }
    menu_list[cursor_Menu.crsr.pos()].fnc();
}

function isOK_hprc(): void {
    const hero = team_list[cursor_Team.crsr.pos()];
    hero.set_abi_p_all('xd', 0);
    cursor_Team.crsr.set_pos(0);
    go_back_view_mode('ＨＰが回復しました');
}
function isOK_mprc(): void {
    const hero = team_list[cursor_Team.crsr.pos()];
    hero.set_abi_m_all('xd', 0);
    cursor_Team.crsr.set_pos(0);
    go_back_view_mode('ＭＰが回復しました');
}
function isOK_sick(): void {
    const hero = team_list[cursor_Team.crsr.pos()];
    // ここに状態異常を回復する処理を作る
    cursor_Team.crsr.set_pos(0);
    go_back_view_mode('状態が正常に戻りました');
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
    }
    g_ctls.act(ctls_tmpl_nor);
    g_mvm.normal_message(msg);
}

/**************************************************
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
***************************************************/

function isNG(): void {
    switch (cursor.kind) {
        case T_SubView.Team:
            isRT();
            break;
        case T_SubView.Guld:
            isRT();
            break;
        case T_SubView.Menu:
            mode = 'view';
            switch (TGA_mode) {
                case T_TGA_mode.Team: subview_act(T_SubView.Team); break;
                case T_TGA_mode.Guld: subview_act(T_SubView.Guld); break;
            }
            clear_dom_menu_list();
            display_default_message();
            break;
    }
}
function isNG_chek(): void {
    mode = 'menu';
    subview_act(T_SubView.Menu);
    g_ctls.act(ctls_tmpl_nor);
    display_default_message();
}
function isNG_cknm(): void {
    isNG_chek();
//    clear_dom_inpt_list();
}

function isSL(): void { // サブリストの切り替え
    g_mvm.clear_message();
    switch (TGA_mode) {
        case T_TGA_mode.Team:
            if (exist_guld()) {
                TGA_mode = T_TGA_mode.Guld;
                break;
            }
            break;
        case T_TGA_mode.Guld:
            if (exist_team()) {
                TGA_mode = T_TGA_mode.Team;
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
        case 'hprc':
            g_mvm.normal_message('この人のＨＰを回復しますか？');
            break;
        case 'mprc':
            g_mvm.normal_message('この人のＭＰを回復しますか？');
            break;
        case 'sick':
            g_mvm.normal_message('この人の状態異常を治しますか？');
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
