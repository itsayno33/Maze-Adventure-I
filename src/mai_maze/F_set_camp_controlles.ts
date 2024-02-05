import { T_CtlsMode }      from "./T_CtlsMode";
import { hide_controlles } from "./F_set_controlles";
import { set_move_controlles, do_move_bottom_half }   from "./F_set_move_controlles";
import { set_save_controlles, set_load_controlles   } from "./F_set_save_controlles";
import { set_mvpt_controlles }                        from "./F_set_mvpt_controlles";
import { g_ctls, g_ctls_mode, g_mvm, g_vsw } from "./global_for_maze";
import { g_mes }                     from "../common/global";

const mode:  string[] =  ['Load', 'Save', 'MvPt'];
var   idx:   number   =   0;


export function set_camp_controlles(): void {
    hide_controlles();
    g_ctls_mode[0] = T_CtlsMode.Camp;

    g_ctls.add('camp_nor', ctls_camp_nor);
    g_ctls.act('camp_nor');
    init_view();

    const ctl_view = document.getElementById('move_ctl_view') as HTMLDivElement;
    ctl_view?.style.setProperty('display', 'block');

    idx = 0; high_light_on();
}
const ctls_camp_nor = {
    name: 'camp_nor', 
    do_U:  do_U,
    do_D:  do_D,
    isOK:  isOK,
    isNG:  isNG,
}

function init_view(): boolean {
    try {
        const maze2D_view = document.getElementById('Maze_view2D_pre') as HTMLDivElement;
        maze2D_view?.style.setProperty('display', 'none');

        const menu_list   = document.getElementById('camp_list') as HTMLUListElement;
        for (var i = 0; i < menu_list.children.length; i++) {
            const item = menu_list.children[i] as HTMLLIElement;
            item.addEventListener("click", _OK_camp_Fnc, false);
        }
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
    g_mvm.clear_message();
    set_move_controlles();
    g_vsw.view_maze();
    do_move_bottom_half('blink_off');
}


function do_U(): void {
    g_mvm.clear_message();
    idx = (idx > 0) ? --idx : idx;
    high_light_on(); 
}

function do_D(): void {
    g_mvm.clear_message();
    idx = (idx < mode.length - 1) ? ++idx : idx;
    high_light_on(); 
}

function high_light_on(): void {
    const camp_list = document.getElementById('camp_list') as HTMLUListElement;
    if (camp_list === null) return;

    const children = camp_list.children;
    if (idx < 0 || idx > children.length - 1) return;

    for (var i = 0; i < children.length; i++) {
        const li = children.item(i) as HTMLLIElement;
        __high_light_on(li, false);
    }
    const li = children.item(idx) as HTMLLIElement;
    __high_light_on(li, true);
}

function __high_light_on(elm: HTMLElement | null, isOn: boolean): void {
    if (elm === null) return;
    const bg_color = elm.parentElement?.style.getPropertyValue('background-color') ?? 'white';
    elm.style.setProperty('background-color', bg_color);

    elm.style.setProperty('mix-blend-mode',   isOn ? 'differnce' : 'normal');
    elm.style.setProperty('font-weight',      isOn ? 'bold' : 'normal');
    for (var j = 0; j < elm.children.length; j++) {
        const p = elm.children.item(j) as HTMLElement;
        p.style.setProperty('display', isOn ? 'block' : 'none');
    }
}

function do_load(): void {
    g_mes.notice_message('Do Load!');
    set_load_controlles();
}

function do_save(): void {
    set_save_controlles();
}

function do_mvpt(): void {
    set_mvpt_controlles();
}
