"use strict";

import { JSON_Any }  from "./C_SaveData";
import { JSON_Obj }  from "./C_Obj";
import { C_ObjList } from "./C_ObjList";
import { C_Goods, JSON_Goods, T_GoodsKind } from "./C_Goods";


export interface JSON_GoodsList extends JSON_Any {
    gold?: JSON_Obj[],
    arms?: JSON_Obj[],    
    shld?: JSON_Obj[],    
    drug?: JSON_Obj[],    
    item?: JSON_Obj[],    
}


export class C_GoodsList extends C_ObjList {
    public constructor(j?: JSON_GoodsList) {
        super(j);
        if (j !== undefined) this.decode(j);
    }

    public add(obj: C_Goods|undefined): void {
        if (obj === undefined) return; 
        if (obj instanceof C_Goods) this.list[obj.uid()] = obj; 
    }

    public gold(): number {
        let ttl_gold = 0; 
        for (const ii in this.list) if ((this.list[ii] as C_Goods).gkind() === T_GoodsKind.Gold) ttl_gold += this.list[ii].gold();
        return ttl_gold;
    }

    public gold_array(): C_Goods[] {return this.__make_array(T_GoodsKind.Gold);}
    public arms_array(): C_Goods[] {return this.__make_array(T_GoodsKind.Arms);}
    public shld_array(): C_Goods[] {return this.__make_array(T_GoodsKind.Shld);}
    public drug_array(): C_Goods[] {return this.__make_array(T_GoodsKind.Drug);}
    public item_array(): C_Goods[] {return this.__make_array(T_GoodsKind.Item);}
    private __make_array(gkind: number): C_Goods[] {
        const make_array:C_Goods[] = []; 
        for (const ii in this.list) if ((this.list[ii] as C_Goods).gkind() === gkind) make_array.push(this.list[ii] as C_Goods);
        return make_array;
    }

    public encode(): JSON_GoodsList {
        return {
            gold: this.__encode(this.gold_array()), 
            arms: this.__encode(this.arms_array()), 
            shld: this.__encode(this.shld_array()), 
            drug: this.__encode(this.drug_array()), 
            item: this.__encode(this.item_array()), 
        }
    }
    protected __encode(goods: C_Goods[]): JSON_Goods[] {
        const goods_JSON: JSON_Goods[] = [];
        for (const item of goods) goods_JSON.push(item.encode()); 
        return goods_JSON;
    }

    public decode(j: JSON_GoodsList): C_GoodsList {
        if (j === undefined) return this;

        for (const gkind in j) { 
            for (const goods_JSON of j[gkind]) {
                this.add(C_Goods.newObj(goods_JSON));
            }
        }
        return this;
    }
}
