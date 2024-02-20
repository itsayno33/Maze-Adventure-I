import { _get_uuid }                 from "../d_utl/F_Rand";
import { C_Point }                   from "./C_Point";
import { C_PointDir, JSON_PointDir } from "./C_PointDir";
import { I_JSON_Uniq, JSON_Any }     from "./C_SaveData";

export interface I_MazeObj extends I_JSON_Uniq {
//    newObj: (j?: JSON_MazeObj|undefined)=>C_MazeObj;
    within: (p: C_Point)=>boolean;
    // 表示関係
    layer:      ()=>number;
    set_layer?: (layer: number)=>void;
    to_letter:  ()=>string|null; // null: 見えない、何もない
}

export interface JSON_MazeObj extends JSON_Any {
    uniq_id?:   string, 
    pos?:       JSON_PointDir,
    layer?:     number,
    letter?:    string,
}

export class C_MazeObj implements I_MazeObj {
    protected uniq_id:  string;
    protected pos:      C_PointDir;
    protected my_layer: number;
    protected letter:   string|null;

    public constructor(j: JSON_MazeObj|undefined) {
        this.uniq_id    =   'mazeobj_' + _get_uuid();
        this.pos        =   new C_PointDir({x:0, y:0, z:0, d:0});
        this.my_layer   =   -2;
        this.letter     =   null;
        if (j !== undefined) this.decode(j);
    }

    public static newObj(j: JSON_MazeObj|undefined): C_MazeObj {
        return new C_MazeObj(j);
    }

    public uid(): string {return this.uniq_id}

    public get_pos(): C_PointDir {
        return new C_PointDir(this.pos);
    }
    public set_pos(p: C_PointDir): void {
        this.pos = p;
    }
    public within(p: C_Point): boolean {
        return this.pos.within(p);
    }

    public layer(): number {return this.my_layer;}
    public set_layer(layer: number) {this.my_layer = layer}
    public to_letter(): string|null {return this.letter}

    public encode(): JSON_MazeObj {
        return {
            uniq_id: this.uniq_id,
            pos:     this.pos.encode(),
            layer:   this.my_layer,
            letter:  this.letter ?? '',
        }
    }

    public decode(j: JSON_MazeObj|undefined): C_MazeObj {
        if (j === undefined) return this;

        if (j.uniq_id !== undefined) this.uniq_id  = j.uniq_id;
        if (j.pos     !== undefined) this.pos.decode(j.pos);
        if (j.layer   !== undefined) this.my_layer = j.layer;
        if (j.letter  !== undefined) this.letter   = j.letter !== '' ? j.letter : null;

        return this;
    }
}
