import { C_Team } from './../common/C_Team';
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
import { T_MakeEnumType } from "../common/T_MakeEnumType";

let dom_view_switch : HTMLDivElement;

let dom_team_fields : HTMLFieldSetElement;
let dom_team_list:    HTMLUListElement;

let dom_guld_fields : HTMLFieldSetElement;
let dom_guld_list:    HTMLUListElement;

let dom_menu_fields : HTMLFieldSetElement;
let dom_menu_list:    HTMLUListElement;

let dom_hero_detail : HTMLUListElement;

let team_list: C_Hero[];
let guld_list: C_Hero[];
let menu_list:   {id: string, title: string}[];
let hero_detail: {[key: string]: HTMLLIElement};


let team_list_cols: number;
let guld_list_cols: number;
let menu_list_cols: number;

type  T_SubViewKind = string;
const T_SubView: {[kind: T_SubViewKind]: T_SubViewKind}  = {
    Hide: "Hide",
    Team: "Team",
    Guld: "Guld",
    Menu: "Menu",
} as const;
type T_SubView = T_MakeEnumType<typeof T_SubView>;
let sview_mode: T_SubViewKind;


type T_cursor = {kind: T_SubViewKind, idx: number}
let cursor: T_cursor = {kind: T_SubView.Hide, idx: 0}; 
let cursor_team_idx: number = 0;
let cursor_guld_idx: number = 0;
let cursor_menu_idx: number = 0;


let mode    = 'view';

export function display_hres_menu(): void {
    hide_all_menu();

    dom_view_switch = document.getElementById('gld_view_switch_hres') as HTMLDivElement;
    if (dom_view_switch === null) {display_guld_menu();return;}
    dom_view_switch.style.display = 'none';

    if (!init_all()) {display_guld_menu();return}

    if (!exist_data()) {
        g_mvm.notice_message('現在、冒険者情報は有りません。戻る＝＞✖');
        add_hres_rtn_ctls();
        return;
    }

    update_all();

    add_hres_nor_ctls();
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

function init_team_list(): boolean {return true;}
function init_guld_list(): boolean {return true;}
function init_menu_list():boolean {
    menu_list = [
        {id: 'join',  title: 'チームに入れる'},
        {id: 'leave', title: 'チームから外す'},
        {id: 'fire',  title: 'ギルドをクビにする'},
    ];
    return true;
}

function update_data_list() {
    update_team_list();
    update_guld_list();
    update_menu_list();
}

function update_team_list(){
    team_list.length = 0;
    for (let hero of g_team.hres()) team_list.push(hero);
}
function exist_team(): boolean {
    return team_list.length > 0;
}

function update_guld_list(){
    guld_list.length = 0;
    for (let hero of g_guld.myteam.hres()) guld_list.push(hero);
}
function exist_guld(): boolean {
    return guld_list.length > 0;
}

function update_menu_list(){}
function exist_menu(): boolean {
    return menu_list.length > 0;
}



// ******************************
// ビュー関係
// ******************************

function init_view(): boolean {
    sview_hide_all();

    if (!init_dom_team_list()) return false;
    if (!init_dom_guld_list()) return false;
    if (!init_dom_menu_list()) return false;
    if (!init_dom_hero_detail()) return false;
    return true;
}

function update_view() {
    update_dom_team_list();
    update_dom_guld_list();
    update_dom_menu_list();
    update_dom_hero_detail();
}

function clear_view() {
    clear_dom_team_list();
    clear_dom_guld_list();
    clear_dom_menu_list();
    clear_dom_hero_detail();

}
// ******************************
// チームリスト表示　関係
// ******************************

function init_dom_team_list(): boolean {
    //パーティ情報
    dom_team_fields = document.getElementById('hres_team_fields') as HTMLFieldSetElement;
    dom_team_list   = document.getElementById('team_list')        as HTMLUListElement;
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
    sview_act(T_SubView.Team);
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
    dom_guld_fields = document.getElementById('hres_guld_fields') as HTMLFieldSetElement;
    dom_guld_list   = document.getElementById('guld_list')        as HTMLUListElement;
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
    sview_act(T_SubView.Guld);
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
    dom_menu_fields = document.getElementById('hres_menu_fields') as HTMLFieldSetElement;
    dom_menu_list   = document.getElementById('hres_menu')        as HTMLUListElement;
    if (dom_menu_fields === null) return false;
    if (dom_menu_list   === null) return false;

    dom_menu_fields.style.display = 'none';
    return true;
}
function update_dom_menu_list(): void {
    clear_dom_menu_list();
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
    sview_act(T_SubView.Menu);
    cursor.idx  = Number(this.id); 
    display_default_message();
    list_high_light_on(); 
    update_dom_hero_detail();
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
    dom_hero_detail = document.getElementById('hres_hero_info')   as HTMLUListElement;
    if (dom_hero_detail === null) return false;

    hero_detail = hero_info_create(dom_hero_detail);
    return true;
}

function update_dom_hero_detail() {
    switch (cursor.kind) {
        case 'Team':
            hero_info_form_set(team_list, hero_detail, cursor.idx);
            break;
        case 'Guld':
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
    if (!init_cursor())          return false;
    if (!get_dom_list_cols())    return false;
    if (!sview_act(cursor.kind)) return false;
    return true;
}

function update_ctls(): void {}

function init_cursor(): boolean {
    cursor_team_idx = 0;
    cursor_guld_idx = 0;
    cursor_menu_idx = 0;
    cursor.idx = 0;
    if (exist_team()) {
        cursor.kind = T_SubView.Team;
    }
    else if (exist_guld()) {
        cursor.kind = T_SubView.Guld;
    }
    else {
        cursor.kind = T_SubView.Hide;
    }
    return true;
}

// **********************************
// サブ・リスト表示の切り替え関係
// **********************************
function sview_hide_all(): void {
    switch (cursor.kind) {
        case "Team":
            cursor_team_idx = cursor.idx;break;
        case "Guld":
            cursor_guld_idx = cursor.idx;break;
        case "Menu":
            cursor_menu_idx = cursor.idx;break;
    }
    dom_team_fields.style.display = 'none';
    dom_guld_fields.style.display = 'none';
    dom_menu_fields.style.display = 'none';
}

function sview_act(sview: T_SubView): boolean {
    if (!(sview in T_SubView)) return false;
    cursor.kind = sview;

    switch (sview) {
        case "Team": sview_act_team();return true;
        case "Guld": sview_act_guld();return true;
        case "Menu": sview_act_menu();return true;
        case "Hide": sview_hide_all();return true;
        default:     sview_hide_all();return false;
    }
}

function sview_act_team() {
    sview_hide_all();
    dom_team_fields.style.display = 'block';
    cursor.idx  = cursor_team_idx;
}

function sview_act_guld() {
    sview_hide_all();
    dom_guld_fields.style.display = 'block';
    cursor.idx  = cursor_guld_idx;
}

function sview_act_menu() {
//    sview_hide_all();
    dom_menu_fields.style.display = 'block';
    cursor.idx  = 0 // cursor_menu_idx;
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
        case 'Team':
            high_light_on(dom_team_list, cursor.idx);
            break; 
        case 'Guld':
            high_light_on(dom_guld_list, cursor.idx);
            break; 
        case 'Menu':
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
        case 'Team':
            return dom_team_list.children.length;
        case 'Guld':
            return dom_guld_list.children.length;
        case 'Menu':
            return dom_menu_list.children.length;
    }
    return 0;
}

function _calc_list_cols(): number {
    switch (cursor.kind) {
        case 'Team':
            return team_list_cols;
        case 'Guld':
            return guld_list_cols;
        case 'Menu':
            return menu_list_cols;
    }
    return 0;
}

// **************************************
// 決定ボタン・キャンセルボタン・切替ボタン
// **************************************


function isOK(): void { 
    if (!exist_data()) {isNG(); return;}
//    isNG(); 
}
function isNG(): void {
    g_mvm.clear_message();
    go_back_guild_menu();
}
function isSL(): void {
    g_mvm.clear_message();
    switch (cursor.kind) {
        case T_SubView.Team:
            sview_act(T_SubView.Guld);
            break;
        case T_SubView.Guld:
            sview_act(T_SubView.C_Team);
            break;
    }
}
function isRT(): void {
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
    rmv_hres_nor_ctls();
    rmv_hres_rtn_ctls();
}
const hres_rtn_ctls = {
    name: 'hres_rtn', 
    isOK:  isRT,
    isNG:  isRT,
    isRT:  isRT,
    keyEvent: true,
}
function rmv_hres_rtn_ctls(): void {
    rmv_default_ctls(hres_rtn_ctls);
}
function add_hres_rtn_ctls(): void {
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
    isSL:  isSL,
    isRT:  isRT,
    keyEvent: true,
}
function rmv_hres_nor_ctls(): void {
    rmv_default_ctls(hres_nor_ctls);
}
function add_hres_nor_ctls(): void {
    rmv_all_ctls();
    add_default_ctls(hres_nor_ctls);
}
