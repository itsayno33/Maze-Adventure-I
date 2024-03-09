"use strict";

import { C_Point }               from "./C_Point";
import { C_PointDir }            from './C_PointDir';
import { C_MovablePoint }        from "./C_MovablePoint";
import { C_Walker, JSON_Walker } from "./C_Walker";
import { C_Goods,  JSON_Goods }  from './C_Goods';
import { C_Hero, JSON_Hero }     from "./C_Hero";
import { I_MazeObj }             from "./C_MazeObj";
import { JSON_Any }              from "./C_SaveData";
import { C_CurrentTeamView }     from "./C_TeamView";
import { C_MazeObjView, I_MazeObjView, JSON_MazeObjView }  from "./C_MazeObjView";
import { _get_uuid }             from "../d_utl/F_Rand";
import { _alert }                from "../d_cmn/global";

export interface JSON_Team extends JSON_Any {
    id?:        number, 
    uniq_id?:   string, 
    save_id?:   number, 
    name?:      string, 
    locate?:    JSON_Walker,
    goods?:     JSON_Goods,
    heroes?:    JSON_Hero[], 
    motion?:    string,
    view?:      JSON_MazeObjView|undefined,
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


export class C_Team implements I_MazeObj {
    public static newObj(j?: JSON_Team): C_Team {
        return new C_Team(j);
    }
    public newObj(j?: JSON_Team): C_Team {return C_Team.newObj(j);}

    protected my_id:     number;
    protected my_name:   string;
    protected uniq_id:   string;
    protected save_id:   number;
    protected walker:    C_Walker;
    protected goods:     C_Goods;
    protected heroes:    {[uid: string]: C_Hero};

    protected myView:    I_MazeObjView|undefined;
    protected hope_motion: string;

    public constructor(j?: JSON_Team) {

        this.my_id     =  0;
        this.my_name   = 'Neo Team?';
        this.uniq_id   = 'mai_team#' + _get_uuid();
        this.save_id   =  0;

        this.myView = new C_CurrentTeamView(this) as I_MazeObjView;
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

    public view():  I_MazeObjView|undefined {return this.myView}
    public walk():  C_Walker {return this.walker}
    
    public canThrough(): boolean {return true}


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

    public get_loc(): C_MovablePoint {
        return this.walker;
    }
    public set_loc(loc: C_MovablePoint): void {
        this.walker.decode(loc.encode());
    }

    public get_pd(): C_PointDir {
        return this.walker.get_pd();
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
            view:      this.myView?.encode() ?? {},
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

        if (a.view    !== undefined) {
            if (Object.keys(a.view).length > 0) this.myView = C_MazeObjView.newObj(a.view); 
            else this.myView = new C_CurrentTeamView(this) as I_MazeObjView;
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
    
    public alert(): void {
        _alert("Team Info:" 
            + "\nid:    "     + (this.my_id            ?? '?')
            + "\nuniq_id:  "  + (this.uniq_id          ?? '?')
            + "\nname:  "     + (this.my_name          ?? '?')
            + "\nsave_id: "   + (this.save_id          ?? '?')
            + "\nurl:  "      + (this.walker.url()     ?? '?')
            + "\nlckd: "      + (this.walker.get_lckd_str() ?? '?')
            + "\nlcnm: "      + (this.walker.get_name()     ?? '?')
            + "\nlcid: "      + (this.walker.get_uid()      ?? '?')
            + "\ncur_x: "     + (this.walker.get_p().x ?? '?')
            + "\ncur_y: "     + (this.walker.get_p().y ?? '?')
            + "\ncur_z: "     + (this.walker.get_p().z ?? '?')
            + "\ncur_d: "     + (this.walker.get_d()   ?? '?')
            + "\ngoods: "     + (Object.keys(this.goods??{}).length)
            + "\nheroes: "    + (this.heroes?.length ?? '?')
            + "\n"
        );
    }
    public alert_hres(): void {
//        alert("Team Info:");
        for (const ii in this.heroes) this.heroes[ii].alert();
    }
}
