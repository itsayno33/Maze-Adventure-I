type T_attr = {[key: string]: string|number};
class C_url_opt {
    protected v: T_attr;
    public constructor(s?:  string);
    public constructor(t?:  T_attr);
    public constructor(a?: any) {
        if (typeof a === "undefined") {
            this.v = {} as T_attr;
            return;
        }
        if (typeof a === "string") {
            this.set_from_string(a);
        }
        if (typeof a === "object") {
            this.v = a as T_attr;
            return;
        }
        this.v = {} as T_attr;
        return;
    }
    public get (key: string): string {
        if (key in this.v) {
            if  (typeof this.v[key] === "number") {
                return this.v[key].toString();
            }
            return this.v[key] as string;
        } else {
            return "";
        }
    }
    public set(str: string):  void;
    public set(atr: T_attr):  void;
    public set(key: string, val?: string): void;
    public set(key: string, val?: number): void;
    public set(ukn: any,    val?: string|number): void {
        if (typeof ukn === "string") {
            if (typeof val === "undefined") {
                this.add_from_string(ukn);
                return;
            } else if (typeof val === "string") {
                this.v[ukn] = val;
                return;
            } else if (typeof val === "number" ){
                this.v[ukn] = val.toString();
                return;
            } else {
                this.v[ukn] = "";
            }
        }
        if (typeof ukn === "object") {
                const attr: T_attr = ukn as T_attr;
            for (const item in attr) {
                this.v[item] = attr[item];
            }
            return;
        }
        return;
    }
    public remove(key: string): void {
        if (key in this.v) {
            delete this.v[key];
        }
    }
    public clear(): void {
        this.v = {} as T_attr;
    }
    public to_string(): string {
        const len: number =  Object.keys(this.v).length;
        if (len < 1)  return "";

        var str_array: string[] = [];
        for (const key in this.v) {
            str_array.push(key + "=" + this.v[key]);
        }

        return str_array.join("&");
    }
    protected set_from_string(s: string): void {
        this.clear();
        this.add_from_string(s);
    }
    protected add_from_string(s: string): void {
        const str = s.replace(/^(\??)(.*)$/, '$2');
        const str_array: string[] = str.split("&");
        str_array.forEach((item) => {
            const key_value = item.split("=");
            if (key_value.length < 2) {
                this.v[key_value[0]] = '';
            } else {
                this.v[key_value[0]] = key_value[1];
            }
        });
    }
}

///
///   主処理
///

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




