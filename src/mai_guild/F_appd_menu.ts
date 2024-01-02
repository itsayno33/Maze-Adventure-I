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

var info_list: HTMLUListElement;
var idx:  number = 0;
var info_detail: {[key: string]: HTMLLIElement};

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
    if (div === null) return;
    div.style.setProperty('display', 'block');

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
 
    info_list = document.getElementById('appd_list') as HTMLUListElement;
    if (info_list === null) return;
    while (info_list.firstChild !== null) {
        info_list.removeChild(info_list.firstChild);
    }
    for (let hero of g_hres) {
        const li = document.createElement('li') as HTMLLIElement;
        li.innerHTML = `${hero.name()}<p></p>`;
        info_list.appendChild(li);
    }
    idx = 0;
    high_light_on(info_list, idx); 


    const form = document.getElementById('appd_hero_info') as HTMLUListElement;
    if (form === null) return;
    info_detail = create_hero_info(form);

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

function do_U(): void {
    if (g_hres.length < 1) return;
    display_default_message();

    idx = (idx > 0) ? --idx : idx;
    high_light_on(info_list, idx);  form_set(info_detail, idx); 
}
function do_D(): void {
    if (g_hres.length < 1) return;
    display_default_message()

    idx = (idx < info_list.children.length - 1) ? ++idx : idx;
    high_light_on(info_list, idx);  form_set(info_detail, idx);  
}
function do_L(): void {
    if (g_hres.length < 1) return;
    display_default_message();

    const limit = _round((info_list.children.length - 1) / 2, 0);
    if (idx < limit) {
        idx += limit;
    } else {
        idx -= limit;
    } 
    high_light_on(info_list, idx);  form_set(info_detail, idx);
}
function do_R(): void {
    if (g_hres.length < 1) return;
    display_default_message();

    const limit = _round((info_list.children.length - 1) / 2, 0);
    if (idx >= limit) {
        idx -= limit;
    } else {
        idx += limit;
    } 
    high_light_on(info_list, idx);  form_set(info_detail, idx);
}

function isOK(): void { 
    if (g_hres.length < 1) {isNG(); return;}
    isNG(); 
}
function isNG(): void {
    g_mvm.clear_message();
    display_guild_menu();
}

function display_default_message(): void {
    g_mvm.notice_message('この冒険者を採用しますか？採用＝＞〇　不採用＝＞✖');
}
