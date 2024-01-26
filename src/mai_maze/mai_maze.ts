///
///   主処理
///

import { g_ready_games } from "../common/global";
import { init_after_loaded_DOM, init_before_new_games } from "./global_for_maze";

window.addEventListener('DOMContentLoaded', function() { 
//    g_ready_games.setGetWindow();
    init_before_new_games();
    init_after_loaded_DOM(); 
});
