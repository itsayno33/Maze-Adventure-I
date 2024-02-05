import { _round }              from "../common/F_Math";
import { C_UrlOpt }            from "../common/C_UrlOpt";
import { C_SaveData  }         from "../common/C_SaveData";
import { T_Lckd }              from "../common/C_Location";
import { C_PointDir }          from "../common/C_PointDir";
import { POST_and_move_page }  from "../common/F_POST";
import { general_load, general_save, get_save_info }    from "../common/F_load_and_save";
import { _alert, g_mes, g_my_url, g_save, g_start_env } from "../common/global";
import { T_CtlsMode }          from "./T_CtlsMode";
import { hide_controlles }     from "./F_set_controlles";
import { set_camp_controlles } from "./F_set_camp_controlles";
import { 
    g_ctls_mode, 
    g_mvm, 
    g_vsw, 
    g_maze, 
    g_team, 
    g_hres, 
    do_load_bottom_half, 
    g_ctls
} from "./global_for_maze";

var   UL_idx: number = 0;
var   save_UL_list_len: number;
var   save_UL_list:     HTMLUListElement;
var   UL_to_Data:       {[UL_idx: number]: /* data_idx: */ number}

var   form_id:          HTMLInputElement;
var   form_time:        HTMLParagraphElement;
var   form_detail:      HTMLTextAreaElement;
var   form_point:       HTMLParagraphElement;

var   is_kakunin = false;

export type T_save_list = {
    save_id:   number,
    uniq_no:   number,
    title:     string,
    detail:    string,
    scene:     string,
    point:     string,
    save_time: string,
    auto_mode: string,
    __is_new:  boolean,
}

var   save_list:        {[uniq_no: number]: C_SaveData};
const save_list_max = 10;
//var   link_list:    T_save_list[];

export function clr_load_controlles(): void {
    __clr_controlles(false);
}

export function clr_save_controlles(): void {
    __clr_controlles(true);
}

function __clr_controlles(for_save: boolean): void {
    g_ctls.deact();
}

export function set_load_controlles(): void {
    hide_controlles();
    g_ctls_mode[0] = T_CtlsMode.Load;
    g_ctls.add('load_nor', ctls_load_nor);
    g_ctls.act('load_nor');
    __set_controlles(false);
}

export function set_save_controlles(): void {
    hide_controlles();
    g_ctls_mode[0] = T_CtlsMode.Save;
    g_ctls.add('save_nor', ctls_save_nor);
    g_ctls.act('save_nor');
    __set_controlles(true);
}

function __set_controlles(for_save: boolean): void {
//    hide_controlles();
    const ctl_view = document.getElementById('move_ctl_view') as HTMLDivElement;
    ctl_view?.style.setProperty('display', 'block');

    is_kakunin = false;
    display_save_list(for_save); // true: For Save.
}
const ctls_load_nor = {
    name: 'load_nor', 
    do_U:  do_U,
    do_D:  do_D,
    do_L:  do_L,
    do_R:  do_R,
    isOK:  isOK_for_load,
    isNG:  isNG,
}
const ctls_save_nor = {
    name: 'save_nor', 
    do_U:  do_U,
    do_D:  do_D,
    do_L:  do_L,
    do_R:  do_R,
    isOK:  isOK_for_save,
    isNG:  isNG,
}

function isOK_for_load(): void {
    if (save_UL_list === null) return;
    if (UL_idx < 0 || UL_idx > save_UL_list_len - 1) return;

    if (!is_kakunin) check_load(); else load();
}

function isOK_for_save(): void {
    if (save_UL_list === null) return;
    if (UL_idx < 0 || UL_idx > save_UL_list_len - 1) return;

    if (!is_kakunin) check_save(); else save();
}

function isNG(): void {
    g_mvm.clear_message();
    if (!is_kakunin) {
        set_camp_controlles();
        g_vsw.view_camp();
    } else {
        g_mvm.clear_message();
        is_kakunin = false;
    }
}


function do_U(): void {
    if (is_kakunin) return;

    g_mvm.clear_message();
    if (UL_idx < 1) {
//        idx = link_list.length;
        UL_idx = 1;
    }
    --UL_idx;
    high_light_on(); form_set();
}

function do_D(): void { 
    if (is_kakunin) return;

    g_mvm.clear_message();
    if (UL_idx > save_UL_list_len - 2) {
//        idx = -1;
        UL_idx = save_UL_list_len - 2
    }
    ++UL_idx; 
    high_light_on();  form_set();
}

function do_L(): void {
    if (is_kakunin) return;

    g_mvm.clear_message();
    const limit = _round((save_UL_list_len - 1) / 2, 0);
    if (UL_idx < limit) {
        UL_idx += limit;
    } else {
        UL_idx -= limit;
    } 
    high_light_on();  form_set();
}

function do_R(): void {
    if (is_kakunin) return;

    g_mvm.clear_message();
    const limit = _round((save_UL_list_len - 1) / 2, 0);
    if (UL_idx >= limit) {
        UL_idx -= limit;
    } else {
        UL_idx += limit;
    } 
    high_light_on();  form_set();
}

function high_light_on(): void {
    if (save_UL_list === null) return;

    const children = save_UL_list.children;
    if (UL_idx < 0 || UL_idx > children.length - 1) return;

    for (var i = 0; i < children.length; i++) {
        const li = children.item(i) as HTMLLIElement;
        __high_light_on(li, false);
    }
    const li = children.item(UL_idx) as HTMLLIElement;
    __high_light_on(li, true);
}

function __high_light_on(elm: HTMLElement | null, isOn: boolean): void {
    if (elm === null) return;
    const fw_color = elm.parentElement?.style.getPropertyValue('color')            ?? 'black';
    const bg_color = elm.parentElement?.style.getPropertyValue('background-color') ?? 'white';
    elm.style.setProperty('color',            isOn ? bg_color : fw_color);
    elm.style.setProperty('background-color', isOn ? fw_color : bg_color);

    elm.style.setProperty('font-weight',      isOn ? 'bold' : 'normal');
    for (var j = 0; j < elm.children.length; j++) {
        const p = elm.children.item(j) as HTMLElement;
        p.style.setProperty('display', isOn ? 'block' : 'none');
    }
}

function form_clr():void {
    if (UL_idx < 0 || UL_idx > save_UL_list_len - 1) return;

    form_id   .value      = '-1';
    form_time .innerText  = '';
    form_point.innerText  = '';

    if (form_detail.hasAttribute('readonly')) {
        form_detail.removeAttribute('readonly');
        form_detail.value = '';
        form_detail.setAttribute('readonly', 'readonly');
    }else {
        form_detail.value = '';
    }
}

function form_set():void {
    if (UL_idx < 0 || UL_idx > save_UL_list_len - 1) return;

    form_clr();
    const data_idx = UL_to_Data[UL_idx];

    form_id   .value      = save_list[data_idx].save_id.toString();
    form_time .innerText  = save_list[data_idx].save_time.toISOString();
    form_point.innerText  = save_list[data_idx].point;

    if (form_detail.hasAttribute('readonly')) {
        form_detail.removeAttribute('readonly');
        form_detail.value = save_list[data_idx].detail;
        form_detail.setAttribute('readonly', 'readonly');
    }else {
        form_detail.value = save_list[data_idx].detail;
    }
}

export function display_save_list(for_save: boolean): void {
    const data_list   = (for_save) ? 'save_data_list'   : 'load_data_list';
    const data_id     = (for_save) ? 'save_data_id'     : 'load_data_id';
    const data_time   = (for_save) ? 'save_data_time'   : 'load_data_time';
    const data_detail = (for_save) ? 'save_data_detail' : 'load_data_detail';
    const data_point  = (for_save) ? 'save_data_point'  : 'load_data_point';

    g_mvm.clear_message();

    get_save_info()?.then(jsonObj => {
        if (jsonObj === null || jsonObj === undefined) {
            g_mes.warning_message('セーブ情報の受信に失敗しました。【受信データ無し】');
            return undefined;
        }
        if (jsonObj.ecode !== 0) {
            g_mes.warning_message(`『${jsonObj.emsg}』(${jsonObj.ecode})`);
            g_mes.warning_message('セーブ情報の受信に失敗しました。');
            return undefined;
        }
        try {
            save_list = {}; 

            for (let save_info of jsonObj.save_info) {
//                if (for_save && jsonObj.save_info.auto_mode == '1') continue; 
                save_list[save_info.uniq_no] = new C_SaveData(save_info);
            }
            if (for_save) {
                for (let uniq_no_cnt = 0; uniq_no_cnt < save_list_max; uniq_no_cnt++) {
                    if (uniq_no_cnt in save_list) continue;
                    save_list[uniq_no_cnt] = new C_SaveData({
                        save_id:    -1,
                        uniq_no:     uniq_no_cnt,
                        title:      `保存データ`,
                        detail:    '',
                        point:     '',
                        save_time: '',
                        auto_mode: '0',
                    });
                }
            }

            save_UL_list = document.getElementById(data_list) as HTMLUListElement;
            if (save_UL_list === null) return;
        
            while (save_UL_list.firstChild !== null) {
                save_UL_list.removeChild(save_UL_list.firstChild);
            }

            save_UL_list_len = 0; UL_to_Data = {};
            for (let data_idx in save_list) {
                if (save_list[data_idx].auto_mode) {
                    if (for_save) continue;

                    switch (save_list[data_idx].uniq_no) { 
                        case 100: 
                            save_list[data_idx].title  = '自動保存分';
                            save_list[data_idx].detail = '作業用に簡易保存したデータです';
                            break;
                        case 101:
                            save_list[data_idx].title  = '簡易保存分';
                            save_list[data_idx].detail = 'デバッグモードで簡易保存したデータです';
                            break;
                        case 102:
                            save_list[data_idx].title  = '階段直前分';
                            save_list[data_idx].detail = '一番最近のフロア移動直前に自動保存したデータです';
                            break;
                        case 103:
                            save_list[data_idx].title  = 'ｲﾍﾞﾝﾄ直前分';
                            save_list[data_idx].detail = 'イベント(失敗)直前に簡易保存したデータです';
                            break;
                    }
                }

                const li = document.createElement('li') as HTMLLIElement;
                li.innerHTML = `『${save_list[data_idx].title}』`;
                save_UL_list.appendChild(li);
                UL_to_Data[save_UL_list_len] = Number(data_idx);
                save_UL_list_len++;
            }

            form_id     = document.getElementById(data_id)     as HTMLInputElement;
            form_time   = document.getElementById(data_time)   as HTMLParagraphElement;
            form_detail = document.getElementById(data_detail) as HTMLTextAreaElement;
            form_point  = document.getElementById(data_point)  as HTMLParagraphElement; 

            if (!for_save) display_load_fields();
            if (for_save) g_vsw.view_save(); else g_vsw.view_load();
            UL_idx = 0; high_light_on(); 
            form_set();
            return;
        } catch (err) {
            g_mes.warning_message(err as unknown as string);
            g_mes.warning_message('セーブ情報の受信に失敗しました。【データ不一致】');
            return;
        }
    });
}

function display_load_fields(): void {
//    if (link_list.length > 0) {
    if (Object.keys(save_list).length > 0) {
        // ロードできるデータ有り
        // ロードデータリストと詳細パネルを表示
        const ul = document.getElementById('load_data_list')   as HTMLUListElement;
        const fs = document.getElementById('load_data_fields') as HTMLFieldSetElement;

        ul.style.setProperty('display', 'block');
        fs.style.setProperty('display', 'block');
    } else {
        // ロードできるデータ無し
        // ロードデータリストと詳細パネルを非表示にして
        // その旨を表示する
        const ul = document.getElementById('load_data_list')   as HTMLUListElement;
        const fs = document.getElementById('load_data_fields') as HTMLFieldSetElement;

        ul.style.setProperty('display', 'none');
        fs.style.setProperty('display', 'none');
        g_mvm.notice_message('ロードできる保存データが有りません。✖ボタンで戻って下さい。');
    }
}

function check_load(): void { // 入力チェックと既存データ上書きの確認
    const data_idx = UL_to_Data[UL_idx];
    if (UL_idx < 0 || UL_idx > save_UL_list_len - 1) {
        g_mes.warning_message(`check!! No longer access idx!『${save_list[data_idx].title}』(save_id: ${save_list[data_idx].save_id})`);
    }
    is_kakunin = true;
    g_mvm.notice_message('ロードしますか？　ロード:〇　キャンセル:✖');
}

function check_save(): void { // 入力チェックと既存データ上書きの確認
    const data_idx = UL_to_Data[UL_idx];
    if (UL_idx < 0 || UL_idx > save_UL_list_len - 1) {
        g_mes.warning_message(`check!! No longer access idx!『${save_list[data_idx].title}』(save_id: ${save_list[data_idx].save_id})`);
    }
    if (save_list[data_idx].auto_mode) {
        g_mes.warning_message(`check!! This is Auto Mode!『${save_list[data_idx].title}』(save_id: ${save_list[data_idx].save_id})`);
    }
    is_kakunin = true;
    g_mvm.notice_message('保存しますか？　保存:〇　キャンセル:✖');
}

function load(): void { 
    const data_idx = UL_to_Data[UL_idx];
    if (save_list[data_idx].mypos.url() !== '' && save_list[data_idx].mypos.url() != g_my_url) {
        _load_other(data_idx);
        return;
    }
    _load_here(data_idx);
    return;
}
function _load_other(data_idx: number): void {
    const opt = new C_UrlOpt();
    opt.set('mode', 'load');
    opt.set('pid',   g_start_env.pid);
    opt.set('opt',   save_list[data_idx].uniq_no.toString());
    POST_and_move_page(save_list[data_idx].mypos.url(), opt);
    return;
}

function _load_here(data_idx: number): void {
    g_start_env.pid = save_list[data_idx].player_id;

    general_load(save_list[data_idx].uniq_no).then((jsonObj:any)=>{  
        is_kakunin = false;
        decode_all(jsonObj?.save);
        do_load_bottom_half('ロードしました'); 
    });
}

async function save(): Promise<void> {
    const data_idx = UL_to_Data[UL_idx];
    set_g_save(
        /* save_id: */   save_list[data_idx].save_id, //Number(form_id.value),
        /* uniq_no: */   save_list[data_idx].uniq_no,
        /* title: */     `保存済: #${data_idx.toString().padStart(2, '0')}`, //save_list[data_idx].title, 
        /* detail: */    form_detail.value,
        /* point: */     
                    `『${g_maze.get_name()}』 ` 
                    + `地下 ${g_team.get_pd().z + 1}階層 ` 
                    + `(X: ${g_team.get_pd().x}, Y: ${g_team.get_pd().y})`,
        /* auto_mode: */ false,
    );
    general_save().then((jsonObj)=>{
        decode_all(jsonObj);

        is_kakunin = false;
        g_mvm.notice_message('保存しました');
        set_camp_controlles();
        g_vsw.view_camp();
        
    });
}

export function decode_all(jsonObj: any): void { 
    // SaveData関連のデコード
    if (jsonObj === undefined) return;
    g_save.decode(jsonObj); 
    g_save.mypos.set_url(g_my_url);

    //Team関連のデコード
    g_team.decode(g_save.all_team[g_save.mypos.tid()??''].encode()); 
    g_team.set_loc(g_save.mypos);

    // Maze関連のデコード
    const loc = g_team.get_loc(); 
    if (loc.get_lckd() == T_Lckd.Maze) {
        g_maze.decode(g_save.all_maze[loc.get_uid()].encode()); 
    }

    //Hero関連のデコード
    for (const i in g_hres) delete g_hres[i]; 
    for (const hero of g_team.hres())  g_hres.push(hero); 

    // MazeにTeamを追加
    g_maze.add_obj(g_team); 
}

// 新規ゲームの初期データの読み込み(暫定)
export function decode_maze(jsonObj: any): void {
    // Maze関連のデコード
    if (jsonObj?.maze !== undefined) g_maze.decode(jsonObj.maze);

    //　Team関連(現在地)のデコード
    if (jsonObj?.pos !== undefined) {
        let pos = new C_PointDir({
            x: jsonObj.pos?.x, 
            y: jsonObj.pos?.y, 
            z: jsonObj.pos?.z, 
            d: jsonObj.pos?.d, 
        }); 
        g_team.set_place(g_maze, g_my_url, pos);
        g_save.mypos = g_team.get_loc();
    }

    // Hero関連のデコード
    for (const i in g_hres) delete g_hres[i];
    for (const hero of g_team.hres()) g_hres.push(hero);

    // MazeにTeamを追加
    g_maze.add_obj(g_team);

    // SaveDataのベースの作成
    g_save.mypos = g_team.get_loc();
    g_save.all_maze[g_maze.uid()] = g_maze;
    g_save.all_team[g_team.uid()] = g_team;
}

export function set_g_save (
        save_id:   number,
        uniq_no:   number, 
        title:     string, 
        detail:    string, 
        point:     string,
        auto_mode: boolean,
    ): void {
        g_save.mypos = g_team.get_loc();

        g_save.all_team[g_team.uid()] = g_team;
        g_save.all_maze[g_maze.uid()] = g_maze; //

        g_save.decode({
            save_id:   save_id, 
            player_id: g_start_env.pid,
            uniq_no:   uniq_no, 
            title:     title, 
            detail:    detail,
            point:     point, 
            auto_mode: auto_mode ? '1' : '0',
            is_active: '1',
            is_delete: '0',
    
// 初期設定かロードの時点で設定されているはず
//            all_mvpt: all_mvpt,
//            all_maze: all_maze,
//            all_team: all_team,
//            all_guld: all_guld,
        });
}
