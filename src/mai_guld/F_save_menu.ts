import { 
    hide_default_contrlles, 
    display_default_controlles, 
    hide_all_menu,
    high_light_on, 
    calc_cursor_pos_L,
    calc_cursor_pos_R,
    calc_cursor_pos_U,
    calc_cursor_pos_D
} from "./F_default_menu";

import { _ceil, _floor, _round } from "../common/F_Math";
import { C_SaveData }            from "../common/C_SaveData";
import { g_mvm, g_hres, g_pid }         from "./global_for_guild";
import { display_guild_menu }    from "./F_guild_menu";
import { general_save, get_save_info } from "../common/F_load_and_save";
import { g_mes, g_save }    from "../common/global";
import { C_UrlOpt } from "../common/C_UrlOpt";

let data_list: C_SaveData[];

let info_list: HTMLUListElement;
let info_list_col: number;
let idx:  number = 0;
let info_detail: {[key: string]: HTMLLIElement};

let mode = 'view';

export function hide_save_menu(): void {
    hide_default_contrlles({
        do_U: do_U,
        do_D: do_D,
        do_L: do_L,
        do_R: do_R,
        isOK: isOK,
        isNG: isNG,
        keyEvent: true,
    });

    const div = document.getElementById('gld_view_switch_save') as HTMLDivElement;
    if (div === null) return;
    div.style.display = 'none';
}

export function display_save_menu(): void {
    hide_all_menu();

    const div = document.getElementById('gld_view_switch_save') as HTMLDivElement;
    if (div === null) return;
    div.style.display = 'block';

    data_list = []; //data_list = update_data_list();

    /*
    if (data_list.length < 1) {
        document.getElementById('save_list')       ?.style.setProperty('display', 'none');
        document.getElementById('save_info_fields')?.style.setProperty('display', 'none');

        g_mvm.notice_message('現在、冒険の記録は有りません。戻る＝＞✖');
        display_default_controlles({
            do_U: do_U,
            do_D: do_D,
            do_L: do_L,
            do_R: do_R,
            isOK: isOK,
            isNG: isNG,
            keyEvent: true,
        });
        return;
    } else {
        document.getElementById('save_list')       ?.style.setProperty('display', 'block');
        document.getElementById('save_info_fields')?.style.setProperty('display', 'block');
    }
*/
    info_list = update_info_list() as HTMLUListElement;
    if (info_list === null) return;

    info_list_col = Number(window.getComputedStyle(info_list).columnCount); 

    var mode = 'view';

    const form = document.getElementById('save_info_detail') as HTMLUListElement;
    if (form === null) return;
    info_detail = init_info_detail(form);

    idx = 0;
    update_info_detail(idx);

    display_default_controlles({
        do_U: do_U,
        do_D: do_D,
        do_L: do_L,
        do_R: do_R,
        isOK: isOK,
        isNG: isNG,
        keyEvent: true,
    });
    display_default_message();
}

function update_all(): void {
    data_list = update_data_list();

    info_list = update_info_list() as HTMLUListElement;
    if (info_list === null) return;

    idx = 0;
    update_info_detail(idx);
}

function update_data_list(): C_SaveData[] {
    const jsonObj = get_save_info();
    try {
        if (jsonObj.save !== undefined) {
            const data_list = [];
            for (let save of jsonObj.save) {
                data_list.push((new C_SaveData()).decode(save));
            }
            return data_list;
        }
        g_mes.warning_message('saveプロパティが返ってきませんでした');
        return [];
    }
    catch (err) {
        g_mes.warning_message('不正なデータを受信しました');
        return [];
    }
}

function update_info_list(): HTMLUListElement|null {
    const info_list = document.getElementById('save_list') as HTMLUListElement;
    if (info_list === null) return null;

    while (info_list.firstChild !== null) {
        info_list.removeChild(info_list.firstChild);
    }

    for (let data of data_list) {
        const li = document.createElement('li') as HTMLLIElement;
        li.innerHTML = `${data.title}<p></p>`;
        info_list.appendChild(li);
    }

    for (let i = data_list.length; i < 20; i++) {
        const li = document.createElement('li') as HTMLLIElement;
        li.innerHTML = `新規保存<p></p>`;
        info_list.appendChild(li);
    }
    idx = 0;
    high_light_on(info_list, idx); 
    return info_list;
}

function init_info_detail(form: HTMLUListElement): {[key: string]: HTMLLIElement} {
    const  elm: {[key: string]: HTMLLIElement} = {};

    while (form.firstChild) form.removeChild(form.firstChild);
    append_elm(form, elm, 'title');
    append_elm(form, elm, 'detail');
    append_elm(form, elm, 'point');
    append_elm(form, elm, 'save_time');
    return elm;
}

function append_elm(form: HTMLUListElement, elm: {[key: string]: HTMLLIElement}, id: string): void {
    const li = document.createElement('li') as HTMLLIElement;
    li.id = 'save_detail' + id;
    elm[id] = li;
    form.appendChild(li);
}

function update_info_detail(idx: number) {
    if (idx < data_list.length) {
        info_detail['title']    .innerHTML = data_list[idx].title;
        info_detail['detail']   .innerHTML = data_list[idx].detail;
        info_detail['point']    .innerHTML = data_list[idx].point;
        info_detail['save_time'].innerHTML = data_list[idx].save_time.toLocaleString();
    } else {
        info_detail['title']    .innerHTML = '新規保存';
        info_detail['detail']   .innerHTML = ' ';
        info_detail['point']    .innerHTML = ' --- ';
        info_detail['save_time'].innerHTML = ' --- ';
    }
}

function do_U(): void {
    if (mode !== 'view') return;
    display_default_message();

    idx = calc_cursor_pos_U(idx, info_list.children.length, info_list_col);
    high_light_on(info_list, idx);  update_info_detail(idx); 
}
function do_D(): void {
    if (mode !== 'view') return;
    display_default_message();

    idx = calc_cursor_pos_D(idx, info_list.children.length, info_list_col);
    high_light_on(info_list, idx);  update_info_detail(idx);  
}
function do_L(): void {
    if (mode !== 'view') return;
    display_default_message();

    idx = calc_cursor_pos_L(idx, info_list.children.length, info_list_col);
    high_light_on(info_list, idx);  update_info_detail(idx);
}
function do_R(): void {
    if (mode !== 'view') return;
    display_default_message();

    idx = calc_cursor_pos_R(idx, info_list.children.length, info_list_col);
    high_light_on(info_list, idx);  update_info_detail(idx);
}

function isOK(): void { 
    switch (mode) {
        case 'view':
            mode = idx < data_list.length ? 'rewrite_OK' : 'write_OK';
            display_default_message();
            break;
        case 'write_OK':
            if (post_save_data()) {
                g_mvm.notice_message('新規保存しました!!');
                update_all();
            } else {
                g_mvm.warning_message('新規保存に失敗しました');
            }
            mode = 'view';
            break;
        case 'rewrite_OK':
            if (post_save_data()) {
                g_mvm.normal_message('上書き保存しました！');
                update_all();
            } else {
                g_mvm.warning_message('上書き保存に失敗しました');
            }
            mode = 'view';
            break;
    }
}

function post_save_data(): boolean {
    g_save.decode({
        player_id: g_pid[0],  
        title:     `保存済: ${new Date().toDateString()}`, // data_list[idx].title, 
        detail:    '冒険者登録',                       // data_list[idx].detail, 
        point:     '最初のギルド', 
        auto_mode: '0', 
        is_active: '1', 
        is_delete: '0', 
    });

    const  opt = new C_UrlOpt();
    const  jsonObj = general_save(opt);
    return false; // return jsonObj.ecode == 0;
}

function isNG(): void {
    switch (mode) {
        case 'view':
            g_mvm.clear_message();
            go_back_guild_menu();
            break;
        case 'write_OK':
        case 'rewrite_OK':
            mode = 'view';
            display_default_message();
            break;
    }
}

function display_default_message(): void {
    switch (mode) {
        case 'view':
            g_mvm.normal_message('どれに保存しますか？意思決定＝＞〇　メニューに戻る＝＞✖');
            break;
        case 'write_OK':
            g_mvm.notice_message('これに新規保存しますか？ＯＫ＝＞〇　やめる＝＞✖');
            break;
        case 'rewrite_OK':
            g_mvm.notice_message('過去のデータが消えます。上書きしますか？ＯＫ＝＞〇　やめる＝＞✖');
            break;
    }
}

function go_back_guild_menu() {
    display_guild_menu();
}
