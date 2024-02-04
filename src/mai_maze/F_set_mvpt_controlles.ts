import { T_CtlsMode }          from "./T_CtlsMode";
import { hide_controlles }     from "./F_set_controlles";
import { set_camp_controlles } from "./F_set_camp_controlles";
import { g_ctls_mode, g_maze, g_mvm, g_team, g_vsw } from "./global_for_maze";

import { tmp_save }            from "../common/F_load_and_save";
import { C_UrlOpt }            from "../common/C_UrlOpt";
import { POST_and_move_page }  from "../common/F_POST";
import { g_my_url, g_save, g_start_env, g_url, g_url_mai_guld } from "../common/global";

let mode: string;

export function clr_mvpt_controlles(): void {
    const y_btn   = document.getElementById('y_btn')   as HTMLButtonElement;
    const n_btn   = document.getElementById('n_btn')   as HTMLButtonElement;

    y_btn  .removeEventListener("click", isOK, false);
    n_btn  .removeEventListener("click", isNG, false);

    window.removeEventListener('keypress', key_press_function8);

    y_btn  .style.setProperty('display', 'none');
    n_btn  .style.setProperty('display', 'none');
}

export function set_mvpt_controlles(): void {
    hide_controlles();
    mode = 'view';
    g_ctls_mode[0] = T_CtlsMode.MvPt;

    const y_btn   = document.getElementById('y_btn')   as HTMLButtonElement;
    const n_btn   = document.getElementById('n_btn')   as HTMLButtonElement;

    y_btn  .addEventListener("click", isOK, false);
    n_btn  .addEventListener("click", isNG, false);

    window.addEventListener('keypress', key_press_function8);

    y_btn  .style.setProperty('display', 'block');
    n_btn  .style.setProperty('display', 'block');

    const ctl_view = document.getElementById('move_ctl_view') as HTMLDivElement;
    ctl_view?.style.setProperty('display', 'block');

    g_mvm.notice_message('本当に街へ戻りますか？この場所にはギルドから復帰できます');
    mode = 'chek';
}


function key_press_function8(e: KeyboardEvent):void  {
    switch(e.code) { // Arrowは反応せず(イベント自体が発生せず)
        case 'KeyO':
        case 'KeyY':
        case 'Digit0':
        case 'Enter':
        case 'NumpadEnter':
            (document.getElementById('y_btn') as HTMLButtonElement)?.click();
            return;
        case 'KeyN':
        case 'KeyX':
        case 'Numpad0':
        case 'NumpadAdd':
//        case 'NumpadSubtract':
            (document.getElementById('n_btn') as HTMLButtonElement)?.click();
            return;
    }
}

function isOK(): void {
    switch(mode) {
        case 'view':
            g_mvm.notice_message('本当に街へ戻りますか？この場所にはギルドから復帰できます');
            mode = 'chek';
            break;
        case 'chek':
            g_mvm.notice_message('街へ戻りました');
            mode = 'view';

            const mvpt = g_team.get_loc().clone();
            mvpt.set_url(g_my_url);
            mvpt.set_tid(g_team.uid());
            mvpt.set_uid(g_maze.uid());

            g_save.all_mvpt[mvpt.uid()]   = mvpt;
            g_save.all_maze[g_maze.uid()] = g_maze;

            tmp_save().then(()=>{
                const opt = new C_UrlOpt();
                opt.set('mode', 'load');
                opt.set('pid',   g_start_env.pid);
                opt.set('opt',   100);
                POST_and_move_page(g_url[g_url_mai_guld], opt);
                return;
            });
            break;
    }
    
}

function isNG(): void {
    switch(mode) {
        case 'chek':
            g_mvm.clear_message();
            set_camp_controlles();
            g_vsw.view_camp();
            break;
    }
}
