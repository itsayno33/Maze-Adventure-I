"use strict";

import { C_Hero, JSON_Hero } from "./C_Hero";
import { I_JSON_Uniq } from './C_SaveInfo';


export interface JSON_Wndr extends JSON_Hero {}

export interface I_Wndr extends I_JSON_Uniq {}

export class C_Wndr extends C_Hero implements I_Wndr {
    public constructor(j?: JSON_Wndr) {
        super(j);
        if (j !== undefined) this.__init(j);
    }

    protected __init(j?: JSON_Wndr): C_Wndr {
        super.__init(j);
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
