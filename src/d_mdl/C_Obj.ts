import { _get_uuid, _irand, _nrand }        from "../d_utl/F_Rand";
import { T_MakeEnumType }   from "../d_utl/T_MakeEnumType";
import { I_JSON, JSON_Any } from "./C_SaveData";
import { C_HeroAbility, JSON_Hero_Ability } from "./C_HeroAbility";

export const T_ObjKind:{[lckd: string]: number}  = {
    Unkn:  0,
    Chet:  1,  
    Gold:  2,
    Arms:  3,
    Shld:  5,
    Drug:  6,
    Item:  7,
} as const;
export type T_ObjKind = T_MakeEnumType<typeof T_ObjKind>;

function T_ObjKind_key(kind: T_ObjKind): string {
    return Object.keys(T_ObjKind).find(key => T_ObjKind[key] === kind) ?? "Unkn";
}

const ObjKind_mb_name: {[kind: number]: string} = {
    0:  'バグ',
    1:  '宝箱',
    2:  '金銭',
    3:  '武器',
    5:  '装備',
    6:  '薬',
    7:  '物品',
} as const;



export interface JSON_Obj extends JSON_Any {
    uniq_id?:         string,
    kind?:            string,
    name?:            string,
    ambiguous_name?:  string,
    confirmed_name?:  string,
    own_name?:        string,
    ambiguous_value?: number,
    confirmed_value?: number,
    own_value?:       number,
    is_confirmed?:    string,
    abi_p?:           JSON_Hero_Ability,
    abi_m?:           JSON_Hero_Ability,
}

export class C_Obj implements I_JSON {
    public static newObj(j?: JSON_Obj): C_Obj|undefined {
        if (j      === undefined) return undefined;
        if (j.kind === undefined) return undefined;

        if (j.kind in T_ObjKind) return new C_Obj(j);
        return undefined;
    }

    protected uniq_id:        string;
    protected my_kind:        T_ObjKind;
    protected my_name:        string;   // 下記の名前のうち、最新のもの
    protected ambiguous_name: string;   // 鑑定までの名前
    protected confirmed_name: string;   // 鑑定で確定した名前
    protected original_name:  string|undefined;  // 自分で命名したオリジナルの名前
    protected my_gold:        number;  // 金銭的価値(Gold ならその価格、その他は売買価格の基礎値)
    protected ambiguous_gold: number;  // 鑑定までの価値
    protected confirmed_gold: number;  // 鑑定で確定した価値
    protected original_gold:  number|undefined;  // オリジナル化した後の価値
    protected confirmed_lv:   number;  // 鑑定の難易度(0から100)
    protected is_confirmed:   boolean; // 鑑定で確定(True)したか否(False)か
    protected abi_p:          C_HeroAbility;
    protected abi_m:          C_HeroAbility;

    public constructor(j?: JSON_Obj) {
        this.uniq_id        =  'game_obj_' + _get_uuid();
        this.my_kind        = T_ObjKind.Unkn;
        this.confirmed_lv   = 0.0;
        this.is_confirmed   = false; 

        this.ambiguous_name = ''; 
        this.confirmed_name = ''; 
        this.original_name  = undefined; 
        this.my_name        = this.ambiguous_name; 

        this.ambiguous_gold = 0; 
        this.confirmed_gold = 0; 
        this.original_gold  = undefined; 
        this.my_gold        = this.ambiguous_gold; 

        this.abi_p          = new C_HeroAbility();
        this.abi_m          = new C_HeroAbility();

        if (j !== undefined) this.decode(j);
    }

    public uid():  string    {return this.uniq_id;};
    public kind(): T_ObjKind {return this.my_kind;};
    public name(): string    {return this.my_name};
    public gold(): number    {return this.my_gold};

    public mb_name(): string {
        return ObjKind_mb_name[this.my_kind];
    }

    public try_confirme(try_seed: number): boolean {
        const try_lv = try_seed + _nrand(-this.confirmed_lv/10.0, this.confirmed_lv/10.0);
        if (try_lv >= this.confirmed_lv) {
           this._do_confirme();
           return true; 
        }
        return false;
    }
    private _do_confirme(): string {
        this.is_confirmed   = true;
        this.my_name  = this.original_name ?? this.confirmed_name;
        this.my_gold  = this.original_gold ?? this.confirmed_gold;
        return this.my_name;
    }

    public set_own_name(original_name: string): string {
        this.original_name = original_name;
        this.my_name       = original_name;
        return this.my_name;
    }
    public set_own_gold(original_gold: number): number {
        this.original_gold = original_gold;
        this.my_gold       = original_gold;
        return this.my_gold;
    }

    public encode(): JSON_Obj {
        return {
            uniq_id:        this.uniq_id,
            kind:           T_ObjKind_key(this.my_kind),
            ambiguous_name: this.ambiguous_name,
            confirmed_name: this.confirmed_name,
            original_name:  this.original_name  ?? '',
            ambiguous_gold: this.ambiguous_gold,
            confirmed_gold: this.confirmed_gold,
            original_gold:  this.original_gold  ?? 0,
            confirmed_lv:   this.confirmed_lv,
            is_confirmed:   this.is_confirmed ? '1' : '0',
            abi_p:          this.abi_p.encode(),
            abi_m:          this.abi_m.encode(),
        }
    }
    public decode(j: JSON_Obj): C_Obj {
        if (j === undefined) return this;

        if (j.uniq_id        !== undefined) this.uniq_id        = j.uniq_id;
        if (j.kind           !== undefined) this.my_kind        = T_ObjKind[j.kind];
        if (j.ambiguous_name !== undefined) this.ambiguous_name = j.ambiguous_name;
        if (j.confirmed_name !== undefined) this.confirmed_name = j.confirmed_name;
        if (j.original_name  !== undefined) this.original_name  = j.original_name !== '' ? j.original_name : undefined;
        if (j.ambiguous_gold !== undefined) this.ambiguous_gold = j.ambiguous_gold;
        if (j.confirmed_gold !== undefined) this.confirmed_gold = j.confirmed_gold;
        if (j.original_gold  !== undefined) this.original_gold  = j.original_gold !== 0  ? j.original_gold : undefined;
        if (j.confirmed_lv   !== undefined) this.confirmed_lv   = j.confirmed_lv;
        if (j.is_confirmed   !== undefined) this.is_confirmed   = j.is_confirmed  != '0' ? true : false;
        if (j.abi_p          !== undefined) this.abi_p.decode(j.abi_p);
        if (j.abi_m          !== undefined) this.abi_m.decode(j.abi_m);

        if (this.original_name !== undefined) this.my_name = this.original_name;
        else this.my_name = this.is_confirmed ? this.confirmed_name : this.ambiguous_name;

        if (this.original_gold !== undefined) this.my_gold = this.original_gold;
        else this.my_gold = this.is_confirmed ? this.confirmed_gold : this.ambiguous_gold;

        return this;
    }
}

