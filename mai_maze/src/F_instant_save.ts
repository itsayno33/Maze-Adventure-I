import { alert_heroes_info } from "./C_Hero";
import { alert_maze_info }   from "./C_Maze";
import { alert_team_info }   from "./C_Team";
import { C_UrlOpt }          from "./C_UrlOpt";          
import { POST_and_get_JSON } from "./F_POST_and_move_page";
import { decode_all }        from "./F_get_mai";
import { g_get_maze_url, g_maze, g_mvm, g_team } from "./global";

export function instant_load(): void {}

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
            g_mvm.normal_message('正常に保存されました');
        } else {
            g_mvm.warning_message("保存できませんでした\n" + jsonObj.emsg);
            alert(jsonObj.emsg);
        }
        alert_maze_info(jsonObj?.maze);
        alert_team_info(jsonObj?.team);
        alert_heroes_info(jsonObj?.team?.heroes);
    
        decode_all(jsonObj);
    });
//    POST_and_move_page(g_check_JSON_url, opt);
}

