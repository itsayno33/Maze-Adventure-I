export const g_url_get_maze    = 0;
export const g_url_check_JSON  = 1;
export const g_url: string[] = new Array(2);

export var g_pid: number[] = new Array(1) as number[];

export var g_debug_mode: boolean = false;

import { g_save, g_guld, g_maze, g_team, init_after_loaded_DOM_in_common } from "../common/global";
import { init_display_menu } from "./F_default_menu";

import { C_GldViewMessage }  from "./C_GldViewMessage";
export var g_mvm: C_GldViewMessage;

import { C_Hero }            from "../common/C_Hero";
export const g_hres = [] as C_Hero[];

export function init_before_new_games(player_id: number): void {
    // 本来はここでNew Gameのデータをサーバーから読み込む感じ
    // get_mai_guld();

    g_save.all_maze = [g_maze];
    g_save.all_team = [g_team];
    g_save.all_guld = [g_guld];
}

export function init_after_loaded_DOM(): void {
    init_after_loaded_DOM_in_common();
    g_mvm = C_GldViewMessage.get();
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
        switch (event.key) {
            case "Escape":
            case "Key@":
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
