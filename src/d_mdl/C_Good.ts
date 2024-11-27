import { T_MakeEnumType }            from "../d_utl/T_MakeEnumType";
import { _get_uuid, _igrand, _irand, _nrand } from "../d_utl/F_Rand";
import { I_Gnrl, JSON_Gnrl, C_Gnrl } from './C_Gnrl';
import { _round } from "../d_utl/F_Math";
import { C_GoodsList, JSON_GoodsList } from "./C_GoodsList";

export const T_GoodKind:{[lckd: string]: number}  = {
    Unkn:  0,
    Chst:  1,  
    Gold:  2,
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
    2:  '金銭',
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
            const kind = T_GoodKind[j.goodkind];
            switch (kind) {
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
    public constructor(j?: JSON_Good) {
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


/***************************
 * 硬貨 (20000代)
***************************/
export const T_CoinKind:{[lckd: string]: number}  = {
    Unkn:   20000,
    Comn:   20001,  
} as const;
export type T_CoinKind = T_MakeEnumType<typeof T_CoinKind>;

function T_CoinKind_key(gdkd: T_CoinKind): string {
    return Object.keys(T_CoinKind).find(key => T_CoinKind[key] === gdkd) ?? "Unkn";
}

const CoinKind_mb_name: {[kind: number]: string} = {
    20000:  'バグ硬貨',
    20001:  '標準硬貨',
} as const;

export interface JSON_Coin extends JSON_Good {
    key_lvl?: number;
}

export class C_Coin extends C_Good {
    protected key_lvl = 0; // 宝箱の鍵レベル 0:鍵なしの木箱, 1:銅の鍵付き宝箱, ...
    public constructor(j: JSON_Coin) {
        super(j);

        this.goodkind   = T_GoodKind.Gold;
        this.item_num   = T_CoinKind.Comn;
        this.gnrl_ratio = 0.5;
        this.gnrl_name  = '何かのコイン？';

        if (j !== undefined) this.decode(j);
    }
    public set_gold(gold: number): I_Good {
        this.value = gold;
        return this;
    }
    public random_make(): I_Good { /******************************** あとで考える **********************************/
        const kitei = 10 ** (this.key_lvl + 1)
        const value = _irand(5 * kitei, 10 * kitei);
        this.decode({item_num: _irand(0,0), key_lvl: 0, value: _round(value*this.gnrl_ratio, 0)});

        return this;    
    }
    public encode(): JSON_Coin {
        const j   = super.encode() as JSON_Coin;
        j.key_lvl = this.key_lvl;
        return j;
    }
    public decode(j: JSON_Coin): C_Coin {
        super.decode(j);
        if (j === undefined) return this;
        if (j.key_lvl   !== undefined) this.key_lvl = j.key_lvl;
        return this;
    }
}


/**********************
 * 宝箱 (10000代)
**********************/
export const T_ChstKind:{[lckd: string]: number}  = {
    Unkn:   10000,
    Wood:   10001,  
    Cppr:   10002,  
    Slvr:   10003,  
    Gold:   10005,  
} as const;
export type T_ChstKind = T_MakeEnumType<typeof T_ChstKind>;

function T_ChstKind_key(gdkd: T_ChstKind): string {
    return Object.keys(T_ChstKind).find(key => T_ChstKind[key] === gdkd) ?? "Unkn";
}

const ChstKind_mb_name: {[kind: number]: string} = {
    10000:  'バグ製宝箱',
    10001:  '木製の宝箱',
    10002:  '銅製の宝箱',
    10003:  '銀製の宝箱',
    10005:  '金製の宝箱',
} as const;

export interface JSON_Chst extends JSON_Good {
    key_lvl?: number;
    list?:    JSON_GoodsList;
}

export class C_Chst extends C_Good {
    protected key_lvl = 0; // 宝箱の鍵レベル 0:鍵なしの木箱, 1:銅の鍵付き宝箱, ...
    protected list:   C_GoodsList;
    public constructor(j: JSON_Chst) {
        super(j);

        this.goodkind   = T_GoodKind.Chst;
        this.item_num   = T_ChstKind.Wood;
        this.gnrl_ratio = 1.0;
        this.gnrl_name  = 'ただの箱？';

        this.list = new C_GoodsList();
        if (j !== undefined) this.decode(j);
    }
    can_open(tyr_seed: number): boolean {
        const daze10 = _irand(0,9);
        const try_level = tyr_seed + daze10;
        return (try_level > this.key_lvl * 10) ? true : false;
    }
    public get_item_one(): I_Good|undefined {
        return this.list.pop_one();
    }
    public get_item_qty(qty:number): I_Good|undefined {
        return this.list.pop_qty(qty);
    }
    public add_item(item: I_Good): C_Chst {
        this.list.add(item);return this;
    }
    public add_item_array(item: I_Good[]): C_Chst {
        this.list.add_list(item);return this;
    }
    public rmv_item_one(item: I_Good): C_Chst {
        this.list.rmv_one(item);return this;
    }
    public rmv_item_qty(item: I_Good, qty:number): C_Chst {
        this.list.rmv_qty(item, qty);return this;
    }
    public rmv_item_all(): C_Chst {
        this.list.clr();    return this;
    }
    public random_make(): I_Good { /******************************** あとで考える **********************************/
        const coin = C_Good.newObj({goodkind: T_GoodKind.Coin})?.random_make();
        return coin;
    }
    public encode(): JSON_Chst {
        const j    = super.encode() as JSON_Chst;
        j.key_lvl  = this.key_lvl;
        j.list     = this.list.encode();

        return j;
    }
    public decode(j: JSON_Chst): C_Chst {
        super.decode(j);
        if (j === undefined) return this;
        if (j.key_lvl   !== undefined) this.key_lvl = j.key_lvl;
        if (j.list      !== undefined) this.list    = j.list.decode(j.list);

        return this;
    }
}
