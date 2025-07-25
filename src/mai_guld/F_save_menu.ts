import { _ceil, _floor, _round }   from "../d_utl/F_Math";
import { C_UrlOpt }                from "../d_utl/C_UrlOpt";
import { C_MovablePoint }          from "../d_mdl/C_MovablePoint";
import { I_JSON_Uniq }             from "../d_mdl/C_SaveInfo";
import { C_SaveData }              from "../d_mdl/C_SaveData";
import { C_CtlCursor }             from "../d_ctl/C_CtlCursor";
import { POST_and_move_page }      from "../d_cmn/F_POST";
import { general_load, general_save, get_save_info }    from "../d_cmn/F_load_and_save";
import { _alert, g_mes, g_my_url, g_save, g_start_env } from "../d_cmn/global";

import { act_guld_menu }       from "./F_guild_menu";
import { 
    g_mvm, g_team, g_guld, g_ctls, 
    g_all_maze, g_all_team, g_all_guld, g_all_mvpt, g_vsw 
} 
from "./global_for_guild";
import { C_PointDir } from "../d_mdl/C_PointDir";
import { C_Guild } from "../d_mdl/C_Guild";



let data_list:  {[uniq_no: number]:C_SaveData};

let info_list: HTMLUListElement;
let info_crsr: C_CtlCursor;

let dom_idx:  number = 0;
let info_detail: {[key: string]: HTMLLIElement};

let mode = 'view';

let is_save:boolean;

let dom_to_uno: {[id: number]: number};


let dom_info_fields : HTMLFieldSetElement;
let dom_info_detail : HTMLUListElement;

export function init_load_menu(): void {
    if (!_init_dom()) return;
    _init_all();
}
export function init_save_menu(): void {
    if (!_init_dom()) return;
    _init_all()
}
function _init_dom(): boolean {
    try {
        dom_info_detail = document.getElementById('ldsv_info_detail') as HTMLUListElement;
        dom_info_fields = document.getElementById('ldsv_info_fields') as HTMLFieldSetElement;
        info_list       = document.getElementById('ldsv_list')        as HTMLUListElement;
        if (dom_info_detail === null) {return false;}
        if (dom_info_fields === null) {return false;}
        if (info_list       === null) {return false;}
        return true;
    } catch (err) {
        return false;
    }
}
function _init_all(): void {
    mode = 'view';
    init_data();
    init_view();
    init_ctls();
}


export function act_load_menu(): void {
    is_save = false;
    _act_SL_menu();
}
export function act_save_menu(): void {
    is_save = true;
    _act_SL_menu();
}
async function _act_SL_menu(): Promise<void> {
    if (dom_info_detail === null) {act_guld_menu();return;}
    if (dom_info_fields === null) {act_guld_menu();return;}
    if (info_list       === null) {act_guld_menu();return;}

    mode = 'view';
    await update_all();

    if (!is_save && Object.keys(data_list).length < 1) {
        info_list.style.display = 'none';
        dom_info_fields.style.display = 'none';

        g_mvm.notice_message('現在、冒険の記録は有りません。戻る＝＞✖');
        g_ctls.act(ctls_svld_rtn);
    } else {
        info_list.style.display = 'block';
        dom_info_fields.style.display = 'block';
        g_ctls.act(ctls_svld_nor);
    }
    g_vsw.view(g_vsw.LdSv());
    display_default_message();
}

async function update_all(): Promise<void> {
    dom_idx = 0;
    await update_data_list().then(()=>{
        update_view();
        update_ctls();
    });
}

async function init_data() {}

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
                g_mes.warning_message('save_infoプロパティが返ってきませんでした');
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
}
function update_view() {
    update_info_list();
    append_info_detail();
    update_info_detail();
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
        let _DOM_idx = 0;
        for (let key in data_list) {
            const uno = Number(key);
            let   title: string;

            const li = document.createElement('li') as HTMLLIElement;
            switch (uno) {
                case 100: title = '自動保存分';break;
                case 101: title = 'デバッグ用';break;
                case 102: title = '階段直前分';break;
                case 103: title = 'ｲﾍﾞﾝﾄ直前分';break;
                default:  title = data_list[uno].title;break;
            }
            li.innerHTML = `${title}<p></p>`;
    
            li.id = _DOM_idx.toString();
            li.addEventListener("click",_OK_Fnc, false);
            info_list.appendChild(li);
            dom_to_uno[_DOM_idx++] = uno;
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
    return;
}
let old_dom_idx:number;
function _OK_Fnc(this: HTMLLIElement, e: MouseEvent): void {
    dom_idx = Number(this.id); 
    info_crsr.set_pos(dom_idx); 
    update_info_detail();

    if (dom_idx === old_dom_idx) {
        isOK();
    } else {
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

function append_info_detail(): void {
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

function update_info_detail() {
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
    init_cursor();
}

function init_default_ctls(): boolean {
    try {
        if (!g_ctls.set(ctls_svld_rtn))  return false;
        if (!g_ctls.set(ctls_svld_nor))  return false;
        if (!g_ctls.set(ctls_svld_chk))  return false;
    } catch (err) {
        return false;
    }
    return true;
}
const ctls_svld_nor = {
    name: 'svld_nor', 
    do_U:  do_U,
    do_D:  do_D,
    do_L:  do_L,
    do_R:  do_R,
    isOK:  isOK,
    isNG:  isNG,
    isRT:  isRT,
    cpRT:  isRT,
}
const ctls_svld_chk = {
    name: 'svld_chk', 
    isOK:  isOK,
    isNG:  isNG,
    isRT:  isRT,
    cpOK:  isOK,
    cpNG:  isNG,
    cpRT:  isRT,
}
const ctls_svld_rtn = {
    name: 'svld_rtn', 
    isNG:  go_back_guld_menu_for_first,
    isRT:  go_back_guld_menu_for_first,
    cpRT:  go_back_guld_menu_for_first,
}

function init_cursor(): void {
    
    info_crsr = C_CtlCursor.getObj(info_list);
    info_crsr.set_pos(0); dom_idx = 0; 
}


function update_ctls(): void {
    reset_cursor();
}

function reset_cursor(): void {
    info_crsr.set(info_list);
    info_crsr.set_pos(0); dom_idx = 0; 
}

function do_U(): void {
    dom_idx = info_crsr.pos_U();
    update_info_detail(); 
    display_default_message();
}
function do_D(): void {
    dom_idx = info_crsr.pos_D();
    update_info_detail(); 
    display_default_message();
}
function do_L(): void {
    dom_idx = info_crsr.pos_L();
    update_info_detail(); 
    display_default_message();
}
function do_R(): void {
    dom_idx = info_crsr.pos_R();
    update_info_detail(); 
    display_default_message();
}

function isOK(): void { 
    is_save ? _isOK_for_save() : _isOK_for_load();
}
async function _isOK_for_load(): Promise<void> { 
    switch (mode) {
        case 'view':
            await post_load_data().then(result => {
                if (result) {
                    g_mvm.notice_message('読み込みました!!');
                } else {
                    g_mvm.notice_message('ページを移動しました。あるいは読み込みに失敗しました');
                }
                go_back_guld_menu();
            });
            break;
        default:
            alert('Load mode error: ' + mode);
            break;
    }
}
async function _isOK_for_save(): Promise<void> { 
    switch (mode) {
        case 'view':
            if (dom_to_uno[dom_idx] in data_list) {
                mode = 'rewrite_OK';
                display_default_message();
                g_ctls.act(ctls_svld_chk);
                break;
            }
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
                        g_ctls.act(ctls_svld_nor);
                        go_back_guld_menu();
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
                go_back_guld_menu();
            });
            break;
        default:
            alert('Load mode error: ' + mode);
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
    opt.set('opt',   uno.toString());
    POST_and_move_page(data_list[uno].mypos.url(), opt);
    return true;
} 
async function _post_load_data_here(): Promise<boolean> { 
    const uno = dom_to_uno[dom_idx];

    return await general_load(uno).then((jsonObj:any)=>{ 
        return post_load_function(jsonObj);
    }); 
}
export function post_load_function(jsonObj: any): boolean {
    if (jsonObj.ecode !== 0) return false;
 
    g_save.decode(jsonObj.save);

    set_from_save_to_all_data(g_all_team, g_save.all_team);
    set_from_save_to_all_data(g_all_maze, g_save.all_maze);
    set_from_save_to_all_data(g_all_guld, g_save.all_guld);
    set_from_save_to_all_data(g_all_mvpt, g_save.all_mvpt);

//loc
    g_team.decode(g_save.all_team[g_save.mypos.tid() as string].encode()); 

//Guild
//    g_guld.decode(g_save.all_guld[g_team.get_loc().get_uid()].encode());
    for (let uid in g_all_guld) {
        if (g_all_guld[uid] instanceof C_Guild) {
            g_guld.decode(g_all_guld[uid].encode());
            break;
        }
    }
    //const [guld_id, guld_val] = Object.entries(g_all_guld)[0]
    //g_guld.decode(guld_val.encode());

//loc
/*
    if (g_save?.mypos !== undefined && g_team?.get_loc() !== undefined) {
        g_team.decode(g_save.all_team[g_save.mypos.tid() as string].encode()); 
        g_guld.decode(g_save.all_guld[g_team.get_loc().get_uid()].encode());
    } else {
        const [team_id, team_val] = Object.entries(g_all_team)[0]
        g_team.decode(team_val.encode());

        const [guld_id, guld_val] = Object.entries(g_all_guld)[0]
        g_guld.decode(guld_val.encode());

        const loc = new C_MovablePoint();
        loc.decode({
            kind:   'Guld',
            name:    g_guld.get_name(),
            loc_uid: g_guld.uid(),
            loc_pos: new C_PointDir({
                'x': 0,
                'y': 0,
                'z': 0,
                'd': 0,
            }),
            team_uid: g_team.uid(),
        });
        g_team.set_loc(loc);
        g_save.mypos = loc;

    }
    g_save.mypos.set_url(g_my_url);
    g_team.set_loc(g_save.mypos);
*/
    //loc

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

    return await general_save().then((jsonObj:any)=>{return jsonObj?.ecode === 0}); 
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
            g_ctls.act(ctls_svld_nor);
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
            g_ctls.act(ctls_svld_nor);
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
            g_mvm.normal_message('どれを読み込みますか？読込＝＞〇');
            break;
    }
}
function _display_default_message_for_save(): void {
    switch (mode) {
        case 'view':
            g_mvm.normal_message('どれに保存しますか？保存＝＞〇');
            break;
        case 'rewrite_OK':
            g_mvm.notice_message('過去のデータが消えます。上書きしますか？ＯＫ＝＞〇　やめる＝＞✖');
            break;
    }
}


function go_back_guld_menu_for_first(): void {
    g_ctls.deact();
    act_guld_menu();
}

function go_back_guld_menu(): void {
    clear_view();
    go_back_guld_menu_for_first();
}
function _do_check(): void {
    g_mvm.clear_message();
    g_ctls.act(ctls_svld_nor);
}
