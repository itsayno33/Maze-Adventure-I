import { C_UrlOpt }                   from "../common/C_UrlOpt";
import { UD_save, tmp_save }          from "../common/F_load_and_save";
import { POST_and_move_page }         from "../common/F_POST";
import { g_start_env, g_url, g_url_mai_guld } from "../common/global";

import { T_CtlsMode }                 from "./T_CtlsMode";
import { hide_controlles }            from "./F_set_controlles";
import { set_g_save }                 from "./F_set_save_controlles";
import { set_move_controlles, do_move_bottom_half } from "./F_set_move_controlles";
import { 
    g_ctls_mode, 
    g_mvm, 
    g_maze, 
    g_team,
    g_ctls, 
}   from "./global_for_maze";


var canUp: boolean  =  false;
var canDn: boolean  =  false;

var isUp:  boolean  =  false;

const ctls_updn_up = {
    name: 'updn_up', 
    do_U:  do_up,
    isOK:  do_up,
    isNG:  do_cancel,
}
const ctls_updn_dn = {
    name: 'updn_dn', 
    do_D:  do_down,
    isOK:  do_down,
    isNG:  do_cancel,
}
const ctls_updn_ud_hpup = {
    name: 'updn_ud_hpup', 
//    do_U:  hope_Up,
//    isOK:  do_UD,
    do_U:  do_up,
    do_D:  do_down,
    isNG:  do_cancel,
}
const ctls_updn_ud_hpdn = {
    name: 'updn_ud_hpdn', 
//    do_D:  hope_Down,
//    isOK:  do_UD,
    do_U:  do_up,
    do_D:  do_down,
    isNG:  do_cancel,
}


export function set_Up_controlles(): void {
    if (g_team.get_z() > 0) {
        g_mvm.notice_message('上りテレポーターが有ります。登りますか？登る ⇒ 〇 登らない ⇒ ✖');
    } else {
        g_mvm.notice_message('街に戻りますか？戻る ⇒ 〇 戻らない ⇒ ✖');
    }

    hide_controlles();
    canUp = true;
    canDn = false;
    g_ctls.add('updn_up', ctls_updn_up);
    g_ctls.act('updn_up');
    __set_UD_controlles();
}

export function set_Dn_controlles(): void {
    g_mvm.notice_message('下りテレポーターが有ります。降りますか？降りる ⇒ 〇 降りない ⇒ ✖');

    hide_controlles();
    canUp = false;
    canDn = true;
    g_ctls.add('updn_dn', ctls_updn_dn);
    g_ctls.act('updn_dn');
    __set_UD_controlles();
}

export function set_UD_controlles(): void {
    g_mvm.notice_message('上下テレポーターが有ります。登りますか？登る⇒ 〇 降りる ⇒ (↓キー) 移動しない ⇒ ✖');

    hide_controlles();
    canUp = true;
    canDn = true;
    g_ctls.add('updn_ud_hpup', ctls_updn_ud_hpup);
    g_ctls.add('updn_ud_hpdn', ctls_updn_ud_hpdn);
    if (!isUp)  g_ctls.act('updn_ud_hpup');
    else        g_ctls.act('updn_ud_hpdn');
    __set_UD_controlles();
}

function __set_UD_controlles(): void {
    g_ctls_mode[0] = T_CtlsMode.UD;

    const ctl_view = document.getElementById('move_ctl_view') as HTMLDivElement;
    ctl_view.style.setProperty('display', 'block');
}

function do_cancel(): void {
    g_mvm.clear_message();
    set_move_controlles();
}

function do_up(): void {
    const rslt = g_team.hope_p_up();

    //　上り階段が地下一階の場合はセーブしてから街(冒険者ギルド)へ移動する
    if (rslt.has_hope && rslt.subj.z < 0) {
        do_UD_save().then(async ()=>{
            return await tmp_save();
        }).then(()=>{
            const opt = new C_UrlOpt();
            opt.set('mode', 'load');
            opt.set('pid',   g_start_env.pid);
            opt.set('opt',   100);
            POST_and_move_page(g_url[g_url_mai_guld], opt);
            return;
        });
        return;
    }

    // 上り階段が地下二階以下の場合はセーブしてから上の階に移動する
    if (!rslt.has_hope || !g_maze.within(rslt.subj)) {
        rslt.doNG();
        g_mvm.clear_message();
        set_move_controlles();
        do_move_bottom_half('blink_off');
    } else {
        do_UD_save().then(()=>{
            rslt.doOK();
            g_mvm.clear_message();
            set_move_controlles();
            do_move_bottom_half('blink_off');
        });
    }
}

function do_down(): void {
    const rslt = g_team.hope_p_down();
    if (!rslt.has_hope || !g_maze.within(rslt.subj)) {
        rslt.doNG();
        g_mvm.clear_message();
        set_move_controlles();
        do_move_bottom_half('blink_off');
    } else {
        do_UD_save().then(()=>{
            rslt.doOK();
            g_mvm.clear_message();
            set_move_controlles();
            do_move_bottom_half('blink_off');
        });
    }
}

function do_UD(): void {
    if (!canUp || !canDn) return;
    
    if (isUp) do_up();
    else      do_down();
}

function hope_Up(): void {
    if (!canUp || !canDn) return;
    isUp = true;
    g_ctls.act('updn_ud_hpdn');

    if (g_team.get_z() > 0) {
        g_mvm.notice_message('登りますか？登る⇒ 〇 降りる ⇒ (↓キー) 移動しない ⇒ ✖');
    } else {
        g_mvm.notice_message('街に戻りますか？戻る⇒ 〇 降りる ⇒ (↓キー) 移動しない ⇒ ✖');
    };
}
function hope_Down(): void {
    if (!canUp || !canDn) return;
    isUp = false;
    g_ctls.act('updn_ud_hpup');

    g_mvm.notice_message('降りますか？降りる⇒ 〇 登る ⇒ (↑キー) 移動しない ⇒ ✖');
}

async function do_UD_save(): Promise<any|undefined> {
    set_g_save(
        /* save_id: */   -1,
        /* uniq_no: */   -1,
        /* title: */     '自動保存データ', 
        /* detail: */    '',
        /* point: */     
                    `『${g_maze.get_name()}』 ` 
                    + `地下 ${g_team.get_pd().z + 1}階層 ` 
                    + `(X: ${g_team.get_pd().x}, Y: ${g_team.get_pd().y})`,
        /* auto_mode: */ true,
    );
    return UD_save();
}

