import { g_debug, g_mes } from "../d_cmn/global";
import { _min, _round }   from "../d_utl/F_Math";
import { g_maze, g_team } from "./global_for_maze";

export function init_mazeChpre(): void {
    calc_viewChpre_width();
}

// 【初期設定】ViewChの横幅をCSSから読み込んで適合する文字のサイズを計算してセットする
function calc_viewChpre_width(): void {
    const pre = document.getElementById('maze_viewCh_pre') as HTMLPreElement;
    if (pre === null) return;

    const viewCh_width  = pre.clientWidth;
    const viewCh_height = pre.clientHeight;

    const col    = g_maze.get_x_max() + 1;
    const col_px = viewCh_width  / col;

    const row    = g_maze.get_y_max() + 1;
    const row_px = viewCh_height / row;

    const font_size   = _round(0.95 *  _min([col_px, row_px]), 2);
    const line_height = _round(1.00 *  _min([col_px, row_px]), 2);

    pre.setAttribute('width',  viewCh_width .toString());
    pre.setAttribute('height', viewCh_height.toString());
    pre.style.setProperty('font-size',  `${font_size}px`);
    pre.style.setProperty('line-height',`${line_height}px`);
}


export function display_mazeChpre(): void { 
    const pre: HTMLElement|null = document.getElementById('maze_viewCh_pre');
    if (pre !== null) pre.innerText = to_string();
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

