import { _isNum }          from "../d_utl/F_Math";
import { T_CtlsMode }      from "./T_CtlsMode";
import { hide_controlles } from "./F_set_controlles";
import { set_move_controlles, do_move_bottom_half }   from "./F_set_move_controlles";
import { set_save_controlles, set_load_controlles   } from "./F_set_save_controlles";
import { set_mvpt_controlles }                        from "./F_set_mvpt_controlles";
import { g_ctls, g_ctls_mode, g_cvm, g_vsw }          from "./global_for_maze";
import { C_CtlCursor }     from "../d_ctl/C_CtlCursor";

const mode:  string[] =  ['Load', 'Save', 'MvPt'];

let   dom_camp_list:  HTMLUListElement;
let   camp_list_crsr: C_CtlCursor;
let   idx:   number   =   0;

export function set_camp_controlles(): void {
    g_ctls_mode[0] = T_CtlsMode.Camp;

    g_ctls.add('camp_nor', ctls_camp_nor);
    g_ctls.act('camp_nor');
    init_view();

    idx = 0;
    camp_list_crsr.set_pos(idx);
}
const ctls_camp_nor = {
    name: 'camp_nor', 
    do_U:  do_U,
    do_D:  do_D,
    isOK:  isOK,
    isNG:  isNG,
    cpRT:  isNG,
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
    g_vsw.view_move();
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
    g_vsw.view_load();
}

function do_save(): void {
    g_vsw.view_save();
}

function do_mvpt(): void {
    g_vsw.view_mvpt();
}
