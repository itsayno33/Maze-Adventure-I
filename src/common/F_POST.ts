import { C_UrlOpt } from "./C_UrlOpt";
import { g_mes }    from "./global";

export async function POST_and_get_JSON(
    url: string, 
    opt: C_UrlOpt, 
): Promise<any> {
    const form_data = opt.to_FormData();
    if (form_data === null) return '';
    var res: Response;
    try {
        res = await fetch(url, {
            method: 'POST',
            body: form_data
        });
    }
    catch (err) {
        g_mes.warning_message('通信エラー: ' + err);
        return undefined;
    }

    const monitor = true;  // alertで受信したテキストを表示するときにtrueにする

    var txt:Promise<string>;
    if (monitor) {
        txt = res.text().then(tx=>{
            for (var i = 0;i < (tx.length < 1000?tx.length:1000); i += 250) 
                alert(tx.substring(i, i+250));
            return tx;
        })
    } else {
        txt = res.text();
    }

    return txt.then(txt=>{
        try {
            return JSON.parse(txt);
        } catch(err) {
            g_mes.warning_message('JSON形式のデコードエラー');
            for (var i = 0;i < (txt.length < 1000 ? txt.length : 1000); i += 250) 
                alert(txt.substring(i, i+250));
            return undefined;
        }
    });
}

function readStream(stream: ReadableStream): any {
    const reader = stream.getReader();
    let chunk = '';

    // read() returns a promise that resolves
    // when a value has been received
    reader.read().then(function processText({ done, value }): Promise<ReadableStreamReadResult<string> | ReadableStreamReadDoneResult<string>> {
      // Result objects contain two properties:
      // done  - true if the stream has already given you all its data.
      // value - some data. Always undefined when done is true.
      if (done) {
        return value;
      }

      chunk += value;

      // Read some more, and call this function again
      return reader.read().then(processText);
    });
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
