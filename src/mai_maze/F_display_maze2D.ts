import { g_debug, g_mes } from "../d_cmn/global";
import { T_MzKind }       from "../d_mdl/T_MzKind";
import { _min, _round }   from "../d_utl/F_Math";
import { g_maze, g_team, g_mazeCell } from "./global_for_maze";

export function init_maze2Dpre(): void {
    calc_view2Dpre_width();
    init_mazeCell2Dpre();
}

// 【初期設定】View2Dの横幅をCSSから読み込んで適合する文字のサイズを計算してセットする
function calc_view2Dpre_width(): void {
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

function init_mazeCell2Dpre(): void {
    g_mazeCell[T_MzKind.Floor].decode({view: {
        layer: 0, letter: '　', 
    }});

    g_mazeCell[T_MzKind.Unexp].decode({view: {
        layer: 0, letter: '・', 
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


export function display_maze2Dpre(): void { 
    const pre: HTMLElement|null = document.getElementById('maze_view2D_pre');
    if (pre !== null) pre.innerText = to_string(g_debug.isON());
    else g_mes.warning_message('Can not found pre#Maze_view2D_pre!!');
}

function to_string(debug_mode: boolean = false): string {
    const size_x = g_maze.get_x_max();
    const size_y = g_maze.get_y_max();
    const floor  = g_team.get_pd().z

    let ret_str = '';
    for (let y = 0; y < size_y; y++) {
        for (let x = 0; x < size_x; x++) {
            if (!debug_mode && g_maze.is_masked_xyz(x, y, floor)) {
                ret_str += 'Ｘ';
            } else {
                const obj = g_maze.get_obj_xyz(x, y, floor);
                if (obj === null || obj.view() === undefined) {
                    const kind = g_maze.get_cell_xyz(x, y, floor);
                    ret_str += g_mazeCell[kind].view()?.letter();
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

