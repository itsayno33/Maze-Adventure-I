import { C_Point }                   from './C_Point';
import { C_PointDir, JSON_PointDir } from './C_PointDir';
import { T_Direction }               from './C_PointDir';
import { T_MakeEnumType }            from "./T_MakeEnumType";

export const T_Lckd:{[lckd: string]: number}  = {
    Unkn: 0,
    Maze: 1,
    Guld: 2,
} as const;
export type T_Lckd   = T_MakeEnumType<typeof T_Lckd>;

function lckd_key(lckd: T_Lckd): string {
/*
    switch (lckd) {
        case T_Lckd.Unkn: return "Unkn";
        case T_Lckd.Maze: return "Maze";
        case T_Lckd.Guld: return "Guld";
        default:          return "????";
    }
*/
    return Object.keys(T_Lckd).find(key => T_Lckd[key] === lckd) ?? "????";
}


export interface JSON_Location extends JSON_PointDir {
    kind?: string,
    name?: string,
    uid?:  string,
}

export interface I_Locate {
    uid:      ()=>string;
    get_lckd: ()=>T_Lckd;
    get_name: ()=>string;
}

export class C_Location extends C_PointDir {
    protected loc_kind: T_Lckd = T_Lckd.Unkn;
    protected loc_name: string = '';
    protected loc_uid:  string = '';

    public constructor(json?: JSON_Location) {
        super(json);

        this.loc_kind = T_Lckd.Unkn; 
        this.loc_name = '';
        this.loc_uid  = '';

        if (json !== undefined) this.decode(json);
    }

    public get_lckd_str(): string  {return lckd_key(this.loc_kind);}
    public get_lckd(): T_Lckd      {return this.loc_kind;}
    public get_name(): string      {return this.loc_name;}
    public get_uid():  string      {return this.loc_uid;}

    public set_lckd(lckd: T_Lckd): C_Location|undefined {
        if (!(lckd in T_Lckd)) return undefined;
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
        return super.get_p();
    }
    public get_d(): T_Direction {
//        if (this.loc_kind != T_Lckd.Maze) return undefined;
        return super.get_d();
    }
    public get_pd(): C_PointDir {
//        if (this.loc_kind != T_Lckd.Maze) return undefined;
        return super.get_pd();
    }

    public set_p   (p: C_PointDir): C_PointDir|undefined {
        if (this.loc_kind !== T_Lckd.Maze) return undefined;
        if (super.set_p(p) === undefined)  return undefined;

        return this as C_PointDir;
    }
    public set_d   (d: T_Direction): C_Location|undefined {
        if (this.loc_kind !== T_Lckd.Maze) return undefined;
        if (super.set_d(d) === undefined)  return undefined;

        return this;
    }
    public set_pd  (pd: C_PointDir): C_Location|undefined {
        if (this.loc_kind !== T_Lckd.Maze) return undefined;
        if (super.set_p(pd) === undefined) return undefined;

        return this;
    }


    public encode(): JSON_Location {
        const j = super.encode() as JSON_Location;
        j.kind = lckd_key(this.loc_kind);
        j.name = this.loc_name;
        j.uid =  this.loc_uid;
        return j;
    }
    public decode(j: JSON_Location): C_Location {
        if (j === undefined) return this;
        if (j.kind === undefined || !(j.kind in T_Lckd)) return this;

        super.decode(j);
        if (j.kind !== undefined) this.loc_kind = T_Lckd[j.kind];
        if (j.name !== undefined) this.loc_name = j.name;
        if (j.uid  !== undefined) this.loc_uid  = j.uid;
        return this;
    }
}
