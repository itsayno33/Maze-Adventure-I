
    /************ *************************** **************/
    /*  HTMLPreElement = document.createElement('pre');    */
    /*  HTMLElement?.setAttribute('id', 'u_arraw');        */
    /*  HTMLElement?.style.setProperty('display', 'grid'); */
    /*  HTMLElement?.appendChild(HTMLElement);             */
    /************ *************************** **************/

import { set_move_controlles } from "./F_set_move_controlles";
import { T_CtlsMode } from "./T_CtlsMode";
import { g_ctls, g_ctls_mode } from "./global_for_maze";

export function hide_controlles(): void {
    g_ctls_mode[0] = T_CtlsMode.Nop;
    g_ctls.deact();
    const move_ctl_view = document.getElementById('move_ctl_view') as HTMLDivElement;
    move_ctl_view?.style.setProperty('display', 'none');
}

export function init_controlles(): void {
    set_move_controlles();
}
