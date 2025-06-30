"use strict";

import { I_JSON, JSON_Any } from "./C_SaveInfo";
import { _round }           from "../d_utl/F_Math";
import { _inrand } from "../d_utl/F_Rand";

// 一般に使えるユーティリティな呪文
// オブジェクトを列挙型として型化するのに利用
type T_HeroAbility = {[key: string]: number};
export interface JSON_Hero_Ability extends JSON_Any {[key: string]: number}

export class C_HeroAbility implements I_JSON {
    protected v: T_HeroAbility = {
        xp:  0,  // p:HP、m:MP

        // 以下、戦闘能力の基本値(p:物理、m:魔法)。ヒーローレベルやステータスアップで加算 
        atk: 0,  // 攻撃値
        def: 0,  // 防御値
        quc: 0,  // 瞬発力
        cnc: 0,  // 機運値(チャンス)
    
        // 以下、いわゆるステータス。上記の計算に影響。ヒーローレベルやステータスアップで加算
        str: 0,  // 根性。攻撃/防御力にも影響。HP/MP回復やアイテムの最大所持重量にボーナス
        pwr: 0,  // 基本的強さ。攻撃力に影響
        vit: 0,  // 耐久力。HP/MPの最大値や防御力、回復値に影響を与える
        dex: 0,  // 器用さ。命中率に影響を与える。飛び道具や長距離魔法では特に影響。罠解除にも影響
        agi: 0,  // 素早さ。行動速度や回避率に影響を与える。命中率にも影響
        tec: 0,  // 技術力。経験で向上して能力値(quc/cnc)にボーナスを与える
        luk: 0,  // 幸運値。cncに大きく影響する
    };

    public constructor(a?: JSON_Hero_Ability) {
        for (let idx in this.v) {this.v[idx] = 0;}
        if (a !== undefined) this.decode(a);
    }
    public set_prp(a: JSON_Hero_Ability): void {
        this.decode(a);
    }
    public get(key: string): number | undefined {
        if (!(key in this.v)) return undefined;
        return this.v[key];
    }
    public set(key: string, s: JSON_Hero_Ability): number | undefined {
        if (!(key in this.v)) return undefined;
        this.v[key] = s[key];
        return s[key];
    }

    public xp_ttladd(): number {
        return _round(Math.floor(this.v.str + this.v.vit * 10.0), 0);
    }
    public atk_ttladd(): number {
        return _round(Math.floor(this.v.str + this.v.pwr + this.v.tec) / 10.0, 0);
    }
    public def_ttladd(): number {
        return _round(Math.floor(this.v.str + this.v.vit + this.v.tec) / 10.0, 0);
    }
    public quc_ttladd(): number {
        return _round(Math.floor(this.v.agi + this.v.luk + this.v.tec) / 10.0, 0);
    }
    public cnc_ttladd(): number {
        return _round(Math.floor(2.0 * this.v.luk + this.v.tec) / 10.0, 0);
    }

    public bonus(key : string): number {
        if (!(key in this.v)) return 0;
        if (key === 'xp') return _round(Math.floor(this.v.xp / 100), 0);
        return _round(Math.floor(this.v[key] / 10.0), 0);
    }

    public add(a: JSON_Hero_Ability): void {
        for (let key in a) {
            this.v[key] += a[key];
        }
    } 

/*****************************************************
    public add_xp_bonus(bonus: number): void {
        this.v.xp  +=  bonus;
    }
    public add_el_bonus(bonus: number): void {
        this.v.atk +=  bonus;
        this.v.def +=  bonus;
        this.v.quc +=  bonus;
        this.v.cnc +=  bonus;
    }
*****************************************************/

    public add_pr_bonus(bonus: number): void {
        this.v.str +=  bonus;
        this.v.pwr +=  bonus;
        this.v.vit +=  bonus;
        this.v.dex +=  bonus;
        this.v.agi +=  bonus;
        this.v.tec +=  bonus;
        this.v.luk +=  bonus;
    }

    public calc_xp(): void {
        this.v.xp  =  Math.ceil(20.0 * this.v.str + 20.0 * this.v.vit + 5.0 * this.v.tec + 5.0 * this.v.luk);
//        this.v.xp  =  _inrand(0, 1000, 3.0);
    }

    public calc_el(): void {
        this.v.atk =  Math.ceil(2.0 * this.v.str + 2.0 * this.v.pwr + 1.0 * this.v.tec);
        this.v.def =  Math.ceil(2.0 * this.v.str + 2.0 * this.v.vit + 1.0 * this.v.tec);
        this.v.quc =  Math.ceil(2.0 * this.v.dex + 2.0 * this.v.agi + 1.0 * this.v.tec);
        this.v.cnc =  Math.ceil(3.0 * this.v.luk                    + 2.0 * this.v.tec);
    }

    public random_make(): C_HeroAbility {
/****************
        this.v.xp  =  _inrand(0, 1000, 3.0);

        this.v.atk =  _inrand(0,  100, 2.5);
        this.v.def =  _inrand(0,  100, 2.5);
        this.v.quc =  _inrand(0,  100, 2.5);
        this.v.cnc =  _inrand(0,  100, 2.5);
*****************/

        this.v.str =  _inrand(5,   20, 2.0);
        this.v.pwr =  _inrand(5,   20, 2.0);
        this.v.vit =  _inrand(5,   20, 2.0);
        this.v.dex =  _inrand(5,   20, 2.0);
        this.v.agi =  _inrand(5,   20, 2.0);
        this.v.tec =  _inrand(5,   20, 2.0);
        this.v.luk =  _inrand(5,   20, 2.0);

        
        this.calc_xp();
        this.calc_el();

        return this;
    }

    public encode(): JSON_Hero_Ability {
        const a: JSON_Hero_Ability = {};
        for (let key in this.v) a[key] = this.v[key];
        return a;
    }
    public decode(a: JSON_Hero_Ability): C_HeroAbility {
        for (let key in a) {
            if (key in this.v && a[key] !== undefined) this.v[key] = a[key];
        }
        return this;
    }

    public static clone(s: C_HeroAbility): C_HeroAbility {
        return new C_HeroAbility(s.encode());
    }
}


