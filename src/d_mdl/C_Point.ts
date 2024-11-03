"use strict";

import { I_JSON, JSON_Any } from "./C_SaveData";

export interface JSON_Point extends JSON_Any {
    x?: number,
    y?: number,
    z?: number,
}

export class C_Point implements I_JSON{
    public x: number;
    public y: number;
    public z: number;
    public constructor(x?: number|C_Point|JSON_Point|undefined, y?: number, z?: number) {
        this.x = this.y = this.z = -3;

        if (x === undefined) {
            this.x = 0; this.y = 0; this.z = 0;
            return;
        }
        if (typeof x === "number" && typeof y === "number" && typeof z === "number") {
            this.x = x; this.y = y; this.z = z;
            return;
        }
        if (typeof x === "object") { 
            if (x instanceof C_Point) {
                this.x = x.x; this.y = x.y; this.z = x.z;
                return;
            } else {
                this.decode(x);
                return;
            }
        }
        this.x = this.y = this.z = -2;
        return;
    }

    public get_p(): C_Point {return new C_Point(this)} 
    public set_p(p: C_Point): C_Point|undefined {
        this.x = p.x; this.y = p.y; this.z = p.z;
        return this;
    }

    public within(p: C_Point): boolean {
        return (p.x == this.x && p.y == this.y && p.z == this.z);
    }
    public encode(): JSON_Point {
        return {x: this.x, y: this.y, z: this.z};
    }
    public decode(a: JSON_Point): C_Point {
        if (a.x === undefined || a.y === undefined || a.z === undefined) return this;
        this.x = a.x; this.y = a.y; this.z = a.z;
        return this;
    }
}
