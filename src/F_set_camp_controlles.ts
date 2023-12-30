import { T_CtlsMode }      from "./T_CtlsMode";
import { hide_controlles } from "./F_set_controlles";
import { g_ctls_mode, g_mes, g_mvm, g_pid, g_vsw }     from "./global";
import { set_move_controlles, do_move_bottom_half } from "./F_set_move_controlles";
import { set_save_controlles, display_save_list, set_load_controlles   } from "./F_set_save_controlles";

var canUp: boolean  =  false;
var canDn: boolean  =  false;

const mode:  string[] =  ['Load', 'Save'];
var   idx:   number   =   0;

export function clr_camp_controlles(): void {
    const u_arrow = document.getElementById('u_arrow') as HTMLButtonElement;
    const d_arrow = document.getElementById('d_arrow') as HTMLButtonElement;
    const y_btn   = document.getElementById('y_btn')   as HTMLButtonElement;
    const n_btn   = document.getElementById('n_btn')   as HTMLButtonElement;

    u_arrow.removeEventListener("click", do_U, false);
    d_arrow.removeEventListener("click", do_D, false);
    y_btn  .removeEventListener("click", isOK, false);
    n_btn  .removeEventListener("click", isNG, false);

    window.removeEventListener('keypress', key_press_function3);

    u_arrow.style.setProperty('display', 'none');
    d_arrow.style.setProperty('display', 'none');
    y_btn  .style.setProperty('display', 'none');
    n_btn  .style.setProperty('display', 'none');
}

export function set_camp_controlles(): void {
    hide_controlles();
    g_ctls_mode[0] = T_CtlsMode.Camp;

    const u_arrow = document.getElementById('u_arrow') as HTMLButtonElement;
    const d_arrow = document.getElementById('d_arrow') as HTMLButtonElement;
    const y_btn   = document.getElementById('y_btn')   as HTMLButtonElement;
    const n_btn   = document.getElementById('n_btn')   as HTMLButtonElement;

    u_arrow.addEventListener("click", do_U, false);
    d_arrow.addEventListener("click", do_D, false);
    y_btn  .addEventListener("click", isOK, false);
    n_btn  .addEventListener("click", isNG, false);

    window.addEventListener('keypress', key_press_function3);

    u_arrow.style.setProperty('display', 'block');
    d_arrow.style.setProperty('display', 'block');
    y_btn  .style.setProperty('display', 'block');
    n_btn  .style.setProperty('display', 'block');

    const ctl_view = document.getElementById('move_ctl_view') as HTMLDivElement;
    ctl_view?.style.setProperty('display', 'block');

    idx = 0; high_light_on();

}


function key_press_function3(e: KeyboardEvent):void  {
    switch(e.code) { // Arrowは反応せず(イベント自体が発生せず)
        case 'ArrowUp': 
        case 'KeyK': 
        case 'Numpad5': 
            (document.getElementById('u_arrow') as HTMLButtonElement)?.click();
            return;
        case 'ArrowDown': 
        case 'KeyJ': 
        case 'Numpad2': 
            (document.getElementById('d_arrow') as HTMLButtonElement)?.click();
            return;
        case 'KeyO':
        case 'KeyY':
        case 'Digit0':
        case 'Enter':
        case 'NumpadEnter':
            (document.getElementById('y_btn') as HTMLButtonElement)?.click();
            return;
        case 'KeyN':
        case 'KeyX':
        case 'Numpad0':
        case 'NumpadAdd':
//        case 'NumpadSubtract':
            (document.getElementById('n_btn') as HTMLButtonElement)?.click();
            return;
    }
}

function isOK() {
    const camp_list = document.getElementById('camp_list') as HTMLUListElement;
    if (camp_list === null) return;

    const children = camp_list.children;
    if (idx < 0 || idx > children.length - 1) return;

    const li = children.item(idx) as HTMLLIElement;
    switch (li.id) {
        case 'camp_load': do_load();return;
        case 'camp_save': do_save();return;
    }
}

function isNG() {
    g_mvm.clear_message();
    set_move_controlles();
    g_vsw.view_maze();
    do_move_bottom_half('blink_off');
}


function do_U() {
    g_mvm.clear_message();
    idx = (idx > 0) ? --idx : idx;
    high_light_on(); 
}

function do_D() {
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