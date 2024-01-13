import { 
    rmv_default_ctls, 
    add_default_ctls, 
    hide_all_menu,
    calc_cursor_pos_L,
    calc_cursor_pos_R,
    calc_cursor_pos_U,
    calc_cursor_pos_D,
    rmv_all_ctls
} from "./F_default_menu";
import { hero_info_clear, hero_info_create, hero_info_form_set }   from "./F_hero_menu";
import { high_light_on }         from "./F_default_menu";
import { display_guld_menu }     from "./F_guild_menu";

import { _ceil, _floor, _round } from "../common/F_Math";
import { C_Hero }                from "../common/C_Hero";
import { g_mvm, g_team, g_guld, g_save } from "./global_for_guild";

let dom_view_switch : HTMLDivElement;

let dom_team_fields : HTMLFieldSetElement;
let dom_team_list:    HTMLUListElement;

let dom_hres_fields : HTMLFieldSetElement;
let dom_hres_list:    HTMLUListElement;

let dom_menu_fields : HTMLFieldSetElement;
let dom_menu_list:    HTMLUListElement;

let dom_hero_detail : HTMLUListElement;

let info_list_cols: number;

let team_list: C_Hero[];
let hres_list: C_Hero[];
let menu_list:   {id: string, title: string}[];
let hero_detail: {[key: string]: HTMLLIElement};

type T_cursor = {mode: string, idx: number}
let cursor: T_cursor = {mode: 'hres', idx: 0}; 
let old_cursor: T_cursor;


let mode    = 'view';

export function display_hres_menu(): void {
    hide_all_menu();

    dom_view_switch = document.getElementById('gld_view_switch_hres') as HTMLDivElement;
    if (dom_view_switch === null) {display_guld_menu();return;}

    //パーティ情報
    dom_team_fields = document.getElementById('hres_team_fields') as HTMLFieldSetElement;
    dom_team_list   = document.getElementById('team_list')        as HTMLUListElement;
    if (dom_team_fields === null) {display_guld_menu();return;}
    if (dom_team_list   === null) {display_guld_menu();return;}

    // 冒険者情報
    dom_hres_fields = document.getElementById('hres_hero_fields') as HTMLFieldSetElement;
    dom_hres_list   = document.getElementById('hres_list')        as HTMLUListElement;
    if (dom_hres_fields === null) {display_guld_menu();return;}
    if (dom_hres_list   === null) {display_guld_menu();return;}

    // コマンド情報
    dom_menu_fields = document.getElementById('hres_menu_fields') as HTMLFieldSetElement;
    dom_menu_list   = document.getElementById('hres_menu')        as HTMLUListElement;
    if (dom_menu_fields === null) {display_guld_menu();return;}
    if (dom_menu_list   === null) {display_guld_menu();return;}

    // 冒険者詳細情報
    dom_hero_detail = document.getElementById('hres_hero_info')   as HTMLUListElement;
    if (dom_hero_detail === null) {display_guld_menu();return;}

    dom_view_switch.style.display = 'none';
    dom_team_fields.style.display = 'none';
    dom_hres_fields.style.display = 'none';
    dom_menu_fields.style.display = 'none';

    if (!exist_data()) {
        g_mvm.notice_message('現在、冒険者情報は有りません。戻る＝＞✖');
        _add_hres_rtn_ctls();
        return;
    }

    get_dom_info_list_cols();
    init_all();
    update_all();

    _add_hres_nor_ctls();
    display_default_message();
    dom_view_switch.style.display = 'block';
}

function exist_data(): boolean {
    return exist_team() ||  exist_hres();
}


function init_all() {
    mode = 'view';
    init_data_list();
    init_view();
}

function update_all() {
    update_data_list();
    update_view(cursor);
}

// ******************************
// モデル関係
// ******************************

function init_data_list() {
    init_team_list();
    init_hres_list();
    init_menu_list();
}

function init_team_list() {}
function init_hres_list() {}
function init_menu_list() {
    menu_list = [
        {id: 'join',  title: 'チームに入れる'},
        {id: 'leave', title: 'チームから外す'},
        {id: 'fire',  title: 'ギルドをクビにする'},
    ];
}

function update_data_list() {
    update_team_list();
    update_hres_list();
    update_menu_list();
}

function update_team_list(){
    team_list.length = 0;
    for (let hero of g_team[0].hres()) team_list.push(hero);
}
function exist_team(): boolean {
    return team_list.length > 0;
}

function update_hres_list(){
    hres_list.length = 0;
    for (let hero of g_guld[0].myteam.hres()) hres_list.push(hero);
}
function exist_hres(): boolean {
    return hres_list.length > 0;
}

function update_menu_list(){}



// ******************************
// ビュー関係
// ******************************

function init_view() {
    init_dom_team_list();
    init_dom_hres_list();
    init_dom_menu_list();
    init_dom_hero_detail();
}

function update_view(cursor: T_cursor) {
    update_dom_team_list();
    update_dom_hres_list();
    update_dom_menu_list();
    update_dom_hero_detail(cursor);
}

function clear_view() {
    clear_dom_team_list();
    clear_dom_hres_list();
    clear_dom_menu_list();
    clear_dom_hero_detail();
}

// チーム一覧と冒険者一覧の列数(CSSから取得)
function get_dom_info_list_cols(): number {
    let __col   = window.getComputedStyle(dom_hres_list).columnCount !== '' 
                ? window.getComputedStyle(dom_hres_list).columnCount
                : '1';
 
    info_list_cols = Number(__col); 
    return info_list_cols;
}

// 選択されている行のハイライト表示(暫定)
// cursorが切り替わったときにバグる状態
function list_high_light_on(cursor: T_cursor) {
    switch (cursor.mode) {
        case 'team':
            high_light_on(dom_team_list, cursor.idx);
            break; 
        case 'hres':
            high_light_on(dom_hres_list, cursor.idx);
            break; 
        case 'menu':
            high_light_on(dom_menu_list, cursor.idx);
            break; 
    }
}

// ******************************
// チームリスト表示　関係
// ******************************

function init_dom_team_list(){}
function update_dom_team_list() {
    clear_dom_team_list();
    for (let ii in team_list) {
        const li = document.createElement('li') as HTMLLIElement;
        li.innerHTML = `${team_list[ii].name()}<p></p>`;

        li.id = ii.toString();
        li.addEventListener("click", _OK_team_Fnc, false);
        dom_team_list.appendChild(li);
    }
    list_high_light_on(cursor);
}
function _OK_team_Fnc(this: HTMLLIElement, e: MouseEvent): void {
    cursor.mode = 'team';
    cursor.idx  = Number(this.id); 
    display_default_message();
    list_high_light_on(cursor); 
    update_dom_hero_detail(cursor);
}

function clear_dom_team_list() {
    while (dom_team_list.firstChild !== null) {
        dom_team_list.removeChild(dom_team_list.firstChild);
    }
    if (cursor.mode === 'team') {
        cursor.idx = 0; old_cursor = {mode: 'team', idx: 999}; 
    }
}


// ******************************
// 冒険者リスト表示　関係
// ******************************

function init_dom_hres_list(){}
function update_dom_hres_list() {
    clear_dom_hres_list();
    for (let ii in hres_list) {
        const li = document.createElement('li') as HTMLLIElement;
        li.innerHTML = `${hres_list[ii].name()}<p></p>`;

        li.id = ii.toString();
        li.addEventListener("click", _OK_hres_Fnc, false);
        dom_hres_list.appendChild(li);
    }
    list_high_light_on(cursor);
}
function _OK_hres_Fnc(this: HTMLLIElement, e: MouseEvent): void {
    cursor.mode = 'hres';
    cursor.idx  = Number(this.id); 
    display_default_message();
    list_high_light_on(cursor); 
    update_dom_hero_detail(cursor);
}

function clear_dom_hres_list() {
    while (dom_hres_list.firstChild !== null) {
        dom_hres_list.removeChild(dom_hres_list.firstChild);
    }
    if (cursor.mode === 'hres') {
        cursor.idx = 0; old_cursor = {mode: 'hres', idx: 999}; 
    }
}


// ******************************
// サブメニュー表示　関係
// ******************************

function init_dom_menu_list(){}
function update_dom_menu_list() {
    clear_dom_menu_list();
    for (let ii in menu_list) {
        const li = document.createElement('li') as HTMLLIElement;
        li.innerHTML = `${menu_list[ii].title}<p></p>`;

        li.id = ii.toString();
        li.addEventListener("click", _OK_menu_Fnc, false);
        dom_menu_list.appendChild(li);
    }
    list_high_light_on(cursor);
}
function _OK_menu_Fnc(this: HTMLLIElement, e: MouseEvent): void {
    cursor.mode = 'menu';
    cursor.idx  = Number(this.id); 
    display_default_message();
    list_high_light_on(cursor); 
    update_dom_hero_detail(cursor);
}

function clear_dom_menu_list() {
    while (dom_menu_list.firstChild !== null) {
        dom_menu_list.removeChild(dom_menu_list.firstChild);
    }
    if (cursor.mode === 'menu') {
        cursor.idx = 0; old_cursor = {mode: 'menu', idx: 999}; 
    }
}


// ******************************
// 冒険者詳細情報の表示　関係
// ******************************

function init_dom_hero_detail() {
    hero_detail = hero_info_create(dom_hero_detail);
}

function update_dom_hero_detail(cursor: T_cursor) {
    switch (cursor.mode) {
        case 'team':
            hero_info_form_set(team_list, hero_detail, cursor.idx);
            break;
        case 'hres':
            hero_info_form_set(hres_list, hero_detail, cursor.idx);
            break;
    }
}

function clear_dom_hero_detail() {
    hero_info_clear(dom_hero_detail);
}

function list_calc_cursor_pos_U(cursor: T_cursor, list_cols: number): number {
    switch (cursor.mode) {
        case 'team':
            return calc_cursor_pos_U(cursor.idx, dom_team_list.children.length, list_cols);
        case 'hres':
            return calc_cursor_pos_U(cursor.idx, dom_hres_list.children.length, list_cols);
        case 'menu':
            return calc_cursor_pos_U(cursor.idx, dom_menu_list.children.length, 1);
    }
    return 0;
}


function do_U(): void {
    display_default_message();

    cursor.idx = list_calc_cursor_pos_U(cursor, info_list_cols);
    list_high_light_on(cursor);  update_dom_hero_detail(cursor); 
}
function do_D(): void {
    display_default_message();

    cursor.idx = list_calc_cursor_pos_U(cursor, info_list_cols);
    list_high_light_on(cursor);  update_dom_hero_detail(cursor);  
}
function do_L(): void {
    display_default_message();

    cursor.idx = list_calc_cursor_pos_U(cursor, info_list_cols);
    list_high_light_on(cursor);  update_dom_hero_detail(cursor);
}
function do_R(): void {
    display_default_message();

    cursor.idx = list_calc_cursor_pos_U(cursor, info_list_cols);
    list_high_light_on(cursor);  update_dom_hero_detail(cursor);
}

function isOK(): void { 
    if (!exist_data()) {isNG(); return;}
//    isNG(); 
}
function isNG(): void {
    g_mvm.clear_message();
    go_back_guild_menu();
}

function display_default_message(): void {
    switch (mode) {
        case 'view':
            g_mvm.normal_message('誰を呼び出しますか？');
            break;
        case 'select':
            g_mvm.normal_message('どうしますか？');
            break;
        case 'join':
            g_mvm.normal_message('チームに加えますか？');
            break;
        case 'leave':
            g_mvm.normal_message('チームから外しますか？');
            break;
        case 'fire':
            g_mvm.normal_message('ギルドをクビにしますか？');
            break;
        default:
            g_mvm.clear_message();
            break;
    }
}

function go_back_guild_menu() {
    clear_view();
    rmv_all_ctls();
    display_guld_menu();
}


export function rmv_hres_ctls(): void {
    _rmv_hres_nor_ctls();
    _rmv_hres_rtn_ctls();
}
const hres_rtn_ctls = {
    name: 'hres_rtn', 
    isOK:  isOK,
    isNG:  isNG,
    keyEvent: true,
}
function _rmv_hres_rtn_ctls(): void {
    rmv_default_ctls(hres_rtn_ctls);
}
function _add_hres_rtn_ctls(): void {
    rmv_all_ctls();
    add_default_ctls(hres_rtn_ctls);
}

const hres_nor_ctls = {
    name: 'hres_nor', 
    do_U:  do_U,
    do_D:  do_D,
    do_L:  do_L,
    do_R:  do_R,
    isOK:  isOK,
    isNG:  isNG,
    keyEvent: true,
}
function _rmv_hres_nor_ctls(): void {
    rmv_default_ctls(hres_nor_ctls);
}
function _add_hres_nor_ctls(): void {
    rmv_all_ctls();
    add_default_ctls(hres_nor_ctls);
}
