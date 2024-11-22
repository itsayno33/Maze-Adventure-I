"use strict";

import { I_Locate, T_Lckd }      from "./C_Location";
import { I_JSON_Uniq, JSON_Any } from "./C_SaveInfo";
import { C_Hero, JSON_Hero }     from "./C_Hero";
import { C_Goods, JSON_Goods }   from "./C_Goods";
import { _get_uuid }             from "../d_utl/F_Rand";
import { C_GoodsItem, JSON_GoodsItem, T_GoodsKind } from "./C_GoodsItem";

export interface JSON_Guild extends JSON_Any {
    id?:       number,
    uniq_id?:  string,
    save_id?:  number,
    name?:     string,
    gold?:     JSON_GoodsItem,
    heroes?:   JSON_Hero[],
}

export function alert_guld_info(a: JSON_Guild|undefined): void {
    if (a === undefined) return;
    alert("Guild Info:" 
        + "\nid:       " + (a.id        ?? '?')
        + "\nuniq_id:  " + (a.uniq_id   ?? '?')
        + "\nsave_id:  " + (a.save_id   ?? '?')
        + "\nname:     " + (a.name      ?? '?')
        + "\ngold:     " + (Object.keys(a.gold??0).length)
        + "\nheroes:   " + (a.heroes?.length ?? '?')
        + "\n"
    );
}

export class C_Guild implements I_Locate, I_JSON_Uniq {
    protected id:         number;
    protected uniq_id:    string;
    protected save_id:    number;
    protected name:       string;
    public    gold:       C_GoodsItem;
    protected heroes:     {[uid: string]: C_Hero};
    public constructor(a?: JSON_Guild) {
        this.id         = -1;
        this.uniq_id    = 'mai_guld#' + _get_uuid();
        this.save_id    = -1;
        this.name       = '';
        this.gold       = new C_GoodsItem({gkind: T_GoodsKind.Gold, value: 0});
        this.heroes     = {};
        if (a !== undefined) this.decode(a);
    }

    public uid(): string { return this.uniq_id}
    public get_lckd(): T_Lckd {return T_Lckd.Maze}
    public get_name(): string {return this.name}
    
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


    public static from_obj_to_string(oa: C_Guild): string {
        return JSON.stringify(oa, null, "\t");
    }
    public static from_objArray_to_string(oaa: {[uid: string]: C_Guild}): string {
        const oa = [] as C_Guild[];
        for (const ii in oaa) oa.push(oaa[ii]);
        return JSON.stringify(oa, null, "\t");
    }
    public static from_string_to_obj(txt: string): C_Guild {
        try {
            const j   = JSON.parse(txt) as JSON_Guild[];
            return new C_Guild(j);
        } catch (err) {
            return new C_Guild();
        };
    }
    public static from_string_to_objArray(txt: string): {[uid: string]: C_Guild} {
        try {
            const j   = JSON.parse(txt) as JSON_Guild[];
            const mpa = {} as {[id: string]: C_Guild};
            for (const jj of j) {
                const aaa = new C_Guild().decode(jj);
                mpa[aaa.uid()] = aaa;
            }
            return mpa;
        } catch (err) {
            return {};
        };
    }


    public encode(): JSON_Guild {
        const json_heroes: JSON_Hero[] = [];
        for (let ii in this.heroes) json_heroes.push(this.heroes[ii].encode());  

        return {
            id:      this.id,
            uniq_id: this.uniq_id,
            save_id: this.save_id,
            gold:    this.gold.encode(),
            heroes:  json_heroes,
            name:    this.name,
        }
    }
    public decode(a: JSON_Guild|undefined): C_Guild {
        if (a === undefined) return this;
        
        if (a.id       !== undefined) this.id         = a.id;
        if (a.uniq_id  !== undefined) this.uniq_id    = a.uniq_id;
        if (a.save_id  !== undefined) this.save_id    = a.save_id;
        if (a.name     !== undefined) this.name       = a.name;
        if (a.gold     !== undefined) this.gold.decode (a.gold);

        if (a.heroes !== undefined)  {
            this.heroes = {};
            for (const json_hero of a.heroes) {
                const hero = new C_Hero(json_hero);
                this.heroes[hero.uid()] = hero;
            }
        }
        return this;
    }
    public static encode_all(all_guld: C_Guild[]): JSON_Guild[] {
        const all_guld_data: JSON_Guild[] = [];
        for (let guld of all_guld) {
            all_guld_data.push(guld.encode());
        }
        return all_guld_data;
    }
    public static decode_all(all_guld_data: JSON_Guild[]): C_Guild[] {
        const all_guld: C_Guild[] = [];
        for (let guld_data of all_guld_data) {
            all_guld.push((new C_Guild()).decode(guld_data));
        }
        return all_guld;
    }
    
    public alert(): void {
        alert("Guild Info:" 
            + "\nid:       " + (this.id             ?? '?')
            + "\nuniq_id:  " + (this.uniq_id        ?? '?')
            + "\nsave_id:  " + (this.save_id        ?? '?')
            + "\nname:     " + (this.name           ?? '?')
            + "\ngold:     " + (Object.keys(this.gold??0).length)
            + "\nheroes:   " + (this.heroes?.length ?? '?')
            + "\n"
        );
    }
}
