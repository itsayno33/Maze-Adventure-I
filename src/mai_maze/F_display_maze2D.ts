"use strict";

import { g_view2D, g_view2M } from "./global_for_maze";

export function init_maze2D(): void {
    g_view2D.init({
        div_id:    'div_maze_vw2D', 
        canvas_id: 'maze_view2D_canvas', 
        x_min: 15, y_min: 15
    });
    g_view2M.init({
        div_id:    'div_maze_vw2M', 
        canvas_id: 'maze_view2M_canvas', 
        x_min:  5, y_min:  5
    });

}

export function display_maze2D(): void {
    g_view2D.drow_map2X();
    g_view2M.drow_map2X();

}
