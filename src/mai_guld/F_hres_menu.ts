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
import { _ceil, _floor, _round } from "../common/F_Math";
import { high_light_on }         from "./F_default_menu";
import { g_mvm, g_hres }         from "./global_for_guild";
import { display_guld_menu }     from "./F_guild_menu";

let dom_view_switch : HTMLDivElement;
let dom_info_fields : HTMLFieldSetElement;
let dom_info_detail : HTMLUListElement;
var info_list: HTMLUListElement;

var info_list: HTMLUListElement;
var info_list_cols: number;
var idx:  number = 0;
var info_detail: {[key: string]: HTMLLIElement};

var mode = 'view';

export function display_hres_menu(): void {
    hide_all_menu();

    dom_view_switch = document.getElementById('gld_view_switch_hres') as HTMLDivElement;
    dom_info_detail = document.getElementById('hres_hero_info')   as HTMLUListElement;
    dom_info_fields = document.getElementById('hres_hero_fields') as HTMLFieldSetElement;
    info_list       = document.getElementById('hres_list')        as HTMLUListElement;

    if (dom_view_switch === null) {display_guld_menu();return;}
    if (dom_info_detail === null) {display_guld_menu();return;}
    if (dom_info_fields === null) {display_guld_menu();return;}
    if (info_list       === null) {display_guld_menu();return;}

    dom_view_switch.style.setProperty('display', 'block');

    get_info_list_cols();
    init_all();
    update_all();

    if (!exist_data()) {
        info_list      .style.setProperty('display', 'none');
        dom_info_fields.style.setProperty('display', 'none');

        g_mvm.notice_message('現在、冒険者情報は有りません。戻る＝＞✖');
        _add_hres_rtn_ctls();
        return;
    } else {
        info_list      .style.setProperty('display', 'block');
        dom_info_fields.style.setProperty('display', 'block');
    }


    idx = 0;
    //update_info_detail()    

    _add_hres_nor_ctls();
    display_default_message();
}

async function init_all() {
    mode = 'view';
    await init_data_list();
    init_view();
}

async function update_all() {
    await update_data_list();
    update_info_list();
    update_info_detail(idx);
}

function init_data_list(){}
function update_data_list(){}
function exist_data(): boolean {
    return g_hres.length > 0;
}

function init_view() {
    init_info_list();
    init_info_detail();
}
function update_view(idx: number) {
    update_info_list();
    update_info_detail(idx);
}
function clear_view() {
    clear_info_list();
    clear_info_detail();
}

function init_info_list(){}
function update_info_list() {
    clear_info_list();
    for (let ii in g_hres) {
        const li = document.createElement('li') as HTMLLIElement;
        li.innerHTML = `${g_hres[ii].name()}<p></p>`;

        li.id = ii.toString();
        li.addEventListener("click",_OK_Fnc, false);
        info_list.appendChild(li);
    }
    high_light_on(info_list, 0);
}
let old_idx:number;
function _OK_Fnc(this: HTMLLIElement, e: MouseEvent): void {
    idx = Number(this.id); 
    display_default_message();
    high_light_on(info_list, idx); 
    update_info_detail(idx);
/*
    if (idx === old_idx) isOK();
    else old_idx = idx;
*/
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
    hero_info_form_set(g_hres, info_detail, idx);
}
function clear_info_detail() {
    hero_info_clear(dom_info_detail);
}

function get_info_list_cols(): number {
    let __col   = window.getComputedStyle(info_list).columnCount !== '' 
                ? window.getComputedStyle(info_list).columnCount
                : '1';
 
    info_list_cols = Number(__col); 
    return info_list_cols;
}


function do_U(): void {
    display_default_message();

    idx = calc_cursor_pos_U(idx, info_list.children.length, info_list_cols);
    high_light_on(info_list, idx);  update_info_detail(idx); 
}
function do_D(): void {
    display_default_message();

    idx = calc_cursor_pos_D(idx, info_list.children.length, info_list_cols);
    high_light_on(info_list, idx);  update_info_detail(idx);  
}
function do_L(): void {
    display_default_message();

    idx = calc_cursor_pos_L(idx, info_list.children.length, info_list_cols);
    high_light_on(info_list, idx);  update_info_detail(idx);
}
function do_R(): void {
    display_default_message();

    idx = calc_cursor_pos_R(idx, info_list.children.length, info_list_cols);
    high_light_on(info_list, idx);  update_info_detail(idx);
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
    }
    g_mvm.clear_message();
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
