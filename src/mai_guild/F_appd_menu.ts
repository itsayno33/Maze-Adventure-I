import { 
    hide_default_contrlles, 
    display_default_controlles, 
    hide_all_menu
} from "./F_default_menu";

import { create_hero_info, form_set }   from "./F_hero_menu";
import { C_Hero }             from "../common/C_Hero";
import { _round }             from "../common/F_Math";
import { _inrand }            from "../common/F_Rand";
import { high_light_on }      from "./F_default_menu";
import { display_guild_menu } from "./F_guild_menu";
import { g_mvm, g_hres }      from "./global_for_guild";
import { make_hero } from "../common/F_create_hero";

var new_hres: C_Hero[] = [];
var info_list: HTMLUListElement;
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
/*
    if (g_hres.length < 1) {
        document.getElementById('appd_list')       ?.style.setProperty('display', 'none');
        document.getElementById('appd_hero_fields')?.style.setProperty('display', 'none');

        g_mvm.notice_message('現在、冒険者情報は有りません。戻る＝＞✖');
        display_default_controlles({
            do_U: do_U,
            do_D: do_D,
            do_L: do_L,
            do_R: do_R,
            isOK: isOK,
            isNG: isNG,
            keyEvent: true,
        });
        return;
    } else {
        document.getElementById('appd_list')       ?.style.setProperty('display', 'block');
        document.getElementById('appd_hero_fields')?.style.setProperty('display', 'block');
    }
*/

    new_hres = [];
    for (let i = 0; i < 20; i++)  new_hres.push(make_hero());

    get_list_info();
    if (info_list === null) {display_guild_menu();return;}

    mode = 'view';

    const form = document.getElementById('appd_hero_info') as HTMLUListElement;
    if (form === null) {display_guild_menu();return;}
    info_detail = create_hero_info(form);

    idx = 0;
    high_light_on(info_list, idx); form_set(new_hres, info_detail, idx); 

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
    high_light_on(info_list, idx);  form_set(new_hres, info_detail, idx); 
}
function do_D(): void {
    if (mode !== 'view')     return;
    if (new_hres.length < 1) return;
    display_default_message()

    idx = (idx < info_list.children.length - 1) ? ++idx : idx;
    high_light_on(info_list, idx);  form_set(new_hres, info_detail, idx);  
}
function do_L(): void {
    if (mode !== 'view')     return;
    if (new_hres.length < 1) return;
    display_default_message();

    const limit = _round((info_list.children.length - 1) / 2, 0);
    if (idx < limit) {
        idx += limit;
    } else {
        idx -= limit;
    } 
    high_light_on(info_list, idx);  form_set(new_hres, info_detail, idx);
}
function do_R(): void {
    if (mode !== 'view')     return;
    if (new_hres.length < 1) return;
    display_default_message();

    const limit = _round((info_list.children.length - 1) / 2, 0);
    if (idx >= limit) {
        idx -= limit;
    } else {
        idx += limit;
    } 
    high_light_on(info_list, idx);  form_set(new_hres, info_detail, idx);
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
            new_hres.splice(idx, 1); idx = 0;
            get_list_info();
            break;
        case 'check_NG':
            mode = 'view';
            g_mvm.normal_message('お帰りいただきました。。。');
            new_hres.splice(idx, 1); idx = 0;
            get_list_info();
            break;
    }
}
function isNG(): void {
    switch (mode) {
        case 'view':
            g_mvm.clear_message();
            display_guild_menu();
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
