import { C_Maze } from "./C_Maze";
export const g_maze = new C_Maze({maze_id: -1});

import { C_Hero } from "./C_Hero";
export const g_hero = new C_Hero();

import {T_DrowSet, init_maze_3D } from "./F_display_maze";
export var g_ds: T_DrowSet   = {canvas: null, con: null, depth: 0, wall: null};
export function init_after_loaded_DOM(): void {
    g_ds = init_maze_3D();
}

export var g_debug_mode: boolean = false;
