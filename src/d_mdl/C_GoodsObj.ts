import { T_MakeEnumType }    from "../d_utl/T_MakeEnumType";
import { _get_uuid, _irand, _nrand } from "../d_utl/F_Rand";
import { I_JSON, I_JSON_Uniq, JSON_Any }  from "./C_SaveInfo";
import { C_HeroAbility, JSON_Hero_Ability } from './C_HeroAbility';

export const T_GoodsKind:{[lckd: string]: number}  = {
    Unkn:  0,
    Chst:  1,  
    Gold:  2,
    Arms:  3,
    Shld:  5,
    Drug:  6,
    Item:  7,
    Enmy:  8,
    Othr:  9,
} as const;
export type T_GoodsKind = T_MakeEnumType<typeof T_GoodsKind>;

function T_GoodsKind_key(gdkd: T_GoodsKind): string {
    return Object.keys(T_GoodsKind).find(key => T_GoodsKind[key] === gdkd) ?? "Unkn";
}

// 2から7までは宝箱の中に入っているもの
const GoodsKind_mb_name: {[kind: number]: string} = {
    0:  'バグ',
    1:  '宝箱',
    2:  '金銭',
    3:  '武器',
    5:  '装備',
    6:  '薬品',
    7:  '装飾',
    8:  '敵　',
    9:  '伺か',
} as const;

export interface JSON_GoodsObj extends JSON_Any {
    uniq_id?:    string,
    goodskind?:  string,
    name?:       string,
    ambi_name?:  string,
    cfrm_name?:  string,
    own_name?:   string,
    ambi_value?: number,
    cfrm_value?: number,
    own_value?:  number,
    ambi_ratio?: number,
    is_cfrm?:    string,
    is_orgn?:    string,
    abi_p?:      JSON_Hero_Ability,
    abi_m?:      JSON_Hero_Ability,
}

export interface I_GoodsObj extends I_JSON_Uniq {
    uid:           ()=>string, 
    goods_kind:    ()=>T_GoodsKind, 
    name:          ()=>string, 
    get_kind_name: ()=>string, 
    gold:          ()=>number, 
    abi_p:         (key: string)=>number, 
    abi_m:         (key: string)=>number, 
    
    try_confirme:  (try_seed: number)=>number, 

    set_own_name:  (org_name: string)=>string, 
    set_own_gold:  (org_gold: number)=>number, 
    set_abi_p:     (abi: C_HeroAbility)=>void, 
    set_abi_m:     (abi: C_HeroAbility)=>void, 
}

export class C_GoodsObj implements I_JSON, I_GoodsObj{

    public static newObj(j?: JSON_GoodsObj): C_GoodsObj|undefined {
        if (j           === undefined) return undefined;
        if (j.goodskind === undefined) return undefined;

        if (j.goodskind in T_GoodsKind) return new C_GoodsObj(j);
        return undefined;
/***        
/***        const kind = T_GoodsKind[j.kind];
/***        switch (kind) {
/***            case T_GoodsKind.Gold:
/***            case T_GoodsKind.Chst:
/***            case T_GoodsKind.Arms:
/***            case T_GoodsKind.Shld:
/***            case T_GoodsKind.Drug:
/***            case T_GoodsKind.Item:
/***                return new C_GoodsItem(j);
/***            default:
/***                return undefined;
/***        }
/***/
    }
    protected uniq_id:    string;
    protected goodskind:  T_GoodsKind;
    protected my_name:    string;   // 下記の名前のうち、最新のもの
    protected ambi_name:  string;   // 鑑定までの名前
    protected cfrm_name:  string;   // 鑑定で確定した名前
    protected orgn_name:  string|undefined;  // 自分で命名したオリジナルの名前
    protected value:      number;  // 金銭的価値(Gold ならその価格、その他は売買価格の基礎値)
    protected ambi_value: number;  // 鑑定までの価値
    protected cfrm_value: number;  // 鑑定で確定した価値
    protected orgn_value: number|undefined;  // オリジナル化した後の価値
    protected is_cfrm:    boolean; // 鑑定で確定(True)したか否(False)か
    protected is_orgn:    boolean; // オリジナル化したか否(False)か
    protected cfrm_lv:    number;  // 鑑定の難易度(0から100)
    protected ambi_ratio: number;  // 鑑定で確定する前の価値や能力値の割合(0から1)
    protected my_abi_p:   C_HeroAbility;
    protected my_abi_m:   C_HeroAbility;

    public constructor(j?: JSON_GoodsObj) {
        this.uniq_id    =  'goods_' + _get_uuid();
        this.goodskind  = T_GoodsKind.Unkn;
        this.is_cfrm    = false; 
        this.is_orgn    = false; 

        this.ambi_ratio = 0.1;
        this.cfrm_lv    = 0.0;

        this.ambi_name  = ''; 
        this.cfrm_name  = ''; 
        this.orgn_name  = undefined; 
        this.my_name    = this.ambi_name; 

        this.ambi_value = 0; 
        this.cfrm_value = 0; 
        this.orgn_value = undefined; 
        this.value      = this.ambi_value; 

        this.my_abi_p    = new C_HeroAbility();
        this.my_abi_m    = new C_HeroAbility();

        if (j !== undefined) this.decode(j);
    }

    public uid():        string {return this.uniq_id;};
    public name():       string {return this.my_name};
    public gold():       number {return this.value};

    public goods_kind():    T_GoodsKind {return this.goodskind;};
    public get_kind_name(): string {
        return GoodsKind_mb_name[this.goodskind];
    }

    public try_confirme(try_seed: number): number {
        const try_lv = try_seed + _nrand(-this.cfrm_lv/10.0, this.cfrm_lv/10.0);
        if (try_lv >= this.cfrm_lv) {
           this.do_confirme();
           return 0; 
        }
        return this.cfrm_lv - try_lv;
    }
    public do_confirme(): string {
        this.is_cfrm   = true;
        this.my_name   = this.orgn_name  ?? this.cfrm_name;
        this.value     = this.orgn_value ?? this.cfrm_value;
        return this.my_name;
    }
    public set_own_name(orgn_name: string): string {
        this.orgn_name = orgn_name;
        this.my_name   = orgn_name;
        return this.my_name;
    }
    public set_own_gold(orgn_value: number): number {
        this.orgn_value = orgn_value;
        this.value      = orgn_value;
        return this.value;
    }

    public abi_p(key: string): number {
        const val = this.my_abi_p.get(key);
        if (val === undefined) return 0;
        return Math.round(val * this.ambi_ratio);
    }
    public abi_m(key: string): number {
        const val = this.my_abi_m.get(key);
        if (val === undefined) return 0;
        return Math.round(val * this.ambi_ratio);
    }
    public set_abi_p(abi: C_HeroAbility): void {
        this.my_abi_p = abi;
    }
    public set_abi_m(abi: C_HeroAbility): void {
        this.my_abi_m = abi;
    }

    public random_make(kind: T_GoodsKind): C_GoodsObj {
        this.goodskind = kind;
        if (kind === T_GoodsKind.Gold)  this.value = _irand(100,1000);
        return this;
    }

    public encode(): JSON_GoodsObj {
        return {
            uniq_id:    this.uniq_id,
            goodskind:  T_GoodsKind_key(this.goodskind),
            ambi_name:  this.ambi_name,
            cfrm_name:  this.cfrm_name,
            orgn_name:  this.orgn_name ?? '',
            ambi_value: this.ambi_value,
            cfrm_value: this.cfrm_value,
            orgn_value: this.orgn_value ?? 0,
            is_cfrm:    this.is_cfrm ? '1' : '0',
            is_orgn:    this.is_orgn    ? '1' : '0',
            cfrm_lv:    this.cfrm_lv,
            ambi_ratio: this.ambi_ratio,
            abi_p:      this.my_abi_p.encode(),
            abi_m:      this.my_abi_m.encode(),
        }
    }
    public decode(j: JSON_GoodsObj): C_GoodsObj {
        if (j === undefined) return this;

        if (j.uniq_id    !== undefined) this.uniq_id    = j.uniq_id;
        if (j.goodskind  !== undefined) this.goodskind  = T_GoodsKind[j.goodskind];
        if (j.ambi_name  !== undefined) this.ambi_name  = j.ambi_name;
        if (j.cfrm_name  !== undefined) this.cfrm_name  = j.cfrm_name;
        if (j.orgn_name  !== undefined) this.orgn_name  = j.orgn_name  !== '' ? j.orgn_name : undefined;
        if (j.ambi_value !== undefined) this.ambi_value = j.ambi_value;
        if (j.cfrm_value !== undefined) this.cfrm_value = j.cfrm_value;
        if (j.orgn_value !== undefined) this.orgn_value = j.orgn_value !== 0 ? j.orgn_value : undefined;
        if (j.is_cfrm    !== undefined) this.is_cfrm    = j.is_cfrm   != '0' ? true : false;
        if (j.is_orgn    !== undefined) this.is_orgn    = j.is_orgn      != '0' ? true : false;
        if (j.cfrm_lv    !== undefined) this.cfrm_lv    = j.gen_lv;
        if (j.ambi_ratio !== undefined) this.ambi_ratio = j.ambi_ratio;
        if (j.abi_p      !== undefined) this.my_abi_p.decode(j.abi_p);
        if (j.abi_m      !== undefined) this.my_abi_m.decode(j.abi_m);

        if (this.orgn_name !== undefined) this.my_name = this.orgn_name;
        else this.my_name = this.is_cfrm ? this.cfrm_name : this.ambi_name;

        if (this.orgn_value !== undefined) this.value = this.orgn_value;
        else this.value = this.is_cfrm ? this.cfrm_value : this.ambi_value;

        return this;
    }
}

