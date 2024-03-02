import { act_menu_mode }       from "./F_set_menu_mode";
import { g_ctls, g_maze, g_cvm, g_team, g_vsw } from "./global_for_maze";

import { C_UrlOpt }            from "../d_utl/C_UrlOpt";
import { tmp_save }            from "../d_cmn/F_load_and_save";
import { POST_and_move_page }  from "../d_cmn/F_POST";
import { g_my_url, g_save, g_start_env, g_url, g_url_mai_guld } from "../d_cmn/global";

let mode: string;

const ctls_mvpt_nor = {
    name: 'mvpt_nor', 
    isOK:  isOK,
    isNG:  isNG,
    cpOK:  isOK,
    cpNG:  isNG,
}

export function init_mvpt_mode(): void {
    g_ctls.set(ctls_mvpt_nor);
}

export function act_mvpt_mode(): void {
    mode = 'chek';
    g_cvm.notice_message('本当に街へ戻りますか？この場所にはギルドから復帰できます');
    g_ctls.act(ctls_mvpt_nor);
    g_vsw.view(g_vsw.MvPt());
}

function isOK(): void {
    switch(mode) {
        case 'view':
            g_cvm.notice_message('本当に街へ戻りますか？この場所にはギルドから復帰できます');
            mode = 'chek';
            break;
        case 'chek':
            g_cvm.notice_message('街へ戻りました');
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
            g_cvm.clear_message();
            act_menu_mode();
            break;
    }
}
