
    /************ *************************** **************/
    /*  HTMLPreElement = document.createElement('pre');    */
    /*  HTMLElement?.setAttribute('id', 'u_arraw');        */
    /*  HTMLElement?.style.setProperty('display', 'grid'); */
    /*  HTMLElement?.appendChild(HTMLElement);             */
    /************ *************************** **************/

import { T_CtlsMode }          from "./T_CtlsMode";
import { g_ctls, g_ctls_mode } from "./global_for_maze";

export function hide_controlles(): void {
    g_ctls_mode[0] = T_CtlsMode.Nop;
    g_ctls.deact();
    const move_ctl_view = document.getElementById('pane_ctls_boad') as HTMLElement;
    move_ctl_view?.style.setProperty('display', 'none');
}
