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
//    const pre = document.getElementById('maze_viewCh_pre') as HTMLPreElement;
    if (pre === null) return;

    view_wdth  = div.clientWidth;
    view_hght  = div.clientHeight;

    const col    = g_maze.get_x_max() + 2;
    const col_px = view_wdth  / col;

    const row    = g_maze.get_y_max() + 2;
    const row_px = view_hght / row;

    font_size   = _max([15.0, _round(1.00 *  _min([col_px, row_px]), 2)]);
    line_hght   = _max([15.0, _round(1.00 *  _min([col_px, row_px]), 2)]);

    map_wdth    = font_size * col;
    map_hght    = line_hght * col;

    pre.setAttribute('width',  map_wdth.toString());
    pre.setAttribute('height', map_hght.toString());
    pre.style.setProperty('font-size',  `${font_size}px`);
    pre.style.setProperty('line-height',`${line_hght}px`);
}

function calc_view_top(): void {
    const pd = g_team.get_pd();

    let top_x =  view_wdth / 2 - pd.x * font_size;
    if (top_x < -view_wdth / 2) top_x = -view_wdth / 2;
    if (top_x > map_wdth - view_wdth) top_x = map_wdth - view_wdth;

    let top_y =  view_hght / 2 - pd.y * line_hght;
    if (top_y < -view_hght / 2 - 3.3*line_hght) top_y = -view_hght / 2 - 3.3*line_hght; // バグ対策の適当修正
    if (top_y > map_hght - view_hght) top_y = map_hght - view_hght;

//    const pre = document.getElementById('maze_viewCh_pre') as HTMLPreElement;
    if (pre === null) return;
    pre.style.setProperty('left',      `${top_x}px`);
    pre.style.setProperty('top',       `${top_y}px`);
}

export function display_mazeCh(): void { 
//    const pre: HTMLElement|null = document.getElementById('maze_viewCh_pre');
    if (pre !== null) {pre.innerText = to_string();calc_view_top()}
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
                    const obj_c = obj.view()?.letter() ?? '謎';
                    ret_str += obj_c;
                }
            }
        }
        ret_str += "\n";
    }
    return ret_str;
}

