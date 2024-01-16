import { C_Point }                   from './C_Point';
import { C_PointDir, JSON_PointDir } from './C_PointDir';
import { T_Direction }               from './C_PointDir';
import { I_JSON, JSON_Any }          from './C_SaveData';
import { T_MakeEnumType }            from "./T_MakeEnumType";

export const T_Lckd:{[lckd: string]: number}  = {
    Unkn: 0,
    Maze: 1,
    Guld: 2,
} as const;
export type T_Lckd   = T_MakeEnumType<typeof T_Lckd>;

function _lckd_key(lckd: T_Lckd): string {
    return Object.keys(T_Lckd).find(key => T_Lckd[key] === lckd) ?? "????";
}


export interface JSON_Location extends JSON_Any {
    kind?: string,
    name?: string,
    uid?:  string,
    loc?:  JSON_PointDir,
}

export interface I_Locate {
    uid:      ()=>string;
    get_lckd: ()=>T_Lckd;
    get_name: ()=>string;
}

export class C_Location implements I_JSON {
    protected loc_kind: T_Lckd = T_Lckd.Unkn;
    protected loc_name: string = '';
    protected loc_uid:  string = '';
    protected pd:       C_PointDir;

    public constructor(json?: JSON_Location) {
        this.loc_kind = T_Lckd.Unkn; 
        this.loc_name = '';
        this.loc_uid  = '';
        this.pd       = new C_PointDir();

        if (json !== undefined) this.decode(json);
    }

    public get_lckd_str(): string  {return _lckd_key(this.loc_kind);}
    public get_lckd(): T_Lckd      {return this.loc_kind;}
    public get_name(): string      {return this.loc_name;}
    public get_uid():  string      {return this.loc_uid;}

    public set_lckd(lckd: T_Lckd): C_Location|undefined {
        if (!(_lckd_key(lckd) in T_Lckd)) return undefined;
        this.loc_kind = lckd;
        return this;
    }
    public set_name(name: string):   void {this.loc_name = name;}
    public set_uid (uid: string):    void {this.loc_uid  = uid;}
    
    public set_lckd_str(lckd: string): C_Location|undefined {
        if (!(lckd in T_Lckd)) return undefined;
        this.loc_kind = T_Lckd[lckd];
        return this;
    }


    public get_p(): C_Point     {
//        if (this.loc_kind != T_Lckd.Maze) return undefined;
        return this.pd.get_p();
    }
    public get_d(): T_Direction {
//        if (this.loc_kind != T_Lckd.Maze) return undefined;
        return this.pd.get_d();
    }
    public get_pd(): C_PointDir {
//        if (this.loc_kind != T_Lckd.Maze) return undefined;
        return this.pd.get_pd();
    }

    public set_p   (p: C_PointDir): C_PointDir|undefined {
        if (this.loc_kind !== T_Lckd.Maze)   return undefined;
        if (this.pd.set_p(p) === undefined)  return undefined;

        return this.pd;
    }
    public set_d   (d: T_Direction): T_Direction|undefined {
        if (this.loc_kind !== T_Lckd.Maze)   return undefined;
        if (this.pd.set_d(d) === undefined)  return undefined;

        return this.pd.d;
    }
    public set_pd  (pd: C_PointDir): C_PointDir|undefined {
        if (this.loc_kind !== T_Lckd.Maze)    return undefined;
        if (this.pd.set_pd(pd) === undefined) return undefined;

        return this.pd;
    }


    public encode(): JSON_Location {
        return {
            kind: _lckd_key(this.loc_kind),
            name: this.loc_name,
            uid:  this.loc_uid,
            loc:  this.pd.encode(),
        };
    }
    public decode(j: JSON_Location): C_Location {
        if (j === undefined) return this;
        if (j.kind === undefined || !(j.kind in T_Lckd)) return this;

        if (j.kind !== undefined) this.loc_kind = T_Lckd[j.kind];
        if (j.name !== undefined) this.loc_name = j.name;
        if (j.uid  !== undefined) this.loc_uid  = j.uid;
        if (j.loc  !== undefined) this.pd.decode(j.loc);
        return this;
    }
}
