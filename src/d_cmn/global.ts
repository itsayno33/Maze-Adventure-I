export const g_url_get_maze    =  0;
export const g_url_new_maze    =  1;

export const g_url_all_maze    =  2;
export const g_url_new_guld    =  5;
export const g_url_all_hres    =  6;
export const g_url_get_save    =  7;
export const g_url_put_save    =  8;
export const g_url_all_save    =  9;
export const g_url_mai_maze    = 10;
export const g_url_mai_guld    = 11;

export const g_url_check_JSON  = 12;

export const g_url_rcd_list    = 13;
export const g_url_rcd_load    = 15;
export const g_url_rcd_save    = 16;

export const g_url_gt2_guld    = 17;
export const g_url_gt2_maze    = 18;
export const g_url_gt2_save    = 19;
export const g_url: string[] = new Array(20);

export let   g_my_url: string;

import { C_OnOffButton } from '../d_ctl/C_OnOffButton'
export var g_debug: C_OnOffButton;

import { C_AlertLog }    from "../d_cmn/C_AlertLog";
export let g_alert: C_AlertLog;

//export var g_pid: number[] = new Array(1) as number[];

class C_ReadyGames  {
    protected flgs: {[id: string]: boolean}; 
    protected func: ()=>void;
    public constructor() {
        this.flgs = {};
        this.flgs.loadedDOM = false; 
        this.flgs.getWindow = false;
        this.func = ()=>{};
    }
    public setLoadedDOM(): void {
        this.flgs.loadedDOM = true;
        this.check_and_do();
    }
    public setGetWindow(): void {
        this.flgs.getWindow = true;
        this.check_and_do();
    }
    public setFunction(func: ()=>void): void {
        this.func = func;
        this.check_and_do();
    }
    protected check_and_do(): void {
        if (this.func === undefined) return;
        for (let ii in this.flgs) if (!this.flgs[ii]) return;
        this.func(); 
    }
}
export const g_ready_games = new C_ReadyGames();

export const g_start_env = {mode: '', pid: -1, opt: ''};

import { C_DisplayMessage } from "../d_vie/C_DisplayMessage";
export var g_mes: C_DisplayMessage;

import { C_SaveData }         from "../d_mdl/C_SaveData";
export const g_save = new C_SaveData();

export function init_after_loaded_DOM_in_common(debug_id: string = 'debug_mode', msg_id: string = 'pane_sytm_logs'): void {
    const  con = document.getElementById(msg_id);
    g_mes  = C_DisplayMessage.getObj(con, 'client_message');
    g_alert = C_AlertLog.getObj();

    const btn = document.getElementById(debug_id) as HTMLButtonElement;
    g_debug = C_OnOffButton.getObj(btn, {});
}

export function _alert(txt: string, page_size = 250): void {
    for (let i = 0; i < txt.length; i += page_size) {
        if (!window.confirm(txt.substring(i, i+page_size))) break;
    }
}



// 以下、HTML側から呼び出せる関数の定義
// windowオブジェクトに渡すインターフェースを定義
interface I_TsCall {
    get_init_data: (url_base: string)=>void,
    start_game:    (mode: string, url_base: string, player_id: number, option: string)=>void, 
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
        get_init_data: (my_url: string): void => {
            g_my_url = my_url;
            const url_top = parent_url(my_url);
            const exp_top = parent_url(url_top) + "/maiex";

            g_url[g_url_gt2_save]   = url_top + "/_JSON_mai_save.php";
            g_url[g_url_gt2_maze]   = url_top + "/_JSON_mai_maze.php";
            g_url[g_url_gt2_guld]   = url_top + "/_JSON_mai_guld.php";

            g_url[g_url_mai_maze]   = url_top + "/mai_maze.php";
            g_url[g_url_mai_guld]   = url_top + "/mai_guld.php";

            g_url[g_url_new_maze]   = exp_top + "/maze/newMaze";
            g_url[g_url_get_maze]   = exp_top + "/maze/getMaze";
            g_url[g_url_all_maze]   = exp_top + "/maze/allMaze";
            g_url[g_url_new_guld]   = exp_top + "/guld/newGuld";
            g_url[g_url_all_hres]   = exp_top + "/guld/allHres";

            g_url[g_url_check_JSON] = url_top + "/check_JSON.php";
        },
        // 暫定版開始処理
        start_game: (mode: string, my_url: string, player_id: number, opt: string): void => {
            tsCaller.get_init_data(my_url); 
            g_start_env.mode = mode; 
            g_start_env.pid  = player_id; 
            g_start_env.opt  = opt; 

            g_ready_games.setGetWindow(); 
        } 
    };
})();

function parent_url(url: string): string {
    let re = /\/[^\/]+?$/;
    return url.replace(re, '');
}

// windowオブジェクトに追加したインターフェースに上記の実装を代入
window.tsCall = tsCaller;

// これでHTML側のscriptタグ内から <script>windows.tsCall.getplayer(1);</script>
// みたいに呼び出せる。ただし、bundle.jsのscriptタグでtype属性をmoduleにしていると失敗する。


