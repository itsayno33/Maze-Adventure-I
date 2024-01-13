import { C_GoodsItem, JSON_GoodsItem } from "./C_GoodsItem";

export type JSON_Goods = {
    gold?: number,
    arms?: JSON_GoodsItem[],    
    shld?: JSON_GoodsItem[],    
    drug?: JSON_GoodsItem[],    
    item?: JSON_GoodsItem[],    
}

type T_GoodsList = {[uid: string]: C_GoodsItem}

export class C_Goods {
    protected gold: number;
    protected arms: T_GoodsList;
    protected shld: T_GoodsList;
    protected drug: T_GoodsList;
    protected item: T_GoodsList;

    public constructor(j?: JSON_Goods) {
        this.gold = 0;
        this.arms = {};
        this.shld = {};
        this.drug = {};
        this.item = {};

        if (j !== undefined) this.decode(j);
    }

    public encode(): JSON_Goods {
        
        const arms = this.__encode(this.arms);
        const shld = this.__encode(this.shld);
        const drug = this.__encode(this.drug);
        const item = this.__encode(this.item);

        return {
            gold: this.gold,
            arms: arms,
            shld: shld,
            drug: drug,
            item: item,
        }
    }
    protected __encode(goods: T_GoodsList): JSON_GoodsItem[] {
        const goods_JSON: JSON_GoodsItem[] = [];
        for (let idx in goods) {
            goods_JSON.push(goods[idx].encode())
        }
        return goods_JSON;
    }

    public decode(j: JSON_Goods): C_Goods {
        if (j === undefined) return this;

        if (j.gold !== undefined) this.gold = j.gold;
        this.arms = this.__decode(this.arms, j.arms);
        this.shld = this.__decode(this.shld, j.shld);
        this.drug = this.__decode(this.drug, j.drug);
        this.item = this.__decode(this.item, j.item);
        return this;
    }
    protected __decode(
        my_list: T_GoodsList, 
        list_JSON: (JSON_GoodsItem[])|undefined
        ): T_GoodsList 
    {
        if (list_JSON === undefined) return my_list;

        for (const goods_JSON of list_JSON) {
            const goods = C_GoodsItem.new_instance(goods_JSON);
            if (goods !== undefined) my_list[goods.uid()] = goods;
        }
        return my_list;
    }
}
