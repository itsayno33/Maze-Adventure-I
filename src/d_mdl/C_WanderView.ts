"use strict";

import { C_MazeObjView, I_MazeObjView, JSON_MazeObjView, T_Rect } from './C_MazeObjView';
import { T_Direction } from './C_PointDir';

type T_xy = {x: number, y: number};

export interface JSON_WanderView extends JSON_MazeObjView {
    col_2_arw?: string;  // 矢印の色
    col_2_tri?: string;  // 矢印の輪郭の色
}

export class C_WanderView  extends C_MazeObjView implements I_MazeObjView {
    public col_2_arw: string|null = null; // 矢印の色
    public col_2_tri: string|null = null; // 矢印の輪郭の色
    
    public constructor(j: JSON_WanderView) {
        super(j);
        this.clname    = 'WanderView';
        if (j !== undefined) this.decode(j);
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

    public encode(): JSON_WanderView {
        const j = super.encode();
        j.cname = 'WanderView';  
        j.col_2_arw = this.col_2_arw ?? null; // 矢印の色
        j.col_2_tri = this.col_2_tri ?? null; // 矢印の輪郭の色
        
        return j;
    }
    public decode(j: JSON_WanderView|undefined): I_MazeObjView {
        if (j === undefined) return this;

        super.decode(j);
        if (j?.clname    !== undefined) this.clname   = j.clname;
        if (j?.col_2_arw !== undefined) this.col_2_arw = j.col_2_arw;
        if (j?.col_2_tri !== undefined) this.col_2_tri = j.col_2_tri;

        return this;
    }
}



