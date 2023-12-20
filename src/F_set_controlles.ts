import { I_HasHope, I_HopeAction } from "./I_EventMap";
import { T_MzKind } from "./T_MzKind";
import { display_maze2D, display_maze3D, 
         maze3D_blink_on_direction, maze3D_blink_off_direction } from "./F_display_maze";
import { g_maze, g_hero, g_debug_mode } from "./global";

export function set_move_controlles() {
    hide_controlles();
    const u_arrow = document.getElementById('u_arrow') as HTMLButtonElement;
    const d_arrow = document.getElementById('d_arrow') as HTMLButtonElement;
    const r_arrow = document.getElementById('r_arrow') as HTMLButtonElement;
    const l_arrow = document.getElementById('l_arrow') as HTMLButtonElement;

    u_arrow?.addEventListener("click", ()=>{go_F();}, false);
    d_arrow?.addEventListener("click", ()=>{go_B();}, false);
    r_arrow?.addEventListener("click", ()=>{tr_R();}, false);
    l_arrow?.addEventListener("click", ()=>{tr_L();}, false);

    window.addEventListener('keypress', (event)=>{
        switch(event.code) { // Arrowは反応せず(イベント自体が発生せず)
            case 'ArrowUp': 
            case 'KeyK': 
            case 'Numpad5': 
                u_arrow?.click();break;
            case 'ArrowDown': 
            case 'KeyJ': 
            case 'Numpad2': 
                d_arrow?.click();break;
            case 'ArrowRight': 
            case 'KeyL': 
            case 'Numpad3': 
                r_arrow?.click();break;
            case 'ArrowLeft': 
            case 'KeyH': 
            case 'Numpad1': 
                l_arrow?.click();break;
            case 'KeyU':
                if (g_debug_mode && g_hero.get_z() > 0) {
                    g_hero.set_z(g_hero.get_z() - 1);
                    do_bottom_half('blink_off');
                }
                break;
            case 'KeyD':
                if (g_debug_mode && g_hero.get_z() < (g_maze.get_z_max() - 1)) {
                    g_hero.set_z(g_hero.get_z() + 1);
                    do_bottom_half('blink_off');
                }
                break;
        }
    });
    const ctl_view = document.getElementById('move_ctl_view') as HTMLDivElement;
    ctl_view?.style.setProperty('display', 'block');
}

    /************ *************************** **************/
    /*  HTMLPreElement = document.createElement('pre');    */
    /*  HTMLElement?.setAttribute('id', 'u_arraw');        */
    /*  HTMLElement?.style.setProperty('display', 'grid'); */
    /*  HTMLElement?.appendChild(HTMLElement);             */
    /************ *************************** **************/

function hide_controlles() {
    const move_ctl_view = document.getElementById('move_ctl_view') as HTMLDivElement;
    move_ctl_view?.style.setProperty('display', 'none');
}


function clear_mask_around_the_hero(): void {
    g_maze.clear_mask_around_the_hero();
}

function change_unexp_to_floor(): void {
    g_maze.change_unexp_to_floor();
}

function go_F() {
    const rslt = g_hero.hope_p_fwd();
    move_check(rslt);
    do_bottom_half('blink_on');
}
function go_B() {
    const rslt = g_hero.hope_p_bak();
    move_check(rslt);
    do_bottom_half('blink_on');
}
function tr_R() {
    const rslt = g_hero.hope_turn_r();
    move_check(rslt);
    do_bottom_half('blink_off');
}
function tr_L() {
    const rslt = g_hero.hope_turn_l();
    move_check(rslt);
    do_bottom_half('blink_off');
}
function move_check(r: I_HopeAction) {
    if (!r.has_hope) return;
    if (r.hope == 'Turn') {
        r.doOK();
        return;
    }
    if (r.hope == 'Move') {
        switch (g_maze.get_cell(r.subj)) {
            case T_MzKind.Floor:
            case T_MzKind.Unexp:
            case T_MzKind.StrUp:
            case T_MzKind.StrDn:
                 r.doOK();return;
        }
        r.doNG();
        return;
    }
} 

export function do_bottom_half(blink_mode: string): void {   //alert('Floor? = ' + g_hero.get_p().z);
    change_unexp_to_floor();
    clear_mask_around_the_hero();
    display_maze2D();
    display_maze3D();
    if (blink_mode === 'blink_on') maze3D_blink_on_direction();
    else maze3D_blink_off_direction();
}
