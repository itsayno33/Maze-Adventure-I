export const g_url_get_maze    = 0;
export const g_url_check_JSON  = 1;
export const g_url: string[] = new Array(2);

export var g_pid: number[] = new Array(1) as number[];

import { C_Maze } from "../C_Maze";
export const g_maze = new C_Maze({maze_id: -1});

import { C_Team } from "../C_Team";
export const g_team = new C_Team();

import { T_CtlsMode } from "./T_CtlsMode";
export const g_ctls_mode: T_CtlsMode[] = new Array(1) as T_CtlsMode[];

import { display_maze2D } from "./F_display_maze";
export var g_debug_mode: boolean = false;

import {T_DrowSet, init_maze3D } from "./F_display_maze";
export var g_ds: T_DrowSet   = {canvas: null, con: null, depth: 0, wall: null};

import { C_DisplayMessage } from "../C_DisplayMessage";
export var g_mes: C_DisplayMessage;

import { C_MazeViewMessage } from "./C_MazeViewMessage";
export var g_mvm: C_MazeViewMessage;

import { C_SwitchView } from "./C_SwitchView";
export var g_vsw: C_SwitchView;

export function init_after_loaded_DOM(): void {
    const  con = document.getElementById('message_pane');
    g_mes  = C_DisplayMessage.get(con, 'client_message');

    g_mvm  = C_MazeViewMessage.get();
    g_vsw  = C_SwitchView.get();g_vsw.view_maze();
    g_ds   = init_maze3D();
    stop_double_click();
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

function stop_double_click(): void {
    window.addEventListener('dblclick',(evt: MouseEvent) =>{evt.preventDefault();})
}

