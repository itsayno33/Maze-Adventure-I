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
import { C_Hero }                from "../common/C_Hero";
import { _ceil, _floor, _round } from "../common/F_Math";
import { high_light_on }         from "./F_default_menu";
import { display_guld_menu }     from "./F_guild_menu";
import { g_mvm, g_guld, g_save } from "./global_for_guild";
import { get_new_hero }          from "../common/F_load_and_save";
import { _alert, g_mes }         from "../common/global";

let dom_view_switch : HTMLDivElement;
let dom_info_fields : HTMLFieldSetElement;
let dom_info_detail : HTMLUListElement;
var info_list: HTMLUListElement;

var new_hres: C_Hero[] = [];
var info_list_cols: number;
var idx:  number = 0;
var info_detail: {[key: string]: HTMLLIElement};

var mode = 'view';

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

    dom_view_switch.style.display = 'block';

    get_info_list_cols();
    /* await */ init_all();
    /* await */ update_all();
    _add_appd_nor_ctls();
    display_default_message();
}

function get_info_list_cols(): number {
    let __col   = window.getComputedStyle(info_list).columnCount !== '' 
                ? window.getComputedStyle(info_list).columnCount
                : '1';
 
    info_list_cols = Number(__col); 
    return info_list_cols;
}

function init_all() {
    mode = 'view';
    init_data_list();
    init_view();
}

function update_all() {
    update_data_list().then(()=>{
        update_view(0);
    })
}

function init_data_list() {
    new_hres = [];
}
async function update_data_list() {
    if (new_hres.length < 1) {
        return await get_new_hero(20)?.then((jsonObj:any)=>{
            if (jsonObj.hres === undefined) {
                g_mes.warning_message('不正なデータを受信しました' + jsonObj.emsg);
                _alert(jsonObj.emsg);
                return;
            }
            for (let hero_data of jsonObj.hres) {
                new_hres.push((new C_Hero()).decode(hero_data));
            }
        })
    } else {
        new_hres.splice(idx, 1); idx = 0; 
    }
}
function exist_data(): boolean {
    return new_hres.length > 0;
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
    display_default_message();

    idx = calc_cursor_pos_U(idx, info_list.children.length, info_list_cols);
    high_light_on(info_list, idx);  update_info_detail(idx); 
}
function do_D(): void {
    display_default_message()

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

    switch (mode) {
        case 'view':
            mode = 'recruit';
            _add_appd_chk_ctls();
            display_default_message();
            break;
        case 'recruit':
            mode = 'check_OK';
            _add_appd_chk_ctls();
            display_default_message();
            break;
        case 'check_OK':
            mode = 'view';
            _add_appd_nor_ctls();
            g_mvm.notice_message('採用しました!!');
            g_guld.myteam.add_hero(new_hres[idx]);
            _after_check();
            break;
        case 'check_NG':
            mode = 'view';
            _add_appd_nor_ctls();
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
            isRT();
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

function isRT(): void {
    g_mvm.clear_message();
    go_back_guild_menu();
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
    clear_view();
    rmv_appd_ctls();
    display_guld_menu();
}


export function rmv_appd_ctls(): void {
    _rmv_appd_nor_ctls();
    _rmv_appd_chk_ctls();
}
const appd_nor_ctls = {
    name: 'appd_nor', 
    do_U:  do_U,
    do_D:  do_D,
    do_L:  do_L,
    do_R:  do_R,
    isOK:  isOK,
    isNG:  isNG,
    isRT:  isRT,
    keyEvent: true,
};
function _rmv_appd_nor_ctls(): void {
    rmv_default_ctls(appd_nor_ctls);
}
function _add_appd_nor_ctls(): void {
    rmv_all_ctls();
    add_default_ctls(appd_nor_ctls);
}
const appd_chk_ctls = {
    name: 'appd_chk', 
    isOK:  isOK,
    isNG:  isNG,
    keyEvent: true,
};
function _rmv_appd_chk_ctls(): void {
    rmv_default_ctls(appd_chk_ctls);
}
function _add_appd_chk_ctls(): void {
    rmv_all_ctls();
    add_default_ctls(appd_chk_ctls);
}
