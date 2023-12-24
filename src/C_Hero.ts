type __init_arg = {
    id?:   number, 
    name?: string, 
}

type __JSON_arg = {
    id?:   number, 
    name?: string, 
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
    public encode(): __JSON_arg {
        const ret: __JSON_arg = {
            id:    this.my_id,
            name:  this.my_name,
        }
        return ret;
    }
    public decode(a: __JSON_arg): C_Hero {
        if (a.id   !== undefined) this.my_id   = a.id;
        if (a.name !== undefined) this.my_name = a.name;
        return this;
    }
    public static encode_heroes(heroes: C_Hero[]): __JSON_arg[] {
        const heroes_data = [] as __JSON_arg[];
        for (var hero of heroes) {
            heroes_data.push(hero.encode());
        }
        return heroes_data;
    }
    public static decode_heroes(heroes_data: __JSON_arg[]): C_Hero[] {
        const heroes = [] as C_Hero[];
        if (heroes_data !== undefined) {
            for (var hero_data of heroes_data) {
                heroes.push(new C_Hero().decode(hero_data));
            }
        }
        return heroes;
    }
}