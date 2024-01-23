import { 
    calc_cursor_pos_D, 
    calc_cursor_pos_U, 
    hide_all_menu, 
    high_light_on, 
} from "./F_default_menu";
import { display_load_menu, display_save_menu } from "./F_save_menu";
import { display_hres_menu } from "./F_hres_menu";
import { g_ctls, g_mvm }     from "./global_for_guild";


let dom_view_switch : HTMLDivElement;
let menu_list: HTMLUListElement;
let idx_guld: number = 0;

let menu_fnc: {[id: string]: number};

let mode = '';

export function display_guld_menu(): void { 
    hide_all_menu(); 
    try { 
        dom_view_switch = document.getElementById('gld_view_switch_guld') as HTMLDivElement; 
        menu_list       = document.getElementById('guld_menu_list') as HTMLUListElement; 
    } catch (err) { 
        alert('Guild Menu Get Element Error. ' + err);
        return;
    } 

    if (dom_view_switch === null) return; 
    if (menu_list === null) return; 

    dom_view_switch.style.display = 'block'; 

    init_all(); 
    update_all(); 
}

function init_all() {
    mode = 'view';
    init_data_list(); 
    init_view(); 
    init_ctls(); 
}

function update_all() {
    update_data_list();
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
    idx_guld = 0;
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

function init_ctls(): boolean {
    if (!init_default_ctls()) return false;
    return true;
}
function init_default_ctls(): boolean {
    try {
        if (!g_ctls.add('guld_nor',  guld_ctls_nor))  return false;
        if (!g_ctls.act('guld_nor')) return false;
        return true;
    } catch (err) {
        return false;
    }
}
const guld_ctls_nor = {
    name: 'guld_nor', 
    do_U:  do_U,
    do_D:  do_D,
    isOK:  isOK,
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
        case 'guld_hres': 
            g_ctls.deact();
            display_hres_menu();
            break;
/*
        case 'guld_edit': break;
        case 'guld_appd': 
            g_ctls.deact();
            display_appd_menu();
            break;
*/
        case 'guld_load': 
            g_ctls.deact();
            display_load_menu();
            break;
        case 'guld_save': 
            g_ctls.deact();
            display_save_menu();
            break;
        case 'guld_to_maze': break;
    }
}

function display_default_message(): void {
    g_mvm.clear_message();
}
