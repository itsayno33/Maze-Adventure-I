/*
import { C_UrlOpt }            from "../d_utl/C_UrlOpt";
import { alert_maze_info }     from "../d_mdl/C_Maze"; // 通常時はコメントアウトされている関数
import { alert_team_info }     from "../d_mdl/C_Team"; // 通常時はコメントアウトされている関数
import { alert_hres_info }     from "../d_mdl/C_Hero"; // 通常時はコメントアウトされている関数
import { do_move_bottom_half, set_move_controlles } from "./F_set_move_mode";
import { decode_all }          from "./F_set_save_mode";
import { init_debug_mode }     from "./global_for_maze";

export function get_mai_maze_0(url: string, opt: C_UrlOpt): void {
    getJSON_by_POST(url, opt.to_string(), 
        (xhr:XMLHttpRequest)=> {
//            alert(xhr.responseText);
            const jsonObj = JSON.parse(xhr.responseText);
//            alert_maze_info(jsonObj?.maze);
//            alert_team_info(jsonObj?.team);
//            alert_hres_info(jsonObj?.team?.heroes);

            decode_all(jsonObj);
            init_debug_mode();
            set_move_controlles();
            do_move_bottom_half('blink_off');
    });
}


export function getJSON_by_POST(url: string, opt: string, callback:(req:XMLHttpRequest)=>void) { 
         
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
*/
