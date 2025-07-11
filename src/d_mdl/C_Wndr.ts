"use strict";

import { _get_uuid, _random_str } from "../d_utl/F_Rand";
import { C_Hero, I_Hero, JSON_Hero } from "./C_Hero";


export interface JSON_Wndr extends JSON_Hero {}

export interface I_Wndr extends I_Hero {}

export class C_Wndr extends C_Hero implements I_Wndr {
    public constructor(j?: JSON_Wndr) {
        super(j);
        this.my_name    = 'No Name Wonder';
        if (j !== undefined) this.__init(j);
    }

    protected __init(j?: JSON_Wndr): C_Wndr {
        super.__init(j);
        return this;
    }

    public random_make(hero_level?: number): C_Wndr {
        super.random_make(hero_level);
        this.my_name  = "冒険者 " + _random_str(5);
        return this;
    }

    public encode(): JSON_Wndr {
        const j = super.encode();
        return j;
    }

    public decode(j?: JSON_Wndr): C_Wndr {
        return this.__init(j);
    }
}
