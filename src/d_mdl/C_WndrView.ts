"use strict";

import { _min } from '../d_utl/F_Math';
import { C_MazeObjView, I_MazeObjView, JSON_MazeObjView, T_Rect } from './C_MazeObjView';
import { T_Direction } from './C_PointDir';
import { T_Wall } from './C_Wall';
import { T_Orientation } from './T_Orientation';

type T_xy = {x: number, y: number};

export interface JSON_WndrView extends JSON_MazeObjView {
    col_2_arw?: string;  // 矢印の色
    col_2_tri?: string;  // 矢印の輪郭の色
}

export class C_WndrView  extends C_MazeObjView implements I_MazeObjView {
    public clname: string = 'WndrView'; // クラス名
    public col_2_arw: string|null = null; // 矢印の色
    public col_2_tri: string|null = null; // 矢印の輪郭の色
    
    public constructor(j: JSON_WndrView) {
        super(j);
        this.clname    = 'WndrView';
        if (j !== undefined) this.__init(j);
    }
    protected __init(j: JSON_WndrView|undefined): I_MazeObjView {
        if (j === undefined) return this;

        super.__init(j);
        if (j?.clname    !== undefined) this.clname   = j.clname;
        if (j?.col_2_arw !== undefined) this.col_2_arw = j.col_2_arw;
        if (j?.col_2_tri !== undefined) this.col_2_tri = j.col_2_tri;

        return this;
    }
    public free(): void {}

    public letter(dir: number = 0): string|null {
        switch (dir) {
            case T_Direction.N: return '👆';
            case T_Direction.E: return '👉';
            case T_Direction.S: return '👇';
            case T_Direction.W: return '👈';
            default: return '🌀';
        }
    }

    /******************************************************
    public drow2D(r: T_Rect, dir: number = 0): void {
        super.drow2D(r);
        const con = C_MazeObjView.get_context2D();
        if (con === undefined) return;
    
        // Draw the arrow
        switch (dir) {
            case T_Direction.N:  // ↑
                this.drow2D_arrow({x: (r.tl.x + r.tr.x)/2, y:r.tl.y}, r.dl, r.dr);break
            case T_Direction.E:  // →
                this.drow2D_arrow({y: (r.tr.y + r.dr.y)/2, x:r.tr.x}, r.tl, r.dl);break;
            case T_Direction.S: // ↓
                this.drow2D_arrow({x: (r.dl.x + r.dr.x)/2, y:r.dl.y}, r.tr, r.tl);break;
            case T_Direction.W: // ←
                this.drow2D_arrow({y: (r.tl.y + r.dl.y)/2, x:r.tl.x}, r.dr, r.tr);break;
        }
    }

    private drow2D_arrow(top: T_xy, left: T_xy, right: T_xy): void {
        const con = C_MazeObjView.get_context2D();
        if (con === undefined) return;

        con.beginPath();
        con.moveTo(top.x, top.y);
        con.lineTo(right.x, right.y);
        con.lineTo(left.x, left.y);
        con.closePath();

        con.fillStyle   = this.col_2_arw ?? "#ff3333";
        con.fill();

        
        con.strokeStyle = this.col_2_tri ?? "#ff9999";
        con.lineWidth   = 2;
        con.stroke();
    }
*******************************************************/

    protected drow3D_obj_front(
        frot:  T_Wall, 
        back:  T_Wall, 
    ): T_Rect|undefined {
        const rect = super.drow3D_obj_front(frot, back);
        if (rect === undefined) return undefined;
        return rect;
    }

    protected _drow3D_textTOP(text: string, r: T_Rect, fill: string|null, line: string|null): void {
        const size_x = ( r.tr.x - r.tl.x );
        const size_y = ( r.dl.y - r.tl.y ) / 3;

        this._drow3D_text(
            text, 
            {
                x: r.tl.x + (size_x / 2),
                y: (r.tl.y + 0 * size_y) + (size_y / 2)
            }, 
            _min([size_x, size_y]), // 文字の最大幅
            fill, 
            line
        );
    }
    protected _drow3D_textBTM(ori: T_Orientation, r: T_Rect, fill: string|null, line: string|null): void {
        let text: string;
        switch (ori) {
            case T_Orientation.F: text = '前'; break;
            case T_Orientation.L: text = '左'; break;
            case T_Orientation.B: text = '後'; break;
            case T_Orientation.R: text = '右'; break;
            default: text = '謎';
        }

        const size_x = ( r.tr.x - r.tl.x );
        const size_y = ( r.dl.y - r.tl.y ) / 3;

        this._drow3D_text(
            text, 
            {
                x: r.tl.x + (size_x / 2),
                y: (r.tl.y + 2 * size_y) + (size_y / 2)
            }, 
            _min([size_x, size_y]), // 文字の最大幅
            fill, 
            line
        );
    }

    protected _drow3D_text(ch: string, pos: T_xy, max_width: number, fill: string|null, line: string|null): void {
        const con = C_MazeObjView.get_context3D();
        if (con === undefined) return;

        //con.font = '16px sans-serif';
        const font_size = Math.floor( 0.95 * max_width / ch.length );
        con.font = `${font_size}px sans-serif`;
        con.textAlign = 'center';
        con.textBaseline = 'middle';

        if (fill != null) {
            con.fillStyle   = fill;
            con.fillText(ch, pos.x, pos.y, max_width);
        }
        if (line !== null) {
            con.strokeStyle = line;
            con.lineWidth   = 1;
            con.strokeText(ch, pos.x, pos.y, max_width);
        }
    }

    public encode(): JSON_WndrView {
        const j = super.encode();
        j.col_2_arw = this.col_2_arw ?? null; // 矢印の色
        j.col_2_tri = this.col_2_tri ?? null; // 矢印の輪郭の色
        
        return j;
    }
    public decode(j: JSON_WndrView|undefined): I_MazeObjView {
        return this.__init(j);
    }
}



