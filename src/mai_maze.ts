///
///   主処理
///

import { C_UrlOpt }     from "./C_UrlOpt";
import { get_mai_maze } from "./F_laod_and_save";
import { g_get_maze_url, init_after_loaded_DOM } from "./global";

window.addEventListener('DOMContentLoaded', function() { 
    init_after_loaded_DOM();
    const get_maze_opt = new C_UrlOpt({mode: "new", num: 333});
    get_mai_maze(g_get_maze_url, get_maze_opt);
});




