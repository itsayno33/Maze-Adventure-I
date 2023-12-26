import { hide_controlles }            from "./F_set_controlles";
import { I_HopeAction }               from "./I_EventMap";
import { T_MzKind }                   from "./T_MzKind";
import { T_CtlsMode }                 from "./T_CtlsMode";
import { instant_load, instant_save } from "./F_laod_and_save";
import { display_maze2D, display_maze3D, 
         maze3D_blink_on_direction, maze3D_blink_off_direction }   from "./F_display_maze";
import { set_Up_controlles, set_Dn_controlles, set_UD_controlles } from "./F_set_UD_controlles";
import { g_maze, g_team, g_debug_mode, g_ctls_mode, g_mvm } from "./global";

export function clr_move_controlles(): void {
    const u_arrow = document.getElementById('u_arrow') as HTMLButtonElement;
    const d_arrow = document.getElementById('d_arrow') as HTMLButtonElement;
    const r_arrow = document.getElementById('r_arrow') as HTMLButtonElement;
    const l_arrow = document.getElementById('l_arrow') as HTMLButtonElement;

    window.removeEventListener('keypress', key_press_function1);

    u_arrow.removeEventListener("click", go_F);
    d_arrow.removeEventListener("click", go_B);
    r_arrow.removeEventListener("click", tr_R);
    l_arrow.removeEventListener("click", tr_L);

    u_arrow.style.setProperty('display', 'none');
    d_arrow.style.setProperty('display', 'none');
    l_arrow.style.setProperty('display', 'none');
    r_arrow.style.setProperty('display', 'none');
}

export function set_move_controlles(): void {
    hide_controlles();
    g_ctls_mode[0] = T_CtlsMode.Move;
    const u_arrow = document.getElementById('u_arrow') as HTMLButtonElement;
    const d_arrow = document.getElementById('d_arrow') as HTMLButtonElement;
    const r_arrow = document.getElementById('r_arrow') as HTMLButtonElement;
    const l_arrow = document.getElementById('l_arrow') as HTMLButtonElement;

    u_arrow.addEventListener("click", go_F, false);
    d_arrow.addEventListener("click", go_B, false);
    r_arrow.addEventListener("click", tr_R, false);
    l_arrow.addEventListener("click", tr_L, false);

    window.addEventListener('keypress', key_press_function1);

    u_arrow.style.setProperty('display', 'block');
    d_arrow.style.setProperty('display', 'block');
    l_arrow.style.setProperty('display', 'block');
    r_arrow.style.setProperty('display', 'block');

    const ctl_view = document.getElementById('move_ctl_view') as HTMLDivElement;
    ctl_view?.style.setProperty('display', 'block');
}

function key_press_function1(e: KeyboardEvent):void  {
    switch(e.code) { // Arrowは反応せず(イベント自体が発生せず)
        case 'ArrowUp': 
        case 'KeyK': 
        case 'Numpad5': 
                (document.getElementById('u_arrow') as HTMLButtonElement)?.click();
                break;
        case 'ArrowDown': 
        case 'KeyJ': 
        case 'Numpad2': 
                (document.getElementById('d_arrow') as HTMLButtonElement)?.click();
                break;
        case 'ArrowLeft': 
        case 'KeyH': 
        case 'Numpad1': 
                (document.getElementById('l_arrow') as HTMLButtonElement)?.click();
                break;
        case 'ArrowRight': 
        case  'Numpad3': 
                (document.getElementById('r_arrow') as HTMLButtonElement)?.click();
                break;
        case 'KeyL':
            if (g_debug_mode) {
                instant_load();
            } else {
                (document.getElementById('r_arrow') as HTMLButtonElement)?.click();
            }
            break;
        case 'KeyS': 
            if (g_debug_mode) { 
                instant_save();
                do_move_bottom_half('blink_off');
            }
            break;
        case 'KeyU':
            if (g_ctls_mode[0] == T_CtlsMode.Move && g_debug_mode && g_team.get_z() > 0) {
                g_team.set_z(g_team.get_z() - 1);
                do_move_bottom_half('blink_off');
            }
            break;
        case 'KeyD':
            if (g_ctls_mode[0] == T_CtlsMode.Move && g_debug_mode && g_team.get_z() < (g_maze.get_z_max() - 1)) {
                g_team.set_z(g_team.get_z() + 1);
                do_move_bottom_half('blink_off');
            }
            break;
    }
}

    /************ *************************** **************/
    /*  HTMLPreElement = document.createElement('pre');    */
    /*  HTMLElement?.setAttribute('id', 'u_arraw');        */
    /*  HTMLElement?.style.setProperty('display', 'grid'); */
    /*  HTMLElement?.appendChild(HTMLElement);             */
    /************ *************************** **************/

function clear_mask_around_the_team(): void {
    g_maze.clear_mask_around_the_team();
}

function change_unexp_to_floor(): void {
    g_maze.change_unexp_to_floor();
}

function go_F() {
    const rslt = g_team.hope_p_fwd();
    move_check(rslt);
    do_move_bottom_half('blink_on');
}
function go_B() {
    const rslt = g_team.hope_p_bak();
    move_check(rslt);
    do_move_bottom_half('blink_on');
}
function tr_R() {
    const rslt = g_team.hope_turn_r();
    move_check(rslt);
    do_move_bottom_half('blink_off');
}
function tr_L() {
    const rslt = g_team.hope_turn_l();
    move_check(rslt);
    do_move_bottom_half('blink_off');
}
function move_check(r: I_HopeAction) {
    g_mvm.clear_message();
    if (!r.has_hope) return;
    if (r.hope == 'Turn') {
        r.doOK();
        return;
    }
    if (r.hope == 'Move') {
        const kind = g_maze.get_cell(r.subj);
        switch (kind) {
            case T_MzKind.Floor:
            case T_MzKind.Unexp:
                 r.doOK();return;
            case T_MzKind.StrUp:
            case T_MzKind.StrDn:
            case T_MzKind.StrUD:
                 r.doOK();
                 do_stairs_motion(kind);
                 return;
        }
        g_mvm.normal_message('進めない！（笑）');
        r.doNG();
        return;
    }
} 

function do_stairs_motion(kind: T_MzKind): void {
    switch (kind) {
        case T_MzKind.StrUp:
            set_Up_controlles();
            break;
        case T_MzKind.StrDn:
            set_Dn_controlles();
            break;
        case T_MzKind.StrUD:
            set_UD_controlles();
            break;
    }
}


export function do_move_bottom_half(blink_mode: string): void {   //alert('Floor? = ' + g_team.get_p().z);
    change_unexp_to_floor();
    clear_mask_around_the_team();
    display_maze2D();
    display_maze3D();
    if (blink_mode === 'blink_on') maze3D_blink_on_direction();
    else maze3D_blink_off_direction();
}
