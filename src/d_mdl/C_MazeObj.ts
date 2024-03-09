"use strict";

import { C_Point }                   from "./C_Point";
import { C_PointDir, JSON_PointDir } from "./C_PointDir";
import { I_Abstract, I_JSON_Uniq, JSON_Any }     from "./C_SaveData";
import { _get_uuid }                 from "../d_utl/F_Rand";
import { 
    C_MazeObjView, 
    I_MazeObjView, 
    JSON_MazeObjView 
} from "./C_MazeObjView";


export interface JSON_MazeObj extends JSON_Any {
    clname?:    string,
    uniq_id?:   string, 
    pos?:       JSON_PointDir,
    view?:      JSON_MazeObjView|undefined,
    thr?:       string, 
}


export interface I_MazeObj extends I_JSON_Uniq, I_Abstract {
    get_pd:     ()=>C_PointDir;
    within:     (p: C_Point)=>boolean;
    view:       ()=>I_MazeObjView|undefined;
    canThrough: ()=>boolean;
}

export class C_MazeObj implements I_MazeObj {
    protected clname:    string = 'C_MazeObj';

    private   uniq_id:   string;
    protected pos:       C_PointDir;
    protected my_view:   I_MazeObjView|undefined;
    protected can_thr:   boolean;

    public static newObj(j?: JSON_MazeObj|undefined): I_MazeObj {
        j ??= {};
        j.clname ??= C_MazeObj.constructor.name;
        switch (j.clname) {
            case C_MazeObj.constructor.name: return new C_MazeObj(j);
        }
        return new C_MazeObj(j);
    }
    public newObj(j?: JSON_MazeObj|undefined): I_MazeObj {
        return C_MazeObj.newObj(j);
    }

    protected constructor(j?: JSON_MazeObj|undefined) {
        this.uniq_id    = 'mazeobj_' + _get_uuid();
        this.clname     =  C_MazeObj.constructor.name;
        this.pos        =  new C_PointDir({x:0, y:0, z:0, d:0});
        this.my_view    =  undefined;
        this.can_thr    =  true;

        if (j !== undefined) this.__init(j);
    }

    private __init(j: JSON_MazeObj|undefined): C_MazeObj {
        if (j === undefined) return this;

        if (j.uniq_id !== undefined) this.uniq_id   = j.uniq_id;
        if (j.clname  !== undefined) this.clname    = j.clname;
        if (j.pos     !== undefined) this.pos.decode(j.pos);
        if (j.view    !== undefined) {
            if (Object.keys(j.view).length > 0) {
                this.my_view ??= C_MazeObjView.newObj(j.view); 
            } else this.my_view  = undefined;
        }
        if (j.can_thr !== undefined) this.can_thr = j.can_thr !== '0' ? true : false;
        return this;
}

    public uid(): string {return this.uniq_id}

    public view(): I_MazeObjView|undefined {return this.my_view}
    public setView(view: I_MazeObjView|undefined): void {this.my_view = view}

    public canThrough(): boolean {return this.can_thr}
    public setThrough(thr: boolean): boolean {return this.can_thr = thr}

    public get_pd(): C_PointDir {
        return new C_PointDir(this.pos);
    }
    public set_pd(p: C_PointDir): void {
        this.pos = p;
    }
    public within(p: C_Point): boolean {
        return this.pos.within(p);
    }

    public encode(): JSON_MazeObj {
        return {
            uniq_id: this.uniq_id,
            clname:  this.clname,
            pos:     this.pos.encode(),
            view:    this.my_view?.encode() ?? {},
            can_thr: this.can_thr ? '1' : '0',
        }
    }

    public decode(j: JSON_MazeObj|undefined): I_MazeObj {
        return this.__init(j);
    }
    public static decode(j: JSON_MazeObj|undefined): I_MazeObj {
        return C_MazeObj.newObj(j);
    }
}

