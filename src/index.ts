function getJSON_by_mai() { 
        var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
         
        const xhr = new XMLHttpRequest();
    
        // リクエスト
        xhr.open("POST", "http://127.0.0.1/dev/mai/mai_maze.php");
    
        // リクエスト状態が変わるとイベント発生
        xhr.onreadystatechange = function () {
            // readyState XMLHttpRequest の状態 4: リクエストが終了して準備が完了
            // status httpステータス 200: 正常終了
            if (xhr.readyState == 4 && xhr.status == 200) {
                // jsonをオブジェクトに変更
                const jsonObj = JSON.parse(xhr.responseText);
    
                console.log("maze id :" + jsonObj.maze_id
                             + "\nfloor: "  + jsonObj.floor
                             + "\nsize_x: " + jsonObj.size_x
                             + "\nsize_y: " + jsonObj.size_y
                             + "\nmaze: "   + jsonObj.maze);
            }
        };
    
        //リクエスト送信
        xhr.send("mode=new&date=20231213");
    }
    