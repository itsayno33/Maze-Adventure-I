import { alert_maze_info }     from "./C_Maze"; // 通常時はコメントアウトされている関数
import { alert_team_info }     from "./C_Team"; // 通常時はコメントアウトされている関数
import { alert_heroes_info }   from "./C_Hero"; // 通常時はコメントアウトされている関数

import { C_UrlOpt }            from "./C_UrlOpt";          
import { POST_and_get_JSON }   from "./F_POST";
import { init_controlles }     from "./F_set_controlles";
import { do_move_bottom_half } from "./F_set_move_controlles";
import { _round, _min, _max  } from "./F_Math";
import { g_get_maze_url, g_maze, g_team, g_mvm, init_debug_mode } from "./global";

export function get_mai_maze(url: string, opt: C_UrlOpt): void {
    POST_and_get_JSON(url, opt)?.then(jsonObj=>{
        if (jsonObj.ecode != 0) {
            g_mvm.warning_message("初期データを受信できませんでした\n" + jsonObj.emsg);
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


export function instant_load(): void {
    const opt = new C_UrlOpt();
    opt.set('mode',       'instant_load'); 
    opt.set('save_id',     1); 
    opt.set('save_title', ''); 

    POST_and_get_JSON(g_get_maze_url, opt)?.then(jsonObj=>{
        if (jsonObj.ecode == 0) {
            g_mvm.normal_message('正常にロードされました');
        
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
            g_mvm.warning_message("ロードできませんでした\n" + jsonObj.emsg);
            alert(jsonObj.emsg);
        }
    });
}

export function instant_save(): void { 
    const maze_data = JSON.stringify(g_maze.encode(), null, "\t");
    const team_data = JSON.stringify(g_team.encode(), null, "\t");

    const opt = new C_UrlOpt();
    opt.set('mode',       'instant_save'); 
    opt.set('save_id',     1); 
    opt.set('save_title', ''); 
    opt.set('maze',       maze_data);
    opt.set('team',       team_data);

    POST_and_get_JSON(g_get_maze_url, opt)?.then(jsonObj=>{
        if (jsonObj.ecode == 0) {
            g_mvm.normal_message('正常にセーブされました');
        } else {
            g_mvm.warning_message("セーブできませんでした\n" + jsonObj.emsg);
            alert(jsonObj.emsg);
        }
        
        const monitor = false;  // alertで受信したテキストを表示するときにtrueにする
        if (monitor) {
//            alert_maze_info(jsonObj?.maze);
            alert_team_info(jsonObj?.team);
            alert_heroes_info(jsonObj?.team?.heroes);
        }
    
        decode_all(jsonObj);
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

function calc_view2D_width(): void {
    const pre = document.getElementById('Maze_view2D_pre') as HTMLPreElement;
    if (pre === null) return;

    const view2D_width  = pre.clientWidth;
    const view2D_height = pre.clientHeight;

    const col    = g_maze.get_x_max();
    const col_px = view2D_width  / col;

    const row    = g_maze.get_y_max();
    const row_px = view2D_height / row;

    const font_size   = _round(1.0 *  _min([col_px, row_px]), 2);
    const line_height = _round(1.1 *  _min([col_px, row_px]), 2);

    pre.style.setProperty('font-size',  `${font_size}px`);
    pre.style.setProperty('line-height',`${line_height}px`);
}
