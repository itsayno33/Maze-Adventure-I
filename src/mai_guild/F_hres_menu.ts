import { 
    hide_default_contrlles, 
    display_default_controlles, 
    hide_all_menu
} from "./F_default_menu";

import { hero_info_clear, hero_info_create, hero_info_form_set }   from "./F_hero_menu";
import { _ceil, _floor, _round } from "../common/F_Math";
import { high_light_on }         from "./F_default_menu";
import { g_mvm, g_hres }         from "./global_for_guild";
import { display_guild_menu }    from "./F_guild_menu";

var info_list: HTMLUListElement;
var info_list_col: number;
var idx:  number = 0;
var info_detail: {[key: string]: HTMLLIElement};

export function hide_hres_menu(): void {
    hide_default_contrlles({
        do_U: do_U,
        do_D: do_D,
        do_L: do_L,
        do_R: do_R,
        isOK: isOK,
        isNG: isNG,
        keyEvent: true,
    });

    const div = document.getElementById('gld_view_switch_hres') as HTMLDivElement;
    if (div === null) return;
    div.style.setProperty('display', 'none');
}

export function display_hres_menu(): void {
    hide_all_menu();

    const div = document.getElementById('gld_view_switch_hres') as HTMLDivElement;
    if (div === null) return;
    div.style.setProperty('display', 'block');

    if (g_hres.length < 1) {
        document.getElementById('hres_list')       ?.style.setProperty('display', 'none');
        document.getElementById('hres_hero_fields')?.style.setProperty('display', 'none');

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
        document.getElementById('hres_list')       ?.style.setProperty('display', 'block');
        document.getElementById('hres_hero_fields')?.style.setProperty('display', 'block');
    }
 
    info_list = document.getElementById('hres_list') as HTMLUListElement;
    if (info_list === null) return;
    while (info_list.firstChild !== null) {
        info_list.removeChild(info_list.firstChild);
    }
    for (let hero of g_hres) {
        const li = document.createElement('li') as HTMLLIElement;
        li.innerHTML = `${hero.name()}<p></p>`;
        info_list.appendChild(li);
    }

    info_list_col = Number(window.getComputedStyle(info_list).columnCount); 

    const form = document.getElementById('hres_hero_info') as HTMLUListElement;
    if (form === null) return;
    info_detail = hero_info_create(form);

    idx = 0;
    high_light_on(info_list, idx);   hero_info_form_set(g_hres, info_detail, idx);

    display_default_controlles({
        do_U: do_U,
        do_D: do_D,
        do_L: do_L,
        do_R: do_R,
        isOK: isOK,
        isNG: isNG,
        keyEvent: true,
    });
    g_mvm.clear_message();
}

function do_U(): void {
    if (g_hres.length < 1) return;
    g_mvm.clear_message();

    idx = (idx > 0) ? --idx : idx;
    high_light_on(info_list, idx);  hero_info_form_set(g_hres, info_detail, idx); 
}
function do_D(): void {
    if (g_hres.length < 1) return;
    g_mvm.clear_message();

    idx = (idx < info_list.children.length - 1) ? ++idx : idx;
    high_light_on(info_list, idx);  hero_info_form_set(g_hres, info_detail, idx);  
}
function do_L(): void {
    if (g_hres.length < 1) return;
    g_mvm.clear_message();

    const info_list_row = _ceil((info_list.children.length - 0) / info_list_col, 0);
    if (idx  > info_list_row - 1) {
        // 最前列(左端)以外
        idx -= info_list_row;
    } else {
        // 最前列(左端)
        const  vurtual_list_length = info_list_col * info_list_row;
        idx += vurtual_list_length - info_list_row;
        while (idx > info_list.children.length - 1) {
            idx -= info_list_row;
            if (idx < 0) {idx = 0; break;}
        }
    } 
    high_light_on(info_list, idx);  hero_info_form_set(g_hres, info_detail, idx);
}
function do_R(): void {
    if (g_hres.length < 1) return;
    g_mvm.clear_message();

    const info_list_row = _ceil((info_list.children.length - 0) / info_list_col, 0);
    if (idx  < info_list.children.length - info_list_row) { 
        // 最終列(右端)以外
        idx += info_list_row;
    } else {
        // 最終列(右端)
        const  old_idx = idx;
        const  vurtual_list_length = info_list_col * info_list_row;
        idx -= vurtual_list_length  - info_list_row;
        if (idx < 0) {
            idx += info_list_row;
            if (idx < 0 || idx > info_list.children.length - 1) idx = _floor((old_idx + 1) / info_list_col, 0);
        }
    } 
    high_light_on(info_list, idx);  hero_info_form_set(g_hres, info_detail, idx);
}

function isOK(): void { 
    if (g_hres.length < 1) {isNG(); return;}
    isNG(); 
}
function isNG(): void {
    g_mvm.clear_message();
    go_back_guild_menu();
}

function go_back_guild_menu() {
    const form = document.getElementById('hres_hero_info') as HTMLUListElement;
    if (form === null) return;
    hero_info_clear(form);

    display_guild_menu();
}