import { _ceil, _floor, _isNum } from "../common/F_Math";
import { _alert }                from "../common/global";
import { g_ctls }                from "./global_for_maze";


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
        rmv_all_ctls(); 
        return;
    } catch (err) {}
}

export function rmv_all_ctls(): void {
    try {
        g_ctls.deact();
    } catch (err) {};
}
