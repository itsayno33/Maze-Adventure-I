import { C_CtlCursor }                  from "../d_ctl/C_CtlCursor";
import { act_load_menu, act_save_menu } from "./F_save_menu";
import { act_hres_menu }                from "./F_hres_menu";
import { act_tomz_menu }                from "./F_tomz_menu";
import { g_ctls, g_mvm, g_vsw }         from "./global_for_guild";

let menu_list: HTMLUListElement;
let menu_crsr: C_CtlCursor;

let idx_guld: number = 0;

let menu_fnc: {[id: string]: number};

export function init_guld_menu(): void {}

export function act_guld_menu(): void { 

    if (!init_all()) return; 
    update_all(); 
    g_vsw.view(g_vsw.Menu());
}

function init_all(): boolean {
    if (!init_data_list()) return false; 
    if (!init_view()) return false; 
    if (!init_ctls()) return false;
    return true; 
}

function update_all() {
    update_data_list();
    update_view(idx_guld);
}

function init_data_list(): boolean {return true;}
function update_data_list(){}
function exist_data(): boolean {
    return (idx_guld >= 0) && (idx_guld < menu_list.children.length);
}

function init_view(): boolean {
    if (!init_DOM())  return false;
    if (!init_menu()) return false;
    return true;
}

function init_DOM(): boolean {
    try { 
        menu_list = document.getElementById('guld_menu_list') as HTMLUListElement; 
    } catch (err) { 
        alert('Guild Menu Get Element Error. ' + err);
        return false;
    } 
    if (menu_list === null) return false;
    return true; 
}

function init_menu(): boolean {
    clear_view();
    menu_fnc = {};
    for (let ii = 0; ii < menu_list.children.length; ii++) {
        const menu_item = menu_list.children.item(ii) as HTMLElement;
        if (menu_item === null) continue;
        menu_fnc[menu_item.id] = ii;
        menu_item.addEventListener("click",_OK_Fnc, false);
    }
    menu_crsr = C_CtlCursor.getObj(menu_list);

    idx_guld = 0;
    menu_crsr.set_pos(idx_guld); 
    return menu_crsr.leng() > 0;
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
        g_ctls.deact();
        if (!g_ctls.set(guld_ctls_nor)) return false;
        if (!g_ctls.act(guld_ctls_nor)) return false;
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
    idx_guld = menu_crsr.pos_U();
}
function do_D(): void {
    display_default_message();
    idx_guld = menu_crsr.pos_D();
}

function isOK(): void {
    if (!exist_data()) return;
    display_default_message();

    switch ((menu_list.children.item(idx_guld) as HTMLLIElement).id) {
        case 'guld_hres': 
            g_ctls.deact();
            act_hres_menu();
            break;
        case 'guld_load': 
            g_ctls.deact();
            act_load_menu();
            break;
        case 'guld_save': 
            g_ctls.deact();
            act_save_menu();
            break;
        case 'guld_tomz': 
            g_ctls.deact();
            act_tomz_menu();
            break;
    }
}

function display_default_message(): void {
    g_mvm.clear_message();
}
