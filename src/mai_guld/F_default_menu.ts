import { _ceil, _floor, _isNum } from "../common/F_Math";
import { _alert }                from "../common/global";
import { display_guld_menu }     from "./F_guild_menu";
import { g_ctls }                from "./global_for_guild";


export function hide_all_menu(): void {
    // 各ペインの表示をすべて非表示にする
    // 
    // 入力のイベント処理は 
    // 設定されていないリスナーをリムーブした時の
    // removeEventLisner()の暴走が怖いので 
    // ペイン切替の際にその都度切り替える

    let div: HTMLDivElement;
    try {
        div = document.getElementById('gld_view_switch')  as HTMLDivElement;
    } catch (err) {
        return;
    }
    if (div === null) return;

    const menues = div.children;
    try {
        for (var i = 0; i < menues.length; i++) {
            (menues.item(i) as HTMLElement).style.display = 'none';
        } 
        rmv_all_ctls(); // 正常に動いてるのか不安だ。。。
        return;
    } catch (err) {}
}

export function rmv_all_ctls(): void {
    try {
        g_ctls.deact();
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

export function high_light_off(parent: HTMLElement|null): void {
    if (parent === null) return;

    const children = parent.children;
    for (var i = 0; i < children.length; i++) {
        const li = children.item(i) as HTMLLIElement;
        __high_light_on(li, false);
    }
}




export function calc_cursor_pos_U(idx: number, list_leng: number, list_cols: number): number {
    const list_rows = _ceil(list_leng / list_cols, 0);
    const cur_row = idx % list_rows;
    if (cur_row !== 0) {
        // 最上段(上端)以外
        --idx;
    } else {
        // 最上段(上端)
        idx += list_rows - 1;
        while (idx > list_leng - 1) {
            --idx;
        }
    } 
    return idx;
}
export function calc_cursor_pos_D(idx: number, list_leng: number, list_cols: number): number {
    const list_rows = _ceil(list_leng / list_cols, 0);
    const cur_row = idx % list_rows;
    if (cur_row !== list_rows - 1 && idx !== list_leng - 1) {
        // 最下段(下端)以外
        ++idx;
    } else {
        // 最下段(下端)
        idx -= list_rows - 1;
        while (idx % list_rows !== 0 && idx < list_leng - 1) {
            ++idx;
        }
    } 
    return idx;
}
export function calc_cursor_pos_L(idx: number, list_leng: number, list_cols: number): number {
    const list_rows = _ceil(list_leng / list_cols, 0);
    if (idx  > list_rows - 1) {
        // 最前列(左端)以外
        idx -= list_rows;
    } else {
        // 最前列(左端)
        const  vurtual_list_length = list_cols * list_rows;
        idx += vurtual_list_length - list_rows;
        while (idx > list_leng - 1) {
            idx -= list_rows;
            if (idx < 0) {idx = 0; break;}
        }
    } 
    return idx;
}
export function calc_cursor_pos_R(idx: number, list_leng: number, list_cols: number): number {
    const list_rows = _ceil(list_leng / list_cols, 0);
    if (idx  < list_leng - list_rows) { 
        // 最終列(右端)以外
        idx += list_rows;
    } else {
        // 最終列(右端)
        const  old_idx = idx;
        const  vurtual_list_length = list_cols * list_rows;
        idx -= vurtual_list_length  - list_rows;
        if (idx < 0) {
            idx += list_rows;
            if (idx < 0 || idx > list_leng - 1) idx = _floor((old_idx + 1) / list_cols, 0);
        }
    } 
    return idx;
}


// DOMリスト一覧の行数の取得
export function get_dom_list_leng(dom_list: HTMLElement): number {
    try {
        return dom_list.children.length; 
    } catch(err) {
        return 1;
    }
}

// DOMリスト一覧の列数(CSSから取得)の取得
export function get_dom_list_cols(dom_list: HTMLElement): number {
    try {
        let cols   = window.getComputedStyle(dom_list).columnCount;
        return _isNum(cols) ? Number(cols) : 1; 
    } catch(err) {
        return 1;
    }
}
