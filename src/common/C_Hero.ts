import { C_HeroAbility, JSON_Hero_Ability} from "./C_HeroAbility";

export type JSON_Hero = {
    id?:        number, 
    save_id?:   number, 
    team_id?:   number, 
    name?:      string, 
    sex?:       number; 
    age?:       number; 
    gold?:      number; 
    state?:     number; 
    lv?:        number; 
    val?:       JSON_Hero_Value;
    abi_p?:       {bsc?: JSON_Hero_Ability, ttl?: JSON_Hero_Ability, now?: JSON_Hero_Ability};
    abi_m?:       {bsc?: JSON_Hero_Ability, ttl?: JSON_Hero_Ability, now?: JSON_Hero_Ability};
    is_alive?:  string|boolean;
}

export type JSON_Hero_Value = {
    skp?: {ttl: number,  now: number}, 
    exp?: {ttl: number,  now: number},
    nxe?: number,                   // 次回のヒーローレベルアップに必要な経験値
}

export function alert_heroes_info(a: (JSON_Hero|undefined)[]|undefined): void { 
    if (a === undefined) return;
    alert('Number of Hero = ' + a.length.toString());
    for (var i in a) {
        if (a[i] === undefined) continue;
        alert("Hero[" + i.toString() + "] Info:\n" 
            + "\nid:       "     + (a[i]?.id        ?? '?')
            + "\nname:     "     + (a[i]?.name      ?? '?')
            + "\nsave_id:  "     + (a[i]?.save_id   ?? '?')
            + "\nteam_id:  "     + (a[i]?.team_id   ?? '?')
            + "\nis_alive: "     + (a[i]?.is_alive  ?? '?')
            + "\n"
        );
    }
}

export class C_Hero {
    protected my_id:    number;
    protected my_name:  string;
    protected save_id:  number; 
    protected team_id:  number; 
    protected sex:      number; 
    protected age:      number; 
    protected gold:     number; 
    protected state:    number; 
    protected lv:       number; 
    // bsc(Basic)は当人の基本値。ttl(Total)は装備等を加減算したもの。nowはバフ等のターン制のも加減算したもの
    protected val:      JSON_Hero_Value;
    protected abi_p:      {bsc: C_HeroAbility, ttl: C_HeroAbility, now: C_HeroAbility};
    protected abi_m:      {bsc: C_HeroAbility, ttl: C_HeroAbility, now: C_HeroAbility};

    protected is_alive: boolean;

    public constructor(a?: JSON_Hero) {
        this.my_id      = 0;
        this.my_name    = 'No Name Hero';
        this.save_id    = 0;
        this.team_id    = 0;
        this.sex        = 0; 
        this.age        = 0; 
        this.gold       = 0; 
        this.state      = 0; 
        this.lv         = 0;
        this.val        = {};
        this.abi_p      = {bsc: new C_HeroAbility(), ttl: new C_HeroAbility(), now: new C_HeroAbility()};
        this.abi_m      = {bsc: new C_HeroAbility(), ttl: new C_HeroAbility(), now: new C_HeroAbility()};
        this.is_alive   = true;
        if (a !== undefined) this.decode(a);
    }
    public set_prp(arg : JSON_Hero) {
        this.decode(arg);
    }
    public id(): string {
        return 'Hero_' + this.my_id.toString(16).padStart(5, '0');
    }
    public name(): string {
        return this.my_name;
    }
    public encode(): JSON_Hero {
        const ret: JSON_Hero = {
            id:        this.my_id,
            name:      this.my_name,
            save_id:   this.save_id,
            team_id:   this.team_id,
            sex:       this.sex, 
            age:       this.age, 
            gold:      this.gold, 
            state:     this.state, 
            lv:        this.lv, 
            val:       this.val,
            abi_p:    {bsc: this.abi_p.bsc.encode()},
            abi_m:    {bsc: this.abi_m.bsc.encode()},
            is_alive: (this.is_alive) ? 'Y' : 'N', 
        }
        return ret;
    }
    public decode(a: JSON_Hero|undefined): C_Hero {
        if (a === undefined) return this;
        if (a.id       !== undefined) this.my_id   = a.id;
        if (a.name     !== undefined) this.my_name = a.name;
        if (a.save_id  !== undefined) this.save_id = a.save_id;
        if (a.team_id  !== undefined) this.team_id = a.team_id;
        if (a.sex      !== undefined) this.sex     = a.sex;
        if (a.age      !== undefined) this.age     = a.age;
        if (a.gold     !== undefined) this.gold    = a.gold;
        if (a.state    !== undefined) this.state   = a.state;
        if (a.lv       !== undefined) this.lv      = a.lv;
        if (a.is_alive !== undefined) {
            if (typeof a.is_alive === "boolean") {
                this.is_alive = a.is_alive;
            } else {
                this.is_alive = (a.is_alive != 'N') ? true: false;
            }
        }
        if (a.val     !== undefined) {
            this.__decode_val(this.val, a.val);
        }
        if (a.abi_p   !== undefined) {
            const v = a.abi_p;
            if (v.bsc !== undefined) this.abi_p.bsc.decode(v.bsc);
            if (v.ttl !== undefined) this.abi_p.ttl.decode(v.ttl);
            if (v.now !== undefined) this.abi_p.now.decode(v.now);
        }
        if (a.abi_m   !== undefined) {
            const v = a.abi_m;
            if (v.bsc !== undefined) this.abi_m.bsc.decode(v.bsc);
            if (v.ttl !== undefined) this.abi_m.ttl.decode(v.ttl);
            if (v.now !== undefined) this.abi_m.now.decode(v.now);
        }
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

    public static create_hero(): C_Hero {
        const new_hero = new C_Hero();
        new_hero.set_prp({id:    Math.floor(-1000.0 * Math.random())});
        new_hero.set_prp({name:  new_hero.id()});
        return new_hero;
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
                heroes.push(new C_Hero().decode(hero_data));
            }
        }
        return heroes;
    }
}