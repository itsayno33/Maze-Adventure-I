import { C_Point }        from "../d_mdl/C_Point"
import { C_Range }        from "../d_mdl/C_Range";
import { T_MzKind }       from "../d_mdl/T_MzKind";
import { T_Direction }    from "../d_mdl/T_Direction";
import { g_mes }          from "../d_cmn/global";
import { _min, _round }   from "../d_utl/F_Math";
import { C_Wall }         from "./C_Wall";
import { g_maze, g_team, g_ds, g_debug_mode }  from "./global_for_maze";

// 【初期設定】View2Dの横幅をCSSから読み込んで適合する文字のサイズを計算してセットする
export function calc_view2D_width(): void {
    const pre = document.getElementById('Maze_view2D_pre') as HTMLPreElement;
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

export function display_maze2D(): void { 
    const pre: HTMLElement|null = document.getElementById('Maze_view2D_pre');
    if (pre !== null) pre.innerText = g_maze.to_string(g_team.get_pd().z, g_debug_mode);
    else g_mes.warning_message('Can not found pre#Maze_view2D_pre!!');
}

/*
export type T_DrowSet = {
    canvas: HTMLCanvasElement|null,
    con:    CanvasRenderingContext2D|null,
    depth:  number,
    wall:   C_Wall|null,
}

type T_xy   = {x: number, y: number}
type T_Rect = {tl: T_xy, tr: T_xy, bl: T_xy, br: T_xy};

// 3D描写時に使用する大域変数の準備
export function init_maze3D(): T_DrowSet {
    const canvas = document.getElementById('Maze_view3D_canvas') as HTMLCanvasElement;
    if (canvas === null) {
        g_mes.warning_message('Canvas isnt found! id=Maze_view3D_canvas');
        return {canvas: null, con: null, depth: 0, wall: null};
    }
    const con: CanvasRenderingContext2D|null = canvas.getContext('2d');
    if (con === null) {
        g_mes.warning_message('Browser dont surpport 2D graphics!');
        return {canvas: null, con: null, depth: 0, wall: null};
    }

    // 3Dメイズを描写するキャンバス要素のサイズをCSS上の『見た目』のサイズに合わせる
    canvas.width  = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    const depth = 5; // 奇数のみ対応。ダンジョンの見通しを良くするなら 5 かもしれない

    const top_p = new C_Point(0, 0, 0);
    const btm_p = new C_Point(canvas.width  - 1, canvas.height - 1, 0);
    const wall  = new C_Wall(depth, new C_Range(top_p, btm_p));
    return {canvas: canvas, con: con, depth: depth, wall: wall};
}

// 3D描写時の画面初期化。とりあえず天井と床を描く
function draw_init_maze3D(): void {
    if (g_ds.canvas === null || g_ds.con === null) return;

    g_ds.con.fillStyle = '#aaaaaa';
    g_ds.con.fillRect(
        0, 
        0, 
        g_ds.canvas.width - 1, 
        get_holizon_line(),
    );

    g_ds.con.fillStyle = '#6666ff';
    g_ds.con.fillRect(
        0, 
        get_holizon_line(), 
        g_ds.canvas.width   - 1, 
        g_ds.canvas.height  - 1,
    );

    drow_floor_line();
}

function get_holizon_line(): number {
    if (g_ds.wall === null) return -1;
    return g_ds.wall.get(g_ds.depth, 0).max_y;
}

function drow_floor_line(): void {
    if (g_ds.canvas === null || g_ds.con === null || g_ds.wall === null) return;
    const con   = g_ds.con;
    const wall  = g_ds.wall;
    const depth = g_ds.depth;
    const H_dept = (depth - 1) / 2;

    const left_x  = 0;
    const right_x = g_ds.canvas.width  - 1;
    const front_y = g_ds.canvas.height - 1;
    const back_y  = get_holizon_line();

    con.strokeStyle = '#9999ff';
    con.lineWidth   = 1;

    // 横線(画面に対して水平)を引く
    for (var y = 0; y < depth + 1; y++) {
        con.beginPath();
        con.moveTo(left_x , wall.get(y, 0).max_y);
        con.lineTo(right_x, wall.get(y, 0).max_y);
        con.stroke(); 
    }

    // 縦線を引く
    for (var x = -H_dept; x < H_dept + 1; x++) {
        con.beginPath();
        con.moveTo(wall.get(0,     x).min_x, front_y);
        con.lineTo(wall.get(depth, x).min_x, back_y );
        con.stroke();
    }
}

export function display_maze3D(): void {
    if (g_ds.canvas === null || g_ds.con === null || g_ds.wall === null) return;

    draw_init_maze3D();
    displey_mase3D_direction();

    const depth   =  g_ds.depth;
    const H_depth = (depth - 1) / 2;
    for (var j = g_ds.depth - 1; j >= 0; j--) {
        // 右側が見えている壁の描写 (左側から描写)
        for (var k = -H_depth; k < 0; k++) {
            switch (g_maze.get_cell(g_team.get_around(j, k, 0))) {
                case T_MzKind.Stone:
                    drow_right_side_stone(j, k);
                    break;
                case T_MzKind.Unexp: 
                    drow_floor_unexp(j ,k);
                    break;
                case T_MzKind.StrUp:
                case T_MzKind.StrDn:
                case T_MzKind.StrUD:
                    drow_right_side_stairs(j, k);
                    break;
                case T_MzKind.Floor: 
                default:
                    drow_floor(j ,k);
                    break;
            }
        }
        // 　左側が見えている壁の描写 (右側から描写)
        for (var k = H_depth; k > 0; k--) {
            switch (g_maze.get_cell(g_team.get_around(j, k, 0))) {
                case T_MzKind.Stone:
                    drow_left_side_stone(j, k);
                    break;
                case T_MzKind.Unexp: 
                    drow_floor_unexp(j ,k);
                    break;
                case T_MzKind.StrUp:
                case T_MzKind.StrDn:
                case T_MzKind.StrUD:
                    drow_left_side_stairs(j, k);
                    break;
                case T_MzKind.Floor: 
                default:
                    drow_floor(j ,k);
                    break;
            }
        }
        // 正面の壁の描写
        switch (g_maze.get_cell(g_team.get_around(j, 0, 0))) {
            case T_MzKind.Stone:
                drow_front_stone(j, 0);
                break;
            case T_MzKind.Unexp: 
                drow_floor_unexp(j ,0);
                break;
            case T_MzKind.StrUp:
            case T_MzKind.StrDn:
            case T_MzKind.StrUD:
                drow_front_stairs(j, 0);
                break;
            case T_MzKind.Floor: 
            default:
                drow_floor(j ,0);
                break;
        }
    }
}

function drow_floor_unexp(d: number, w:number): void {
    drow_floor(d, w, '#66ffff');
}

function drow_front_stone(d: number, w: number): void {
    drow_front(d, w, '#00ff00', '#0000ff');
}
function drow_left_side_stone(d: number, w: number): void {
    drow_left_side(d, w, '#00ff00', '#0000ff');
    drow_front    (d, w, '#00ff00', '#0000ff');
}
function drow_right_side_stone(d: number, w: number): void {
    drow_right_side(d, w, '#00ff00', '#0000ff');
    drow_front     (d, w, '#00ff00', '#0000ff');
}

function drow_front_stairs(d: number, w: number): void {
    drow_floor  (d, w, '#ffffcc', '#ffff00');
    drow_ceiling(d, w, '#ffffcc', '#ffff00');
    drow_front  (d, w,  null,     '#ffff00');
}
function drow_left_side_stairs(d: number, w: number): void {
    drow_floor    (d, w, '#ffffcc', '#ffff00');
    drow_ceiling  (d, w, '#ffffcc', '#ffff00');
    drow_left_side(d, w,  null,     '#ffff00');

}
function drow_right_side_stairs(d: number, w: number): void {
    drow_floor     (d, w, '#ffffcc', '#ffff00');
    drow_ceiling   (d, w, '#ffffcc', '#ffff00');
    drow_right_side(d, w,  null,     '#ffff00');
}

function drow_floor(
            d:    number, 
            w:    number, 
            fill: string = '#6666ff', 
            line: string = '#9999ff'
            ): void {

    if (g_ds.wall === null) return;
    const rect_front = g_ds.wall.get(d,     w);
    const rect_back  = g_ds.wall.get(d + 1, w);

    const rect: T_Rect = {
        tl: {x: rect_front.min_x, y: rect_front.max_y},
        tr: {x: rect_front.max_x, y: rect_front.max_y},
        br: {x: rect_back .max_x, y: rect_back .max_y},
        bl: {x: rect_back .min_x, y: rect_back .max_y}
    }
    drow_cell(rect, fill, line);
}
function drow_ceiling(
            d: number, 
            w: number, 
            fill: string = '#aaaaaa', 
            line: string = '#9999ff'
    ): void {

    if (g_ds.wall === null) return;
    const rect_front = g_ds.wall.get(d,     w);
    const rect_back  = g_ds.wall.get(d + 1, w);

    const rect: T_Rect = {
        tl: {x: rect_front.min_x, y: rect_front.min_y},
        tr: {x: rect_front.max_x, y: rect_front.min_y},
        br: {x: rect_back .max_x, y: rect_back .min_y},
        bl: {x: rect_back .min_x, y: rect_back .min_y}
    }
    drow_cell(rect, fill, line);
}
function drow_front(
        d: number, 
        w: number, 
        fill: string|null = '#00ff00', 
        line: string|null = '#0000ff'
    ): void {
        
    if (g_ds.wall === null) return;
    const con = g_ds.con;
    const rect_front = g_ds.wall.get(d, w);

    const rect: T_Rect = {
        tl: {x: rect_front.min_x, y: rect_front.min_y},
        tr: {x: rect_front.max_x, y: rect_front.min_y},
        br: {x: rect_front.max_x, y: rect_front.max_y},
        bl: {x: rect_front.min_x, y: rect_front.max_y}
    }
    drow_cell(rect, fill, line);
}
function drow_left_side(
        d: number, 
        w: number, 
        fill: string|null = '#00cc00', 
        line: string|null = '#0000ff'
    ): void {

    if (g_ds.wall === null) return;
    const con = g_ds.con;
    const rect_front = g_ds.wall.get(d,     w);
    const rect_back  = g_ds.wall.get(d + 1, w);

    const rect: T_Rect = {
        tl: {x: rect_front.min_x, y: rect_front.min_y},
        tr: {x: rect_back .min_x, y: rect_back .min_y},
        br: {x: rect_back .min_x, y: rect_back .max_y},
        bl: {x: rect_front.min_x, y: rect_front.max_y}
    }
    drow_cell(rect, fill, line);
}
function drow_right_side(
        d: number, 
        w: number, 
        fill: string|null = '#00cc00', 
        line: string|null = '#0000ff'
    ): void {

    if (g_ds.wall === null) return;
    const con = g_ds.con;
    const rect_front = g_ds.wall.get(d,     w);
    const rect_back  = g_ds.wall.get(d + 1, w);

    const rect: T_Rect = {
        tl: {x: rect_front.max_x, y: rect_front.min_y},
        tr: {x: rect_back .max_x, y: rect_back .min_y},
        br: {x: rect_back .max_x, y: rect_back .max_y},
        bl: {x: rect_front.max_x, y: rect_front.max_y}
    }
    drow_cell(rect, fill, line);
}

function drow_cell(r: T_Rect, fill: string|null, line: string|null): void {
    if (g_ds.con === null || g_ds.wall === null) return;
    const con = g_ds.con;

    con.beginPath();
    con.moveTo(r.tl.x, r.tl.y);
    con.lineTo(r.tr.x, r.tr.y);
    con.lineTo(r.br.x, r.br.y);
    con.lineTo(r.bl.x, r.bl.y);
    con.closePath();

    if (fill != null) {
        con.fillStyle   = fill;
        con.fill();
    }
    if (line !== null) {
        con.strokeStyle = line;
        con.lineWidth   = 1;
        con.stroke();
    }
}


export function displey_mase3D_direction(): void {
    const p_dir = document.getElementById('Maze_view3D_direction_info') as HTMLParagraphElement;
    if (p_dir === null) {
        g_mes.warning_message('P element isnt found! id=Maze_view3D_direction_info');
        return;
    }
    var direction: string;
    const p = g_team.get_pd();
    switch (p.d) {
        case T_Direction.N:
            direction = '<span class="direction_N">《北》</span>';
            break;
        case T_Direction.E:
            direction = '<span class="direction_E">《東》</span>';
            break;
        case T_Direction.S:
            direction = '<span class="direction_S">《南》</span>';
            break;
        case T_Direction.W:
            direction = '<span class="direction_W">《西》</span>';
            break;
        default:
            direction = '<span class="direction_D">《謎》</span>';
            break;
    }

    const mes = '地下 ' + (p.z + 1) + '階　' + direction + '　(x = <span id="direction_X">' + p.x + '</span>, y = <span id="direction_Y">' + p.y + '</span>)';
    p_dir.innerHTML = mes;
}


export function maze3D_blink_on_direction(): void {
    const dir_x = document.getElementById('direction_X') as HTMLSpanElement;
    if (dir_x === null) return;

    const dir_y = document.getElementById('direction_Y') as HTMLSpanElement;
    if (dir_y === null) return;

    switch (g_team.get_dir()) {
        case T_Direction.N:
        case T_Direction.S:
            dir_x.classList.remove('blink');
            dir_y.classList.add   ('blink');
            return;
        case T_Direction.E:
        case T_Direction.W:
            dir_x.classList.add   ('blink');
            dir_y.classList.remove('blink');
            return;
    }
}
export function maze3D_blink_off_direction(): void {
    const dir_x = document.getElementById('direction_X') as HTMLSpanElement;
    if (dir_x === null) return;
    dir_x.classList.remove('blink');

    const dir_y = document.getElementById('direction_Y') as HTMLSpanElement;
    if (dir_y === null) return;
    dir_y.classList.remove('blink');
}
*/
