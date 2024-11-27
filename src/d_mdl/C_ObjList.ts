"use strict";

import { I_JSON, JSON_Any }  from "./C_SaveInfo";
import { C_Obj,  I_Obj,  JSON_Obj }  from "./C_Obj";


export interface JSON_ObjList extends JSON_Any {
    objs?: JSON_Obj[],
}

export interface I_ObjList  {[uid: string]: I_Obj}

export class C_ObjList implements I_JSON {
    protected list: I_ObjList = {};

    public constructor(j?: JSON_ObjList) {
        this.clr();
        if (j !== undefined) this.decode(j);
    }
    public keys(): string[] {return Object.keys(this.list)}
    public get(key: string): I_Obj {return this.list[key]}

    public get_list(): I_Obj[] {
        const list: I_Obj[] = []; 
        for (const ii in this.list) list.push(this.list[ii]);
        return list;
    }

    public clr(): void {
        this.list = {};
    }
    public add(obj: I_Obj|undefined): void {
        if (obj === undefined) return; 
        this.list[obj.uid()] = obj;
    }
    public add_list(list: I_Obj[]) {
        for (const elm of list) this.add(elm);
    }
    
    public rmv(obj: I_Obj|undefined): void {
        if (obj === undefined)         return; 
        if (!(obj.uid() in this.list)) return;
        delete this.list[obj.uid()];
    }

    public encode(): JSON_ObjList {
        
        const objs: JSON_Obj[] = [];
        for (const idx in this.list) {
            objs.push(this.list[idx].encode())
        }

        return {
            objs: objs,
        }
    }

    public decode(j: JSON_ObjList): C_ObjList {
        for (const json of j?.objs??[]) {
            const obj = C_Obj.newObj(json);     // ＊＊＊＊＊＊＊＊＊　要検討！！！　＊＊＊＊＊＊＊＊＊
//            const obj = new C_Obj(json);
            if (obj !== undefined) this.list[obj.uid()] = obj;
        }
        return this;
    }
}
