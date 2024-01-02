import { C_Hero, JSON_Hero, JSON_Hero_Value  }      from "./C_Hero";
import { JSON_Hero_Ability } from "./C_HeroAbility";
import { _round } from "./F_Math";
import { _irand, _inrand }   from "./F_Rand";

const make_abi_max = {
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
    let   ha: JSON_Hero_Ability = {};

    hh.name   = '冒険者 #' + _irand(0,1000).toString(16).padStart(3, 'x');
    hh.sex    = _irand(0,1);
    hh.age    = 20 + _inrand(-5,5);
    hh.gold   = _inrand(5000, 10000);
    hh.state  = 0;
    hh.lv     = 1;

    const skp = _inrand(5, 5 + (hh.age - 15) * 10);
    hv.skp    = {ttl: skp,  now: skp};
    hv.exp    = {ttl:   0,  now:   0};
    hv.nxe    = 1000;
    hh.val    = hv;

    for (let abi in ha) {
        if (!(abi in make_abi_max)) ha[abi] = {p: -1, m: -1};
        else {
            ha[abi].p = _irand(0, make_abi_max[abi]);
            ha[abi].m = _irand(0, make_abi_max[abi]);
        }
    } 
    hh.abi = {bsc: ha, ttl: ha, now: ha};

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
    const abi = hero.encode().abi?.bsc;
    if (abi === undefined) return hero;

    let ttl: JSON_Hero_Ability = {};
    for (let idx in abi) { // 暫定版。本来は装備等の加減算を行う
        ttl[idx] = abi[idx];
    }


    ttl.xp.p += _round((ttl.str.p + ttl.vit.p) * 10, 0);
    ttl.xp.m += _round((ttl.str.m + ttl.vit.m) * 10, 0);

    ttl.atk.p += _round((ttl.str.p + ttl.pwr.p + ttl.tec.p) / 10, 0);
    ttl.atk.m += _round((ttl.str.m + ttl.pwr.m + ttl.tec.m) / 10, 0);

    ttl.def.p += _round((ttl.str.p + ttl.vit.p + ttl.tec.p) / 10, 0);
    ttl.def.m += _round((ttl.str.m + ttl.vit.m + ttl.tec.m) / 10, 0);

    ttl.quc.p += _round((ttl.agi.p + ttl.luk.p + ttl.tec.p) / 10, 0);
    ttl.quc.m += _round((ttl.agi.m + ttl.luk.m + ttl.tec.m) / 10, 0);

    ttl.cnc.p += _round((2 * ttl.luk.p + ttl.tec.p) / 10, 0);
    ttl.cnc.m += _round((2 * ttl.luk.m + ttl.tec.m) / 10, 0);

    hero.decode({abi: {ttl: ttl, now: ttl}});

    return hero;
}
