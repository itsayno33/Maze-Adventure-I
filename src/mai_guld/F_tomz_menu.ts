import { T_MakeEnumType }        from "../common/T_MakeEnumType";
import { C_MovablePoint }        from "../common/C_MovablePoint";
import { get_maze_info, tmp_save }         from "../common/F_load_and_save";
import { C_MazeInfo }            from "../common/C_MazeInfo";
import { _alert, g_save, g_start_env, g_url, g_url_get_maze }        from "../common/global";
import { 
    calc_cursor_pos_U, 
    calc_cursor_pos_D, 
    calc_cursor_pos_L, 
    calc_cursor_pos_R, 
    hide_all_menu, 
    high_light_on 
} from "./F_default_menu";
import { display_guld_menu }     from "./F_guild_menu";
import { g_ctls, g_mvm, g_team } from "./global_for_guild";
import { C_UrlOpt }              from "../common/C_UrlOpt";
import { POST_and_move_page } from "../common/F_POST";

let dom_view_switch : HTMLDivElement;

let dom_maze_fields : HTMLFieldSetElement;
let dom_maze_list:    HTMLUListElement;

let dom_mvpt_fields : HTMLFieldSetElement;
let dom_mvpt_list:    HTMLUListElement;

let maze_list: C_MazeInfo[];
let mvpt_list: C_MovablePoint[];

let maze_list_cols: number;
let mvpt_list_cols: number;

const T_List_mode: {[kind: string]: number}  = {
    Hide: 0,
    Maze: 1,
    MvPt: 2,
} as const;
type T_List_mode = T_MakeEnumType<typeof T_List_mode>;
let list_mode: T_List_mode;

type T_cursor = {mode: T_List_mode, idx: number}
let cursor: T_cursor; 
let cursor_hide: T_cursor;
let cursor_maze: T_cursor;
let cursor_mvpt: T_cursor;

let mode    = 'view';

export function display_tomz_menu(): void { 
    hide_all_menu(); 
    init_all().then(()=>{
        update_all(); 
        if (!exist_hero()) { 
            subview_hide_all(); 
            g_mvm.notice_message('出発の前にチームを編成してください'); 
            g_ctls.act('tomz_rtn'); 
            display_guld_menu(); 
            return;
        } 
    }); 
    return;
}
function exist_hero(): boolean {return g_team.hres().length > 0}


async function init_all(): Promise<void> {
    return await init_data().then(()=>{
        init_view();
        init_ctls();
    }); 
}

function update_all(): void {
    update_data();
    update_view();
}

/***********************
 * 
 * モデル関係
 * 
/***********************/
async function init_data(): Promise<void> {
    return await init_maze_list().then(()=>{
        init_mvpt_list(); 
    }); 
}
function update_data(): void {
    update_maze_list();
    update_mvpt_list();
}

async function init_maze_list(): Promise<void> {
    return await get_maze_info().then((jsonObj:any)=>{
        maze_list = [];
        for (const json_mazeinfo of jsonObj) {
//            alert_mazeinfo_info(json_mazeinfo);
            maze_list.push(new C_MazeInfo(json_mazeinfo));
        }
    });
}
function update_maze_list(): void {}
function exist_maze_list(): boolean {
    return maze_list.length > 0;
}

function init_mvpt_list(): void {
    mvpt_list = [];
    for (const ii in g_save.all_mvpt) mvpt_list.push(g_save.all_mvpt[ii]); 
}
function update_mvpt_list(): void {}
function exist_mvpt_list(): boolean {
    return mvpt_list.length > 0;
}


/***********************
 * 
 * ビュー関係
 * 
/***********************/
function init_view(): void {
    init_dom_view_tomz();
    init_DOM_maze_list();
    init_DOM_mvpt_list();
}
function update_view(): void {
    update_dom_view_tomz();
    update_DOM_maze_list();
    update_DOM_mvpt_list();
}
function clear_view() {
    clear_dom_view_tomz();
    clear_dom_maze_list();
    clear_dom_mvpt_list();
}


// ******************************
// 全体表示　関係
// ******************************

function init_dom_view_tomz(): boolean {

    try {
        dom_view_switch = document.getElementById('gld_view_switch_tomz') as HTMLDivElement;
    } catch (err) {
        return false;
    }
    if (dom_view_switch === null) return false;

    clear_dom_view_tomz(); 
    return true;
}
function update_dom_view_tomz(): void {
    dom_view_switch.style.display = 'block'; 
}
function clear_dom_view_tomz(): void {
    dom_view_switch.style.display = 'none'; 
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
    clear_dom_maze_list();
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
    list_high_light_on();
    dom_maze_fields.style.display = 'block';
}
function _OK_maze_Fnc(this: HTMLLIElement, e: MouseEvent): void {
    switch_cursor(T_List_mode.Maze);
    cursor.idx  = Number(this.id); 

    list_high_light_on(); 
    isCK_maze();
//    display_default_message();
}

function clear_dom_maze_list(): void {
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
    clear_dom_mvpt_list();
    if (!exist_mvpt_list()) {
        dom_mvpt_fields.style.display = 'none';
        return;
    }

    for (let ii in mvpt_list) {
        const li = document.createElement('li') as HTMLLIElement;
        const pos = mvpt_list[ii].get_pd();
        li.innerHTML = `${mvpt_list[ii].get_name()}<p>　💎「${pos.x} , ${pos.y}」${pos.z}階層</p>`;

        li.id = ii.toString();
        li.addEventListener("click", _OK_mvpt_Fnc, false);
        dom_mvpt_list.appendChild(li);
    }
    list_high_light_on();
    dom_mvpt_fields.style.display = 'block';
}
function _OK_mvpt_Fnc(this: HTMLLIElement, e: MouseEvent): void {
    switch_cursor(T_List_mode.MvPt);
    cursor.idx  = Number(this.id); 

    list_high_light_on(); 
    isCK_mvpt();
//    display_default_message();
}

function clear_dom_mvpt_list(): void {
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
    get_dom_list_cols(); 
    subview_show_all(); 
    switch_cursor(cursor.mode); 
}

function init_default_ctls(): boolean {
    try {
        if (!g_ctls.add('tomz_nor_maze',  ctls_tomz_nor_maze))  return false;
        if (!g_ctls.add('tomz_nor_mvpt',  ctls_tomz_nor_mvpt))  return false;
        if (!g_ctls.add('tomz_jmp_maze',  ctls_tomz_jmp_maze))  return false;
        if (!g_ctls.add('tomz_jmp_mvpt',  ctls_tomz_jmp_mvpt))  return false;
        if (!g_ctls.add('tomz_rtn',       ctls_tomz_rtn))  return false;
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
    isOK:  isCK_maze,
    isNG:  isRT,
    isSL:  isSL_maze,
    isRT:  isRT,
    cpOK:  isCK_maze,
    cpSL:  isSL_maze,
    cpRT:  isRT,
} 
const ctls_tomz_nor_mvpt = {
    name: 'tomz_nor_mvpt', 
    do_U:  do_U,
    do_D:  do_D,
    isOK:  isCK_mvpt,
    isNG:  isRT,
    isSL:  isSL_mvpt,
    isRT:  isRT,
    cpOK:  isCK_mvpt,
    cpSL:  isSL_mvpt,
    cpRT:  isRT,
}
const ctls_tomz_jmp_maze = {
    name: 'tomz_jmp_maze', 
    isOK:  isGO_maze,
    isNG:  isNG_maze,
    isRT:  isRT,
    cpOK:  isGO_maze,
}
const ctls_tomz_jmp_mvpt = {
    name: 'tomz_jmp_mvpt', 
    isOK:  isGO_mvpt,
    isNG:  isNG_mvpt,
    isRT:  isRT,
    cpOK:  isGO_mvpt,
}

function init_cursor(): boolean { 
    cursor_hide = {mode: T_List_mode.Hide, idx: 0}; 
    cursor_maze = {mode: T_List_mode.Maze, idx: 0}; 
    cursor_mvpt = {mode: T_List_mode.MvPt, idx: 0}; 

    if (exist_maze_list()) { 
        mode = 'tomz_nor_maze';
        list_mode = T_List_mode.Maze;
        cursor  = cursor_maze; 
    }
    else if (exist_mvpt_list()) { 
        mode = 'tomz_nor_mvpt';
        list_mode = T_List_mode.MvPt;
        cursor  = cursor_maze; 
    }
    else { 
        mode = 'nop';
        list_mode = T_List_mode.Hide;
        cursor  = cursor_hide; 
    } 
    return true;
}


// **************************************************************
// 各サブ・リスト表示の列数をCSSから取得する(カーソル移動制御に使用)
// **************************************************************

function get_dom_list_cols(): boolean {
    maze_list_cols = _get_dom_list_cols(dom_maze_list);
    mvpt_list_cols = _get_dom_list_cols(dom_mvpt_list);
    return true;
}
function _get_dom_list_cols(dom_list: HTMLUListElement): number {
    let __col   = window.getComputedStyle(dom_list).columnCount !== '' 
                ? window.getComputedStyle(dom_list).columnCount
                : '1';

    return Number(__col);
}

// **********************************
// リスト表示の切り替え関係
// **********************************

function subview_show_all(): boolean {
    subview_hide_all();
    if (exist_maze_list()) dom_maze_fields.style.display = 'block';
    if (exist_mvpt_list()) dom_mvpt_fields.style.display = 'block';
    return true;
}
function subview_hide_all(): boolean {
    dom_maze_fields.style.display = 'none';
    dom_mvpt_fields.style.display = 'none';
    return true;
}

function switch_cursor(sview: T_List_mode): boolean {
    switch (sview) {
        case T_List_mode.Maze: switch_cursor_to_maze();return true;
        case T_List_mode.MvPt: switch_cursor_to_mvpt();return true;
    }
    return false;
} 

function switch_cursor_to_maze(): void {
    if (!exist_maze_list()) return;
    cursor  = cursor_maze;
    update_view();
    g_ctls.act('tomz_nor_maze');
    dom_maze_fields.style.display = 'block';
}

function switch_cursor_to_mvpt(): void {
    if (!exist_mvpt_list()) return;
    cursor  = cursor_mvpt;
    update_view();
    g_ctls.act('tomz_nor_mvpt');
    dom_mvpt_fields.style.display = 'block';
}
    

// 選択されている行のハイライト表示(暫定)
// cursorが切り替わったときにバグる状態
function list_high_light_on() {
    switch (cursor.mode) {
        case T_List_mode.Maze:
            high_light_on(dom_maze_list, cursor.idx);
            break; 
        case T_List_mode.MvPt:
            high_light_on(dom_mvpt_list, cursor.idx);
            break; 
    }
}


// カーソルの移動と決定・解除
function do_U(): void {
    display_default_message();

    cursor.idx = calc_list_cursor_pos_U();
    list_high_light_on(); 
}
function do_D(): void {
    display_default_message();

    cursor.idx = calc_list_cursor_pos_D();
    list_high_light_on(); 
}
function do_L(): void {
    display_default_message();

    cursor.idx = calc_list_cursor_pos_L();
    list_high_light_on(); 
}
function do_R(): void {
    display_default_message();

    cursor.idx = calc_list_cursor_pos_R();
    list_high_light_on(); 
}

// カーソル位置の計算
function calc_list_cursor_pos_U(): number {
    const list_length = _calc_list_length();
    const list_cols   = _calc_list_cols();
    return calc_cursor_pos_U(cursor.idx, list_length, list_cols);
}

function calc_list_cursor_pos_D(): number {
    const list_length = _calc_list_length();
    const list_cols   = _calc_list_cols();
    return calc_cursor_pos_D(cursor.idx, list_length, list_cols);
}

function calc_list_cursor_pos_L(): number {
    const list_length = _calc_list_length();
    const list_cols   = _calc_list_cols();
    return calc_cursor_pos_L(cursor.idx, list_length, list_cols);
}

function calc_list_cursor_pos_R(): number {
    const list_length = _calc_list_length();
    const list_cols   = _calc_list_cols();
    return calc_cursor_pos_R(cursor.idx, list_length, list_cols);
}

function _calc_list_length(): number {
    switch (cursor.mode) {
        case T_List_mode.Maze:
            return dom_maze_list.children.length;
        case T_List_mode.MvPt:
            return dom_mvpt_list.children.length;
    }
    return 0;
}

function _calc_list_cols(): number {
    switch (cursor.mode) {
        case T_List_mode.Maze:
            return maze_list_cols;
        case T_List_mode.MvPt:
            return mvpt_list_cols;
    }
    return 0;
}


// **************************************
// 決定ボタン・キャンセルボタン・切替ボタン
// **************************************

function isCK_maze(): void {
    mode = 'tomz_jmp_maze';
    g_ctls.act(mode);
    display_default_message();
}

function isCK_mvpt(): void {
    mode = 'tomz_jmp_mvpt';
    g_ctls.act(mode);
    display_default_message();
}


function isGO_maze(): void {
    tmp_save().then(()=>{
        const opt = new C_UrlOpt();
        opt.set('mode',     'start');
        opt.set('pid',       g_start_env.pid);
        opt.set('maze_name', maze_list[cursor.idx].name);

        POST_and_move_page(g_url[g_url_get_maze], opt);
    });
}

function isGO_mvpt(): void {
    const loc = mvpt_list[cursor.idx];
    g_team.set_loc(loc);
    g_save.mypos = loc;
    delete g_save.all_mvpt[loc.uid()];

    tmp_save().then(()=>{
        const opt = new C_UrlOpt();
        opt.set('mode', 'mvpt');
        opt.set('pid',  g_start_env.pid);
        opt.set('mvpt', mvpt_list[cursor.idx].toJSON());

        POST_and_move_page(mvpt_list[cursor.idx].url(), opt);
    });
}


function isNG_maze(): void {
    mode = 'tomz_nor_maze';
    g_ctls.act(mode);

    list_mode = T_List_mode.Maze;
    switch_cursor(list_mode);

    display_default_message();
}

function isNG_mvpt(): void {
    mode = 'tomz_nor_mvpt';
    g_ctls.act(mode);

    list_mode = T_List_mode.MvPt;
    switch_cursor(list_mode);

    display_default_message();
}

function isSL_maze(): void {
    if (!exist_mvpt_list()) return;

    mode = 'tomz_nor_mvpt';
    g_ctls.act(mode);

    list_mode = T_List_mode.MvPt;
    switch_cursor(list_mode);

    display_default_message();
}

function isSL_mvpt(): void {
    if (!exist_maze_list()) return;

    mode = 'tomz_nor_maze';
    g_ctls.act(mode);

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
    display_guld_menu();
}

function display_default_message(): void {
    switch (mode) {
        case 'tomz_nor_maze':
            g_mvm.normal_message('どの迷宮に潜りますか？　切り替えキー: ジャンプ・ポイント');
            break;
        case 'tomz_jmp_maze':
            g_mvm.normal_message('この迷宮に潜ります');
            break;
        case 'tomz_nor_mvpt':
            g_mvm.normal_message('どのポイントにジャンプしますか？　切り替えキー: 迷宮入り口');
            break;
        case 'tomz_jmp_mvpt':
            g_mvm.normal_message('このポイントにジャンプします');
            break;
        default: 
            g_mvm.normal_message('');
            break;
    }
}
