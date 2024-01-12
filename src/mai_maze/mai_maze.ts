///
///   主処理
///

import { C_UrlOpt }            from "../common/C_UrlOpt";
import { _min, _round }        from "../common/F_Math";
import { get_mai_maze }        from "../common/F_load_and_save";
import { g_maze, g_team, init_after_loaded_DOM, init_debug_mode } from "./global_for_maze";
import { 
    g_pid, 
    g_url, g_url_check_JSON, g_url_get_guld, g_url_get_maze, g_url_get_save 
} from "../common/global";
import { init_controlles }     from "./F_set_controlles";
import { do_move_bottom_half } from "./F_set_move_controlles";
import { decode_maze }         from "./F_set_save_controlles";

window.addEventListener('DOMContentLoaded', function() { 
    init_after_loaded_DOM(); 

    get_mai_maze().then((jsonObj:any)=>{
        decode_maze(jsonObj);
        calc_view2D_width();

        init_debug_mode();
        init_controlles();
        do_move_bottom_half('blink_off');
    });
});


// 【初期設定】View2Dの横幅をCSSから読み込んで適合する文字のサイズを計算してセットする
function calc_view2D_width(): void {
    const pre = document.getElementById('Maze_view2D_pre') as HTMLPreElement;
    if (pre === null) return;

    const view2D_width  = pre.clientWidth;
    const view2D_height = pre.clientHeight;

    const col    = g_maze.get_x_max() + 1;
    const col_px = view2D_width  / col;

    const row    = g_maze.get_y_max() + 1;
    const row_px = view2D_height / row;

    const font_size   = _round(0.95 *  _min([col_px, row_px]), 2);
    const line_height = _round(1.00 *  _min([col_px, row_px]), 2);

    pre.setAttribute('width',  view2D_width .toString());
    pre.setAttribute('height', view2D_height.toString());
    pre.style.setProperty('font-size',  `${font_size}px`);
    pre.style.setProperty('line-height',`${line_height}px`);
}

// 以下、HTML側から呼び出せる関数の定義
// windowオブジェクトに渡すインターフェースを定義
interface I_TsCall {
    get_init_data: (url_baze: string, player_id: number)=>void;
    new_game:      (url_baze: string, player_id: number)=>void; // 暫定版開始処理
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
//            init_before_new_games(player_id);
        } , 
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



/*
function get_player_id(player_id: number) {
    g_pid[0] = player_id;
}
declare global {
    interface Window {
        get_player_id: (id: number)=>void;
    }
}
window.get_player_id = (id: number)=>{get_player_id(id);};
*/
