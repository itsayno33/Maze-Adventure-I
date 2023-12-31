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
    val?:       {bsc?: JSON_Hero_Value,   ttl?: JSON_Hero_Value,   now?: JSON_Hero_Value};
    abi?:       {bsc?: JSON_Hero_Ability, ttl?: JSON_Hero_Ability, now?: JSON_Hero_Ability};
    is_alive?:  string|boolean;
}

export type JSON_Hero_Value = {
    hp?:  {bsc?: number, add?: number, dmg?: number},
    mp?:  {bsc?: number, add?: number, dmg?: number},
    skp?: {ttl: number, now: number}, 
    exp?: {ttl: number, now: number},
    nxe?: number,                   // 次回のヒーローレベルアップに必要な経験値
    /* 以下、/* 戦闘能力の基本値(才能部分)(p:物理、m:魔法)。ヒーローレベルやステータスアップで加算 */
    atk?: {p: number, m: number},   // 攻撃値の基本値
    def?: {p: number, m: number},   // 防御値の基本値
    quc?: {p: number, m: number},   // 瞬発力の基本値
    cnc?: {p: number, m: number},   // チャンスの基本値
}

export type JSON_Hero_Ability = {
    str?: {p: number, m: number},   // 根性。攻撃/防御力にも影響。HP/MP回復やアイテムの最大所持重量にボーナス
    pwr?: {p: number, m: number},   // 基本的強さ。攻撃力に影響
    vit?: {p: number, m: number},   // 耐久力。HP/MPの最大値や防御力に影響を与える
    dex?: {p: number, m: number},   // 器用さ。命中率に影響を与える。飛び道具や長距離魔法では特に影響。罠解除にも影響
    agi?: {p: number, m: number},   // 素早さ。行動速度や回避率に影響を与える。命中率にも影響
    tec?: {p: number, m: number},   // 技術力。経験で向上して能力値(quc/cnc)にボーナスを与える
    luk?: {p: number, m: number},   // 幸運値。cncに大きく影響する
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
    protected val:      {bsc: JSON_Hero_Value,   ttl: JSON_Hero_Value,   now: JSON_Hero_Value};
    protected abi:      {bsc: JSON_Hero_Ability, ttl: JSON_Hero_Ability, now: JSON_Hero_Ability};

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
        this.val        = {bsc: {}, ttl: {}, now: {}};
        this.abi        = {bsc: {}, ttl: {}, now: {}};
        this.is_alive   = true;
        if (a !== undefined) this.decode(a);
    }
    public set_prp(arg : JSON_Hero) {
        this.decode(arg);
    }
    public id(): string {
        return 'Hero_' + this.my_id.toString(16).padStart(5, '0');
    }
    public neme(): string {
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
            val:      {bsc: this.val.bsc},
            abi:      {bsc: this.abi.bsc},
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
            const v = a.val;
            if (v.bsc !== undefined) this.__decode_val(this.val.bsc, v.bsc);
            if (v.ttl !== undefined) this.__decode_val(this.val.ttl, v.ttl);
            if (v.now !== undefined) this.__decode_val(this.val.now, v.now);
        }
        if (a.abi     !== undefined) {
            const v = a.abi;
            if (v.bsc !== undefined) this.__decode_abi(this.abi.bsc, v.bsc);
            if (v.ttl !== undefined) this.__decode_abi(this.abi.ttl, v.ttl);
            if (v.now !== undefined) this.__decode_abi(this.abi.now, v.now);
        }
        return this;
    }

    protected __decode_val(d: JSON_Hero_Value, s: JSON_Hero_Value): void {
        if (s.hp  !== undefined) d.hp  = this.__decode_hpmp(d.hp,  s.hp);
        if (s.mp  !== undefined) d.mp  = this.__decode_hpmp(d.mp,  s.mp);
        if (s.skp !== undefined) d.skp = this.__decode_skex(d.skp, s.skp);
        if (s.exp !== undefined) d.exp = this.__decode_skex(d.exp, s.exp);
        if (s.nxe !== undefined) d.nxe = s.nxe;
        if (s.atk !== undefined) d.atk = this.__decode_pm(d.atk, s.atk);
        if (s.def !== undefined) d.def = this.__decode_pm(d.def, s.def);
        if (s.quc !== undefined) d.quc = this.__decode_pm(d.quc, s?.quc);
        if (s.cnc !== undefined) d.cnc = this.__decode_pm(d.cnc, s.cnc);
    }
    protected __decode_abi(d: JSON_Hero_Ability, s: JSON_Hero_Ability): void {
        if (s.str !== undefined) d.str = this.__decode_pm(d.str, s.str);
        if (s.pwr !== undefined) d.pwr = this.__decode_pm(d.pwr, s.pwr);
        if (s.vit !== undefined) d.vit = this.__decode_pm(d.vit, s.vit);
        if (s.dex !== undefined) d.dex = this.__decode_pm(d.dex, s.dex);
        if (s.agi !== undefined) d.agi = this.__decode_pm(d.agi, s.agi);
        if (s.tec !== undefined) d.tec = this.__decode_pm(d.tec, s.tec);
        if (s.luk !== undefined) d.luk = this.__decode_pm(d.luk, s.luk);
    }
    protected __decode_hpmp(a: {bsc?: number, add?: number, dmg?: number} | undefined, s: {bsc?: number, add?: number, dmg?: number}): {bsc: number, add: number, dmg: number} {
        var d: {bsc: number, add: number, dmg: number};
        if     (a === undefined) d = {bsc: 0, add: 0, dmg: 0};
        else    d = {bsc: a?.bsc ?? 0, add: a?.add ?? 0, dmg: a?.dmg ?? 0};

        d.bsc = s.bsc ?? d.bsc;
        d.add = s.add ?? s.bsc ?? d.add;
        d.dmg = s.dmg ?? d.dmg;
        return d;
    }
    protected __decode_skex(a: {ttl?: number, now?: number} | undefined, s: {ttl?: number, now?: number}): {ttl: number, now: number} {
        var d: {ttl: number, now: number};
        if     (a === undefined) d = {ttl: 0, now: 0};
        else    d = {ttl: a?.ttl ?? 0, now: a?.now ?? 0};

        d.ttl = s.ttl ?? d.ttl;
        d.now = s.now ?? s.ttl ?? d.now;
        return d;
    }
    protected __decode_pm(a: {p?: number, m?: number} | undefined, s: {p?: number, m?: number}): {p: number, m: number} {
        var d: {p: number, m: number};

        // thisメンバ変数がundefindedだったりpかｍがundefindedだったらそこだけ0で埋めたdを作る
        if (a === undefined)  d = {p: 0, m: 0};
        else d = {p: a?.p ?? 0, m: a?.m ?? 0};

        // dにsを代入する(undefindedじゃない項目だけ)
        d.p = s.p ?? d.p;
        d.m = s.m ?? d.m;

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