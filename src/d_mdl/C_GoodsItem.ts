import { T_MakeEnumType }    from "../d_utl/T_MakeEnumType";
import { _get_uuid, _irand } from "../d_utl/F_Rand";
import { I_JSON, JSON_Any }  from "./C_SaveInfo";
import { C_Obj, JSON_Obj }             from './C_Obj';

export const T_GoodsKind:{[lckd: string]: number}  = {
    Unkn:  0,
    Chst:  1,  
    Gold:  2,
    Arms:  3,
    Shld:  5,
    Drug:  6,
    Othr:  7,
} as const;
export type T_GoodsKind = T_MakeEnumType<typeof T_GoodsKind>;

function T_GoodsKind_key(gdkd: T_GoodsKind): string {
    return Object.keys(T_GoodsKind).find(key => T_GoodsKind[key] === gdkd) ?? "Unkn";
}

const GoodsKind_mb_name: {[kind: number]: string} = {
    0:  'バグ',
    1:  '宝箱',
    2:  '金銭',
    3:  '武器',
    5:  '装備',
    6:  '薬',
    7:  '物品',
} as const;



export interface JSON_GoodsItem extends JSON_Obj {
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
}

export class C_GoodsItem extends C_Obj implements I_JSON {
    public static newObj(j?: JSON_GoodsItem): C_GoodsItem|undefined {
        if (j      === undefined) return undefined;
        if (j.kind === undefined) return undefined;

        if (j.kind in T_GoodsKind) return new C_GoodsItem(j);
        return undefined;
/***        
/***        const kind = T_GoodsKind[j.kind];
/***        switch (kind) {
/***            case T_GoodsKind.Gold:
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
    protected uniq_id:         string;
    protected kind:            T_GoodsKind;
    protected my_name:            string;   // 下記の名前のうち、最新のもの
    protected ambiguous_name:  string;   // 鑑定までの名前
    protected confirmed_name:  string;   // 鑑定で確定した名前
    protected original_name:   string|undefined;  // 自分で命名したオリジナルの名前
    protected value:           number;  // 金銭的価値(Gold ならその価格、その他は売買価格の基礎値)
    protected ambiguous_value: number;  // 鑑定までの価値
    protected confirmed_value: number;  // 鑑定で確定した価値
    protected original_value:  number|undefined;  // オリジナル化した後の価値
    protected is_confirmed:    boolean; // 鑑定で確定(True)したか否(False)か

    public constructor(j?: JSON_GoodsItem) {
        super(j);
        this.uniq_id        =  'goods_' + _get_uuid();
        this.kind           = T_GoodsKind.Unkn;
        this.is_confirmed   = false; 

        this.ambiguous_name = ''; 
        this.confirmed_name = ''; 
        this.original_name  = undefined; 
        this.my_name           = this.ambiguous_name; 

        this.ambiguous_value = 0; 
        this.confirmed_value = 0; 
        this.original_value  = undefined; 
        this.value           = this.ambiguous_value; 

        if (j !== undefined) this.decode(j);
    }

    public uid(): string {return this.uniq_id;};
    public get_kind(): T_GoodsKind {return this.kind;};
    public get_name(): string {return this.my_name};
    public get_gold(): number {return this.value};

    public get_kind_name(): string {
        return GoodsKind_mb_name[this.kind];
    }

    public do_confirme(): string {
        this.is_confirmed   = true;
        this.my_name        = this.original_name  ?? this.confirmed_name;
        this.value          = this.original_value ?? this.confirmed_value;
        return this.my_name;
    }
    public set_own_name(original_name: string): string {
        this.original_name  = original_name;
        this.my_name        = original_name;
        return this.my_name;
    }
    public set_own_value(original_value: number): number {
        this.original_value = original_value;
        this.value          = original_value;
        return this.value;
    }

    public random_make(kind: T_GoodsKind): C_GoodsItem {
        this.kind = kind;
        if (kind === T_GoodsKind.Gold)  this.value = _irand(100,1000);
        return this;
    }

    public encode(): JSON_GoodsItem {
        return {
            uniq_id:         this.uniq_id,
            kind:            T_GoodsKind_key(this.kind),
            ambiguous_name:  this.ambiguous_name,
            confirmed_name:  this.confirmed_name,
            original_name:   this.original_name ?? '',
            ambiguous_value: this.ambiguous_value,
            confirmed_value: this.confirmed_value,
            original_value:  this.original_value ?? 0,
            is_confirmed:    this.is_confirmed ? '1' : '0',
        }
    }
    public decode(j: JSON_GoodsItem): C_GoodsItem {
        if (j === undefined) return this;

        if (j.uniq_id         !== undefined) this.uniq_id          = j.uniq_id;
        if (j.kind            !== undefined) this.kind             = T_GoodsKind[j.kind];
        if (j.ambiguous_name  !== undefined) this.ambiguous_name   = j.ambiguous_name;
        if (j.confirmed_name  !== undefined) this.confirmed_name   = j.confirmed_name;
        if (j.original_name   !== undefined) this.original_name    = j.original_name !== '' ? j.original_name : undefined;
        if (j.ambiguous_value !== undefined) this.ambiguous_value  = j.ambiguous_value;
        if (j.confirmed_value !== undefined) this.confirmed_value  = j.confirmed_value;
        if (j.original_value  !== undefined) this.original_value   = j.original_value !== 0 ? j.original_value : undefined;
        if (j.is_confirmed    !== undefined) this.is_confirmed     = j.is_confirmed != '0' ? true : false;

        if (this.original_name !== undefined) this.my_name = this.original_name;
        else this.my_name = this.is_confirmed ? this.confirmed_name : this.ambiguous_name;

        if (this.original_value !== undefined) this.value = this.original_value;
        else this.value = this.is_confirmed ? this.confirmed_value : this.ambiguous_value;

        return this;
    }
}

