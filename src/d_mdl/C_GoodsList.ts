"use strict";

import { I_JSON, JSON_Any }  from "./C_SaveData";
import { C_Obj,  JSON_Obj, T_ObjKind }  from "./C_Obj";


export interface JSON_GoodsList extends JSON_Any {
    gold?: JSON_Obj[],
    arms?: JSON_Obj[],    
    shld?: JSON_Obj[],    
    drug?: JSON_Obj[],    
    item?: JSON_Obj[],    
}

type T_GoodsList = {[uid: string]: C_Obj}


export class C_GoodsList implements I_JSON {
    protected gold: T_GoodsList = {};
    protected arms: T_GoodsList = {};
    protected shld: T_GoodsList = {};
    protected drug: T_GoodsList = {};
    protected item: T_GoodsList = {};

    public constructor(j?: JSON_GoodsList) {
        this.clr_goods();
        if (j !== undefined) this.decode(j);
    }
    public clr_goods(): void {
        this.gold = {};
        this.arms = {};
        this.shld = {};
        this.drug = {};
        this.item = {};
    }
    public add_goods(goods: C_Obj): void {
        switch (goods.okind()) {
            case T_ObjKind.Gold: this.gold[goods.uid()] = goods;
            case T_ObjKind.Arms: this.arms[goods.uid()] = goods;
            case T_ObjKind.Shld: this.shld[goods.uid()] = goods;
            case T_ObjKind.Drug: this.drug[goods.uid()] = goods;
            case T_ObjKind.Item: this.item[goods.uid()] = goods;
        }
    }
    public rmv_goods(goods: C_Obj): void {
        switch (goods.okind()) {
            case T_ObjKind.Gold: delete this.gold[goods.uid()];
            case T_ObjKind.Arms: delete this.arms[goods.uid()];
            case T_ObjKind.Shld: delete this.shld[goods.uid()];
            case T_ObjKind.Drug: delete this.drug[goods.uid()];
            case T_ObjKind.Item: delete this.item[goods.uid()];
        }
    }

    public encode(): JSON_GoodsList {
        return {
            gold: this.__encode(this.gold), 
            arms: this.__encode(this.arms), 
            shld: this.__encode(this.shld), 
            drug: this.__encode(this.drug), 
            item: this.__encode(this.item), 
        }
    }
    protected __encode(goods: T_GoodsList): JSON_Obj[] {
        const goods_JSON: JSON_Obj[] = [];
        for (let idx in goods) {
            goods_JSON.push(goods[idx].encode())
        }
        return goods_JSON;
    }

    public decode(j: JSON_GoodsList): C_GoodsList {
        if (j === undefined) return this;

        this.gold = this.__decode(this.gold, j.gold);
        this.arms = this.__decode(this.arms, j.arms);
        this.shld = this.__decode(this.shld, j.shld);
        this.drug = this.__decode(this.drug, j.drug);
        this.item = this.__decode(this.item, j.item);
        return this;
    }
    protected __decode(
        my_list: T_GoodsList, 
        list_JSON: (JSON_Obj[])|undefined
    ): T_GoodsList 
    {
        if (list_JSON === undefined) return my_list;

        for (const goods_JSON of list_JSON) {
            const goods = C_Obj.newObj(goods_JSON);
            if (goods !== undefined) my_list[goods.uid()] = goods;
        }
        return my_list;
    }
}
