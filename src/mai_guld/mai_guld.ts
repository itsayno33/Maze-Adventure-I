///
///   主処理
///

import { C_UrlOpt }              from "../common/C_UrlOpt";
import { init_after_loaded_DOM, init_before_new_games } from "./global_for_guild";
import { 
    g_pid, 
    g_url, g_url_check_JSON, g_url_get_guld, g_url_get_maze, g_url_get_save 
} from "../common/global";

window.addEventListener('DOMContentLoaded', function() { 
    init_before_new_games(g_pid[0]);
    init_after_loaded_DOM(); 
    const get_maze_opt = new C_UrlOpt({pid: g_pid[0], mode: "new", num: 333});
//    get_mai_guld();
});


