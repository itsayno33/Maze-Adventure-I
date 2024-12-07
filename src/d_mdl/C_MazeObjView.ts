"use strict";

import { I_Abstract, JSON_Any } from "./C_SaveInfo";
import { T_Wall }               from "../d_mdl/C_Wall";


export interface I_MazeObjView extends I_Abstract {
    // 表示関係(2Dpre)./C_Wall
    layer:   ()=>number;
    letter:  ()=>string|null; // null: 見えない、何もない

    // 表示関係(3D)
    canShow: ()=>boolean;
    drow2D:  (floor: T_Rect)=>void;
    drow3D:  (frot:  T_Wall, back: T_Wall)=>void;

    pad_t:   ()=>number; //上側の空き(割合: 0から1) 
    pad_d:   ()=>number; //床側の空き(割合: 0から1) 
    pad_s:   ()=>number; //横側の空き(割合: 0から1) 
    col_f:   ()=>string|null; //正面の色(CSSカラー)。nullは透明
    col_b:   ()=>string|null; //背面の色(CSSカラー)。nullは透明
    col_s:   ()=>string|null; //横側の色(CSSカラー)。nullは透明
    col_t:   ()=>string|null; //上部の色(CSSカラー)。nullは透明。ややこしいが、物体の底面に当たる
    col_d:   ()=>string|null; //下部の色(CSSカラー)。nullは透明。ややこしいが、物体の天井に当たる
    col_l:   ()=>string|null; //ラインの色(CSSカラー)

    col_2:   ()=>string|null; //2Dマップの色(CSSカラー)
}

export interface JSON_MazeObjView extends JSON_Any {
    clname?: string,
    layer?:  number,
    letter?: string,
    show?:   string,
    pad_t?:  number, // オブジェクト上部の隙間の割合(0.0 から 1.0) 
    pad_d?:  number, // オブジェクト下部の隙間の割合(0.0 から 1.0) 
    pad_s?:  number, // オブジェクト周囲の隙間の割合(0.0 から 1.0) 
    col_f?:  string|null, // オブジェクト正面のCSSカラー 
    col_b?:  string|null, // オブジェクト正面のCSSカラー 
    col_s?:  string|null, // オブジェクト側面のCSSカラー 
    col_t?:  string|null, // オブジェクト上面のCSSカラー 
    col_d?:  string|null, // オブジェクト底面のCSSカラー 
    col_l?:  string|null, // オブジェクトの線のCSSカラー 
    col_2?:  string|null, // 2Dマップの面のCSSカラー
}

export type T_xy   = {x: number, y: number}
export type T_Rect = {tl: T_xy, tr: T_xy, dl: T_xy, dr: T_xy};

export class C_MazeObjView implements I_MazeObjView {
    protected static con3D: CanvasRenderingContext2D|undefined;
    public static get_context3D(): CanvasRenderingContext2D|undefined {return this?.con3D}
    public static set_context3D(con3D?: CanvasRenderingContext2D): void {this.con3D = con3D}

    protected static con2D: CanvasRenderingContext2D|undefined;
    public static get_context2D(): CanvasRenderingContext2D|undefined {return this?.con2D}
    public static set_context2D(con2D?: CanvasRenderingContext2D): void {this.con2D = con2D}

    public static newObj(j?: JSON_MazeObjView|undefined): I_MazeObjView {
        j ??= {};
        j.clname ??= C_MazeObjView.constructor.name;
        switch (j.clname) {
            case C_MazeObjView.constructor.name:     return new C_MazeObjView(j);
        } 
        return new C_MazeObjView(j);
    }
    public newObj(j?: JSON_MazeObjView|undefined): I_MazeObjView {
        return C_MazeObjView.newObj(j);
    }


    private clname:    string = 'C_MazeObjView';

    private my_layer:  number;      // 2D表示の時のCSSレイヤー。同位置のオブジェの内この値が大きい物が表示される
    private my_letter: string|null; // 2D表示の時の全角文字。nullなら透明

    private my_show: boolean;
    private my_pad_t:  number; // オブジェクト上部の隙間の割合(0.0 から 1.0) 
    private my_pad_d:  number; // オブジェクト下部の隙間の割合(0.0 から 1.0) 
    private my_pad_s:  number; // オブジェクト周囲の隙間の割合(0.0 から 1.0) 

    private my_col_f:  string|null; // オブジェクト正面のCSSカラー 
    private my_col_b:  string|null; // オブジェクト正面のCSSカラー 
    private my_col_s:  string|null; // オブジェクト側面のCSSカラー 
    private my_col_t:  string|null; // オブジェクト上面のCSSカラー 
    private my_col_d:  string|null; // オブジェクト底面のCSSカラー 
    private my_col_l:  string|null; // オブジェクトの線のCSSカラー 

    private my_col_2:  string|null; // 2Dマップの面のCSSカラー 

    protected constructor(j?: JSON_MazeObjView|undefined) {
        this.clname     =  this.constructor.name;

        this.my_layer   =  -2;
        this.my_letter  =  null;

        this.my_pad_t   =  0.0;
        this.my_pad_d   =  0.0;
        this.my_pad_s   =  0.0;

        this.my_show    =  true;

        this.my_col_f   = '#f8f8f8'; 
        this.my_col_b   = '#aaaaaa'; 
        this.my_col_s   = '#dddddd'; 
        this.my_col_t   = '#ffffff'; 
        this.my_col_d   = '#cccccc'; 
        this.my_col_l   = '#333333'; 

        this.my_col_2   = '#cccccc'; 

        if (j !== undefined) this.__init(j);
    }
    private __init(j: JSON_MazeObjView|undefined): I_MazeObjView {
        if (j === undefined) return this;

        if (j.clname  !== undefined) this.clname    = j.clname;
        if (j.layer   !== undefined) this.my_layer  = j.layer;
        if (j.letter  !== undefined) this.my_letter = j.letter !== ''  ? j.letter : null; 
        if (j.pad_t   !== undefined) this.my_pad_t  = j.pad_t; 
        if (j.pad_d   !== undefined) this.my_pad_d  = j.pad_d; 
        if (j.pad_s   !== undefined) this.my_pad_s  = j.pad_s; 
        if (j.show    !== undefined) this.my_show   = j.show   !== '0' ? true     : false; 
        if (j.col_f   !== undefined) this.my_col_f  = j.col_f  !== ''  ? j.col_f  : null; 
        if (j.col_b   !== undefined) this.my_col_b  = j.col_b  !== ''  ? j.col_b  : null; 
        if (j.col_s   !== undefined) this.my_col_s  = j.col_s  !== ''  ? j.col_s  : null; 
        if (j.col_t   !== undefined) this.my_col_t  = j.col_t  !== ''  ? j.col_t  : null; 
        if (j.col_d   !== undefined) this.my_col_d  = j.col_d  !== ''  ? j.col_d  : null; 
        if (j.col_l   !== undefined) this.my_col_l  = j.col_l  !== ''  ? j.col_l  : null; 
        if (j.col_2   !== undefined) this.my_col_2  = j.col_2  !== ''  ? j.col_2  : null; 

        return this;
    }

    public layer(): number {return this.my_layer;}
    public set_layer(layer: number) {this.my_layer = layer}

    public letter():  string|null {return this.my_letter}
    public set_letter(letter: string|null): string|null {return this.my_letter = letter}

    public canShow(): boolean {return this.my_show};
    public setShow(can_show: boolean): boolean {return this.my_show = can_show};

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

    public col_2(): string|null {return this.my_col_2}
    public set_col_2(col_2: string|null): string|null {return this.my_col_2 = col_2} 

    public drow2D(rect: T_Rect): void {
        drow2D_cell(rect, this.col_2() ?? '#cccccc', this.col_l() ?? '#9999ff');
    }

    public drow3D(frot: T_Wall, back: T_Wall): void {
        this.drow3D_obj_back      (frot, back);
        this.drow3D_obj_down      (frot, back);
        this.drow3D_obj_top       (frot, back);
        this.drow3D_obj_right_side(frot, back);
        this.drow3D_obj_left_side (frot, back);
        this.drow3D_obj_front     (frot, back);
    }
    private drow3D_obj_down(
        frot:  T_Wall, 
        back:  T_Wall, 
    ): void {
        if (!this.canShow() || this.col_t() === null) return;
        if (this.pad_s() <= 0.0 && this.pad_t() >= 1.0) {
            drow3D_cell_floor(frot, back, this.col_t() ?? '#6666ff', this.col_l() ?? '#9999ff');
            return;
        }
    
        const o = __calc_padding_obj(this, frot, back);
        const rect: T_Rect = {
            tl: o.fdl,
            tr: o.fdr,
            dr: o.bdr,
            dl: o.bdl,
        }
        drow3D_cell(rect, this.col_t(), this.col_l());
    }

    private drow3D_obj_top(
        frot:  T_Wall, 
        back:  T_Wall, 
    ): void {
        if (!this.canShow() || this.col_d() === null) return;
        if (this.pad_s() <= 0.0 && this.pad_d() >= 1.0) {
            drow3D_cell_ceiling(frot, back, this.col_d() ?? '#aaaaaa', this.col_l() ?? '#9999ff');
            return;
        }
    
        const o = __calc_padding_obj(this, frot, back);
        const rect: T_Rect = {
            tl: o.ftl,
            tr: o.ftr,
            dr: o.btr,
            dl: o.btl,
        }
        drow3D_cell(rect, this.col_d(), this.col_l());
    }
    private drow3D_obj_front(
        frot:  T_Wall, 
        back:  T_Wall, 
    ): void {
        if (!this.canShow() || this.col_f() === null) return;
    
        const o = __calc_padding_obj(this, frot, back);
        const rect: T_Rect = {
            tl: o.ftl, 
            tr: o.ftr, 
            dr: o.fdr, 
            dl: o.fdl, 
        }
    
        drow3D_cell(rect, this.col_f(), this.col_l());
    }
    private drow3D_obj_back(
        frot:  T_Wall, 
        back:  T_Wall, 
    ): void {
        if (!this.canShow() || this.col_b() === null) return;
    
        const o = __calc_padding_obj(this, frot, back);
        const rect: T_Rect = {
            tl: o.btl, 
            tr: o.btr, 
            dr: o.bdr, 
            dl: o.bdl, 
        }
    
        drow3D_cell(rect, this.col_b(), this.col_l());
    }
    private drow3D_obj_left_side(
        frot:  T_Wall, 
        back:  T_Wall, 
    ): void {
        if (!this.canShow() || this.col_s() === null) return;
    
        const o = __calc_padding_obj(this, frot, back);
        const rect: T_Rect = {
            tl: o.btl,
            tr: o.ftl,
            dr: o.fdl,
            dl: o.bdl,
        }
    
        drow3D_cell(rect, this.col_s(), this.col_l());
    }
    private drow3D_obj_right_side(
        frot:  T_Wall, 
        back:  T_Wall, 
    ): void {
        if (!this.canShow() || this.col_s() === null) return;
    
        const o = __calc_padding_obj(this, frot, back);
        const rect: T_Rect = {
            tl: o.ftr,
            tr: o.btr,
            dr: o.bdr,
            dl: o.fdr,
        }
    
        drow3D_cell(rect, this.col_s(), this.col_l());
    }
    

    public encode(): JSON_MazeObjView {
        return {
            cname:   this.clname,
            layer:   this.my_layer,
            letter:  this.my_letter ?? '',
            pad_t:   this.my_pad_t, 
            pad_d:   this.my_pad_d, 
            pad_s:   this.my_pad_s, 
            show:    this.canShow() ? '1' : '0',
            col_f:   this.my_col_f ?? '',  
            col_b:   this.my_col_b ?? '',  
            col_s:   this.my_col_s ?? '', 
            col_t:   this.my_col_t ?? '', 
            col_d:   this.my_col_d ?? '', 
            col_l:   this.my_col_l ?? '', 
            col_2:   this.my_col_2 ?? '', 
        }
    }
    public decode(j: JSON_MazeObjView|undefined): I_MazeObjView {
        return this.__init(j);
    }
    public static decode(j: JSON_MazeObjView|undefined): I_MazeObjView {
        return C_MazeObjView.newObj(j);
    }
}



function __calc_padding_obj(
    obj:   I_MazeObjView,
    frot:  T_Wall, 
    back:  T_Wall, 
): {
    // 識別子の意味
    // 左端：前後の区別　f:前面　b:背面
    // 中央：上下の区別　t:上辺　d:下辺
    // 右端：左右の区別　l:左側　r:右側
    ftl:T_xy, ftr:T_xy, fdr:T_xy, fdl:T_xy, 
    btl:T_xy, btr:T_xy, bdr:T_xy, bdl:T_xy, 
} {
    const rect_frot = frot;
    const rect_back = back;

    const ratio_X   = obj.pad_s() / 2.0;
    const ratio_T   = obj.pad_t();
    const ratio_D   = obj.pad_d();

    const frot_pad_X  = Math.abs(rect_frot.max_x - rect_frot.min_x) * ratio_X;
    const back_pad_X  = Math.abs(rect_back.max_x - rect_back.min_x) * ratio_X;

    const frot_pad_T  = Math.abs(rect_frot.max_y - rect_frot.min_y) * ratio_T;
    const back_pad_T  = Math.abs(rect_back.max_y - rect_back.min_y) * ratio_T;

    const frot_pad_D  = Math.abs(rect_frot.max_y - rect_frot.min_y) * ratio_D;
    const back_pad_D  = Math.abs(rect_back.max_y - rect_back.min_y) * ratio_D;

    // パディング設定後のXY座標を計算するために
    // 必要な線分の位置決めをする
    const frot_top_lft = {x: rect_frot.min_x + frot_pad_X, y: rect_frot.min_y + frot_pad_T}
    const frot_top_rgt = {x: rect_frot.max_x - frot_pad_X, y: rect_frot.min_y + frot_pad_T}
    const frot_dwn_lft = {x: rect_frot.min_x + frot_pad_X, y: rect_frot.max_y - frot_pad_D}
    const frot_dwn_rgt = {x: rect_frot.max_x - frot_pad_X, y: rect_frot.max_y - frot_pad_D}

    const back_top_lft = {x: rect_back.min_x + back_pad_X, y: rect_back.min_y + back_pad_T}
    const back_top_rgt = {x: rect_back.max_x - back_pad_X, y: rect_back.min_y + back_pad_T}
    const back_dwn_lft = {x: rect_back.min_x + back_pad_X, y: rect_back.max_y - back_pad_D}
    const back_dwn_rgt = {x: rect_back.max_x - back_pad_X, y: rect_back.max_y - back_pad_D}

    let ftl = __calc_padding_xy(frot_top_lft, back_top_lft, ratio_X);
    let ftr = __calc_padding_xy(frot_top_rgt, back_top_rgt, ratio_X);
    let fdl = __calc_padding_xy(frot_dwn_lft, back_dwn_lft, ratio_X);
    let fdr = __calc_padding_xy(frot_dwn_rgt, back_dwn_rgt, ratio_X);

    let btl = __calc_padding_xy(back_top_lft, frot_top_lft, ratio_X);
    let btr = __calc_padding_xy(back_top_rgt, frot_top_rgt, ratio_X);
    let bdl = __calc_padding_xy(back_dwn_lft, frot_dwn_lft, ratio_X);
    let bdr = __calc_padding_xy(back_dwn_rgt, frot_dwn_rgt, ratio_X);

    return {
        ftl: ftl, ftr: ftr,
        fdl: fdl, fdr: fdr,
        btl: btl, btr: btr,
        bdl: bdl, bdr: bdr,
    }
}
function __calc_padding_xy(frot: T_xy, back: T_xy, ratio: number): T_xy {
        // 線分(Ax + B = y)の方程式の係数を求める
        const A = (frot.y - back.y) / (frot.x - back.x);
        const B =  frot.y - A * frot.x;
    
        // パディング調整後のXY座標の計算
        const p_frot_x = frot.x + (back.x - frot.x) * ratio;
        const p_frot_y = A * p_frot_x + B;

        return {x: p_frot_x, y: p_frot_y};
}


function drow3D_cell_floor(
        rect_frot: T_Wall, 
        rect_back: T_Wall, 
        fill: string = '#6666ff', 
        line: string = '#9999ff'
    ): void {

    const rect: T_Rect = {
        tl: {x: rect_frot.min_x, y: rect_frot.max_y},
        tr: {x: rect_frot.max_x, y: rect_frot.max_y},
        dr: {x: rect_back.max_x, y: rect_back.max_y},
        dl: {x: rect_back.min_x, y: rect_back.max_y}
    }
    drow3D_cell(rect, fill, line);
}
function drow3D_cell_ceiling(
        rect_frot: T_Wall, 
        rect_back: T_Wall, 
        fill: string = '#aaaaaa', 
        line: string = '#9999ff'
    ): void {

    const rect: T_Rect = {
        tl: {x: rect_frot.min_x, y: rect_frot.min_y},
        tr: {x: rect_frot.max_x, y: rect_frot.min_y},
        dr: {x: rect_back.max_x, y: rect_back.min_y},
        dl: {x: rect_back.min_x, y: rect_back.min_y}
    }
    drow3D_cell(rect, fill, line);
}

function drow2D_cell(r: T_Rect, fill: string|null, line: string|null): void {
    const con = C_MazeObjView.get_context2D();
    if (con === undefined) return;

    con.beginPath();
    con.moveTo(r.tl.x, r.tl.y);
    con.lineTo(r.tr.x, r.tr.y);
    con.lineTo(r.dr.x, r.dr.y);
    con.lineTo(r.dl.x, r.dl.y);
    con.closePath();

    if (fill != null) {
        con.fillStyle   = fill;
        con.fill();
    }
    if (line !== null) {
        con.strokeStyle = line;
        con.lineWidth   = 1;
        con.stroke();
    }
}

function drow3D_cell(r: T_Rect, fill: string|null, line: string|null): void {
    const con = C_MazeObjView.get_context3D();
    if (con === undefined) return;

    con.beginPath();
    con.moveTo(r.tl.x, r.tl.y);
    con.lineTo(r.tr.x, r.tr.y);
    con.lineTo(r.dr.x, r.dr.y);
    con.lineTo(r.dl.x, r.dl.y);
    con.closePath();

    if (fill != null) {
        con.fillStyle   = fill;
        con.fill();
    }
    if (line !== null) {
        con.strokeStyle = line;
        con.lineWidth   = 1;
        con.stroke();
    }
}
