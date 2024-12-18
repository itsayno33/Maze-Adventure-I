import { T_MzKind }                   from "../d_mdl/T_MzKind";
import { I_HopeAction }               from "../d_mdl/I_Common";
import { C_Point }                    from "../d_mdl/C_Point";
import { g_debug }                    from "../d_cmn/global";
import { instant_load, instant_save } from "../d_cmn/F_load_and_save";
import { act_menu_mode }                         from "./F_set_menu_mode";
import { act_Up_mode, act_Dn_mode, act_UD_mode } from "./F_set_UD_mode";
import { decode_all, set_g_save }                from "./F_set_save_mode";
import { display_mazeCh}                         from "./F_display_mazeCh"; 
import { display_maze3D, 
         maze3D_blink_on_direction, maze3D_blink_off_direction }   from "./F_display_maze3D";
import { 
    g_mvm, 
    g_vsw, 
    g_maze, 
    g_team,
    do_load_bottom_half,
    g_ctls,
    g_ds, 
} from "./global_for_maze";

const ctls_move_nor = {
    name: 'move_nor', 
    do_U:  go_F,
    do_D:  go_B,
    doUL:  go_L,
    doUR:  go_R,
    do_L:  tr_L,
    do_R:  tr_R,
    menu:  menu,
}

export function init_move_mode(): void {
    g_ctls.set(ctls_move_nor);
}

export function act_move_mode(): void {
    g_ctls.act(ctls_move_nor);
    g_vsw.view(g_vsw.Move());
    setCanvas3DClick();
}


    /************ *************************** **************/
    /*  HTMLPreElement = document.createElement('pre');    */
    /*  HTMLElement?.setAttribute('id', 'u_arraw');        */
    /*  HTMLElement?.style.setProperty('display', 'grid'); */
    /*  HTMLElement?.appendChild(HTMLElement);             */
    /************ *************************** **************/

export function do_instant_load(): void {
    instant_load().then((jsonObj:any)=>{  
        decode_all(jsonObj?.save);
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
    const rslt = g_team.walk().hope_p_fwd();
    move_check(rslt);
    do_move_bottom_half('blink_on');
}
function go_B(): void {
    const rslt = g_team.walk().hope_p_bak();
    move_check(rslt);
    do_move_bottom_half('blink_on');
}
function go_L(): void {
    const rslt = g_team.walk().hope_p_lft();
    move_check(rslt);
    do_move_bottom_half('blink_on');
}
function go_R(): void {
    const rslt = g_team.walk().hope_p_rgt();
    move_check(rslt);
    do_move_bottom_half('blink_on');
}
function tr_R(): void {
    const rslt = g_team.walk().hope_turn_r();
    move_check(rslt);
    do_move_bottom_half('blink_off');
}
function tr_L(): void {
    const rslt = g_team.walk().hope_turn_l();
    move_check(rslt);
    do_move_bottom_half('blink_off');
}
function move_check(r: I_HopeAction): void {
    g_mvm.clear_message();
    // 周囲にオブジェが有ればオブジェ接近処理
    around_obj(r);

    if (!r.has_hope) return;
    if (r.hope == 'Turn') {
        r.doOK();
        return;
    }
    if (r.hope == 'Move') {
        const cell = g_maze.get_cell(r.subj);

        // 進行方向が壁等なら移動不可
        if (!cell?.getObj().canThrough()) {
            dont_move(r);return;
        }
        const obj = g_maze.get_obj(r.subj);
        if (obj !== null) {
            if (obj.canThrough()) {
                // 進行方向にオブジェが有り通り抜け可能なら
                // 移動してオブジェ処理
                r.doOK();
                action_obj();
            } else {
                // 進行方向にオブジェが有り通り抜け不能なら
                // 移動せずにオブジェ接近処理(以降の階段処理等はスルー)
                dont_move(r);
                around_obj(r);
                return;
            }
        } else {
            // 進行方向にオブジェが無ければ移動
            r.doOK();
        }
        // 移動先が階段なら階段の処理
        const kind = cell?.getKind();
        switch (kind) {
            case T_MzKind.StrUp:
            case T_MzKind.StrDn:
            case T_MzKind.StrUD:
                do_stairs_motion(kind);
        }
        return;
    }
} 
function dont_move(r: I_HopeAction): void {
    g_mvm.normal_message('進めない！（笑）');
    r.doNG();
    return;
}
// オブジェ接近処理
function around_obj(r: I_HopeAction): void {} 
// オブジェ処理
function action_obj(): void {}

export function do_move_bottom_half(blink_mode: string): void {   //alert('Floor? = ' + g_team.get_p().z);
    change_unexp_to_floor(g_team.get_pd());
    display_maze3D();
    display_maze_name();
    if (blink_mode === 'blink_on') maze3D_blink_on_direction();
    else maze3D_blink_off_direction();
    if (!mask_cleared()) {
        clear_mask_around_the_team(); 
        if (mask_cleared()) alert('この階を制覇しました！！') /* **************************** */
    }
    display_mazeCh();
}

function mask_cleared(): boolean {return g_maze.is_cleared(g_team.get_pd())}

function display_maze_name(): void {
    try {
        const p = document.getElementById('maze_view3D_maze_name_info') as HTMLParagraphElement;
        p.innerHTML = g_maze.get_name();
    } catch (err) {};
}


function setCanvas3DClick(): void {
    if (g_ds?.canvas === null)     return;
    g_ds.canvas.onclick = canvas3Dclick;
}
function clrCanvas3DClick(): void {
    if (g_ds?.canvas === null)     return;
    g_ds.canvas.onclick = ()=>{};
}

function canvas3Dclick(ev: MouseEvent): void {
    if (g_ds?.canvas === null)     return;
    if (ev.target !== g_ds.canvas) return;

    const cvs = g_ds.canvas;
//debug    alert(`x=${(ev.offsetX??-1)}, y=${(ev.offsetY??-1)}`);

    const left_pane_r  = cvs.clientWidth  * 0.25;
    const rght_pane_l  = cvs.clientWidth  * 0.75;
    const back_pane_u  = cvs.clientHeight * 0.80;

    // キャンバスの左側
    if (ev.offsetX < left_pane_r) {(document.getElementById('l_arr') as HTMLButtonElement)?.click(); return;}
    // キャンバスの右側
    if (ev.offsetX > rght_pane_l) {(document.getElementById('r_arr') as HTMLButtonElement)?.click(); return;}
    //キャンバスの中央上(前進)
    if (ev.offsetY < back_pane_u) {(document.getElementById('u_arr') as HTMLButtonElement)?.click(); return;}
    // キャンバスの中央下(後退)
    (document.getElementById('d_arr') as HTMLButtonElement)?.click(); return;
}



function do_stairs_motion(kind: T_MzKind): void {
    switch (kind) {
        case T_MzKind.StrUp:
            clrCanvas3DClick();
            act_Up_mode();
            break;
        case T_MzKind.StrDn:
            clrCanvas3DClick();
            act_Dn_mode();
            break;
        case T_MzKind.StrUD:
            clrCanvas3DClick();
            act_UD_mode();
            break;
    }
}


function menu(): void {
    clrCanvas3DClick();
    g_mvm.clear_message();
    act_menu_mode();
}
