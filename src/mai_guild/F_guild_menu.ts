import { hide_hres_menu, display_hres_menu } from "./F_hres_menu";
import { high_light_on } from "./F_default_menu";
import { g_mvm }         from "./global_for_guild";

import { 
    hide_default_contrlles, 
    display_default_controlles 
} from "./F_default_menu";

var menu: HTMLUListElement;
var idx: number = 0;

export function hide_guild_menu(): void {
    hide_default_contrlles({
        do_U: do_U,
        do_D: do_D,
        do_L: null,
        do_R: null,
        isOK: isOK,
        isNG: null,
        keyEvent: true,
    });

    const div = document.getElementById('gld_view_switch_guild') as HTMLDivElement;
    if (div === null) return;
    div.style.setProperty('display', 'none');
}

export function display_guild_menu(): void {
    const div = document.getElementById('gld_view_switch_guild') as HTMLDivElement;
    if (div === null) return;
    div.style.setProperty('display', 'block');

    menu = document.getElementById('guild_list') as HTMLUListElement;
    if (menu === null) return;
    idx = 0;
    high_light_on(menu, idx); 

    display_default_controlles({
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
    idx = (idx > 0) ? --idx : idx;
    high_light_on(menu, idx); 
}
function do_D(): void {
    g_mvm.clear_message();
    idx = (idx < menu.children.length - 1) ? ++idx : idx;
    high_light_on(menu, idx); 
}
function do_L(): void {}
function do_R(): void {}

function isOK(): void {
    if (menu === null) return;
    if (idx < 0 || idx > menu.children.length - 1) return;

    switch ((menu.children.item(idx) as HTMLLIElement).id) {
        case 'guild_hres': break;
        case 'guild_edit': break;
        case 'guild_load': break;
        case 'guild_save': break;
        case 'guild_to_maze': break;
    }
}
function isNG(): void {}
