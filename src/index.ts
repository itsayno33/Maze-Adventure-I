const g_url: string  = "http://127.0.0.1/dev/mai/mai_maze.php";
const g_opt: string  = "mode=new&date=20231213";

function do_onload(): void {
    getJSON_by_mai('POST', g_url, g_opt, 
        (xxx:XMLHttpRequest)=> {
            const jsonObj = JSON.parse(xxx.responseText);
            alert("maze id :" + jsonObj.maze_id
            + "\nfloor: "  + jsonObj.floor
            + "\nsize_x: " + jsonObj.size_x
            + "\nsize_y: " + jsonObj.size_y
            + "\nmaze: "   + jsonObj.maze);
    });
}




function getJSON_by_mai(method: string, url: string, opt: string, callback:(xxx:XMLHttpRequest)=>void) { 
         
        const xhr = new XMLHttpRequest();
    
        // リクエスト
        xhr.open("POST", "http://127.0.0.1/dev/mai/mai_maze.php");
    
        // リクエスト状態が変わるとイベント発生
        xhr.onreadystatechange = function () {
            // readyState XMLHttpRequest の状態 4: リクエストが終了して準備が完了
            // status httpステータス 200: 正常終了
            if (xhr.readyState == 4 && xhr.status == 200) {
                // jsonをオブジェクトに変更
                callback(xhr);
            }
        };
    
        //リクエスト送信
        xhr.send("mode=new&date=20231213");
    }
