import { g_debug, g_mes } from "../d_cmn/global";
import { T_MzKind }       from "../d_mdl/T_MzKind";
import { _min, _round }   from "../d_utl/F_Math";
import { g_maze, g_team, g_mazeCell } from "./global_for_maze";

export function init_maze2D(): void {
    calc_view2D_width();
    init_mazeCell2D();
}

// 【初期設定】View2Dの横幅をCSSから読み込んで適合する文字のサイズを計算してセットする
function calc_view2D_width(): void {
    const pre = document.getElementById('maze_view2D_pre') as HTMLPreElement;
    if (pre === null) return;

    const view2D_width  = pre.clientWidth;
    const view2D_height = pre.clientHeight;

    const col    = g_maze.get_x_max() + 1;
    const col_px = view2D_width  / col;

    const row    = g_maze.get_y_max() + 1;
    const row_px = view2D_height / row;

    const font_size   = _round(0.95 *  _min([col_px, row_px]), 2);
    const line_height = _round(1.00 *  _min([col_px, row_px]), 2);

    pre.setAttribute('width',  view2D_width .toString());
    pre.setAttribute('height', view2D_height.toString());
    pre.style.setProperty('font-size',  `${font_size}px`);
    pre.style.setProperty('line-height',`${line_height}px`);
}

function init_mazeCell2D(): void {
    g_mazeCell[T_MzKind.Floor].decode({view: {
        layer: 0, letter: '　', 
    }});

    g_mazeCell[T_MzKind.Unexp].decode({view: {
        layer: 0, letter: 'Ｘ', 
    }});

    g_mazeCell[T_MzKind.Stone].decode({view: {
        layer: 0, letter: '＃', 
    }});

    g_mazeCell[T_MzKind.StrUp].decode({view: {
        layer: 0, letter: '上', 
    }});
    g_mazeCell[T_MzKind.StrDn].decode({view: {
        layer: 0, letter: '下', 
    }});
    g_mazeCell[T_MzKind.StrUD].decode({view: {
        layer: 0, letter: '段', 
    }});

    const strEmp = {view: {
        layer: 0, letter: '謎', 
    }};
    g_mazeCell[T_MzKind.NoDef].decode(strEmp);
    g_mazeCell[T_MzKind.Unkwn].decode(strEmp);
    g_mazeCell[T_MzKind.Empty].decode(strEmp);

}

export function display_maze2D(): void { 
    const pre: HTMLElement|null = document.getElementById('maze_view2D_pre');
    if (pre !== null) pre.innerText = g_maze.to_string(g_team.get_pd().z, g_debug.isON());
    else g_mes.warning_message('Can not found pre#Maze_view2D_pre!!');
}
