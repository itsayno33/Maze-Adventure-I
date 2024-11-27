/**********************
 * 
 * おそらく不要なクラス
 * 
**********************/

"use strict";

import { C_ObjList, I_ObjList, JSON_ObjList } from "./C_ObjList";
import { C_Goods, JSON_Goods, T_GoodsKind }   from "./C_GoodsNG";
import { C_Good, I_Good, JSON_Good }          from './C_Good';


export interface JSON_GoodsList extends JSON_ObjList {
/************
    gold?: JSON_Obj[],
    arms?: JSON_Obj[],    
    shld?: JSON_Obj[],    
    drug?: JSON_Obj[],    
    item?: JSON_Obj[],    
*************/
}

export interface I_GoodsList  {[uid: string]: I_Good}
export class C_GoodsList {
    protected list: I_GoodsList = {};

    public constructor(j?: JSON_GoodsList) {
        if (j !== undefined) this.decode(j);
    }

    public add(obj: C_Good|undefined): void {
        if (obj === undefined) return; 
        if (obj instanceof C_Good) this.list[obj.uid()] = obj; 
    }

    public gold(): number {
        let ttl_gold = 0; 
        for (const ii in this.list) if ((this.list[ii] as I_Good).good_kind() === T_GoodsKind.Gold) ttl_gold += this.list[ii].gold();
        return ttl_gold;
    }

    public gold_array(): I_Good[] {return this.__make_array(T_GoodsKind.Gold);}
    public arms_array(): I_Good[] {return this.__make_array(T_GoodsKind.Arms);}
    public shld_array(): I_Good[] {return this.__make_array(T_GoodsKind.Shld);}
    public drug_array(): I_Good[] {return this.__make_array(T_GoodsKind.Drug);}
    public item_array(): I_Good[] {return this.__make_array(T_GoodsKind.Item);}
    private __make_array(gkind: number): I_Good[] {
        const make_array:C_Good[] = []; 
        for (const ii in this.list) if ((this.list[ii] as I_Good).good_kind() === gkind) make_array.push(this.list[ii] as C_Good);
        return make_array;
    }

    public encode(): JSON_GoodsList {
        return {
            list: this.__encode(this.list), 
/******************
            gold: this.__encode(this.gold_array()), 
            arms: this.__encode(this.arms_array()), 
            shld: this.__encode(this.shld_array()), 
            drug: this.__encode(this.drug_array()), 
            item: this.__encode(this.item_array()), 
*******************/
        }
    }
    protected __encode(goods: I_GoodsList): JSON_Goods[] {
        const goods_JSON: JSON_Good[] = [];
        for (const item in goods) goods_JSON.push(goods[item].encode()); 
        return goods_JSON;
    }

    public decode(j: JSON_GoodsList): C_GoodsList {
        if (j === undefined) return this;

        for (const gkind in j) { 
            for (const goods_JSON of j[gkind]) {
                this.add(C_Good.newObj(goods_JSON));
            }
        }
        return this;
    }
}
