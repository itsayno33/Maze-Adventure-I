type TAttr = {[key: string]: string};
class PostOpt {
    protected v: TAttr;
    public constructor(s:  string);
    public constructor(t:  TAttr);
    public constructor(a?: any) {
        if (a == null) {
            this.v = {} as TAttr;
            return;
        }
        if (typeof a === "string") {
            this.set_from_string(a);
        }
        if (typeof a === "object" && a.constructor.name === "TAttr") {
            this.v = a as TAttr;
            return;
        }
        this.v = {} as TAttr;
        return;
    }
    public get (key: string): string {
        return this.v[key];
    }
    public set(key: string, val: string): void;
    public set(str: string): void;
    public set(atr: TAttr):  void;
    public set(ukn: any, val?: string) {
        if (typeof ukn === "string") {
            if (val == null) {
                this.add_from_string(ukn);
                return;
            } else {
                this.v[ukn] = val;
                return;
            }
        }
        if (typeof ukn === "object" && ukn.constructor.name === "TAttr") {
            const attr: TAttr = ukn as TAttr;
            for (const item in attr) {
                this.v[item] = attr[item];
            }
            return;
        }
        return;
    }
    public clear(): void {
        this.v = {} as TAttr;
    }
    public to_string(): string {
        const len: number =  this.v.keys.length;
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

////////////////////////////////////////////////////////////
///
///   主処理
///
////////////////////////////////////////////////////////////

const g_url: string  = "http://127.0.0.1/dev/mai/mai_maze.php";
// const g_opt_assoc: TAttr  = {mode: "new", date: "20231213"} as TAttr;
// const g_opt: string  = (new PostOpt(g_opt_assoc)).to_string();
const g_opt: string  = "mode=new&date=20231213";


function do_onload(): void {
    getJSON_by_mai('POST', g_url, g_opt, 
        (xhr:XMLHttpRequest)=> {
            const jsonObj = JSON.parse(xhr.responseText);
            alert("maze id :" + jsonObj.maze_id
            + "\nfloor: "  + jsonObj.floor
            + "\nsize_x: " + jsonObj.size_x
            + "\nsize_y: " + jsonObj.size_y
            + "\nmaze: "   + jsonObj.maze);
    });
}

function getJSON_by_mai(method: string, url: string, opt: string, callback:(req:XMLHttpRequest)=>void) { 
         
        const xhr = new XMLHttpRequest();
    
        // リクエスト
        xhr.open(method, url);
    
        // リクエスト状態が変わるとイベント発生
        xhr.onreadystatechange = function () {
            // readyState XMLHttpRequest の状態 4: リクエストが終了して準備が完了
            // status httpステータス 200: 正常終了
            if (xhr.readyState == 4) {
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




