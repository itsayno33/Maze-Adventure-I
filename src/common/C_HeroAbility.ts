export type JSON_PM = {
    p: number, 
    m: number,
}


export type JSON_Hero_Ability = {[key: string]: JSON_PM}
/*
{
    xp?:  JSON_PM,   // p:HP、m:MP

    // 以下、戦闘能力の基本値(p:物理、m:魔法)。ヒーローレベルやステータスアップで加算 
    atk?: JSON_PM,   // 攻撃値
    def?: JSON_PM,   // 防御値
    quc?: JSON_PM,   // 瞬発力
    cnc?: JSON_PM,   // 機運値(チャンス)

    // 以下、いわゆるステータス。上記の計算に影響。ヒーローレベルやステータスアップで加算
    str?: JSON_PM,   // 根性。攻撃/防御力にも影響。HP/MP回復やアイテムの最大所持重量にボーナス
    pwr?: JSON_PM,   // 基本的強さ。攻撃力に影響
    vit?: JSON_PM,   // 耐久力。HP/MPの最大値や防御力に影響を与える
    dex?: JSON_PM,   // 器用さ。命中率に影響を与える。飛び道具や長距離魔法では特に影響。罠解除にも影響
    agi?: JSON_PM,   // 素早さ。行動速度や回避率に影響を与える。命中率にも影響
    tec?: JSON_PM,   // 技術力。経験で向上して能力値(quc/cnc)にボーナスを与える
    luk?: JSON_PM,   // 幸運値。cncに大きく影響する
}
*/

export class C_HeroAbility {
    protected v: JSON_Hero_Ability = {
        xp:  {p:0, m:0},  // p:HP、m:MP

        atk: {p:0, m:0},  // 攻撃値
        def: {p:0, m:0},  // 防御値
        quc: {p:0, m:0},  // 瞬発力
        cnc: {p:0, m:0},  // 機運値(チャンス)
    
        str: {p:0, m:0},  // 根性。攻撃/防御力にも影響。HP/MP回復やアイテムの最大所持重量にボーナス
        pwr: {p:0, m:0},  // 基本的強さ。攻撃力に影響
        vit: {p:0, m:0},  // 耐久力。HP/MPの最大値や防御力に影響を与える
        dex: {p:0, m:0},  // 器用さ。命中率に影響を与える。飛び道具や長距離魔法では特に影響。罠解除にも影響
        agi: {p:0, m:0},  // 素早さ。行動速度や回避率に影響を与える。命中率にも影響
        tec: {p:0, m:0},  // 技術力。経験で向上して能力値(quc/cnc)にボーナスを与える
        luk: {p:0, m:0},  // 幸運値。cncに大きく影響する
    };

    public constructor(a?: JSON_Hero_Ability) {
        if (a !== undefined) this.decode(a);
    }
    public set_prp(a: JSON_Hero_Ability): void {
        this.decode(a);
    }
    public get_pm(key: string): JSON_PM | null {
        if (!(key in this.v)) return null;
        return this.__clone_pm(key);
    }
    public get_p(key: string): number | null {
        if (!(key in this.v)) return null;
        return this.v[key].p;
    }
    public get_m(key: string): number | null {
        if (!(key in this.v)) return null;
        return this.v[key].p;
    }
    public set_pm(key: string, s: JSON_Hero_Ability) {
        if (!(key in this.v)) return null;
        this.v[key].p = s[key].p;
        this.v[key].m = s[key].m;
    }

    protected __clone_pm(key: string): JSON_PM {
        const a = {} as JSON_PM;
        a.p = this.v[key].p;
        a.m = this.v[key].m;
        return a;
    }
    protected __clone_all(): JSON_Hero_Ability {
        const a: JSON_Hero_Ability = {};

        for (let key in this.v) {
            a[key] = this.__clone_pm(key);
        }
        return a;
    }

    public add(a: JSON_Hero_Ability): void {
        for (let key in a) {
            this.v[key].p += a[key].p;
            this.v[key].m += a[key].m;
        }
    } 
    public encode(): JSON_Hero_Ability {
            return this.__clone_all();
    }
    public decode(a: JSON_Hero_Ability): void {
        for (let key in a) {
            this.v[key].p = a[key].p;
            this.v[key].m = a[key].m;
        }
    }
}


