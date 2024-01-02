import { C_Hero, JSON_Hero, JSON_Hero_Value  } from "./C_Hero";
import { C_HeroAbility, JSON_Hero_Ability }    from "./C_HeroAbility";
import { _round }            from "./F_Math";
import { _irand, _inrand }   from "./F_Rand";

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
    let   ha: JSON_Hero_Ability = {p:{}, m:{}};

    hh.name   = '冒険者 #' + _irand(0,4093).toString(16).padStart(3, 'x');
    hh.sex    = _irand(0,1);        
    hh.age    = 20 + _irand(-5,5);  // _ig_rand
    hh.gold   = _irand(5000, 10000);// _ig_rand
    hh.state  = 0;
    hh.lv     = 1;

    const skp = _irand(5, 5 + (hh.age - 15) * 10);
    hv.skp    = {ttl: skp,  now: skp};
    hv.exp    = {ttl:   0,  now:   0};
    hv.nxe    = 1000;
    hh.val    = hv;

    for (let abi in make_abi_ave) {
            ha.p[abi] = make_abi_ave[abi] + _irand(-make_abi_ave[abi] /2, make_abi_ave[abi] /2);
    } 
    for (let abi in make_abi_ave) {
            ha.m[abi] = make_abi_ave[abi] + _irand(-make_abi_ave[abi] /2, make_abi_ave[abi] /2);
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

    let ttl: JSON_Hero_Ability = {p:{}, m:{}};
    for (let idx in abi) { // 暫定版。本来は装備等の加減算を行う
        ttl.p[idx] = abi.p[idx];
        ttl.m[idx] = abi.m[idx];
    }

    const tab = new C_HeroAbility(ttl);

    ttl.p.xp +=  tab.xp_ttladd_p();
    ttl.m.xp +=  tab.xp_ttladd_m();

    ttl.p.atk += tab.atk_ttladd_p();
    ttl.m.atk += tab.atk_ttladd_m();

    ttl.p.def += tab.def_ttladd_p();
    ttl.m.def += tab.def_ttladd_m();

    ttl.p.quc += tab.quc_ttladd_p();
    ttl.m.quc += tab.quc_ttladd_m();

    ttl.p.cnc += tab.cnc_ttladd_p();
    ttl.m.cnc += tab.cnc_ttladd_m();

    hero.decode({abi: {ttl: ttl, now: ttl}});

    return hero;
}
