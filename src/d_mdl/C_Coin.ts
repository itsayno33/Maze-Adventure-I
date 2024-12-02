import { T_MakeEnumType }                        from "../d_utl/T_MakeEnumType";
import { _get_uuid, _igrand, _irand, _nrand }    from "../d_utl/F_Rand";
import { _round }                                from "../d_utl/F_Math";
import { C_Good, I_Good, JSON_Good, T_GoodKind } from "./C_Good";

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
    val?: {key_lvl?: number};
}

export class C_Coin extends C_Good {

    public static newObj(j?: JSON_Good): C_Coin {
        if (j          === undefined) return new C_Coin({goodkind: T_GoodKind.Unkn});
        if (j.item_num === undefined) return new C_Coin({goodkind: T_GoodKind.Unkn});

        if (j.item_num in T_CoinKind) {
            const kind =  T_CoinKind[j.item_num];
            switch (kind) {
                default:
                    return new C_Coin(j);
            }
        }
        return new C_Coin(j);
    }


    protected key_lvl = 0; // 宝箱の鍵レベル 0:鍵なしの木箱, 1:銅の鍵付き宝箱, ...
    public constructor(j?: JSON_Coin) {
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
        this.decode({item_num: _irand(0,0), value: _round(value*this.gnrl_ratio, 0),val:{key_lvl: 0, }});

        return this;    
    }
    public encode(): JSON_Coin {
        const j   = super.encode() as JSON_Coin;
        j.val ??= {};
        j.val.key_lvl = this.key_lvl;
        return j;
    }
    public decode(j: JSON_Coin): C_Coin {
        super.decode(j);
        if (j === undefined) return this;
        if (j.key_lvl   !== undefined) this.key_lvl = j.val?.key_lvl ?? 0;
        return this;
    }
}
