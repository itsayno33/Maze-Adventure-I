import { C_DefaultCtls } from './C_DefaultCtls';
import { 
    hide_all_menu,
    calc_cursor_pos_L,
    calc_cursor_pos_R,
    calc_cursor_pos_U,
    calc_cursor_pos_D
} from "./F_default_menu";
import { hero_info_clear, hero_info_create, hero_info_form_set }   from "./F_hero_menu";
import { high_light_on }               from "./F_default_menu";
import { display_guld_menu }           from "./F_guild_menu";

import { _ceil, _floor, _min, _round } from "../common/F_Math";
import { C_Hero }                      from "../common/C_Hero";
import { T_MakeEnumType }              from "../common/T_MakeEnumType";
import { g_mvm, g_team, g_guld }       from "./global_for_guild";
import { _alert } from "../common/global";

let dom_view_switch : HTMLDivElement;

let dom_team_fields : HTMLFieldSetElement;
let dom_team_list:    HTMLUListElement;

let dom_guld_fields : HTMLFieldSetElement;
let dom_guld_list:    HTMLUListElement;

let dom_menu_fields : HTMLFieldSetElement;
let dom_menu_list:    HTMLUListElement;

let dom_inpt_fields : HTMLFieldSetElement;
let dom_inpt_list:    HTMLUListElement;

let dom_hero_fields : HTMLFieldSetElement;
let dom_hero_detail : HTMLUListElement;

let team_list: C_Hero[];
let guld_list: C_Hero[];
let hero_detail: {[key: string]: HTMLLIElement};

type T_menu_list = {id: string, title: string, fnc: ()=>void}[];
let menu_list_for_team: T_menu_list;
let menu_list_for_guld: T_menu_list;

let inpt_name_list: {[id: string]: {id: string, label: HTMLLabelElement, input: HTMLInputElement}};

let team_list_cols: number;
let guld_list_cols: number;
let menu_list_cols: number;

const T_TG_mode: {[kind: string]: number}  = {
    Hide: 0,
    Team: 1,
    Guld: 2,
} as const;
type T_TG_mode = T_MakeEnumType<typeof T_TG_mode>;
let TG_mode: T_TG_mode;

const T_SubView: {[kind: string]: number}  = {
    Hide: 0,
    Team: 1,
    Guld: 2,
    Menu: 3,
    IpNm: 5,
} as const;
type T_SubView = T_MakeEnumType<typeof T_SubView>;


type T_cursor = {kind: T_SubView, idx: number}
let cursor: T_cursor; 
let cursor_Hide: T_cursor;
let cursor_Team: T_cursor;
let cursor_Guld: T_cursor;
let cursor_Menu: T_cursor;
let cursor_IpNm: T_cursor;

let hres_ctls:   C_DefaultCtls;

let mode    = 'view';

export function display_hres_menu(): void {
    hide_all_menu(); 

    if (!init_all()) {display_guld_menu();return}; 

    if (!exist_data()) {
        g_mvm.notice_message('現在、冒険者情報は有りません。戻る＝＞✖');
        hres_ctls.act("rtn");
        return;
    }
    update_all(); 

    hres_ctls.act("nor");
    display_default_message(); 
    dom_view_switch.style.display = 'block'; 
}

function exist_data(): boolean {
    return exist_team() ||  exist_guld();
}


function init_all(): boolean {
    mode = 'view';
    if (!init_data_list()) return false; 
    if (!init_view()) return false; 
    if (!init_ctls()) return false; 
    return true;
}

function update_all() {
    update_data_list();
    update_view();
    update_ctls();
}

// ******************************
// モデル関係
// ******************************

function init_data_list(): boolean {
    if (!init_team_list()) return false;
    if (!init_guld_list()) return false;
    if (!init_menu_list()) return false;
    return true;
}

function init_team_list(): boolean { 
    update_team_list(); 
    return true;
}
function init_guld_list(): boolean { 
    update_guld_list(); 
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
    return true;
}
function _go_ipnm(): void {
    subview_act(T_SubView.IpNm);
    mode = 'ipnm';
    display_default_message();
    hres_ctls.act("ipnm");

    inpt_name_list['hres_name_li'].input.focus({preventScroll: false});
}
function _go_leav(): void {
    if (!exist_team()) return;
    if (max_of_guld()) {
        g_mvm.notice_message('ギルドが満員です。誰かクビにしてください');
        return;
    }
    mode = 'leav';
    display_default_message();
    hres_ctls.act("leav");
}
function _go_join(): void {
    if (!exist_guld()) return;
    if (max_of_team()) {
        g_mvm.notice_message('チームが満員です。誰か外してください');
        return;
    }
    mode = 'join';
    display_default_message();
    hres_ctls.act("join");
}
function _go_fire(): void {
    if (!exist_guld()) return;

    mode = 'fire';
    display_default_message();
    hres_ctls.act("fire");
}


function update_data_list() { 
    update_team_list(); 
    update_guld_list(); 
    update_menu_list(); 
}

function update_team_list(){
    team_list = []; 
    for (let hero of g_team.hres()) team_list.push(hero);
}
function exist_team(): boolean {
    return team_list.length > 0;
}
function max_of_team(): boolean {
    return team_list.length > 3;
}

function update_guld_list(){
    guld_list = []; 
    for (let hero of g_guld.myteam.hres()) guld_list.push(hero);
}
function exist_guld(): boolean {
    return guld_list.length > 0;
}
function max_of_guld(): boolean {
    return guld_list.length > 99;
}

function update_menu_list(){}
function exist_menu(): boolean {
    return _min([menu_list_for_team.length, menu_list_for_guld.length]) > 0;
}



// ******************************
// ビュー関係
// ******************************

function init_view(): boolean { 
    if (!init_dom_view_hres()) return false; 
    if (!init_dom_team_list()) return false; 
    if (!init_dom_guld_list()) return false; 
    if (!init_dom_menu_list()) return false; 
    if (!init_dom_inpt_list()) return false; 
    if (!init_dom_hero_detail()) return false; 
    return true;
}

function update_view() {
    update_dom_view_hres();
    update_dom_team_list();
    update_dom_guld_list();
    update_dom_menu_list();
//    update_dom_inpt_list();
    update_dom_hero_detail();
}

function clear_view() {
    clear_dom_view_hres();
    clear_dom_team_list();
    clear_dom_guld_list();
    clear_dom_menu_list();
    clear_dom_inpt_list();
    clear_dom_hero_detail();
}

// ******************************
// 全体表示　関係
// ******************************

function init_dom_view_hres(): boolean {

    try {
        dom_view_switch = document.getElementById('gld_view_switch_hres') as HTMLDivElement;
    } catch (err) {
        return false;
    }
    if (dom_view_switch === null) return false;

    clear_dom_view_hres(); 
    return true;
}
function update_dom_view_hres(): void {
    dom_view_switch.style.display = 'block'; 
}
function clear_dom_view_hres(): void {
    dom_view_switch.style.display = 'none'; 
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
    list_high_light_on();
}
function _OK_team_Fnc(this: HTMLLIElement, e: MouseEvent): void {
    subview_act(T_SubView.Team);
    cursor.idx  = Number(this.id); 
    display_default_message();
    list_high_light_on(); 
    update_dom_hero_detail();
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
    list_high_light_on();
}
function _OK_guld_Fnc(this: HTMLLIElement, e: MouseEvent): void {
    subview_act(T_SubView.Guld);
    cursor.idx  = Number(this.id); 
    display_default_message();
    list_high_light_on(); 
    update_dom_hero_detail();
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
    switch (TG_mode) {
        case T_TG_mode.Team: menu_list = menu_list_for_team;break;
        case T_TG_mode.Guld: menu_list = menu_list_for_guld;break;
        default: return;
    }
    for (let ii in menu_list) {
        const li = document.createElement('li') as HTMLLIElement;
        li.innerHTML = `${menu_list[ii].title}<p></p>`;

        li.id = ii.toString();
        li.addEventListener("click", _OK_menu_Fnc, false);
        dom_menu_list.appendChild(li);
    }
    list_high_light_on();
}
function _OK_menu_Fnc(this: HTMLLIElement, e: MouseEvent): void {
    cursor = cursor_Menu;
    subview_act(T_SubView.Menu);
    cursor.idx  = Number(this.id); 
    display_default_message();
    list_high_light_on(); 
//    update_dom_hero_detail();
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
    switch (cursor.kind) {
        case T_SubView.IpNm:
            update_dom_ipnm();
            break;
    }
}
function update_dom_ipnm(): void {
    const name_label = inpt_name_list['hres_name_li'].label;
    const name_input = inpt_name_list['hres_name_li'].input;

    switch (TG_mode) {
        case T_TG_mode.Team: 
            name_input.value = team_list[cursor_Team.idx].name();
            break;
        case T_TG_mode.Guld: 
            name_input.value = guld_list[cursor_Guld.idx].name();
            break;
        default: return;
    }

    const li = document.createElement('li') as HTMLLIElement;
    li.appendChild(name_label);
    li.appendChild(name_input);
    dom_inpt_list.appendChild(li);

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

    hero_detail = hero_info_create(dom_hero_detail);
    return true;
}

function update_dom_hero_detail() {
    switch (cursor.kind) {
        case T_SubView.Team:
            hero_info_form_set(team_list, hero_detail, cursor.idx);
            break;
        case T_SubView.Guld:
            hero_info_form_set(guld_list, hero_detail, cursor.idx);
            break;
    }
}

function clear_dom_hero_detail() {
    hero_info_clear(dom_hero_detail);
}


// ******************************
// コントロール　関係
// ******************************

// カーソルやイベントの初期化
function init_ctls(): boolean { 
    if (!init_default_ctls())      return false;
    if (!init_cursor())            return false; 
    if (!get_dom_list_cols())      return false; 
    if (!subview_hide_all())       return false; 
    if (!subview_act(cursor.kind)) return false; 
    return true;
}
function init_default_ctls(): boolean {
    try {
        hres_ctls = new C_DefaultCtls();
        if (!hres_ctls.add('nor',  hres_ctls_nor))  return false;
        if (!hres_ctls.add('rtn',  hres_ctls_rtn))  return false;
        if (!hres_ctls.add('ipnm', hres_ctls_ipnm)) return false;
        if (!hres_ctls.add('cknm', hres_ctls_cknm)) return false;
        if (!hres_ctls.add('leav', hres_ctls_leav)) return false;
        if (!hres_ctls.add('join', hres_ctls_join)) return false;
        if (!hres_ctls.add('fire', hres_ctls_fire)) return false;
    } catch (err) {
        return false;
    }
    return true;
}
const hres_ctls_rtn = {
    name: 'rtn', 
    isOK:  isRT,
    isNG:  isRT,
    isRT:  isRT,
}
const hres_ctls_nor = {
    name: 'nor', 
    do_U:  do_U,
    do_D:  do_D,
    do_L:  do_L,
    do_R:  do_R,
    isOK:  isOK,
    isNG:  isNG,
    isSL:  isSL,
    isRT:  isRT,
}
const hres_ctls_ipnm = {
    name: 'ipnm', 
    isOK:  isOK_ipnm,
    isNG:  isNG_chek,
}
const hres_ctls_cknm = {
    name: 'cknm', 
    isOK:  isOK_cknm,
    isNG:  isNG_cknm,
}
const hres_ctls_leav = {
    name: 'leav', 
    isOK:  isOK_leav,
    isNG:  isNG_chek,
}
const hres_ctls_join = {
    name: 'join', 
    isOK:  isOK_join,
    isNG:  isNG_chek,
}
const hres_ctls_fire = {
    name: 'fire', 
    isOK:  isOK_fire,
    isNG:  isNG_chek,
}

function update_ctls(): void {}

function init_cursor(): boolean {
    cursor_Hide = {kind: T_SubView.Hide, idx: 0}; 
    cursor_Team = {kind: T_SubView.Team, idx: 0}; 
    cursor_Guld = {kind: T_SubView.Guld, idx: 0}; 
    cursor_Menu = {kind: T_SubView.Menu, idx: 0}; 
    cursor_IpNm = {kind: T_SubView.IpNm, idx: 0}; 

    if (exist_team()) { 
        TG_mode = T_TG_mode.Team;
        cursor  = cursor_Team; 
    }
    else if (exist_guld()) { 
        TG_mode = T_TG_mode.Guld;
        cursor  = cursor_Guld; 
    }
    else { 
        TG_mode = T_TG_mode.Hide;
        cursor  = cursor_Hide; 
    } 
    return true;
}

// **********************************
// サブ・リスト表示の切り替え関係
// **********************************
function subview_hide_all(): boolean {
    dom_team_fields.style.display = 'none';
    dom_guld_fields.style.display = 'none';
    dom_menu_fields.style.display = 'none';
    dom_inpt_fields.style.display = 'none';
    return true;
}

function subview_act(sview: T_SubView): boolean {
//    clear_dom_menu_list();

    switch (sview) {
        case T_SubView.Team: subview_act_team();return true;
        case T_SubView.Guld: subview_act_guld();return true;
        case T_SubView.Menu: subview_act_menu();return true;
        case T_SubView.IpNm: subview_act_ipnm();return true;
        case T_SubView.Hide: subview_hide_all();return true;
        default:             subview_hide_all();return false;
    }
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
//    subview_hide_all();
    clear_dom_inpt_list();
    dom_inpt_fields.style.display = 'none';

    cursor  = cursor_Menu; 
    cursor.idx = 0;

//    update_view();
    update_dom_menu_list();
    dom_menu_fields.style.display = 'block';
}    

function subview_act_ipnm() {
    cursor  = cursor_IpNm; 
    cursor.idx = 0;

//    update_view();
    update_dom_inpt_list();
    dom_inpt_fields.style.display = 'block';
}    

// **************************************************************
// 各サブ・リスト表示の列数をCSSから取得する(カーソル移動制御に使用)
// **************************************************************
function get_dom_list_cols(): boolean {
    get_dom_team_list_cols();
    get_dom_guld_list_cols();
    get_dom_menu_list_cols();
    return true;
}

// チーム一覧の列数(CSSから取得)
function get_dom_team_list_cols(): number {
    let __col   = window.getComputedStyle(dom_team_list).columnCount !== '' 
                ? window.getComputedStyle(dom_team_list).columnCount
                : '1';
 
    team_list_cols = Number(__col); 
    return team_list_cols;
}


// 冒険者一覧の列数(CSSから取得)
function get_dom_guld_list_cols(): number {
    let __col   = window.getComputedStyle(dom_guld_list).columnCount !== '' 
                ? window.getComputedStyle(dom_guld_list).columnCount
                : '1';
 
    guld_list_cols = Number(__col); 
    return guld_list_cols;
}


// メニュー一覧の列数(CSSから取得)
function get_dom_menu_list_cols(): number {
    let __col   = window.getComputedStyle(dom_menu_list).columnCount !== '' 
                ? window.getComputedStyle(dom_menu_list).columnCount
                : '1';
 
    menu_list_cols = Number(__col); 
    return menu_list_cols;
}

// 選択されている行のハイライト表示(暫定)
// cursorが切り替わったときにバグる状態
function list_high_light_on() {
    switch (cursor.kind) {
        case T_SubView.Team:
            high_light_on(dom_team_list, cursor.idx);
            break; 
        case T_SubView.Guld:
            high_light_on(dom_guld_list, cursor.idx);
            break; 
        case T_SubView.Menu:
            high_light_on(dom_menu_list, cursor.idx);
            break; 
    }
}


// カーソルの移動と決定・解除
function do_U(): void {
    display_default_message();

    cursor.idx = calc_list_cursor_pos_U();
    list_high_light_on();  update_dom_hero_detail(); 
}
function do_D(): void {
    display_default_message();

    cursor.idx = calc_list_cursor_pos_D();
    list_high_light_on();  update_dom_hero_detail();  
}
function do_L(): void {
    display_default_message();

    cursor.idx = calc_list_cursor_pos_L();
    list_high_light_on();  update_dom_hero_detail();
}
function do_R(): void {
    display_default_message();

    cursor.idx = calc_list_cursor_pos_R();
    list_high_light_on();  update_dom_hero_detail();
}

// カーソル位置の計算
function calc_list_cursor_pos_U(): number {
    const list_length = _calc_list_length();
    const list_cols   = _calc_list_cols();
    return calc_cursor_pos_U(cursor.idx, list_length, list_cols);
}

function calc_list_cursor_pos_D(): number {
    const list_length = _calc_list_length();
    const list_cols   = _calc_list_cols();
    return calc_cursor_pos_D(cursor.idx, list_length, list_cols);
}

function calc_list_cursor_pos_L(): number {
    const list_length = _calc_list_length();
    const list_cols   = _calc_list_cols();
    return calc_cursor_pos_L(cursor.idx, list_length, list_cols);
}

function calc_list_cursor_pos_R(): number {
    const list_length = _calc_list_length();
    const list_cols   = _calc_list_cols();
    return calc_cursor_pos_R(cursor.idx, list_length, list_cols);
}

function _calc_list_length(): number {
    switch (cursor.kind) {
        case T_SubView.Team:
            return dom_team_list.children.length;
        case T_SubView.Guld:
            return dom_guld_list.children.length;
        case T_SubView.Menu:
            return dom_menu_list.children.length;
    }
    return 0;
}

function _calc_list_cols(): number {
    switch (cursor.kind) {
        case T_SubView.Team:
            return team_list_cols;
        case T_SubView.Guld:
            return guld_list_cols;
        case T_SubView.Menu:
            return menu_list_cols;
    }
    return 0;
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
    switch (TG_mode) {
        case T_TG_mode.Team: menu_list = menu_list_for_team; break;
        case T_TG_mode.Guld: menu_list = menu_list_for_guld; break;
        default: return;
    }
    menu_list[cursor_Menu.idx].fnc();
}


function isOK_ipnm(): void {
    mode = 'cknm';

    hres_ctls.act("cknm");
    display_default_message();
}

function isOK_cknm(): void {
    switch (TG_mode) {
        case T_TG_mode.Team: 
            change_hero_name(team_list[cursor_Team.idx]); 
            subview_act(T_SubView.Team);
            break;
        case T_TG_mode.Guld: 
            change_hero_name(guld_list[cursor_Guld.idx]); 
            subview_act(T_SubView.Guld);
            break;
    };
    clear_dom_inpt_list();
    go_back_view_mode('改名しました');
}

function isOK_leav(): void {
    const hero = team_list[cursor_Team.idx];

    g_guld.myteam.add_hero(hero);
    g_team.rmv_hero(hero);
    init_data_list();

    cursor_Team.idx = 0;
    go_back_view_mode('チームから外しました');
}

function isOK_join(): void {
    const hero = guld_list[cursor_Guld.idx];

    g_team.add_hero(hero);
    g_guld.myteam.rmv_hero(hero);
    init_data_list();

    cursor_Guld.idx = 0;
    go_back_view_mode('チームに入れました');
}

function isOK_fire(): void {
    g_guld.myteam.rmv_hero(guld_list[cursor_Guld.idx]);
    init_data_list();

    cursor_Guld.idx = 0;
    go_back_view_mode('クビにしました。。。');
}

function go_back_view_mode(msg: string): void {
    mode = 'view';
    switch (TG_mode) {
        case T_TG_mode.Team: 
            subview_act(T_SubView.Team);
            break;
        case T_TG_mode.Guld: 
            subview_act(T_SubView.Guld);
            break;
    }
    hres_ctls.act("nor");
    update_view();
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
        case T_SubView.Menu:
            mode = 'view';
            switch (TG_mode) {
                case T_TG_mode.Team: subview_act(T_SubView.Team); break;
                case T_TG_mode.Guld: subview_act(T_SubView.Guld); break;
            }
            clear_dom_menu_list();
            display_default_message();
            break;
    }
}
function isNG_chek(): void {
    mode = 'menu';
    subview_act(T_SubView.Menu);
    hres_ctls.act("nor");
    display_default_message();
}
function isNG_cknm(): void {
    isNG_chek();
    clear_dom_inpt_list();
}

function isSL(): void {
    g_mvm.clear_message();
    switch (TG_mode) {
        case T_TG_mode.Team:
            if (!exist_guld()) break;
            TG_mode = T_TG_mode.Guld;
            subview_act(T_SubView.Guld);
            break;
        case T_TG_mode.Guld:
            if (!exist_team()) break;
            TG_mode = T_TG_mode.Team;
            subview_act(T_SubView.Team);
            break;
    }
    display_default_message();
}
function isRT(): void {
    g_mvm.clear_message();
    go_back_guild_menu();
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
        default:
            g_mvm.clear_message();
            break;
    }
}

function go_back_guild_menu() {
    clear_view();
    hres_ctls.deact();
    display_guld_menu();
}
export function rmv_hres_ctls(): void {
    hres_ctls.deact();
}
