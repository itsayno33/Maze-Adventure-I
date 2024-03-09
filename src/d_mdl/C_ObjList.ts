"use strict";

import { I_JSON, JSON_Any }  from "./C_SaveData";
import { C_Obj,  JSON_Obj }  from "./C_Obj";


export interface JSON_ObjList extends JSON_Any {
    objs?: JSON_Obj[],
}

type T_ObjList = {[uid: string]: C_Obj}

export class C_ObjList implements I_JSON {
    protected list: T_ObjList = {};

    public constructor(j?: JSON_ObjList) {
        this.clr();
        if (j !== undefined) this.decode(j);
    }
    public clr(): void {
        this.list = {};
    }
    public add(obj: C_Obj): void {
        this.list[obj.uid()] = obj;
    }
    public rmv(obj: C_Obj): void {
        delete this.list[obj.uid()];
    }

    public encode(): JSON_ObjList {
        
        const objs: JSON_Obj[] = [];
        for (let idx in this.list) {
            objs.push(this.list[idx].encode())
        }

        return {
            objs: objs,
        }
    }

    public decode(j: JSON_ObjList): C_ObjList {
        for (const json_objs of j?.objs??[]) {
            const obj = C_Obj.newObj(json_objs);
            if (obj !== undefined) this.list[obj.uid()] = obj;
        }
        return this;
    }
}
