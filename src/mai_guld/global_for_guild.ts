import { I_JSON_Uniq } from './../common/C_SaveData';
export var g_debug_mode: boolean = false;

//import { g_save, g_guld, g_maze, g_team, init_after_loaded_DOM_in_common } from "../common/global";
import { _alert, g_ready_games, g_start_env, init_after_loaded_DOM_in_common } from "../common/global";

import { C_Maze } from "../common/C_Maze";
export const g_all_maze: {[uniq_id: string]: C_Maze} = {};

import { C_Team, alert_team_info } from "../common/C_Team";
export const g_all_team: {[uniq_id: string]: C_Team} = {};
export let   g_team: C_Team;

import { C_Guild, alert_guld_info } from "../common/C_Guild";
export const g_all_guld: {[uniq_id: string]: C_Guild} = {};
export let   g_guld: C_Guild;

import { C_SaveData } from "../common/C_SaveData";
export const g_save = new C_SaveData();

import { init_display_menu } from "./F_default_menu";

import { C_GldViewMessage }  from "./C_GldViewMessage";
export var g_mvm: C_GldViewMessage;

import { C_DefaultCtls }     from './C_DefaultCtls';
export let g_ctls: C_DefaultCtls;

import { get_mai_guld } from "../common/F_load_and_save";

export function init_before_games(): void {
    switch (g_start_env.mode) {
        case 'new_guld':
            init_before_new_games();
            return;
        case 'load_guld':
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

        g_save.decode(jsonObj.save);

        g_team = g_save.all_team[g_save.team_uid]; 
        g_guld = g_save.all_guld[g_team.get_loc().get_uid()]; 

        set_from_save_to_all_data(g_all_maze, g_save.all_maze);
        set_from_save_to_all_data(g_all_team, g_save.all_team);
        set_from_save_to_all_data(g_all_guld, g_save.all_guld);
    });
    return;
}
export function set_from_save_to_all_data(glob: {[uid: string]: I_JSON_Uniq}, save: {[uid: string]: I_JSON_Uniq}): void {
    for (let ii in glob) delete glob[ii];
    for (let ii in save) glob[save[ii].uid()] = save[ii];
}

function init_before_load_games(): void {}

export function init_after_loaded_DOM(): void { 
    init_after_loaded_DOM_in_common(); 
    g_ready_games.setFunction(init_before_games);
    g_ready_games.setLoadedDOM();

    g_mvm = C_GldViewMessage.get(); 
    g_ctls = new C_DefaultCtls(); 
    init_debug_mode(); /* F_load_and_save.tsのget_mai_maze()で呼んでるが。。。 */ 
    init_display_menu(); 
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
                break;
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
//    display_maze2D();
}

function stop_double_click(): void {
    window.addEventListener('dblclick',(evt: MouseEvent) =>{evt.preventDefault();})
}
