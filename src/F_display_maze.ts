import { C_Point }  from "./C_Point";
import { C_Range }  from "./C_Range";
import { T_MzKind } from "./T_MzKind";
import { T_Wall, C_Wall }   from "./C_Wall";
import { g_maze, g_hero, g_ds } from "./global";
import { T_Direction } from "./T_Direction";

export function display_maze2D(): void { 
    const pre: HTMLElement|null = document.getElementById('Maze_view2D_pre');
    if (pre !== null) pre.innerText = g_maze.to_string(g_hero.get_p().z);
}
export type T_DrowSet = {
    canvas: HTMLCanvasElement|null,
    con:    CanvasRenderingContext2D|null,
    depth:  number,
    wall:   C_Wall|null,
}

export function init_maze3D(): T_DrowSet {
    const canvas = document.getElementById('Maze_view3D_canvas') as HTMLCanvasElement;
    if (canvas === null) {
        alert('Canvas isnt found! id=Maze_view3D_canvas');
        return {canvas: null, con: null, depth: 0, wall: null};
    }
    const con: CanvasRenderingContext2D|null = canvas.getContext('2d');
    if (con === null) {
        alert('Browser dont surpport 2D graphics!');
        return {canvas: null, con: null, depth: 0, wall: null};
    }

    const depth = 5; // 奇数のみ対応。ダンジョンの見通しを良くするなら 5 かもしれない

    const top_p = new C_Point(0, 0, 0);
    const btm_p = new C_Point(canvas.clientWidth  - 1, canvas.clientHeight - 1, 0);
    const wall  = new C_Wall(depth, new C_Range(top_p, btm_p));
    
    return {canvas: canvas, con: con, depth: depth, wall: wall};
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
            if (g_maze.get_cell(g_hero.get_around(j, k, 0)) == T_MzKind.Stone) {
                drow_right_side_wall(
                    g_ds.wall.get(j,     k), // front wall
                    g_ds.wall.get(j + 1, k)  // back  wall
                );
                drow_front_wall(g_ds.wall.get(j,k));
            } else { 
                drow_front_floor(
                    g_ds.wall.get(j,     k), // front wall
                    g_ds.wall.get(j + 1, k), // back  wall
                );
            }
        }
        // 　左側が見えている壁の描写 (右側から描写)
        for (var k = H_depth; k > 0; k--) {
            if (g_maze.get_cell(g_hero.get_around(j, k, 0)) == T_MzKind.Stone) {
                drow_left_side_wall(
                    g_ds.wall.get(j,     k), // front wall
                    g_ds.wall.get(j + 1, k)  // back  wall 
                );
                drow_front_wall(g_ds.wall.get(j, k));
            } else {
                drow_front_floor(
                    g_ds.wall.get(j,     k), // front wall
                    g_ds.wall.get(j + 1, k), // back  wall
                );
            }

        }
        // 正面の壁の描写
        if (g_maze.get_cell(g_hero.get_around(j, 0, 0)) == T_MzKind.Stone) {
            drow_front_wall(g_ds.wall.get(j, 0));
        } else {
            drow_front_floor(
                g_ds.wall.get(j,     0), // front wall
                g_ds.wall.get(j + 1, 0), // back  wall
                );
        }

    }
}

function draw_init_maze3D(): void {
    if (g_ds.canvas === null || g_ds.con === null) return;

    g_ds.con.fillStyle = '#aaaaaa';
    g_ds.con.fillRect(
        0, 
        0, 
        g_ds.canvas.clientWidth - 1, 
        get_holizon_line(),
    );

    g_ds.con.fillStyle = '#6666ff';
    g_ds.con.fillRect(
        0, 
        get_holizon_line(), 
        g_ds.canvas.clientWidth   - 1, 
        g_ds.canvas.clientHeight  - 1,
    );

    // 床と天井にラインを引くこと
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
    const right_x = g_ds.canvas.clientWidth  - 1;
    const front_y = g_ds.canvas.clientHeight - 1;
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

function drow_front_floor(
            rect_front: T_Wall, 
            rect_back:  T_Wall, 
            fill_color: string = '#6666ff', 
            line_color: string = '#9999ff'
            ): void {
    if (g_ds.con === null) return;
    const con = g_ds.con;

    con.beginPath();
//     con.lineJoin = 'round';
    con.moveTo(rect_front.min_x, rect_front.max_y);
    con.lineTo(rect_front.max_x, rect_front.max_y);
    con.lineTo(rect_back .max_x, rect_back .max_y);
    con.lineTo(rect_back .min_x, rect_back .max_y);
    con.closePath();

    con.fillStyle   = fill_color;
    con.fill();
    con.strokeStyle = line_color;
    con.lineWidth   = 1;
    con.stroke();

}

function drow_front_wall(rect_front: T_Wall): void {
    if (g_ds.con === null) return;
    const con = g_ds.con;

    con.beginPath();
    con.lineJoin = 'round';
    con.moveTo(rect_front.min_x, rect_front.min_y);
    con.lineTo(rect_front.max_x, rect_front.min_y);
    con.lineTo(rect_front.max_x, rect_front.max_y);
    con.lineTo(rect_front.min_x, rect_front.max_y);
    con.closePath();

    con.fillStyle = '#00ff00';
    con.fill();
    con.strokeStyle = '#0000ff';
    con.lineWidth   = 3;
    con.stroke();

}
function drow_left_side_wall(rect_front: T_Wall, rect_back: T_Wall): void {
    if (g_ds.con === null) return;
    const con = g_ds.con;

    con.beginPath();
    con.lineJoin = 'round';
    con.moveTo(rect_front.min_x, rect_front.min_y);
    con.lineTo(rect_back .min_x, rect_back .min_y);
    con.lineTo(rect_back .min_x, rect_back .max_y);
    con.lineTo(rect_front.min_x, rect_front.max_y);
    con.closePath();

    con.fillStyle = '#00cc00';
    con.fill();
    con.strokeStyle = '#0000ff';
    con.lineWidth   = 3;
    con.stroke();
}
function drow_right_side_wall(rect_front: T_Wall, rect_back: T_Wall): void {
    if (g_ds.con === null) return;
    const con = g_ds.con;

    con.beginPath();
    con.lineJoin = 'round';
    con.moveTo(rect_front.max_x, rect_front.min_y);
    con.lineTo(rect_back .max_x, rect_back .min_y);
    con.lineTo(rect_back .max_x, rect_back .max_y);
    con.lineTo(rect_front.max_x, rect_front.max_y);
    con.closePath();

    con.fillStyle = '#00cc00';
    con.fill();
    con.strokeStyle = '#0000ff';
    con.lineWidth   = 3;
    con.stroke();
}

export function displey_mase3D_direction(): void {
    const p_dir = document.getElementById('Maze_view3D_direction_info') as HTMLParagraphElement;
    if (p_dir === null) {
        alert('P element isnt found! id=Maze_view3D_direction_info');
        return;
    }
    var direction: string;
    switch (g_hero.get_dir()) {
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

    const p = g_hero.get_p();
    const mes = '地下 ' + (p.z + 1) + '階　' + direction + '　(x = <span id="direction_X">' + p.x + '</span>, y = <span id="direction_Y">' + p.y + '</span>)';
    p_dir.innerHTML = mes;
}


export function maze3D_blink_on_direction(): void {
    const dir_x = document.getElementById('direction_X') as HTMLSpanElement;
    if (dir_x === null) return;

    const dir_y = document.getElementById('direction_Y') as HTMLSpanElement;
    if (dir_y === null) return;

    switch (g_hero.get_dir()) {
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

