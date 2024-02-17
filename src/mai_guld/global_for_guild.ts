import { C_Dialog } from './../d_cmn/C_Dialog';
import { 
    _alert, 
    g_alert, 
    g_debug, 
    g_my_url, 
    g_ready_games, 
    g_save, 
    g_start_env, 
    init_after_loaded_DOM_in_common 
}                         from "../d_cmn/global";
import { 
    general_load, 
    get_mai_guld 
}                         from "../d_cmn/F_load_and_save";

import { C_Maze }         from "../d_mdl/C_Maze";
import { C_Team }         from "../d_mdl/C_Team";
import { C_Guild }        from "../d_mdl/C_Guild";
import { C_MovablePoint } from '../d_mdl/C_MovablePoint';
import { C_MazeInfo }     from "../d_mdl/C_MazeInfo";

export const g_all_maze: {[uniq_id: string]: C_Maze}  = {};
export const g_all_team: {[uniq_id: string]: C_Team}  = {};
export const g_all_guld: {[uniq_id: string]: C_Guild} = {};
export const g_all_mvpt: {[uniq_id: string]: C_MovablePoint} = {};
export const g_maze_inf: {[name:    string]: C_MazeInfo}     = {};

export let   g_team: C_Team  = new C_Team();
export let   g_guld: C_Guild = new C_Guild();


import { C_OneLineViewMessage } from "../d_vie/C_OneLineViewMessage";
export var g_mvm: C_OneLineViewMessage;

import { C_DefaultCtls }        from './C_DefaultCtls';
export let g_ctls: C_DefaultCtls;

import { C_SwitchView }         from "./C_SwitchView";
export var g_vsw: C_SwitchView;

import { init_menu }            from "./F_default_menu";
import { post_load_function }   from './F_save_menu';

export let g_dialog: C_Dialog;

export function init_before_games(): void {
    switch (g_start_env.mode) {
        case 'new':
            init_before_new_games();
            return;
        case 'load':
            init_before_load_games();
            return;
    }
}

function init_before_new_games(): void {
    get_mai_guld().then((jsonObj:any)=>{ 
        if (jsonObj.save === undefined) {
            _alert('不正なデータを受信しました(New Game)' + jsonObj.emsg);
            return;
        }
        post_load_function(jsonObj);
        g_save.mypos.set_url(g_my_url);
        g_team.set_loc(g_save.mypos);
    });
    return;
}

function init_before_load_games(): void {
    const uno = Number(g_start_env.opt);
    general_load(uno).then((jsonObj:any)=>{ 
        post_load_function(jsonObj);
    }); 
}

export function init_after_loaded_DOM(): void { 
    init_after_loaded_DOM_in_common('debug_mode', 'sytm_logs_pane'); 

    g_mvm  = C_OneLineViewMessage.getObj('guld_head_message'); 
    g_ctls = C_DefaultCtls.getObj(); 
    g_vsw  = C_SwitchView.getObj(); 

    init_debug_mode(); 
    init_menu(); 
    stop_double_click(); 

    g_ready_games.setFunction(init_before_games);
    g_ready_games.setLoadedDOM();
}

export function init_debug_mode(): void {

    try {
//        g_dialog = new C_Dialog();
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
                    break;
            }
        })
        return;
    } catch (err) {return};
} 

function stop_double_click(): void {
    window.addEventListener('dblclick',(evt: MouseEvent) =>{evt.preventDefault();})
}

function toggle_debug_mode(yn: boolean): void {
//    g_dialog.display(yn);
    g_alert.display(yn);
}
