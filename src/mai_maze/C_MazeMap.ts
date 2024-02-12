import { C_Maze }     from "../d_mdl/C_Maze";
import { T_MzKind }   from "../d_mdl/T_MzKind";
import { C_Point }    from "../d_mdl/C_Point";
import { C_Range }    from "../d_mdl/C_Range";
import { T_EventMapResult, I_EventMap } from "../d_mdl/I_Common";

export class C_MazeMap implements I_EventMap {
    protected my_layer:number = 1;

    protected maze:  C_Maze;
    protected range: C_Range;
    public constructor(maze: C_Maze) {
        this.maze  = maze;
        this.range = new C_Range(
            new C_Point(0, 0, 0), 
            new C_Point(maze.get_x_max() - 1, maze.get_y_max() - 1, maze.get_z_max()));
    }

    public layer(): number {return this.my_layer;}
    public set_layer(layer: number): void {this.my_layer = layer;}

    public here_is(p: C_Point): T_EventMapResult {
        const kind = { type: "Mzkind", value: this.maze.get_cell(p) };
        return {isOK:true, code:0, option:JSON.stringify(kind)};
    }
    public can_go(p: C_Point): T_EventMapResult {
        const yn:boolean = this.range.within(p);
        return {isOK:yn, code:0};
    } 
    public to_letter(p: C_Point): string|null {
        var letter: string;
        switch (this.maze.get_cell(p)) {
            case T_MzKind.Floor: letter = '　';break;
            case T_MzKind.Unexp: letter = '・';break;
            case T_MzKind.Stone: letter = '＃';break;
            case T_MzKind.Unkwn: letter = '？';break;
            case T_MzKind.StrUp: letter = '上';break;
            case T_MzKind.StrDn: letter = '下';break;
            case T_MzKind.Empty: letter = 'Ｏ';break;
            case T_MzKind.NoDef: letter = 'Ｘ';break;
            default: letter = 'Ｘ';break;
        }

        return letter;
    }

}
