import { T_MzKind }                   from "../common/T_MzKind";
import { I_HopeAction }               from "../common/I_Common";
import { C_Point }                    from "../common/C_Point";
import { instant_load, instant_save } from "../common/F_load_and_save";
import { T_CtlsMode }                 from "./T_CtlsMode";
import { hide_controlles }            from "./F_set_controlles";
import { set_camp_controlles }        from "./F_set_camp_controlles";
import { set_g_save }                 from "./F_set_save_controlles";
import { display_maze2D, display_maze3D, 
         maze3D_blink_on_direction, maze3D_blink_off_direction }     from "./F_display_maze";
import { set_Up_controlles, set_Dn_controlles, set_UD_controlles }   from "./F_set_UD_controlles";
import { 
    g_debug_mode, 
    g_ctls_mode, 
    g_mvm, 
    g_vsw, 
    g_maze, 
    g_team,
    do_load_bottom_half, 
} from "./global_for_maze";

export function clr_move_controlles(): void {
    const u_arr = document.getElementById('u_arr') as HTMLButtonElement;
    const d_arr = document.getElementById('d_arr') as HTMLButtonElement;
    const r_arr = document.getElementById('r_arr') as HTMLButtonElement;
    const l_arr = document.getElementById('l_arr') as HTMLButtonElement;
    const c_btn = document.getElementById('c_btn')   as HTMLButtonElement;

    window.removeEventListener('keypress', key_press_function1);

    u_arr.removeEventListener("click", go_F);
    d_arr.removeEventListener("click", go_B);
    r_arr.removeEventListener("click", tr_R);
    l_arr.removeEventListener("click", tr_L);
    c_btn.removeEventListener("click", camp);

    u_arr.style.setProperty('display', 'none');
    d_arr.style.setProperty('display', 'none');
    r_arr.style.setProperty('display', 'none');
    l_arr.style.setProperty('display', 'none');
    c_btn.style.setProperty('display', 'none');
}

export function set_move_controlles(): void {
    hide_controlles();
    g_ctls_mode[0] = T_CtlsMode.Move;
    const u_arr = document.getElementById('u_arr') as HTMLButtonElement;
    const d_arr = document.getElementById('d_arr') as HTMLButtonElement;
    const r_arr = document.getElementById('r_arr') as HTMLButtonElement;
    const l_arr = document.getElementById('l_arr') as HTMLButtonElement;
    const c_btn = document.getElementById('c_btn') as HTMLButtonElement;

    u_arr.addEventListener("click", go_F, false);
    d_arr.addEventListener("click", go_B, false);
    r_arr.addEventListener("click", tr_R, false);
    l_arr.addEventListener("click", tr_L, false);
    c_btn  .addEventListener("click", camp, false);

    window.addEventListener('keypress', key_press_function1); 

    u_arr.style.setProperty('display', 'block');
    d_arr.style.setProperty('display', 'block');
    r_arr.style.setProperty('display', 'block');
    l_arr.style.setProperty('display', 'block');
    c_btn  .style.setProperty('display', 'block');

    const ctl_view = document.getElementById('move_ctl_view') as HTMLDivElement;
    ctl_view?.style.setProperty('display', 'block');
}

function key_press_function1(e: KeyboardEvent):void  {
    switch(e.code) { // Arrowは反応せず(イベント自体が発生せず)
        case 'ArrowUp': 
        case 'KeyK': 
        case 'Numpad5': 
                (document.getElementById('u_arr') as HTMLButtonElement)?.click();
                break;
        case 'ArrowDown': 
        case 'KeyJ': 
        case 'Numpad2': 
                (document.getElementById('d_arr') as HTMLButtonElement)?.click();
                break;
        case 'ArrowLeft': 
        case 'KeyH': 
        case 'Numpad1': 
                (document.getElementById('l_arr') as HTMLButtonElement)?.click();
                break;
        case 'ArrowRight': 
        case  'Numpad3': 
                (document.getElementById('r_arr') as HTMLButtonElement)?.click();
                break;
        case 'KeyC':
                (document.getElementById('c_btn')   as HTMLButtonElement)?.click();
                break;
        case 'KeyL':
            if (g_debug_mode) {
                do_instant_load();
            } else {
                (document.getElementById('r_arr') as HTMLButtonElement)?.click();
            }
            break;
        case 'KeyS': 
            if (g_debug_mode) { 
                do_instant_save();
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

export function do_instant_load(): void {
    instant_load().then((jsonObj:any)=>{  
        do_load_bottom_half('ロードしました');  
    });
}

export function do_instant_save(): void {
    set_g_save(
        /* save_id: */   -1,
        /* uniq_no: */   -1,
        /* title: */     '簡易保存データ', 
        /* detail: */    '', 
                    `『${g_maze.get_name()}』 ` 
                    + `地下 ${g_team.get_pd().z + 1}階層 ` 
                    + `(X: ${g_team.get_pd().x}, Y: ${g_team.get_pd().y})`,
        /* auto_mode: */ true,
    );
    instant_save();
}




function clear_mask_around_the_team(): void {
    g_maze.clear_mask_around_the_team(g_team);
}

function change_unexp_to_floor(p: C_Point): void {
    g_maze.change_unexp_to_floor(p);
}

function go_F(): void {
    const rslt = g_team.hope_p_fwd();
    move_check(rslt);
    do_move_bottom_half('blink_on');
}
function go_B(): void {
    const rslt = g_team.hope_p_bak();
    move_check(rslt);
    do_move_bottom_half('blink_on');
}
function tr_R(): void {
    const rslt = g_team.hope_turn_r();
    move_check(rslt);
    do_move_bottom_half('blink_off');
}
function tr_L(): void {
    const rslt = g_team.hope_turn_l();
    move_check(rslt);
    do_move_bottom_half('blink_off');
}
function move_check(r: I_HopeAction): void {
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


export function do_move_bottom_half(blink_mode: string): void {   //alert('Floor? = ' + g_team.get_p().z);
    change_unexp_to_floor(g_team.get_pd());
    clear_mask_around_the_team();
    display_maze2D();
    display_maze3D();
    if (blink_mode === 'blink_on') maze3D_blink_on_direction();
    else maze3D_blink_off_direction();
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


function camp(): void {
    g_vsw.view_camp();
    set_camp_controlles();
}
