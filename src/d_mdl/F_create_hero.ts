"use strict";

import { _round }            from "../d_utl/F_Math";
import { _irand, _inrand }   from "../d_utl/F_Rand";
import { C_Hero, JSON_Hero, JSON_Hero_Value  } from "./C_Hero";
import { C_HeroAbility, JSON_Hero_Ability }    from "./C_HeroAbility";

const make_abi_ave: {[key: string]: number} = {
    xp:   50,

    atk:   5,
    def:   5,
    quc:   5,
    cnc:   5,

    str:  10,
    pwr:  10,
    vit:  10,
    dex:  10,
    agi:  10,
    tec:   0,
    luk:  10,
}

export function make_hero(): C_Hero {
    const val1 = _irand(0, 100);  // 一様分布乱数(整数)
    const val2 = _inrand(0, 100); // 正規分布乱数(整数)

    let   hh: JSON_Hero         = {};
    let   hv: JSON_Hero_Value   = {};
    let   ha_p: JSON_Hero_Ability = {};
    let   ha_m: JSON_Hero_Ability = {};

    hh.name   = '冒険者 #' + _irand(0,4093).toString(16).padStart(3, 'x');
    hh.sex    = _irand(0,1);        
    hh.age    = 20 + _irand(-5,5);  // _ig_rand
    hh.state  = 0;
    hh.lv     = 1;

    const skp = _irand(5, 5 + (hh.age - 15) * 10);
    hv.skp    = {ttl: skp,  now: skp};
    hv.exp    = {ttl:   0,  now:   0};
    hv.nxe    = 1000;
    hh.val    = hv;

    for (let abi in make_abi_ave) {
            ha_p[abi] = make_abi_ave[abi] + _irand(-make_abi_ave[abi] /2, make_abi_ave[abi] /2);
    } 
    for (let abi in make_abi_ave) {
            ha_m[abi] = make_abi_ave[abi] + _irand(-make_abi_ave[abi] /2, make_abi_ave[abi] /2);
    } 
    hh.abi_p = {bsc: ha_p, ttl: ha_p, now: ha_p};
    hh.abi_m = {bsc: ha_m, ttl: ha_m, now: ha_m};

    return new C_Hero(hh);    
}

// ヒーローレベルアップ時のアビリティ(BSC)の増加を行う
function level_up_hero(hero: C_Hero): C_Hero {return hero;}

// アビリティ(BSC)変更時のアビリティ(TTL)の再計算
// BSCの各項目に装備等のボーナスを追加して
// TTLの数値を計算する
// TTLの能力部分(xp,atk,def,quc,cnc)は
// TTLのアビリティ(str,pwr,vit,dex,agi,tec,luk)を
// 基に計算したボーナスを加算する
function calc_abi_ttl_hero(hero: C_Hero): C_Hero {
    const abi_p = hero.encode().abi_p?.bsc;
    if (abi_p === undefined) return hero;

    let ttl_p: JSON_Hero_Ability = {};
    for (let idx in abi_p) { // 暫定版。本来は装備等の加減算を行う
        ttl_p[idx] = abi_p[idx];
    }

    const abi_m = hero.encode().abi_m?.bsc;
    if (abi_m === undefined) return hero;

    let ttl_m: JSON_Hero_Ability = {};
    for (let idx in abi_m) { // 暫定版。本来は装備等の加減算を行う
        ttl_m[idx] = abi_m[idx];
    }

    const tab_p = new C_HeroAbility(ttl_p);
    ttl_p.xp  += tab_p.xp_ttladd();
    ttl_p.atk += tab_p.atk_ttladd();
    ttl_p.def += tab_p.def_ttladd();
    ttl_p.quc += tab_p.quc_ttladd();
    ttl_p.cnc += tab_p.cnc_ttladd();

    const tab_m = new C_HeroAbility(ttl_m);
    ttl_m.xp  += tab_m.xp_ttladd();
    ttl_m.atk += tab_m.atk_ttladd();
    ttl_m.def += tab_m.def_ttladd();
    ttl_m.quc += tab_m.quc_ttladd();
    ttl_m.cnc += tab_m.cnc_ttladd();

    hero.decode({
        abi_p: {ttl: ttl_p, now: ttl_p}, 
        abi_m: {ttl: ttl_m, now: ttl_m},
    });

    return hero;
}
