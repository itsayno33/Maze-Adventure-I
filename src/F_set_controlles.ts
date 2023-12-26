
    /************ *************************** **************/
    /*  HTMLPreElement = document.createElement('pre');    */
    /*  HTMLElement?.setAttribute('id', 'u_arraw');        */
    /*  HTMLElement?.style.setProperty('display', 'grid'); */
    /*  HTMLElement?.appendChild(HTMLElement);             */
    /************ *************************** **************/

import { clr_move_controlles, set_move_controlles } from "./F_set_move_controlles";
import { clr_UD_controlles } from "./F_set_UD_controlles";

export function hide_controlles() {
    clr_move_controlles();
    clr_UD_controlles();
    const move_ctl_view = document.getElementById('move_ctl_view') as HTMLDivElement;
    move_ctl_view?.style.setProperty('display', 'none');
}

export function init_controlles() {
    set_move_controlles();
}
