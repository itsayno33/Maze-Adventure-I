import { C_Hero } from '../d_mdl/C_Hero';

type T_Detail = {[key: string]: HTMLLIElement}

export function hero_info_create(form: HTMLUListElement): T_Detail {
    var detail = {} as T_Detail;
    hero_info_clear(form);

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

    detail = create_info_li(form, detail, 'str_p');
    detail = create_info_li(form, detail, 'pwr_p');
    detail = create_info_li(form, detail, 'vit_p');
    detail = create_info_li(form, detail, 'dex_p');
    detail = create_info_li(form, detail, 'agi_p');
    detail = create_info_li(form, detail, 'tec_p');
    detail = create_info_li(form, detail, 'luk_p');

    detail = create_info_li(form, detail, 'atk_m');
    detail = create_info_li(form, detail, 'def_m');
    detail = create_info_li(form, detail, 'quc_m');
    detail = create_info_li(form, detail, 'cnc_m');

    detail = create_info_li(form, detail, 'str_m');
    detail = create_info_li(form, detail, 'pwr_m');
    detail = create_info_li(form, detail, 'vit_m');
    detail = create_info_li(form, detail, 'dex_m');
    detail = create_info_li(form, detail, 'agi_m');
    detail = create_info_li(form, detail, 'tec_m');
    detail = create_info_li(form, detail, 'luk_m');

    return detail;
}
export function hero_info_clear(form: HTMLUListElement) {
    while (form.firstChild !== null) form.removeChild(form.firstChild);
}
function create_info_li(form: HTMLUListElement, detail: T_Detail, key:string): T_Detail {
    const id = '_hr_' + key;
    const li = document.createElement('li') as HTMLLIElement;
    li.id    = id;
    if (li !== undefined) {form.appendChild(li); detail[key] = li;}
    return detail;
}


function hero_info_form_clr(detail: T_Detail):void {
    for (let key in detail) detail[key].innerText  = '';
}

export function hero_info_form_set(hres: C_Hero[], detail: T_Detail, idx: number):void {
    hero_info_form_clr(detail);

    const hero = hres[idx].encode();
    detail['name'] .innerHTML = '名　前:<br />' +  (hero['name'] ?? '???');
    detail['sex']  .innerHTML = '性　別:<br />' + ((hero['sex'] != 0) ? '♂' : '♀');
    detail['age']  .innerHTML = '年　齢:<br />' + ((hero['age']?.toString() ?? '???')) + ' 歳';
    detail['state'].innerHTML = '状　態:<br />' + ((hero['state'] == 0)? '正常' : '異常');
    detail['lv']   .innerHTML = 'レベル:<br />' +  (hero['lv']?.toString() ?? '???');
    detail['gold'] .innerHTML = '所持金:<br />' +  (hero['gold']?.toString() ?? '???') + ' Gold';

    detail['exp']  .innerHTML = '経験値:<br />' +  (hero.val?.['exp']?.now?.toString() ?? '???');
    detail['skp']  .innerHTML = 'ｽｷﾙ値 :<br />' +  (hero.val?.['skp']?.now?.toString() ?? '???');

    detail['hp']   .innerHTML = 'Ｈ　Ｐ:<br />' +  ((hero.abi_p_now?.['xp'] ?? 0) - (hero.abi_p_now?.['xd'] ?? 0)).toString()  + ' / ' +  (hero.abi_p_now?.['xp']?.toString() ?? '???');
    detail['mp']   .innerHTML = 'Ｍ　Ｐ:<br />' +  ((hero.abi_m_now?.['xp'] ?? 0) - (hero.abi_m_now?.['xd'] ?? 0)).toString()  + ' / ' +  (hero.abi_m_now?.['xp']?.toString() ?? '???');

    detail['atk_p']  .innerHTML = '攻撃力(物理):<br />' + (hero.abi_p_now?.['atk']?.toString() ?? '???') + ' / ' + (hero.abi_p_bsc?.['atk']?.toString() ?? '???');
    detail['def_p']  .innerHTML = '防御力(物理):<br />' + (hero.abi_p_now?.['def']?.toString() ?? '???') + ' / ' + (hero.abi_p_bsc?.['def']?.toString() ?? '???');
    detail['quc_p']  .innerHTML = '俊敏力(物理):<br />' + (hero.abi_p_now?.['quc']?.toString() ?? '???') + ' / ' + (hero.abi_p_bsc?.['quc']?.toString() ?? '???');
    detail['cnc_p']  .innerHTML = '目敏さ(物理):<br />' + (hero.abi_p_now?.['cnc']?.toString() ?? '???') + ' / ' + (hero.abi_p_bsc?.['cnc']?.toString() ?? '???');

    detail['str_p']  .innerHTML = 'ＳＴＲ(物理):<br />' + (hero.abi_p_now?.['str']?.toString() ?? '???') + ' / ' + (hero.abi_p_bsc?.['str']?.toString() ?? '???');
    detail['pwr_p']  .innerHTML = 'ＰＷＲ(物理):<br />' + (hero.abi_p_now?.['pwr']?.toString() ?? '???') + ' / ' + (hero.abi_p_bsc?.['pwr']?.toString() ?? '???');
    detail['vit_p']  .innerHTML = 'ＶＩＴ(物理):<br />' + (hero.abi_p_now?.['vit']?.toString() ?? '???') + ' / ' + (hero.abi_p_bsc?.['vit']?.toString() ?? '???');
    detail['dex_p']  .innerHTML = 'ＤＥＸ(物理):<br />' + (hero.abi_p_now?.['dex']?.toString() ?? '???') + ' / ' + (hero.abi_p_bsc?.['dex']?.toString() ?? '???');
    detail['agi_p']  .innerHTML = 'ＡＧＩ(物理):<br />' + (hero.abi_p_now?.['agi']?.toString() ?? '???') + ' / ' + (hero.abi_p_bsc?.['agi']?.toString() ?? '???');
    detail['tec_p']  .innerHTML = 'ＴＥＣ(物理):<br />' + (hero.abi_p_now?.['tec']?.toString() ?? '???') + ' / ' + (hero.abi_p_bsc?.['tec']?.toString() ?? '???');
    detail['luk_p']  .innerHTML = 'ＬＵＫ(物理):<br />' + (hero.abi_p_now?.['luk']?.toString() ?? '???') + ' / ' + (hero.abi_p_bsc?.['luk']?.toString() ?? '???');
  
    detail['atk_m']  .innerHTML = '攻撃力(魔法):<br />' + (hero.abi_m_now?.['atk']?.toString() ?? '???') + ' / ' + (hero.abi_m_bsc?.['atk']?.toString() ?? '???');
    detail['def_m']  .innerHTML = '防御力(魔法):<br />' + (hero.abi_m_now?.['def']?.toString() ?? '???') + ' / ' + (hero.abi_m_bsc?.['def']?.toString() ?? '???');
    detail['quc_m']  .innerHTML = '俊敏力(魔法):<br />' + (hero.abi_m_now?.['quc']?.toString() ?? '???') + ' / ' + (hero.abi_m_bsc?.['quc']?.toString() ?? '???');
    detail['cnc_m']  .innerHTML = '目敏さ(魔法):<br />' + (hero.abi_m_now?.['cnc']?.toString() ?? '???') + ' / ' + (hero.abi_m_bsc?.['cnc']?.toString() ?? '???');

    detail['str_m']  .innerHTML = 'ＳＴＲ(魔法):<br />' + (hero.abi_m_now?.['str']?.toString() ?? '???') + ' / ' + (hero.abi_m_bsc?.['str']?.toString() ?? '???');
    detail['pwr_m']  .innerHTML = 'ＰＷＲ(魔法):<br />' + (hero.abi_m_now?.['pwr']?.toString() ?? '???') + ' / ' + (hero.abi_m_bsc?.['pwr']?.toString() ?? '???');
    detail['vit_m']  .innerHTML = 'ＶＩＴ(魔法):<br />' + (hero.abi_m_now?.['vit']?.toString() ?? '???') + ' / ' + (hero.abi_m_bsc?.['vit']?.toString() ?? '???');
    detail['dex_m']  .innerHTML = 'ＤＥＸ(魔法):<br />' + (hero.abi_m_now?.['dex']?.toString() ?? '???') + ' / ' + (hero.abi_m_bsc?.['dex']?.toString() ?? '???');
    detail['agi_m']  .innerHTML = 'ＡＧＩ(魔法):<br />' + (hero.abi_m_now?.['agi']?.toString() ?? '???') + ' / ' + (hero.abi_m_bsc?.['agi']?.toString() ?? '???');
    detail['tec_m']  .innerHTML = 'ＴＥＣ(魔法):<br />' + (hero.abi_m_now?.['tec']?.toString() ?? '???') + ' / ' + (hero.abi_m_bsc?.['tec']?.toString() ?? '???');
    detail['luk_m']  .innerHTML = 'ＬＵＫ(魔法):<br />' + (hero.abi_m_now?.['luk']?.toString() ?? '???') + ' / ' + (hero.abi_m_bsc?.['luk']?.toString() ?? '???');
}
/*******
function __form_set_abi(hero: JSON_Hero, key: string): string {
    const bsc_val = hero.abi?.bsc?.[key];
    const ttl_val = hero.abi?.ttl?.[key];
    if (bsc_val === undefined && ttl_val === undefined) return `??? (???)`;
    if (ttl_val === undefined) return `${bsc_val?.p} (???)`;

}
********/
