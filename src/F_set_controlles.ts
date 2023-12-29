
    /************ *************************** **************/
    /*  HTMLPreElement = document.createElement('pre');    */
    /*  HTMLElement?.setAttribute('id', 'u_arraw');        */
    /*  HTMLElement?.style.setProperty('display', 'grid'); */
    /*  HTMLElement?.appendChild(HTMLElement);             */
    /************ *************************** **************/

import { clr_move_controlles, set_move_controlles } from "./F_set_move_controlles";
import { clr_UD_controlles } from "./F_set_UD_controlles";
import { clr_camp_controlles } from "./F_set_camp_controlles";
import { clr_save_controlles } from "./F_set_save_controlles";
import { g_ctls_mode } from "./global";
import { T_CtlsMode } from "./T_CtlsMode";

export function hide_controlles() {
    g_ctls_mode[0] = T_CtlsMode.Nop;
    clr_move_controlles();
    clr_UD_controlles();
    clr_camp_controlles();
    clr_save_controlles();
    const move_ctl_view = document.getElementById('move_ctl_view') as HTMLDivElement;
    move_ctl_view?.style.setProperty('display', 'none');
}

export function init_controlles() {
    set_move_controlles();
}
