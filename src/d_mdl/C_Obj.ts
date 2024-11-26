"use strict";

import { _get_uuid, _irand, _nrand }        from "../d_utl/F_Rand";
import { T_MakeEnumType }                   from "../d_utl/T_MakeEnumType";
import { JSON_Any }                         from "./C_SaveInfo";
import { C_HeroAbility, JSON_Hero_Ability } from "./C_HeroAbility";
import { C_GoodsObj, JSON_GoodsObj }        from "./C_GoodsObj";

export const T_ObjKind:{[lckd: string]: number}  = {
    Unkwn: 0,
    Equip: 1,  // 自立型静止物
    Goods: 2,  // 非自立型静止物
    Enemy: 3,  // 自立型移動物 
    Mover: 5,  // 非自立型移動物 (魔法とか矢とか)
    Other: 6,
} as const;
export type T_ObjKind = T_MakeEnumType<typeof T_ObjKind>;

function T_ObjKind_key(kind: T_ObjKind): string {
    return Object.keys(T_ObjKind).find(key => T_ObjKind[key] === kind) ?? "Unkn";
}

const ObjKind_mb_name: {[kind: number]: string} = {
    0:  'バ　グ',
    2:  '仕掛け',
    1:  '持ち物',
    3:  '　敵　',
    5:  '移動物',
    6:  '何　か',
} as const;



export interface JSON_Obj extends JSON_Any {
    uniq_id?:   string,
    objkind?:   string,
    name?:      string,
    amb_ratio?: number,
    gen_name?:  string,
    own_name?:  string,
    gold?:      number,
    is_gen?:    string,
    abi_p?:     JSON_Hero_Ability,
    abi_m?:     JSON_Hero_Ability,
}


export interface I_Obj extends JSON_Any{
    uid:      ()=>string, 
    obj_kind: ()=>T_ObjKind, 
    name:     ()=>string, 
    mb_name:  ()=>string, 
    gold:     ()=>number, 
    abi_p:    (key: string)=>number, 
    abi_m:    (key: string)=>number, 
    
    try_confirme: (try_seed: number)=>number, 

    set_own_name: (org_name: string)=>string, 
    set_own_gold: (org_gold: number)=>number, 
    set_abi_p: (abi: C_HeroAbility)=>void, 
    set_abi_m: (abi: C_HeroAbility)=>void, 
}

export class C_Obj implements I_Obj {
    public static newObj(j?: JSON_Obj|undefined): C_Obj|undefined {
        if (j      === undefined) return undefined;
        if (j.okind === undefined) return undefined;

//        if (j.kind in T_ObjKind) return new C_Obj(j);
        switch (T_ObjKind[j.okind??T_ObjKind.Unkwn]) {
            case T_ObjKind.Goods: return C_GoodsObj.newObj(j as JSON_GoodsObj);
            case T_ObjKind.Other: return new C_Obj(j); 
        }
        return undefined;
    }
    public newObj(j?: JSON_Obj|undefined): C_Obj|undefined {
        return C_Obj.newObj(j);
    }
    protected uniq_id:     string;
    protected my_objkind:  T_ObjKind;
    protected is_gen:      boolean;     // 鑑定で確定(True)したか否(False)か
    protected gen_lv:      number;      // 鑑定の難易度(0から100)
    protected amb_ratio:   number;      // 鑑定で確定する前の価値や能力値の割合(0から1)
    protected my_name:     string;      // 下記の名前のうち、最新のもの
    protected amb_name:    string;      // 鑑定までの名前
    protected gen_name:    string;      // 鑑定で確定した名前
    protected org_name:    string|undefined;  // 自分で命名したオリジナルの名前
    protected my_gold:     number;      // 金銭的価値(Gold ならその価格、その他は売買価格の基礎値)
    protected my_abi_p:    C_HeroAbility;
    protected my_abi_m:    C_HeroAbility;

//    protected constructor(j?: JSON_Obj|undefined) {
    public constructor(j?: JSON_Obj|undefined) {
        this.uniq_id     =  'game_obj_' + _get_uuid();
        this.my_objkind  = T_ObjKind.Unkn;
 
        this.amb_ratio   = 0.1;
        this.gen_lv      = 0.0;
        this.is_gen      = false; 

        this.amb_name    = '『不明な何か』'; 
        this.gen_name    = ''; 
        this.org_name    = undefined; 
        this.my_name     = this.amb_name; 

        this.my_gold     = 0; 

        this.my_abi_p    = new C_HeroAbility();
        this.my_abi_m    = new C_HeroAbility();

        if (j !== undefined) this.decode(j);
    }

    public uid():      string    {return this.uniq_id;};
    public obj_kind(): T_ObjKind {return this.my_objkind;};
    public name():     string    {return this.my_name};
    public gold():     number    {return Math.round(this.my_gold * this.amb_ratio)};

    public mb_name():  string {
        return ObjKind_mb_name[this.my_objkind];
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

    public abi_p(key: string): number {
        const val = this.my_abi_p.get(key);
        if (val === undefined) return 0;
        return Math.round(val * this.amb_ratio);
    }
    public abi_m(key: string): number {
        const val = this.my_abi_m.get(key);
        if (val === undefined) return 0;
        return Math.round(val * this.amb_ratio);
    }
    public set_abi_p(abi: C_HeroAbility): void {
        this.my_abi_p = abi;
    }
    public set_abi_m(abi: C_HeroAbility): void {
        this.my_abi_m = abi;
    }

    public encode(): JSON_Obj {
        return {
            uniq_id:    this.uniq_id,
            objkind:    T_ObjKind_key(this.my_objkind),
            gen_lv:     this.gen_lv,
            is_gen:     this.is_gen ? '1' : '0',
            amb_ratio:  this.amb_ratio,
            gen_name:   this.gen_name,
            org_name:   this.org_name  ?? '',
            gold:       this.my_gold, 
            abi_p:      this.my_abi_p.encode(),
            abi_m:      this.my_abi_m.encode(),
        }
    }
    public decode(j: JSON_Obj): C_Obj {
        if (j === undefined) return this;

        if (j.uniq_id    !== undefined) this.uniq_id   = j.uniq_id;
        if (j.objkind    !== undefined) { 
            this.my_objkind   = T_ObjKind[j.objkind]; 
            this.amb_name     = ObjKind_mb_name[this.my_objkind]; 
        }
        if (j.gen_lv     !== undefined) this.gen_lv    = j.gen_lv;
        if (j.is_gen     !== undefined) this.is_gen    = j.is_gen  != '0' ? true : false;
        if (j.amb_ratio  !== undefined) this.amb_ratio = j.amb_ratio;
        if (j.gen_name   !== undefined) this.gen_name  = j.gen_name;
        if (j.org_name   !== undefined) this.org_name  = j.org_name !== '' ? j.org_name : undefined;
        if (j.gold       !== undefined) this.my_gold   = j.gold;
        if (j.abi_p      !== undefined) this.my_abi_p.decode(j.abi_p);
        if (j.abi_m      !== undefined) this.my_abi_m.decode(j.abi_m);

        if (this.org_name !== undefined) this.my_name = this.org_name;
        else this.my_name = this.is_gen ? this.gen_name : this.amb_name;

        return this;
    }
}

