import { C_Hero } from "./C_Hero";
import { C_Maze }   from "./C_Maze";
import { T_MzKind } from "./T_MzKind";

export function display_maze2D(maze: C_Maze): void {
    const pre: HTMLElement|null = document.getElementById('Maze_view2D_pre');
    if (pre !== null) pre.innerText = maze.to_string();
}

type T_Wall = {
    min_x: number,
    max_x: number,
    min_y: number,
    max_y: number,
}

export function display_maze_3D(maze: C_Maze, hero: C_Hero): void {
    const canvas = document.getElementById('Maze_view3D_canvas') as HTMLCanvasElement;
    if (canvas === null) {
        alert('Canvas isnt found! id=Maze_view3D_canvas');
        return;
    }
    const con: CanvasRenderingContext2D|null = canvas.getContext('2d');
    if (con === null) {
        alert('Browser dont surpport 2D graphics!');
        return;
    }
    const depth = 5;

    const min_x: number = 0;
    const min_y: number = 0;
    const max_x: number = canvas.clientWidth  - 1;
    const max_y: number = canvas.clientHeight - 1;

    const center_x: number = (max_x - min_x) / 2;

    const front_wall_size_x_5: number = (max_x - min_x) / depth;
    const side_wall_size_x: number = (center_x - front_wall_size_x_5 / 2) / depth;

    const front_wall_H_size_x: number[] = new Array(depth + 1);

    front_wall_H_size_x[depth] = front_wall_size_x_5 / 2;
    for (var i = depth - 1; i >= 0; i--) {
        front_wall_H_size_x[i] = front_wall_H_size_x[i + 1] + side_wall_size_x;
    }

    const side_wall_size_T: number = (max_y - min_y) * 1.4 / ((depth + 1) * 2 + 1);
    const side_wall_size_B: number = (max_y - min_y) * 0.6 / ((depth + 1) * 2 + 1);

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

    con.fillStyle = '#aaaaff';
    con.fillRect(
        0, 
        0, 
        canvas.clientWidth - 1, 
        14 * (canvas.clientHeight - 1) / 20
    );

    con.fillStyle = '#6666ff';
    con.fillRect(
        0, 
        14 * (canvas.clientHeight - 1) / 20, 
        canvas.clientWidth   - 1, 
        canvas.clientHeight  - 1
    );

    for (var j = depth - 1; j >= 0; j--) {
        const H_depth = (depth - 1) / 2;
        for (var k = 0; k < H_depth; k++) {
            if (maze.get_cell(hero.get_around(j, k - H_depth)) == T_MzKind.Stone) {
                drow_side_wall(con, wall[j][k], wall[j + 1][k + 1]);
            }
            if (maze.get_cell(hero.get_around(j, H_depth - k)) == T_MzKind.Stone) {
                drow_side_wall(con, wall[j + 1][depth - k - 2], wall[j][depth - k - 1]);
            }
        }
        for (var k = 0; k < depth; k++) {
            if (maze.get_cell(hero.get_around(j, k - H_depth)) == T_MzKind.Stone) {
                drow_front_wall(con, wall[j][k]);
            }
        }
    }
}

function drow_front_wall(con: CanvasRenderingContext2D, rect: T_Wall): void {
    con.beginPath();
    con.moveTo(rect.min_x, rect.min_y);
    con.lineTo(rect.max_x, rect.min_y);
    con.lineTo(rect.max_x, rect.max_y);
    con.lineTo(rect.min_x, rect.max_y);
    con.closePath();

    con.fillStyle = '#00ff00';
    con.fill();
    con.strokeStyle = '#0000ff';
    con.lineWidth   = 5;
    con.stroke();

}
function drow_side_wall(con: CanvasRenderingContext2D, rect_left: T_Wall, rect_right: T_Wall): void {
    con.beginPath();
    con.moveTo(rect_left. max_x, rect_left.min_y);
    con.lineTo(rect_right.min_x, rect_right.min_y);
    con.lineTo(rect_right.min_x, rect_right.max_y);
    con.lineTo(rect_left. max_x, rect_left.max_y);
    con.closePath();

    con.fillStyle = '#00cc00';
    con.fill();
    con.strokeStyle = '#0000ff';
    con.lineWidth   = 5;
    con.stroke();
}

