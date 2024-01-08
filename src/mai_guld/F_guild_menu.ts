import { calc_cursor_pos_D, calc_cursor_pos_U, hide_all_menu, high_light_on } from "./F_default_menu";
import { display_hres_menu } from "./F_hres_menu";
import { display_appd_menu } from "./F_appd_menu";
import { display_load_menu, display_save_menu } from "./F_save_menu";
import { g_mvm }             from "./global_for_guild";

import { 
    rmv_default_ctls, 
    add_default_ctls 
} from "./F_default_menu";

var menu: HTMLUListElement;
var idx: number = 0;

export function rmv_guld_ctls(): void {
    rmv_default_ctls({
        name: 'guld', 
        do_U:  do_U,
        do_D:  do_D,
        do_L:  null,
        do_R:  null,
        isOK:  isOK,
        isNG:  null,
        keyEvent: true,
    });
}

export function display_guld_menu(): void {
    hide_all_menu();

    const div = document.getElementById('gld_view_switch_guild') as HTMLDivElement;
    if (div === null) return;
    div.style.setProperty('display', 'block');

    menu = document.getElementById('guild_list') as HTMLUListElement;
    if (menu === null) return;
    idx = 0;
    high_light_on(menu, idx); 

    add_default_ctls({
        name: 'guld', 
        do_U: do_U,
        do_D: do_D,
        do_L: null,
        do_R: null,
        isOK: isOK,
        isNG: null,
        keyEvent: true,
    });
}

function do_U(): void {
    g_mvm.clear_message();
    idx = calc_cursor_pos_U(idx, menu.children.length, 1);
    high_light_on(menu, idx); 
}
function do_D(): void {
    g_mvm.clear_message();
    idx = calc_cursor_pos_D(idx, menu.children.length, 1);
    high_light_on(menu, idx); 
}

function isOK(): void {
    if (menu === null) return;
    if (idx < 0 || idx > menu.children.length - 1) return;

    switch ((menu.children.item(idx) as HTMLLIElement).id) {
        case 'guild_hres': 
            rmv_guld_ctls();
            display_hres_menu();
            break;
        case 'guild_edit': break;
        case 'guild_appd': 
            rmv_guld_ctls();
            display_appd_menu();
            break;
        case 'guild_load': 
            rmv_guld_ctls();
            display_load_menu();
            break;
        case 'guild_save': 
            rmv_guld_ctls();
            display_save_menu();
            break;
        case 'guild_to_maze': break;
    }
}
