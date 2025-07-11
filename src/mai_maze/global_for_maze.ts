import { T_CtlsMode }    from "./T_CtlsMode";
export const g_ctls_mode: T_CtlsMode[] = new Array(1) as T_CtlsMode[];

import { init_mazeCh, display_mazeCh } from "./F_display_mazeCh";
import { display_maze3D, init_maze3D, T_DrowSet }            from "./F_display_maze3D";
export var g_ds: T_DrowSet   = {canvas: null, con: null, depth: 0, wall: null};

import { C_SwitchView }          from "./C_SwitchView";
export var g_vsw: C_SwitchView;

import { C_OneLineViewMessage }  from "../d_vie/C_OneLineViewMessage";
export var g_mvm: C_OneLineViewMessage;
export var g_cvm: C_OneLineViewMessage;

import { C_Hero } from "../d_mdl/C_Hero";
export let g_hres: C_Hero[] = [];

import { C_Maze } from "../d_mdl/C_Maze";
export const g_maze = new C_Maze();

import { C_Team } from "../d_mdl/C_Team";
export const g_team = new C_Team();

import { C_Guild } from "../d_mdl/C_Guild";
export const g_guld = new C_Guild();

import { C_DrowMap2D, C_DrowMap2M, C_DrowMap2X } from "./C_DrowMap2X";
export let g_view2D: C_DrowMap2D;
export let g_view2M: C_DrowMap2M;

import { C_WndrObj, I_WndrObj }       from "../d_mdl/C_WndrObj";
export const g_obje: (I_WndrObj|undefined)[] = []; // WndrObjの配列

import { C_HresInfo } from "./C_HresInfo";
export let g_hresInfo: C_HresInfo;

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
import { _irand } from "../d_utl/F_Rand";


import { C_MazeObjShadow } from '../d_mdl/C_MazeObjEtc';

import { C_CycleButton }   from "../d_ctl/C_CycleButton";
import { display_maze2D, init_maze2D } from "./F_display_maze2D";
export let g_view3: C_CycleButton;

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
//        install_objs(1);                   // 暫定(C_objsのテスト用)
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
    init_mazeCh();
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
    g_cvm  = C_OneLineViewMessage.getObj('menu_mesg'); 
    g_ctls = C_DefaultCtls.getObj(); 
    g_vsw  = C_SwitchView.getObj(); 
    g_hresInfo = new C_HresInfo();

    g_view2D = C_DrowMap2X.getObj({
        div_id:    'div_maze_vw2D', 
        canvas_id: 'maze_view2D_canvas', 
        x_min: 15, y_min: 15
    }) as C_DrowMap2D;

    g_view2M = C_DrowMap2X.getObj({
        div_id:    'div_maze_vw2M', 
        canvas_id: 'maze_view2M_canvas', 
        x_min:  5, y_min:  5
    }) as C_DrowMap2M;

    const btn = document.getElementById('view3_mode') as HTMLButtonElement;
    g_view3 = C_CycleButton.getObj(btn);

    init_debug_mode();
    init_view3_mode();
    stop_double_click(); 

    init_all_mode();
    g_ready_games.setFunction(init_before_games); 
    g_ready_games.setLoadedDOM(); 
}

export function init_debug_mode(): void {
    try {
        const alert = document.getElementById('alert_mode');
        alert?.style.setProperty('display', 'none');
        alert?.addEventListener("click",(event:MouseEvent)=>{
            try{g_alert.show();} catch(err){};
        });

        g_debug.setObj({
            yn:        false,
            onName:   'DEBUG',
            offName:  '通常',
            onClass:  'debug',
            offClass: 'normal',
        });
        g_debug.addFnc(toggle_debug_mode);//g_debug.setON();

        const btn = document.getElementById('debug_mode') as HTMLButtonElement;
        window.addEventListener("keydown",(event)=>{
            switch (event.code) {
                case "NumpadMultiply":
                case "Escape":
                    btn.click();
                    toggle_debug_mode(g_debug.isON());
                    break;
            }
        })
    } catch (err) {return};
}

function toggle_debug_mode(yn: boolean): void {
    display_mazeCh();
    display_maze2D();
    display_maze3D();

    const alert = document.getElementById('alert_mode');
    const display = yn ? 'block' : 'none';
    alert?.style.setProperty('display', display);

}


export function init_view3_mode(): void {
    try {
        g_view3.setObj({
            at:       0,
            ccName:   ['3D', '2D', 'Ch'],
            ccClass:  ['d3', 'd2', 'ch'],
        });
        g_view3.addFnc(cycle_view3_mode);//g_view3.setON();

        const btn = document.getElementById('view3_mode') as HTMLButtonElement;
        window.addEventListener("keydown",(event)=>{
            switch (event.code) {
                case "Digit3":
                case "KeyV":
                    btn.click();
            }
        });
        cycle_view3_mode(0); // 初期状態は3D表示
    } catch (err) {return};
}

function cycle_view3_mode(seq: number): void {

    const d3 = document.getElementById('div_maze_vw3D') as HTMLDivElement;
    const d2 = document.getElementById('div_maze_vw2D') as HTMLDivElement;
    const ch = document.getElementById('div_maze_vwCh') as HTMLDivElement;

    switch (g_view3.at()) {
        case 0: // 3D表示
            d3.style.setProperty('display', 'block');
            d2.style.setProperty('display', 'none');
            ch.style.setProperty('display', 'none');
            display_maze3D();
            break;
        case 1: // 2D表示
            d3.style.setProperty('display', 'none');
            d2.style.setProperty('display', 'block');
            ch.style.setProperty('display', 'none');
            display_maze2D();
            break;
        case 2: // 文字表示
            d3.style.setProperty('display', 'none');
            d2.style.setProperty('display', 'none');
            ch.style.setProperty('display', 'block');
            display_mazeCh();
            break;
    }
}


function stop_double_click(): void {
    window.addEventListener('dblclick',(evt: MouseEvent) =>{evt.preventDefault();})
}


export function clr_g_hres(): void {
    g_hres = [];
}




// 暫定(C_MazeObjのテスト用)
function install_objs(num: number = 1): void {
    // 通り抜けできないオブジェを置く（移動版）
    for (let i = 0; i < num; i++) {
        const x = _irand(0, (g_maze.get_x_max() - 1) / 2 - 1) * 2 + 1; 
        const y = _irand(0, (g_maze.get_y_max() - 1) / 2 - 1) * 2 + 1; 

        const obje = new C_WndrObj({
            pos:    {x:x, y:y, z:0, d:0},
        });
        g_maze.add_obj(obje as I_WndrObj);
        g_obje.push(obje); // WndrObjの配列に追加
    }
    // 通り抜けできるオブジェを置く
    for (let i = 0; i < num; i++) {
        const x = _irand(0, (g_maze.get_x_max() - 1) / 2 - 1) * 2 + 1; 
        const y = _irand(0, (g_maze.get_y_max() - 1) / 2 - 1) * 2 + 1; 
        const obj = new C_MazeObjShadow({
            pos:     {x:x, y:y, z:0, d:0},
        });
        g_maze.add_obj(obj);
    }
}
