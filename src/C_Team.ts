import { I_Exist, I_HasHope, I_HopeAction } from "./I_EventMap";
import { C_Point }     from "./C_Point";
import { C_Walker }    from "./C_Walker";
import { T_Direction } from "./T_Direction";
import { C_Hero, JSON_Hero }      from "./C_Hero";

type __init_arg = {
    id?:number, 
    name?: string, 
    heroes?: C_Hero[], 
    p?: C_Point, 
    x?: number,
    y?: number,
    z?: number,
    d?: T_Direction,
    motion?: string,
}

export type JSON_Team = {
    id?:number, 
    name?: string, 
    point?: {x: number, y: number, z: number}, 
    x?: number,
    y?: number,
    z?: number,
    direct?: {d: number},
    heroes?: JSON_Hero[], 
    motion?: string,
}

export function alert_team_info(a: JSON_Team|undefined): void {
    if (a === undefined) return;
    alert("Team Info:" 
        + "\nid:    "     + (a.id        ?? '?')
        + "\nname:  "     + (a.name      ?? '?')
        + "\ncur_x: "     + (a.point?.x  ?? '?')
        + "\ncur_y: "     + (a.point?.y  ?? '?')
        + "\ncur_z: "     + (a.point?.z  ?? '?')
        + "\ncur_d: "     + (a.direct?.d ?? '?')
        + "\n"
    );

//    if (a.heroes !== undefined) alert_heroes_info(a.heroes);
}


export class C_Team implements I_Exist {
    protected my_id:    number;
    protected my_name:  string;
    protected walker:   C_Walker;
    protected my_layer: number = 99;
    protected heroes:   C_Hero[];

    protected hope_motion: string;

    public constructor(a?: __init_arg) {

        this.my_id   = a?.id ?? 0;
        this.my_name = a?.name ?? 'Neo Team?';
        this.walker = new C_Walker();
        this.heroes = [];
        this.hope_motion = a?.motion ?? 'NOP';    
        if (a !== undefined) this.__init(a);
    }
    protected __init(a: __init_arg): void {
        this.my_id   = a.id   ?? this.my_id
        this.my_name = a.name ?? this.my_name;
        if (a.p !== undefined) this.walker.set_p(a.p);
        if (a.x !== undefined) this.walker.set_x(a.x);
        if (a.y !== undefined) this.walker.set_x(a.y);
        if (a.z !== undefined) this.walker.set_x(a.z);
        if (a.d !== undefined) this.walker.set_dir(a.d);
        this.hope_motion = a.motion ?? this.hope_motion; 

        if (a.heroes !== undefined) {
            for (const hero of a.heroes) {
                this.append_hero(hero);
            }
        }
    }
    public set_prp(arg : __init_arg) {
        this.__init(arg);
    }
    public id(): string {
        return 'Team_' + this.my_id.toString(16).padStart(5, '0');
    }
    public within(p: C_Point): boolean {
        const here = this.walker.get_p();
        return here.within(p); 
    }
    public layer(): number {return this.my_layer;}
    public set_layer(layer: number): void {this.my_layer = layer;}
    public to_letter(): string|null {
        switch (this.walker.get_dir()) {
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
    public get_z(): number {
        return this.walker.get_z();
    }
    public set_z(z: number): void {
        if (z < 0) return;
        this.walker.set_z(z);
    }
    public get_dir(): T_Direction {
        return this.walker.get_dir();
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

    public hope_p_up(): I_HopeAction {
        return {
            has_hope: true, 
            hope: "Up",
            subj: this.walker.get_p_up(),
            doOK: ()=>{this.move_p_up();},
            doNG: ()=>{this.isNG();},
        };
    }
    public hope_p_down(): I_HopeAction {
        return {
            has_hope: true, 
            hope: "Down",
            subj: this.walker.get_p_down(),
            doOK: ()=>{this.move_p_down();},
            doNG: ()=>{this.isNG();},
        };
    }

    public move_p_up(): void {
        this.walker.set_p_up();
    }
    public move_p_down(): void {
        this.walker.set_p_down();
    }

    public isNG(): void {
        return;
    }

    public append_hero(hero: C_Hero): void {
        this.heroes.push(hero);
    }
    public remove_hero(hero: C_Hero): void {
        this.heroes = this.heroes.filter((item) => item !== hero);
    }

    public encode(): JSON_Team {
        const x = this.walker.get_x();
        const y = this.walker.get_y();
        const z = this.walker.get_z();
        const d = this.walker.get_dir();

        return {
            id:      this.my_id,
            name:    this.my_name,
            point:   {x: x, y: y, z: z},
            direct:  {d: d},
            heroes:  C_Hero.encode_heroes(this.heroes),
            motion:  this.hope_motion,
        };
    }
    public decode(a: JSON_Team|undefined): C_Team {
        if (a === undefined) return this;

        if (a.id   !== undefined)   this.my_id       = a.id;
        if (a.name !== undefined)   this.my_name     = a.name;
        if (a.motion !== undefined) this.hope_motion = a.motion;

        if (a.point !== undefined && typeof a.point == 'object') {
            this.walker.decode(a.point);
        } 
        if (a.x !== undefined && a.y !== undefined && a.z !== undefined) {
            this.walker.decode({x: a.x, y: a.y, z: a.z});
        }

        if (a.direct !== undefined && typeof a.point === 'object') {
            this.walker.decode(a.direct);
        }

        if (a.heroes !== undefined) {
            this.heroes = C_Hero.decode_heroes(a.heroes);
        }
    
        return this;
    }
}