import { C_Hero } from './../common/C_Hero';
import { 
    rmv_default_ctls, 
    add_default_ctls, 
    hide_all_menu,
    high_light_on, 
    calc_cursor_pos_L,
    calc_cursor_pos_R,
    calc_cursor_pos_U,
    calc_cursor_pos_D,
    rmv_all_ctls
} from "./F_default_menu";

import { display_guld_menu }     from "./F_guild_menu";
import { _ceil, _floor, _round } from "../common/F_Math";
import { C_UrlOpt }              from "../common/C_UrlOpt";
import { C_SaveData }            from "../common/C_SaveData";
import { general_load, general_save, get_save_info }     from "../common/F_load_and_save";
import { g_hres, g_mvm, g_save, g_maze, g_team, g_guld } from "./global_for_guild";
import { g_pid, g_mes }  from "../common/global";

let data_list:  {[uniq_no: number]:C_SaveData};

let info_list: HTMLUListElement;
let info_list_cols: number;
let idx:  number = 0;
let info_detail: {[key: string]: HTMLLIElement};

let mode = 'view';

let is_save:boolean;


let dom_view_switch : HTMLDivElement;
let dom_info_fields : HTMLFieldSetElement;
let dom_info_detail : HTMLUListElement;

export function rmv_svld_ctls(): void {
    _rmv_svld_nor_ctls();
    _rmv_svld_rtn_ctls();
    _rmv_svld_chk_ctls();
}

export function display_load_menu(): void {
    is_save = false;

    dom_view_switch = document.getElementById('gld_view_switch_load') as HTMLDivElement;
    dom_info_detail = document.getElementById('load_info_detail') as HTMLUListElement;
    dom_info_fields = document.getElementById('load_info_fields') as HTMLFieldSetElement;
    info_list       = document.getElementById('load_list')        as HTMLUListElement;

    _display_SL_menu();
}
export function display_save_menu(): void {
    is_save = true;

    dom_view_switch = document.getElementById('gld_view_switch_save') as HTMLDivElement;
    dom_info_detail = document.getElementById('save_info_detail') as HTMLUListElement;
    dom_info_fields = document.getElementById('save_info_fields') as HTMLFieldSetElement;
    info_list       = document.getElementById('save_list')        as HTMLUListElement;

    _display_SL_menu();
}
async function _display_SL_menu(): Promise<void> {
    hide_all_menu();

    if (dom_view_switch === null) {display_guld_menu();return;}
    if (dom_info_detail === null) {display_guld_menu();return;}
    if (dom_info_fields === null) {display_guld_menu();return;}
    if (info_list       === null) {display_guld_menu();return;}

    dom_view_switch.style.display = 'block';

    get_info_list_cols();

    await init_all();
    await update_all();

    if (!is_save && Object.keys(data_list).length < 1) {
        info_list.style.display = 'none';
        dom_info_fields.style.display = 'none';

        g_mvm.notice_message('現在、冒険の記録は有りません。戻る＝＞✖');
        _add_svld_rtn_ctls();
    } else {
        info_list.style.display = 'block';
        dom_info_fields.style.display = 'block';
        _add_svld_nor_ctls();
    }
    display_default_message();
}

function get_info_list_cols(): number {
    let __col   = window.getComputedStyle(info_list).columnCount !== '' 
                ? window.getComputedStyle(info_list).columnCount
                : '1';
 
    info_list_cols = Number(__col); 
    return info_list_cols;
}

async function init_all() {
    mode = 'view';
    await init_data_list();
    init_view();
}

async function update_all(): Promise<void> {
    idx = 0;
    await update_data_list();
    update_view(idx);
}

async function init_data_list() {}

async function update_data_list(): Promise<void> {
        await get_save_info().then((jsonObj:any) => {
            try {
                if (jsonObj.save_info !== undefined) {
                    data_list = [];
                    for (let save_info of jsonObj.save_info) {
                        const s = new C_SaveData();
                        s.decode(save_info);
                        data_list[s.uniq_no] = s;
                    }
                    return;
                }
                g_mes.warning_message('saveプロパティが返ってきませんでした');
                return;
            }
            catch (err) {
                g_mes.warning_message('不正なデータを受信しました');
                return;
            }
        });
        return;
}


function init_view() {
    init_info_list();
    init_info_detail();
}
function update_view(idx: number) {
    update_info_list();
    update_info_detail(idx);
}
function clear_view() {
    clear_info_list();
    clear_info_detail();
}

function init_info_list() {
    clear_info_list();
}

function update_info_list(): void {
    clear_info_list();
    for (let i = 0; i < 20; i++) {
        const li = document.createElement('li') as HTMLLIElement;
        li.innerHTML = (i in data_list) ? `${data_list[i].title}<p></p>` : `新規保存 #${i.toString().padStart(2,'0')}<p></p>`;

        li.id = i.toString();
        li.addEventListener("click",_OK_Fnc, false);
        info_list.appendChild(li);
    }

    high_light_on(info_list, idx); 
    return;
}
let old_idx:number;
function _OK_Fnc(this: HTMLLIElement, e: MouseEvent): void {
    idx = Number(this.id); 
    high_light_on(info_list, idx); 
    update_info_detail(idx);

    if (idx === old_idx) isOK();
    else {
        if (mode !== 'view') mode = 'view';
        old_idx = idx;
    }
    display_default_message();
}

function clear_info_list() {
    while (info_list.firstChild !== null) {
        info_list.removeChild(info_list.firstChild);
    }
    idx = 0; old_idx=999; 
}

function init_info_detail(): void {
    info_detail = {};

    clear_info_detail();
    _append_elm('title');
    _append_elm('detail');
    _append_elm('point');
    _append_elm('save_time');
    return;
}
function _append_elm(id: string): void {
    const li = document.createElement('li') as HTMLLIElement;
    li.id = 'SL_detail' + id;

    info_detail[id] = li;
    dom_info_detail.appendChild(li);
}

function update_info_detail(idx: number) {
    if (idx in data_list) {
        info_detail['title']    .innerHTML = data_list[idx].title;
        info_detail['detail']   .innerHTML = data_list[idx].detail;
        info_detail['point']    .innerHTML = data_list[idx].point;
        info_detail['save_time'].innerHTML = data_list[idx].save_time.toLocaleString();
    } else {
        info_detail['title']    .innerHTML = `新規保存: #${idx.toString().padStart(2, '0')}`;
        info_detail['detail']   .innerHTML = ' ';
        info_detail['point']    .innerHTML = ' --- ';
        info_detail['save_time'].innerHTML = ' --- ';
    }
}

function clear_info_detail() {
    for (let elm in info_detail) {
        delete info_detail[elm];
    }
    while (dom_info_detail.firstChild !== null) {
        dom_info_detail.removeChild(dom_info_detail.firstChild);
    }
}

function do_U(): void {
    if (mode !== 'view') return;
    display_default_message();

    idx = calc_cursor_pos_U(idx, info_list.children.length, info_list_cols);
    high_light_on(info_list, idx);  update_info_detail(idx); 
}
function do_D(): void {
    if (mode !== 'view') return;
    display_default_message();

    idx = calc_cursor_pos_D(idx, info_list.children.length, info_list_cols);
    high_light_on(info_list, idx);  update_info_detail(idx);  
}
function do_L(): void {
    if (mode !== 'view') return;
    display_default_message();

    idx = calc_cursor_pos_L(idx, info_list.children.length, info_list_cols);
    high_light_on(info_list, idx);  update_info_detail(idx);
}
function do_R(): void {
    if (mode !== 'view') return;
    display_default_message();

    idx = calc_cursor_pos_R(idx, info_list.children.length, info_list_cols);
    high_light_on(info_list, idx);  update_info_detail(idx);
}

function isOK(): void { 
    is_save ? _isOK_for_save() : _isOK_for_load()
}
async function _isOK_for_load(): Promise<void> { 
    switch (mode) {
        case 'view':
            if (idx in data_list) {
                mode = 'read_OK';
                display_default_message();
            } else {
                g_mvm.notice_message('保存されていない項目です。戻る＝＞✖');
                _add_svld_chk_ctls();
            }
            break;
        case 'read_OK':
            await post_load_data().then(result => {
                if (result) {
                    g_mvm.notice_message('読み込みました!!');
                } else {
                    g_mvm.warning_message('読み込みに失敗しました');
                }
                mode = 'view';
            });
            break;
    }
}
async function _isOK_for_save(): Promise<void> { 
    switch (mode) {
        case 'view':
            mode = idx in data_list ? 'rewrite_OK' : 'write_OK';
            display_default_message();
            break;
        case 'write_OK':
            await post_save_data().then(result => {
                if (result) {
                    g_mvm.notice_message('新規保存しました!!');
                    update_all();
                } else {
                    g_mvm.warning_message('新規保存に失敗しました');
                }
                mode = 'view';
            });
            break;
        case 'rewrite_OK':
            await post_save_data().then(result => {
                if (result) {
                    g_mvm.notice_message('上書き保存しました！');
                    update_all();
                } else {
                    g_mvm.warning_message('上書き保存に失敗しました');
                }
                mode = 'view';
            });
            break;
    }
}

async function post_load_data(): Promise<boolean> { 
    g_save.decode({
        player_id:  g_pid[0],  
        uniq_no:    idx, 
        save_id:    data_list[idx].save_id, 
        title:      data_list[idx].title, 
        detail:     data_list[idx].detail, 
        point:      data_list[idx].point, 
        auto_mode:  data_list[idx].auto_mode ? '1' : '0', 
        is_active:  data_list[idx].is_active ? '1' : '0', 
        is_delete:  data_list[idx].is_delete ? '1' : '0', 
    });
    const save_data = JSON.stringify(g_save.encode(), null, "\t");

    const  opt = new C_UrlOpt();
    opt.set('pid',         g_pid[0]); 
    opt.set('save',        save_data);
    return general_load(opt, jsonObj=>{
    })
    .then(async(jsonObj:any)=>{
        g_save.decode(jsonObj.save);
        g_team[0] = g_save.all_team[0];
        g_maze[0] = g_save.all_maze[0];
        g_guld[0] = g_save.all_guld[0];

        g_hres.length = 0;
        for (let hero of g_save.all_guld[0].heroes) g_hres.push(hero);
        return jsonObj.ecode == 0;
    })
    .then(async (YN:boolean)=>{
        await update_all();
        return YN;
    }); 
}

async function post_save_data(): Promise<boolean> { 
    g_save.decode({
        player_id:  g_pid[0],  
        uniq_no:    idx, 
//        save_id:    data_list[idx].save_id, 
        title:     `保存済: #${idx.toString().padStart(2, '0')}`,  // data_list[idx].title, 
        detail:    '冒険者情報',                    // data_list[idx].detail, 
        point:     '最初のギルド', 
        team_name: '最初のギルド',
        auto_mode: '0', 
        is_active: '1', 
        is_delete: '0', 
    });
    const save_data = JSON.stringify(g_save.encode(), null, "\t");

    const  opt = new C_UrlOpt();
    opt.set('pid',         g_pid[0]); 
    opt.set('save',        save_data);
    return await general_save(opt).then((jsonObj:any)=>{return jsonObj.ecode == 0}); 
}

function isNG(): void {
    is_save ? _isNG_for_save() : _isNG_for_load();
}
function _isNG_for_load(): void {
    switch (mode) {
        case 'view':
            g_mvm.clear_message();
            go_back_guld_menu();
            break;
        case 'read_OK':
            mode = 'view';
            display_default_message();
            break;
    }
}
function _isNG_for_save(): void {
    switch (mode) {
        case 'view':
            g_mvm.clear_message();
            go_back_guld_menu();
            break;
        case 'write_OK':
        case 'rewrite_OK':
            mode = 'view';
            display_default_message();
            break;
    }
}

function display_default_message(): void {
    is_save ? _display_default_message_for_save() : _display_default_message_for_load();
}
function _display_default_message_for_load(): void {
    switch (mode) {
        case 'view':
            g_mvm.normal_message('どれを読み込みますか？意思決定＝＞〇　メニューに戻る＝＞✖');
            break;
        case 'read_OK':
            g_mvm.normal_message('これでいいですか？ＯＫ＝＞〇　やめる＝＞✖');
            break;
    }
}
function _display_default_message_for_save(): void {
    switch (mode) {
        case 'view':
            g_mvm.normal_message('どれに保存しますか？意思決定＝＞〇　メニューに戻る＝＞✖');
            break;
        case 'write_OK':
            g_mvm.normal_message('これに新規保存しますか？ＯＫ＝＞〇　やめる＝＞✖');
            break;
        case 'rewrite_OK':
            g_mvm.notice_message('過去のデータが消えます。上書きしますか？ＯＫ＝＞〇　やめる＝＞✖');
            break;
    }
}


function go_back_guld_menu_for_first(): void {
    rmv_all_ctls();
    display_guld_menu();
}

function go_back_guld_menu(): void {
    clear_view();
    go_back_guld_menu_for_first();
}



const _svld_nor_ctls = {
    name: 'svld', 
    do_U:  do_U,
    do_D:  do_D,
    do_L:  do_L,
    do_R:  do_R,
    isOK:  isOK,
    isNG:  isNG,
    keyEvent: true,
}
function _rmv_svld_nor_ctls(): void {
    rmv_default_ctls(_svld_nor_ctls);
}
function _add_svld_nor_ctls(): void {
    rmv_all_ctls();
    add_default_ctls(_svld_nor_ctls);
}

const _svld_rtn_ctls = {
    name: 'svld_rtn', 
    isNG:  go_back_guld_menu_for_first,
    keyEvent: true,
}
function _rmv_svld_rtn_ctls(): void {
    rmv_default_ctls(_svld_rtn_ctls);
}
function _add_svld_rtn_ctls(): void {
    rmv_all_ctls();
    add_default_ctls(_svld_rtn_ctls);
}

const _svld_chk_ctls = {
    name: 'svld_chk', 
    isOK:  _do_check,
    isNG:  _do_check,
    keyEvent: true,
}
function _rmv_svld_chk_ctls(): void {
    rmv_default_ctls(_svld_chk_ctls);
}
function _add_svld_chk_ctls(): void {
    rmv_all_ctls();
    add_default_ctls(_svld_chk_ctls);
}
function _do_check(): void {
    g_mvm.clear_message();
    _add_svld_nor_ctls();
}
