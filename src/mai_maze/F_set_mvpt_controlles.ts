import { T_CtlsMode }          from "./T_CtlsMode";
import { hide_controlles }     from "./F_set_controlles";
import { set_camp_controlles } from "./F_set_camp_controlles";
import { g_ctls, g_ctls_mode, g_maze, g_cvm, g_team, g_vsw } from "./global_for_maze";

import { C_UrlOpt }            from "../d_utl/C_UrlOpt";
import { tmp_save }            from "../d_cmn/F_load_and_save";
import { POST_and_move_page }  from "../d_cmn/F_POST";
import { g_my_url, g_save, g_start_env, g_url, g_url_mai_guld } from "../d_cmn/global";

let mode: string;


export function set_mvpt_controlles(): void {
    mode = 'view';
    g_ctls_mode[0] = T_CtlsMode.MvPt;
    g_ctls.add('mvpt_nor', ctls_mvpt_nor);
    g_ctls.act('mvpt_nor');

    g_cvm.notice_message('本当に街へ戻りますか？この場所にはギルドから復帰できます');
    mode = 'chek';
}
const ctls_mvpt_nor = {
    name: 'mvpt_nor', 
    isOK:  isOK,
    isNG:  isNG,
    cpOK:  isOK,
    cpNG:  isNG,
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
            g_vsw.view_camp();
            break;
    }
}
