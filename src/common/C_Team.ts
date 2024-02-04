import { _get_uuid }               from "./F_Rand";
import { C_Point }                 from "./C_Point";
import { C_PointDir, T_Direction } from './C_PointDir';
import { I_Locate }                from './C_Location';
import { C_MovablePoint }          from "./C_MovablePoint";
import { C_Walker, JSON_Walker }   from "./C_Walker";
import { C_Goods,  JSON_Goods }    from './C_Goods';
import { C_Hero, JSON_Hero }       from "./C_Hero";
import { I_Exist, I_HopeAction }   from "./I_Common"
import { I_JSON_Uniq, JSON_Any }   from "./C_SaveData";

export interface JSON_Team extends JSON_Any {
    id?:        number, 
    uniq_id?:   string, 
    save_id?:   number, 
    name?:      string, 
    locate?:    JSON_Walker,
    goods?:     JSON_Goods,
    heroes?:    JSON_Hero[], 
    motion?:    string,
}

export function alert_team_info(a: JSON_Team|undefined): void {
    if (a === undefined) return;
    alert("Team Info:" 
        + "\nid:    "     + (a.id        ?? '?')
        + "\nuniq_id:  "  + (a.uniq_id   ?? '?')
        + "\nname:  "     + (a.name      ?? '?')
        + "\nsave_id: "   + (a.save_id   ?? '?')
        + "\nurl:  "      + (a.locate?.cur_url    ?? '?')
        + "\nlckd: "      + (a.locate?.kind       ?? '?')
        + "\nlcnm: "      + (a.locate?.name       ?? '?')
        + "\nlcid: "      + (a.locate?.loc_uid    ?? '?')
        + "\ncur_x: "     + (a.locate?.loc_pos?.x ?? '?')
        + "\ncur_y: "     + (a.locate?.loc_pos?.y ?? '?')
        + "\ncur_z: "     + (a.locate?.loc_pos?.z ?? '?')
        + "\ncur_d: "     + (a.locate?.loc_pos?.d ?? '?')
        + "\ngoods: "     + (Object.keys(a.goods??[]).length)
        + "\nheroes: "    + (a.heroes?.length ?? '?')
        + "\n"
    );

//    if (a.heroes !== undefined) alert_heroes_info(a.heroes);
}


export class C_Team implements I_Exist, I_JSON_Uniq {
    protected my_id:     number;
    protected my_name:   string;
    protected uniq_id:   string;
    protected save_id:   number;
    protected walker:    C_Walker;
    protected my_layer:  number = 99;
    protected goods:     C_Goods;
    protected heroes:    {[uid: string]: C_Hero};

    protected hope_motion: string;

    public constructor(j?: JSON_Team) {

        this.my_id     =  0;
        this.my_name   = 'Neo Team?';
        this.uniq_id   = 'mai_team#' + _get_uuid();
        this.save_id   =  0;

        this.walker = new C_Walker();
        this.walker.set_tid(this.uid());

        this.goods  = new C_Goods();
        this.heroes = {};
        this.hope_motion = 'NOP';    
        if (j !== undefined) this.decode(j);
    }
    public set_prp(arg : JSON_Team) {
        this.decode(arg);
    }

    public uid(): string { return this.uniq_id}

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

    public hres():  C_Hero[] {
        const hres: C_Hero[] = [];
        for (let ii in this.heroes) hres.push(this.heroes[ii]);
        return hres;
    } 
    public clear_hres(): void {
        this.heroes = {};
    }
    public add_hero(hero: C_Hero): void {
        this.heroes[hero.uid()] = hero;
    }
    public rmv_hero(hero: C_Hero): void {
        delete this.heroes[hero.uid()];
    }

    public set_place(
        place: I_Locate, 
        url?:  string, 
        pos?:  C_PointDir) {

        this.walker.set_uid (place.uid());
        this.walker.set_lckd(place.get_lckd());
        this.walker.set_name(place.get_name());

        if (url !== undefined) this.walker.set_url(url);
        if (pos !== undefined) {
            this.walker.set_pd(pos);
        }
    }
    public get_loc(): C_MovablePoint {
        return this.walker;
    }
    public set_loc(loc: C_MovablePoint): void {
        this.walker.decode(loc.encode());
        /*
        this.walker.set_uid (loc.get_uid());
        this.walker.set_lckd(loc.get_lckd());
        this.walker.set_name(loc.get_name());
        this.walker.set_pd  (loc.get_pd());
        */
    }


    public get_pd(): C_PointDir {
        return this.walker.get_pd();
    }
    public set_pd(p:C_PointDir): void {
        this.walker.set_pd(p);
    }
    public get_z(): number {
        return this.walker.get_z();
    }
    public set_z(z: number): void {
        if (z < 0) return;
        this.walker.set_z(z);
    }
    public get_dir(): T_Direction {
        return this.walker.get_d();
    }
    public set_dir(d: T_Direction): void {
        this.walker.set_d(d);
    }

    public get_around(front: number, right:number, up: number = 0): C_PointDir {
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
            subj: this.walker.get_pd(),
            doOK: ()=>{this.walker.turn_r();},
            doNG: ()=>{this.isNG();},
        };
    }
    public hope_turn_l(): I_HopeAction {
        return {
            has_hope: true, 
            hope: "Turn",
            subj: this.walker.get_pd(),
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

    public encode(): JSON_Team {
        this.get_loc(); // Location情報を最新に更新

        const json_heroes: JSON_Hero[] = [];
        for (let ii in this.heroes) json_heroes.push(this.heroes[ii].encode());  

        return {
            id:        this.my_id,
            name:      this.my_name,
            uniq_id:   this.uniq_id,
            save_id:   this.save_id,
            locate:    this.walker.encode(),
            goods:     this.goods.encode(),
            heroes:    json_heroes,
            motion:    this.hope_motion,
        };
    }
    public decode(a: JSON_Team|undefined): C_Team {
        if (a === undefined)  return this;

        if (a.id   !== undefined)    this.my_id       = a.id;
        if (a.name !== undefined)    this.my_name     = a.name;
        if (a.uniq_id !== undefined) this.uniq_id     = a.uniq_id;
        if (a.save_id !== undefined) this.save_id     = a.save_id;
        if (a.motion !== undefined)  this.hope_motion = a.motion;

        if (a.locate !== undefined)  this.walker.decode(a.locate);
        if (a.goods !== undefined)   this.goods.decode(a.goods);

        if (a.heroes !== undefined)  {
            this.heroes = {};
            for (const json_hero of a.heroes) {
                const hero = new C_Hero(json_hero);
                this.heroes[hero.uid()] = hero;
            }
        }
    
        return this;
    }
    public static encode_all(all_team: C_Team[]): JSON_Team[] {
        const all_team_data: JSON_Team[] = [];
        for (let team of all_team) {
            all_team_data.push(team.encode());
        }
        return all_team_data;
    }
    public static decode_all(all_team_data: JSON_Team[]): C_Team[] {
        const all_team: C_Team[] = [];
        for (let team_data of all_team_data) {
            all_team.push((new C_Team()).decode(team_data));
        }
        return all_team;
    }
}