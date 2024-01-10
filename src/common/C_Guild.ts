import { C_Hero, JSON_Hero } from "./C_Hero";

export type JSON_Guild = {
    id?:      number,
    save_id?: number,
    team_id?: number,
    name?:    string,
    heroes?:  JSON_Hero[],
}

export function alert_guld_info(a: JSON_Guild|undefined): void {
    if (a === undefined) return;
    alert("Team Info:" 
        + "\nid:      " + (a.id      ?? '?')
        + "\nsave_id: " + (a.save_id ?? '?')
        + "\nteam_id: " + (a.team_id ?? '?')
        + "\nname:    " + (a.name    ?? '?')
        + "\n"
    );
}

export class C_Guild {
    public id:      number;
    public save_id: number;
    public team_id: number;
    public name:    string;
    public heroes:  C_Hero[];

    public constructor(a?: JSON_Guild) {
        this.id      = -1;
        this.save_id = -1;
        this.team_id = -1;
        this.name    = '';
        this.heroes  = [];
        if (a !== undefined) this.decode(a);
    }

    public hres(): C_Hero[] {
        return [...this.heroes];
    }

    
    public encode(): JSON_Guild {
        return {
            id:      this.id,
            save_id: this.save_id,
            team_id: this.team_id,
            name:    this.name,
            heroes:  C_Hero.encode_heroes(this.heroes),
        }
    }
    public decode(a: JSON_Guild): C_Guild {
        this.id      = a.id ?? this.id;
        this.save_id = a.save_id ?? this.save_id;
        this.team_id = a.team_id ?? this.team_id;
        this.name    = a.name ?? this.name;
        if (a.heroes !== undefined) this.heroes  = C_Hero.decode_heroes(a.heroes);
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
}
