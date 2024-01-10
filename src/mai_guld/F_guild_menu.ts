import { calc_cursor_pos_D, calc_cursor_pos_U, hide_all_menu, high_light_on, rmv_all_ctls } from "./F_default_menu";
import { display_hres_menu } from "./F_hres_menu";
import { display_appd_menu } from "./F_appd_menu";
import { display_load_menu, display_save_menu } from "./F_save_menu";
import { g_mvm }             from "./global_for_guild";

import { 
    rmv_default_ctls, 
    add_default_ctls 
} from "./F_default_menu";


let dom_view_switch : HTMLDivElement;
let menu_list: HTMLUListElement;
let idx_guld: number = 0;

let menu_fnc: {[id: string]: number};

let mode = '';

const guld_ctls = {
    name: 'guld', 
    do_U:  do_U,
    do_D:  do_D,
    isOK:  isOK,
    keyEvent: true,
}
export function rmv_guld_ctls(): void {
    rmv_default_ctls(guld_ctls);
}
function _add_guld_ctls(): void {
    rmv_all_ctls();
    add_default_ctls(guld_ctls);
}

export function display_guld_menu(): void {
    hide_all_menu();

    dom_view_switch = document.getElementById('gld_view_switch_guild') as HTMLDivElement;
    menu_list       = document.getElementById('guild_list') as HTMLUListElement;

    if (dom_view_switch === null) return;
    if (menu_list === null) return;

    dom_view_switch.style.setProperty('display', 'block');

    init_all();
    update_all();

    _add_guld_ctls();
}

async function init_all() {
    mode = 'view';
    await init_data_list();
    init_view();
}

async function update_all() {
    await update_data_list();
    update_view(idx_guld);
}

function init_data_list(){}
function update_data_list(){}
function exist_data(): boolean {
    return (idx_guld >= 0) && (idx_guld < menu_list.children.length);
}

function init_view() {
    clear_view();
    menu_fnc = {};
    for (let ii = 0; ii < menu_list.children.length; ii++) {
        const menu_item = menu_list.children.item(ii) as HTMLElement;
        if (menu_item === null) continue;
        menu_fnc[menu_item.id] = ii;
        menu_item.addEventListener("click",_OK_Fnc, false);
    }
    high_light_on(menu_list, 0); 
}
function _OK_Fnc(this: HTMLElement, e: MouseEvent): void {
    idx_guld = menu_fnc[this.id]; 
    isOK();
}
function update_view(idx: number) {
}

function clear_view() {
    idx_guld = 0;
}


function do_U(): void {
    display_default_message();
    idx_guld = calc_cursor_pos_U(idx_guld, menu_list.children.length, 1);
    high_light_on(menu_list, idx_guld); 
}
function do_D(): void {
    display_default_message();
    idx_guld = calc_cursor_pos_D(idx_guld, menu_list.children.length, 1);
    high_light_on(menu_list, idx_guld); 
}

function isOK(): void {
    if (!exist_data()) return;
    display_default_message();

    switch ((menu_list.children.item(idx_guld) as HTMLLIElement).id) {
        case 'guild_hres': 
            rmv_all_ctls();
            display_hres_menu();
            break;
        case 'guild_edit': break;
        case 'guild_appd': 
            rmv_all_ctls();
            display_appd_menu();
            break;
        case 'guild_load': 
            rmv_all_ctls();
            display_load_menu();
            break;
        case 'guild_save': 
            rmv_all_ctls();
            display_save_menu();
            break;
        case 'guild_to_maze': break;
    }
}

function display_default_message(): void {
    g_mvm.clear_message();
}
