///
///   主処理
///

import { C_Maze }    from "./C_Maze";
import { C_MazeMap } from "./C_MazeMap";
import { C_UrlOpt }  from "./C_UrlOpt";
import { T_MzKind }  from "./T_MzKind";
import { C_Hero }    from  "./C_Hero";
import { C_Point }   from "./C_Point";
import { I_HasHope, I_HopeAction } from "./I_EventMap";

const g_maze = new C_Maze({maze_id: -1});
const g_hero = new C_Hero();

window.addEventListener('DOMContentLoaded', function() { 
    const get_maze_url: string = "http://127.0.0.1/dev/mai/mai_maze.php";
    const get_maze_opt: string = new C_UrlOpt({mode: "new", num: 333}).to_string();
    get_maze(get_maze_url, get_maze_opt);
});



function get_maze(url: string, opt: string): void {
    getJSON_by_mai(url, opt, 
        (xhr:XMLHttpRequest)=> {
            const jsonObj = JSON.parse(xhr.responseText);

            alert("maze id :" + jsonObj.maze_id
            + "\nfloor: "  + jsonObj.floor
            + "\nsize_x: " + jsonObj.size_x
            + "\nsize_y: " + jsonObj.size_y
            + "\nmaze: "   + jsonObj.maze);

            g_maze.init({
                maze_id: jsonObj.maze_id,
                size_x:  jsonObj.size_x,
                size_y:  jsonObj.size_y,
                size_z:  1
            });
            g_maze.decode(jsonObj.maze);
            g_hero.set_p(new C_Point(g_maze.get_x_max() -2, g_maze.get_y_max() -2, 0));
            g_maze.add_obj(g_hero);
//            const maze_map = new C_MazeMap(g_maze);
//            alert(g_maze.to_string());
            display_maze2D(g_maze);
            display_controlles();
        });
}

function display_maze2D(maze: C_Maze): void {
    const pre: HTMLElement|null = document.getElementById('Maze_view2D_pre');
    if (pre !== null) pre.innerText = maze.to_string();
}

function display_controlles() {
    const u_arrow:   HTMLElement|null = document.getElementById('u_arrow');
    const d_arrow:   HTMLElement|null = document.getElementById('d_arrow');
    const r_arrow:   HTMLElement|null = document.getElementById('r_arrow');
    const l_arrow:   HTMLElement|null = document.getElementById('l_arrow');

    u_arrow?.addEventListener("click", go_forward, false);
    d_arrow?.addEventListener("click", go_back,    false);
    r_arrow?.addEventListener("click", turn_r,     false);
    l_arrow?.addEventListener("click", turn_l,     false);

    /************ *************************** **************/
    /*  HTMLPreElement = document.createElement('pre');    */
    /*  HTMLElement?.setAttribute('id', 'u_arraw');        */
    /*  HTMLElement?.style.setProperty('display', 'grid'); */
    /*  HTMLElement?.appendChild(HTMLElement);             */
    /************ *************************** **************/
}

function go_forward(this: HTMLElement, ev: MouseEvent) {
    const rslt = g_hero.hope_p_fwd();
    move_check(rslt);
    display_maze2D(g_maze);
}
function go_back(this: HTMLElement, ev: MouseEvent) {
    const rslt = g_hero.hope_p_bak();
    move_check(rslt);
    display_maze2D(g_maze);
}
function turn_r(this: HTMLElement, ev: MouseEvent) {
    const rslt = g_hero.hope_turn_r();
    move_check(rslt);
    display_maze2D(g_maze);
}
function turn_l(this: HTMLElement, ev: MouseEvent) {
    const rslt = g_hero.hope_turn_l();
    move_check(rslt);
    display_maze2D(g_maze);
}
function move_check(rslt: I_HasHope) {
    if (!rslt.has_hope) return;
    const r = rslt as I_HopeAction;
    if (r.hope == 'Turn') {
        r.isOK();
        return;
    }
    if (r.hope == 'Move') {
        switch (g_maze.get_cell(r.subj)) {
            case T_MzKind.Floor: r.isOK();break;
            default: r.isNG();break;
        }
        return;
    }
} 

function getJSON_by_mai(url: string, opt: string, callback:(req:XMLHttpRequest)=>void) { 
         
        const xhr = new XMLHttpRequest();
    
        // リクエスト
        xhr.open('POST', url);

        // POSTかつ、send()の引数が「key=value&...」形式であることを指定
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    
        // リクエスト状態が変わるとイベント発生
        xhr.onreadystatechange = function () {
            // readyState XMLHttpRequest の状態 4: リクエストが終了して準備が完了
            // status httpステータス 200: 正常終了
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status == 200) {
                    // jsonをオブジェクトに変更
                    callback(xhr);
                } else {
                    alert("HttpRequest ERROR code=" + xhr.status);
                }
            }
        };
    
        //リクエスト送信
        xhr.send(opt);
    }




