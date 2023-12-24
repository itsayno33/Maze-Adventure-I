import { C_UrlOpt }           from "./C_UrlOpt";
import { POST_and_move_page }./F_Post_and_move_page_and_move_page";
import { g_check_JSON_url, g_maze, g_team } from "./global";

export function instant_load(): void {}

export function instant_save(): void { 
    const maze_data = JSON.stringify(g_maze.encode(), null, "\t");
    const team_data = JSON.stringify(g_team.encode(), null, "\t");

    const opt = new C_UrlOpt();
    opt.set('mode', 'save');
    opt.set('maze',  maze_data);
    opt.set('team',  team_data);
    POST_and_move_page(g_check_JSON_url, opt);
}

