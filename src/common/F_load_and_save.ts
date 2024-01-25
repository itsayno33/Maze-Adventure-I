import { alert_maze_info }     from "../common/C_Maze";     // 通常時はコメントアウトされている関数
import { alert_team_info }     from "../common/C_Team";     // 通常時はコメントアウトされている関数
import { alert_hres_info }     from "../common/C_Hero";     // 通常時はコメントアウトされている関数
import { alert_save_info }     from "../common/C_SaveData"; // 通常時はコメントアウトされている関数
import { alert_guld_info }     from "../common/C_Guild";    // 通常時はコメントアウトされている関数

import { _round, _min, _max  } from "../common/F_Math";
import { C_UrlOpt }            from "../common/C_UrlOpt";  
import { POST_and_get_JSON, POST_and_move_page } from "../common/F_POST";
import { 
    g_mes, g_start_env, 
    g_url, g_url_get_maze, g_url_get_save, g_url_get_guld, g_url_check_JSON, 
    _alert, 
} from "../common/global";


type T_callback = (jsonObj:any)=>(boolean|void);

export function get_mai_maze(callback?: T_callback): Promise<any|undefined> {
//    const get_maze_opt = new C_UrlOpt({pid: g_pid[0], mode: "new_maze"});
    const get_maze_opt = new C_UrlOpt({pid: g_start_env.pid, mode: "new_game"});
 
    return POST_and_get_JSON(g_url[g_url_get_maze], get_maze_opt)?.then(jsonObj=>{
        if (jsonObj.ecode != 0) {
            g_mes.warning_message("初期データを受信できませんでした\n" + jsonObj.emsg);
            _alert(jsonObj.emsg);
            return undefined;
        }
        if (jsonObj?.data  === undefined) {
            g_mes.warning_message("受信データが不正な形式でした\n" + jsonObj.emsg);
            _alert(jsonObj.emsg);
            return undefined;
        }
        if (jsonObj?.data?.maze  === undefined) {
            g_mes.warning_message("迷宮データが不正な形式でした\n" + jsonObj.emsg);
            _alert(jsonObj.emsg);
            return undefined;
        }
        if (jsonObj?.data?.pos   === undefined) {
            g_mes.warning_message("位置データが不正な形式でした\n" + jsonObj.emsg);
            _alert(jsonObj.emsg);
            return undefined;
        }
        /*
        if (jsonObj?.data?.hres  === undefined) {
            g_mes.warning_message("ヒーロー・データが不正な形式でした\n" + jsonObj.emsg);
            _alert(jsonObj.emsg);
            return undefined;
        }
        */

        const monitor = false;  // alertで受信したテキストを表示するときにtrueにする
        if (monitor) {
            if (jsonObj?.data?.maze  !== undefined) alert_maze_info(jsonObj.maze);
            if (jsonObj?.data?.team  !== undefined) alert_team_info(jsonObj.team);
        }
        if (callback !== undefined) callback(jsonObj);

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
                    if (save  !== undefined) alert_save_info(save);
                }
//                alert_maze_info(jsonObj?.maze);
//                alert_team_info(jsonObj?.team);
//                alert_heroes_info(jsonObj?.team?.heroes);
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

export async function get_mai_guld(callback?: T_callback): Promise<any|undefined> {
    const opt = new C_UrlOpt();
    opt.set('mode',        'new_game'); 
    return await POST_and_get_JSON(g_url[g_url_get_guld], opt)?.then(jsonObj=>{
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
                if (jsonObj?.save?.all_guld[0]  !== undefined) alert_guld_info(jsonObj.save.all_guld[0]);
                if (jsonObj?.save?.all_team[0]  !== undefined) alert_team_info(jsonObj.save.all_team[0]);
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
            if (jsonObj?.hres  === undefined) {
                g_mes.warning_message("ヒーロー・データが不正な形式でした\n" + jsonObj.emsg);
                _alert(jsonObj.emsg);
                return;
            }
        
            const monitor = false;  // alertで受信したテキストを表示するときにtrueにする
            if (monitor) {
                if (jsonObj?.hres  !== undefined) alert_hres_info(jsonObj.hres);
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


export function instant_load(opt: C_UrlOpt, callback?: T_callback): Promise<any|undefined> {
    opt.set('mode',        'instant_load'); 
    return __auto_load(opt, callback);
}

export function UD_load(opt: C_UrlOpt, callback?: T_callback): Promise<any|undefined> {
    opt.set('mode',        'UD_load'); 
    return __auto_load(opt, callback);
}

export function general_load(opt: C_UrlOpt, callback?: T_callback): Promise<any|undefined> {
    opt.set('mode',        'load'); 
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


export function instant_save(opt: C_UrlOpt, callback?: T_callback): Promise<any|undefined> { 
    opt.set('mode',        'instant_save'); 
    opt.set('pid',         g_start_env.pid); 
    return __auto_save(opt, callback);
}

export function UD_save(opt: C_UrlOpt, callback?: T_callback): Promise<any|undefined> { 
    opt.set('mode',        'UD_save'); 
    opt.set('pid',         g_start_env.pid); 
    return  __auto_save(opt, callback);
}

export function general_save(opt: C_UrlOpt, callback?: T_callback): Promise<any|undefined> {
    opt.set('mode',        'save'); 
    opt.set('pid',         g_start_env.pid); 
    return __auto_save(opt, callback);
}

function __auto_save(opt: C_UrlOpt, callback?: T_callback): Promise<any|undefined> { 

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

