import { C_CtlCursor }         from "../d_ctl/C_CtlCursor";
import { C_CtlTableRowCursor } from "../d_ctl/C_CtlTableRowCursor";
import { I_Hero }              from "../d_mdl/C_Hero";
import { I_MazeObj }           from "../d_mdl/C_MazeObj";
import { I_Wndr }              from "../d_mdl/C_Wndr";
import { _json_alert, _json_to_str } from "../d_utl/F_Utility";
import { act_move_mode, do_move_bottom_half }   from "./F_set_move_mode";
import { g_ctls, g_cvm, g_maze, g_team, g_vsw } from "./global_for_maze";

//type T_TableCol = 'nmlv' | 'acst' | 'hpmp';

let mdl_team_list: (I_Hero|undefined)[];
let dom_team_list: {[key: string]: HTMLTableCellElement}[];
let tby_team_list: HTMLTableSectionElement;
let ccr_team_list: C_CtlTableRowCursor;

let mdl_enmy_list: (I_Wndr|undefined)[];
let dom_enmy_list: {[key: string]: HTMLTableCellElement}[];
let tby_enmy_list: HTMLTableSectionElement;
let ccr_enmy_list: C_CtlTableRowCursor;

let mdl_cmmd_list: string[];
let dom_cmmd_list: HTMLUListElement;
let ccr_cmmd_list: C_CtlCursor;

let mdl_slct_list: string[];
let dom_slct_list: HTMLUListElement;
let ccr_slct_list: C_CtlCursor;

let TECS_mode: 'Team' | 'Enmy' | 'Cmmd' | 'Slct' | 'Chek' = 'Team';
let idx:   number   =   0;

const Hero_max: number = 4;
const Wndr_max: number = 4;

let enmy_obje: I_MazeObj|undefined = undefined;

export function init_bttl_mode(): void {
    init_all();
}

export function act_bttl_mode(obje: I_MazeObj|undefined): void {
    if (obje === undefined || obje.wres() === undefined || (obje.wres()?.length??0) < 1) return;

    enmy_obje = obje;

    set_team_data(g_team.hres());
    set_enmy_data(obje.wres()??[]);
    update_all();

    go_team_mode();

    g_ctls.act(ctls_bttl_team);
    g_vsw.view(g_vsw.Bttl()); 
}


// 仲間データをセット
// 将来的にはここでフォーメーション(2行3列)もセット
function set_team_data(hres: I_Hero[]): void {
    mdl_team_list = hres;
}

// 敵データをセット
// 将来的にはここでフォーメーション(2行3列)もセット
function set_enmy_data(wres: I_Wndr[]): void {
    mdl_enmy_list = wres;
}


function init_all(): void {
    init_data();
    init_view();
    init_ctls();
}

function update_all(): void {
    update_data();
    update_view(); 
    update_ctls();
}


/*
 * モデル関係
 */

function init_data(): void{
    init_team_data();
    init_enmy_data();
    init_cmmd_data();
    init_slct_data();
};

function init_team_data(): void {
    mdl_team_list = [];
    for (let i = 0; i < Hero_max; i++) {
        mdl_team_list.push(undefined);
    }
}

function init_enmy_data(): void {
    mdl_enmy_list = [];
    for (let i = 0; i < Wndr_max; i++) {
        mdl_enmy_list.push(undefined);
    }
}

function init_cmmd_data(): void {}
function init_slct_data(): void {}

function update_data(): void {
    update_team_data();
    update_enmy_data();
    update_cmmd_data();
    update_slct_data();
};

function update_team_data(): void {}
function update_enmy_data(): void {}
function update_cmmd_data(): void {}
function update_slct_data(): void {}



/*　
 * 画面関係
 */

function init_view(): void{
    init_team_view();
    init_enmy_view();
    init_cmmd_view();
    init_slct_view();
};

const TableCol:string[] = ['nmlv' , 'acst' , 'hpmp'];

function init_team_view(): void {
    dom_team_list = [];
    for (let i = 0; i < Hero_max; i++) {
        const tr = document.getElementById(`bttl_team_tr${i}`) as HTMLTableRowElement;
        if (tr === null)  continue;

        dom_team_list[i] = {};
        for (const col of TableCol) {
            const td = document.getElementById(`bttl_team_tr${i}_${col}`) as HTMLTableCellElement;
            if (td === null)  continue;
            dom_team_list[i][col] = td;
        }
    }
}

function init_enmy_view(): void {
    dom_enmy_list = [];
    for (let i = 0; i < Wndr_max; i++) {
        const tr = document.getElementById(`bttl_enmy_tr${i}`) as HTMLTableRowElement;
        if (tr === null)  continue;

        dom_enmy_list[i] = {};
        for (const col of TableCol) {
            const td = document.getElementById(`bttl_enmy_tr${i}_${col}`) as HTMLTableCellElement;
            if (td === null)  continue;
            dom_enmy_list[i][col] = td;
        }
    }
}

function init_cmmd_view(): void {}
function init_slct_view(): void {}

function update_view(): void {
    update_team_view();
    update_enmy_view();
    update_cmmd_view();
    update_slct_view();
};

function update_team_view(): void {
    for (let i = 0; i < Hero_max; i++) {
        const hero = mdl_team_list[i];
        const dom  = dom_team_list[i];
        if (hero !== undefined) {
            dom.nmlv.innerHTML =  hero.name() 
                               + '<br />'
                               + 'Lv：'
                               + '　物理：'
                               + (hero?.get_abi_p_now('lv')??'???').toString()
                               + '　魔法：'
                               + (hero?.get_abi_m_now('lv')??'???').toString();

            dom.acst.innerHTML = '　待機　'
                               + '<br />'
                               + (hero.is_alive() ? '　正常　' : '戦闘不能');

            dom.hpmp.innerHTML = 'ＨＰ：'
                               + (hero.get_abi_p_now('xp') - hero.get_abi_p_now('xd')).toString() + ' / ' 
                               +  hero.get_abi_p_now('xp').toString()
                               + '<br />'
                               + 'ＭＰ：'
                               + (hero.get_abi_m_now('xp') - hero.get_abi_m_now('xd')).toString() + ' / ' 
                               +  hero.get_abi_m_now('xp').toString();
        } else {
            dom.nmlv.innerHTML = '';
            dom.acst.innerHTML = '';
            dom.hpmp.innerHTML = '';
        }

    }
}
function update_enmy_view(): void {
    for (let i = 0; i < Wndr_max; i++) {
        const wndr = mdl_enmy_list[i];
        const dom  = dom_enmy_list[i];
        if (wndr !== undefined) {
            dom.nmlv.innerHTML =  wndr.name() 
                               + '<br />'
                               + 'Lv：'
                               + '　物理：'
                               + (wndr?.get_abi_p_now('lv')??'???').toString()
                               + '　魔法：'
                               + (wndr?.get_abi_m_now('lv')??'???').toString();

            dom.acst.innerHTML = '　待機　'
                               + '<br />'
                               + (wndr.is_alive() ? '　正常　' : '戦闘不能');

            dom.hpmp.innerHTML = 'ＨＰ：'
                               + (wndr.get_abi_p_now('xp') - wndr.get_abi_p_now('xd')).toString() + ' / ' 
                               +  wndr.get_abi_p_now('xp')?.toString()
                               + '<br />'
                               + 'ＭＰ：'
                               + (wndr.get_abi_m_now('xp') - wndr.get_abi_m_now('xd')).toString() + ' / ' 
                               +  wndr.get_abi_m_now('xp')?.toString();
        } else {
            dom.nmlv.innerHTML = '';
            dom.acst.innerHTML = '';
            dom.hpmp.innerHTML = '';
        }

    }
}
function update_cmmd_view(): void {}
function update_slct_view(): void {}

/*
 * コントロール関係
 */

function init_ctls(): void{
    try {
        tby_team_list = document.getElementById('bttl_team_body') as HTMLTableSectionElement;
        tby_enmy_list = document.getElementById('bttl_enmy_body') as HTMLTableSectionElement;
        dom_cmmd_list = document.getElementById('bttl_cmmd_ul')   as HTMLUListElement;
        dom_slct_list = document.getElementById('bttl_slct_ul')   as HTMLUListElement;

        ccr_team_list = C_CtlTableRowCursor.getObj(tby_team_list);
        ccr_enmy_list = C_CtlTableRowCursor.getObj(tby_enmy_list);
        ccr_cmmd_list = C_CtlCursor.getObj(dom_cmmd_list);
        ccr_slct_list = C_CtlCursor.getObj(dom_slct_list);

        ccr_team_list.act();
        ccr_enmy_list.dact();
        ccr_cmmd_list.dact();
        ccr_slct_list.dact();

        g_ctls.set(ctls_bttl_nor);
        g_ctls.set(ctls_bttl_team);
        g_ctls.set(ctls_bttl_cmmd);
        g_ctls.set(ctls_bttl_slct);
        g_ctls.set(ctls_bttl_enmy);
        
    } catch(err) {
        alert('Error: ' + err);
    }
};

function update_ctls(): void {}

function do_U_team(): void {
    idx = ccr_team_list.pos_U();
}
function do_U_cmmd(): void {
    idx = ccr_cmmd_list.pos_U();
}
function do_U_slct(): void {
    idx = ccr_slct_list.pos_U();
}
function do_U_enmy(): void {
    idx = ccr_enmy_list.pos_U();
}

function do_L_slct(): void {
    idx = ccr_slct_list.pos_L();
}
function do_R_slct(): void {
    idx = ccr_slct_list.pos_R();
}


function do_D_team(): void {
    idx = ccr_team_list.pos_D();
}
function do_D_cmmd(): void {
    idx = ccr_cmmd_list.pos_D();
}
function do_D_slct(): void {
    idx = ccr_slct_list.pos_D();
}
function do_D_enmy(): void {
    idx = ccr_enmy_list.pos_D();
}


function isOK_team(): void {
    go_cmmd_mode();
}
function isOK_cmmd(): void {
    go_slct_mode();
}
function isOK_slct(): void {
    go_enmy_mode();
}
function isOK_enmy(): void {
    go_chek_mode();
}
function isOK_chek(): void {
    go_team_mode();
}


function isRT(): void {
    // 敵オブジェを迷宮からもメモリからも消去
    //g_maze.rmv_obj(enmy_obje?? undefined); //テスト中なので仮にコメントアウト
    //enmy_obje?.free();
    //enmy_obje = undefined;

    // 戦闘モードを終了して移動モードに戻る
    g_cvm.clear_message();
    act_move_mode();
    do_move_bottom_half('blink_off');
}
function isRT_team(): void {isRT();}
function isRT_cmmd(): void {go_team_mode();}
function isRT_slct(): void {go_cmmd_mode();}
function isRT_enmy(): void {go_slct_mode();}
function isRT_chek(): void {go_enmy_mode();}



function go_team_mode(): void {
    TECS_mode = 'Team';
    display_message();
    ccr_team_list.act();
    ccr_cmmd_list.dact();
    ccr_slct_list.dact();
    ccr_enmy_list.dact();
    g_ctls.act(ctls_bttl_team);
}

function go_cmmd_mode(): void {
    TECS_mode = 'Cmmd';
    display_message();
    ccr_team_list.act();
    ccr_cmmd_list.act();
    ccr_slct_list.dact();
    ccr_enmy_list.dact();
    g_ctls.act(ctls_bttl_cmmd);
}

function go_slct_mode(): void {
    TECS_mode = 'Slct';
    display_message();
    ccr_team_list.act();
    ccr_cmmd_list.act();
    ccr_slct_list.act();
    ccr_enmy_list.dact();
    g_ctls.act(ctls_bttl_slct);
}

function go_enmy_mode(): void {
    TECS_mode = 'Enmy';
    display_message();
    ccr_team_list.act();
    ccr_cmmd_list.act();
    ccr_slct_list.act();
    ccr_enmy_list.act();
    g_ctls.act(ctls_bttl_enmy);
}

function go_chek_mode(): void {
    TECS_mode = 'Chek';
    display_message();
    ccr_team_list.act();
    ccr_cmmd_list.act();
    ccr_slct_list.act();
    ccr_enmy_list.act();
    g_ctls.act(ctls_bttl_nor);
}


const ctls_bttl_nor = {
    name: 'bttl_nor', 
    isNG:  isRT,
    cpNG:  isRT,
    isRT:  isRT,
    cpRT:  isRT,
}

const ctls_bttl_team = {
    name: 'bttl_team', 
    do_U:  do_U_team,
    do_D:  do_D_team,
    isOK:  isOK_team,
    cpOK:  isOK_team,
    isNG:  isRT_team,
    cpNG:  isRT_team,
    isRT:  isRT_team,
    cpRT:  isRT_team,
}

const ctls_bttl_cmmd = {
    name: 'bttl_cmmd', 
    do_U:  do_U_cmmd,
    do_D:  do_D_cmmd,
    isOK:  isOK_cmmd,
    cpOK:  isOK_cmmd,
    isNG:  isRT_cmmd,
    cpNG:  isRT_cmmd,
    isRT:  isRT_cmmd,
    cpRT:  isRT_cmmd,
}

const ctls_bttl_slct = {
    name: 'bttl_slct', 
    do_U:  do_U_slct,
    do_D:  do_D_slct,
    do_L:  do_L_slct,
    do_R:  do_R_slct,
    isOK:  isOK_slct,
    cpOK:  isOK_slct,
    isNG:  isRT_slct,
    cpNG:  isRT_slct,
    isRT:  isRT_slct,
    cpRT:  isRT_slct,
}

const ctls_bttl_enmy = {
    name: 'bttl_enmy', 
    do_U:  do_U_enmy,
    do_D:  do_D_enmy,
    isOK:  isOK_enmy,
    cpOK:  isOK_enmy,
    isNG:  isRT_enmy,
    cpNG:  isRT_enmy,
    isRT:  isRT_enmy,
    cpRT:  isRT_enmy,
}

const ctls_bttl_chek = {
    name: 'bttl_chek', 
    isOK:  isOK_chek,
    cpOK:  isOK_chek,
    isNG:  isRT_chek,
    cpNG:  isRT_chek,
    isRT:  isRT_chek,
    cpRT:  isRT_chek,
}


function display_message(): void {
    let msg = '';
    switch (TECS_mode) {
        case 'Team': msg = '仲間を選択してください'; break;
        case 'Enmy': msg = '敵を選択してください'; break;
        case 'Cmmd': msg = 'コマンドを選択してください'; break;
        case 'Slct': msg = '選択肢を選んでください'; break;
        case 'Chek': msg = 'これでいいですか？'; break;
        default:     msg = '不明なモードです';
    }
    g_cvm.notice_message(msg);
}