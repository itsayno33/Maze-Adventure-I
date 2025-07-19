"use strict";

import { _get_uuid, _random_str } from "../d_utl/F_Rand";
import { C_Hero, I_Hero, JSON_Hero } from "./C_Hero";


export interface JSON_Wndr extends JSON_Hero {
    boss_level?: number;
    family?:     string;
}

export interface I_Wndr extends I_Hero {
    boss_level():               number;
    set_boss_level(n: number):  I_Wndr;
    hero_bonus(n: number):      number;
    random_make(lv_p?: number, lv_m?: number):   C_Wndr;
    encode():                   JSON_Wndr;
    decode(j?: JSON_Wndr):      I_Wndr;
}

export class C_Wndr extends C_Hero implements I_Wndr {
    protected _boss_level: number = 0;    // ボスレベル 0:通常, 1:小ボス, 2:中ボス, 3:大ボス
    protected _family: string = '放浪者'; // 放浪者, Wanderer

    public constructor(j?: JSON_Wndr) {
        super(j);
        this.my_name    = 'No Name Wonder';
        if (j !== undefined) this.__init(j);
    }

    protected __init(j?: JSON_Wndr): C_Wndr {
        super.__init(j);
        if (j?.boss_level !== undefined) this._boss_level = j.boss_level;
        if (j?.family     !== undefined) this._family = j.family;
        return this;
    }
    public free() {
        super.free();
    }

    public boss_level(): number {
        return this._boss_level;
    }
    public set_boss_level(n: number): C_Wndr {
        if (n < 0 || n > 3) { // ボスレベルは0から3まで
            n = 0;
        }
        this._boss_level = n;
        return this;
    }

    public hero_bonus(n: number): number {
        return n * ( this.lv + this._boss_level + 1 );
    }

    public random_make(hero_level_p: number = 1, hero_level_m: number = 0): C_Wndr {
        super.random_make(hero_level_p, hero_level_m);
        this.my_name  = `${this._family} ${_random_str(5)}`;
        return this;
    }

    public encode(): JSON_Wndr {
        const j = super.encode();
        j.boss_level = this._boss_level;
        j.family     = this._family;

        return j;
    }

    public decode(j?: JSON_Wndr): C_Wndr {
        return this.__init(j);
    }
}
