import { 
    rmv_default_ctls, 
    add_default_ctls, 
    hide_all_menu,
    high_light_on, 
    calc_cursor_pos_L,
    calc_cursor_pos_R,
    calc_cursor_pos_U,
    calc_cursor_pos_D
} from "./F_default_menu";

import { _ceil, _floor, _round } from "../common/F_Math";
import { C_UrlOpt }              from "../common/C_UrlOpt";
import { C_SaveData }            from "../common/C_SaveData";
import { general_load, general_save, get_save_info } from "../common/F_load_and_save";
import { g_mvm }                 from "./global_for_guild";
import { display_guld_menu }     from "./F_guild_menu";
import { g_pid, g_mes, g_save }  from "../common/global";

let data_list:  {[uniq_no: number]:C_SaveData};

let info_list: HTMLUListElement;
let info_list_cols: number;
let idx:  number = 0;
let info_detail: {[key: string]: HTMLLIElement};

let mode = 'view';

let is_save:boolean;


let dom_view_switch_SL : HTMLDivElement;
let dom_SL_info_fields : HTMLFieldSetElement;
let dom_SL_info_detail : HTMLUListElement;

export function rmv_svld_ctls(): void {
    rmv_default_ctls({
        name: 'svld', 
        do_U:  do_U,
        do_D:  do_D,
        do_L:  do_L,
        do_R:  do_R,
        isOK:  isOK,
        isNG:  isNG,
        keyEvent: true,
    });
}


export function display_load_menu(): void {
    is_save = false;


    dom_view_switch_SL = document.getElementById('gld_view_switch_load') as HTMLDivElement;
    dom_SL_info_detail = document.getElementById('load_info_detail') as HTMLUListElement;
    dom_SL_info_fields = document.getElementById('load_info_fields') as HTMLFieldSetElement;
    info_list          = document.getElementById('load_list')        as HTMLUListElement;

    if (dom_view_switch_SL === null) return;
    if (dom_SL_info_detail === null) return;
    if (dom_SL_info_fields === null) return;
    if (info_list          === null) return;

    _display_SL_menu();
}
export function display_save_menu(): void {
    is_save = true;

    dom_view_switch_SL = document.getElementById('gld_view_switch_save') as HTMLDivElement;
    dom_SL_info_detail = document.getElementById('save_info_detail') as HTMLUListElement;
    dom_SL_info_fields = document.getElementById('save_info_fields') as HTMLFieldSetElement;
    info_list          = document.getElementById('save_list')        as HTMLUListElement;

    if (dom_view_switch_SL === null) return;
    if (dom_SL_info_detail === null) return;
    if (dom_SL_info_fields === null) return;
    if (info_list          === null) return;

    _display_SL_menu();
}
async function _display_SL_menu(): Promise<void> {
    hide_all_menu();

    dom_view_switch_SL.style.display = 'block';

    get_info_list_cols();
    init_info_detail();
    update_all();

    /*
    if (!is_save && Object.keys(data_list).length < 1) {
        info_list.style.display = 'none';
        dom_SL_info_fields.style.display = 'none';

        g_mvm.notice_message('現在、冒険の記録は有りません。戻る＝＞✖');
        display_default_controlles({
            name: 'svld', 
            do_U:  do_U,
            do_D:  do_D,
            do_L:  do_L,
            do_R:  do_R,
            isOK:  isOK,
            isNG:  isNG,
            keyEvent: true,
        });
        var mode = 'view';
        return;
    } else {
        info_list.style.display = 'block';
        dom_SL_info_fields.style.display = 'block';
    }
*/

    add_default_ctls({
        name: 'svld', 
        do_U:  do_U,
        do_D:  do_D,
        do_L:  do_L,
        do_R:  do_R,
        isOK:  isOK,
        isNG:  isNG,
        keyEvent: true,
    });

    var mode = 'view';
    display_default_message();
}

function get_info_list_cols(): number {
    let __col   = window.getComputedStyle(info_list).columnCount !== '' 
                ? window.getComputedStyle(info_list).columnCount
                : '1';
 
    info_list_cols = Number(__col); 
    return info_list_cols;
}

async function update_all(): Promise<void> {
    idx = 0;
    await update_data_list();
    update_info_list();
    update_info_detail(idx);
}

async function update_data_list(): Promise<void> {
        await get_save_info().then((jsonObj:any) => {
            try {
                if (jsonObj.save !== undefined) {
                    data_list = [];
                    for (let save of jsonObj.save) {
                        const s = new C_SaveData();
                        s.decode(save);
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

function update_info_list(): void {
    clear_info_list();
    for (let i = 0; i < 20; i++) {
        const li = document.createElement('li') as HTMLLIElement;
        li.innerHTML = (i in data_list) ? `${data_list[i].title}<p></p>` : `新規保存 #${i.toString().padStart(2,'0')}<p></p>`;

        info_list.appendChild(li);
    }

    idx = 0;
    high_light_on(info_list, idx); 
    return;
}

function clear_info_list() {
    while (info_list.firstChild !== null) {
        info_list.removeChild(info_list.firstChild);
    }
}

function clear_info_detail() {
    for (let elm in info_detail) {
        delete info_detail[elm];
    }
    while (dom_SL_info_detail.firstChild !== null) {
        dom_SL_info_detail.removeChild(dom_SL_info_detail.firstChild);
    }
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
    dom_SL_info_detail.appendChild(li);
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
function _isOK_for_load(): void { 
    switch (mode) {
        case 'view':
            if (idx in data_list) {
                mode = 'read_OK';
                display_default_message();
            } else {
                g_mvm.notice_message('保存されていない項目です。戻る＝＞✖');
            }
            break;
        case 'read_OK':
            post_load_data().then(result => {
                if (result) {
                    g_mvm.notice_message('読み込みました!!');
                    update_all();
                } else {
                    g_mvm.warning_message('読み込みに失敗しました');
                }
                mode = 'view';
            });
            break;
    }
}
function _isOK_for_save(): void { 
    switch (mode) {
        case 'view':
            mode = idx in data_list ? 'rewrite_OK' : 'write_OK';
            display_default_message();
            break;
        case 'write_OK':
            post_save_data().then(result => {
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
            post_save_data().then(result => {
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
        title:      data_list[idx].title, 
        detail:     data_list[idx].detail, 
        point:      data_list[idx].point, 
        auto_mode:  data_list[idx].auto_mode ? '1' : '0', 
        is_active:  data_list[idx].is_active ? '1' : '0', 
        is_delete:  data_list[idx].is_delete ? '1' : '0', 
    });

    const  opt = new C_UrlOpt();
    return await general_load(opt).then((jsonObj:any)=>{return jsonObj.ecode == 0}); 
}

async function post_save_data(): Promise<boolean> { 
    g_save.decode({
        player_id:  g_pid[0],  
        uniq_no:    idx, 
        title:     `保存済: #${idx.toString().padStart(2, '0')}`,  // data_list[idx].title, 
        detail:    '冒険者情報',                    // data_list[idx].detail, 
        point:     '最初のギルド', 
        auto_mode: '0', 
        is_active: '1', 
        is_delete: '0', 
    });

    const  opt = new C_UrlOpt();
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

function go_back_guld_menu() {
    clear_info_list();
    clear_info_detail();

    rmv_svld_ctls();
    display_guld_menu();
}
