import { C_Point }        from './C_Point';
import { T_Direction }    from './T_Direction';
import { T_MakeEnumType } from "./T_MakeEnumType";

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

export type JSON_Location = {
    kind: string,
    name: string,
    uid:  string,
    loc?: { 
        x: number, 
        y: number, 
        z: number, 
        d: number
    },
}

export interface I_Locate {
    uid:      ()=>string;
    get_lckd: ()=>T_Lckd;
    get_name: ()=>string;
}

export class C_Location {
    protected loc_kind: T_Lckd = T_Lckd.Unkn;
    protected loc_name: string = '';
    protected loc_uid:  string = '';
    protected loc_pos:  C_Point|undefined = undefined;
    protected loc_dir:  T_Direction|undefined = undefined;

    public constructor(json?: JSON_Location) {
        this.loc_kind = T_Lckd.Unkn; 

        this.loc_name = '';
        this.loc_uid  = '';
        this.loc_pos = undefined;
        this.loc_dir = undefined;
        if (json !== undefined) this.decode(json);
    }

    public get_lckd(): T_Lckd      {return this.loc_kind;}
    public get_name(): string      {return this.loc_name;}
    public get_uid():  string      {return this.loc_uid;}
    public get_p():    C_Point|undefined     {
        if (this.loc_kind != T_Lckd.Maze) return undefined;
        return this.loc_pos ??= new C_Point();
    }
    public get_d():    T_Direction|undefined {
        if (this.loc_kind != T_Lckd.Maze) return undefined;
        return this.loc_dir ??= T_Direction.X;
    }
    public get_lckd_str(): string  {return lckd_key(this.loc_kind);}

    
    public set_lckd(lckd: T_Lckd): boolean {
        this.loc_kind = lckd;
        return true;
    }
    public set_name(name: string):   void {this.loc_name = name;}
    public set_uid (uid: string):    void {this.loc_uid  = uid;}
    public set_p   (p: C_Point, d?: T_Direction): boolean {
        if (this.loc_kind !== T_Lckd.Maze) return false;
        this.loc_pos  = p;
        if (d !== undefined) this.loc_dir = d;
        return true;
    }
    public set_d   (d: T_Direction): boolean {
        if (this.loc_kind !== T_Lckd.Maze) return false;
        this.loc_dir  = d;
        return true;
    }
    public set_lckd_str(lckd: string): boolean {
        if (!(lckd in T_Lckd)) return false;
        this.loc_kind = T_Lckd[lckd];
        return true;
    }


    public encode(): JSON_Location {
        const pos = this.loc_pos;

        const j: JSON_Location = {
            kind: lckd_key(this.loc_kind),
            name: this.loc_name,
            uid:  this.loc_uid,
        }

        if (j.kind == 'Maze') {
            const pos = this.loc_pos;
            const dir = this.loc_dir;

            j['loc'] = {
                x: pos?.x ?? 0, 
                y: pos?.y ?? 0,
                z: pos?.z ?? 0, 
                d: dir    ?? 0,
            };
        }
        return j;
    }
    public decode(j: JSON_Location): C_Location {
        if (j === undefined) return this;
        if (j.kind === undefined || !(j.kind in T_Lckd)) return this;

        if (j.kind !== undefined) this.loc_kind = T_Lckd[j.kind];
        if (j.name !== undefined) this.loc_name = j.name;
        if (j.uid  !== undefined) this.loc_uid  = j.uid;
        if (j.loc  !== undefined) {
            this.loc_pos = new C_Point(j.loc?.x ?? 0, j.loc?.y ?? 0, j.loc?.z ?? 0);
            this.loc_dir = (j.loc?.d ?? 0) as T_Direction;
        } else {
            this.loc_pos = undefined;
            this.loc_dir = undefined;
        }
        return this;
    }
}
