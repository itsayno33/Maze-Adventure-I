import { C_Hero, JSON_Hero } from "./C_Hero";
import { I_Locate, T_Lckd } from "./C_Location";
import { C_Team, JSON_Team } from "./C_Team";
import { _get_uuid } from "./F_Rand";

export type JSON_Guild = {
    id?:      number,
    uniq_id?: string,
    save_id?: number,
    name?:    string,
    team?:    JSON_Team,
    heroes?:  JSON_Hero[],
}

export function alert_guld_info(a: JSON_Guild|undefined): void {
    if (a === undefined) return;
    alert("Team Info:" 
        + "\nid:      " + (a.id      ?? '?')
        + "\nuniq_id: " + (a.uniq_id ?? '?')
        + "\nsave_id: " + (a.save_id ?? '?')
        + "\nname:    " + (a.name    ?? '?')
        + "\n"
    );
}

export class C_Guild implements I_Locate {
    protected id:      number;
    protected uniq_id: string;
    protected save_id: number;
    protected name:    string;
    public    myteam:  C_Team;

    public constructor(a?: JSON_Guild) {
        this.id      = -1;
        this.uniq_id = 'mai_guld#' + _get_uuid();
        this.save_id = -1;
        this.name    = '';
        this.myteam  = new C_Team();
        if (a !== undefined) this.decode(a);
    }

    public uid(): string { return this.uniq_id}
    public get_lckd(): T_Lckd {return T_Lckd.Maze}
    public get_name(): string {return this.name}
    
    public encode(): JSON_Guild {
        return {
            id:      this.id,
            uniq_id: this.uniq_id,
            save_id: this.save_id,
            team:    this.myteam.encode(),
            name:    this.name,
        }
    }
    public decode(a: JSON_Guild): C_Guild {
        this.id      = a.id ?? this.id;
        this.uniq_id = a.uniq_id ?? this.uniq_id;
        this.save_id = a.save_id ?? this.save_id;
        this.name    = a.name ?? this.name;
        if (a.team   !== undefined) this.myteam.decode(a.team);
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
