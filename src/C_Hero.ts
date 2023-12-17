import { I_Exist, T_ActionResult } from "./I_EventMap";
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

    public hope_p_fwd(): T_ActionResult {
        this.hope_motion = 'Forward';
        return {isOK: true, 
                kind: "Move",
                option: {type: "C_POINT", value: JSON.stringify(this.walker.get_p_fwd())}
               };
    }
    public hope_p_bak(): T_ActionResult {
        this.hope_motion = 'Back';
        return {isOK:true, 
            kind: "Move",
            option: {type: "C_POINT", value: JSON.stringify(this.walker.get_p_bak())}
               };
    }
    public hope_turn_r(): T_ActionResult {
        this.hope_motion = 'TurnRight';
        return {isOK:true, kind: "Turn"};
    }
    public hope_turn_l(): T_ActionResult {
        this.hope_motion = 'TurnLeft';
        return {isOK:true, kind: "Turn"};
    }
    public isOK(): T_ActionResult {
        const w = this.walker;
        switch (this.hope_motion) {
            case 'Forward': 
                w.set_p(w.get_p_fwd());
                break;
            case 'Back': 
                w.set_p(w.get_p_bak());
                break;
            case 'TurnRight':
                w.turn_r();
                break;
            case 'TurnLeft':
                w.turn_l();
                break;
        }
        this.hope_motion = 'NOP';
        return {isOK: true};
    }
    public isNG(): T_ActionResult {
        this.hope_motion = 'NOP';
        return {isOK: true};
    }
}