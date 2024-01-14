import { _round }               from "../common/F_Math";
import { C_UrlOpt }             from "../common/C_UrlOpt";
import { C_SaveData  }          from "../common/C_SaveData";
import { T_Lckd }               from "../common/C_Location";
import { C_Point }              from "../common/C_Point";
import { T_Direction }          from "../common/T_Direction";
import { C_Hero }               from "../common/C_Hero";
import { _alert, g_mes, g_pid } from "../common/global";
import { T_CtlsMode }           from "./T_CtlsMode";
import { hide_controlles }      from "./F_set_controlles";
import { set_camp_controlles }  from "./F_set_camp_controlles";
import { general_load, general_save, get_save_info } from "../common/F_load_and_save";
import { g_ctls_mode, g_mvm, g_vsw, g_maze, g_team, g_save, g_hres } from "./global_for_maze";
import { do_move_bottom_half, set_move_controlles } from "./F_set_move_controlles";
import { C_PointDir } from "../common/C_PointDir";

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
    const u_arrow = document.getElementById('u_arrow') as HTMLButtonElement;
    const d_arrow = document.getElementById('d_arrow') as HTMLButtonElement;
    const l_arrow = document.getElementById('l_arrow') as HTMLButtonElement;
    const r_arrow = document.getElementById('r_arrow') as HTMLButtonElement;
    const y_btn   = document.getElementById('y_btn')   as HTMLButtonElement;
    const n_btn   = document.getElementById('n_btn')   as HTMLButtonElement;

    u_arrow.removeEventListener("click", do_U, false);
    d_arrow.removeEventListener("click", do_D, false);
    l_arrow.removeEventListener("click", do_L, false);
    r_arrow.removeEventListener("click", do_R, false);
    y_btn  .removeEventListener("click", for_save ? isOK_for_save : is_OK_for_load, false);
    n_btn  .removeEventListener("click", isNG, false);

    window.removeEventListener('keypress', key_press_function5);

    u_arrow.style.setProperty('display', 'none');
    d_arrow.style.setProperty('display', 'none');
    l_arrow.style.setProperty('display', 'none');
    r_arrow.style.setProperty('display', 'none');
    y_btn  .style.setProperty('display', 'none');
    n_btn  .style.setProperty('display', 'none');
}

export function set_load_controlles(): void {
    hide_controlles();
    g_ctls_mode[0] = T_CtlsMode.Load;

    __set_controlles(false);
}

export function set_save_controlles(): void {
    hide_controlles();
    g_ctls_mode[0] = T_CtlsMode.Save;

    __set_controlles(true);
}

function __set_controlles(for_save: boolean): void {
//    hide_controlles();
    const u_arrow = document.getElementById('u_arrow') as HTMLButtonElement;
    const d_arrow = document.getElementById('d_arrow') as HTMLButtonElement;
    const l_arrow = document.getElementById('l_arrow') as HTMLButtonElement;
    const r_arrow = document.getElementById('r_arrow') as HTMLButtonElement;
    const y_btn   = document.getElementById('y_btn')   as HTMLButtonElement;
    const n_btn   = document.getElementById('n_btn')   as HTMLButtonElement;

    u_arrow.addEventListener("click", do_U, false);
    d_arrow.addEventListener("click", do_D, false);
    l_arrow.addEventListener("click", do_L, false);
    r_arrow.addEventListener("click", do_R, false);
    y_btn  .addEventListener("click", for_save ? isOK_for_save : is_OK_for_load, false);
    n_btn  .addEventListener("click", isNG, false);

    window.addEventListener('keypress', key_press_function5);

    u_arrow.style.setProperty('display', 'block');
    d_arrow.style.setProperty('display', 'block');
    l_arrow.style.setProperty('display', 'block');
    r_arrow.style.setProperty('display', 'block');
    y_btn  .style.setProperty('display', 'block');
    n_btn  .style.setProperty('display', 'block');

    const ctl_view = document.getElementById('move_ctl_view') as HTMLDivElement;
    ctl_view?.style.setProperty('display', 'block');

    is_kakunin = false;
    display_save_list(for_save); // true: For Save.
}


function key_press_function5(e: KeyboardEvent):void  {
    switch(e.code) { // Arrowは反応せず(イベント自体が発生せず)
        case 'ArrowUp': 
        case 'KeyK': 
        case 'Numpad5': 
            (document.getElementById('u_arrow') as HTMLButtonElement)?.click();
            return;
        case 'ArrowDown': 
        case 'KeyJ': 
        case 'Numpad2': 
            (document.getElementById('d_arrow') as HTMLButtonElement)?.click();
            return;
        case 'ArrowLeft': 
        case 'KeyH': 
        case 'Numpad1': 
            (document.getElementById('l_arrow') as HTMLButtonElement)?.click();
            return;
        case 'ArrowRight': 
        case 'KeyL': 
        case  'Numpad3': 
            (document.getElementById('r_arrow') as HTMLButtonElement)?.click();
            return;
        case 'KeyO':
        case 'KeyY':
        case 'Digit0':
        case 'Enter':
        case 'NumpadEnter':
            (document.getElementById('y_btn') as HTMLButtonElement)?.click();
            return;
        case 'KeyN':
        case 'KeyX':
        case 'Numpad0':
        case 'NumpadAdd':
//        case 'NumpadSubtract':
            (document.getElementById('n_btn') as HTMLButtonElement)?.click();
            return;
    }
}

function is_OK_for_load() {
    if (save_UL_list === null) return;
    if (UL_idx < 0 || UL_idx > save_UL_list_len - 1) return;

    if (!is_kakunin) check_load(); else load();
}

function isOK_for_save() {
    if (save_UL_list === null) return;
    if (UL_idx < 0 || UL_idx > save_UL_list_len - 1) return;

    if (!is_kakunin) check_save(); else save();
}

function isNG() {
    g_mvm.clear_message();
    if (!is_kakunin) {
        set_camp_controlles();
        g_vsw.view_camp();
    } else {
        g_mvm.clear_message();
        is_kakunin = false;
    }
}


function do_U() {
    if (is_kakunin) return;

    g_mvm.clear_message();
    if (UL_idx < 1) {
//        idx = link_list.length;
        UL_idx = 1;
    }
    --UL_idx;
    high_light_on(); form_set();
}

function do_D() { 
    if (is_kakunin) return;

    g_mvm.clear_message();
    if (UL_idx > save_UL_list_len - 2) {
//        idx = -1;
        UL_idx = save_UL_list_len - 2
    }
    ++UL_idx; 
    high_light_on();  form_set();
}

function do_L() {
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

function do_R() {
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

export function display_save_list(for_save: boolean) {
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
                save_list[save_info.uniq_no] = new C_SaveData({
                    save_id:   save_info.save_id    ?? -1,
                    uniq_no:   save_info.uniq_no    ?? -1,
                    title:     save_info.title      ?? '??? Unknown Title',
                    detail:    save_info.detail     ?? '???',
                    point:     save_info.point      ?? '???',
                    save_time: save_info.save_time  ?? '????-??-?? ??:??:??',
                    auto_mode: save_info.auto_mode  ?? '0',
                });
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

                    switch (save_list[data_idx].title) {
                        case '__InstantSaveData__':
                            save_list[data_idx].title  = '簡易保存データ';
                            save_list[data_idx].detail = 'デバッグモードで簡易保存したデータです';
                            break;
                        case '__UpDownSaveData__':
                            save_list[data_idx].title  = '階段直前データ';
                            save_list[data_idx].detail = '一番最近のフロア移動直前に自動保存したデータです';
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

function check_load(): void{ // 入力チェックと既存データ上書きの確認
    const data_idx = UL_to_Data[UL_idx];
    if (UL_idx < 0 || UL_idx > save_UL_list_len - 1) {
        g_mes.warning_message(`check!! No longer access idx!『${save_list[data_idx].title}』(save_id: ${save_list[data_idx].save_id})`);
    }
    is_kakunin = true;
    g_mvm.notice_message('ロードしますか？　ロード:〇　キャンセル:✖');
}

function check_save(): void{ // 入力チェックと既存データ上書きの確認
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
    set_g_save(
        /* save_id: */   save_list[data_idx].save_id, //Number(form_id.value),
        /* uniq_no: */   save_list[data_idx].uniq_no,
        /* title: */     save_list[data_idx].title, 
        /* detail: */    save_list[data_idx].detail,
        /* point: */     save_list[data_idx].point,
        /* auto_mode: */ false,
    );
    const save_data = JSON.stringify(g_save.encode(), null, "\t");

    const opt = new C_UrlOpt();
    opt.set('save', save_data); 
    general_load(opt).then((jsonObj:any)=>{ 
        decode_all(jsonObj);

        is_kakunin = false;
        g_mvm.notice_message('ロードしました'); 
        set_move_controlles(); 
        g_vsw.view_maze(); 
        do_move_bottom_half('blink_off'); 
    });
}

async function save(): Promise<void> {
    const data_idx = UL_to_Data[UL_idx];
    set_g_save(
        /* save_id: */   save_list[data_idx].save_id, //Number(form_id.value),
        /* uniq_no: */   save_list[data_idx].uniq_no,
        /* title: */     save_list[data_idx].title, 
        /* detail: */    form_detail.value,
        /* point: */     
                    `『${g_maze.get_name()}』 ` 
                    + `地下 ${g_team.get_pd().z + 1}階層 ` 
                    + `(X: ${g_team.get_pd().x}, Y: ${g_team.get_pd().y})`,
        /* auto_mode: */ false,
    );
    const save_data = JSON.stringify(g_save.encode(), null, "\t");

    const opt = new C_UrlOpt();
    opt.set('save', save_data); 
/*
    await general_save(opt).then((jsonObj:any)=>{
        decode_all(jsonObj);
    });
*/
    await general_save(opt, decode_all);
    is_kakunin = false;
    g_mvm.notice_message('保存しました');
    set_camp_controlles();
    g_vsw.view_camp();
}

export function decode_all(jsonObj: any):void { 
    // SaveData関連のデコード
    if (jsonObj.save !== undefined)  g_save.decode(jsonObj.save); 
 
    //Team関連のデコード
    g_team.decode(g_save.all_team[g_save.team_uid].encode()); 

    // Maze関連のデコード
    const loc = g_team.get_loc(); 
    if (loc.get_lckd() != T_Lckd.Maze) {
        g_mes.warning_message('不正なデータを受信しました(迷宮探索以外)');
        _alert(
            '不正なデータを受信しました(迷宮探索以外) => ' 
            + loc.get_lckd_str() 
            + '(' + loc.get_lckd() + ')'
            );
        return;
    }
    g_maze.decode(g_save.all_maze[loc.get_uid()].encode()); 

    //Hero関連のデコード
    for (let i in g_hres) delete g_hres[i]; 
    for (let hero of g_team.hres())  g_hres.push(hero); 

    // MazeにTeamを追加
    g_maze.add_obj(g_team); 
}

// 新規ゲームの初期データの読み込み(暫定)
export function decode_maze(jsonObj: any):void {
    // Maze関連のデコード
    if (jsonObj.data.maze !== undefined) g_maze.decode(jsonObj.data.maze);

    //　Team関連(現在地)のデコード
    if (jsonObj.data.pos !== undefined) {
        let pos = new C_PointDir({
            x: jsonObj.data.pos?.x, 
            y: jsonObj.data.pos?.y, 
            z: jsonObj.data.pos?.z, 
            d: jsonObj.data.pos?.d, 
        });
        g_team.set_place(g_maze, pos);
    }

    // Hero関連のデコード
    for (let i in g_hres) delete g_hres[i];
    for (let hero_data of jsonObj.data.hres) {
        const new_hero = (new C_Hero()).decode(hero_data);
        g_hres.push(new_hero);
        g_team.add_hero(new_hero);
    }

    // MazeにTeamを追加
    g_maze.add_obj(g_team);

    // SaveDataのベースの作成
    g_save.team_uid = g_team.uid();
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
    ) {
        g_save.decode({
            save_id:   save_id, 
            player_id: g_pid[0],
            uniq_no:   uniq_no, 
            title:     title, 
            detail:    detail,
            auto_mode: auto_mode ? '1' : '0',
            is_active: '1',
            is_delete: '0',
            point:     point, 
    
// 初期設定かロードの時点で設定されているはず
//            team_uid: g_team.uid(),
//            all_maze: all_maze,
//            all_team: all_team,
//            all_guld: all_guld,
        });
}
