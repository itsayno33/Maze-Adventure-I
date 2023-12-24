import { alert_maze_info }     from "./C_Maze"; // 通常時はコメントアウトされている関数
import { alert_team_info }     from "./C_Team"; // 通常時はコメントアウトされている関数
import { alert_heroes_info }   from "./C_Hero"; // 通常時はコメントアウトされている関数
import { init_controlles }     from "./F_set_controlles";
import { do_move_bottom_half } from "./F_set_move_controlles";
import { g_maze, g_team, init_debug_mode } from "./global";

export function get_mai_maze(url: string, opt: string): void {
    getJSON_by_POST(url, opt, 
        (xhr:XMLHttpRequest)=> {
//            alert(xhr.responseText);
            const jsonObj = JSON.parse(xhr.responseText);
//            alert_maze_info(jsonObj?.maze);
//            alert_team_info(jsonObj?.team);
//            alert_heroes_info(jsonObj?.team?.heroes);

            decode_all(jsonObj);
            init_debug_mode();
            init_controlles();
            do_move_bottom_half('blink_off');
    });
}

function decode_all(jsonObj: any) {
    // MAZE関連のデコード
    if (jsonObj.maze !== undefined) g_maze.decode(jsonObj.maze);

    //　Team関連のデコード
    if (jsonObj.team !== undefined) g_team.decode(jsonObj.team);

    // MazeにTeamを追加
    g_maze.add_obj(g_team);
}


function getJSON_by_POST(url: string, opt: string, callback:(req:XMLHttpRequest)=>void) { 
         
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
