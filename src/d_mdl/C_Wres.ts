"use strict";

import { _get_uuid } from "../d_utl/F_Rand";
import { I_JSON_Uniq, JSON_Any } from "./C_SaveInfo";
import { C_Wndr, I_Wndr, JSON_Wndr } from "./C_Wndr";

export interface JSON_Wres extends JSON_Any {
    wres?:  JSON_Wndr[];
}

export interface I_Wres extends I_JSON_Uniq {}

export class C_Wres  implements I_Wres {
    protected uniq_id: string;
    protected myWres:  I_Wndr[]|undefined;

    public constructor(j?: JSON_Wres) {
        this.uniq_id    = 'mai_wres#' + _get_uuid();
        
        this.__init(j);
    }
    uid():string {return this.uniq_id}

    public encode(): JSON_Wres {
        const wres: JSON_Wndr[] = [];
        for (const wndr of this.myWres??[]) wres.push(wndr);

        const j = {
            wres: wres,
        }
        return {}
    }

    protected __init(j?: JSON_Wres): I_Wres {
        if (j === undefined) return this;

        if (j.uniq_id  !== undefined) this.uniq_id  = j.uniq_id;
        if (j.wres     !== undefined  &&  (j.wres?.length??-1) > 0) {
            this.myWres = [];
            for (const wres of j.wres) this.myWres.push(new C_Wndr(wres));
        }
        return this;
    }

    public decode(j: JSON_Wres|undefined): I_Wres {
        return this.__init(j)
    }; 
}
