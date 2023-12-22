
    /************ *************************** **************/
    /*  HTMLPreElement = document.createElement('pre');    */
    /*  HTMLElement?.setAttribute('id', 'u_arraw');        */
    /*  HTMLElement?.style.setProperty('display', 'grid'); */
    /*  HTMLElement?.appendChild(HTMLElement);             */
    /************ *************************** **************/

import { set_move_controlles } from "./F_set_move_controlles";
import { init_p_maze_view_message } from "./F_p_maze_view_message";

export function hide_controlles() {
    const move_ctl_view = document.getElementById('move_ctl_view') as HTMLDivElement;
    move_ctl_view?.style.setProperty('display', 'none');
}

export function init_controlles() {
    init_p_maze_view_message();
    hide_controlles();
    set_move_controlles();
}
