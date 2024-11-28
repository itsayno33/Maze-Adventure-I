import { T_MakeEnumType }                        from "../d_utl/T_MakeEnumType";
import { _get_uuid, _igrand, _irand, _nrand }    from "../d_utl/F_Rand";
import { _round }                                from "../d_utl/F_Math";
import { C_GoodsList, JSON_GoodsList }           from "./C_GoodsList";
import { C_Good, I_Good, JSON_Good, T_GoodKind } from "./C_Good";

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
    val?: {
        key_lvl?: number;
        list?:    JSON_GoodsList;
    }
}

export class C_Chst extends C_Good {

    public static newObj(j?: JSON_Good): C_Chst {
        if (j          === undefined) return new C_Chst({goodkind: T_GoodKind.Unkn});
        if (j.item_num === undefined) return new C_Chst({goodkind: T_GoodKind.Unkn});

        if (j.item_num in T_ChstKind) {
            const kind =  T_ChstKind[j.item_num];
            switch (kind) {
                default:
                    return new C_Chst(j);
            }
        }
        return new C_Chst(j);
    }


    protected key_lvl = 0; // 宝箱の鍵レベル 0:鍵なしの木箱, 1:銅の鍵付き宝箱, ...
    protected list:   C_GoodsList;
    public constructor(j?: JSON_Chst) {
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
        j.val ??= {}
        j.val.key_lvl  = this.key_lvl;
        j.val.list     = this.list.encode();

        return j;
    }
    public decode(j: JSON_Chst): C_Chst {
        super.decode(j);
        if (j === undefined) return this;
        if (j.val?.key_lvl   !== undefined) this.key_lvl = j.val?.key_lvl ?? 0;
        if (j.val?.list      !== undefined) this.list    = j.val?.list.decode(j.list);

        return this;
    }
}
