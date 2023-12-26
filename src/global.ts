const my_url_base: string = "http://127.0.0.1/dev/mai/mai_maze/";
export const g_get_maze_url:   string = my_url_base + "mai_maze.php";
export const g_check_JSON_url: string = my_url_base + "check_JSON.php";

export const g_view2D_width  = 320;
export const g_view2D_height = 243;

import { C_Maze } from "./C_Maze";
export const g_maze = new C_Maze({maze_id: -1});

import { C_Team } from "./C_Team";
export const g_team = new C_Team();

import { T_CtlsMode } from "./T_CtlsMode";
export const g_ctls_mode: T_CtlsMode[] = new Array(1) as T_CtlsMode[];

import { display_maze2D } from "./F_display_maze";
export var g_debug_mode: boolean = false;

import {T_DrowSet, init_maze3D } from "./F_display_maze";
export var g_ds: T_DrowSet   = {canvas: null, con: null, depth: 0, wall: null};

import { C_MazeViewMessage } from "./C_MazeViewMessage";
export var g_mvm: C_MazeViewMessage;

export function init_after_loaded_DOM(): void {
    g_ds   = init_maze3D();
    g_mvm  = C_MazeViewMessage.get(); g_mvm.clear_message();
}

export function init_debug_mode(): void {
    g_debug_mode = true;

    const btn = document.getElementById('debug_mode') as HTMLButtonElement;
    if (btn === null) return;
    toggle_debug_mode();
    btn.addEventListener("click", (event)=>{toggle_debug_mode();}, false);
    window.addEventListener("keydown",(event)=>{
        switch (event.key) {
            case "Escape":
                btn.click();
        }
    })
}

function toggle_debug_mode(): void {
    const btn = document.getElementById('debug_mode') as HTMLButtonElement;
    if (btn === null) return;
    if (g_debug_mode) {
        g_debug_mode = false;
        btn.setAttribute('value', 'false');
        btn.innerHTML = '通常モード中';
        btn.style.setProperty('background-color', '#f0f8ff');
        btn.style.setProperty('color', '#008000');
    } else {
        g_debug_mode = true;
        btn.setAttribute('value', 'true');
        btn.innerHTML = 'デバッグモード中';
        btn.style.setProperty('background-color', '#ff0000');
        btn.style.setProperty('color', '#ffffff');
    }
    display_maze2D();
}
