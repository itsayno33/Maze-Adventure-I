"use strict";

import { C_MazeObjView, I_MazeObjView, JSON_MazeObjView, T_Rect } from './C_MazeObjView';
import { C_MazeObjView2X, I_MazeObjView2X, JSON_MazeObjView2X } from './C_MazeObjView2X';
import { T_Direction } from './C_PointDir';

type T_xy = {x: number, y: number};

export interface JSON_WndrView2X extends JSON_MazeObjView2X {
    col_2_arw?: string;  // 矢印の色
    col_2_tri?: string;  // 矢印の輪郭の色
}

export interface I_WndrView2X extends I_MazeObjView2X {}


export class C_WndrView2X  extends C_MazeObjView2X implements I_MazeObjView2X {
    public clname: string = 'WndrView'; // クラス名
    public col_2_arw: string|null = null; // 矢印の色
    public col_2_tri: string|null = null; // 矢印の輪郭の色
    
    public constructor(j: JSON_WndrView2X) {
        super(j);
        this.clname    = 'WndrView';
        if (j !== undefined) this.__init(j);
    }
    protected __init(j: JSON_WndrView2X|undefined): I_MazeObjView2X {
        if (j === undefined) return this;

        super.__init(j);
        if (j?.clname    !== undefined) this.clname   = j.clname;
        if (j?.col_2_arw !== undefined) this.col_2_arw = j.col_2_arw;
        if (j?.col_2_tri !== undefined) this.col_2_tri = j.col_2_tri;

        return this;
    }

    public letter(dir: number = 0): string|null {
        switch (dir) {
            case T_Direction.N: return '👆';
            case T_Direction.E: return '👉';
            case T_Direction.S: return '👈';
            case T_Direction.W: return '👇';
            default: return '🌀';
        }
    }
    public drow2X(ctx: CanvasRenderingContext2D | null, r: T_Rect, dir: number = 0): void {
        super.drow2X(ctx, r, dir);
        if (ctx === null) return;
        // Draw the arrow
        switch (dir) {
            case T_Direction.N:  // ↑
                this.drow2X_arrow(ctx, {x: (r.tl.x + r.tr.x)/2, y:r.tl.y}, r.dl, r.dr);break
            case T_Direction.E:  // →
                this.drow2X_arrow(ctx, {y: (r.tr.y + r.dr.y)/2, x:r.tr.x}, r.tl, r.dl);break;
            case T_Direction.S: // ↓
                this.drow2X_arrow(ctx, {x: (r.dl.x + r.dr.x)/2, y:r.dl.y}, r.tr, r.tl);break;
            case T_Direction.W: // ←
                this.drow2X_arrow(ctx, {y: (r.tl.y + r.dl.y)/2, x:r.tl.x}, r.dr, r.tr);break;
        }
    }

    private drow2X_arrow(ctx: CanvasRenderingContext2D | null, top: T_xy, left: T_xy, right: T_xy): void {
        if (ctx === undefined || ctx === null) return;

        ctx.beginPath();
        ctx.moveTo(top.x, top.y);
        ctx.lineTo(right.x, right.y);
        ctx.lineTo(left.x, left.y);
        ctx.closePath();

        ctx.fillStyle   = this.col_2_arw ?? "#ff3333";
        ctx.fill();

        
        ctx.strokeStyle = this.col_2_tri ?? "#ff9999";
        ctx.lineWidth   = 2;
        ctx.stroke();
    }

    public encode(): JSON_WndrView2X {
        const j = super.encode();
        j.col_2_arw = this.col_2_arw ?? null; // 矢印の色
        j.col_2_tri = this.col_2_tri ?? null; // 矢印の輪郭の色
        
        return j;
    }
    public decode(j: JSON_WndrView2X|undefined): I_WndrView2X {
        return this.__init(j);
    }
}



