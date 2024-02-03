import { T_CtlsMode } from "./T_CtlsMode";
export const g_ctls_mode: T_CtlsMode[] = new Array(1) as T_CtlsMode[];

import { calc_view2D_width, display_maze2D } from "./F_display_maze";
export var g_debug_mode: boolean = false;

import {T_DrowSet, init_maze3D } from "./F_display_maze";
export var g_ds: T_DrowSet   = {canvas: null, con: null, depth: 0, wall: null};

import { C_MazeViewMessage } from "./C_MazeViewMessage";
export var g_mvm: C_MazeViewMessage;

import { C_SwitchView } from "./C_SwitchView";
export var g_vsw: C_SwitchView;

import { C_Hero } from "../common/C_Hero";
export const g_hres: C_Hero[] = [];

import { C_Maze } from "../common/C_Maze";
export const g_maze = new C_Maze();

import { C_Team } from "../common/C_Team";
export const g_team = new C_Team();

import { C_Guild } from "../common/C_Guild";
export const g_guld = new C_Guild();

import { init_controlles }          from "./F_set_controlles";
import { decode_all, decode_maze }  from "./F_set_save_controlles";

import { general_load, get_mai_maze, get_new_maze, tmp_load }          from "../common/F_load_and_save";
import { g_mes, g_ready_games, g_start_env, init_after_loaded_DOM_in_common } from "../common/global";
import { do_move_bottom_half, set_move_controlles } from "./F_set_move_controlles";

export function init_before_games(): void {
    switch (g_start_env.mode) {
        case 'new':
            init_before_new_games();
            return;
        case 'load':
            init_before_load_games();
            return;
        case 'start':
            init_before_start_games();
            return;
        case 'mvpt':
            init_before_mvpt_games();
            return;
    }
}
export function init_before_new_games(): void {
    get_mai_maze().then((jsonObj:any)=>{
        decode_all(jsonObj?.save);
        do_load_bottom_half('blink_off');
    });
}
function init_before_load_games(): void {
    const uno = Number(g_start_env.opt);
    general_load(uno).then((jsonObj:any)=>{  
        decode_all(jsonObj?.save);
        do_load_bottom_half('ロードしました'); 
    });
}
function init_before_start_games(): void {
    const maze_name = g_start_env.opt;
    tmp_load().then((jsonObj:any)=>{
        decode_all(jsonObj?.save);
        get_new_maze(maze_name).then((jsonObj:any)=>{  
            decode_maze(jsonObj?.data);
            do_load_bottom_half('冒険を始めましょう！'); 
        });
    });
}
function init_before_mvpt_games(): void {
    tmp_load().then((jsonObj:any)=>{  
        decode_all(jsonObj?.save);
        do_load_bottom_half('冒険を再開しましょう！！'); 
    });
}

export function do_load_bottom_half(msg: string): void{
    _init_before_game();

    g_mvm.notice_message(msg); 
    g_mes.notice_message(msg); 
    set_move_controlles(); 
    g_vsw.view_maze(); 
    do_move_bottom_half('blink_off'); 
}
function _init_before_game(): void {
    calc_view2D_width();
    init_debug_mode();
    init_controlles();
}

export function init_after_loaded_DOM(): void {
    init_after_loaded_DOM_in_common();
    g_ready_games.setFunction(init_before_games);
    g_ready_games.setLoadedDOM();

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
        switch (event.code) {
            case "Escape":
            case "NumpadMultiply":
            case "F12":
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
