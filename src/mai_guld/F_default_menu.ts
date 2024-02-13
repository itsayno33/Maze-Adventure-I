import { init_guld_menu, act_guld_menu }  from "./F_guild_menu";
import { init_hres_menu }                 from "./F_hres_menu";
import { init_load_menu, init_save_menu } from "./F_save_menu";
import { init_tomz_menu }                 from "./F_tomz_menu";
import { g_ctls }                         from "./global_for_guild";

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

export function init_menu() { 
    g_ctls.deact();

    init_guld_menu(); 
    init_hres_menu(); 
    init_load_menu(); 
    init_save_menu(); 
    init_tomz_menu(); 

    act_guld_menu(); 
}
