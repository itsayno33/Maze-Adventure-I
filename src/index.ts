///
///   主処理
///

import { C_UrlOpt }  from "./C_UrlOpt";
import { C_Point }   from "./C_Point";
import { init_controlles } from "./F_set_controlles";
import { do_move_bottom_half } from "./F_set_move_controlles";
import { g_maze, g_team, init_after_loaded_DOM, init_debug_mode } from "./global";
import { T_Direction } from "./T_Direction";

window.addEventListener('DOMContentLoaded', function() { 
    init_after_loaded_DOM();
    const get_maze_url: string = "http://127.0.0.1/dev/mai/mai_maze.php";
    const get_maze_opt: string = new C_UrlOpt({mode: "new", num: 333}).to_string();
    get_maze(get_maze_url, get_maze_opt);
});

function get_maze(url: string, opt: string): void {
    getJSON_by_mai(url, opt, 
        async (xhr:XMLHttpRequest)=> {
            const jsonObj = JSON.parse(xhr.responseText);
/*
            alert(
                  "\nmaze id :" + (jsonObj.maze.maze_id ?? '?')
                + "\nfloor: "   + (jsonObj.maze.floor ?? '?')
                + "\ntitle: "   + (jsonObj.maze.title ?? '?')
                + "\nsize_x: "  + (jsonObj.maze.size_x ?? '?')
                + "\nsize_y: "  + (jsonObj.maze.size_y ?? '?')
                + "\nsize_z: "  + (jsonObj.maze.size_z ?? '?')
            );
            alert(
                  "\nmaze: "    + (jsonObj.maze.maze ?? '?')
            );
            alert(
                  "\nmask: "    + (jsonObj.maze.mask ?? '?')
            );

            alert(
                "\nid:    "     + (jsonObj.team.id      ?? '?')
              + "\nname:  "     + (jsonObj.team.name    ?? '?')
              + "\ncur_x: "     + (jsonObj.team.point.x ?? '?')
              + "\ncur_y: "     + (jsonObj.team.point.y ?? '?')
              + "\ncur_z: "     + (jsonObj.team.point.z ?? '?')
              + "\ncur_d: "     + (jsonObj.team.direct.d ?? '?')
            );
*/
            decode_all(jsonObj);
            init_debug_mode();
            init_controlles();
            do_move_bottom_half('blink_off');
    });}

async function decode_all(jsonObj: any) {
    // MAZE関連のデコード
    g_maze.init({
        maze_id:    jsonObj.maze.maze_id ?? 0,
        floor:      jsonObj.maze.floor   ?? 0,
        title:      jsonObj.maze.title   ?? 'UnKnown Dungeon',
        size_x:     jsonObj.maze.size_x  ?? 3,
        size_y:     jsonObj.maze.size_y  ?? 3,
        size_z:     jsonObj.maze.size_z  ?? 1,
    });
    g_maze.decode({maze: jsonObj.maze.maze, mask: jsonObj.maze.mask});

    //　Team関連のデコード
    jsonObj.team.id       ?? g_team.set_prp({id:   jsonObj.team.id});
    jsonObj.team.name     ?? g_team.set_prp({name: jsonObj.team.name});
    g_team.set_p(new C_Point(
        jsonObj.team.point.x ?? g_maze.get_x_max() -2, 
        jsonObj.team.point.y ?? g_maze.get_y_max() -2, 
        jsonObj.team.point.z ?? 0));
    g_team.set_dir(jsonObj.team.direct.d ?? T_Direction.N);

    // MazeにTeamを追加
    g_maze.add_obj(g_team);
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




