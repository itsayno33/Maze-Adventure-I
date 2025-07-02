import { g_debug, g_mes } from "../d_cmn/global";
import { C_MazeObjView, T_Rect } from "../d_mdl/C_MazeObjView";
import { _min, _round, _max } from '../d_utl/F_Math';
import { g_maze, g_team } from "./global_for_maze";

let div: HTMLDivElement;
let cvs: HTMLCanvasElement;

let view_wdth        = 0;
let view_hght        = 0;
let map_wdth         = 0;
let map_hght         = 0;
let c_size_x: number = 0;
let c_size_y: number = 0;

export function init_maze2D(): void {
    div = document.getElementById('div_maze_vw2D')      as HTMLDivElement;
    cvs = document.getElementById('maze_view2D_canvas') as HTMLCanvasElement;

    let cxt = cvs.getContext('2d');
    if (cxt === null) {
        cxt = undefined as unknown as CanvasRenderingContext2D;
    }
    C_MazeObjView.set_context2D(cxt);
    calc_view2D_width();
}

// 【初期設定】ViewChの横幅をCSSから読み込んで適合する文字のサイズを計算してセットする
function calc_view2D_width(): void {

    view_wdth  = div.clientWidth;
    view_hght  = div.clientHeight;

    const col    = g_maze.get_x_max() + 0;
    const col_px = cvs.width  / col;
//    const col_px = view_wdth  / col;

    const row    = g_maze.get_y_max() + 0;
    const row_px = cvs.height / row;
//    const row_px = view_hght / row;

    c_size_x     = _max([15.0, _round(1.00 *  _min([col_px, row_px]), 2)]);
    c_size_y     = _max([15.0, _round(1.00 *  _min([col_px, row_px]), 2)]);

    
    map_wdth     = c_size_x * col;
    map_hght     = c_size_y * col;

    cvs.setAttribute('width',  map_wdth.toString());
    cvs.setAttribute('height', map_hght.toString());
/*
    cvs.style.setProperty('font-size',  `${font_size}px`);
    cvs.style.setProperty('line-height',`${line_hght}px`);
*/
}

function calc_view2D_top(): void {

    view_wdth  = div.clientWidth;
    view_hght  = div.clientHeight;

    const pd = g_team.get_pd();

    let top_x =  view_wdth / 2 - pd.x * c_size_x;
    if (top_x > 0) top_x = 0; // 左端制限
    if (top_x < view_wdth - map_wdth) top_x = view_wdth - map_wdth; // 右端制限

    let top_y =  view_hght / 2 - pd.y * c_size_y;
    if (top_y > 0) top_y = 0; // 上端制限
    if (top_y < view_hght - map_hght) top_y = view_hght - map_hght; // 下端制限

    cvs.style.setProperty('left',      `${top_x}px`);
    cvs.style.setProperty('top',       `${top_y}px`);

//        alert(`View2D: ${view_wdth}x${view_hght} px, Cell: ${c_size_x}x${c_size_y} px`);
//        alert(`View2D: ${top_x}px * ${top_y}px, PD: ${pd.x},${pd.y},${pd.z}`);
}

export function display_maze2D(): void { 
    if (cvs !== null) {to_2D();calc_view2D_top()}
    else {
        g_mes.warning_message('Can not found pre#Maze_view2D');
    }
}

function to_2D(): void {
    const size_x = g_maze.get_x_max();
    const size_y = g_maze.get_y_max();
    const floor  = g_team.get_pd().z

    const cell_masks = C_MazeObjView.newObj({
        layer: 0, letter: 'Ｘ', 
        show3D: '1',
        pad_t: 0.0, pad_d: 0.0, pad_s: 0.0,
        col_f: '', col_b: '', col_s: '', col_t: '', col_d: '', 
        col_l: '#0000ff', col_2: '#333333', col_L: '#6666ff', 
    })

    const cell_unexp = C_MazeObjView.newObj({
            layer: 0, letter: '謎', 
            show3D:  '1',
            pad_t: 0.0, pad_d: 0.0, pad_s: 0.0,
            col_f: '', col_b: '', col_s: '', col_t: '', col_d: '', 
            col_l: '#0000ff', col_2: '#ff00ff', col_L: '#6666ff', 
    })

    for (let y = 0; y < size_y; y++) {
        for (let x = 0; x < size_x; x++) {
            let rect_2d: T_Rect = {
                tl: { x: ( x     ) * c_size_x, y: ( y     ) * c_size_y },
                tr: { x: ( x + 1 ) * c_size_x, y: ( y     ) * c_size_y },
                dl: { x: ( x     ) * c_size_x, y: ( y + 1 ) * c_size_y },
                dr: { x: ( x + 1 ) * c_size_x, y: ( y + 1 ) * c_size_y },
            };

            if (!g_debug.isON() && g_maze.is_masked_xyz(x, y, floor)) {
                cell_masks.drow2D(rect_2d, 0);
            } else {
                const obj_cell = g_maze.get_obj_xyz(x, y, floor);
                const obj_view = obj_cell?.view();
                if (obj_view !== undefined) obj_view?.drow2D(rect_2d, obj_cell?.get_pd().d??0);
                else {
                    const flr_view = g_maze.get_cell_xyz(x, y, floor)?.getObj()?.view();
                    if (flr_view !== undefined) flr_view?.drow2D(rect_2d, obj_cell?.get_pd().d??0);
                    else cell_unexp.drow2D(rect_2d, obj_cell?.get_pd().d??0);
                }
            }
        }
    }
    return;
}

