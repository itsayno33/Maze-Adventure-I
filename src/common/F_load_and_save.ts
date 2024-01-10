import { alert_maze_info }     from "../common/C_Maze"; // 通常時はコメントアウトされている関数
import { alert_team_info }     from "../common/C_Team"; // 通常時はコメントアウトされている関数
import { alert_heroes_info }   from "../common/C_Hero"; // 通常時はコメントアウトされている関数

import { _round, _min, _max  } from "../common/F_Math";
import { C_UrlOpt }            from "../common/C_UrlOpt";  
import { POST_and_get_JSON, POST_and_move_page } from "../common/F_POST";
import { 
    g_mes, g_pid, 
    g_url, g_url_get_maze, g_url_get_save, g_url_get_guld, g_url_check_JSON, 
    _alert 
} from "../common/global";

type T_callback = (jsonObj:any)=>(boolean|void);

export function get_mai_maze(callback?: T_callback): void {
    const get_maze_opt = new C_UrlOpt({pid: g_pid[0], mode: "new", num: 333});
 
    POST_and_get_JSON(g_url[g_url_get_maze], get_maze_opt)?.then(jsonObj=>{
        if (jsonObj.ecode != 0) {
            g_mes.warning_message("初期データを受信できませんでした\n" + jsonObj.emsg);
            _alert(jsonObj.emsg);
            return;
        }

        const monitor = false;  // alertで受信したテキストを表示するときにtrueにする
        if (monitor) {
//            alert_maze_info(jsonObj?.maze);
            alert_team_info(jsonObj?.team);
            alert_heroes_info(jsonObj?.team?.heroes);
        }
        if (callback !== undefined) callback(jsonObj);
    });
}

export function get_save_info(callback?: T_callback): any {
    const opt = new C_UrlOpt();
    opt.set('mode',       'save_info'); 
    opt.set('pid',         g_pid[0]);

    return POST_and_get_JSON(g_url[g_url_get_save], opt)?.then(jsonObj=>{
        if (jsonObj.ecode == 0) {
            g_mes.normal_message('正常にロードされました');
        
            const monitor = false;  // alertで受信したテキストを表示するときにtrueにする
            if (monitor) {
    //            alert_maze_info(jsonObj?.maze);
                alert_team_info(jsonObj?.team);
                alert_heroes_info(jsonObj?.team?.heroes);
            }

            if (callback !== undefined) callback(jsonObj);
            return jsonObj;
        } else {
            g_mes.warning_message("ロードできませんでした\n" + jsonObj.emsg);
            _alert(jsonObj.emsg);
            return undefined;
        }
    });
}

export async function get_new_hero(num: number = 20, callback?: T_callback): Promise<any|undefined> {
    const opt = new C_UrlOpt();
    opt.set('mode',        'new_hero'); 
    opt.set('number',      num.toString()); 
    return await POST_and_get_JSON(g_url[g_url_get_guld], opt)?.then(jsonObj=>{
        if (jsonObj.ecode == 0) {
            g_mes.normal_message('正常にロードされました');
        
            const monitor = false;  // alertで受信したテキストを表示するときにtrueにする
            if (monitor) {
                alert_heroes_info(jsonObj?.team?.heroes);
            }
        
            if (callback !== undefined) callback(jsonObj);
            return jsonObj;
        } else {
            g_mes.warning_message("ロードできませんでした\n" + jsonObj.emsg);
            _alert(jsonObj.emsg);
            return undefined;
        }
    });
}


export function instant_load(callback?: T_callback): any {
    const opt = new C_UrlOpt();
    opt.set('mode',        'instant_load'); 
    return __auto_load(opt, callback);
}

export function UD_load(callback?: T_callback): any {
    const opt = new C_UrlOpt();
    opt.set('mode',        'UD_load'); 
    return __auto_load(opt, callback);
}

export function general_load(opt: C_UrlOpt, callback?: T_callback): any {
    opt.set('mode',        'load'); 
    return __auto_load(opt, callback);
}

function __auto_load(opt: C_UrlOpt, callback?: T_callback): any {
/*
    opt.set('pid',         g_pid[0]); 
    opt.set('save',        save_data);
*/
    return POST_and_get_JSON(g_url[g_url_get_save], opt)?.then(jsonObj=>{
        if (jsonObj.ecode == 0) {
            g_mes.normal_message('正常にロードされました');
        
            const monitor = false;  // alertで受信したテキストを表示するときにtrueにする
            if (monitor) {
    //            alert_maze_info(jsonObj?.maze);
                alert_team_info(jsonObj?.team);
                alert_heroes_info(jsonObj?.team?.heroes);
            }
        
            if (callback !== undefined) callback(jsonObj);
            return jsonObj;
        } else {
            g_mes.warning_message("ロードできませんでした\n" + jsonObj.emsg);
            _alert(jsonObj.emsg);
            return undefined;
        }
    });
}


export function instant_save(callback?: T_callback): any { 
    const opt = new C_UrlOpt();
    opt.set('mode',        'instant_save'); 
    return __auto_save(opt, callback);
}

export function UD_save(callback?: T_callback): any { 
    const opt = new C_UrlOpt();
    opt.set('mode',        'UD_save'); 
    return  __auto_save(opt, callback);
}

export function general_save(opt: C_UrlOpt, callback?: T_callback): any {
    opt.set('mode',        'save'); 
    return __auto_save(opt, callback);
}

function __auto_save(opt: C_UrlOpt, callback?: T_callback): any { 
/*
    opt.set('pid',         g_pid[0]); 
    opt.set('save',        save_data);
*/
    return POST_and_get_JSON(g_url[g_url_get_save], opt)?.then(jsonObj=>{
        if (jsonObj.ecode == 0) {
            const monitor = false;  // alertで受信したテキストを表示するときにtrueにする
            if (monitor) {
    //            alert_maze_info(jsonObj?.maze);
                alert_team_info(jsonObj?.team);
                alert_heroes_info(jsonObj?.team?.heroes);
            }
            if (callback !== undefined) callback(jsonObj);
            g_mes.normal_message('正常にセーブされました');
            return jsonObj;
        } else {
            g_mes.warning_message("セーブできませんでした\n" + jsonObj.emsg);
            _alert(jsonObj.emsg);
            return undefined;
        }
        
    });

//    POST_and_move_page(g_url[g_url_check_JSON], opt); return {ecode: 0};
}

/*
function decode_all(jsonObj: any):void {
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
*/
