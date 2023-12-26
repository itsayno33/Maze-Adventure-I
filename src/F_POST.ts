import { C_UrlOpt } from "./C_UrlOpt";
import { g_mvm }    from "./global";

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
        g_mvm.warning_message('通信エラー: ' + err);
        return undefined;
    }

    const monitor = false;  // alertで受信したテキストを表示するときにtrueにする

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
            g_mvm.warning_message('JSON形式のデコードエラー');
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
    const form = create_form(url, opt);
    document.body.appendChild(form);
    form.submit();
}


function create_form(url: string, opt: C_UrlOpt): HTMLFormElement {
    const form = document.createElement('form') as HTMLFormElement;
    form.setAttribute('id',     'dummy_form_' + new Date().valueOf().toString());
    form.setAttribute('method', 'POST');
    form.setAttribute('action',  url);
    form.style.setProperty('display', 'none');

    for (var key of opt.get_keys()) {
        create_input(form, key, opt.get(key));
    }
    document.body.appendChild(form);
    return form;
}

function create_input(form: HTMLFormElement, name: string, value: string): HTMLInputElement {
    var fid: string;
    const i = document.createElement('input') as HTMLInputElement;
    if (form.getAttribute('id') !== null) {
        fid = form.getAttribute('id') as string;
    } else {
        fid = 'dummy_form';
        form.setAttribute('id', fid);
    }

    i.setAttribute('type', 'hidden');
    i.setAttribute('for',   fid);
    i.setAttribute('name',  name);
    i.setAttribute('value', value);
    i.style.setProperty('display', 'none');
    form.appendChild(i);

    return i;
}