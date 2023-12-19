///
///   主処理
///

import { C_UrlOpt }  from "./C_UrlOpt";
import { C_Point }   from "./C_Point";
import { display_maze2D, display_maze_3D } from "./F_display_maze";
import { set_move_controlles } from "./F_set_controlles";
import { g_maze, g_hero, init_after_loaded_DOM }      from "./global";

window.addEventListener('DOMContentLoaded', function() { 
    init_after_loaded_DOM();
    const get_maze_url: string = "http://127.0.0.1/dev/mai/mai_maze.php";
    const get_maze_opt: string = new C_UrlOpt({mode: "new", num: 333}).to_string();
    get_maze(get_maze_url, get_maze_opt);
});

function get_maze(url: string, opt: string): void {
    getJSON_by_mai(url, opt, 
        (xhr:XMLHttpRequest)=> {
            const jsonObj = JSON.parse(xhr.responseText);

            /*
            alert("maze id :" + jsonObj.maze_id
            + "\nfloor: "  + jsonObj.floor
            + "\nsize_x: " + jsonObj.size_x
            + "\nsize_y: " + jsonObj.size_y
            + "\nmaze: "   + jsonObj.maze);
            */

            g_maze.init({
                maze_id: jsonObj.maze_id,
                size_x:  jsonObj.size_x,
                size_y:  jsonObj.size_y,
                size_z:  1
            });
            g_maze.decode(jsonObj.maze);
            g_hero.set_p(new C_Point(g_maze.get_x_max() -2, g_maze.get_y_max() -2, 0));
            g_maze.add_obj(g_hero);
            display_maze2D();
            set_move_controlles();
            display_maze_3D();
        });
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




