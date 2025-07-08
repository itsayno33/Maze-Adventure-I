"use strict";

import { C_MazeObjView, I_MazeObjView, JSON_MazeObjView } from "./C_MazeObjView";
import { I_Abstract, JSON_Any } from "./C_SaveInfo";


export interface I_MazeObjView2X extends I_Abstract {
    // 表示関係(2Dpre)./C_Wall
    layer:   ()=>number;
    letter:  (dir: number)=>string|null; // null: 見えない、何もない

    // 表示関係(3D)
    canShow: ()=>boolean;
    drow2X:  (ctx: CanvasRenderingContext2D|null, rect: T_Rect, dir: number)=>void;

    col_2:   ()=>string|null; //2Dマップの色(CSSカラー)
    col_L:   ()=>string|null; //2Dマップの線の色(CSSカラー)
}

export interface JSON_MazeObjView2X extends JSON_MazeObjView {
    clname?: string,
    layer?:  number,
    letter?: string,
    show?:   string,
    col_2?:  string|null, // 2Dマップの面のCSSカラー
    col_L?:  string|null, // 2Dマップの線のCSSカラー
}

export type T_xy   = {x: number, y: number}
export type T_Rect = {tl: T_xy, tr: T_xy, dl: T_xy, dr: T_xy};

export class C_MazeObjView2X implements I_MazeObjView2X {
    protected static ctx2X: CanvasRenderingContext2D|undefined;

    public static newObj(j?: JSON_MazeObjView2X|undefined): I_MazeObjView2X {
        j ??= {};
        j.clname ??= 'C_MazeObjView2X';
        switch (j.clname) {
            case C_MazeObjView2X.constructor.name:     return new C_MazeObjView2X(j);
        } 
        return new C_MazeObjView2X(j);
    }
    public newObj(j?: JSON_MazeObjView2X|undefined): I_MazeObjView2X {
        return C_MazeObjView2X.newObj(j);
    }


    protected clname:    string = 'C_MazeObjView2X';

    protected my_layer:  number;      // 2D表示の時のCSSレイヤー。同位置のオブジェの内この値が大きい物が表示される
    protected my_letter: string|null; // 2D表示の時の全角文字。nullなら透明

    protected my_show: boolean;

    protected my_col_2:  string|null; // 2Dマップの面のCSSカラー 
    protected my_col_L:  string|null; // 2Dマップの線のCSSカラー 

    public constructor(j?: JSON_MazeObjView2X|undefined) {
        this.clname     =  'C_MazeObjView2X';

        this.my_layer   =  -2;
        this.my_letter  =  null;

        this.my_show    =  true;

        this.my_col_2   = '#cccccc'; 
        this.my_col_L   = '#9999ff'; 

        if (j !== undefined) this.__init(j);
    }
    protected __init(j: JSON_MazeObjView2X|undefined): I_MazeObjView2X {
        if (j === undefined) return this;

        if (j.clname  !== undefined) this.clname    = j.clname;
        if (j.layer   !== undefined) this.my_layer  = j.layer;
        if (j.letter  !== undefined) this.my_letter = j.letter !== ''  ? j.letter : null; 
        if (j.show    !== undefined) this.my_show   = j.show   !== '0' ? true     : false; 
        if (j.col_2   !== undefined) this.my_col_2  = j.col_2  !== ''  ? j.col_2  : null; 
        if (j.col_L   !== undefined) this.my_col_L  = j.col_L  !== ''  ? j.col_L  : null; 

        return this;
    }

    public layer(): number {return this.my_layer;}
    public set_layer(layer: number) {this.my_layer = layer}

    public letter(dir: number = 0):  string|null {return this.my_letter}
    public set_letter(letter: string|null): string|null {return this.my_letter = letter}

    public canShow(): boolean {return this.my_show};
    public setShow(can_show: boolean): boolean {return this.my_show = can_show};

    public col_2(): string|null {return this.my_col_2}
    public col_L(): string|null {return this.my_col_L}
    public set_col_2(col_2: string|null): string|null {return this.my_col_2 = col_2} 
    public set_col_L(col_L: string|null): string|null {return this.my_col_L = col_L} 

    public drow2X(ctx: CanvasRenderingContext2D|null, rect: T_Rect, dir: number = 0): void {
        if (ctx === undefined || ctx === null) return;
        drow2X_cell(ctx, rect, this.col_2(), this.col_L() ?? '#9999ff');
    }

    public encode(): JSON_MazeObjView2X {
        return {
            clname:  this.clname,
            layer:   this.my_layer,
            letter:  this.my_letter ?? '',
            show:    this.canShow() ? '1' : '0',
            col_2:   this.my_col_2 ?? '', 
            col_L:   this.my_col_L ?? '', 
        }
    }
    public decode(j: JSON_MazeObjView2X|undefined): I_MazeObjView2X {
        return this.__init(j);
    }
    public static decode(j: JSON_MazeObjView2X|undefined): I_MazeObjView2X {
        return C_MazeObjView2X.newObj(j);
    }
}


function drow2X_cell(ctx: CanvasRenderingContext2D|null, r: T_Rect, fill: string|null, line: string|null): void {
    if (ctx === undefined || ctx === null) return;

    ctx.beginPath();
    ctx.moveTo(r.tl.x, r.tl.y);
    ctx.lineTo(r.tr.x, r.tr.y);
    ctx.lineTo(r.dr.x, r.dr.y);
    ctx.lineTo(r.dl.x, r.dl.y);
    ctx.closePath();

    if (fill != null) {
        ctx.fillStyle   = fill;
        ctx.fill();
    }
    if (line !== null) {
        ctx.strokeStyle = line;
        ctx.lineWidth   = 1;
        ctx.stroke();
    }
}
