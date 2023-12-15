///
///   主処理
///

import {T_attr, C_url_opt} from "./C_url_opt";

window.addEventListener('DOMContentLoaded', function() { 
    const get_maze_url: string = "http://127.0.0.1/dev/mai/mai_maze.php";
    const get_maze_opt: string = new C_url_opt({mode: "new", num: 333}).to_string();
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




