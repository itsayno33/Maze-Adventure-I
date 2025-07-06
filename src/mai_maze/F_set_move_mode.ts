import { T_MzKind }                   from "../d_mdl/T_MzKind";
import { I_HopeAction }               from "../d_mdl/C_Hope";
import { C_Point }                    from "../d_mdl/C_Point";
import { g_debug, g_mes }                    from "../d_cmn/global";
import { instant_load, instant_save } from "../d_cmn/F_load_and_save";
import { act_menu_mode }                         from "./F_set_menu_mode";
import { act_Up_mode, act_Dn_mode, act_UD_mode } from "./F_set_UD_mode";
import { decode_all, set_g_save }                from "./F_set_save_mode";
import { display_mazeCh }                        from "./F_display_mazeCh"; 
import { display_maze2D }                        from "./F_display_maze2D";
import { display_maze3D, 
         maze3D_blink_on_direction, 
         maze3D_blink_off_direction 
}                                                from "./F_display_maze3D";
import { 
    g_mvm, 
    g_vsw, 
    g_maze, 
    g_team,
    do_load_bottom_half,
    g_ctls,
    g_ds,
    g_hres,
    g_wndr, 
} from "./global_for_maze";
import { can_move_team, can_turn_team } from "./F_GM_Hres_move_and_turn";
import { _irand } from "../d_utl/F_Rand";

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
    const rslt = g_team.getWalker().hope_p_fwd();
    move_check(rslt);
    do_move_bottom_half('blink_on');
}
function go_B(): void {
    const rslt = g_team.getWalker().hope_p_bak();
    move_check(rslt);
    do_move_bottom_half('blink_on');
}
function go_L(): void {
    const rslt = g_team.getWalker().hope_p_lft();
    move_check(rslt);
    do_move_bottom_half('blink_on');
}
function go_R(): void {
    const rslt = g_team.getWalker().hope_p_rgt();
    move_check(rslt);
    do_move_bottom_half('blink_on');
}
function tr_R(): void {
    const rslt = g_team.getWalker().hope_turn_r();
    move_check(rslt);
    do_move_bottom_half('blink_off');
}
function tr_L(): void {
    const rslt = g_team.getWalker().hope_turn_l();
    move_check(rslt);
    do_move_bottom_half('blink_off');
}
function move_check(r: I_HopeAction): void {
    g_mvm.clear_message();
    //g_maze全体のオブジェ行動の処理
    action_obj();

    if (!r.has_hope) return;
    if (r.hope == 'Wait') {
//        g_team.getWalker().set_pd(r.subj);
        return;
    }
    if (r.hope == 'Turn') {
        const _rslt = can_turn_team(r);
        if (_rslt.ok) g_team.getWalker().set_pd(r.subj);
;
        return;
    }
    if (r.hope == 'Move') {
        const _rslt = can_move_team(r);
        if (_rslt.ok) {
            // 進行方向へ進む
            g_team.getWalker().set_pd(r.subj)
            // HP自動回復
            for (const hero of g_hres) {
                if (hero === undefined) continue;
                if (!hero.is_alive())   continue;
                hero.hp_auto_heal();
            }

            // 移動先が階段なら階段の処理
            const kind = g_maze.get_cell(r.subj)?.getKind();
            switch (kind) {
                case T_MzKind.StrUp:
                case T_MzKind.StrDn:
                case T_MzKind.StrUD:
                    do_stairs_motion(kind);
            }
        } else {               //   alert ( 'r.res = ' + _rslt.res ); 
            // 進行方向へ進めない
            // ダメージ処理
            const damage  = _irand(Math.trunc(_rslt.dmg * 0.9), Math.ceil(_rslt.dmg * 1.1));
            for (const hero of g_hres) hero.hp_damage(damage);
            dont_move(r);
        }
    }
/******************
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
****************/
} 
function dont_move(r: I_HopeAction): void {
    g_mvm.normal_message('進めない！（笑）');
    return;
}
// オブジェ接近処理
function around_obj(r: I_HopeAction): void {} 
// g_maze全体のオブジェの行動処理
function action_obj(): void {
    for (const wndr of g_wndr) {
        if (wndr === undefined) continue;
        const act = wndr.wonder();
        if (act.has_hope) {
            wndr.set_pd(act.subj);
            g_mes.normal_message(`近くのWanderWalkerが(x:${wndr.get_pd().x},y:${wndr.get_pd().y})(向:${wndr.get_pd().d})に${act.hope}しました。`);
        } else {
            g_mes.normal_message(`近くのWanderWalkerは何もしませんでした。`);
        }
    }
}

export function do_move_bottom_half(blink_mode: string): void {   //alert('Floor? = ' + g_team.get_p().z);
    change_unexp_to_floor(g_team.get_pd());
    display_maze3D();
    display_maze_name();

    if (blink_mode === 'blink_on') maze3D_blink_on_direction();
    else maze3D_blink_off_direction();
    
    if (!mask_floor_cleared()) {
        clear_mask_around_the_team(); 
        if (mask_floor_cleared()) {
            if (mask_maze_cleared()) alert('おめでとう！！この迷宮を制覇しました！！！');
            else                     alert('この階を制覇しました！！');
        }
    }
    display_maze2D();
    display_mazeCh();
}

function mask_floor_cleared(): boolean {return g_maze.is_floor_cleared(g_team.get_pd())}
function mask_maze_cleared():  boolean {return g_maze.is_maze_cleared()}

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
