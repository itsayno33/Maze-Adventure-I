import { T_CtlsMode }      from "./T_CtlsMode";
import { hide_controlles } from "./F_set_controlles";
import { g_ctls_mode, g_maze, g_mes, g_mvm, g_pid, g_team, g_vsw }     from "./global";
import { general_save, get_save_info } from "./F_laod_and_save";
import { set_camp_controlles } from "./F_set_camp_controlles";
import { _round } from "./F_Math";
import { C_UrlOpt } from "./C_UrlOpt";

var   idx: number = 0;
var   save_UL_list: HTMLUListElement;
var   form_id:      HTMLInputElement;
var   form_time:    HTMLParagraphElement;
var   form_detail:  HTMLTextAreaElement;
var   form_point:   HTMLParagraphElement;

var   is_kakunin = false;

export type T_save_list = {
    id:        number,
    title:     string,
    detail:    string,
    point:     string,
    save_time: string,
    auto_mode: string,
    __is_new:  boolean,
}

var   save_list:    T_save_list[];
var   link_list:    T_save_list[];

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

    const children = save_UL_list.children;
    if (idx < 0 || idx > children.length - 1) return;

    if (!is_kakunin) check_load(); else load();
}

function isOK_for_save() {
    if (save_UL_list === null) return;

    const children = save_UL_list.children;
    if (idx < 0 || idx > children.length - 1) return;

    if (!is_kakunin) check_save(); else save();
}

function isNG() {
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
    if (idx < 1) {
//        idx = link_list.length;
        idx = 1;
    }
    --idx;
    high_light_on(); form_set();
}

function do_D() { 
    if (is_kakunin) return;
    if (idx > link_list.length - 2) {
//        idx = -1;
        idx = link_list.length - 2
    }
    ++idx; 
    high_light_on();  form_set();
}

function do_L() {
    if (is_kakunin) return;

    const limit = _round((link_list.length - 1) / 2, 0);
    if (idx < limit) {
        idx += limit;
    } else {
        idx -= limit;
    } 
    high_light_on();  form_set();
}

function do_R() {
    if (is_kakunin) return;

    const limit = _round((link_list.length - 1) / 2, 0);
    if (idx >= limit) {
        idx -= limit;
    } else {
        idx += limit;
    } 
    high_light_on();  form_set();
}

function high_light_on(): void {
    if (save_UL_list === null) return;

    const children = save_UL_list.children;
    if (idx < 0 || idx > children.length - 1) return;

    for (var i = 0; i < children.length; i++) {
        const li = children.item(i) as HTMLLIElement;
        __high_light_on(li, false);
    }
    const li = children.item(idx) as HTMLLIElement;
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

function form_set():void {
    const children = save_UL_list.children;
    if (idx < 0 || idx > children.length - 1) return;
    form_id   .value      = link_list[idx].id.toString();
    form_time .innerText  = link_list[idx].save_time;
    form_point.innerText  = link_list[idx].point;

    if (form_detail.hasAttribute('readonly')) {
        form_detail.removeAttribute('readonly');
        form_detail.value = link_list[idx].detail;
        form_detail.setAttribute('readonly', 'readonly');
    }else {
        form_detail.value = link_list[idx].detail;
    }
}

export function display_save_list(for_save: boolean) {
    const data_list   = (for_save) ? 'save_data_list'   : 'load_data_list';
    const data_id     = (for_save) ? 'save_data_id'     : 'load_data_id';
    const data_time   = (for_save) ? 'save_data_time'   : 'load_data_time';
    const data_detail = (for_save) ? 'save_data_detail' : 'load_data_detail';
    const data_point  = (for_save) ? 'save_data_point'  : 'load_data_point';

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
            save_list = [] as T_save_list[];
            for (var save_item of jsonObj.save) {
                save_list.push({
                    id:        (save_item?.save_id    ?? 0),
                    title:     (save_item?.title      ?? '??? Unknown Title'),
                    detail:    (save_item?.detail     ?? '???'),
                    point:     (save_item?.point      ?? '???'),
                    save_time: (save_item?.save_time  ?? '????-??-?? ??:??:??'),
                    auto_mode: (save_item?.auto_mode  ?? 'N'),
                    __is_new:   false,
                } as T_save_list)
            }
            if (for_save) {
                for (var j = save_list.length; j < 10; j++) { 
                    save_list.push({
                        id:         -1,
                        title:      `保存データ`,
                        detail:    '',
                        point:     '',
                        save_time: '',
                        auto_mode: 'N',
                        __is_new:   true,
                    })
                }
            }

            save_UL_list = document.getElementById(data_list) as HTMLUListElement;
            if (save_UL_list === null) return;
        
            while (save_UL_list.firstChild !== null) {
                save_UL_list.removeChild(save_UL_list.firstChild);
            }

            link_list = [] as T_save_list[];
            for (var i in save_list) {
                const li = document.createElement('li') as HTMLLIElement;
                switch (save_list[i].title) {
                    case '__InstantSaveData__':
                        if (for_save) continue;
                        save_list[i].title  = '簡易保存データ';
                        save_list[i].detail = 'デバッグモードで簡易保存したデータです';
                        break;
                    case '__UpDownSaveData__':
                        if (for_save) continue;
                        save_list[i].title  = '階段直前データ';
                        save_list[i].detail = '一番最近のフロア移動直前に自動保存したデータです';
                        break;
                }
                li.innerHTML = `『${save_list[i].title}』`;
                save_UL_list.appendChild(li);
                link_list.push(save_list[i]);
            }

            form_id     = document.getElementById(data_id)     as HTMLInputElement;
            form_time   = document.getElementById(data_time)   as HTMLParagraphElement;
            form_detail = document.getElementById(data_detail) as HTMLTextAreaElement;
            form_point  = document.getElementById(data_point)  as HTMLParagraphElement; 

            if (for_save) g_vsw.view_save(); else g_vsw.view_load();
            idx = 0; high_light_on(); form_set()
        
            return;
        } catch (err) {
            g_mes.warning_message(err as unknown as string);
            g_mes.warning_message('セーブ情報の受信に失敗しました。【データ不一致】');
            return;
        }
    });
}

function check_load(): void{ // 入力チェックと既存データ上書きの確認
    if (idx < 0 || idx > link_list.length - 1) {
        g_mes.warning_message(`check!! No longer access idx!『${link_list[idx].title}』(id: ${link_list[idx].id})`);
    }
    is_kakunin = true;
    g_mvm.notice_message('ロードしますか？　保存:〇　キャンセル:✖');
}

function check_save(): void{ // 入力チェックと既存データ上書きの確認
    if (idx < 0 || idx > link_list.length - 1) {
        g_mes.warning_message(`check!! No longer access idx!『${link_list[idx].title}』(id: ${link_list[idx].id})`);
    }
    if (link_list[idx].auto_mode == 'Y') {
        g_mes.warning_message(`check!! This is Auto Mode!『${link_list[idx].title}』(id: ${link_list[idx].id})`);
    }
    is_kakunin = true;
    g_mvm.notice_message('保存しますか？　保存:〇　キャンセル:✖');
}

function load(): void {}

function save(): void{
    const opt = new C_UrlOpt();
    opt.set('save_id',     Number(form_id.value)); 
    opt.set('save_title',  `保存データ`);
    opt.set('save_detail', form_detail.value);
    opt.set('save_point',  
        `『${g_maze.get_title()}』 ` 
        + `地下 ${g_team.get_p().z + 1}階層 ` 
        + `(X: ${g_team.get_p().x}, Y: ${g_team.get_p().y})`
    );
    general_save(opt);
    is_kakunin = false;
    g_mvm.clear_message();
    set_camp_controlles();
    g_vsw.view_camp();
}