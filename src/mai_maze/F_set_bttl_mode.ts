import { C_CtlCursor } from "../d_ctl/C_CtlCursor";
import { C_Hero } from "../d_mdl/C_Hero";
import { C_Wndr } from "../d_mdl/C_Wndr";
import { act_move_mode, do_move_bottom_half } from "./F_set_move_mode";
import { g_ctls, g_cvm, g_vsw } from "./global_for_maze";

let mdl_team_list: C_Hero[];
let dom_team_list: HTMLUListElement;
let ccr_team_list: C_CtlCursor;

let mdl_enmy_list: C_Wndr[];
let dom_enmy_list: HTMLUListElement;
let ccr_enmy_list: C_CtlCursor;

let mdl_cmmd_list: string[];
let dom_cmmd_list: HTMLUListElement;
let ccr_cmmd_list: C_CtlCursor;

let mdl_slct_list: string[];
let dom_slct_list: HTMLUListElement;
let ccr_slct_list: C_CtlCursor;

let idx:   number   =   0;


export function init_bttl_mode(): void {
    init_data();
    init_view();
    init_ctls();
}

export function act_bttl_mode(): void {
    idx = 0;
    //ccr_team_list.set_pos(idx);
    g_ctls.act(ctls_bttl_nor);
    g_vsw.view(g_vsw.Bttl()); 
}

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
    g_cvm.clear_message();
    act_move_mode();
    do_move_bottom_half('blink_off');
}

function init_data(): void{};

function init_view(): void{
    try {
        dom_team_list = document.getElementById('bttl_team_ul') as HTMLUListElement;
        dom_enmy_list = document.getElementById('bttl_enmy_ul') as HTMLUListElement;
        dom_cmmd_list = document.getElementById('bttl_cmmd_ul') as HTMLUListElement;
        dom_slct_list = document.getElementById('bttl_slct_ul') as HTMLUListElement;

        ccr_team_list = C_CtlCursor.getObj(dom_team_list);
        ccr_enmy_list = C_CtlCursor.getObj(dom_enmy_list);
        ccr_cmmd_list = C_CtlCursor.getObj(dom_cmmd_list);
        ccr_slct_list = C_CtlCursor.getObj(dom_slct_list);
    } catch(err) {
        alert('Error: ' + err);
    }
};

function init_ctls(): void{};


