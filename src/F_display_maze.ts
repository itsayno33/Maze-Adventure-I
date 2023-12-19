import { T_MzKind } from "./T_MzKind";
import { g_maze, g_hero, g_ds } from "./global";

export function display_maze2D(): void {
    const pre: HTMLElement|null = document.getElementById('Maze_view2D_pre');
    if (pre !== null) pre.innerText = g_maze.to_string();
}

export type T_Wall = {
    min_x: number,
    max_x: number,
    min_y: number,
    max_y: number,
}

export type T_DrowSet = {
    canvas: HTMLCanvasElement|null,
    con:    CanvasRenderingContext2D|null,
    depth:  number,
    wall:   T_Wall[][]|null,
}

export function init_maze_3D(): T_DrowSet {
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

    const min_x: number = 0;
    const min_y: number = 0;
    const max_x: number = canvas.clientWidth  - 1;
    const max_y: number = canvas.clientHeight - 1;

    const center_x: number = (max_x - min_x) / 2;

    const front_wall_size_x: number = (max_x - min_x) / depth;
    const side_wall_size_x:  number = (center_x - front_wall_size_x / 2) / depth;

    const front_wall_H_size_x: number[] = new Array(depth + 1);

    front_wall_H_size_x[depth] = front_wall_size_x / 2;
    for (var i = depth - 1; i >= 0; i--) {
        front_wall_H_size_x[i] = front_wall_H_size_x[i + 1] + side_wall_size_x;
    }

    const side_wall_size_T: number = (max_y - min_y) * 1.0 / ((depth + 1) * 2 + 1);
    const side_wall_size_B: number = (max_y - min_y) * 1.0 / ((depth + 1) * 2 + 1);

    const wall: T_Wall[][] = new Array(depth + 1);
    for (var j = 0; j < depth + 1; j++) {
        wall[j] = new Array(depth);
        for (var k = 0; k < depth; k++) {
            const wk_x = center_x - front_wall_H_size_x[j] * (depth - 2 * k);
            wall[j][k] = {
                min_x: wk_x,
                max_x: wk_x  + front_wall_H_size_x[j] * 2,
                min_y: min_y + side_wall_size_T * j,
                max_y: max_y - side_wall_size_B * j,
            }
        }
    }
    return {canvas: canvas, con: con, depth: depth, wall: wall};
}

export function display_maze_3D(): void {
    if (g_ds.canvas === null || g_ds.con === null || g_ds.wall === null) return;

    draw_init_maze();

    for (var j = g_ds.depth - 1; j >= 0; j--) {
        const H_depth = (g_ds.depth - 1) / 2;
        for (var k = 0; k < H_depth; k++) {
            if (g_maze.get_cell(g_hero.get_around(j, k - H_depth)) == T_MzKind.Stone) {
                drow_right_side_wall (
                    g_ds.wall[j][k],    // front wall
                    g_ds.wall[j + 1][k] // back  wall
                );
                drow_front_wall(g_ds.wall[j][k]);
            }
            if (g_maze.get_cell(g_hero.get_around(j, H_depth - k)) == T_MzKind.Stone) {
                drow_left_side_wall (
                    g_ds.wall[j][g_ds.depth - k - 1],    // front wall
                    g_ds.wall[j + 1][g_ds.depth - k - 1] // back  wall 
                );
                drow_front_wall(g_ds.wall[j][g_ds.depth - k - 1]);
            }
        }
        if (g_maze.get_cell(g_hero.get_around(j, 0)) == T_MzKind.Stone) {
            drow_front_wall(g_ds.wall[j][H_depth]);
        }
    }
}

function draw_init_maze(): void {
    if (g_ds.canvas === null || g_ds.con === null) return;

    g_ds.con.fillStyle = '#aaaaff';
    g_ds.con.fillRect(
        0, 
        0, 
        g_ds.canvas.clientWidth - 1, 
        10 * (g_ds.canvas.clientHeight - 1) / 20
    );

    g_ds.con.fillStyle = '#6666ff';
    g_ds.con.fillRect(
        0, 
        10 * (g_ds.canvas.clientHeight - 1) / 20, 
        g_ds.canvas.clientWidth   - 1, 
        g_ds.canvas.clientHeight  - 1
    );

    // 床と天井にラインを引くこと
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
    con.lineWidth   = 5;
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
    con.lineWidth   = 5;
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
    con.lineWidth   = 5;
    con.stroke();
}
