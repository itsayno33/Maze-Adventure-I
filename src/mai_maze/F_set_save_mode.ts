import { _round }              from "../d_utl/F_Math";
import { C_UrlOpt }            from "../d_utl/C_UrlOpt";
import { T_Lckd }              from "../d_mdl/C_Location";
import { C_PointDir }          from "../d_mdl/C_PointDir";
import { I_MazeObj  }          from "../d_mdl/C_MazeObj";
import { C_CtlCursor }         from "../d_ctl/C_CtlCursor";
import { POST_and_move_page }  from "../d_cmn/F_POST";
import { general_load, general_save, get_save_info }    from "../d_cmn/F_load_and_save";
import { _alert, g_mes, g_my_url, g_save, g_start_env } from "../d_cmn/global";
import { act_menu_mode }       from "./F_set_menu_mode";
import { act_move_mode, do_move_bottom_half, init_g_wres } from "./F_set_move_mode";
import { 
    g_ctls,
    g_cvm, 
    g_mvm, 
    g_vsw, 
    g_maze, 
    g_team, 
    g_hres,
    g_hresInfo,
    clr_g_hres,
    clr_g_obje,
    init_g_view2X, 
} from "./global_for_maze";
import { T_Ctls } from "./C_DefaultCtls";
import { C_SaveInfo } from "../d_mdl/C_SaveInfo";

let   for_save: boolean  = false;

let   UL_idx: number =   0;
let   UL_bak: number = 999;

let   save_UL_list:  HTMLUListElement;
let   UL_list_crsr:  C_CtlCursor;
let   UL_list_leng:  number;

let   UL_to_Data:       {[UL_idx: number]: /* data_idx: */ number}

let   form_id:          HTMLInputElement;
let   form_time:        HTMLParagraphElement;
let   form_detail:      HTMLTextAreaElement;
let   form_point:       HTMLParagraphElement;

let   is_kakunin = false;

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

let   save_list:        {[uniq_no: number]: C_SaveInfo};
const save_list_max = 20;

const ctls_load_rtn = {
    name: 'load_rtn', 
    isNG:  go_back_menu_mode,
    isRT:  go_back_menu_mode,
    cpRT:  go_back_menu_mode,
}
const ctls_load_nor = {
    name: 'load_nor', 
    do_U:  do_U,
    do_D:  do_D,
    do_L:  do_L,
    do_R:  do_R,
    isOK:  check_load,
    cpOK:  check_load,
    isNG:  go_back_menu_mode,
    isRT:  go_back_menu_mode,
    cpRT:  go_back_menu_mode,
}
const ctls_load_chk = {
    name: 'load_chk', 
    do_U:  do_U,
    do_D:  do_D,
    do_L:  do_L,
    do_R:  do_R,
    isOK:  isOK_for_load,
    cpOK:  isOK_for_load,
    isNG:  isNG_for_load,
    cpNG:  isNG_for_load,
    isRT:  go_back_menu_mode,
    cpRT:  go_back_menu_mode,
}
const ctls_save_nor = {
    name: 'save_nor', 
    do_U:  do_U,
    do_D:  do_D,
    do_L:  do_L,
    do_R:  do_R,
    isOK:  check_save,
    cpOK:  check_save,
    isNG:  go_back_menu_mode,
    isRT:  go_back_menu_mode,
    cpRT:  go_back_menu_mode,
}
const ctls_save_chk = {
    name: 'save_chk', 
    do_U:  do_U,
    do_D:  do_D,
    do_L:  do_L,
    do_R:  do_R,
    isOK:  isOK_for_save,
    cpOK:  isOK_for_save,
    isNG:  isNG_for_save,
    cpNG:  isNG_for_save,
    isRT:  go_back_menu_mode,
    cpRT:  go_back_menu_mode,
}

export function init_SL_mode(): void {
    init_view();
    init_ctls();
}

export function act_load_mode(): void {
    __set_data(false).then(()=>{
        if (!exist_save_list()) {
            hide_load_fields();
            g_cvm.notice_message('ロードできるデータが有りません');
            g_ctls.act(ctls_load_rtn);
            g_vsw.view(g_vsw.Move());
            return;
        } else {
            show_load_fields();
            display_message();
            g_ctls.act(ctls_load_nor);
            g_vsw.view(g_vsw.LdSv());
        }
    });
}
export function act_save_mode(): void {
   __set_data(true).then(()=>{
        display_message();
        g_ctls.act(ctls_save_nor);
        g_vsw.view(g_vsw.LdSv());
    });
}

async function __set_data(_for_save: boolean): Promise<void> {
    for_save = _for_save; // true: For Save.

    g_cvm.clear_message();
    is_kakunin = false;
    await display_save_list(); 
}

function hide_load_fields(): void {
    document.getElementById('ldsv_data_list')  ?.style.setProperty('display', 'none');
    document.getElementById('ldsv_data_fields')?.style.setProperty('display', 'none');
}

function show_load_fields(): void {
    document.getElementById('ldsv_data_list')  ?.style.setProperty('display', 'block');
    document.getElementById('ldsv_data_fields')?.style.setProperty('display', 'block');
}


function init_data(): void {}
function init_view(): void {}
function init_ctls(): void {
    is_kakunin = false;
    UL_bak = 999;

    g_ctls.set(ctls_load_rtn);
    g_ctls.set(ctls_load_nor);
    g_ctls.set(ctls_load_chk);
    g_ctls.set(ctls_save_nor);
    g_ctls.set(ctls_save_chk);
}

function isOK_for_load(): void {
    if (save_UL_list === null) return;
    if (UL_idx < 0 || UL_idx > UL_list_leng - 1) return;

//    if (!is_kakunin) check_load(); else load();
    load();
}

function isOK_for_save(): void {
    if (save_UL_list === null) return;
    if (UL_idx < 0 || UL_idx > UL_list_leng - 1) return;

//    if (!is_kakunin) check_save(); else save();
    save();
}

function isNG_for_load(): void {
    _isNG_(ctls_load_nor);
}
function isNG_for_save(): void {
    _isNG_(ctls_save_nor);
}
function _isNG_(ctls: T_Ctls): void {
    if (!is_kakunin) {
        g_cvm.clear_message();
        go_back_menu_mode();
    } else {
        is_kakunin = false;
        g_ctls.act(ctls);
        display_message();
    }
}

function go_back_menu_mode(): void {
    g_cvm.clear_message();
    act_menu_mode();
}

function go_back_move_mode(): void {
    act_move_mode();
    do_move_bottom_half('blink_off');
}

function do_U(): void {
    display_message();
    UL_idx = UL_list_crsr.pos_U();
    form_set();
}

function do_D(): void { 
    display_message();
    UL_idx = UL_list_crsr.pos_D();
    form_set();
}

function do_L(): void {
    display_message();
    UL_idx = UL_list_crsr.pos_L();
    form_set();
}

function do_R(): void {
    display_message();
    UL_idx = UL_list_crsr.pos_R();
    form_set();
}

function form_clr():void {
    if (UL_idx < 0 || UL_idx > UL_list_leng - 1) return;

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
    if (UL_idx < 0 || UL_idx > UL_list_leng - 1) return;

    form_clr();
    const data_idx = UL_to_Data[UL_idx];

    form_id   .value      = save_list[data_idx].save_id.toString();
    form_time .innerText  = save_list[data_idx].save_time?.toISOString();
    form_point.innerText  = save_list[data_idx].point;

    if (form_detail.hasAttribute('readonly')) {
        form_detail.removeAttribute('readonly');
        form_detail.value = save_list[data_idx].detail;
        form_detail.setAttribute('readonly', 'readonly');
    }else {
        form_detail.value = save_list[data_idx].detail;
    }
}

export async function display_save_list(): Promise<void> {
    const data_list   = 'ldsv_data_list';
    const data_id     = 'ldsv_data_id';
    const data_time   = 'ldsv_data_time';
    const data_detail = 'ldsv_data_detail';
    const data_point  = 'ldsv_data_point';

    await get_save_info()?.then(jsonObj => {
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
                save_list[save_info.uniq_no] = new C_SaveInfo(save_info);
            }
            if (for_save) {
                for (let uniq_no_cnt = 0; uniq_no_cnt < save_list_max; uniq_no_cnt++) {
                    if (uniq_no_cnt in save_list) continue;
                    save_list[uniq_no_cnt] = new C_SaveInfo({
                        save_id:    -1,
                        uniq_no:     uniq_no_cnt,
                        title:      `新規保存#${uniq_no_cnt.toString().padStart(2, '0')}`,
                        detail:    '',
                        point:     '',
                        save_time: undefined,
                        auto_mode: '0',
                    });
                }
            }

            save_UL_list = document.getElementById(data_list) as HTMLUListElement;
            if (save_UL_list === null) {alert('Can not find the Dom of Save List!');return;}
        
            while (save_UL_list.firstChild !== null) {
                save_UL_list.removeChild(save_UL_list.firstChild);
            }

            let UL_list_idx = 0; UL_to_Data = {};
            for (let data_idx in save_list) {
                if (save_list[data_idx].auto_mode) {
                    if (for_save) continue;

                    switch (save_list[data_idx].uniq_no) { 
                        case 100: 
                            save_list[data_idx].title  = '自動保存分';
                            save_list[data_idx].detail = '作業用に簡易保存したデータです';
                            continue;
//                            break;
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

                li.id = UL_list_idx.toString();
                li.addEventListener("click", for_save?_OK_save_Fnc:_OK_load_Fnc, false);

                save_UL_list.appendChild(li);
                UL_to_Data[UL_list_idx++] = Number(data_idx);
            }
            UL_list_crsr = C_CtlCursor.getObj(save_UL_list);
            UL_list_leng = save_UL_list.children.length;
    
            form_id     = document.getElementById(data_id)     as HTMLInputElement;
            form_time   = document.getElementById(data_time)   as HTMLParagraphElement;
            form_detail = document.getElementById(data_detail) as HTMLTextAreaElement;
            form_point  = document.getElementById(data_point)  as HTMLParagraphElement; 

            if (!exist_save_list()) return;
            UL_idx = 0;  UL_list_crsr.set_pos(UL_idx); 
            form_set();
            return;
        } catch (err) {
            g_mes.warning_message(err as unknown as string);
            g_mes.warning_message('セーブ情報の受信に失敗しました。【データ不一致】');
            return;
        }
    });
}
function _OK_load_Fnc(this: HTMLLIElement, e: MouseEvent): void {
    UL_idx = Number(this.id);
    
    if (UL_idx !== UL_bak) {
        UL_bak =   UL_idx;
        is_kakunin = false;
    }
    if (is_kakunin) isOK_for_load(); else check_load();
    UL_list_crsr.set_pos(UL_idx); form_set();
}
function _OK_save_Fnc(this: HTMLLIElement, e: MouseEvent): void {
    UL_idx = Number(this.id);
    
    if (UL_idx !== UL_bak) {
        UL_bak =   UL_idx;
        is_kakunin = false;
    }
    if (is_kakunin) isOK_for_save(); else check_save();
    UL_list_crsr.set_pos(UL_idx); form_set();
}
function exist_save_list(): boolean {
    return save_UL_list.children.length > 0;
}

function check_load(): void { // 入力チェックと既存データ上書きの確認
    const data_idx = UL_to_Data[UL_idx];
    if (UL_idx < 0 || UL_idx > UL_list_leng - 1) {
        g_mes.warning_message(`check!! No longer access idx!『${save_list[data_idx].title}』(save_id: ${save_list[data_idx].save_id})`);
    }
    is_kakunin = true;
    g_ctls.act(ctls_load_chk);
    display_message();
}

function check_save(): void { // 入力チェックと既存データ上書きの確認
    const data_idx = UL_to_Data[UL_idx];
    if (UL_idx < 0 || UL_idx > UL_list_leng - 1) {
        g_mes.warning_message(`check!! No longer access idx!『${save_list[data_idx].title}』(save_id: ${save_list[data_idx].save_id})`);
    }
    if (save_list[data_idx].auto_mode) {
        g_mes.warning_message(`check!! This is Auto Mode!『${save_list[data_idx].title}』(save_id: ${save_list[data_idx].save_id})`);
    }
    is_kakunin = true;
    g_ctls.act(ctls_save_chk);
    display_message();
}

function display_message() {
    if (for_save) {
        if (is_kakunin) {
            if (UL_to_Data[UL_idx] === undefined) {
                g_cvm.notice_message('これに保存しますか？');
            } else {
                g_cvm.notice_message('これに上書保存しますか？以前のデータは消去されます');
            }
        } else {
            g_cvm.normal_message('どれに保存しますか？');
        }
    } else {
        if (is_kakunin) {
            g_cvm.notice_message('ロードしますか？');
        } else {
            g_cvm.normal_message('どれをロードしますか？');
        }
    }
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
        g_mvm.notice_message('ロードしました');
        go_back_move_mode();        
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
        go_back_move_mode();        
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

    // 各種初期設定
    decode_common();

/**********************************************************************
    //Hero関連のデコード
    clr_g_hres();
    for (const hero of g_team.hres())  g_hres.push(hero); 

    g_hresInfo.init();

    // WndrWalker関連のデコード
    for (const i in g_obje) delete g_obje[i];
    for (const obje of g_maze.get_obj_array()) {
        if (obje.walker() === undefined) continue;
        g_obje.push(obje);
    }

    // MazeにTeamを追加
    g_maze.add_obj(g_team as I_MazeObj); 

    // View2X関連を初期化
    g_view2D.init({
        div_id:    'div_maze_vw2D', 
        canvas_id: 'maze_view2D_canvas', 
        x_min: 15, y_min: 15
    });
    g_view2M.init({
        div_id:    'div_maze_vw2M',
        canvas_id: 'maze_view2M_canvas',
        x_min:  5, y_min:  5
    });
***********************************************************************/
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
        g_team.getWalker().set_place(g_maze, g_my_url, pos);
        g_save.mypos = g_team.get_loc();
    }
    // 各種初期設定
    decode_common();
/************************************************************************
// Hero関連のデコード
//    for (const i in g_hres) delete g_hres[i];
    clr_g_hres();
    for (const hero of g_team.hres()) g_hres.push(hero);

    g_hresInfo.init();

    // WndrWalker関連のデコード
    for (const i in g_obje) delete g_obje[i];
    init_g_wres();

    // MazeにTeamを追加
    g_maze.add_obj(g_team as I_MazeObj);

    // View2X関連を初期化
    g_view2D.init({
        div_id:    'div_maze_vw2D', 
        canvas_id: 'maze_view2D_canvas', 
        x_min: 15, y_min: 15
    });
    g_view2M.init({
        div_id:    'div_maze_vw2M',
        canvas_id: 'maze_view2M_canvas',
        x_min:  5, y_min:  5
    });
*********************************************************/
    // SaveDataのベースの作成
    g_save.mypos = g_team.get_loc();
    g_save.all_maze[g_maze.uid()] = g_maze;
    g_save.all_team[g_team.uid()] = g_team;
}

function decode_common(): void {
    // Hero関連のデコード
    clr_g_hres();
    for (const hero of g_team.hres()) g_hres.push(hero);

    g_hresInfo.init();

    // WndrWalker関連のデコード
    //for (const i in g_obje) delete g_obje[i];
    clr_g_obje()
    init_g_wres();

    // MazeにTeamを追加
    g_maze.add_obj(g_team as I_MazeObj);

    // View2X関連を初期化
    init_g_view2X();
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
