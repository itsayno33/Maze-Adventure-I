import { T_MakeEnumType }          from "../d_utl/T_MakeEnumType";
import { C_UrlOpt }                from "../d_utl/C_UrlOpt";
import { C_MovablePoint }          from "../d_mdl/C_MovablePoint";
import { C_MazeInfo }              from "../d_mdl/C_MazeInfo";
import { C_CtlCursor }             from "../d_ctl/C_CtlCursor";
import { POST_and_move_page }      from "../d_cmn/F_POST";
import { get_maze_info, tmp_save } from "../d_cmn/F_load_and_save";
import { _alert, g_save, g_start_env, g_url, g_url_mai_maze } from "../d_cmn/global";

import { act_guld_menu }           from "./F_guild_menu";
import { g_ctls, g_mvm, g_team, g_vsw }   from "./global_for_guild";

let dom_maze_fields : HTMLFieldSetElement;
let dom_maze_list:    HTMLUListElement;

let dom_mvpt_fields : HTMLFieldSetElement;
let dom_mvpt_list:    HTMLUListElement;

let maze_list: C_MazeInfo[];
let mvpt_list: C_MovablePoint[];

const T_List_mode: {[kind: string]: number}  = {
    Hide: 0,
    Maze: 1,
    MvPt: 2,
} as const;
type T_List_mode = T_MakeEnumType<typeof T_List_mode>;
let list_mode: T_List_mode;

type T_cursor = {mode: T_List_mode, crsr: C_CtlCursor}
let cursor: T_cursor; 
let cursor_hide: T_cursor;
let cursor_maze: T_cursor;
let cursor_mvpt: T_cursor;

let old_idx: number;

let mode    = 'view';

export function init_tomz_menu(): void { 
    init_all(); 
}

export function act_tomz_menu(): void { 
    update_all().then(()=>{
        if (!exist_hero()) { 
            hide_view_all(); 
            g_mvm.notice_message('出発の前にチームを編成してください'); 
            g_ctls.act(ctls_tomz_rtn); 
            return;
        } 
        g_vsw.view(g_vsw.ToMz());
        display_default_message();
        return;
    }); 
    return;
}
function exist_hero(): boolean {return g_team.hres().length > 0}


function init_all(): void {
    init_data();
    init_view();
    init_ctls();
}

async function update_all(): Promise<void> {
    return await update_data().then(()=>{
        update_view();
        update_ctls();
    });
}

/***********************
 * 
 * モデル関係
 * 
/***********************/
function init_data(): void {
    init_maze_list();
    init_mvpt_list(); 
}
async function update_data(): Promise<void> {
    return await update_maze_list().then(()=>{
        update_mvpt_list(); 
    }); 
}

function init_maze_list(): void {}

async function update_maze_list(): Promise<void> {
    return await get_maze_info().then((jsonObj:any)=>{
        maze_list = [];
        for (const json_mazeinfo of jsonObj) {
            maze_list.push(new C_MazeInfo(json_mazeinfo));
        }
    });
}
function exist_maze_list(): boolean {
    return maze_list.length > 0;
}

function init_mvpt_list(): void {}

function update_mvpt_list(): void {
    mvpt_list = [];
    for (const ii in g_save.all_mvpt) mvpt_list.push(g_save.all_mvpt[ii]); 
}
function exist_mvpt_list(): boolean {
    return mvpt_list.length > 0;
}


/***********************
 * 
 * ビュー関係
 * 
/***********************/
function init_view(): void {
    init_DOM_maze_list();
    init_DOM_mvpt_list();
}

function update_view(): void {
    update_DOM_maze_list();
    update_DOM_mvpt_list();
    show_view_all();
}

function clear_view() {
    hide_view_all();
    clear_DOM_maze_list();
    clear_DOM_mvpt_list();
}

function show_view_all(): boolean {
    hide_view_all();
    if (exist_maze_list()) dom_maze_fields.style.display = 'block';
    if (exist_mvpt_list()) dom_mvpt_fields.style.display = 'block';
    return true;
}
function hide_view_all(): boolean {
    dom_maze_fields.style.display = 'none';
    dom_mvpt_fields.style.display = 'none';
    return true;
}


// ******************************
// 迷宮入り口リスト表示　関係
// ******************************
function init_DOM_maze_list(): void {
    try {
        dom_maze_fields = document.getElementById('tomz_maze_fields') as HTMLFieldSetElement;
        dom_maze_list   = document.getElementById('maze_list')        as HTMLUListElement;
    } catch (err) {
        _alert('ID in not found; ' + err);
        return;
    }
    if (dom_maze_fields === null) return;
    if (dom_maze_list   === null) return;

    dom_maze_fields.style.display = 'none';
    return;
}
function update_DOM_maze_list(): void {
    clear_DOM_maze_list();
    if (!exist_maze_list()) {
        dom_maze_fields.style.display = 'none';
        return;
    }

    for (let ii in maze_list) {
        const li = document.createElement('li') as HTMLLIElement;
        li.innerHTML = `${maze_list[ii].mbname}<p>　💎レベル: ${maze_list[ii].lv} 「${maze_list[ii].size_x} × ${maze_list[ii].size_y}」${maze_list[ii].size_z}階層</p>`;

        li.id = ii.toString();
        li.addEventListener("click", _OK_maze_Fnc, false);
        dom_maze_list.appendChild(li);
    }
}
function _OK_maze_Fnc(this: HTMLLIElement, e: MouseEvent): void {
//    switch_cursor(T_List_mode.Maze);
    cursor.crsr.set_pos(Number(this.id)); 
    switch (mode) {
        case 'tomz_nor_maze': 
            isCK_maze();
            old_idx = cursor.crsr.pos();
            break;
        case 'tomz_jmp_maze':
            if (cursor.crsr.pos() === old_idx) isGO_maze();
            else {
                isCK_maze();
                old_idx = cursor.crsr.pos();
            }
            break;
        default:
            cursor.crsr.set_pos(Number(this.id)); 
            isSL_mvpt();
            isCK_maze();
            old_idx = cursor.crsr.pos();
            break;
    }
//    display_default_message();
}

function clear_DOM_maze_list(): void {
    while (dom_maze_list.firstChild !== null) {
        dom_maze_list.removeChild(dom_maze_list.firstChild);
    }
}


// ***********************************
// ワープ・ポイントのリスト表示　関係
// ***********************************
function init_DOM_mvpt_list(): void {
    try {
        dom_mvpt_fields = document.getElementById('tomz_mvpt_fields') as HTMLFieldSetElement;
        dom_mvpt_list   = document.getElementById('mvpt_list')        as HTMLUListElement;
    } catch (err) {
        _alert('ID in not found; ' + err);
        return;
    }
    if (dom_mvpt_fields === null) return;
    if (dom_mvpt_list   === null) return;

    dom_mvpt_fields.style.display = 'none';
}
function update_DOM_mvpt_list(): void {
    clear_DOM_mvpt_list();
    if (!exist_mvpt_list()) {
        dom_mvpt_fields.style.display = 'none';
        return;
    }

    for (let ii in mvpt_list) {
        const li = document.createElement('li') as HTMLLIElement;
        const pos = mvpt_list[ii].get_pd();
        li.innerHTML = `${mvpt_list[ii].get_name()}<p>　💎「${pos.x} , ${pos.y}」${pos.z + 1}階</p>`;

        li.id = ii.toString();
        li.addEventListener("click", _OK_mvpt_Fnc, false);
        dom_mvpt_list.appendChild(li);
    }
}
function _OK_mvpt_Fnc(this: HTMLLIElement, e: MouseEvent): void {
//    switch_cursor(T_List_mode.MvPt);
    cursor.crsr.set_pos(Number(this.id)); 
    switch (mode) {
        case 'tomz_nor_mvpt': 
            isCK_mvpt();
            old_idx = cursor.crsr.pos();
            break;
        case 'tomz_jmp_mvpt':
            if (cursor.crsr.pos() === old_idx) isGO_mvpt();
            else {
                isCK_mvpt();
                old_idx = cursor.crsr.pos();
            }
            break;
        default:
            cursor.crsr.set_pos(Number(this.id)); 
            isSL_maze();
            isCK_mvpt();
            old_idx = cursor.crsr.pos();
        }
//    display_default_message();
}

function clear_DOM_mvpt_list(): void {
    while (dom_mvpt_list.firstChild !== null) {
        dom_mvpt_list.removeChild(dom_mvpt_list.firstChild);
    }
}


/***********************
 * 
 * コントロール関係
 * 
/***********************/
function init_ctls(): void { 
    init_default_ctls(); 
    init_cursor(); 
}

function init_default_ctls(): boolean {
    try {
        if (!g_ctls.set(ctls_tomz_nor_maze))  return false;
        if (!g_ctls.set(ctls_tomz_nor_mvpt))  return false;
        if (!g_ctls.set(ctls_tomz_jmp_maze))  return false;
        if (!g_ctls.set(ctls_tomz_jmp_mvpt))  return false;
        if (!g_ctls.set(ctls_tomz_rtn))       return false;
    } catch (err) {
        return false;
    }
    return true;
}
const ctls_tomz_rtn = {
    name: 'tomz_rtn', 
    isOK:  isRT,
    isNG:  isRT,
    isRT:  isRT,
    cpRT:  isRT,
}
const ctls_tomz_nor_maze = {
    name: 'tomz_nor_maze', 
    do_U:  do_U,
    do_D:  do_D,
    do_R:  isSL_maze,
    isOK:  isCK_maze,
    isNG:  isRT,
    isSL:  isSL_maze,
    isRT:  isRT,
    cpSL:  isSL_maze,
    cpRT:  isRT,
} 
const ctls_tomz_nor_mvpt = {
    name: 'tomz_nor_mvpt', 
    do_U:  do_U,
    do_D:  do_D,
    do_L:  isSL_mvpt,
    isOK:  isCK_mvpt,
    isNG:  isRT,
    isSL:  isSL_mvpt,
    isRT:  isRT,
    cpSL:  isSL_mvpt,
    cpRT:  isRT,
}
const ctls_tomz_jmp_maze = {
    name: 'tomz_jmp_maze', 
    isOK:  isGO_maze,
    isNG:  isNG_maze,
    isRT:  isRT,
    cpOK:  isGO_maze,
    cpNG:  isNG_maze,
}
const ctls_tomz_jmp_mvpt = {
    name: 'tomz_jmp_mvpt', 
    isOK:  isGO_mvpt,
    isNG:  isNG_mvpt,
    isRT:  isRT,
    cpOK:  isGO_mvpt,
    cpNG:  isNG_mvpt,
}

function init_cursor(): boolean { 
    cursor_hide = {mode: T_List_mode.Hide, crsr: C_CtlCursor.getObj(undefined)}; 
    cursor_maze = {mode: T_List_mode.Maze, crsr: C_CtlCursor.getObj(dom_maze_list)}; 
    cursor_mvpt = {mode: T_List_mode.MvPt, crsr: C_CtlCursor.getObj(dom_mvpt_list)}; 
    old_idx     = 999;
    return true;
} 


function update_ctls(): void { 
    reset_cursor(); 
    start_cursor(); 
    switch_cursor(cursor.mode); 
}

function reset_cursor(): void {
    reset_cursor_maze();
    reset_cursor_mvpt();
}
function reset_cursor_maze(): void {
    const pos = cursor_maze.crsr.pos();
    cursor_maze.crsr.set(dom_maze_list).set_pos(pos).high_light_off();
}
function reset_cursor_mvpt(): void {
    const pos = cursor_mvpt.crsr.pos();
    cursor_mvpt.crsr.set(dom_mvpt_list).set_pos(pos).high_light_off();
}

function start_cursor(): boolean { 
    if (exist_maze_list()) { 
        mode = 'tomz_nor_maze';
        list_mode = T_List_mode.Maze;
        cursor  = cursor_maze; 
    }
    else if (exist_mvpt_list()) { 
        mode = 'tomz_nor_mvpt';
        list_mode = T_List_mode.MvPt;
        cursor  = cursor_mvpt; 
    }
    else { 
        mode = 'nop';
        list_mode = T_List_mode.Hide;
        cursor  = cursor_hide; 
    } 
    cursor.crsr.set_pos(0).high_light_on();
    return true;
}


// **********************************
// リスト表示の切り替え関係
// **********************************

function switch_cursor(sview: T_List_mode): boolean {
    switch (sview) {
        case T_List_mode.Maze: switch_cursor_to_maze();return true;
        case T_List_mode.MvPt: switch_cursor_to_mvpt();return true;
    }
    return false;
} 

function switch_cursor_to_maze(): void {
    if (!exist_maze_list()) return;
    cursor_maze.crsr.high_light_on();
    cursor_mvpt.crsr.high_light_off();

    cursor  = cursor_maze;
    g_ctls.act(ctls_tomz_nor_maze);
    dom_maze_fields.style.display = 'block';
}

function switch_cursor_to_mvpt(): void {
    if (!exist_mvpt_list()) return;
    cursor_maze.crsr.high_light_off();
    cursor_mvpt.crsr.high_light_on();

    cursor  = cursor_mvpt;
    g_ctls.act(ctls_tomz_nor_mvpt);
    dom_mvpt_fields.style.display = 'block';
}

// カーソルの移動と決定・解除
function do_U(): void {
    display_default_message();
    cursor.crsr.pos_U();
}
function do_D(): void {
    display_default_message();
    cursor.crsr.pos_D();
}

// **************************************
// 決定ボタン・キャンセルボタン・切替ボタン
// **************************************

function isCK_maze(): void {
    mode = 'tomz_jmp_maze';
    g_ctls.act(ctls_tomz_jmp_maze);
    display_default_message();
}

function isCK_mvpt(): void {
    mode = 'tomz_jmp_mvpt';
    g_ctls.act(ctls_tomz_jmp_mvpt);
    display_default_message();
}


function isGO_maze(): void {
    tmp_save().then(()=>{
        const opt = new C_UrlOpt();
        opt.set('mode', 'start');
        opt.set('pid',   g_start_env.pid);
        opt.set('opt',   maze_list[cursor.crsr.pos()].name);

        POST_and_move_page(g_url[g_url_mai_maze], opt);
    });
}

function isGO_mvpt(): void {
    const loc = mvpt_list[cursor.crsr.pos()];
    g_team.set_loc(loc);
    g_save.mypos = loc;
    delete g_save.all_mvpt[loc.uid()];

    tmp_save().then(()=>{
        const opt = new C_UrlOpt();
        opt.set('mode', 'mvpt');
        opt.set('pid',   g_start_env.pid);
        opt.set('opt',   '');

        POST_and_move_page(mvpt_list[cursor.crsr.pos()].url(), opt);
    });
}


function isNG_maze(): void {
    mode = 'tomz_nor_maze';
    g_ctls.act(ctls_tomz_nor_maze);

    list_mode = T_List_mode.Maze;
    switch_cursor(list_mode);

    display_default_message();
}

function isNG_mvpt(): void {
    mode = 'tomz_nor_mvpt';
    g_ctls.act(ctls_tomz_nor_mvpt);

    list_mode = T_List_mode.MvPt;
    switch_cursor(list_mode);

    display_default_message();
}

function isSL_maze(): void {
    if (!exist_mvpt_list()) return;

    mode = 'tomz_nor_mvpt';
    g_ctls.act(ctls_tomz_nor_mvpt);

    list_mode = T_List_mode.MvPt;
    switch_cursor(list_mode);

    display_default_message();
}

function isSL_mvpt(): void {
    if (!exist_maze_list()) return;

    mode = 'tomz_nor_maze';
    g_ctls.act(ctls_tomz_nor_maze);

    list_mode = T_List_mode.Maze;
    switch_cursor(list_mode);

    display_default_message();
}


function isRT(): void {
    g_mvm.clear_message();
    go_back_guld_menu();
}

function go_back_guld_menu() {
    clear_view();
    g_ctls.deact();
    act_guld_menu();
}

function display_default_message(): void {
    switch (mode) {
        case 'tomz_nor_maze':
            g_mvm.normal_message('どの迷宮に潜りますか？　切替キー: ジャンプ・ポイント');
            break;
        case 'tomz_jmp_maze':
            g_mvm.notice_message('この迷宮に潜ります');
            break;
        case 'tomz_nor_mvpt':
            g_mvm.normal_message('どのポイントにジャンプしますか？　切替キー: 迷宮入り口');
            break;
        case 'tomz_jmp_mvpt':
            g_mvm.notice_message('このポイントにジャンプします');
            break;
        default: 
            g_mvm.normal_message('');
            break;
    }
}
