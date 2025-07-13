"use strict";

import { T_Direction }       from './C_PointDir';
import { C_Team, JSON_Team } from "./C_Team";
import { T_Wall }            from "../d_mdl/C_Wall";
import { C_MazeObjView, I_MazeObjView, JSON_MazeObjView, T_Rect }  from "./C_MazeObjView";

type T_xy = {x: number, y: number};

export class C_CurrentTeamView  implements I_MazeObjView {
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
    dir(): T_Direction {
        return this.my_team.getWalker().get_d() ?? T_Direction.N;
    }
    set_dir(d: T_Direction): void {
        this.my_team.getWalker().set_d(d);
    }
    
    public canShow(): boolean{return false}
    public pad_t():   number {return 0.0} 
    public pad_d():   number {return 0.0} 
    public pad_s():   number {return 0.0} 
    public col_f():   string|null {return null} 
    public col_b():   string|null {return null} 
    public col_s():   string|null {return null} 
    public col_t():   string|null {return null} 
    public col_d():   string|null {return null} 
    public col_l():   string|null {return null} 
    public col_2():   string|null {return null} 
    public col_L():   string|null {return null} 

    public drow3D(frot: T_Wall, back: T_Wall): void {}

    public drow2D(r:  T_Rect): void {

        const con = C_MazeObjView.get_context2D();
        if (con === undefined) return;
   
    /*******************
        con.beginPath();
        con.moveTo(r.tl.x, r.tl.y);
        con.lineTo(r.tr.x, r.tr.y);
        con.lineTo(r.dr.x, r.dr.y);
        con.lineTo(r.dl.x, r.dl.y);
        con.closePath();
    
        con.fillStyle   = "#ff3333";
        con.fill();
    ********************/

        // Draw the arrow
        switch (this.my_team.getWalker().get_d()) {
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

        con.fillStyle   = "#ff6666";
        con.fill();

        con.strokeStyle = "#ff3333";
        con.lineWidth   = 2;
        con.stroke();
        
    }

    public encode(): JSON_MazeObjView {return {cname: 'CurrentTeamView'}}
    public decode(j: JSON_MazeObjView|undefined): I_MazeObjView {return this as I_MazeObjView}
}
