import { C_CtlCursor }         from "../d_ctl/C_CtlCursor";
import { C_CtlTableRowCursor } from "../d_ctl/C_CtlTableRowCursor";
import { I_Hero }              from "../d_mdl/C_Hero";
import { I_MazeObj }           from "../d_mdl/C_MazeObj";
import { I_Wndr }              from "../d_mdl/C_Wndr";
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

let TECS_mode: 'Team' | 'Enmy' | 'Cmmd' | 'Slct' = 'Team';
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

    g_cvm.clear_message();
    TECS_mode = 'Team';
    //idx = 0;
    //ccr_team_list.set_pos(idx);
    g_ctls.act(ctls_bttl_nor);
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
            dom.nmlv.textContent =  hero.name() 
                                 + '<br />'
                                 +  hero.get_abi_p_now('lv').toString();

            dom.acst.textContent = '　不明　'
                                 + '<br />'
                                 +  hero.is_alive()? '　正常　' : '戦闘不能';
            dom.hpmp.textContent = (hero.get_abi_p_now('xp') - hero.get_abi_p_now('xd')).toString() + ' / ' 
                                 +  hero.get_abi_p_now('xp').toString()
                                 + '<br />'
                                 + (hero.get_abi_p_now('xp') - hero.get_abi_p_now('xd')).toString() + ' / ' 
                                 +  hero.get_abi_p_now('xp').toString();
        } else {
            dom.nmlv.textContent = '';
            dom.acst.textContent = '';
            dom.hpmp.textContent = '';
        }

    }
}
function update_enmy_view(): void {
    for (let i = 0; i < Wndr_max; i++) {
        const wndr = mdl_enmy_list[i];
        const dom  = dom_enmy_list[i];
        if (wndr !== undefined) {
            dom.nmlv.textContent =  wndr.name() 
                                 + '<br />'
                                 +  wndr.get_abi_p_now('lv').toString();

            dom.acst.textContent = '　不明　'
                                 + '<br />'
                                 +  wndr.is_alive()? '　正常　' : '戦闘不能';
            dom.hpmp.textContent = (wndr.get_abi_p_now('xp') - wndr.get_abi_p_now('xd')).toString() + ' / ' 
                                 +  wndr.get_abi_p_now('xp').toString()
                                 + '<br />'
                                 + (wndr.get_abi_p_now('xp') - wndr.get_abi_p_now('xd')).toString() + ' / ' 
                                 +  wndr.get_abi_p_now('xp').toString();
        } else {
            dom.nmlv.textContent = '';
            dom.acst.textContent = '';
            dom.hpmp.textContent = '';
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
    } catch(err) {
        alert('Error: ' + err);
    }
};

function update_ctls(): void {}

const ctls_bttl_nor = {
    name: 'menu_nor', 
    do_U:  do_U,
    do_D:  do_D,
    isOK:  isOK,
    isNG:  isNG,
    isRT:  isNG,
    cpRT:  isNG,
}

function do_U(): void {}
function do_D(): void {}
function do_L(): void {}
function do_R(): void {}
function isOK(): void {}
function isNG(): void {
    // 敵オブジェを迷宮からもメモリからも消去
    g_maze.rmv_obj(enmy_obje?? undefined);
    enmy_obje?.free();
    enmy_obje = undefined;

    // 戦闘モードを終了して移動モードに戻る
    g_cvm.clear_message();
    act_move_mode();
    do_move_bottom_half('blink_off');
}

