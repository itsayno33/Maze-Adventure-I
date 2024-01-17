import { _ceil, _floor } from "../common/F_Math";
import { rmv_guld_ctls, display_guld_menu } from "./F_guild_menu";
import { rmv_appd_ctls } from "./F_appd_menu";
import { rmv_hres_ctls } from "./F_hres_menu";
import { rmv_svld_ctls } from "./F_save_menu";
import { _alert } from "../common/global";


export function hide_all_menu(): void {
    // 各ペインの表示をすべて非表示にする
    // 
    // 入力のイベント処理は 
    // 設定されていないリスナーをリムーブした時の
    // removeEventLisner()の暴走が怖いので 
    // ペイン切替の際にその都度切り替える

    const div = document.getElementById('gld_view_switch');
    if (div === null) return;

    const menues = div.children;
    for (var i = 0; i < menues.length; i++) {
        (menues.item(i) as HTMLElement).style.display = 'none';
    } 
    rmv_all_ctls(); // 正常に動いてるのか不安だ。。。
}

export function rmv_all_ctls(): void {
    try {
        rmv_guld_ctls();
        rmv_hres_ctls();
        rmv_appd_ctls();
        rmv_svld_ctls();
    } catch (err) {};
}

export function init_display_menu(): void {
    display_guld_menu();
}


// メニューのデフォルト操作(ハイライトと詳細表示制御)

export function high_light_on(parent: HTMLElement|null, idx: number): void {
    if (parent === null) return;

    const children = parent.children;
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
    const perentStyle = window.getComputedStyle(elm.parentElement ?? elm);
    const fw_color = perentStyle.color           ?? 'black';
    const bg_color = perentStyle.backgroundColor ?? 'white';

    elm.style.color           = isOn ? bg_color : fw_color;
    elm.style.backgroundColor = isOn ? fw_color : bg_color;

    elm.style.fontWeight =  isOn ? 'bold' : 'normal';
    for (var j = 0; j < elm.children.length; j++) {
        const p = elm.children.item(j) as HTMLElement;
        if (isOn) {
            p.style.fontWeight      = 'normal';
            p.style.color           = fw_color;
            p.style.backgroundColor = bg_color;
            p.style.display         = 'block';
        } else {
            p.style.display         = 'none';
        }
    }
}





// 以下、矢印キーと〇✖ボタン処理のデフォルト処理。
// イベントリスナー以外の処理を定型化した。

const _all_ctls_name: {[name: string]: boolean} = {};

type T_fnc = (e?: MouseEvent)=>void;
type T_arg = T_fnc | null;

export type T_controlles = {
    name:  string,
    do_U?: T_arg, 
    do_D?: T_arg, 
    do_L?: T_arg, 
    do_R?: T_arg, 
    isOK?: T_arg, 
    isNG?: T_arg, 
    isSL?: T_arg, 
    isRT?: T_arg, 
    keyEvent?: boolean,
}

function _c(c: T_arg | undefined): boolean {
    if (c === undefined) return false;
    if (c === null)      return false;
    return true;
}

export function rmv_default_ctls(call: T_controlles): boolean {
    // _all_ctls_name[call.name]が定義されていない
    // つまりadd_default_ctlsがまだ呼ばれてない(ctlsがaddされてない)か、
    // _all_ctls_name[call.name]がfalse(既にctllsがremoveされている)なら、
    // 何もしない。
    _all_ctls_name[call.name] ??= false; 

    if (!_all_ctls_name[call.name]) return true;
    _all_ctls_name[call.name] = false;

    try {
        const u_arrow = document.getElementById('u_arrow') as HTMLButtonElement;
        const d_arrow = document.getElementById('d_arrow') as HTMLButtonElement;
        const l_arrow = document.getElementById('l_arrow') as HTMLButtonElement;
        const r_arrow = document.getElementById('r_arrow') as HTMLButtonElement;
        const y_btn   = document.getElementById('y_btn')   as HTMLButtonElement;
        const n_btn   = document.getElementById('n_btn')   as HTMLButtonElement;
        const s_btn   = document.getElementById('s_btn')   as HTMLButtonElement;
        const r_btn   = document.getElementById('r_btn')   as HTMLButtonElement;
    
        if (_c(call?.do_U)) u_arrow.removeEventListener("click", call.do_U as T_fnc, false);
        if (_c(call?.do_D)) d_arrow.removeEventListener("click", call.do_D as T_fnc, false);
        if (_c(call?.do_L)) l_arrow.removeEventListener("click", call.do_L as T_fnc, false);
        if (_c(call?.do_R)) r_arrow.removeEventListener("click", call.do_R as T_fnc, false);
        if (_c(call?.isOK)) y_btn  .removeEventListener("click", call.isOK as T_fnc, false);
        if (_c(call?.isNG)) n_btn  .removeEventListener("click", call.isNG as T_fnc, false);
        if (_c(call?.isSL)) s_btn  .removeEventListener("click", call.isSL as T_fnc, false);
        if (_c(call?.isRT)) r_btn  .removeEventListener("click", call.isRT as T_fnc, false);
    
        if (call?.keyEvent) window.removeEventListener('keydown', key_press_function);
    
        u_arrow.style.display = 'none';
        d_arrow.style.display = 'none';
        l_arrow.style.display = 'none';
        r_arrow.style.display = 'none';
        y_btn  .style.display = 'none';
        n_btn  .style.display = 'none';
        s_btn  .style.display = 'none';
        r_btn  .style.display = 'none';
    } catch (err) {
        _alert('Error Occuerd at Remove Default Ctls.');
        _alert('' + err);
        return false;
    }
    return true;
}

export function add_default_ctls(call: T_controlles): boolean {
    _all_ctls_name[call.name] ??= false; 

    if (_all_ctls_name[call.name]) return true;
    _all_ctls_name[call.name] = true;

    try {
        const u_arrow = document.getElementById('u_arrow') as HTMLButtonElement;
        const d_arrow = document.getElementById('d_arrow') as HTMLButtonElement;
        const r_arrow = document.getElementById('r_arrow') as HTMLButtonElement;
        const l_arrow = document.getElementById('l_arrow') as HTMLButtonElement;
        const y_btn   = document.getElementById('y_btn')   as HTMLButtonElement;
        const n_btn   = document.getElementById('n_btn')   as HTMLButtonElement;
        const s_btn   = document.getElementById('s_btn')   as HTMLButtonElement;
        const r_btn   = document.getElementById('r_btn')   as HTMLButtonElement;
    
        if (_c(call?.do_U)) u_arrow.addEventListener("click", call.do_U as T_fnc, false);
        if (_c(call?.do_D)) d_arrow.addEventListener("click", call.do_D as T_fnc, false);
        if (_c(call?.do_L)) l_arrow.addEventListener("click", call.do_L as T_fnc, false);
        if (_c(call?.do_R)) r_arrow.addEventListener("click", call.do_R as T_fnc, false);
        if (_c(call?.isOK)) y_btn  .addEventListener("click", call.isOK as T_fnc, false);
        if (_c(call?.isNG)) n_btn  .addEventListener("click", call.isNG as T_fnc, false);
        if (_c(call?.isSL)) s_btn  .addEventListener("click", call.isSL as T_fnc, false);
        if (_c(call?.isRT)) r_btn  .addEventListener("click", call.isRT as T_fnc, false);
    
        if (call?.keyEvent) window.addEventListener('keydown', key_press_function);
    
        u_arrow.style.display = _c(call?.do_U) ? 'block' : 'none';
        d_arrow.style.display = _c(call?.do_D) ? 'block' : 'none';
        l_arrow.style.display = _c(call?.do_L) ? 'block' : 'none';
        r_arrow.style.display = _c(call?.do_R) ? 'block' : 'none';
        y_btn  .style.display = _c(call?.isOK) ? 'block' : 'none';
        n_btn  .style.display = _c(call?.isNG) ? 'block' : 'none';
        s_btn  .style.display = _c(call?.isSL) ? 'block' : 'none';
        r_btn  .style.display = _c(call?.isRT) ? 'block' : 'none';
    } catch (err) {
        _alert('Error Occuerd at Append Default Ctls.');
        _alert('' + err);
        return false;
    }
    return true;
}


function key_press_function(e: KeyboardEvent):void  {
    switch(e.code) { // Arrowは反応せず(イベント自体が発生せず)
        case 'ArrowUp': 
        case 'KeyK': 
        case 'Numpad5': 
                (document.getElementById('u_arrow') as HTMLButtonElement)?.click();
                break;
        case 'ArrowDown': 
        case 'KeyJ': 
        case 'Numpad2': 
                (document.getElementById('d_arrow') as HTMLButtonElement)?.click();
                break;
        case 'ArrowLeft': 
        case 'KeyH': 
        case 'Numpad1': 
                (document.getElementById('l_arrow') as HTMLButtonElement)?.click();
                break;
        case 'ArrowRight': 
        case 'KeyL':
        case  'Numpad3': 
                (document.getElementById('r_arrow') as HTMLButtonElement)?.click();
                break;
        case 'KeyY':
        case 'KeyZ':
        case 'Digit0':
        case 'Enter':
        case 'NumpadEnter':
                (document.getElementById('y_btn') as HTMLButtonElement)?.click();
                break;
        case 'KeyN':
        case 'KeyX':
        case 'Numpad0':
        case 'NumpadAdd':
//        case 'NumpadSubtract':
                (document.getElementById('n_btn') as HTMLButtonElement)?.click();
                break;
        case 'KeyS':
        case 'Numpad7':
        case 'Space':
                (document.getElementById('s_btn') as HTMLButtonElement)?.click();
                break;
        case 'KeyQ':
        case 'Numpad9':
                (document.getElementById('r_btn') as HTMLButtonElement)?.click();
                break;
    }
}


export function calc_cursor_pos_U(idx: number, list_length: number, list_col_size: number): number {
    const list_row_size = _ceil(list_length / list_col_size, 0);
    const cur_row = idx % list_row_size;
    if (cur_row !== 0) {
        // 最上段(上端)以外
        --idx;
    } else {
        // 最上段(上端)
        idx += list_row_size - 1;
        while (idx > list_length - 1) {
            --idx;
        }
    } 
    return idx;
}
export function calc_cursor_pos_D(idx: number, list_length: number, list_col_size: number): number {
    const list_row_size = _ceil(list_length / list_col_size, 0);
    const cur_row = idx % list_row_size;
    if (cur_row !== list_row_size - 1 && idx !== list_length - 1) {
        // 最下段(下端)以外
        ++idx;
    } else {
        // 最下段(下端)
        idx -= list_row_size - 1;
        while (idx % list_row_size !== 0 && idx < list_length - 1) {
            ++idx;
        }
    } 
    return idx;
}
export function calc_cursor_pos_L(idx: number, list_length: number, list_col_size: number): number {
    const list_row_size = _ceil(list_length / list_col_size, 0);
    if (idx  > list_row_size - 1) {
        // 最前列(左端)以外
        idx -= list_row_size;
    } else {
        // 最前列(左端)
        const  vurtual_list_length = list_col_size * list_row_size;
        idx += vurtual_list_length - list_row_size;
        while (idx > list_length - 1) {
            idx -= list_row_size;
            if (idx < 0) {idx = 0; break;}
        }
    } 
    return idx;
}
export function calc_cursor_pos_R(idx: number, list_length: number, list_col_size: number): number {
    const list_row_size = _ceil(list_length / list_col_size, 0);
    if (idx  < list_length - list_row_size) { 
        // 最終列(右端)以外
        idx += list_row_size;
    } else {
        // 最終列(右端)
        const  old_idx = idx;
        const  vurtual_list_length = list_col_size * list_row_size;
        idx -= vurtual_list_length  - list_row_size;
        if (idx < 0) {
            idx += list_row_size;
            if (idx < 0 || idx > list_length - 1) idx = _floor((old_idx + 1) / list_col_size, 0);
        }
    } 
    return idx;
}

