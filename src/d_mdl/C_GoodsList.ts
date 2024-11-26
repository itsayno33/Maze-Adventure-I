/**********************
 * 
 * おそらく不要なクラス
 * 
**********************/

"use strict";

import { C_ObjList, I_ObjList, JSON_ObjList } from "./C_ObjList";
import { C_Goods, JSON_Goods, T_GoodsKind } from "./C_Goods";
import { C_GoodsObj, JSON_GoodsObj } from "./C_GoodsObj";


export interface JSON_GoodsList extends JSON_ObjList {
/************
    gold?: JSON_Obj[],
    arms?: JSON_Obj[],    
    shld?: JSON_Obj[],    
    drug?: JSON_Obj[],    
    item?: JSON_Obj[],    
*************/
}


export class C_GoodsList extends C_ObjList {
    public constructor(j?: JSON_GoodsList) {
        super(j);
        if (j !== undefined) this.decode(j);
    }

    public add(obj: C_GoodsObj|undefined): void {
        if (obj === undefined) return; 
        if (obj instanceof C_Goods) this.list[obj.uid()] = obj; 
    }

    public gold(): number {
        let ttl_gold = 0; 
        for (const ii in this.list) if ((this.list[ii] as C_Goods).goods_kind() === T_GoodsKind.Gold) ttl_gold += this.list[ii].gold();
        return ttl_gold;
    }

    public gold_array(): C_Goods[] {return this.__make_array(T_GoodsKind.Gold);}
    public arms_array(): C_Goods[] {return this.__make_array(T_GoodsKind.Arms);}
    public shld_array(): C_Goods[] {return this.__make_array(T_GoodsKind.Shld);}
    public drug_array(): C_Goods[] {return this.__make_array(T_GoodsKind.Drug);}
    public item_array(): C_Goods[] {return this.__make_array(T_GoodsKind.Item);}
    private __make_array(gkind: number): C_Goods[] {
        const make_array:C_Goods[] = []; 
        for (const ii in this.list) if ((this.list[ii] as C_Goods).goods_kind() === gkind) make_array.push(this.list[ii] as C_Goods);
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
    protected __encode(goods: I_ObjList): JSON_Goods[] {
        const goods_JSON: JSON_Goods[] = [];
        for (const item in goods) goods_JSON.push(goods[item].encode()); 
        return goods_JSON;
    }

    public decode(j: JSON_GoodsList): C_GoodsList {
        if (j === undefined) return this;

        for (const gkind in j) { 
            for (const goods_JSON of j[gkind]) {
                this.add(C_GoodsObj.newObj(goods_JSON));
            }
        }
        return this;
    }
}
