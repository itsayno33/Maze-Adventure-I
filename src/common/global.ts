export const g_url_get_maze    = 0;
export const g_url_check_JSON  = 1;
export const g_url: string[] = new Array(2);

export var g_pid: number[] = new Array(1) as number[];

import { C_Maze } from "../common/C_Maze";
export const g_maze = new C_Maze({maze_id: -1});

import { C_Team } from "../common/C_Team";
export const g_team = new C_Team();


import { C_DisplayMessage } from "../common/C_DisplayMessage";
export var g_mes: C_DisplayMessage;

export function init_after_loaded_DOM_in_common(): void {
    const  con = document.getElementById('message_pane');
    g_mes  = C_DisplayMessage.get(con, 'client_message');
}
