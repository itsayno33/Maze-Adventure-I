"use strict";

import { I_JSON_Uniq, JSON_Any } from "./C_SaveInfo";

export interface JSON_Wres extends JSON_Any {}

export interface I_Wres extends I_JSON_Uniq {}

export class C_Wres  implements I_Wres {
    protected __init(j: JSON_Wres|undefined) {return this}
    public uid(): string {return ''};
    public encode(): JSON_Wres {return {}}
    public decode(j: JSON_Wres|undefined): I_Wres {return this.__init(j)}; 
}
