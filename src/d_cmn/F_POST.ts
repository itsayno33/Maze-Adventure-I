import { _min }          from "../d_utl/F_Math";
import { C_UrlOpt }      from "../d_utl/C_UrlOpt";
import { g_mes, _alert, g_debug, g_alert } from "../d_cmn/global";


// 非同期通信版 POST(String) & GET JSON
export async function POST_and_get_JSON(
    url: string, 
    opt: C_UrlOpt, 
): Promise<any|undefined> {
    const form_data = opt.toFormData();

    if (form_data === undefined) return undefined;
    var res: Response;
    try {
        res = await fetch(url, {
            method: 'POST',
            cache:  'no-cache',
            headers: {
//                "Content-Type": "multipart/form-data"
//                "Content-Type": "application/x-www-form-urlencoded"
//                "Content-Type": "application/json"
},
            body: opt.toFormData()
        });
        if (!res.ok) {
            throw new Error(`レスポンスステータス (${res.status})`);
        }
    }
    catch (err) {
        g_mes.warning_message('通信エラー: ' + err);
        return undefined;
    }

    const monitor = true;  // alertで受信したテキストを表示するときにtrueにする

    return res.text()
        .then(txt=>{
            const tx = txt.slice();

//            if (monitor) _alert(tx);
            if (monitor) {
                g_alert.set_message(`POST URL:`, url);
                g_alert.set_message(`POST OPT:`, opt.toString());
                g_alert.set_message(`POST DATA:`, tx);
            }

            try {
                return JSON.parse(txt);
            } catch(err) {
                g_mes.warning_message('JSON形式のデコードエラー');
                _alert(tx);
                return undefined;
            }
        });
}

// 非同期通信版 POST(JSON) & GET JSON
export async function POST_and_get_JSON3(
    url: string, 
    opt: C_UrlOpt, 
): Promise<any|undefined> {
    const form_data = opt.toFormData();

    if (form_data === undefined) return undefined;
    var res: Response;
    try {
        res = await fetch(url, {
            method: 'POST',
            cache:  'no-cache',
            headers: {
//                "Content-Type": "multipart/form-data"
//                "Content-Type": "application/x-www-form-urlencoded"
                "Content-Type": "application/json"
},
            body: opt.toJSON()
        });
        if (!res.ok) {
            throw new Error(`レスポンスステータス (${res.status})`);
        }
    }
    catch (err) {
        g_mes.warning_message('通信エラー: ' + err);
        return undefined;
    }

    const monitor = true;  // alertで受信したテキストを表示するときにtrueにする

    return res.text()
        .then(txt=>{
            const tx = txt.slice();

//            if (monitor) _alert(tx);
            if (monitor) {
                g_alert.set_message(`POST URL:`, url);
                g_alert.set_message(`POST OPT:`, opt.toString());
                g_alert.set_message(`POST DATA:`, tx);
            }

            try {
                return JSON.parse(txt);
            } catch(err) {
                g_mes.warning_message('JSON形式のデコードエラー');
                _alert(tx);
                return undefined;
            }
        });
}




// 同期通信版 POST & GET JSON
export async function POST_and_get_JSON2(
    url: string, 
    opt: C_UrlOpt, 
): Promise<any|undefined> {
    const reqObj = new XMLHttpRequest(); // object of request

    try {
        reqObj.open("POST", url, false); // Sync mode
        reqObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); // setting of headers  in request
        reqObj.send(opt.toFormData()); // data to send in request
    } catch (err) {
        g_mes.warning_message(`通信エラー: ${reqObj.status}`);
        return undefined;
    }

    const txt = reqObj.responseText; // displaying response text in paragraph tag

    const monitor = true;  // alertで受信したテキストを表示するときにtrueにする
    if (monitor) {
        g_alert.set_message(`POST URL:`,  url);
        g_alert.set_message(`POST OPT:`,  opt.toString());
        g_alert.set_message(`POST DATA:`, txt);
    }

    if (Number(reqObj.status) > 399) {
        g_mes.warning_message(`レスポンスステータス: ${reqObj.status}`);
        return undefined;
    }

    try {
        return JSON.parse(txt);
    } catch (err) {
        g_mes.warning_message('JSON形式のデコードエラー: ' + err);
        _alert(txt);
        return undefined;
    }
}




export function POST_and_move_page(url: string, opt: C_UrlOpt): void {
    create_form(url, opt).submit();
}

function create_form(url: string, opt: C_UrlOpt): HTMLFormElement {
    const form  = document.createElement('form') as HTMLFormElement;

    form.id     = 'dummy_form_' + new Date().valueOf().toString();
    form.method = 'POST';
    form.action =  url;
    form.style.display = 'none';

    for (var key of opt.get_keys()) {
        create_input(form, form.id, key, opt.get(key));
    }
    document.body.appendChild(form);
    return form;
}

function create_input(form: HTMLFormElement, fid: string, name: string, value: string): HTMLInputElement {
    const i = document.createElement('input') as HTMLInputElement;

    i.type  = 'hidden';
    i.name  = name;
    i.value = value;
    i.style.display ='none';
    i.setAttribute('for',   fid);
    form.appendChild(i);

    return i;
}
