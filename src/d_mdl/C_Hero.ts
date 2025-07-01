"use strict";

import { C_HeroAbility, JSON_Hero_Ability} from "./C_HeroAbility";
import { I_JSON_Uniq,   JSON_Any }         from "./C_SaveInfo";
import { _get_uuid, _inrand, _irand, _random_str }  from "../d_utl/F_Rand";
import { C_GoodsList, JSON_GoodsList } from "./C_GoodsListNG";

export interface JSON_Hero extends JSON_Any {
    id?:        number, 
    uniq_id?:   string, 
    save_id?:   number, 
    name?:      string, 
    sex?:       number; 
    age?:       number; 
    gold?:      number; 
//    goods?:     JSON_GoodsList; 
    state?:     number; 
    lv?:        number; 
    val?:       JSON_Hero_Value;
    abi_p?:       {bsc?: JSON_Hero_Ability, ttl?: JSON_Hero_Ability, now?: JSON_Hero_Ability};
    abi_m?:       {bsc?: JSON_Hero_Ability, ttl?: JSON_Hero_Ability, now?: JSON_Hero_Ability};
    is_alive?:  string|boolean;
}

export interface JSON_Hero_Value extends JSON_Any {
    skp?: {ttl: number,  now: number}, 
    exp?: {ttl: number,  now: number},
    nxe?: number,                   // 次回のヒーローレベルアップに必要な経験値
}

export function alert_hres_info(a: (JSON_Hero|undefined)[]|undefined): void { 
    if (a === undefined) return;
    alert('Number of Hero = ' + a.length.toString());
    for (var i in a) {
        if (a[i] === undefined) continue;
        alert_hero_info(a[i]);
    }
}

export function alert_hero_info(a: JSON_Hero|undefined): void { 
    if (a === undefined) return;
    alert("Hero Info:\n" 
        + "\nid:       "     + (a?.id        ?? '?')
        + "\nuniq_id   "     + (a?.uniq_id   ?? '?')
        + "\nname:     "     + (a?.name      ?? '?')
        + "\nsave_id:  "     + (a?.save_id   ?? '?')
        + "\nis_alive: "     + (a?.is_alive  ?? '?')
        + "\n"
    );
}

export class C_Hero implements I_JSON_Uniq {
    protected my_id:    number;
    protected my_name:  string;
    protected uniq_id:  string; 
    protected save_id:  number; 
    protected sex:      number; 
    protected age:      number; 
    protected state:    number; 
    protected lv:       number; 
    // bsc(Basic)は当人の基本値。ttl(Total)は装備等を加減算したもの。nowはバフ等のターン制のも加減算したもの
    protected gold:     number; 
//    protected goods:    C_GoodsList; 
    protected val:      JSON_Hero_Value;
    protected abi_p:      {bsc: C_HeroAbility, ttl: C_HeroAbility, now: C_HeroAbility};
    protected abi_m:      {bsc: C_HeroAbility, ttl: C_HeroAbility, now: C_HeroAbility};

    public constructor(a?: JSON_Hero) {
        this.my_id      = 0;
        this.my_name    = 'No Name Hero';
        this.uniq_id    = 'mai_hero#' + _get_uuid();
        this.save_id    = 0;
        this.sex        = 0; 
        this.age        = 0; 
        this.gold       = 0; 
//        this.goods      = new C_GoodsList(); 
        this.state      = 0; 
        this.lv         = 0;
        this.val        = {};
        this.abi_p      = {bsc: new C_HeroAbility(), ttl: new C_HeroAbility(), now: new C_HeroAbility()};
        this.abi_m      = {bsc: new C_HeroAbility(), ttl: new C_HeroAbility(), now: new C_HeroAbility()};
//        this.is_alive   = true;
        if (a !== undefined) this.decode(a);
    }

    public set_prp(arg : JSON_Hero) {
        this.decode(arg);
    }
    public get_uniq_id(): string { return this.uniq_id}

    public id(): string {
        return 'Hero_' + this.my_id.toString(16).padStart(5, '0');
    }
    public uid(): string { return this.uniq_id;}
    public name(): string {
        return this.my_name;
    }
    public set_name(name: string): void {
        this.my_name = name;
    }


    public is_alive(): boolean {
        const hp = this.abi_p.now.get('xp') ?? 0;
        const hd = this.abi_p.now.get('xd') ?? 0;
        return hp - hd > 0;
    }


    public hp_damage(dmg: number): void {
        const xp_now = this.abi_p.now.get('xp') ?? 0;
        let   xd_now = this.abi_p.now.get('xd') ?? 0;
        xd_now += dmg;
        this.abi_p.now.set('xd', xd_now > xp_now ? xp_now : xd_now);
    }
    public hp_heal(heal: number): void {
        let   xd_now = this.abi_p.now.get('xd') ?? 0;
        xd_now -= heal;
        this.abi_p.now.set('xd', xd_now < 0 ? 0 : xd_now);
    }


    protected copy_bsc_to_ttl(): void {
        this.abi_p.ttl.decode(this.abi_p.bsc.encode());
        this.abi_m.ttl.decode(this.abi_m.bsc.encode());
    }

    protected copy_ttl_to_now(): void {
        this.abi_p.now.decode(this.abi_p.ttl.encode());
        this.abi_m.now.decode(this.abi_m.ttl.encode());
    }


    public random_make(helo_level: number = 0): C_Hero {
        this.my_id    = 0; // --Hero::$max_id;
        this.my_name  = "冒険者 " + _random_str(5);
        this.sex      = _irand( 0,     1); 
        this.age      = _irand( 15,   25); 
        this.state    = 0; 
        this.lv       = helo_level; 
        this.gold     = _irand( 500, 1000); 
        this.val      = {
            skp: {ttl: 0, now: 0}, 
            exp: {ttl: 0, now: 0},
            'nxe': 1000
        };


        const abi_p_bsc = this.abi_p.bsc;
        abi_p_bsc.random_make(helo_level);

        const abi_m_bsc = this.abi_m.bsc;
        abi_m_bsc.random_make(helo_level);

        this.copy_bsc_to_ttl();
        this.copy_ttl_to_now();

        return this;
    }


    
    public encode(): JSON_Hero {
        const ret: JSON_Hero = {
            id:        this.my_id,
            uniq_id:   this.uniq_id,
            name:      this.my_name,
            save_id:   this.save_id,
            sex:       this.sex, 
            age:       this.age, 
            state:     this.state, 
            lv:        this.lv, 
            gold:      this.gold, 
//            goods:     this.goods.encode(), 
            val:       this.val,
            abi_p_bsc: this.abi_p.bsc.encode(),
            abi_m_bsc: this.abi_m.bsc.encode(),
            abi_p_ttl: this.abi_p.ttl.encode(),
            abi_m_ttl: this.abi_m.ttl.encode(),
            abi_p_now: this.abi_p.now.encode(),
            abi_m_now: this.abi_m.now.encode(),
//            is_alive: (this.is_alive) ? 'Y' : 'N', 
        }
        return ret;
    }
    public decode(a: JSON_Hero|undefined): C_Hero {
        if (a === undefined) return this;
        if (a.id       !== undefined) this.my_id    = a.id;
        if (a.name     !== undefined) this.my_name  = a.name;
        if (a.uniq_id  !== undefined) this.uniq_id  = a.uniq_id;
        if (a.save_id  !== undefined) this.save_id  = a.save_id;
        if (a.sex      !== undefined) this.sex      = a.sex;
        if (a.age      !== undefined) this.age      = a.age;
        if (a.state    !== undefined) this.state    = a.state;
        if (a.lv       !== undefined) this.lv       = a.lv;
        if (a.gold     !== undefined) this.gold     = a.gold;
/*****************
        if (a.is_alive !== undefined) {
            if (typeof a.is_alive === "boolean") {
                this.is_alive = a.is_alive;
            } else {
                this.is_alive = (a.is_alive != 'N') ? true: false;
            }
        }
******************/

//        if (a.goods   !== undefined) this.goods.decode(a.goods);
        if (a.val     !== undefined) {
            this.__decode_val(this.val, a.val);
        }
/****************************************************************
        if (a.abi_p_bsc !== undefined) {
            this.abi_p.bsc.decode(a.abi_p_bsc);
            // 暫定
            this.abi_p.ttl = this.abi_p.now = this.abi_p.bsc;
        }
        if (a.abi_m_bsc !== undefined) {
            this.abi_m.bsc.decode(a.abi_m_bsc);
            // 暫定
            this.abi_m.ttl = this.abi_m.now = this.abi_m.bsc;
        }
****************************************************************/
        if (a.abi_p_bsc !== undefined) this.abi_p.bsc.decode(a.abi_p_bsc);
        if (a.abi_m_bsc !== undefined) this.abi_m.bsc.decode(a.abi_m_bsc);
        if (a.abi_p_ttl !== undefined) this.abi_p.ttl.decode(a.abi_p_ttl);
        if (a.abi_m_ttl !== undefined) this.abi_m.ttl.decode(a.abi_m_ttl);
        if (a.abi_p_now !== undefined) this.abi_p.now.decode(a.abi_p_now);
        if (a.abi_m_now !== undefined) this.abi_m.now.decode(a.abi_m_now);

        return this;
    }

    protected __decode_val(d: JSON_Hero_Value, s: JSON_Hero_Value): void {
        if (s.skp !== undefined) d.skp = this.__decode_skex(d.skp, s.skp);
        if (s.exp !== undefined) d.exp = this.__decode_skex(d.exp, s.exp);
        if (s.nxe !== undefined) d.nxe = s.nxe;
    }
    protected __decode_skex(a: {ttl?: number, now?: number} | undefined, s: {ttl?: number, now?: number}): {ttl: number, now: number} {
        var d: {ttl: number, now: number};
        if     (a === undefined) d = {ttl: 0, now: 0};
        else    d = {ttl: a?.ttl ?? 0, now: a?.now ?? 0};

        d.ttl = s.ttl ?? d.ttl;
        d.now = s.now ?? s.ttl ?? d.now;
        return d;
    }

    public static encode_heroes(heroes: C_Hero[]): JSON_Hero[] {
        const heroes_data = [] as JSON_Hero[];
        for (var hero of heroes) {
            heroes_data.push(hero.encode());
        }
        return heroes_data;
    }
    public static decode_heroes(heroes_data: (JSON_Hero|undefined)[]|undefined): C_Hero[] {
        const heroes = [] as C_Hero[];
        if (heroes_data !== undefined) {
            for (var hero_data of heroes_data) {
                if (hero_data !== undefined) heroes.push(new C_Hero().decode(hero_data));
            }
        }
        return heroes;
    }

    public alert(): void { 
        alert("Hero Info:\n" 
            + "\nid:       "     + (this.id        ?? '?')
            + "\nuniq_id   "     + (this.uniq_id   ?? '?')
            + "\nname:     "     + (this.name      ?? '?')
            + "\nsave_id:  "     + (this.save_id   ?? '?')
            + "\nis_alive: "     + (this.is_alive  ?? '?')
            + "\n"
        );
    }
    public static alert_hres(a: (C_Hero|undefined)[]|undefined): void { 
        if (a === undefined) return;
        alert('Number of Hero = ' + a.length.toString());
        for (var i in a) a[i]?.alert();
    }
}