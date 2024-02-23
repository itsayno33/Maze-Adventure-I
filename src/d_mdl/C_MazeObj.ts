import { _get_uuid }                 from "../d_utl/F_Rand";
import { C_Point }                   from "./C_Point";
import { C_PointDir, JSON_PointDir } from "./C_PointDir";
import { I_JSON_Uniq, JSON_Any }     from "./C_SaveData";

export interface I_MazeObj extends I_JSON_Uniq {
    within: (p: C_Point)=>boolean;
    // 表示関係(2Dpre)
    layer:  ()=>number;
    letter: ()=>string|null; // null: 見えない、何もない
    // 表示関係(3D)
    isShow: ()=>boolean;
    pad_t:  ()=>number; //上側の空き(割合: 0から1) 
    pad_d:  ()=>number; //床側の空き(割合: 0から1) 
    pad_s:  ()=>number; //横側の空き(割合: 0から1) 
    col_f:  ()=>string|null; //正面の色(CSSカラー)。nullは透明
    col_b:  ()=>string|null; //背面の色(CSSカラー)。nullは透明
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
    private uniq_id:   string;
    private pos:       C_PointDir;

    private my_layer:  number;      // 2D表示の時のCSSレイヤー。同位置のオブジェの内この値が大きい物が表示される
    private my_letter: string|null; // 2D表示の時の全角文字。nullなら透明

    private my_show3D: boolean;
    private my_pad_t:  number; // オブジェクト上部の隙間の割合(0.0 から 1.0) 
    private my_pad_d:  number; // オブジェクト下部の隙間の割合(0.0 から 1.0) 
    private my_pad_s:  number; // オブジェクト周囲の隙間の割合(0.0 から 1.0) 

    private my_col_f:  string|null; // オブジェクト正面のCSSカラー 
    private my_col_b:  string|null; // オブジェクト正面のCSSカラー 
    private my_col_s:  string|null; // オブジェクト側面のCSSカラー 
    private my_col_t:  string|null; // オブジェクト上面のCSSカラー 
    private my_col_d:  string|null; // オブジェクト底面のCSSカラー 
    private my_col_l:  string|null; // オブジェクトの線のCSSカラー 

    public constructor(j: JSON_MazeObj|undefined) {
        this.uniq_id    = 'mazeobj_' + _get_uuid();
        this.pos        =  new C_PointDir({x:0, y:0, z:0, d:0});
        this.my_layer   =  -2;
        this.my_letter  =  null;

        this.my_pad_t   =  0.0;
        this.my_pad_d   =  0.0;
        this.my_pad_s   =  0.0;

        this.my_show3D  =  true;

        this.my_col_f   = '#f8f8f8'; 
        this.my_col_b   = '#aaaaaa'; 
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

    public letter(): string|null {return this.my_letter}
    public set_letter(letter: string|null): string|null {return this.my_letter = letter}

    public isShow(): boolean {return this.my_show3D};
    public setShow(is_show: boolean): boolean {return this.my_show3D = is_show};

    public pad_t():  number {return this.my_pad_t}
    public pad_d():  number {return this.my_pad_d}
    public pad_s():  number {return this.my_pad_s}
    public set_pad_t(pad_t: number): number {return this.my_pad_t = this.my_pad_d + pad_t < 1.0 ? pad_t : 0.99 - this.my_pad_d}
    public set_pad_d(pad_d: number): number {return this.my_pad_d = this.my_pad_t + pad_d < 1.0 ? pad_d : 0.99 - this.my_pad_t}
    public set_pad_s(pad_s: number): number {return this.my_pad_s = pad_s}

    public col_f(): string|null {return this.my_col_f} 
    public col_b(): string|null {return this.my_col_b} 
    public col_s(): string|null {return this.my_col_s} 
    public col_t(): string|null {return this.my_col_t} 
    public col_d(): string|null {return this.my_col_d} 
    public col_l(): string|null {return this.my_col_l} 
    public set_col_f(col_f: string|null): string|null {return this.my_col_f = col_f} 
    public set_col_b(col_b: string|null): string|null {return this.my_col_b = col_b} 
    public set_col_s(col_s: string|null): string|null {return this.my_col_s = col_s} 
    public set_col_t(col_t: string|null): string|null {return this.my_col_t = col_t} 
    public set_col_d(col_d: string|null): string|null {return this.my_col_d = col_d} 
    public set_col_l(col_l: string|null): string|null {return this.my_col_l = col_l} 

    public encode(): JSON_MazeObj {
        return {
            uniq_id: this.uniq_id,
            pos:     this.pos.encode(),
            layer:   this.my_layer,
            letter:  this.my_letter ?? '',
            pad_t:   this.my_pad_t, 
            pad_d:   this.my_pad_d, 
            pad_s:   this.my_pad_s, 
            show:    this.isShow() ? '1' : '0',
            col_f:   this.my_col_f ?? '',  
            col_b:   this.my_col_b ?? '',  
            col_s:   this.my_col_s ?? '', 
            col_t:   this.my_col_t ?? '', 
            col_d:   this.my_col_d ?? '', 
            col_l:   this.my_col_l ?? '', 
        }
    }

    public decode(j: JSON_MazeObj|undefined): C_MazeObj {
        if (j === undefined) return this;

        if (j.uniq_id !== undefined) this.uniq_id   = j.uniq_id;
        if (j.pos     !== undefined) this.pos.decode(j.pos);
        if (j.layer   !== undefined) this.my_layer  = j.layer;
        if (j.letter  !== undefined) this.my_letter = j.letter !== ''  ? j.letter : null; 
        if (j.pad_t   !== undefined) this.my_pad_t  = j.pad_t; 
        if (j.pad_d   !== undefined) this.my_pad_d  = j.pad_d; 
        if (j.pad_s   !== undefined) this.my_pad_s  = j.pad_s; 
        if (j.show    !== undefined) this.my_show3D = j.show   !== '0' ? true     : false; 
        if (j.col_f   !== undefined) this.my_col_f  = j.col_f  !== ''  ? j.col_f  : null; 
        if (j.col_b   !== undefined) this.my_col_b  = j.col_b  !== ''  ? j.col_b  : null; 
        if (j.col_s   !== undefined) this.my_col_s  = j.col_s  !== ''  ? j.col_s  : null; 
        if (j.col_t   !== undefined) this.my_col_t  = j.col_t  !== ''  ? j.col_t  : null; 
        if (j.col_d   !== undefined) this.my_col_d  = j.col_d  !== ''  ? j.col_d  : null; 
        if (j.col_l   !== undefined) this.my_col_l  = j.col_l  !== ''  ? j.col_l  : null; 

        return this;
    }
}
