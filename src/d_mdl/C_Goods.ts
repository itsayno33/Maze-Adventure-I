/*******
 * たぶん昔の自分がボツにしたファイル
*******/

"use strict";

import { I_JSON }          from "./C_SaveInfo";
import { C_Obj, I_Obj, JSON_Obj } from "./C_Obj";
import { T_MakeEnumType }  from "../d_utl/T_MakeEnumType";
import { _irand } from "../d_utl/F_Rand";


export interface JSON_Goods extends JSON_Obj {
    gkind?:  string,
}

export const T_GoodsKind:{[lckd: string]: number}  = {
    Unkn:  0,
    Chet:  1,  
    Gold:  2,
    Arms:  3,
    Shld:  5,
    Drug:  6,
    Item:  7,
} as const;
export type T_GoodsKind = T_MakeEnumType<typeof T_GoodsKind>;

function T_GoodsKind_key(gkind: T_GoodsKind): string {
    return Object.keys(T_GoodsKind).find(key => T_GoodsKind[key] === gkind) ?? "Unkn";
}

const GoodsKind_mb_name: {[gkind: number]: string} = {
    0:  'バグ',
    1:  '宝箱',
    2:  '金銭',
    3:  '武器',
    5:  '装備',
    6:  '薬剤',
    7:  '物品',
} as const;

export interface I_Goods extends I_Obj {
    okind:   ()=>T_GoodsKind, 
}

export class C_Goods extends C_Obj implements I_Goods, I_JSON {
/**********************
    public static newObj(j?: JSON_Goods|undefined): C_Goods|undefined {
        if (j      === undefined)   return undefined;
        if (j.gkind === undefined)  return undefined;

        if (j.gkind in T_GoodsKind) return new C_Goods(j);
/***
/***        switch (T_ObjKind[j.okind??T_ObjKind.Unkwn]) {
/***            case T_ObjKind.Goods: return C_Goods.newObj(j);
/***            case T_ObjKind.Other: return new C_Obj(j); 
/***        }
/***
        return undefined;
    }
    public newObj(j?: JSON_Goods|undefined): C_Goods|undefined {
        return C_Goods.newObj(j);
    }
***************************/

    protected my_gkind: number;
    
    public constructor(j?: JSON_Goods|undefined) {
        super(j);
        this.my_gkind = T_GoodsKind.Unkn;
        if (j !== undefined) this.decode(j);
    }

    public gkind():   number {return this.my_gkind;}
    public mb_name(): string {
        return GoodsKind_mb_name[this.my_gkind];
    }

    public random_make(): C_Goods {
        this.my_gkind = _irand(0, 7); 
        return this;
    }

    public encode(): JSON_Goods {
        const j   = super.encode() as JSON_Goods;
        j.gkind   = T_GoodsKind_key(this.my_gkind);
        return j;
    }
    public decode(j: JSON_Goods): C_Goods {
        if (j === undefined) return this;
        super.decode(j);

        if (j.gkind      !== undefined) { 
            this.my_gkind   = T_GoodsKind[j.gkind]; 
            this.amb_name   = GoodsKind_mb_name[this.my_gkind]; 
        }

        return this;
    }
}
