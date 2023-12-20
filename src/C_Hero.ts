import { I_Exist, I_HasHope, I_HopeAction } from "./I_EventMap";
import { C_Point }  from "./C_Point";
import { C_Walker } from "./C_Walker";
import { T_Direction } from "./T_Direction";

type __init_arg = {
    id?:number, 
    name?: string, 
    p?: C_Point, 
    d?: T_Direction,
    motion?: string,
}
export class C_Hero implements I_Exist {
    protected my_id: number;
    protected my_name: string;
    protected walker: C_Walker;
    protected my_layer: number = 99;

    protected hope_motion: string;

    public constructor(a?: __init_arg) {

        this.my_id   = a?.id ?? 0;
        this.my_name = a?.name ?? 'Neo Hero?';
        this.walker = new C_Walker();
        this.hope_motion = a?.motion ?? 'NOP';    
        if (a !== undefined) this.__init(a);
    }
    protected __init(a: __init_arg): void {
            this.my_id   = a.id   ?? this.my_id
            this.my_name = a.name ?? this.my_name;
            if (a.p !== undefined) this.walker.set_p(a.p);
            if (a.d !== undefined) this.walker.set_dir(a.d);
            this.hope_motion = a.motion ?? this.hope_motion; 
    }
    public set_prp(arg : __init_arg) {
        this.__init(arg);
    }
    public id(): string {
        return 'Hero_' + this.my_id.toString(16).padStart(5, '0');
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

    public get_around(front: number, right:number, up: number = 0): C_Point {
        return this.walker.get_around(front, right, up);
    }

    public hope_p_fwd(): I_HopeAction {
        return {
            has_hope: true, 
            hope: "Move",
            subj: this.walker.get_p_fwd(),
            doOK: ()=>{this.walker.set_p_fwd();},
            doNG: ()=>{this.isNG();},
           };
    }
    public hope_p_bak(): I_HopeAction {
        return {
            has_hope: true, 
            hope: "Move",
            subj: this.walker.get_p_bak(),
            doOK: ()=>{this.walker.set_p_bak();},
            doNG: ()=>{this.isNG();},
        };
    }
    public hope_turn_r(): I_HopeAction {
        return {
            has_hope: true, 
            hope: "Turn",
            subj: this.walker.get_p(),
            doOK: ()=>{this.walker.turn_r();},
            doNG: ()=>{this.isNG();},
        };
    }
    public hope_turn_l(): I_HopeAction {
        return {
            has_hope: true, 
            hope: "Turn",
            subj: this.walker.get_p(),
            doOK: ()=>{this.walker.turn_l();},
            doNG: ()=>{this.isNG();},
        };
    }
    public isNG(): void {
        return;
    }
}