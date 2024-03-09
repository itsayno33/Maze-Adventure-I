"use strict";

import { _get_uuid, _irand, _nrand }        from "../d_utl/F_Rand";
import { T_MakeEnumType }                   from "../d_utl/T_MakeEnumType";
import { I_Abstract, JSON_Any }             from "./C_SaveData";
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
    uniq_id?:   string,
    okind?:     string,
    name?:      string,
    amb_ratio?: number,
    gen_name?:  string,
    own_name?:  string,
    gold?:      number,
    is_gen?:    string,
    abi_p?:     JSON_Hero_Ability,
    abi_m?:     JSON_Hero_Ability,
}

export class C_Obj implements I_Abstract {
    public static newObj(j?: JSON_Obj): C_Obj|undefined {
        if (j      === undefined) return undefined;
        if (j.kind === undefined) return undefined;

        if (j.kind in T_ObjKind) return new C_Obj(j);
        return undefined;
    }
    public newObj(j?: JSON_Obj): C_Obj|undefined {
        return C_Obj.newObj(j);
    }

    protected uniq_id:   string;
    protected my_okind:  T_ObjKind;
    protected is_gen:    boolean;     // 鑑定で確定(True)したか否(False)か
    protected gen_lv:    number;      // 鑑定の難易度(0から100)
    protected amb_ratio: number;      // 鑑定で確定する前の価値や能力値の割合(0から1)
    protected my_name:   string;      // 下記の名前のうち、最新のもの
    protected amb_name:  string;      // 鑑定までの名前
    protected gen_name:  string;      // 鑑定で確定した名前
    protected org_name:  string|undefined;  // 自分で命名したオリジナルの名前
    protected my_gold:   number;      // 金銭的価値(Gold ならその価格、その他は売買価格の基礎値)
    protected abi_p:     C_HeroAbility;
    protected abi_m:     C_HeroAbility;

    public constructor(j?: JSON_Obj) {
        this.uniq_id     =  'game_obj_' + _get_uuid();
        this.my_okind    = T_ObjKind.Unkn;
 
        this.amb_ratio   = 0.1;
        this.gen_lv      = 0.0;
        this.is_gen      = false; 

        this.amb_name    = '『不明な何か』'; 
        this.gen_name    = ''; 
        this.org_name    = undefined; 
        this.my_name     = this.amb_name; 

        this.my_gold     = 0; 

        this.abi_p       = new C_HeroAbility();
        this.abi_m       = new C_HeroAbility();

        if (j !== undefined) this.decode(j);
    }

    public uid():   string    {return this.uniq_id;};
    public okind(): T_ObjKind {return this.my_okind;};
    public name():  string    {return this.my_name};
    public gold():  number    {return Math.round(this.my_gold * this.amb_ratio)};

    public mb_name(): string {
        return ObjKind_mb_name[this.my_okind];
    }

    public try_confirme(try_seed: number): number {
        const try_lv = try_seed + _nrand(-this.gen_lv/10.0, this.gen_lv/10.0);
        if (try_lv >= this.gen_lv) {
           this._do_confirme();
           return 0; 
        }
        return try_lv - this.gen_lv;
    }
    private _do_confirme(): void { 
        this.my_name    = this.org_name ?? this.gen_name ?? this.amb_name;
        this.amb_ratio  = 1.0;
        return; 
    }

    public set_own_name(org_name: string): string {
        this.org_name = org_name;
        this.my_name  = org_name;
        return this.my_name;
    }
    public set_own_gold(org_gold: number): number {
        this.my_gold    = org_gold;
        return this.my_gold;
    }

    public get_abi_p(key: string): number {
        const val = this.abi_p.get(key);
        if (val === undefined) return 0;
        return Math.round(val * this.amb_ratio);
    }
    public get_abi_m(key: string): number {
        const val = this.abi_m.get(key);
        if (val === undefined) return 0;
        return Math.round(val * this.amb_ratio);
    }
    public set_abi_p(abi: C_HeroAbility): void {
        this.abi_p = abi;
    }
    public set_abi_m(abi: C_HeroAbility): void {
        this.abi_m = abi;
    }

    public encode(): JSON_Obj {
        return {
            uniq_id:     this.uniq_id,
            okind:       T_ObjKind_key(this.my_okind),
            gen_lv:      this.gen_lv,
            is_gen:      this.is_gen ? '1' : '0',
            amb_ratio:   this.amb_ratio,
            gen_name:    this.gen_name,
            org_name:    this.org_name  ?? '',
            gold:        this.my_gold, 
            abi_p:       this.abi_p.encode(),
            abi_m:       this.abi_m.encode(),
        }
    }
    public decode(j: JSON_Obj): C_Obj {
        if (j === undefined) return this;

        if (j.uniq_id    !== undefined) this.uniq_id   = j.uniq_id;
        if (j.okind      !== undefined) { 
            this.my_okind   = T_ObjKind[j.okind]; 
            this.amb_name   = ObjKind_mb_name[this.my_okind]; 
        }
        if (j.gen_lv     !== undefined) this.gen_lv    = j.gen_lv;
        if (j.is_gen     !== undefined) this.is_gen    = j.is_gen  != '0' ? true : false;
        if (j.amb_ratio  !== undefined) this.amb_ratio = j.amb_ratio;
        if (j.gen_name   !== undefined) this.gen_name  = j.gen_name;
        if (j.org_name   !== undefined) this.org_name  = j.org_name !== '' ? j.org_name : undefined;
        if (j.gold       !== undefined) this.my_gold   = j.gold;
        if (j.abi_p      !== undefined) this.abi_p.decode(j.abi_p);
        if (j.abi_m      !== undefined) this.abi_m.decode(j.abi_m);

        if (this.org_name !== undefined) this.my_name = this.org_name;
        else this.my_name = this.is_gen ? this.gen_name : this.amb_name;

        return this;
    }
}

