import { _isNum }          from "../d_utl/F_Math";
import { C_CtlCursor }     from "../d_ctl/C_CtlCursor";
import { do_move_bottom_half, act_move_mode } from "./F_set_move_mode";
import { act_load_mode, act_save_mode   }     from "./F_set_save_mode";
import { act_mvpt_mode}                       from "./F_set_mvpt_mode";
import { g_ctls, g_cvm, g_vsw }               from "./global_for_maze";

let   dom_menu_list:  HTMLUListElement;
let   menu_list_crsr: C_CtlCursor;
let   idx:   number   =   0;

const ctls_menu_nor = {
    name: 'menu_nor', 
    do_U:  do_U,
    do_D:  do_D,
    isOK:  isOK,
    isNG:  isNG,
    isRT:  isNG,
    cpRT:  isNG,
}

export function init_menu_mode(): void {
    init_view();
    init_ctls();
}
export function act_menu_mode(): void {
    idx = 0;
    menu_list_crsr.set_pos(idx);
    g_ctls.act(ctls_menu_nor);
    g_vsw.view(g_vsw.Menu()); 
}

function init_view(): boolean {
    try {
        const menu_list   = document.getElementById('menu_list') as HTMLUListElement;
        for (var i = 0; i < menu_list.children.length; i++) {
            const item = menu_list.children[i] as HTMLLIElement;
            item.addEventListener("click", _OK_menu_Fnc, false);
        }

        dom_menu_list  = document.getElementById('menu_list') as HTMLUListElement;
        menu_list_crsr = C_CtlCursor.getObj(dom_menu_list);
    } catch(err) {
        alert('Error: ' + err);
        return false;
    }
    return true;
}
function _OK_menu_Fnc(this: HTMLLIElement, e: MouseEvent): void {
    __isOK(this.id);
}

function init_ctls(): void {
    g_ctls.set(ctls_menu_nor);
}


function isOK(): void {
    const menu_list = document.getElementById('menu_list') as HTMLUListElement;
    if (menu_list === null) return;

    const children = menu_list.children;
    if (idx < 0 || idx > children.length - 1) return;

    const li = children.item(idx) as HTMLLIElement;
    __isOK(li.id);
}
function __isOK(id: string): void {
    switch (id) {
        case 'menu_load': do_load();return;
        case 'menu_save': do_save();return;
        case 'menu_mvpt': do_mvpt();return;
    }
}

function isNG(): void {
    g_cvm.clear_message();
    act_move_mode();
    do_move_bottom_half('blink_off');
}


function do_U(): void {
    g_cvm.clear_message();
    idx = menu_list_crsr.pos_U();
}

function do_D(): void {
    g_cvm.clear_message();
    idx = menu_list_crsr.pos_D();
}

function do_load(): void {
    act_load_mode();
}

function do_save(): void {
    act_save_mode();
}

function do_mvpt(): void {
    act_mvpt_mode();
}
