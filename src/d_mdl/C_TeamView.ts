import { T_Direction } from './C_PointDir';
import { C_Team }      from "./C_Team";
import { T_Wall }      from "../d_mdl/C_Wall";
import { I_MazeObjView, JSON_MazeObjView }  from "./C_MazeObjView";

export class C_CurrentTeamView  implements I_MazeObjView {
    private my_team: C_Team;
    private my_layer:  number = 99;
    public  constructor(team: C_Team) {
        this.my_team = team;
    }

    public layer(): number         {return this.my_layer;}
    public set_layer(layer: number): void {this.my_layer = layer;}
    public letter(): string|null {
        switch (this.my_team.walk().get_d()) {
            case T_Direction.N: return '↑';
            case T_Direction.E: return '→';
            case T_Direction.S: return '↓';
            case T_Direction.W: return '←';
            default: return '🌀';
        }
    }
    public canShow(): boolean{return false}
    public drow3D(frot: T_Wall, back: T_Wall): void {}
    public pad_t():   number {return 0.0} 
    public pad_d():   number {return 0.0} 
    public pad_s():   number {return 0.0} 
    public col_f():   string|null {return null} 
    public col_b():   string|null {return null} 
    public col_s():   string|null {return null} 
    public col_t():   string|null {return null} 
    public col_d():   string|null {return null} 
    public col_l():   string|null {return null} 

    public encode(): JSON_MazeObjView {return {cname: 'CurrentTeamView'}}
    public decode(j: JSON_MazeObjView|undefined): I_MazeObjView {return this}
}
