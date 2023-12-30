type __init_arg = {
    id?:       number, 
    save_id?:  number, 
    team_id?:  number, 
    name?:     string, 
    is_hero?:  string|boolean;
    is_alive?: string|boolean;
}

export type JSON_Hero = {
    id?:       number, 
    save_id?:  number, 
    team_id?:  number, 
    name?:     string, 
    is_hero?:  string;
    is_alive?: string;
}

export function alert_heroes_info(a: (JSON_Hero|undefined)[]|undefined): void { 
    if (a === undefined) return;
    alert('Number of Hero = ' + a.length.toString());
    for (var i in a) {
        if (a[i] === undefined) continue;
        alert("Hero[" + i.toString() + "] Info:\n" 
            + "\nid:       "     + (a[i]?.id        ?? '?')
            + "\nname:     "     + (a[i]?.name      ?? '?')
            + "\nsave_id:  "     + (a[i]?.save_id   ?? '?')
            + "\nteam_id:  "     + (a[i]?.team_id   ?? '?')
            + "\nis_hero:  "     + (a[i]?.is_hero   ?? '?')
            + "\nis_alive: "     + (a[i]?.is_alive  ?? '?')
            + "\n"
        );
    }
}

export class C_Hero {
    protected my_id:    number;
    protected my_name:  string;
    protected save_id:  number; 
    protected team_id:  number; 
    protected is_hero:  boolean;
    protected is_alive: boolean;

    public constructor(a?: __init_arg) {
        this.my_id    = 0;
        this.my_name  = 'No Name Hero';
        this.save_id  = 0;
        this.team_id  = 0;
        this.is_hero  = true;
        this.is_alive = true;
        if (a !== undefined) this.__init(a);
    }
    protected __init(a: __init_arg): void {
        this.my_id   = a.id      ?? this.my_id
        this.my_name = a.name    ?? this.my_name;
        this.save_id = a.save_id ?? this.save_id
        this.team_id = a.team_id ?? this.team_id
        if (a.is_hero  !== undefined) {
            if (typeof a.is_hero  === "boolean") {
                this.is_hero  = a.is_hero;
            } else {
                this.is_hero  = (a.is_hero  != 'N') ? true: false;
            }
        }
        if (a.is_alive !== undefined) {
            if (typeof a.is_alive === "boolean") {
                this.is_alive = a.is_alive;
            } else {
                this.is_alive = (a.is_alive != 'N') ? true: false;
            }
        }
    }
    public set_prp(arg : __init_arg) {
        this.__init(arg);
    }
    public id(): string {
        return 'Hero_' + this.my_id.toString(16).padStart(5, '0');
    }
    public neme(): string {
        return this.my_name;
    }
    public encode(): JSON_Hero {
        const ret: JSON_Hero = {
            id:        this.my_id,
            name:      this.my_name,
            save_id:   this.save_id,
            team_id:   this.team_id,
            is_hero:  (this.is_hero)  ? 'Y' : 'N', 
            is_alive: (this.is_alive) ? 'Y' : 'N', 
        }
        return ret;
    }
    public decode(a: JSON_Hero|undefined): C_Hero {
        if (a === undefined) return this;
        if (a.id       !== undefined) this.my_id   = a.id;
        if (a.name     !== undefined) this.my_name = a.name;
        if (a.save_id  !== undefined) this.save_id   = a.save_id;
        if (a.team_id  !== undefined) this.team_id   = a.team_id;
        if (a.is_hero  !== undefined)  this.is_hero  = (a.is_hero  != 'N') ? true : false;
        if (a.is_alive !== undefined)  this.is_alive = (a.is_alive != 'N') ? true : false;
        return this;
    }
    public static create_hero(): C_Hero {
        const new_hero = new C_Hero();
        new_hero.set_prp({id:    Math.floor(-1000.0 * Math.random())});
        new_hero.set_prp({name:  new_hero.id()});
        return new_hero;
    }
    public static encode_heroes(heroes: C_Hero[]): JSON_Hero[] {
        const heroes_data = [] as JSON_Hero[];
        for (var hero of heroes) {
            heroes_data.push(hero.encode());
        }
        return heroes_data;
    }
    public static decode_heroes(heroes_data: (JSON_Hero|undefined)[]|undefined): C_Hero[] {
        const heroes = [] as C_Hero[];
        if (heroes_data !== undefined) {
            for (var hero_data of heroes_data) {
                heroes.push(new C_Hero().decode(hero_data));
            }
        }
        return heroes;
    }
}