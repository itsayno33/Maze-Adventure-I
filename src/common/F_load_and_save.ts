import { alert_save_info }     from "./C_SaveData"; 
import { alert_team_info }     from "./C_Team"; 
import { alert_maze_info }     from "./C_Maze"; 
import { alert_guld_info }     from "./C_Guild"; 
import { alert_mvpt_info }     from "./C_MovablePoint";
import { alert_hres_info }     from "./C_Hero"; 
import { alert_PD_info }       from "./C_PointDir";
import { alert_mazeinfo_info } from './C_MazeInfo';

import { _round, _min, _max  } from "./F_Math";
import { C_UrlOpt }            from "./C_UrlOpt";  
import { POST_and_get_JSON, POST_and_move_page } from "./F_POST";
import { 
    _alert, g_mes, g_start_env, 
    g_url,  g_url_get_maze, g_url_get_save, g_url_get_guld, g_url_check_JSON, 
    g_save, 
} from "./global";


type T_callback = (jsonObj:any)=>(boolean|void);

export async function get_mai_maze(callback?: T_callback): Promise<any|undefined> {
    const opt = new C_UrlOpt();
    opt.set('mode', 'new_game'); 
    opt.set('pid',   g_start_env.pid);
    return await _get_new_game(g_url[g_url_get_maze], opt, callback);
}


export async function get_mai_guld(callback?: T_callback): Promise<any|undefined> {
    const opt = new C_UrlOpt();
    opt.set('mode', 'new_game'); 
    opt.set('pid',   g_start_env.pid);
    return await _get_new_game(g_url[g_url_get_guld], opt, callback);
}

async function _get_new_game(url: string, opt: C_UrlOpt, callback?: T_callback): Promise<any|undefined> {
    return await POST_and_get_JSON(url, opt)?.then(jsonObj=>{
        if (jsonObj.ecode == 0) {
            g_mes.normal_message('正常にロードされました');
        
            if (jsonObj.save  === undefined) {
                g_mes.warning_message("保存データが不正な形式でした\n" + jsonObj.emsg);
                _alert(jsonObj.emsg);
                return undefined;
            }

            const monitor = false;  // alertで受信したテキストを表示するときにtrueにする
            if (monitor) {
                if (jsonObj?.save  !== undefined) alert_save_info(jsonObj.save);
                if (jsonObj?.save?.all_maze?.length  !== undefined) for (const maze of jsonObj.save.all_maze) alert_maze_info(maze);
                if (jsonObj?.save?.all_team?.length  !== undefined) for (const team of jsonObj.save.all_team) alert_team_info(team);
                if (jsonObj?.save?.all_guld?.length  !== undefined) for (const guld of jsonObj.save.all_guld) alert_guld_info(guld);
                if (jsonObj?.save?.all_mvpt?.length  !== undefined) for (const mvpt of jsonObj.save.all_mvpt) alert_mvpt_info(mvpt);
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

export function get_new_maze(maze_name: string, callback?: T_callback): Promise<any|undefined> {
    const opt = new C_UrlOpt();
    opt.set('mode', 'new_maze');
    opt.set('pid',   g_start_env.pid);
    opt.set('name',  maze_name);

    return POST_and_get_JSON(g_url[g_url_get_maze], opt)?.then(jsonObj=>{
        if (jsonObj.ecode != 0) {
            g_mes.warning_message("新迷宮データを受信できませんでした\n" + jsonObj.emsg);
            _alert(jsonObj.emsg);
            return undefined;
        }
        if (jsonObj?.data  === undefined) {
            g_mes.warning_message("受信データが不正な形式でした\n" + jsonObj.emsg);
            _alert(jsonObj.emsg);
            return undefined;
        }
        if (jsonObj?.data?.maze  === undefined) {
            g_mes.warning_message("新迷宮データが不正な形式でした\n" + jsonObj.emsg);
            _alert(jsonObj.emsg);
            return undefined;
        }
        if (jsonObj?.data?.pos   === undefined) {
            g_mes.warning_message("新迷宮の位置データが不正な形式でした\n" + jsonObj.emsg);
            _alert(jsonObj.emsg);
            return undefined;
        }

        const monitor = false;  // alertで受信したテキストを表示するときにtrueにする
        if (monitor) {
            if (jsonObj?.data?.maze  !== undefined) alert_maze_info(jsonObj.data.maze);
            if (jsonObj?.data?.pos   !== undefined) alert_PD_info  (jsonObj.data.pos);
        }
        if (callback !== undefined) callback(jsonObj?.data);

        return jsonObj;
    }); 
}

export function get_save_info(callback?: T_callback): Promise<any|undefined> {
    const opt = new C_UrlOpt();
    opt.set('mode',       'save_info'); 
    opt.set('pid',         g_start_env.pid);

    return POST_and_get_JSON(g_url[g_url_get_save], opt)?.then(jsonObj=>{
        if (jsonObj.ecode == 0) {
            g_mes.normal_message('正常にロードされました');

            if (jsonObj.save_info  === undefined) {
                g_mes.warning_message("保存データが不正な形式でした\n" + jsonObj.emsg);
                _alert(jsonObj.emsg);
                return undefined;
            }
            
            const monitor = false;  // alertで受信したテキストを表示するときにtrueにする
            if (monitor) {
                for (let save of jsonObj.save_info) {
                    if (save       !== undefined) alert_save_info(save);
//                    if (save?.team !== undefined) for (const team of save.all_team) alert_team_info(team);
//                    if (save?.maze !== undefined) for (const maze of save.all_maze) alert_maze_info(maze);
//                    if (save?.guld !== undefined) for (const guld of save.all_guld) alert_guld_info(guld);
//                    if (save?.mvpt !== undefined) for (const mvpt of save.all_mvpt) alert_mvpt_info(mvpt);
                }
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

export async function get_maze_info(callback?: T_callback): Promise<any|undefined> {
    const opt = new C_UrlOpt();
    opt.set('mode',        'maze_info'); 
    return await POST_and_get_JSON(g_url[g_url_get_maze], opt)?.then(jsonObj=>{
        if (jsonObj.ecode == 0) {
            g_mes.normal_message('正常にロードされました');
            if (jsonObj?.data?.mazeinfo === undefined) {
                g_mes.warning_message("迷宮情報が不正な形式でした\n" + jsonObj.emsg);
                _alert(jsonObj.emsg);
                return undefined;
            }
        
            const monitor = false;  // alertで受信したテキストを表示するときにtrueにする
            if (monitor) {
                if (jsonObj?.data?.mazeinfo  !== undefined) { 
                    for (const mazeinfo of jsonObj.data.mazeinfo) {
                        alert_mazeinfo_info(mazeinfo);
                    }
                }
            }
        
            if (callback !== undefined) callback(jsonObj?.data?.mazeinfo);
            return jsonObj?.data?.mazeinfo;
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
            if (jsonObj?.data?.hres  === undefined) {
                g_mes.warning_message("ヒーロー・データが不正な形式でした\n" + jsonObj.emsg);
                _alert(jsonObj.emsg);
                return;
            }
        
            const monitor = false;  // alertで受信したテキストを表示するときにtrueにする
            if (monitor) {
                if (jsonObj?.data?.hres  !== undefined) alert_hres_info(jsonObj.data.hres);
            }
        
            if (callback !== undefined) callback(jsonObj?.data);
            return jsonObj?.data;
        } else {
            g_mes.warning_message("ロードできませんでした\n" + jsonObj.emsg);
            _alert(jsonObj.emsg);
            return undefined;
        }
    });
}


export function tmp_load(opt?: C_UrlOpt, callback?: T_callback): Promise<any|undefined> {
    opt ??= new C_UrlOpt();
    opt.set('mode',       'tmp_load'); 
    opt.set('pid',   g_start_env.pid); 
    opt.set('uno',               100); 
    return __auto_load(opt, callback);
}

export function instant_load(opt?: C_UrlOpt, callback?: T_callback): Promise<any|undefined> {
    opt ??= new C_UrlOpt();
    opt.set('mode',   'instant_load'); 
    opt.set('pid',   g_start_env.pid); 
    opt.set('uno',               101); 
    return __auto_load(opt, callback);
}

export function UD_load(opt?: C_UrlOpt, callback?: T_callback): Promise<any|undefined> {
    opt ??= new C_UrlOpt();
    opt.set('mode',        'UD_load'); 
    opt.set('pid',   g_start_env.pid); 
    opt.set('uno',               102); 
    return __auto_load(opt, callback);
}

export function before_load(opt?: C_UrlOpt, callback?: T_callback): Promise<any|undefined> {
    opt ??= new C_UrlOpt();
    opt.set('mode',    'before_load'); 
    opt.set('pid',   g_start_env.pid); 
    opt.set('uno',               103); 
    return __auto_load(opt, callback);
}

export function general_load(uniq_no: number, opt?: C_UrlOpt, callback?: T_callback): Promise<any|undefined> {
    opt ??= new C_UrlOpt();
    opt.set('mode',           'load'); 
    opt.set('pid',   g_start_env.pid); 
    opt.set('uno',           uniq_no); 
    return __auto_load(opt, callback);
}

function __auto_load(opt: C_UrlOpt, callback?: T_callback): Promise<any|undefined> {

    return POST_and_get_JSON(g_url[g_url_get_save], opt)?.then(jsonObj=>{
        if (jsonObj.ecode == 0) {
            g_mes.normal_message('正常にロードされました');
 
            if (jsonObj?.save  === undefined) {
                g_mes.warning_message("受信した保存データが不正な形式でした\n" + jsonObj.emsg);
                _alert(jsonObj.emsg);
                return undefined;
            }
    
            const monitor = false;  // alertで受信したテキストを表示するときにtrueにする
            if (monitor) {
                if (jsonObj?.save                !== undefined) alert_save_info(jsonObj.save);
//                if (jsonObj?.save?.all_maze?.[0] !== undefined) alert_maze_info(jsonObj.save.all_maze[0]);
//                if (jsonObj?.save?.all_guld?.[0] !== undefined) alert_guld_info(jsonObj.save.all_guld[0]);
//                if (jsonObj?.save?.all_team?.[0] !== undefined) alert_team_info(jsonObj.save.all_team[0]);
            }
        
            if (callback !== undefined) callback(jsonObj);
            return jsonObj;
        } else {
            g_mes.warning_message(`ロードできませんでした${jsonObj.ecode}\n` + jsonObj.emsg);
            _alert(jsonObj.emsg);
            return undefined;
        }
    });
}


export function tmp_save(opt?: C_UrlOpt, callback?: T_callback): Promise<any|undefined> { 
    opt ??= new C_UrlOpt();
    opt.set('mode',       'tmp_save'); 
    opt.set('pid',   g_start_env.pid); 
    opt.set('uno',               100); 
    return __auto_save(opt, callback);
}

export function instant_save(opt?: C_UrlOpt, callback?: T_callback): Promise<any|undefined> { 
    opt ??= new C_UrlOpt();
    opt.set('mode',   'instant_save'); 
    opt.set('pid',   g_start_env.pid); 
    opt.set('uno',               101); 
    return __auto_save(opt, callback);
}

export function UD_save(opt?: C_UrlOpt, callback?: T_callback): Promise<any|undefined> { 
    opt ??= new C_UrlOpt();
    opt.set('mode',        'UD_save'); 
    opt.set('pid',   g_start_env.pid); 
    opt.set('uno',               102); 
    return __auto_save(opt, callback);
}

export function before_save(opt?: C_UrlOpt, callback?: T_callback): Promise<any|undefined> { 
    opt ??= new C_UrlOpt();
    opt.set('mode',    'before_save'); 
    opt.set('pid',   g_start_env.pid); 
    opt.set('uno',               103); 
    return __auto_save(opt, callback);
}

export function general_save(opt?: C_UrlOpt, callback?: T_callback): Promise<any|undefined> {
    g_save.auto_mode = false;

    opt ??= new C_UrlOpt();
    opt.set('mode',           'save'); 
    opt.set('pid',   g_start_env.pid); 
    return __save(opt, callback);
}

function __auto_save(opt: C_UrlOpt, callback?: T_callback): Promise<any|undefined> {
    g_save.auto_mode = true;
    return __save(opt, callback);
} 
function __save(opt: C_UrlOpt, callback?: T_callback): Promise<any|undefined> { 
    if (!opt.isset('save')) {
        opt.set('save', JSON.stringify(g_save.encode(), null, "\t"));
    }

    // 送信データをcheck_JSON.phpに送ってチェックするときにtrueにする。
    const move_page = false;

    if (move_page) {
        POST_and_move_page(g_url[g_url_check_JSON], opt);
    }

    return POST_and_get_JSON(g_url[g_url_get_save], opt)?.then(jsonObj=>{
        if (jsonObj.ecode == 0) {
 
            if (jsonObj?.save  === undefined) {
                g_mes.warning_message("受信した保存データが不正な形式でした\n" + jsonObj.emsg);
                _alert(jsonObj.emsg);
                return undefined;
            }
    
            const monitor = false;  // alertで受信したテキストを表示するときにtrueにする
            if (monitor) {
                if (jsonObj?.save                !== undefined) alert_save_info(jsonObj.save);
//                if (jsonObj?.save?.all_maze?.[0] !== undefined) alert_maze_info(jsonObj.save.all_maze[0]);
//                if (jsonObj?.save?.all_guld?.[0] !== undefined) alert_guld_info(jsonObj.save.all_guld[0]);
//                if (jsonObj?.save?.all_team?.[0] !== undefined) alert_team_info(jsonObj.save.all_team[0]);
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

