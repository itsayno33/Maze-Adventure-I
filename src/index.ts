///
///   主処理
///

import { C_UrlOpt }  from "./C_UrlOpt";
import { get_mai_maze } from "./F_get_mai";
import { init_after_loaded_DOM } from "./global";

window.addEventListener('DOMContentLoaded', function() { 
    init_after_loaded_DOM();
    const get_maze_url: string = "http://127.0.0.1/dev/mai/mai_maze.php";
    const get_maze_opt: string = new C_UrlOpt({mode: "new", num: 333}).to_string();
    get_mai_maze(get_maze_url, get_maze_opt);
});




