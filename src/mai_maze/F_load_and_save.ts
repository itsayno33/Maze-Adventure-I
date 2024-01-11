import { g_hres } from './global_for_maze';
import { alert_maze_info }     from "../common/C_Maze"; // 通常時はコメントアウトされている関数
import { alert_team_info }     from "../common/C_Team"; // 通常時はコメントアウトされている関数
import { alert_heroes_info }   from "../common/C_Hero"; // 通常時はコメントアウトされている関数

import { _round, _min, _max  }    from "../common/F_Math";
import { C_UrlOpt }               from "../common/C_UrlOpt";          
import { POST_and_get_JSON }      from "../common/F_POST";
import { init_controlles }        from "./F_set_controlles";
import { do_move_bottom_half }    from "./F_set_move_controlles";
import { g_maze, g_save, g_team, init_debug_mode }     from "./global_for_maze";
import { _alert, g_mes, g_pid, g_url, g_url_get_maze, g_url_get_save } from "../common/global";
import { alert_save_info }        from "../common/C_SaveData";

export function get_mai_maze(): void {
    const get_maze_opt = new C_UrlOpt({pid: g_pid[0], mode: "new_maze", num: 333});
 
    POST_and_get_JSON(g_url[g_url_get_maze], get_maze_opt)?.then(jsonObj=>{
        if (jsonObj.ecode != 0) {
            g_mes.warning_message("初期データを受信できませんでした\n" + jsonObj.emsg);
            _alert(jsonObj.emsg);
            return;
        }
        if (jsonObj.data  === undefined) {
            g_mes.warning_message("受信データが不正な形式でした\n" + jsonObj.emsg);
            _alert(jsonObj.emsg);
            return;
        }
        if (jsonObj.data.maze  === undefined) {
            g_mes.warning_message("迷宮データが不正な形式でした\n" + jsonObj.emsg);
            _alert(jsonObj.emsg);
            return;
        }
        if (jsonObj.data.pos  === undefined) {
            g_mes.warning_message("位置データが不正な形式でした\n" + jsonObj.emsg);
            _alert(jsonObj.emsg);
            return;
        }

        const monitor = true;  // alertで受信したテキストを表示するときにtrueにする
        if (monitor) {
            if (jsonObj?.data?.maze  !== undefined) alert_maze_info(jsonObj.data.maze);
        }
        decode_maze(jsonObj.data);
        init_debug_mode();
        init_controlles();
        do_move_bottom_half('blink_off');
    });
}

export async function get_save_info() {
    const opt = new C_UrlOpt();
    opt.set('mode',       'save_info'); 
    opt.set('pid',         g_pid[0]);

    return await POST_and_get_JSON(g_url[g_url_get_save], opt)?.then(jsonObj=>{
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
    const opt = new C_UrlOpt();
    opt.set('mode',        'instant_load'); 
    __auto_load(opt);
}

export function UD_load(): void {
    const opt = new C_UrlOpt();
    opt.set('mode',        'UD_load'); 
    __auto_load(opt);
}

export function general_load(opt: C_UrlOpt): void {
    opt.set('mode',        'load'); 
    __auto_load(opt);
}

function __auto_load(opt: C_UrlOpt): any|undefined {
    opt.set('pid',         g_pid[0]); 

    POST_and_get_JSON(g_url[g_url_get_save], opt)?.then(jsonObj=>{
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
            return jsonObj;
        } else {
            g_mes.warning_message("ロードできませんでした\n" + jsonObj.emsg);
            alert(jsonObj.emsg);
            return undefined;
        }
    });
}


export function instant_save(opt: C_UrlOpt): void { 
    opt.set('mode',        'instant_save'); 
    const jsonObj = __auto_save(opt);
    decode_all(jsonObj);
}

export function UD_save(opt: C_UrlOpt): any|undefined { 
    opt.set('mode',        'UD_save'); 
    return __auto_save(opt);
}

export function general_save(opt: C_UrlOpt): any|undefined {
    opt.set('mode',        'save'); 
    return __auto_save(opt);
}

function __auto_save(opt: C_UrlOpt): any|undefined { 
    
    opt.set('pid',         g_pid[0]); 

    POST_and_get_JSON(g_url[g_url_get_save], opt)?.then(jsonObj=>{
        if (jsonObj.ecode == 0) {
            g_mes.normal_message('正常にセーブされました');
        } else {
            g_mes.warning_message("セーブできませんでした\n" + jsonObj.emsg);
//            alert(jsonObj.emsg);
        }
        
        if (jsonObj?.save  === undefined) {
            g_mes.warning_message("受信した保存データが不正な形式でした\n" + jsonObj.emsg);
            _alert(jsonObj.emsg);
            return undefined;
        }

        const monitor = false;  // alertで受信したテキストを表示するときにtrueにする
        if (monitor) {
            if (jsonObj?.save                !== undefined) alert_save_info(jsonObj.save);
            if (jsonObj?.save?.all_maze?.[0] !== undefined) alert_maze_info(jsonObj.save.all_maze[0]);
            if (jsonObj?.save?.all_team?.[0] !== undefined) alert_team_info(jsonObj.save.all_team[0]);
        }
        return jsonObj;
    });
//    POST_and_move_page(g_check_JSON_url, opt);
}

export function decode_all(jsonObj: any):void {
    // SaveData関連のデコード
    if (jsonObj.save !== undefined) g_save.decode(jsonObj.save);

    // Maze関連のデコード
    g_maze.decode(g_save.all_maze[0].encode());

    //Team関連のデコード
    g_team.decode(g_save.all_team[0].encode());

    //Hero関連のデコード
    for (let i in g_hres) delete g_hres[i];
    for (let hero of g_team.hres())  g_hres.push(hero);

    // MazeにTeamを追加
    // g_maze.add_obj(g_team);

    calc_view2D_width();
}

export function decode_maze(jsonObj: any):void {
    // MAZE関連のデコード
    if (jsonObj.data.maze !== undefined) g_maze.decode(jsonObj.data.maze);

    //　Team関連のデコード
    if (jsonObj.data.pos !== undefined) {
        let x = jsonObj.data.pos?.x; let y = jsonObj.data.pos?.y; let z = jsonObj.data.pos?.z;
        let d = jsonObj.data.pos?.d;
        g_team.decode({x: x, y: y, z: z, direct: {d: d}});
    }

    //Hero関連のデコード
    for (let i in g_hres) delete g_hres[i];
    for (let hero of g_team.hres())  g_hres.push(hero);

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
