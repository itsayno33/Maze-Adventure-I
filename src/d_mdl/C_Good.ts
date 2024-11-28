import { T_MakeEnumType }                     from "../d_utl/T_MakeEnumType";
import { _get_uuid, _igrand, _irand, _nrand } from "../d_utl/F_Rand";
import { _round }                             from "../d_utl/F_Math";
import { I_Gnrl, JSON_Gnrl, C_Gnrl }          from './C_Gnrl';
import { C_Coin }                             from "./C_Coin";
import { C_Chst }                             from "./C_Chst";

export const T_GoodKind:{[lckd: string]: number}  = {
    Unkn:  0,
    Chst:  1,  
    Coin:  2,
    Arms:  3,
    Shld:  5,
    Drug:  6,
    Item:  7,
//    Enmy:  8,
    Othr: 99,
} as const;
export type T_GoodKind = T_MakeEnumType<typeof T_GoodKind>;

function T_GoodKind_key(gdkd: T_GoodKind): string {
    return Object.keys(T_GoodKind).find(key => T_GoodKind[key] === gdkd) ?? "Unkn";
}

// 2から7までは宝箱の中に入っているもの
const GoodKind_mb_name: {[kind: number]: string} = {
    0:  'バグ',
    1:  '宝箱',
    2:  '硬貨',
    3:  '武器',
    5:  '装備',
    6:  '薬品',
    7:  '装飾',
   99:  '伺か',
} as const;

export interface JSON_Good extends JSON_Gnrl {
    goodkind?: number,
    item_num?: number,
}

export interface I_Good extends I_Gnrl {
    good_kind:      ()=>T_GoodKind, 
    good_kind_name: ()=>string,
    key:   ()=>number,
    random_make:    ()=>I_Good,
}

export class C_Good extends C_Gnrl implements I_Good {

    public static newObj(j?: JSON_Good): C_Good {
        if (j          === undefined) return new C_Good({goodkind: T_GoodKind.Unkn});
        if (j.goodkind === undefined) return new C_Good({goodkind: T_GoodKind.Unkn});

        if (j.goodkind in T_GoodKind) {
            const kind =  T_GoodKind[j.goodkind];
            switch (kind) {
                case T_GoodKind.Chst: return C_Chst.newObj(j);
                case T_GoodKind.Coin: return C_Coin.newObj(j);
                default:
                    return new C_Good(j);
            }
        }
/***        
/***        const kind = T_GoodKind[j.kind];
/***        switch (kind) {
/***            case T_GoodKind.Chst:
/***            case T_GoodKind.Gold:
/***            case T_GoodKind.Arms:
/***            case T_GoodKind.Shld:
/***            case T_GoodKind.Drug:
/***            case T_GoodKind.Item:
/***            case T_GoodKind.Othr:
/***                return new C_Good(j);
/***            default:
/***                return undefined;
/***        }
/***/
        return new C_Good({goodkind: T_GoodKind.Unkn});
    }

//    protected uniq_id:    string;
//    protected my_name:    string;   // 下記の名前のうち、最新のもの
//    protected value:      number;   // 下記の価値のうち、最新のもの
//    protected gnrl_ratio: number;
//    protected my_abi_p:   C_HeroAbility;
//    protected my_abi_m:   C_HeroAbility;
//
//    protected gnrl_name:  string;   // 鑑定までの名前
//    protected real_name:  string;   // 鑑定で確定した名前
//    protected orgn_name:  string|undefined;  // 自分で命名したオリジナルの名前
//    protected gnrl_value: number;  // 鑑定までの価値
//    protected real_value: number;  // 鑑定で確定した価値
//    protected orgn_value: number|undefined;  // オリジナル化した後の価値
//    protected is_real:    boolean; // 鑑定で確定(True)したか否(False)か
//    protected is_orgn:    boolean; // オリジナル化したか否(False)か
//    protected real_lv:    number;  // 鑑定の難易度(0から100)
//    protected gnrl_ratio: number;  // 鑑定で確定する

    protected goodkind:  T_GoodKind; // 種別番号（例：1:宝箱、2:硬貨、...）
    protected item_num:  number;     // 個別の種類の番号（例：1:木の宝箱、2:銅鍵付きの宝箱、...）サブクラスで使う
    protected item_num_max = 9999999;
    public    constructor(j?: JSON_Good) {
        super(j);

        this.goodkind  = T_GoodKind.Unkn;
        this.item_num  = this.item_num_max;
        if (j !== undefined) this.decode(j);
    }

    public good_kind():    T_GoodKind {return this.goodkind;}
    public good_kind_name(): string {
        return GoodKind_mb_name[this.goodkind];
    }

    public key(): number {return this.item_num;}

    public random_make(): I_Good {
        return this;
    }

    public encode(): JSON_Good {
        const j = super.encode() as JSON_Good;
        j.goodskind = T_GoodKind_key(this.goodkind);
        j.item_num  = this.item_num_max;

        return j;
    }
    public decode(j: JSON_Good): C_Good {
        super.decode(j);
        if (j === undefined) return this;
        if (j.goodkind  !== undefined) this.goodkind  = T_GoodKind[j.goodkind];
        if (j.item_num  !== undefined) this.item_num  = j.item_num;

        return this;
    }
}
