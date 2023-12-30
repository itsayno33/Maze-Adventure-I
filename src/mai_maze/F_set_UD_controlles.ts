import { T_CtlsMode }       from "./T_CtlsMode";
import { hide_controlles }  from "./F_set_controlles";
import { UD_save }          from "./F_load_and_save";
import { set_move_controlles, do_move_bottom_half } from "./F_set_move_controlles";
import { g_debug_mode, g_ctls_mode, g_mvm }         from "./global_for_maze";
import { g_maze, g_team,  } from "../common/global";


export function clr_UD_controlles(): void {
    canUp = false;
    canDn = false;
    isUp  = false;

    const u_arrow = document.getElementById('u_arrow') as HTMLButtonElement;
    const d_arrow = document.getElementById('d_arrow') as HTMLButtonElement;
    const y_btn   = document.getElementById('y_btn')   as HTMLButtonElement;
    const n_btn   = document.getElementById('n_btn')   as HTMLButtonElement;

    window.removeEventListener('keypress', key_press_function2);

    u_arrow.removeEventListener("click", hope_Up);
    d_arrow.removeEventListener("click", hope_Down);

    y_btn.removeEventListener("click", do_up);
    y_btn.removeEventListener("click", do_down);
    y_btn.removeEventListener("click", do_UD);
    n_btn.removeEventListener("click", do_cancel);

    u_arrow.style.setProperty('display', 'none');
    d_arrow.style.setProperty('display', 'none');
    y_btn.style  .setProperty('display', 'none');
    n_btn.style  .setProperty('display', 'none');
}



var canUp: boolean  =  false;
var canDn: boolean  =  false;

var isUp:  boolean  =  false;

export function set_Up_controlles() {
    g_mvm.notice_message('上りテレポーターが有ります。登りますか？登る ⇒ 〇 登らない ⇒ ✖');

    hide_controlles();
    canUp = true;
    canDn = false;
    __set_UD_controlles();
}

export function set_Dn_controlles() {
    g_mvm.notice_message('下りテレポーターが有ります。降りますか？降りる ⇒ 〇 降りない ⇒ ✖');

    hide_controlles();
    canUp = false;
    canDn = true;
    __set_UD_controlles();
}

export function set_UD_controlles() {
    g_mvm.notice_message('上下テレポーターが有ります。登りますか？登る⇒ 〇 降りる ⇒ (↓キー) 移動しない ⇒ ✖');

    hide_controlles();
    canUp = true;
    canDn = true;
    __set_UD_controlles();
}

function __set_UD_controlles() {
    g_ctls_mode[0] = T_CtlsMode.UD;

    const y_btn = document.getElementById('y_btn') as HTMLButtonElement;
    const n_btn = document.getElementById('n_btn') as HTMLButtonElement;
    y_btn.style.setProperty('display', 'block');
    n_btn.style.setProperty('display', 'block');

    n_btn.addEventListener("click", do_cancel, false);

    if (canUp && !canDn) {
        y_btn.addEventListener("click", do_up,     false);
    } 
    if (canDn && !canUp) {
        y_btn.addEventListener("click", do_down,   false);
    }
    if (canUp && canDn) {
        y_btn.addEventListener("click", do_UD,     false);

        const u_arrow = document.getElementById('u_arrow') as HTMLButtonElement;
        u_arrow.addEventListener("click", hope_Up, false);
        u_arrow.style.setProperty('display', 'block');

        const d_arrow = document.getElementById('d_arrow') as HTMLButtonElement;
        d_arrow.addEventListener("click", hope_Down, false);
        d_arrow.style.setProperty('display', 'block');

        if (isUp)  u_arrow.style.setProperty('visibility', 'hidden');
        else       u_arrow.style.setProperty('visibility', 'visible');

        if (!isUp) d_arrow.style.setProperty('visibility', 'hidden');
        else       d_arrow.style.setProperty('visibility', 'visible');
    }
    window.addEventListener('keypress', key_press_function2);

    const ctl_view = document.getElementById('move_ctl_view') as HTMLDivElement;
    ctl_view.style.setProperty('display', 'block');
}

function key_press_function2(e: KeyboardEvent):void  {
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
        case 'KeyU':
            if (g_debug_mode && g_team.get_z() > 0) {
                g_team.set_z(g_team.get_z() - 1);
                return;
            }
            if (canUp) {
                (document.getElementById('u_arrow') as HTMLButtonElement)?.click();
            }
            return;
        case 'KeyD':
            if (g_debug_mode && g_team.get_z() < (g_maze.get_z_max() - 1)) {
                g_team.set_z(g_team.get_z() + 1);
                return;
            }
            if (canDn) {
                (document.getElementById('d_arrow') as HTMLButtonElement)?.click();
            }
            return;
    }
}

function do_cancel(): void {
    g_mvm.clear_message();
    set_move_controlles();
}

function do_up(): void {
    const rslt = g_team.hope_p_up();
    if (!rslt.has_hope || !g_maze.within(rslt.subj)) {
        rslt.doNG();
    } else {
        UD_save();
        rslt.doOK();
    }
    g_mvm.clear_message();
    set_move_controlles();
    do_move_bottom_half('blink_off');
}

function do_down(): void {
    const rslt = g_team.hope_p_down();
    if (!rslt.has_hope || !g_maze.within(rslt.subj)) {
        rslt.doNG();
    } else {
        UD_save();
        rslt.doOK();
    }
    g_mvm.clear_message();
    set_move_controlles();
    do_move_bottom_half('blink_off');
}

function do_UD(): void {
    if (!canUp || !canDn) return;
    
    if (isUp) do_up();
    else      do_down();
}

function hope_Up(): void {
    if (!canUp || !canDn) return;
    isUp = true;
    document.getElementById('u_arrow')?.style.setProperty('visibility', 'hidden');
    document.getElementById('d_arrow')?.style.setProperty('visibility', 'visible');
    g_mvm.notice_message('登りますか？登る⇒ 〇 降りる ⇒ (↓キー) 移動しない ⇒ ✖');
}
function hope_Down(): void {
    if (!canUp || !canDn) return;
    isUp = false;
    document.getElementById('u_arrow')?.style.setProperty('visibility', 'hidden');
    document.getElementById('d_arrow')?.style.setProperty('visibility', 'visible');
    g_mvm.notice_message('降りますか？降りる⇒ 〇 登る ⇒ (↑キー) 移動しない ⇒ ✖');
}

