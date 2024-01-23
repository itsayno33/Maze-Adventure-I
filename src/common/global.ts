export const g_url_get_save    = 0;
export const g_url_get_maze    = 1;
export const g_url_get_guld    = 2;
export const g_url_check_JSON  = 3;
export const g_url: string[] = new Array(4);

export var g_pid: number[] = new Array(1) as number[];


import { C_DisplayMessage } from "../common/C_DisplayMessage";
export var g_mes: C_DisplayMessage;

export function init_after_loaded_DOM_in_common(): void {
    const  con = document.getElementById('message_pane');
    g_mes  = C_DisplayMessage.get(con, 'client_message');
}

export function _alert(txt: string, page_size = 250): void {
    for (let i = 0; i < txt.length; i += page_size) {
        if (!window.confirm(txt.substring(i, i+page_size))) break;
    }
}
