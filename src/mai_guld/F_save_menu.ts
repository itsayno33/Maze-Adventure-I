import { 
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
import { C_SaveData, I_JSON_Uniq, alert_save_info }   from "../common/C_SaveData";
import { general_load, general_save, get_save_info }  from "../common/F_load_and_save";
import { _alert, g_mes, g_my_url, g_start_env }       from "../common/global";

import { 
    g_mvm, g_save, g_team, g_guld, g_ctls, 
    g_all_maze, g_all_team, g_all_guld, g_all_mvpt 
} 
from "./global_for_guild";

import { alert_team_info }    from "../common/C_Team";
import { alert_guld_info }    from "../common/C_Guild";
import { C_MovablePoint }     from "../common/C_MovablePoint";
import { POST_and_move_page } from "../common/F_POST";


let data_list:  {[uniq_no: number]:C_SaveData};

let info_list: HTMLUListElement;
let info_list_cols: number;
let dom_idx:  number = 0;
let info_detail: {[key: string]: HTMLLIElement};

let mode = 'view';

let is_save:boolean;

let dom_to_uno: {[id: number]: number};


let dom_view_switch : HTMLDivElement;
let dom_info_fields : HTMLFieldSetElement;
let dom_info_detail : HTMLUListElement;

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
        g_ctls.act('svld_rtn');
    } else {
        info_list.style.display = 'block';
        dom_info_fields.style.display = 'block';
        g_ctls.act('svld_nor');
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
    init_ctls();
}

async function update_all(): Promise<void> {
    dom_idx = 0;
    await update_data_list().then(()=>{
        update_view(dom_idx);
    });
}

async function init_data_list() {}

async function update_data_list(): Promise<void> {
        await get_save_info().then((jsonObj:any) => {
            try {
                if (jsonObj.save_info !== undefined) {
                    data_list = {};
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
function update_view(dom_idx: number) {
    update_info_list();
    update_info_detail(dom_idx);
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

    dom_to_uno = {};
    if (!is_save) {
        let DOM_idx = 0;
        for (let key in data_list) {
            const uno = Number(key);

            const li = document.createElement('li') as HTMLLIElement;
            li.innerHTML = `${data_list[uno].title}<p></p>`;
    
            li.id = uno.toString();
            li.addEventListener("click",_OK_Fnc, false);
            info_list.appendChild(li);
            dom_to_uno[DOM_idx++] = uno;
        }
    } else {
        for (let uno = 0; uno < 20; uno++) {
            const li = document.createElement('li') as HTMLLIElement;
            if (uno in data_list) {
                li.innerHTML = `${data_list[uno].title}<p></p>`;
            } else {
                li.innerHTML =  `新規保存 #${uno.toString().padStart(2,'0')}<p></p>`;
            } 
            li.id = uno.toString();
            li.addEventListener("click",_OK_Fnc, false);
            info_list.appendChild(li);
            dom_to_uno[uno] = uno;
        }
    }

    high_light_on(info_list, dom_idx); 
    return;
}
let old_dom_idx:number;
function _OK_Fnc(this: HTMLLIElement, e: MouseEvent): void {
    dom_idx = Number(this.id); 
    high_light_on(info_list, dom_idx); 
    update_info_detail(dom_idx);

    if (dom_idx === old_dom_idx) isOK();
    else {
        if (mode !== 'view') mode = 'view';
        old_dom_idx = dom_idx;
    }
    display_default_message();
}

function clear_info_list() {
    while (info_list.firstChild !== null) {
        info_list.removeChild(info_list.firstChild);
    }
    dom_idx = 0; old_dom_idx=999; 
}

function init_info_detail(): void {
    info_detail = {};

    clear_info_detail();
    _append_elm('title');
    _append_elm('point');
    _append_elm('detail');
    _append_elm('save_time');
    return;
}
function _append_elm(id: string): void {
    const li = document.createElement('li') as HTMLLIElement;
    li.id = 'SL_detail' + id;

    info_detail[id] = li;
    dom_info_detail.appendChild(li);
}

function update_info_detail(dom_idx: number) {
    const uno = dom_to_uno[dom_idx];

    if (uno in data_list) {
        info_detail['title']    .innerHTML = data_list[uno].title;
        info_detail['detail']   .innerHTML = data_list[uno].detail;
        info_detail['point']    .innerHTML = data_list[uno].point;
        info_detail['save_time'].innerHTML = data_list[uno].save_time.toLocaleString();
    } else {
        info_detail['title']    .innerHTML = `新規保存: #${dom_idx.toString().padStart(2, '0')}`;
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

function init_ctls(): void {
    init_default_ctls();
}

function init_default_ctls(): boolean {
    try {
        if (!g_ctls.add('svld_rtn', _svld_rtn_ctls))  return false;
        if (!g_ctls.add('svld_nor', _svld_nor_ctls))  return false;
        if (!g_ctls.add('svld_chk', _svld_chk_ctls))  return false;
    } catch (err) {
        return false;
    }
    return true;
}


const _svld_nor_ctls = {
    name: 'svld_nor', 
    do_U:  do_U,
    do_D:  do_D,
    do_L:  do_L,
    do_R:  do_R,
    isOK:  isOK,
    isNG:  isNG,
    isRT:  isRT,
}
const _svld_rtn_ctls = {
    name: 'svld_rtn', 
    isNG:  go_back_guld_menu_for_first,
    isRT:  go_back_guld_menu_for_first,
}
const _svld_chk_ctls = {
    name: 'svld_chk', 
    isOK:  _do_check,
    isNG:  _do_check,
}



function do_U(): void {
    if (mode !== 'view') return;
    display_default_message();

    dom_idx = calc_cursor_pos_U(dom_idx, info_list.children.length, info_list_cols);
    high_light_on(info_list, dom_idx);  update_info_detail(dom_idx); 
}
function do_D(): void {
    if (mode !== 'view') return;
    display_default_message();

    dom_idx = calc_cursor_pos_D(dom_idx, info_list.children.length, info_list_cols);
    high_light_on(info_list, dom_idx);  update_info_detail(dom_idx);  
}
function do_L(): void {
    if (mode !== 'view') return;
    display_default_message();

    dom_idx = calc_cursor_pos_L(dom_idx, info_list.children.length, info_list_cols);
    high_light_on(info_list, dom_idx);  update_info_detail(dom_idx);
}
function do_R(): void {
    if (mode !== 'view') return;
    display_default_message();

    dom_idx = calc_cursor_pos_R(dom_idx, info_list.children.length, info_list_cols);
    high_light_on(info_list, dom_idx);  update_info_detail(dom_idx);
}

function isOK(): void { 
    is_save ? _isOK_for_save() : _isOK_for_load()
}
async function _isOK_for_load(): Promise<void> { 
    switch (mode) {
        case 'view':
            if (dom_to_uno[dom_idx] in data_list) {
                mode = 'read_OK';
                display_default_message();
            } else {
                g_mvm.notice_message('保存されていない項目です。戻る＝＞✖');
                g_ctls.act('svld_chk');
            }
            break;
        case 'read_OK': 
            await post_load_data().then(result => {
                if (result) {
                    g_mvm.notice_message('読み込みました!!');
                } else {
                    g_mvm.notice_message('ページを移動しました。あるいは読み込みに失敗しました');
                }
                mode = 'view';
            });
            break;
    }
}
async function _isOK_for_save(): Promise<void> { 
    switch (mode) {
        case 'view':
            mode = dom_to_uno[dom_idx] in data_list ? 'rewrite_OK' : 'write_OK';
            display_default_message();
            break;
        case 'write_OK': 
            try {
                await post_save_data().then(result => { 
                    try {
                        if (result) { 
                            g_mvm.notice_message('新規保存しました!!'); 
                            update_all(); 
                        } else { 
                            g_mvm.warning_message('新規保存に失敗しました');
                        }; 
                        mode = 'view'; 
                    } catch (err) {
                        _alert('write_OK6: ' + err);
                    }
                });
            } catch (err) {
                alert('write_OK7: ' + err);
            }
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
    const uno = dom_to_uno[dom_idx];

    if (data_list[uno].mypos.url() !== '' && data_list[uno].mypos.url() != g_my_url) {
        return _post_load_data_other();
    }
    return await _post_load_data_here();
} 
async function _post_load_data_other(): Promise<boolean> {
    const uno = dom_to_uno[dom_idx];

    const opt = new C_UrlOpt();
    opt.set('mode', 'load');
    opt.set('pid',   g_start_env.pid);
    opt.set('uno',   uno);
    POST_and_move_page(data_list[uno].mypos.url(), opt);
    return true;
} 
async function _post_load_data_here(): Promise<boolean> { 
    const uno = dom_to_uno[dom_idx];

    const  opt = new C_UrlOpt();
    opt.set('pid',         g_start_env.pid); 
    opt.set('uno',         uno); 

    return await general_load(opt).then((jsonObj:any)=>{ 
        return post_load_function(jsonObj);
    }); 
}
export function post_load_function(jsonObj: any): boolean {
    if (jsonObj.ecode !== 0) return false;

    g_save.decode(jsonObj.save);
 
    set_from_save_to_all_data(g_all_mvpt, g_save.all_mvpt);
    set_from_save_to_all_data(g_all_maze, g_save.all_maze);
    set_from_save_to_all_data(g_all_team, g_save.all_team);
    set_from_save_to_all_data(g_all_guld, g_save.all_guld);

    g_team.decode(g_save.all_team[g_save.mypos.tid() as string].encode()); 
    g_guld.decode(g_save.all_guld[g_team.get_loc().get_uid()].encode());

    return true;
}
function set_from_save_to_all_data(glob: {[uid: string]: I_JSON_Uniq}, save: {[uid: string]: I_JSON_Uniq}): void {
    for (let ii in glob) delete glob[ii];
    for (let ii in save) glob[save[ii].uid()] = save[ii];
}


async function post_save_data(): Promise<boolean> { 
    const loc = new C_MovablePoint({
        cur_url:  g_my_url,
        team_uid: g_team.uid(),
        kind:     'Guld',
        name:     g_guld.get_name(), 
        loc_uid:  g_guld.uid(),
    }); 
    g_team.set_loc(loc); 

    const uno = dom_to_uno[dom_idx];
    g_save.decode({ 
        player_id:  g_start_env.pid,  
        uniq_no:    uno, 
//        save_id:    data_list[uno].save_id, 
        title:     `保存済: #${uno.toString().padStart(2, '0')}`,  // data_list[uno].title, 
        detail:    '冒険者ギルド情報',                    // data_list[uno].detail, 
        point:     '冒険者ギルド',
        auto_mode: '0', 
        is_active: '1', 
        is_delete: '0', 
    }); 
    g_save.all_guld[g_guld.uid()] = g_guld; 
    g_save.all_team[g_team.uid()] = g_team; 
    g_save.mypos = loc;     

    const save_json = g_save.encode(); 
    const save_data = JSON.stringify(save_json, null, "\t"); 

    const  opt = new C_UrlOpt();
    opt.set('pid',         g_start_env.pid); 
    opt.set('save',        save_data); 
    return await general_save(opt).then((jsonObj:any)=>{return jsonObj.ecode == 0}); 
}

function isNG(): void {
    is_save ? _isNG_for_save() : _isNG_for_load();
}
function _isNG_for_load(): void {
    switch (mode) {
        case 'view':
            isRT();
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
            isRT();
            break;
        case 'write_OK':
        case 'rewrite_OK':
            mode = 'view';
            display_default_message();
            break;
    }
}

function isRT(): void {
    g_mvm.clear_message();
    go_back_guld_menu();
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
function _do_check(): void {
    g_mvm.clear_message();
    g_ctls.act("svld_nor");
}
