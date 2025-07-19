"use strict";

import { _get_uuid } from '../d_utl/F_Rand';
import { C_Hero }    from './C_Hero';
import { I_JSON_Uniq, JSON_Any } from './C_SaveInfo';

export interface JSON_Scrl extends JSON_Any {
    uid?:    string;
    clname?: string; // Class name for the scroll
    name?:   string;  // Name of the scroll
}

export interface I_Scrl extends I_JSON_Uniq {
    uid:   () => string;
    class: () => string;
    name:  () => string;
    spell: (hres: C_Hero[], idx: number) => void;
}

export class C_Scrl implements I_Scrl {
    protected _uid:    string;
    protected _clname: string;
    protected _name:   string;

    constructor(j: JSON_Scrl|undefined) {
        this._uid = 'mai_scrl#' + _get_uuid();
        this._clname = 'C_Scrl'; // Default class name, can be overridden
        this._name = 'Unnamed Scroll'; // Default name, can be overridden

        if (j !== undefined) this.__init(j);
    }

    protected __init(j: JSON_Scrl): I_Scrl {
        if (j.uid    !== undefined) this._uid = j.uid;
        if (j.clname !== undefined) this._clname = j.clname;
        if (j.name   !== undefined) this._name = j.name;
        return this;
    }

    public uid():   string {return this._uid;}
    public class(): string {return this._clname;}
    public name():  string {return this._name;}
    public spell(hres: C_Hero[], idx: number): void {}

    public encode(): JSON_Scrl {
        return {
            uid: this.uid(),
            clname: this.class(),
            name: this.name(),
            // Include other properties as needed
        };
    };

    public decode(j: JSON_Any): I_Scrl {
        return this.__init(j);
    };
}
