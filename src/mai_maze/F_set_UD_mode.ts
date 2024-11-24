import { C_UrlOpt }                   from "../d_utl/C_UrlOpt";
import { UD_save, tmp_save }          from "../d_cmn/F_load_and_save";
import { POST_and_move_page }         from "../d_cmn/F_POST";
import { g_start_env, g_url, g_url_mai_guld } from "../d_cmn/global";

import { set_g_save } from "./F_set_save_mode";
import { act_move_mode, do_move_bottom_half } from "./F_set_move_mode";
import { 
    g_mvm, 
    g_maze, 
    g_team,
    g_ctls,
    g_vsw, 
}   from "./global_for_maze";


var canUp: boolean  =  false;
var canDn: boolean  =  false;

var isUp:  boolean  =  false;

const ctls_updn_up = {
    name: 'updn_up', 
//    do_U:  do_up,
    isOK:  do_up,
    isNG:  do_cancel,
}
const ctls_updn_dn = {
    name: 'updn_dn', 
//    do_D:  do_down,
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

export function init_UD_mode(): void {
    g_ctls.set(ctls_updn_up);
    g_ctls.set(ctls_updn_dn);
    g_ctls.set(ctls_updn_ud_hpup);
    g_ctls.set(ctls_updn_ud_hpdn);
}

export function act_Up_mode(): void {
    if (g_team.walk().get_z() > 0) {
        g_mvm.notice_message('上りテレポーターが有ります。登りますか？登る ⇒ 〇 登らない ⇒ ✖');
    } else {
        g_mvm.notice_message('街に戻りますか？戻る ⇒ 〇 戻らない ⇒ ✖');
    }

    canUp = true;
    canDn = false;
    g_ctls.act(ctls_updn_up);
    g_vsw.view(g_vsw.Move());
}

export function act_Dn_mode(): void {
    g_mvm.notice_message('下りテレポーターが有ります。降りますか？降りる ⇒ 〇 降りない ⇒ ✖');

    canUp = false;
    canDn = true;
    g_ctls.act(ctls_updn_dn);
    g_vsw.view(g_vsw.Move());
}

export function act_UD_mode(): void {
    g_mvm.notice_message('上下テレポーターが有ります。登りますか？登る⇒ 〇 降りる ⇒ (↓キー) 移動しない ⇒ ✖');

    canUp = true;
    canDn = true;
    if (!isUp)  g_ctls.act(ctls_updn_ud_hpup);
    else        g_ctls.act(ctls_updn_ud_hpdn);
    g_vsw.view(g_vsw.Move());
}

function do_cancel(): void {
    g_mvm.clear_message();
    act_move_mode();
}

function do_up(): void {
    const rslt = g_team.walk().hope_p_up();

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
        act_move_mode();
        do_move_bottom_half('blink_off');
    } else {
        do_UD_save().then(()=>{
            rslt.doOK();
            g_mvm.clear_message();
            act_move_mode();
            do_move_bottom_half('blink_off');
        });
    }
}

function do_down(): void {
    const rslt = g_team.walk().hope_p_down();
    if (!rslt.has_hope || !g_maze.within(rslt.subj)) {
        rslt.doNG();
        g_mvm.clear_message();
        act_move_mode();
        do_move_bottom_half('blink_off');
    } else {
        do_UD_save().then(()=>{
            rslt.doOK();
            g_mvm.clear_message();
            act_move_mode();
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
    g_ctls.act(ctls_updn_ud_hpdn);

    if (g_team.walk().get_z() > 0) {
        g_mvm.notice_message('登りますか？登る⇒ 〇 降りる ⇒ (↓キー) 移動しない ⇒ ✖');
    } else {
        g_mvm.notice_message('街に戻りますか？戻る⇒ 〇 降りる ⇒ (↓キー) 移動しない ⇒ ✖');
    };
}
function hope_Down(): void {
    if (!canUp || !canDn) return;
    isUp = false;
    g_ctls.act(ctls_updn_ud_hpup);

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
                    + `地下 ${g_team.walk().get_pd().z + 1}階層 ` 
                    + `(X: ${g_team.walk().get_pd().x}, Y: ${g_team.get_pd().y})`,
        /* auto_mode: */ true,
    );
    return UD_save();
}

