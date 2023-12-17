import { I_Exist, I_HasHope, I_HopeAction } from "./I_EventMap";
import { C_Point }  from "./C_Point";
import { C_Walker } from "./C_Walker";
import { T_Direction } from "./T_Direction";

export class C_Hero implements I_Exist {
    protected walker: C_Walker;
    protected my_layer: number = 99;

    protected hope_motion: string;

    public constructor(p?: C_Point, d?: T_Direction) {
        const pos = p ?? new C_Point(1, 1, 0);
        const dir = d ?? T_Direction.N;
        this.walker = new C_Walker();
        this.walker.set_p(pos);
        this.walker.set_dir(dir);

        this.hope_motion = 'NOP';
    }
    public id(): string {
        return "ImHero";
    }
    public within(p: C_Point): boolean {
        const here = this.walker.get_p();
        return here.within(p); 
    }
    public layer(): number {return this.my_layer;}
    public set_layer(layer: number): void {this.my_layer = layer;}
    public to_letter(): string|null {
        switch (this.walker.get_d()) {
            case T_Direction.N: return '↑';
            case T_Direction.E: return '→';
            case T_Direction.S: return '↓';
            case T_Direction.W: return '←';
            default: return '🌀';
        }
    }
    public get_p(): C_Point {
        return this.walker.get_p();
    }
    public set_p(p:C_Point, d?: T_Direction): void {
        this.walker.set_p(p, d);
    }
    public get_dir(): T_Direction {
        return this.walker.get_d();
    }
    public set_dir(d: T_Direction): void {
        this.walker.set_dir(d);
    }

    public hope_p_fwd(): I_HopeAction {
        return {
            has_hope: true, 
            hope: "Move",
            subj: this.walker.get_p_fwd(),
            isOK: ()=>{this.walker.set_p_fwd();},
            isNG: this.isNG,
           };
    }
    public hope_p_bak(): I_HopeAction {
        return {
            has_hope: true, 
            hope: "Move",
            subj: this.walker.get_p_bak(),
            isOK: ()=>{this.walker.set_p_bak();},
            isNG: this.isNG,
        };
    }
    public hope_turn_r(): I_HopeAction {
        return {
            has_hope: true, 
            hope: "Turn",
            subj: this.walker.get_p(),
            isOK: ()=>{this.walker.turn_r();},
            isNG: this.isNG,
        };
    }
    public hope_turn_l(): I_HopeAction {
        return {
            has_hope: true, 
            hope: "Turn",
            subj: this.walker.get_p(),
            isOK: ()=>{this.walker.turn_l();},
            isNG: this.isNG,
        };
    }
    public isNG(): void {
        return;
    }
}