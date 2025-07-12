"use strict";

import { g_debug, g_mes } from "../d_cmn/global";
import { _min, _round, _max } from '../d_utl/F_Math';
import { g_maze, g_team } from "./global_for_maze";

let div: HTMLDivElement;
let pre: HTMLPreElement;

let view_wdth        = 0;
let view_hght        = 0;
let map_wdth         = 0;
let map_hght         = 0;
let font_size:number = 0;
let line_hght:number = 0;

export function init_mazeCh(): void {
    div = document.getElementById('div_maze_vwCh')   as HTMLDivElement;
    pre = document.getElementById('maze_viewCh_pre') as HTMLPreElement;
    calc_viewCh_width();
}

// 【初期設定】ViewChの横幅をCSSから読み込んで適合する文字のサイズを計算してセットする
function calc_viewCh_width(): void {

    view_wdth  = div.clientWidth;
    view_hght  = div.clientHeight;

    const col    = g_maze.get_x_max() + 1;
    const col_px = pre.clientWidth  / col;

    const row    = g_maze.get_y_max() + 1;
    const row_px = pre.clientHeight / row;

    font_size   = _round(_max([15.0, _round(1.00 *  _min([col_px, row_px]), 2)]), 0);
    line_hght   = _round(_max([15.0, _round(1.00 *  _min([col_px, row_px]), 2)]), 0);

    map_wdth    = font_size * col;
    map_hght    = line_hght * col;



    if (map_wdth   < view_wdth) {
        map_wdth   = view_wdth;
        font_size  = _round(view_wdth / col, 0);
    }
    if (map_hght   < view_hght) {
        map_hght   = view_hght;
        line_hght  = _round(view_hght / row, 0);
    }



    pre.setAttribute('width',  map_wdth.toString());
    pre.setAttribute('height', map_hght.toString());
    pre.style.setProperty('font-size',  `${font_size}px`);
    pre.style.setProperty('line-height',`${line_hght}px`);
}

function calc_viewCh_top(): void {
    calc_viewCh_width();

    view_wdth  = div.clientWidth;
    view_hght  = div.clientHeight;

    const pd = g_team.get_pd();

    let top_x =  view_wdth / 2 - (pd.x + 0) * font_size;
    if (top_x > 0) top_x = 0; // 左端制限
    if (top_x < view_wdth - map_wdth) top_x = view_wdth - map_wdth; // 右端制限

    let top_y =  view_hght / 2 - (pd.y + 0) * line_hght;
    if (top_y > 0) top_y = 0; // 上端制限
    if (top_y < view_hght - map_hght) top_y = view_hght - map_hght; // 下端制限
                                                                                //alert(`ViewCh: ${view_wdth}x${view_hght} px, map: ${map_wdth}x${map_hght} px`);
                                                                                //alert(`top_x: ${top_x}, top_y: ${top_y}`);

    pre.style.setProperty('left',      `${top_x}px`);
    pre.style.setProperty('top',       `${top_y}px`);
}

export function display_mazeCh(): void { 
    if (pre !== null) {pre.innerText = to_string();calc_viewCh_top()}
    else g_mes.warning_message('Can not found pre#Maze_viewCh_pre!!');
}

function to_string(): string {
    const size_x = g_maze.get_x_max();
    const size_y = g_maze.get_y_max();
    const floor  = g_team.get_pd().z

    let ret_str = '';
    for (let y = 0; y < size_y; y++) {
        for (let x = 0; x < size_x; x++) {
            if (!g_debug.isON() && g_maze.is_masked_xyz(x, y, floor)) {
                ret_str += 'Ｘ';
            } else {
                const obj = g_maze.get_obj_xyz(x, y, floor);
                if (obj === null || obj.view() === undefined) {
                    ret_str += g_maze.get_cell_xyz(x, y, floor)?.to_letter();
                } else {
                    const obj_c = obj.view()?.letter(obj?.get_pd().d??0) ?? '謎';
                    ret_str += obj_c;
                }
            }
        }
        ret_str += "\n";
    }
    return ret_str;
}

