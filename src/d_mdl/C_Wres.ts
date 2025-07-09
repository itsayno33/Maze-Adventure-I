"use strict";

import { _get_uuid } from "../d_utl/F_Rand";
import { I_JSON_Uniq, JSON_Any } from "./C_SaveInfo";
import { C_Wndr, I_Wndr, JSON_Wndr } from "./C_Wndr";

export interface JSON_Wres extends JSON_Any {
    wres?:  JSON_Wndr[];
}

export type T_WresDoAllFnc = (wndr: I_Wndr, arg?:{[key:string]: any})=>boolean;

export interface I_Wres extends I_JSON_Uniq {
    wres:     ()=>I_Wndr[],
    set_wres: (wres: I_Wres[])=>void,
    clr_wres: ()=>void,
    add_wres: (wndr: I_Wndr)=>void,
    doAll:    (fnc: T_WresDoAllFnc, arg?:{[key:string]: any})=>boolean|void
}

export class C_Wres  implements I_Wres {
    protected uniq_id: string;
    protected myWres:  I_Wndr[]|undefined;

    public constructor(j?: JSON_Wres) {
        this.uniq_id    = 'mai_wres#' + _get_uuid();
        
        this.__init(j);
    }
    uid():string {return this.uniq_id}

    public wres(): I_Wndr[]               {return this.myWres??[]};
    public set_wres(wres: I_Wres[]):void  {if (wres !== undefined && wres.length > 0) this.myWres = wres;}
    public clr_wres():void                {this.myWres = [];}
    public add_wres(wndr: I_Wndr):void    {if (wndr !== undefined) this.myWres?.push(wndr)}

    public doAll(fnc: T_WresDoAllFnc, arg?:{[key:string]: any}): boolean|void {
        if (fnc === undefined) return false;
        let rsltAll = true;
        for (const wndr of this.myWres??[]) {
            const rslt  = fnc(wndr, arg);
            if (typeof rslt === 'boolean') rsltAll &&= rslt;
        }
        return rsltAll;
    }

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
