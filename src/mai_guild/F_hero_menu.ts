import { g_hres } from "./global_for_guild";

type T_Detail = {[key: string]: HTMLLIElement}

export function create_hero_info(form: HTMLUListElement): T_Detail {
    var detail = {} as T_Detail;

    detail = create_info_li(form, detail, 'name');
    detail = create_info_li(form, detail, 'sex'); 
    detail = create_info_li(form, detail, 'age'); 
    detail = create_info_li(form, detail, 'gold'); 
    detail = create_info_li(form, detail, 'state'); 
    detail = create_info_li(form, detail, 'lv'); 
    detail = create_info_li(form, detail, 'exp');
    detail = create_info_li(form, detail, 'skp');

    detail = create_info_li(form, detail, 'hp');
    detail = create_info_li(form, detail, 'mp');

    detail = create_info_li(form, detail, 'atk');
    detail = create_info_li(form, detail, 'def');
    detail = create_info_li(form, detail, 'quc');
    detail = create_info_li(form, detail, 'cnc');

    detail = create_info_li(form, detail, 'str');
    detail = create_info_li(form, detail, 'pwr');
    detail = create_info_li(form, detail, 'vit');
    detail = create_info_li(form, detail, 'dex');
    detail = create_info_li(form, detail, 'agi');
    detail = create_info_li(form, detail, 'tec');
    detail = create_info_li(form, detail, 'luk');

    return detail;
}
function create_info_li(form: HTMLUListElement, detail: T_Detail, key:string): T_Detail {
    const id = 'hres_hero_' + key;
    const li = document.createElement('li') as HTMLLIElement;
    li.id    = id;
    if (li !== undefined) {form.appendChild(li); detail[key] = li;}
    return detail;
}


function form_clr(detail: T_Detail):void {
    for (let key in detail) detail[key].innerText  = '';
}

export function form_set(detail: T_Detail, idx: number):void {
    form_clr(detail);

    const hero = g_hres[idx].encode();
    detail['name'] .innerHTML = hero['name'] ?? '???';
    detail['sex']  .innerHTML = hero['sex']  ?.toString() ?? '???';
    detail['age']  .innerHTML = hero['age']  ?.toString() ?? '???';
    detail['gold'] .innerHTML = hero['gold'] ?.toString() ?? '???';
    detail['state'].innerHTML = hero['state']?.toString() ?? '???';
    detail['lv']   .innerHTML = hero['lv']   ?.toString() ?? '???';
    detail['exp']  .innerHTML = hero.val?.['exp']?.toString() ?? '???';
    detail['skp']  .innerHTML = hero.val?.['skp']?.toString() ?? '???';

    detail['hp']   .innerHTML = hero.abi?.bsc?.['hp']?.toString() ?? '???';
    detail['mp']   .innerHTML = hero.abi?.bsc?.['mp']?.toString() ?? '???';

    detail['atk']  .innerHTML = hero.abi?.bsc?.['atk']?.toString() ?? '???';
    detail['def']  .innerHTML = hero.abi?.bsc?.['def']?.toString() ?? '???';
    detail['quc']  .innerHTML = hero.abi?.bsc?.['quc']?.toString() ?? '???';
    detail['cnc']  .innerHTML = hero.abi?.bsc?.['cnc']?.toString() ?? '???';

    detail['str']  .innerHTML = hero.abi?.bsc?.['str']?.toString() ?? '???';
    detail['pwr']  .innerHTML = hero.abi?.bsc?.['pwr']?.toString() ?? '???';
    detail['vit']  .innerHTML = hero.abi?.bsc?.['vit']?.toString() ?? '???';
    detail['dex']  .innerHTML = hero.abi?.bsc?.['dex']?.toString() ?? '???';
    detail['agi']  .innerHTML = hero.abi?.bsc?.['agi']?.toString() ?? '???';
    detail['tec']  .innerHTML = hero.abi?.bsc?.['tec']?.toString() ?? '???';
    detail['luk']  .innerHTML = hero.abi?.bsc?.['luk']?.toString() ?? '???';
}
