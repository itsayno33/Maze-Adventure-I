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
    g_ctls_mode, 
    g_mvm, 
    g_vsw, 
    g_maze, 
    g_team,
    do_load_bottom_half,
    g_ctls, 
} from "./global_for_maze";


export function set_move_controlles(): void {
    hide_controlles();
    g_ctls_mode[0] = T_CtlsMode.Move;
    g_ctls.add('move_nor', ctls_move_nor);
    g_ctls.act('move_nor');

    const maze2D_view = document.getElementById('Maze_view2D_pre') as HTMLDivElement;
    maze2D_view?.style.setProperty('display', 'block');

    const ctl_view = document.getElementById('move_ctl_view') as HTMLDivElement;
    ctl_view?.style.setProperty('display', 'block');
}
const ctls_move_nor = {
    name: 'move_nor', 
    do_U:  go_F,
    do_D:  go_B,
    do_L:  tr_L,
    do_R:  tr_R,
    camp:  camp,
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
    g_mvm.clear_message();

    set_camp_controlles();
}
