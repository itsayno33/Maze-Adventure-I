import { T_CtlsMode }    from "./T_CtlsMode";
export const g_ctls_mode: T_CtlsMode[] = new Array(1) as T_CtlsMode[];

import { init_maze2D, display_maze2D } from "./F_display_maze2D";
import { init_maze3D, T_DrowSet }      from "./F_display_maze3D";
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

import { init_all_mode }            from "./F_set_mode";
import { decode_all, decode_maze }  from "./F_set_save_mode";
import { do_move_bottom_half, act_move_mode } from "./F_set_move_mode";

import { 
    general_load, 
    get_mai_maze, 
    get_new_maze, 
    tmp_load 
} from "../d_cmn/F_load_and_save";

import { 
    g_alert,
    g_debug,
    g_mes, 
    g_ready_games, 
    g_start_env, 
    init_after_loaded_DOM_in_common 
} from "../d_cmn/global";

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
    init_maze2D();
    g_ds = init_maze3D(); 

    g_mvm.notice_message(msg); 
    g_mes.notice_message(msg); 
    act_move_mode();  
    do_move_bottom_half('blink_off'); 
}

export function init_after_loaded_DOM(): void { 
    init_after_loaded_DOM_in_common('debug_mode', 'pane_sytm_logs'); 

    g_mvm  = C_OneLineViewMessage.getObj('maze_mesg'); 
    g_cvm  = C_OneLineViewMessage.getObj('camp_mesg'); 
    g_ctls = C_DefaultCtls.getObj(); 
    g_vsw  = C_SwitchView.getObj(); 

    init_debug_mode();
    stop_double_click(); 

    init_all_mode();
    g_ready_games.setFunction(init_before_games); 
    g_ready_games.setLoadedDOM(); 
}

export function init_debug_mode(): void {
    try {
        g_debug.setObj({
            yn:        false,
            onName:   'DEBUG',
            offName:  '通常',
            onClass:  'debug',
            offClass: 'normal',
        });
        g_debug.addFnc(toggle_debug_mode);g_debug.setON();

        const btn = document.getElementById('debug_mode') as HTMLButtonElement;
        window.addEventListener("keydown",(event)=>{
            switch (event.code) {
                case "KeyE":
                case "NumpadMultiply":
                case "F1":
                    btn.click();
            }
        })
    } catch (err) {return};
}

function toggle_debug_mode(yn: boolean): void {
    display_maze2D();
    g_alert.display(yn);
}


function stop_double_click(): void {
    window.addEventListener('dblclick',(evt: MouseEvent) =>{evt.preventDefault();})
}
