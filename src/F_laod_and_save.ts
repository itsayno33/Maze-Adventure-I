import { alert_maze_info }     from "./C_Maze"; // 通常時はコメントアウトされている関数
import { alert_team_info }     from "./C_Team"; // 通常時はコメントアウトされている関数
import { alert_heroes_info }   from "./C_Hero"; // 通常時はコメントアウトされている関数

import { C_UrlOpt }            from "./C_UrlOpt";          
import { POST_and_get_JSON }   from "./F_POST";
import { init_controlles }     from "./F_set_controlles";
import { do_move_bottom_half } from "./F_set_move_controlles";
import { _round, _min, _max  } from "./F_Math";
import { g_maze, g_team, g_mes, g_mvm, init_debug_mode, g_pid, g_url, g_url_get_maze } from "./global";
import { T_save_list } from "./F_set_save_controlles";

export function get_mai_maze(): void {
    const get_maze_opt = new C_UrlOpt({pid: g_pid[0], mode: "new", num: 333});
 
    POST_and_get_JSON(g_url[g_url_get_maze], get_maze_opt)?.then(jsonObj=>{
        if (jsonObj.ecode != 0) {
            g_mes.warning_message("初期データを受信できませんでした\n" + jsonObj.emsg);
            alert(jsonObj.emsg);
            return;
        }

        const monitor = false;  // alertで受信したテキストを表示するときにtrueにする
        if (monitor) {
//            alert_maze_info(jsonObj?.maze);
            alert_team_info(jsonObj?.team);
            alert_heroes_info(jsonObj?.team?.heroes);
            
        }
            decode_all(jsonObj);
            init_debug_mode();
            init_controlles();
            do_move_bottom_half('blink_off');
    });
}

export async function get_save_info() {
    const opt = new C_UrlOpt();
    opt.set('mode',       'save_info'); 
    opt.set('pid',         g_pid[0]); 

    return await POST_and_get_JSON(g_url[g_url_get_maze], opt)?.then(jsonObj=>{
        if (jsonObj.ecode == 0) {
            g_mes.normal_message('正常にロードされました');
        
            const monitor = false;  // alertで受信したテキストを表示するときにtrueにする
            if (monitor) {
    //            alert_maze_info(jsonObj?.maze);
                alert_team_info(jsonObj?.team);
                alert_heroes_info(jsonObj?.team?.heroes);
            }
            return jsonObj;
        } else {
            g_mes.warning_message("ロードできませんでした\n" + jsonObj.emsg);
            return undefined;
        }
    });
}

export function instant_load(): void {
    __auto_load('instant_load');
}

export function UD_load(): void {
    __auto_load('UD_load');
}

function __auto_load(mode: string): void {
    const opt = new C_UrlOpt();
    opt.set('mode',        mode); 
    opt.set('pid',         g_pid[0]); 

    POST_and_get_JSON(g_url[g_url_get_maze], opt)?.then(jsonObj=>{
        if (jsonObj.ecode == 0) {
            g_mes.normal_message('正常にロードされました');
        
            const monitor = false;  // alertで受信したテキストを表示するときにtrueにする
            if (monitor) {
    //            alert_maze_info(jsonObj?.maze);
                alert_team_info(jsonObj?.team);
                alert_heroes_info(jsonObj?.team?.heroes);
            }
        
            decode_all(jsonObj);
            init_controlles();
            do_move_bottom_half('blink_off');
        } else {
            g_mes.warning_message("ロードできませんでした\n" + jsonObj.emsg);
            alert(jsonObj.emsg);
        }
    });
}


export function instant_save(): void { 
    const jsonObj = __auto_save('instant_save');
    decode_all(jsonObj);
}

export function UD_save(): void { 
    __auto_save('UD_save');
}

function __auto_save(mode: string): any { 
    const maze_data = JSON.stringify(g_maze.encode(), null, "\t");
    const team_data = JSON.stringify(g_team.encode(), null, "\t");

    const opt = new C_UrlOpt();
    opt.set('mode',        mode); 
    opt.set('pid',         g_pid[0]); 
    opt.set('maze',        maze_data);
    opt.set('team',        team_data);

    POST_and_get_JSON(g_url[g_url_get_maze], opt)?.then(jsonObj=>{
        if (jsonObj.ecode == 0) {
            g_mes.normal_message('正常にセーブされました');
        } else {
            g_mes.warning_message("セーブできませんでした\n" + jsonObj.emsg);
//            alert(jsonObj.emsg);
        }
        
        const monitor = false;  // alertで受信したテキストを表示するときにtrueにする
        if (monitor) {
//            alert_maze_info(jsonObj?.maze);
            alert_team_info(jsonObj?.team);
            alert_heroes_info(jsonObj?.team?.heroes);
        }
        return jsonObj;
    });
//    POST_and_move_page(g_check_JSON_url, opt);
}

export function decode_all(jsonObj: any):void {
    // MAZE関連のデコード
    if (jsonObj.maze !== undefined) g_maze.decode(jsonObj.maze);

    //　Team関連のデコード
    if (jsonObj.team !== undefined) g_team.decode(jsonObj.team);

    // MazeにTeamを追加
    g_maze.add_obj(g_team);
    calc_view2D_width();
}

// 【初期設定】View2Dの横幅をCSSから読み込んで適合する文字のサイズを計算してセットする
function calc_view2D_width(): void {
    const pre = document.getElementById('Maze_view2D_pre') as HTMLPreElement;
    if (pre === null) return;

    const view2D_width  = pre.clientWidth;
    const view2D_height = pre.clientHeight;

    const col    = g_maze.get_x_max() + 1;
    const col_px = view2D_width  / col;

    const row    = g_maze.get_y_max() + 1;
    const row_px = view2D_height / row;

    const font_size   = _round(0.95 *  _min([col_px, row_px]), 2);
    const line_height = _round(1.00 *  _min([col_px, row_px]), 2);

    pre.setAttribute('width',  view2D_width .toString());
    pre.setAttribute('height', view2D_height.toString());
    pre.style.setProperty('font-size',  `${font_size}px`);
    pre.style.setProperty('line-height',`${line_height}px`);
}
