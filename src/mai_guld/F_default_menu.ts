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
        g_ctls.deact(); 
        return;
    } catch (err) {}
}

