type __init_arg = {
    id?:   number, 
    name?: string, 
}

export type JSON_Hero = {
    id?:   number, 
    name?: string, 
}

export function alert_heroes_info(a: (JSON_Hero|undefined)[]|undefined): void { 
    if (a === undefined) return;
    alert('Number of Hero = ' + a.length.toString());
    for (var i in a) {
        if (a[i] === undefined) continue;
        alert("Hero[" + i.toString() + "] Info:\n" 
            + "\nid:    "     + (a[i]?.id        ?? '?')
            + "\nname:  "     + (a[i]?.name      ?? '?')
            + "\n"
        );
    }
}

export class C_Hero {
    protected my_id:   number;
    protected my_name: string;

    public constructor(a?: __init_arg) {
        this.my_id   = 0;
        this.my_name = 'No Name Hero';
        if (a !== undefined) this.__init(a);
    }
    protected __init(a: __init_arg): void {
        this.my_id   = a.id   ?? this.my_id
        this.my_name = a.name ?? this.my_name;

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
            id:    this.my_id,
            name:  this.my_name,
        }
        return ret;
    }
    public decode(a: JSON_Hero|undefined): C_Hero {
        if (a === undefined) return this;
        if (a.id   !== undefined) this.my_id   = a.id;
        if (a.name !== undefined) this.my_name = a.name;
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