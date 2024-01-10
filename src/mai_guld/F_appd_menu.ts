import { 
    rmv_default_ctls, 
    add_default_ctls, 
    hide_all_menu,
    calc_cursor_pos_L,
    calc_cursor_pos_R,
    calc_cursor_pos_U,
    calc_cursor_pos_D
} from "./F_default_menu";

import { hero_info_clear, hero_info_create, hero_info_form_set }   from "./F_hero_menu";
import { C_Hero }                from "../common/C_Hero";
import { _ceil, _floor, _round } from "../common/F_Math";
import { high_light_on }         from "./F_default_menu";
import { display_guld_menu }     from "./F_guild_menu";
import { g_mvm, g_hres }         from "./global_for_guild";
import { make_hero }             from "../common/F_create_hero";

let dom_view_switch : HTMLDivElement;
let dom_info_fields : HTMLFieldSetElement;
let dom_info_detail : HTMLUListElement;
var info_list: HTMLUListElement;

var new_hres: C_Hero[] = [];
var info_list_cols: number;
var idx:  number = 0;
var info_detail: {[key: string]: HTMLLIElement};

var mode = 'view';

const appd_ctls = {
    name: 'appd', 
    do_U:  do_U,
    do_D:  do_D,
    do_L:  do_L,
    do_R:  do_R,
    isOK:  isOK,
    isNG:  isNG,
    keyEvent: true,
};
export function rmv_appd_ctls(): void {
    rmv_default_ctls(appd_ctls);
}
function add_appd_ctls(): void {
    add_default_ctls(appd_ctls);
}

export function display_appd_menu(): void {
    hide_all_menu();

    dom_view_switch = document.getElementById('gld_view_switch_appd') as HTMLDivElement;
    dom_info_detail = document.getElementById('appd_hero_info')   as HTMLUListElement;
    dom_info_fields = document.getElementById('appd_hero_fields') as HTMLFieldSetElement;
    info_list       = document.getElementById('appd_list')        as HTMLUListElement;

    if (dom_view_switch === null) {display_guld_menu();return;}
    if (dom_info_detail === null) {display_guld_menu();return;}
    if (dom_info_fields === null) {display_guld_menu();return;}
    if (info_list       === null) {display_guld_menu();return;}

    dom_view_switch.style.setProperty('display', 'block');

    get_info_list_cols();
    /* await */ init_all();
    /* await */ update_all();
    add_appd_ctls();
    display_default_message();
}

function get_info_list_cols(): number {
    let __col   = window.getComputedStyle(info_list).columnCount !== '' 
                ? window.getComputedStyle(info_list).columnCount
                : '1';
 
    info_list_cols = Number(__col); 
    return info_list_cols;
}

async function init_all() {
    mode = 'view';
    await init_data_list();
    init_info_list();
    init_info_detail();
}

async function update_all() {
    await update_data_list();
    update_info_list();
    update_info_detail(idx);
}

async function init_data_list() {
    new_hres = [];
}

async function update_data_list() {
    if (new_hres.length < 1) {
        for (let i = 0; i < 20; i++)  new_hres.push(make_hero());
    } else {
        new_hres.splice(idx, 1); idx = 0; 
    }
}

function init_info_list() {
    clear_info_list();
}

function update_info_list(): boolean {
    clear_info_list();
    for (let ii in new_hres) {
        const li = document.createElement('li') as HTMLLIElement;
        li.innerHTML = `${new_hres[ii].name()}<p></p>`;

        li.id = ii.toString();
        li.addEventListener("click",_OK_Fnc, false);
        info_list.appendChild(li);
    }
    high_light_on(info_list, 0);
    return true;
}
let old_idx:number;
function _OK_Fnc(this: HTMLLIElement, e: MouseEvent): void {
    idx = Number(this.id); 
    high_light_on(info_list, idx); 
    update_info_detail(idx); 

    if (idx === old_idx) isOK();
    if (idx === old_idx) isOK();
    else {
        if (mode !== 'view') mode = 'view';
        old_idx = idx;
    }
    display_default_message();
}

function clear_info_list() {
    while (info_list.firstChild !== null) {
        info_list.removeChild(info_list.firstChild);
    }
    idx = 0; old_idx=999; 
}

function init_info_detail() {
    info_detail = hero_info_create(dom_info_detail);
}

function update_info_detail(idx: number) {
    hero_info_form_set(new_hres, info_detail, idx); 
}

function clear_info_detail() {
    hero_info_clear(dom_info_detail);
}

function do_U(): void {
    if (mode !== 'view')     return;
    if (new_hres.length < 1) return;
    display_default_message();

    idx = calc_cursor_pos_U(idx, info_list.children.length, info_list_cols);
    high_light_on(info_list, idx);  update_info_detail(idx); 
}
function do_D(): void {
    if (mode !== 'view')     return;
    if (new_hres.length < 1) return;
    display_default_message()

    idx = calc_cursor_pos_D(idx, info_list.children.length, info_list_cols);
    high_light_on(info_list, idx);  update_info_detail(idx);  
}
function do_L(): void {
    if (mode !== 'view')     return;
    if (new_hres.length < 1) return;
    display_default_message();

    idx = calc_cursor_pos_L(idx, info_list.children.length, info_list_cols);
    high_light_on(info_list, idx);  update_info_detail(idx);
}
function do_R(): void {
    if (mode !== 'view')     return;
    if (new_hres.length < 1) return;
    display_default_message();

    idx = calc_cursor_pos_R(idx, info_list.children.length, info_list_cols);
    high_light_on(info_list, idx);  update_info_detail(idx);
}

function isOK(): void { 
    if (new_hres.length < 1) {isNG(); return;}

    switch (mode) {
        case 'view':
            mode = 'recruit';
            display_default_message();
            break;
        case 'recruit':
            mode = 'check_OK';
            display_default_message();
            break;
        case 'check_OK':
            mode = 'view';
            g_mvm.notice_message('採用しました!!');
            g_hres.push(new_hres[idx]);
            _after_check();
            break;
        case 'check_NG':
            mode = 'view';
            g_mvm.normal_message('お帰りいただきました。。。');
            _after_check();
            break;
    }
}
function _after_check(): void {
    update_all();
    high_light_on(info_list, idx); 
}

function isNG(): void {
    switch (mode) {
        case 'view':
            g_mvm.clear_message();
            go_back_guild_menu();
            break;
        case 'recruit':
            mode = 'check_NG';
            display_default_message();
            break;
        case 'check_OK':
        case 'check_NG':
            mode = 'view';
            display_default_message();
            break;
    }
}

function display_default_message(): void {
    switch (mode) {
        case 'view':
            g_mvm.normal_message('どの冒険者をチェックしますか？意思決定＝＞〇　メニューに戻る＝＞✖');
            break;
        case 'recruit':
            g_mvm.normal_message('この冒険者をどうしますか？採用＝＞〇　不採用＝＞✖');
            break;
        case 'check_OK':
            g_mvm.notice_message('本当にこの冒険者を採用しますか？ＯＫ＝＞〇　やめる＝＞✖');
            break;
        case 'check_NG':
            g_mvm.notice_message('本当にこの冒険者を追い返しますか？ＯＫ＝＞〇　やめる＝＞✖');
            break;
    }
}


function go_back_guild_menu() {
    clear_info_detail();

    rmv_appd_ctls();
    display_guld_menu();
}