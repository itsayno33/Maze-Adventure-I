///
///   主処理
///

import { C_UrlOpt }              from "../common/C_UrlOpt";
import { init_after_loaded_DOM, init_before_new_games } from "./global_for_guild";
import { g_pid, g_url, g_url_check_JSON, g_url_get_guld, g_url_get_maze, g_url_get_save } from "../common/global";

window.addEventListener('DOMContentLoaded', function() { 
    init_after_loaded_DOM(); 
    const get_maze_opt = new C_UrlOpt({pid: g_pid[0], mode: "new", num: 333});
//    get_mai_maze();
});


// 暫定版開始処理
function new_game(): void {

}


// 以下、HTML側から呼び出せる関数の定義
// windowオブジェクトに渡すインターフェースを定義
interface I_TsCall {
    get_init_data: (url_baze: string, player_id: number)=>void,
    new_game:      (url_baze: string, player_id: number)=>void, // 暫定版開始処理
}
// windowオブジェクトにインターフェースの定義を追加
declare global {
    interface Window {
        tsCall: I_TsCall;
    }
}
// インターフェースの実装
//（どうやらインターフェースはプロパティ定義のオブジェクトになってるらしい）
const tsCaller: I_TsCall = (() => {
    return {
        get_init_data: (url_base: string, player_id: number): void => {
            const url_top = parent_url(url_base);
            g_url[g_url_get_save]   = url_top + "/mai_save.php";
            g_url[g_url_get_maze]   = url_top + "/mai_maze.php";
            g_url[g_url_get_guld]   = url_top + "/mai_guld.php";
            g_url[g_url_check_JSON] = url_top + "/check_JSON.php";
            g_pid[0] = player_id;
        },
        // 暫定版開始処理
        new_game: (url_baze: string, player_id: number): void => {
            tsCaller.get_init_data(url_baze, player_id);
            init_before_new_games(player_id);
        } 
    };
})();

function parent_url(url: string): string {
    let re = /\/[^\/]+$/;
    return url.replace(re, '');
}

// windowオブジェクトに追加したインターフェースに上記の実装を代入
window.tsCall = tsCaller;

// これでHTML側のscriptタグ内から <script>windows.tsCall.getplayer(1);</script>
// みたいに呼び出せる。ただし、bundle.jsのscriptタグでtype属性をmoduleにしていると失敗する。

