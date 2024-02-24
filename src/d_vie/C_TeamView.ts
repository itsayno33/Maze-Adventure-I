import { C_Point }                  from "../d_mdl/C_Point";
import { C_PointDir, T_Direction }  from '../d_mdl/C_PointDir';
import { I_Locate }                 from '../d_mdl/C_Location';
import { C_MovablePoint }           from "../d_mdl/C_MovablePoint";
import { C_Walker, JSON_Walker }    from "../d_mdl/C_Walker";
import { C_Goods,  JSON_Goods }     from '../d_mdl/C_Goods';
import { C_Hero, JSON_Hero }        from "../d_mdl/C_Hero";
import { C_Team }                   from "../d_mdl/C_Team";
import { I_MazeObj }                from "../d_mdl/C_MazeObj";
import { JSON_Any }                 from "../d_mdl/C_SaveData";
import { I_HopeAction }             from "../d_mdl/I_Common"
import { C_MazeObjView, I_MazeObjView, JSON_MazeObjView }  from "../d_vie/C_MazeObjView";
import { T_Wall }                   from "../d_vie/C_Wall";
import { _get_uuid }                from "../d_utl/F_Rand";
import { _alert }                   from "../d_cmn/global";

export class C_CurrentTeamView  implements I_MazeObjView {
    private my_team: C_Team;
    private my_layer:  number = 99;
    public  constructor(team: C_Team) {
        this.my_team = team;
    }

    public layer(): number         {return this.my_layer;}
    public set_layer(layer: number): void {this.my_layer = layer;}
    public letter(): string|null {
        switch (this.my_team.get_dir()) {
            case T_Direction.N: return '↑';
            case T_Direction.E: return '→';
            case T_Direction.S: return '↓';
            case T_Direction.W: return '←';
            default: return '🌀';
        }
    }
    public isShow(): boolean{return false}
    public drow3D(frot: T_Wall, back: T_Wall): void {}
    public pad_t():  number {return 0.0} 
    public pad_d():  number {return 0.0} 
    public pad_s():  number {return 0.0} 
    public col_f():  string|null {return null} 
    public col_b():  string|null {return null} 
    public col_s():  string|null {return null} 
    public col_t():  string|null {return null} 
    public col_d():  string|null {return null} 
    public col_l():  string|null {return null} 

    public encode(): JSON_MazeObjView {return {}}
    public decode(j: JSON_MazeObjView|undefined): I_MazeObjView {return this}
}
