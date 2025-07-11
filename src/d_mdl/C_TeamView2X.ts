"use strict";

import { I_MazeObjView2X, JSON_MazeObjView2X, T_Rect } from './C_MazeObjView2X';
import { T_Direction }       from './C_PointDir';
import { C_Team, JSON_Team } from "./C_Team";
import { T_Wall }            from "./C_Wall";

type T_xy = {x: number, y: number};

export class C_CurrentTeamView2X  implements I_MazeObjView2X {
    private my_team: C_Team;
    private my_layer:  number = 99;
    public  constructor(team: C_Team) {
        this.my_team = team;
    }
    public free(): void {}

    public layer(): number         {return this.my_layer;}
    public set_layer(layer: number): void {this.my_layer = layer;}
    public letter(): string|null {
        switch (this.my_team.getWalker().get_d()) {
            case T_Direction.N: return '↑';
            case T_Direction.E: return '→';
            case T_Direction.S: return '↓';
            case T_Direction.W: return '←';
            default: return '🌀';
        }
    }
    public canShow(): boolean{return false}
    public col_2():   string|null {return null} 
    public col_L():   string|null {return null} 

    public drow2X(ctx: CanvasRenderingContext2D | null, r:  T_Rect, dir: number): void {

        if (ctx === undefined) return;
   
    /*******************
        ctx.beginPath();
        ctx.moveTo(r.tl.x, r.tl.y);
        ctx.lineTo(r.tr.x, r.tr.y);
        ctx.lineTo(r.dr.x, r.dr.y);
        ctx.lineTo(r.dl.x, r.dl.y);
        ctx.closePath();
    
        ctx.fillStyle   = "#ff3333";
        ctx.fill();
    ********************/

        // Draw the arrow
        switch (this.my_team.getWalker().get_d()) {
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

        ctx.fillStyle   = "#ff6666";
        ctx.fill();

        ctx.strokeStyle = "#ff3333";
        ctx.lineWidth   = 2;
        ctx.stroke();
        
    }

    public encode(): JSON_MazeObjView2X {return {cname: 'CurrentTeamView'}}
    public decode(j: JSON_MazeObjView2X|undefined): I_MazeObjView2X {return this as I_MazeObjView2X}
}
