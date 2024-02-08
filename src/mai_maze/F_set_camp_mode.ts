import { _isNum }          from "../d_utl/F_Math";
import { C_CtlCursor }     from "../d_ctl/C_CtlCursor";
import { do_move_bottom_half, act_move_mode } from "./F_set_move_mode";
import { act_load_mode, act_save_mode   }     from "./F_set_save_mode";
import { act_mvpt_mode}                       from "./F_set_mvpt_mode";
import { g_ctls, g_cvm, g_vsw }               from "./global_for_maze";

let   dom_camp_list:  HTMLUListElement;
let   camp_list_crsr: C_CtlCursor;
let   idx:   number   =   0;

const ctls_camp_nor = {
    name: 'camp_nor', 
    do_U:  do_U,
    do_D:  do_D,
    isOK:  isOK,
    isNG:  isNG,
    cpRT:  isNG,
}

export function init_camp_mode(): void {
    g_ctls.add('camp_nor', ctls_camp_nor);
    init_view();
}
export function act_camp_mode(): void {
    idx = 0;
    camp_list_crsr.set_pos(idx);
    g_ctls.act('camp_nor');
    g_vsw.view(g_vsw.Camp()); 
}

function init_view(): boolean {
    try {
        const menu_list   = document.getElementById('camp_list') as HTMLUListElement;
        for (var i = 0; i < menu_list.children.length; i++) {
            const item = menu_list.children[i] as HTMLLIElement;
            item.addEventListener("click", _OK_camp_Fnc, false);
        }

        dom_camp_list  = document.getElementById('camp_list') as HTMLUListElement;
        camp_list_crsr = C_CtlCursor.get(dom_camp_list);
    } catch(err) {
        alert('Error: ' + err);
        return false;
    }
    return true;
}
function _OK_camp_Fnc(this: HTMLLIElement, e: MouseEvent): void {
    __isOK(this.id);
}

function isOK(): void {
    const camp_list = document.getElementById('camp_list') as HTMLUListElement;
    if (camp_list === null) return;

    const children = camp_list.children;
    if (idx < 0 || idx > children.length - 1) return;

    const li = children.item(idx) as HTMLLIElement;
    __isOK(li.id);
}
function __isOK(id: string): void {
    switch (id) {
        case 'camp_load': do_load();return;
        case 'camp_save': do_save();return;
        case 'camp_mvpt': do_mvpt();return;
    }
}

function isNG(): void {
    g_cvm.clear_message();
    act_move_mode();
    do_move_bottom_half('blink_off');
}


function do_U(): void {
    g_cvm.clear_message();
    idx = camp_list_crsr.pos_U();
}

function do_D(): void {
    g_cvm.clear_message();
    idx = camp_list_crsr.pos_D();
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
