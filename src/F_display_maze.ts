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
    const gap_x: number = canvas.clientWidth / 10;
    const gap_y: number = canvas.clientWidth / 20;

    const min_x: number = 0;
    const min_y: number = 0;
    const max_x: number = canvas.clientWidth  - 1;
    const max_y: number = canvas.clientHeight - 1;

    const center_x: number = (max_x - min_x) / 2;

    const front_wall_size_x_5: number = (max_x - min_x) / depth;
    const side_wall_size_x: number = (center_x - front_wall_size_x_5 / 2) / depth;

    const front_wall_H_size_x_5: number = front_wall_size_x_5 / 2;
    const front_wall_H_size_x_4: number = front_wall_H_size_x_5 + side_wall_size_x;
    const front_wall_H_size_x_3: number = front_wall_H_size_x_4 + side_wall_size_x;
    const front_wall_H_size_x_2: number = front_wall_H_size_x_3 + side_wall_size_x;
    const front_wall_H_size_x_1: number = front_wall_H_size_x_2 + side_wall_size_x;
    const front_wall_H_size_x_0: number = front_wall_H_size_x_1 + side_wall_size_x;

//    const side_wall_size_x: number = (max_x - min_x) / ((depth + 1) * 2 + 1);
    const side_wall_size_T: number = (max_y - min_y) * 1.4 / ((depth + 1) * 2 + 1);
    const side_wall_size_B: number = (max_y - min_y) * 0.6 / ((depth + 1) * 2 + 1);

    const lv0_mid_left_wall: T_Wall = {
        min_x: center_x - front_wall_H_size_x_0 * 3, 
        max_x: center_x - front_wall_H_size_x_0, 
        min_y: 0, 
        max_y: max_y,
    };
    const lv0_mid_right_wall: T_Wall = {
        min_x: center_x + front_wall_H_size_x_0, 
        max_x: center_x + front_wall_H_size_x_0 * 3, 
        min_y: 0, 
        max_y: max_y,
    };
    const lv0_center_wall: T_Wall = {
        min_x: center_x - front_wall_H_size_x_0 * 1, 
        max_x: center_x + front_wall_H_size_x_0 * 1, 
        min_y: 0, 
        max_y: max_y,
    };
    const lv1_most_left_wall: T_Wall = {
        min_x: center_x - front_wall_H_size_x_1 * 5, 
        max_x: center_x - front_wall_H_size_x_1 * 3, 
        min_y: min_y + side_wall_size_T, 
        max_y: max_y - side_wall_size_B,
    };
    const lv1_mid_left_wall: T_Wall = {
        min_x: center_x - front_wall_H_size_x_1 * 3, 
        max_x: center_x - front_wall_H_size_x_1 * 1, 
        min_y: min_y + side_wall_size_T, 
        max_y: max_y - side_wall_size_B,
    };
    const lv1_most_right_wall: T_Wall = {
        min_x: center_x + front_wall_H_size_x_1 * 3, 
        max_x: center_x + front_wall_H_size_x_1 * 5, 
        min_y: min_y + side_wall_size_T, 
        max_y: max_y - side_wall_size_B,
    };
    const lv1_mid_right_wall: T_Wall = {
        min_x: center_x + front_wall_H_size_x_1 * 1, 
        max_x: center_x + front_wall_H_size_x_1 * 3, 
        min_y: min_y + side_wall_size_T, 
        max_y: max_y - side_wall_size_B,
    };
    const lv1_center_wall: T_Wall = {
        min_x: center_x - front_wall_H_size_x_1 * 1, 
        max_x: center_x + front_wall_H_size_x_1 * 1, 
        min_y: min_y + side_wall_size_T, 
        max_y: max_y - side_wall_size_B,
    };
    const lv2_most_left_wall: T_Wall = {
        min_x: center_x - front_wall_H_size_x_2 * 5, 
        max_x: center_x - front_wall_H_size_x_2 * 3, 
        min_y: min_y + side_wall_size_T * 2, 
        max_y: max_y - side_wall_size_B * 2,
    };
    const lv2_mid_left_wall: T_Wall = {
        min_x: center_x - front_wall_H_size_x_2 * 3, 
        max_x: center_x - front_wall_H_size_x_2 * 1, 
        min_y: min_y + side_wall_size_T * 2, 
        max_y: max_y - side_wall_size_B * 2,
    };
    const lv2_most_right_wall: T_Wall = {
        min_x: center_x + front_wall_H_size_x_2 * 3, 
        max_x: center_x + front_wall_H_size_x_2 * 5, 
        min_y: min_y + side_wall_size_T * 2, 
        max_y: max_y - side_wall_size_B * 2,
    };
    const lv2_mid_right_wall: T_Wall = {
        min_x: center_x + front_wall_H_size_x_2 * 1, 
        max_x: center_x + front_wall_H_size_x_2 * 3, 
        min_y: min_y + side_wall_size_T * 2, 
        max_y: max_y - side_wall_size_B * 2,
    };
    const lv2_center_wall: T_Wall = {
        min_x: center_x - front_wall_H_size_x_2 * 1, 
        max_x: center_x + front_wall_H_size_x_2 * 1, 
        min_y: min_y + side_wall_size_T * 2, 
        max_y: max_y - side_wall_size_B * 2,
    };
    const lv3_most_left_wall: T_Wall = {
        min_x: center_x - front_wall_H_size_x_3 * 5, 
        max_x: center_x - front_wall_H_size_x_3 * 3, 
        min_y: min_y + side_wall_size_T * 3, 
        max_y: max_y - side_wall_size_B * 3,
    };
    const lv3_mid_left_wall: T_Wall = {
        min_x: center_x - front_wall_H_size_x_3 * 3, 
        max_x: center_x - front_wall_H_size_x_3 * 1, 
        min_y: min_y + side_wall_size_T * 3, 
        max_y: max_y - side_wall_size_B * 3,
    };
    const lv3_most_right_wall: T_Wall = {
        min_x: center_x + front_wall_H_size_x_3 * 3, 
        max_x: center_x + front_wall_H_size_x_3 * 5, 
        min_y: min_y + side_wall_size_T * 3, 
        max_y: max_y - side_wall_size_B * 3,
    };
    const lv3_mid_right_wall: T_Wall = {
        min_x: center_x + front_wall_H_size_x_3 * 1, 
        max_x: center_x + front_wall_H_size_x_3 * 3, 
        min_y: min_y + side_wall_size_T * 3, 
        max_y: max_y - side_wall_size_B * 3,
    };
    const lv3_center_wall: T_Wall = {
        min_x: center_x - front_wall_H_size_x_3 * 1, 
        max_x: center_x + front_wall_H_size_x_3 * 1, 
        min_y: min_y + side_wall_size_T * 3, 
        max_y: max_y - side_wall_size_B * 3,
    };
    const lv4_most_left_wall: T_Wall = {
        min_x: center_x - front_wall_H_size_x_4 * 5, 
        max_x: center_x - front_wall_H_size_x_4 * 3, 
        min_y: min_y + side_wall_size_T * 4, 
        max_y: max_y - side_wall_size_B * 4,
    };
    const lv4_mid_left_wall: T_Wall = {
        min_x: center_x - front_wall_H_size_x_4 * 3, 
        max_x: center_x - front_wall_H_size_x_4 * 1, 
        min_y: min_y + side_wall_size_T * 4, 
        max_y: max_y - side_wall_size_B * 4,
    };
    const lv4_most_right_wall: T_Wall = {
        min_x: center_x + front_wall_H_size_x_4 * 3, 
        max_x: center_x + front_wall_H_size_x_4 * 5, 
        min_y: min_y + side_wall_size_T * 4, 
        max_y: max_y - side_wall_size_B * 4,
    };
    const lv4_mid_right_wall: T_Wall = {
        min_x: center_x + front_wall_H_size_x_4 * 1, 
        max_x: center_x + front_wall_H_size_x_4 * 3, 
        min_y: min_y + side_wall_size_T * 4, 
        max_y: max_y - side_wall_size_B * 4,
    };
    const lv4_center_wall: T_Wall = {
        min_x: center_x - front_wall_H_size_x_4 * 1, 
        max_x: center_x + front_wall_H_size_x_4 * 1, 
        min_y: min_y + side_wall_size_T * 4, 
        max_y: max_y - side_wall_size_B * 4,
    };
    const lv5_most_left_wall: T_Wall = {
        min_x: center_x - front_wall_H_size_x_5 * 5, 
        max_x: center_x - front_wall_H_size_x_5 * 3, 
        min_y: min_y + side_wall_size_T * 5, 
        max_y: max_y - side_wall_size_B * 5,
    };
    const lv5_mid_left_wall: T_Wall = {
        min_x: center_x - front_wall_H_size_x_5 * 3, 
        max_x: center_x - front_wall_H_size_x_5 * 1, 
        min_y: min_y + side_wall_size_T * 5, 
        max_y: max_y - side_wall_size_B * 5,
    };
    const lv5_most_right_wall: T_Wall = {
        min_x: center_x + front_wall_H_size_x_5 * 3, 
        max_x: center_x + front_wall_H_size_x_5 * 5, 
        min_y: min_y + side_wall_size_T * 5, 
        max_y: max_y - side_wall_size_B * 5,
    };
    const lv5_mid_right_wall: T_Wall = {
        min_x: center_x + front_wall_H_size_x_5 * 1, 
        max_x: center_x + front_wall_H_size_x_5 * 3, 
        min_y: min_y + side_wall_size_T * 5, 
        max_y: max_y - side_wall_size_B * 5,
    };
    const lv5_center_wall: T_Wall = {
        min_x: center_x - front_wall_H_size_x_5 * 1, 
        max_x: center_x + front_wall_H_size_x_5 * 1, 
        min_y: min_y + side_wall_size_T * 5, 
        max_y: max_y - side_wall_size_B * 5,
    };

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

    if (maze.get_cell(hero.get_around(5, 0)) == T_MzKind.Stone){
        drow_front_wall(con, lv5_center_wall);
    };
 
    if (maze.get_cell(hero.get_around(4,-2)) == T_MzKind.Stone){
        drow_side_wall (con, lv4_most_left_wall, lv5_mid_left_wall);
        drow_front_wall(con, lv4_most_left_wall);
    };
    if (maze.get_cell(hero.get_around(4, 2)) == T_MzKind.Stone){
        drow_side_wall (con, lv5_mid_right_wall, lv4_most_right_wall);
        drow_front_wall(con, lv4_most_right_wall);
    };
    if (maze.get_cell(hero.get_around(4,-1)) == T_MzKind.Stone){
        drow_side_wall (con, lv4_mid_left_wall, lv5_center_wall);
        drow_front_wall(con, lv4_mid_left_wall);
    };
    if (maze.get_cell(hero.get_around(4, 1)) == T_MzKind.Stone){
        drow_side_wall (con, lv5_center_wall, lv4_mid_right_wall);
        drow_front_wall(con, lv4_mid_right_wall);
    };
    if (maze.get_cell(hero.get_around(4, 0)) == T_MzKind.Stone){
        drow_front_wall(con, lv4_center_wall);
    };
    if (maze.get_cell(hero.get_around(3,-2)) == T_MzKind.Stone){
        drow_side_wall (con, lv3_most_left_wall, lv4_mid_left_wall);
        drow_front_wall(con, lv3_most_left_wall);
    };
    if (maze.get_cell(hero.get_around(3, 2)) == T_MzKind.Stone){
        drow_side_wall (con, lv4_mid_right_wall, lv3_most_right_wall);
        drow_front_wall(con, lv3_most_right_wall);
    };
    if (maze.get_cell(hero.get_around(3,-1)) == T_MzKind.Stone){
        drow_side_wall (con, lv3_mid_left_wall, lv4_center_wall);
        drow_front_wall(con, lv3_mid_left_wall);
    };
    if (maze.get_cell(hero.get_around(3, 1)) == T_MzKind.Stone){
        drow_side_wall (con, lv4_center_wall, lv3_mid_right_wall);
        drow_front_wall(con, lv3_mid_right_wall);
    };
    if (maze.get_cell(hero.get_around(3, 0)) == T_MzKind.Stone){
        drow_front_wall(con, lv3_center_wall);
    };

    if (maze.get_cell(hero.get_around(2,-2)) == T_MzKind.Stone){
        drow_side_wall (con, lv2_most_left_wall, lv3_mid_left_wall);
        drow_front_wall(con, lv2_most_left_wall);
    };
    if (maze.get_cell(hero.get_around(2, 2)) == T_MzKind.Stone){
        drow_side_wall (con, lv3_mid_right_wall, lv2_most_right_wall);
        drow_front_wall(con, lv2_most_right_wall);
    };
    if (maze.get_cell(hero.get_around(2,-1)) == T_MzKind.Stone){
        drow_side_wall (con, lv2_mid_left_wall, lv3_center_wall);
        drow_front_wall(con, lv2_mid_left_wall);
    };
    if (maze.get_cell(hero.get_around(2, 1)) == T_MzKind.Stone){
        drow_side_wall (con, lv3_center_wall, lv2_mid_right_wall);
        drow_front_wall(con, lv2_mid_right_wall);
    };
    if (maze.get_cell(hero.get_around(2, 0)) == T_MzKind.Stone){
        drow_front_wall(con, lv2_center_wall);
    };

    if (maze.get_cell(hero.get_around(1,-2)) == T_MzKind.Stone){
        drow_side_wall (con, lv1_most_left_wall, lv2_mid_left_wall);
        drow_front_wall(con, lv1_most_left_wall);
    };
    if (maze.get_cell(hero.get_around(1, 2)) == T_MzKind.Stone){
        drow_side_wall (con, lv2_mid_right_wall, lv1_most_right_wall);
        drow_front_wall(con, lv1_most_right_wall);
    };
    if (maze.get_cell(hero.get_around(1,-1)) == T_MzKind.Stone){
        drow_side_wall (con, lv1_mid_left_wall, lv2_center_wall);
        drow_front_wall(con, lv1_mid_left_wall);
    };
    if (maze.get_cell(hero.get_around(1, 1)) == T_MzKind.Stone){
        drow_side_wall (con, lv2_center_wall, lv1_mid_right_wall);
        drow_front_wall(con, lv1_mid_right_wall);
    };
    if (maze.get_cell(hero.get_around(1, 0)) == T_MzKind.Stone){
        drow_front_wall(con, lv1_center_wall);
    };

    if (maze.get_cell(hero.get_around(0,-1)) == T_MzKind.Stone){
        drow_side_wall (con, lv0_mid_left_wall, lv1_center_wall);
    };
    if (maze.get_cell(hero.get_around(0, 1)) == T_MzKind.Stone){
        drow_side_wall (con, lv1_center_wall, lv0_mid_right_wall);
    };

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

