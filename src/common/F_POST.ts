import { _min }          from "./F_Math";
import { g_mes, _alert } from "./global";
import { C_UrlOpt }      from "./C_UrlOpt";


export async function POST_and_get_JSON(
    url: string, 
    opt: C_UrlOpt, 
): Promise<any|undefined> {
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

    const monitor = false;  // alertで受信したテキストを表示するときにtrueにする

    return res.text()
        .then(txt=>{
            const tx = txt.slice();

            if (monitor) _alert(tx);

            try {
                return JSON.parse(txt);
            } catch(err) {
                g_mes.warning_message('JSON形式のデコードエラー');
                _alert(tx);
                return undefined;
            }
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
