import { _get_uuid }                 from "../d_utl/F_Rand";
import { C_Point }                   from "./C_Point";
import { C_PointDir, JSON_PointDir } from "./C_PointDir";
import { I_JSON_Uniq, JSON_Any }     from "./C_SaveData";

export interface I_MazeObj extends I_JSON_Uniq {
    within: (p: C_Point)=>boolean;
    // 表示関係(2Dpre)
    layer:      ()=>number;
    set_layer?: (layer: number)=>void;
    to_letter:  ()=>string|null; // null: 見えない、何もない
    // 表示関係(3D)
    isShow: ()=>boolean;
    pad_t:  ()=>number; //上側の空き(割合: 0から1) 
    pad_d:  ()=>number; //床側の空き(割合: 0から1) 
    pad_s:  ()=>number; //横側の空き(割合: 0から1) 
    col_f:  ()=>string|null; //正面の色(CSSカラー)。nullは透明
    col_s:  ()=>string|null; //横側の色(CSSカラー)。nullは透明
    col_t:  ()=>string|null; //上部の色(CSSカラー)。nullは透明。ややこしいが、物体の底面に当たる
    col_d:  ()=>string|null; //下部の色(CSSカラー)。nullは透明。ややこしいが、物体の天井に当たる
    col_l:  ()=>string|null; //ラインの色(CSSカラー)
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

    protected my_pos_t: number;
    protected my_pos_d: number;
    protected my_pos_s: number;

    protected my_col_f: string;
    protected my_col_s: string;
    protected my_col_t: string;
    protected my_col_d: string;
    protected my_col_l: string;

    public constructor(j: JSON_MazeObj|undefined) {
        this.uniq_id    =   'mazeobj_' + _get_uuid();
        this.pos        =   new C_PointDir({x:0, y:0, z:0, d:0});
        this.my_layer   =   -2;
        this.letter     =   null;

        this.my_pos_t   =   0.0;
        this.my_pos_d   =   0.0;
        this.my_pos_s   =   0.0;

        this.my_col_f   = '#f8f8f8'; 
        this.my_col_s   = '#dddddd'; 
        this.my_col_t   = '#ffffff'; 
        this.my_col_d   = '#cccccc'; 
        this.my_col_l   = '#333333'; 
    
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

    public isShow(): boolean{return this.to_letter() !== null};
    public pad_t():  number {return this.my_pos_t}
    public pad_d():  number {return this.my_pos_d}
    public pad_s():  number {return this.my_pos_s}
    public set_pad_t(pad_t: number): number {return this.my_pos_t = this.my_pos_d + pad_t < 1.0 ? pad_t : 0.99 - this.my_pos_d}
    public set_pad_d(pad_d: number): number {return this.my_pos_d = this.my_pos_t + pad_d < 1.0 ? pad_d : 0.99 - this.my_pos_t}
    public set_pad_s(pad_s: number): number {return this.my_pos_s = pad_s}

    public col_f(): string {return this.my_col_f} 
    public col_s(): string {return this.my_col_s} 
    public col_t(): string {return this.my_col_t} 
    public col_d(): string {return this.my_col_d} 
    public col_l(): string {return this.my_col_l} 
    public set_col_f(col_f: string): string {return this.my_col_f = col_f} 
    public set_col_s(col_s: string): string {return this.my_col_s = col_s} 
    public set_col_t(col_t: string): string {return this.my_col_t = col_t} 
    public set_col_d(col_d: string): string {return this.my_col_d = col_d} 
    public set_col_l(col_l: string): string {return this.my_col_l = col_l} 

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
