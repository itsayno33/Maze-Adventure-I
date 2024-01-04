// 一般に使えるユーティリティな呪文
// オブジェクトを列挙型として型化するのに利用
import { _round } from "./F_Math";
import {T_MakeEnumType} from "./T_MakeEnumType";

export type JSON_Hero_Ability = {p: __JSON_Hero_Ability_mono, m: __JSON_Hero_Ability_mono}
type __JSON_Hero_Ability_mono = {[key: string]: number}

const T_HAK = { // HeroAbilityKeys
    xp:   1,   // p:HP、m:MP

    // 以下、戦闘能力の基本値(p:物理、m:魔法)。ヒーローレベルやステータスアップで加算 
    atk:  2,   // 攻撃値
    def:  3,   // 防御値
    quc:  4,   // 瞬発力
    cnc:  5,   // 機運値(チャンス)

    // 以下、いわゆるステータス。上記の計算に影響。ヒーローレベルやステータスアップで加算
    str: 11,   // 根性。攻撃/防御力にも影響。HP/MP回復やアイテムの最大所持重量にボーナス
    pwr: 12,   // 基本的強さ。攻撃力に影響
    vit: 13,   // 耐久力。HP/MPの最大値や防御力に影響を与える
    dex: 14,   // 器用さ。命中率に影響を与える。飛び道具や長距離魔法では特に影響。罠解除にも影響
    agi: 15,   // 素早さ。行動速度や回避率に影響を与える。命中率にも影響
    tec: 16,   // 技術力。経験で向上して能力値(quc/cnc)にボーナスを与える
    luk: 17,   // 幸運値。cncに大きく影響する
    max: 17
}  as const;
export type T_HAK   = T_MakeEnumType<typeof T_HAK>;

export class C_HeroAbility {
    protected p: __JSON_Hero_Ability_mono = {
        xp:  0,  // p:HP、m:MP

        atk: 0,  // 攻撃値
        def: 0,  // 防御値
        quc: 0,  // 瞬発力
        cnc: 0,  // 機運値(チャンス)
    
        str: 0,  // 根性。攻撃/防御力にも影響。HP/MP回復やアイテムの最大所持重量にボーナス
        pwr: 0,  // 基本的強さ。攻撃力に影響
        vit: 0,  // 耐久力。HP/MPの最大値や防御力に影響を与える
        dex: 0,  // 器用さ。命中率に影響を与える。飛び道具や長距離魔法では特に影響。罠解除にも影響
        agi: 0,  // 素早さ。行動速度や回避率に影響を与える。命中率にも影響
        tec: 0,  // 技術力。経験で向上して能力値(quc/cnc)にボーナスを与える
        luk: 0,  // 幸運値。cncに大きく影響する
    };
    protected m: __JSON_Hero_Ability_mono = {
        xp:  0,  // p:HP、m:MP

        atk: 0,  // 攻撃値
        def: 0,  // 防御値
        quc: 0,  // 瞬発力
        cnc: 0,  // 機運値(チャンス)
    
        str: 0,  // 根性。攻撃/防御力にも影響。HP/MP回復やアイテムの最大所持重量にボーナス
        pwr: 0,  // 基本的強さ。攻撃力に影響
        vit: 0,  // 耐久力。HP/MPの最大値や防御力に影響を与える
        dex: 0,  // 器用さ。命中率に影響を与える。飛び道具や長距離魔法では特に影響。罠解除にも影響
        agi: 0,  // 素早さ。行動速度や回避率に影響を与える。命中率にも影響
        tec: 0,  // 技術力。経験で向上して能力値(quc/cnc)にボーナスを与える
        luk: 0,  // 幸運値。cncに大きく影響する
    };

    public constructor(a?: JSON_Hero_Ability) {
        for (let idx in this.p) {this.p[idx] = 0;}
        for (let idx in this.m) {this.m[idx] = 0;}
        if (a !== undefined) this.decode(a);
    }
    public set_prp(a: JSON_Hero_Ability): void {
        this.decode(a);
    }
    public get_p(key: string): number | undefined {
        if (!(key in this.p)) return undefined;
        return this.p[key];
    }
    public get_m(key: string): number | undefined {
        if (!(key in this.m)) return undefined;
        return this.m[key];
    }
    public set_p(key: string, s: __JSON_Hero_Ability_mono): number | undefined {
        if (!(key in this.p)) return undefined;
        this.p[key] = s[key];
        return s[key];
    }
    public set_m(key: string, s: __JSON_Hero_Ability_mono): number | undefined {
        if (!(key in this.m)) return undefined;
        this.m[key] = s[key];
        return s[key];
    }

    public xp_ttladd_p(): number {
        return _round(Math.floor(this.p.str + this.p.vit * 10.0), 0);
    }
    public xp_ttladd_m(): number {
        return _round(Math.floor(this.m.str + this.m.vit * 10.0), 0);
    }
    public atk_ttladd_p(): number {
        return _round(Math.floor(this.p.str + this.p.pwr + this.p.tec) / 10.0, 0);
    }
    public atk_ttladd_m(): number {
        return _round(Math.floor(this.m.str + this.m.pwr + this.m.tec) / 10.0, 0);
    }
    public def_ttladd_p(): number {
        return _round(Math.floor(this.p.str + this.p.vit + this.p.tec) / 10.0, 0);
    }
    public def_ttladd_m(): number {
        return _round(Math.floor(this.m.str + this.m.vit + this.m.tec) / 10.0, 0);
    }
    public quc_ttladd_p(): number {
        return _round(Math.floor(this.p.agi + this.p.luk + this.p.tec) / 10.0, 0);
    }
    public quc_ttladd_m(): number {
        return _round(Math.floor(this.m.agi + this.m.luk + this.m.tec) / 10.0, 0);
    }
    public cnc_ttladd_p(): number {
        return _round(Math.floor(2.0 * this.p.luk + this.p.tec) / 10.0, 0);
    }
    public cnc_ttladd_m(): number {
        return _round(Math.floor(2.0 * this.m.luk + this.m.tec) / 10.0, 0);
    }

    public bonus_p(key : string): number {
        if (!(key in this.p)) return 0;
        if (key === 'xp') return _round(Math.floor(this.p.xp / 100), 0);
        return _round(Math.floor(this.p[key] / 10.0), 0);
    }

    public bonus_m(key : string): number {
        if (!(key in this.m)) return 0;
        if (key === 'xp') return _round(Math.floor(this.m.xp / 100), 0);
        return _round(Math.floor(this.m[key] / 10.0), 0);
    }

    protected __clone_all(): JSON_Hero_Ability {
        const a: JSON_Hero_Ability = {p: {}, m:{}};
        
        for (let key in this.p) {
            a.p[key] = this.p[key];
        }
        for (let key in this.m) {
            a.m[key] = this.m[key];
        }
        return a;
    }

    public add_p(a: __JSON_Hero_Ability_mono): void {
        for (let key in a) {
            this.p[key] += a[key];
        }
    } 
    public add_m(a: __JSON_Hero_Ability_mono): void {
        for (let key in a) {
            this.m[key] += a[key];
        }
    } 

    public encode(): JSON_Hero_Ability {
            return this.__clone_all();
    }
    public decode(a: JSON_Hero_Ability): void {
        for (let key in a.p) {
            this.p[key] = a.p[key];
        }
        for (let key in a.m) {
            this.m[key] = a.m[key];
        }
    }

    public static clone(s: C_HeroAbility): C_HeroAbility {
        return new C_HeroAbility(s.encode());
    }
}


