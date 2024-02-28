import { _min, _round }   from "../d_utl/F_Math";
import { C_Point }        from "../d_mdl/C_Point"
import { C_Range }        from "../d_mdl/C_Range";
import { C_MazeObjView }  from "../d_mdl/C_MazeObjView";
import { T_Direction }    from "../d_mdl/T_Direction";
import { C_Wall }         from "../d_mdl/C_Wall";
import { g_mes }          from "../d_cmn/global";
import { g_maze, g_team, g_ds }  from "./global_for_maze";

export type T_DrowSet = {
    canvas: HTMLCanvasElement|null,
    con:    CanvasRenderingContext2D|null,
    depth:  number,
    wall:   C_Wall|null,
}


// 3D描写時に使用する大域変数の準備
export function init_maze3D(): T_DrowSet {
    const canvas = document.getElementById('maze_view3D_canvas') as HTMLCanvasElement;
    if (canvas === null) {
        g_mes.warning_message('Canvas isnt found! id=Maze_view3D_canvas');
        return {canvas: null, con: null, depth: 0, wall: null};
    }
    const con: CanvasRenderingContext2D|null = canvas.getContext('2d');
    if (con === null) {
        g_mes.warning_message('Browser dont surpport 2D graphics!');
        return {canvas: null, con: null, depth: 0, wall: null};
    }

    C_MazeObjView.set_context3D(con);
    init_mazeCell3D();

    // 3Dメイズを描写するキャンバス要素のサイズをCSS上の『見た目』のサイズに合わせる
    canvas.width  = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    const depth = 5; // 奇数のみ対応。ダンジョンの見通しを良くするなら 5 かもしれない

    const top_p = new C_Point(0, 0, 0);
    const btm_p = new C_Point(canvas.width  - 1, canvas.height - 1, 0);
    const wall  = new C_Wall(depth, new C_Range(top_p, btm_p));
    return {canvas: canvas, con: con, depth: depth, wall: wall};
}

function init_mazeCell3D(): void {}


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
        for (var k = -H_depth; k < 0; k++) drowMazeCell(j, k);
        // 左側が見えている壁の描写 (右側から描写)
        for (var k = H_depth; k > 0; k--)  drowMazeCell(j, k);
        // 正面の壁の描写
        drowMazeCell(j, 0);
    }
}

function drowMazeCell(d: number, w: number): void {
    if (g_ds.wall === null) return;
    const around_j_k = g_team.walk().get_around(d, w, 0);
    const frot_wall  = g_ds.wall.get(d, w);
    const back_wall  = g_ds.wall.get(d + 1, w);
    const mz_kind    = g_maze.get_kind(around_j_k);

    g_maze?.get_cell(around_j_k)?.drow3D(frot_wall, back_wall);
    if (g_maze.exist_obj(around_j_k)) {
        const obj = g_maze.get_obj(around_j_k);
        if (obj !== null) obj.view()?.drow3D(frot_wall, back_wall);
    }
}

export function displey_mase3D_direction(): void {
    const p_dir = document.getElementById('maze_view3D_direction_info') as HTMLParagraphElement;
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

    switch (g_team.walk().get_d()) {
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

