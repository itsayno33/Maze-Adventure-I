"use strict";

import { C_MazeObjView, I_MazeObjView, JSON_MazeObjView, T_Rect } from './C_MazeObjView';
import { T_Direction } from './C_PointDir';
import { C_WanderWalker, JSON_WanderWalker } from './C_WanderWalker';

type T_xy = {x: number, y: number};

export interface JSON_WanderWalkerView extends JSON_MazeObjView {}

export class C_WanderWalkerView  extends C_MazeObjView implements I_MazeObjView {
    public constructor(j: JSON_MazeObjView) {
        super(j);
        this.clname    = 'WanderWalkerView';
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

        con.fillStyle   = this.col_2() ?? "#ff3333";
        con.fill();

        
/****************
        con.strokeStyle = "#ff9999";
        con.lineWidth   = 3;
        con.stroke();
****************/        
    }

    public encode(): JSON_WanderWalkerView {
        const j = super.encode();
        j.cname = 'WanderWalkerView';  
        
        return j;
    }
    public decode(j: JSON_WanderWalkerView|undefined): I_MazeObjView {
        if (j === undefined) return this;

        super.decode(j);
        if (j?.clname !== undefined) this.clname = j.clname;

        return this;
    }
}



