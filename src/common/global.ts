export const g_url_get_save    = 0;
export const g_url_get_maze    = 1;
export const g_url_get_guld    = 2;
export const g_url_check_JSON  = 3;
export const g_url: string[] = new Array(4);

export var g_pid: number[] = new Array(1) as number[];


import { C_DisplayMessage } from "../common/C_DisplayMessage";
export var g_mes: C_DisplayMessage;

export function init_after_loaded_DOM_in_common(): void {
    const  con = document.getElementById('message_pane');
    g_mes  = C_DisplayMessage.get(con, 'client_message');
}

export function _alert(txt: string, page_size = 250): void {
    for (let i = 0; i < txt.length; i += page_size) {
        if (!window.confirm(txt.substring(i, i+page_size))) break;
    }
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
//            const url_top = parent_url(url_base);
            const url_top = url_base;
            g_url[g_url_get_save]   = url_top + "/_JSON_mai_save.php";
            g_url[g_url_get_maze]   = url_top + "/_JSON_mai_maze.php";
            g_url[g_url_get_guld]   = url_top + "/_JSON_mai_guld.php";
            g_url[g_url_check_JSON] = url_top + "/check_JSON.php";
            g_pid[0] = player_id; 
        },
        // 暫定版開始処理
        new_game: (url_baze: string, player_id: number): void => {
            tsCaller.get_init_data(url_baze, player_id);
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


