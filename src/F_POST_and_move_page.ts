import { C_UrlOpt } from "./C_UrlOpt";
import { g_mvm } from "./global";

export async function POST_and_get_JSON(
    url: string, 
    opt: C_UrlOpt, 
): Promise<any> {
    const form_data = opt.to_FormData();
    if (form_data === null) return '';
    try {
        const res = await fetch(url, {
            method: 'POST',
            body: form_data
        });
/***
        res.text().then(txt=>{
            for (var i = 0;i < (txt.length < 1000?txt.length:1000); i += 250) 
                alert(txt.substring(i, i+250));
        })
***/
        return await res.json();
    }
    catch (err) {
        g_mvm.warning_message('通信エラー: ' + err);
        return undefined;
    }
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