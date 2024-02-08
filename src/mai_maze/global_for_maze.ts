import { T_CtlsMode } from "./T_CtlsMode";
export const g_ctls_mode: T_CtlsMode[] = new Array(1) as T_CtlsMode[];

import { calc_view2D_width, display_maze2D } from "./F_display_maze2D";
export var g_debug_mode: boolean = false;

import {T_DrowSet, init_maze3D } from "./F_display_maze3D";
export var g_ds: T_DrowSet   = {canvas: null, con: null, depth: 0, wall: null};

import { C_SwitchView }          from "./C_SwitchView";
export var g_vsw: C_SwitchView;

import { C_OneLineViewMessage }  from "../d_vie/C_OneLineViewMessage";
export var g_mvm: C_OneLineViewMessage;
export var g_cvm: C_OneLineViewMessage;

import { C_Hero } from "../d_mdl/C_Hero";
export const g_hres: C_Hero[] = [];

import { C_Maze } from "../d_mdl/C_Maze";
export const g_maze = new C_Maze();

import { C_Team } from "../d_mdl/C_Team";
export const g_team = new C_Team();

import { C_Guild } from "../d_mdl/C_Guild";
export const g_guld = new C_Guild();

import { C_DefaultCtls }            from './C_DefaultCtls';
export let g_ctls: C_DefaultCtls;

import { decode_all, decode_maze }  from "./F_set_save_mode";
import { do_move_bottom_half, act_move_mode } from "./F_set_move_mode";

import { 
    general_load, 
    get_mai_maze, 
    get_new_maze, 
    tmp_load 
} from "../d_cmn/F_load_and_save";

import { 
    g_mes, 
    g_ready_games, 
    g_start_env, 
    init_after_loaded_DOM_in_common 
} from "../d_cmn/global";
import { init_all_mode } from "./F_set_mode";

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
        do_load_bottom_half('');
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
    act_move_mode();  
    do_move_bottom_half('blink_off'); 
}
function _init_before_game(): void {
    calc_view2D_width();
    init_debug_mode();
    act_move_mode();
}

export function init_after_loaded_DOM(): void { 
    init_after_loaded_DOM_in_common(); 

    g_mvm  = C_OneLineViewMessage.get('maze_mesg'); 
    g_cvm  = C_OneLineViewMessage.get('camp_mesg'); 
    g_ctls = new C_DefaultCtls(); 
    g_vsw  = C_SwitchView.get(); 
    g_ds   = init_maze3D(); 
    stop_double_click(); 

    init_all_mode();
    g_ready_games.setFunction(init_before_games); 
    g_ready_games.setLoadedDOM(); 
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
