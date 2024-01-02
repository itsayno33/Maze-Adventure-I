import { C_Hero } from '../common/C_Hero';
import { g_hres } from "./global_for_guild";

type T_Detail = {[key: string]: HTMLLIElement}

export function create_hero_info(form: HTMLUListElement): T_Detail {
    var detail = {} as T_Detail;
    clear_info(form);

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

    detail = create_info_li(form, detail, 'atk_p');
    detail = create_info_li(form, detail, 'def_p');
    detail = create_info_li(form, detail, 'quc_p');
    detail = create_info_li(form, detail, 'cnc_p');

    detail = create_info_li(form, detail, 'atk_m');
    detail = create_info_li(form, detail, 'def_m');
    detail = create_info_li(form, detail, 'quc_m');
    detail = create_info_li(form, detail, 'cnc_m');

    detail = create_info_li(form, detail, 'str_p');
    detail = create_info_li(form, detail, 'pwr_p');
    detail = create_info_li(form, detail, 'vit_p');
    detail = create_info_li(form, detail, 'dex_p');
    detail = create_info_li(form, detail, 'agi_p');
    detail = create_info_li(form, detail, 'tec_p');
    detail = create_info_li(form, detail, 'luk_p');

    detail = create_info_li(form, detail, 'str_m');
    detail = create_info_li(form, detail, 'pwr_m');
    detail = create_info_li(form, detail, 'vit_m');
    detail = create_info_li(form, detail, 'dex_m');
    detail = create_info_li(form, detail, 'agi_m');
    detail = create_info_li(form, detail, 'tec_m');
    detail = create_info_li(form, detail, 'luk_m');

    return detail;
}
function clear_info(form: HTMLUListElement) {
    while (form.firstChild !== null) form.removeChild(form.firstChild);
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

export function form_set(hres: C_Hero[], detail: T_Detail, idx: number):void {
    form_clr(detail);

    const hero = hres[idx].encode();
    detail['name'] .innerHTML = hero['name'] ?? '???';
    detail['sex']  .innerHTML = hero['sex']  ?.toString() ?? '???';
    detail['age']  .innerHTML = hero['age']  ?.toString() ?? '???';
    detail['gold'] .innerHTML = hero['gold'] ?.toString() ?? '???';
    detail['state'].innerHTML = hero['state']?.toString() ?? '???';
    detail['lv']   .innerHTML = hero['lv']   ?.toString() ?? '???';

    detail['exp']  .innerHTML = hero.val?.['exp']?.now?.toString() ?? '???';
    detail['skp']  .innerHTML = hero.val?.['skp']?.now?.toString() ?? '???';

    detail['hp']   .innerHTML = hero.abi?.bsc?.p?.['xp']?.toString() ?? '???';
    detail['mp']   .innerHTML = hero.abi?.bsc?.m?.['xp']?.toString() ?? '???';

    detail['atk_p']  .innerHTML = hero.abi?.bsc?.p?.['atk']?.toString() ?? '???';
    detail['def_p']  .innerHTML = hero.abi?.bsc?.p?.['def']?.toString() ?? '???';
    detail['quc_p']  .innerHTML = hero.abi?.bsc?.p?.['quc']?.toString() ?? '???';
    detail['cnc_p']  .innerHTML = hero.abi?.bsc?.p?.['cnc']?.toString() ?? '???';

    detail['str_p']  .innerHTML = hero.abi?.bsc?.p?.['str']?.toString() ?? '???';
    detail['pwr_p']  .innerHTML = hero.abi?.bsc?.p?.['pwr']?.toString() ?? '???';
    detail['vit_p']  .innerHTML = hero.abi?.bsc?.p?.['vit']?.toString() ?? '???';
    detail['dex_p']  .innerHTML = hero.abi?.bsc?.p?.['dex']?.toString() ?? '???';
    detail['agi_p']  .innerHTML = hero.abi?.bsc?.p?.['agi']?.toString() ?? '???';
    detail['tec_p']  .innerHTML = hero.abi?.bsc?.p?.['tec']?.toString() ?? '???';
    detail['luk_p']  .innerHTML = hero.abi?.bsc?.p?.['luk']?.toString() ?? '???';

    detail['atk_m']  .innerHTML = hero.abi?.bsc?.m?.['atk']?.toString() ?? '???';
    detail['def_m']  .innerHTML = hero.abi?.bsc?.m?.['def']?.toString() ?? '???';
    detail['quc_m']  .innerHTML = hero.abi?.bsc?.m?.['quc']?.toString() ?? '???';
    detail['cnc_m']  .innerHTML = hero.abi?.bsc?.m?.['cnc']?.toString() ?? '???';

    detail['str_m']  .innerHTML = hero.abi?.bsc?.m?.['str']?.toString() ?? '???';
    detail['pwr_m']  .innerHTML = hero.abi?.bsc?.m?.['pwr']?.toString() ?? '???';
    detail['vit_m']  .innerHTML = hero.abi?.bsc?.m?.['vit']?.toString() ?? '???';
    detail['dex_m']  .innerHTML = hero.abi?.bsc?.m?.['dex']?.toString() ?? '???';
    detail['agi_m']  .innerHTML = hero.abi?.bsc?.m?.['agi']?.toString() ?? '???';
    detail['tec_m']  .innerHTML = hero.abi?.bsc?.m?.['tec']?.toString() ?? '???';
    detail['luk_m']  .innerHTML = hero.abi?.bsc?.m?.['luk']?.toString() ?? '???';
}
/*******
function __form_set_abi(hero: JSON_Hero, key: string): string {
    const bsc_val = hero.abi?.bsc?.[key];
    const ttl_val = hero.abi?.ttl?.[key];
    if (bsc_val === undefined && ttl_val === undefined) return `??? (???)`;
    if (ttl_val === undefined) return `${bsc_val?.p} (???)`;

}
********/
