"use strict";

import { I_JSON, JSON_Any }             from "./C_SaveInfo";
import { C_Good,  I_Good,  JSON_Good }  from "./C_Good";

export interface JSON_GoodsListElement {
    elm: JSON_Good,
    qty: number,
}
export interface JSON_GoodsList extends JSON_Any {
    goods?: JSON_GoodsListElement[]
}

export interface I_GoodsListElement {
    elm: I_Good,
    qty: number,
}
export interface I_GoodsList  {
    [uid: string]: I_GoodsListElement
}

export class C_GoodsList implements I_JSON {
    protected list: I_GoodsList = {};

    public constructor(j?: JSON_GoodsList) {
        this.clr();
        if (j !== undefined) this.decode(j);
    }
    public keys(): string[] {return Object.keys(this.list)}
    public get    (key: string): I_GoodsListElement {return this.list[key]}
    public get_elm(key: string): I_Good {return this.list[key].elm}
    public get_qty(key: string): number {return this.list[key].qty}

    public get_list(): I_GoodsListElement[] {
        const list: I_GoodsListElement[] = []; 
        for (const ii in this.list) list.push(this.list[ii]);
        return list;
    }

    public clr(): void {
        this.list = {};
    }
    public add(obj: I_Good|undefined): void {
        if (obj === undefined) return; 

        const id = obj.key();
        this.list[id] ??= {elm:new C_Good(),qty:0};
        this.list[id].elm = obj;
        this.list[id].qty++;
    }
    public add_list(list: I_Good[]) {
        for (const elm of list) this.add(elm);
    }
    public pop_one(): I_Good|undefined {
        if (Object.entries(this.list).length < 1) return undefined;
        const [key,obj] = Object.entries(this.list)[0];
        this.rmv_one(obj.elm);
        return obj.elm;
    }
    public pop_qty(qty:number): I_Good|undefined {
        if (Object.entries(this.list).length < 1) return undefined;
        const [key,obj] = Object.entries(this.list)[0];
        this.rmv_qty(obj.elm,qty);
        return obj.elm;
    }
    
    public rmv_one(obj: I_Good|undefined): void {
        if (obj === undefined)         return; 
        if (!(obj.key() in this.list)) return;
        if (--this.list[obj.key()].qty <= 0) delete this.list[obj.key()];
    }
    public rmv_qty(obj: I_Good|undefined, qty: number): void {
        if (obj === undefined)         return; 
        if (!(obj.key() in this.list)) return;
        this.list[obj.key()].qty -= qty;
        if (this.list[obj.key()].qty <= 0) delete this.list[obj.key()];
    }

    public encode(): JSON_GoodsList {
        
        const goods = [] as JSON_GoodsListElement[];
        for (const idx in this.list) {
            goods.push({
                elm: this.list[idx].elm.encode(),
                qty: this.list[idx].qty,
            })
        }

        return {
            goods: goods,
        }
    }

    public decode(j: JSON_GoodsList): C_GoodsList {
        for (const {elm, qty} of j?.goods??[]) {
                                                               // ＊＊＊＊＊＊＊＊＊　要検討！！！　＊＊＊＊＊＊＊＊＊
            const good = C_Good.newObj(elm);
            this.list[good.key()].elm = good;
            this.list[good.key()].qty = qty;
        }
        return this;
    }
}
