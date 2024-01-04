import { 
    hide_default_contrlles, 
    display_default_controlles, 
    hide_all_menu
} from "./F_default_menu";

import { hero_info_clear, hero_info_create, hero_info_form_set }   from "./F_hero_menu";
import { C_Hero }             from "../common/C_Hero";
import { _ceil, _round }             from "../common/F_Math";
import { _inrand }            from "../common/F_Rand";
import { high_light_on }      from "./F_default_menu";
import { display_guild_menu } from "./F_guild_menu";
import { g_mvm, g_hres }      from "./global_for_guild";
import { make_hero }          from "../common/F_create_hero";

var new_hres: C_Hero[] = [];
var info_list: HTMLUListElement;
var info_list_col: number;
var idx:  number = 0;
var info_detail: {[key: string]: HTMLLIElement};

var mode = 'view';

export function hide_appd_menu(): void {
    hide_default_contrlles({
        do_U: do_U,
        do_D: do_D,
        do_L: do_L,
        do_R: do_R,
        isOK: isOK,
        isNG: isNG,
        keyEvent: true,
    });

    const div = document.getElementById('gld_view_switch_appd') as HTMLDivElement;
    if (div === null) return;
    div.style.setProperty('display', 'none');
}

export function display_appd_menu(): void {
    hide_all_menu();

    const div = document.getElementById('gld_view_switch_appd') as HTMLDivElement;
    if (div === null) {display_guild_menu();return;}
    div.style.setProperty('display', 'block');

    new_hres = [];
    for (let i = 0; i < 20; i++)  new_hres.push(make_hero());

    get_list_info();
    if (info_list === null) {display_guild_menu();return;}

    info_list_col = Number(window.getComputedStyle(info_list).columnCount); 


    mode = 'view';

    const form = document.getElementById('appd_hero_info') as HTMLUListElement;
    if (form === null) {display_guild_menu();return;} 
    info_detail = hero_info_create(form);

    idx = 0;
    high_light_on(info_list, idx); hero_info_form_set(new_hres, info_detail, idx); 

    display_default_controlles({
        do_U: do_U,
        do_D: do_D,
        do_L: do_L,
        do_R: do_R,
        isOK: isOK,
        isNG: isNG,
        keyEvent: true,
    });
    display_default_message();
}

function get_list_info(): boolean {
    info_list = document.getElementById('appd_list') as HTMLUListElement;
    if (info_list === null) return false;

    if (new_hres.length < 1) for (let i = 0; i < 20; i++)  new_hres.push(make_hero());

    while (info_list.firstChild !== null) {
        info_list.removeChild(info_list.firstChild);
    }
    for (let hero of new_hres) {
        const li = document.createElement('li') as HTMLLIElement;
        li.innerHTML = `${hero.name()}<p></p>`;
        info_list.appendChild(li);
    }
    return true;
}

function do_U(): void {
    if (mode !== 'view')     return;
    if (new_hres.length < 1) return;
    display_default_message();

    idx = (idx > 0) ? --idx : idx;
    high_light_on(info_list, idx);  hero_info_form_set(new_hres, info_detail, idx); 
}
function do_D(): void {
    if (mode !== 'view')     return;
    if (new_hres.length < 1) return;
    display_default_message()

    idx = (idx < info_list.children.length - 1) ? ++idx : idx;
    high_light_on(info_list, idx);  hero_info_form_set(new_hres, info_detail, idx);  
}
function do_L(): void {
    if (mode !== 'view')     return;
    if (new_hres.length < 1) return;
    display_default_message();

    const info_list_row = _ceil((info_list.children.length - 0) / info_list_col, 0);
    if (idx  > info_list_row - 1) {
        // 最前列(左端)以外
        idx -= info_list_row;
    } else {
        // 最前列(左端)
        const  vurtual_list_length = info_list_col * info_list_row;
        idx += vurtual_list_length - info_list_row;
        if (idx > info_list.children.length - 1) idx -= info_list_row;
    } 
    high_light_on(info_list, idx);  hero_info_form_set(new_hres, info_detail, idx);
}
function do_R(): void {
    if (mode !== 'view')     return;
    if (new_hres.length < 1) return;
    display_default_message();

    const info_list_row = _ceil((info_list.children.length - 0) / info_list_col, 0);
    if (idx  < info_list.children.length - info_list_row) { 
        // 最終列(右端)以外
        idx += info_list_row;
    } else {
        // 最終列(右端)
        const  vurtual_list_length = info_list_col * info_list_row;
        idx -= vurtual_list_length  - info_list_row;
        if (idx < 0) idx += info_list_row;
    } 
    high_light_on(info_list, idx);  hero_info_form_set(new_hres, info_detail, idx);
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
    new_hres.splice(idx, 1); idx = 0;
    get_list_info();
    high_light_on(info_list, idx); 
    hero_info_form_set(new_hres, info_detail, idx);
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
    const form = document.getElementById('appd_hero_info') as HTMLUListElement;
    if (form === null) return;
    hero_info_clear(form);

    display_guild_menu();
}