///
///   主処理
///

import { C_UrlOpt }  from "./C_UrlOpt";
import { JSON_Maze } from "./C_Maze";
import { JSON_Team } from "./C_Team";
import { JSON_Hero } from "./C_Hero";
import { init_controlles } from "./F_set_controlles";
import { do_move_bottom_half } from "./F_set_move_controlles";
import { g_maze, g_team, init_after_loaded_DOM, init_debug_mode } from "./global";

window.addEventListener('DOMContentLoaded', function() { 
    init_after_loaded_DOM();
    const get_maze_url: string = "http://127.0.0.1/dev/mai/mai_maze.php";
    const get_maze_opt: string = new C_UrlOpt({mode: "new", num: 333}).to_string();
    get_maze(get_maze_url, get_maze_opt);
});

function get_maze(url: string, opt: string): void {
    getJSON_by_mai(url, opt, 
        async (xhr:XMLHttpRequest)=> {
//            alert(xhr.responseText);
            const jsonObj = JSON.parse(xhr.responseText);
//            alert_maze_info(jsonObj.maze);
//            alert_team_info(jsonObj.team);
//            alert_heroes_info(jsonObj.team.heroes);

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

function alert_maze_info(a: JSON_Maze|undefined): void {
    if (a === undefined) return;
    alert("Maze Info:" 
        + "\nmaze id :" + (a.id      ?? '?')
        + "\nfloor: "   + (a.floor   ?? '?')
        + "\ntitle: "   + (a.title   ?? '?')
        + "\nsize_x: "  + (a.size_x  ?? '?')
        + "\nsize_y: "  + (a.size_y  ?? '?')
        + "\nsize_z: "  + (a.size_z  ?? '?')
        + "\n"
    );

    alert(
        "maze:\n"    + (a.maze ?? '?')
        + "\n"
    );
    
    alert(
        "mask:\n"    + (a.mask ?? '?')
        + "\n"
    );
}

function alert_team_info(a: JSON_Team|undefined): void {
    if (a === undefined) return;
    alert("Team Info:" 
        + "\nid:    "     + (a.id        ?? '?')
        + "\nname:  "     + (a.name      ?? '?')
        + "\ncur_x: "     + (a.point?.x  ?? '?')
        + "\ncur_y: "     + (a.point?.y  ?? '?')
        + "\ncur_z: "     + (a.point?.z  ?? '?')
        + "\ncur_d: "     + (a.direct?.d ?? '?')
        + "\n"
    );

//    if (a.heroes !== undefined) alert_heroes_info(a.heroes);
}

function alert_heroes_info(a: (JSON_Hero|undefined)[]|undefined): void { 
    if (a === undefined) return;
    alert('Number of Hero = ' + a.length.toString());
    for (var i in a) {
        if (a[i] === undefined) continue;
        alert("Hero[" + i.toString() + "] Info:\n" 
            + "\nid:    "     + (a[i]?.id        ?? '?')
            + "\nname:  "     + (a[i]?.name      ?? '?')
            + "\n"
        );
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




