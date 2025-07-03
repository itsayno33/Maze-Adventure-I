"use strict";

import { C_Point }               from "./C_Point";
import { C_PointDir }            from './C_PointDir';
import { C_MovablePoint }        from "./C_MovablePoint";
import { C_Walker, JSON_Walker } from "./C_Walker";
import { C_Hero, JSON_Hero }     from "./C_Hero";
import { I_MazeObj }             from "./C_MazeObj";
import { JSON_Any }              from "./C_SaveInfo";
import { C_CurrentTeamView }     from "./C_TeamView";
import { I_MazeObjView, JSON_MazeObjView }  from "./C_MazeObjView";
import { C_Good,  T_GoodKind }   from "./C_Good";
import { C_GoodsList, JSON_GoodsList } from "./C_GoodsListNG";
import { _get_uuid }             from "../d_utl/F_Rand";
import { C_WanderWalker } from "./C_WanderWalker";

export interface JSON_Team extends JSON_Any {
    id?:        number, 
    uniq_id?:   string, 
    save_id?:   number, 
    name?:      string, 
    locate?:    JSON_Walker,
    gold?:      number,
//    goods?:     JSON_GoodsList,
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
        + "\ngold: "      + (a.gold      ??  0 )
//        + "\ngoods: "     + (Object.keys(a.goods??[]).length)
        + "\nheroes: "    + (a.heroes?.length ?? '?')
        + "\n"
    );

//    if (a.heroes !== undefined) alert_heroes_info(a.heroes);
}


export class C_Team implements I_MazeObj {
    protected my_id:     number;
    protected my_name:   string;
    protected uniq_id:   string;
    protected save_id:   number;
    protected myWalker:  C_Walker;
    protected myWkWalker:C_WanderWalker|undefined;
    protected gold:      number;
//    protected goods:     C_GoodsList;
    protected heroes:    {[uid: string]: C_Hero};

    protected myView:    I_MazeObjView|undefined;
    protected hope_motion: string;

    public constructor(j?: JSON_Team) {

        this.my_id     =  0;
        this.my_name   = 'Neo Team?';
        this.uniq_id   = 'mai_team#' + _get_uuid();
        this.save_id   =  0;

        this.myView    = new C_CurrentTeamView(this) as I_MazeObjView;
        this.myWalker  = new C_Walker();
        this.myWalker.set_tid(this.uid());

        this.gold   = 0;
//        this.goods  = new C_GoodsList();
        this.heroes = {};
        this.hope_motion = 'NOP';    
        if (j !== undefined) this.decode(j);
    }
    public set_prp(arg : JSON_Team) {
        this.decode(arg);
    }

    public uid(): string { return this.uniq_id}

    public within(p: C_Point): boolean {
        const here = this.myWalker?.get_p();
        return here?.within(p) ?? false; 
    }

    public view():       I_MazeObjView|undefined {return this.myView}
    public setView(view: I_MazeObjView|undefined): void {this.myView = view}
    
    public walker(): C_WanderWalker|undefined {return this.myWkWalker}
    public getWalker():  C_Walker {
        return this.myWalker;
    }
    
    public canThrough(): boolean {return true}
    public hitWallDmg(): number  {return 0}

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
        return this.myWalker;
    }
    public set_loc(loc: C_MovablePoint): void {
        (this.myWalker ??= new C_Walker()).decode(loc.encode());
    }

    public get_pd(): C_PointDir {
        return this.myWalker.get_pd();
    }
    public set_pd(pd: C_PointDir): void {
        this.myWalker.set_pd(pd);
    }

/*
    public static from_obj_to_string(oa: C_Team): string {
        return JSON.stringify(oa, null, "\t");
    }
    public static from_objArray_to_string(oaa: {[uid: string]: C_Team}): string {
        const oa = [] as C_Team[];
        for (const ii in oaa) oa.push(oaa[ii]);
        return JSON.stringify(oa, null, "\t");
    }
    public static from_string_to_obj(txt: string): C_Team {
        try {
            const j   = JSON.parse(txt) as C_Team[];
            return new C_Team(j);
        } catch (err) {
            return new C_Team();
        };
    }
    public static from_string_to_objArray(txt: string): {[uid: string]: C_Team} {
        try {
            const j   = JSON.parse(txt) as JSON_Team[];
            const mpa = {} as {[id: string]: C_Team};
            for (const jj of j) {
                const aaa = new C_Team().decode(jj);
                mpa[aaa.uid()] = aaa;
            }
            return mpa;
        } catch (err) {
            return {};
        };
    }
*/
    
    public encode(): JSON_Team {
        this.get_loc(); // Location情報を最新に更新

        const json_heroes: JSON_Hero[] = [];
        for (let ii in this.heroes) json_heroes.push(this.heroes[ii].encode());  

        return {
            id:        this.my_id,
            name:      this.my_name,
            uniq_id:   this.uniq_id,
            save_id:   this.save_id,
            locate:    this.myWalker.encode(),
            gold:      this.gold,
//            goods:     this.goods.encode(),
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

        if (a.locate !== undefined)  this.myWalker.decode(a.locate);
        if (a.gold   !== undefined)  this.gold = a.gold;
//        if (a.goods  !== undefined)  this.goods.decode(a.goods);

        if (a.heroes !== undefined)  {
            this.heroes = {};
            for (const json_hero of a.heroes) {
                const hero = new C_Hero(json_hero);
                this.heroes[hero.uid()] = hero;
            }
        }
/*
        if (a.view    !== undefined) {
            if (Object.keys(a.view).length > 0) this.myView = C_MazeObjView.newObj(a.view); 
            else this.myView = new C_CurrentTeamView(this) as I_MazeObjView; 
        }
*/
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
        alert("Team Info:" 
            + "\nid:    "     + (this.my_id            ?? '?')
            + "\nuniq_id:  "  + (this.uniq_id          ?? '?')
            + "\nname:  "     + (this.my_name          ?? '?')
            + "\nsave_id: "   + (this.save_id          ?? '?')
            + "\nurl:  "      + (this.myWalker.url()     ?? '?')
            + "\nlckd: "      + (this.myWalker.get_lckd_str() ?? '?')
            + "\nlcnm: "      + (this.myWalker.get_name()     ?? '?')
            + "\nlcid: "      + (this.myWalker.get_uid()      ?? '?')
            + "\ncur_x: "     + (this.myWalker.get_p().x ?? '?')
            + "\ncur_y: "     + (this.myWalker.get_p().y ?? '?')
            + "\ncur_z: "     + (this.myWalker.get_p().z ?? '?')
            + "\ncur_d: "     + (this.myWalker.get_d()   ?? '?')
            + "\ngold: "      + (Object.keys(this.gold ?? {}).length)
            + "\nheroes: "    + (this.heroes?.length ?? '?')
            + "\n"
        );
    }
    public alert_hres(): void {
//        alert("Team Info:");
        for (const ii in this.heroes) this.heroes[ii].alert();
    }
}
