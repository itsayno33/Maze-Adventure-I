
    /************ *************************** **************/
    /*  HTMLPreElement = document.createElement('pre');    */
    /*  HTMLElement?.setAttribute('id', 'u_arraw');        */
    /*  HTMLElement?.style.setProperty('display', 'grid'); */
    /*  HTMLElement?.appendChild(HTMLElement);             */
    /************ *************************** **************/

import { init_move_mode } from "./F_set_move_mode";
import { init_menu_mode } from "./F_set_menu_mode";
import { init_mvpt_mode } from "./F_set_mvpt_mode";
import { init_SL_mode }   from "./F_set_save_mode";
import { init_UD_mode }   from "./F_set_UD_mode";
import { T_CtlsMode }          from "./T_CtlsMode";
import { g_ctls, g_ctls_mode } from "./global_for_maze";

export function init_all_mode(): void {
    g_ctls.deact();
    init_move_mode();
    init_menu_mode();
    init_mvpt_mode();
    init_SL_mode();
    init_UD_mode()
}
export function hide_controlles(): void {
//    g_ctls_mode[0] = T_CtlsMode.Nop;
    g_ctls.deact();
    const move_ctl_view = document.getElementById('pane_ctls_boad') as HTMLElement;
    move_ctl_view?.style.setProperty('display', 'none');
}
