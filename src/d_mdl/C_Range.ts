"use strict";

import { _max, _min }           from "../d_utl/F_Math";
import { C_Point, JSON_Point }  from "./C_Point";
import { JSON_Any }             from "./C_SaveInfo";

export interface JSON_Range extends JSON_Any {
    min?:   JSON_Point, 
    max?:   JSON_Point, 
}

export class C_Range {
    protected min: C_Point;
    protected max: C_Point;
    public constructor(p1: C_Point, p2: C_Point) {
        this.min  = new C_Point(0, 0, 0);
        this.max  = new C_Point(0, 0, 0);
        this._init(p1, p2);
    }
    protected _init(p1: C_Point, p2: C_Point): C_Range {
        const min_x = _min([p1.x, p2.x]);
        const max_x = _max([p1.x, p2.x]);

        const min_y = _min([p1.y, p2.y]);
        const max_y = _max([p1.y, p2.y]);

        const min_z = _min([p1.z, p2.z]);
        const max_z = _max([p1.z, p2.z]);

        this.min  = new C_Point(min_x, min_y, min_z);
        this.max  = new C_Point(max_x, max_y, max_z);

        return this;
    }

    public within(a: C_Range|C_Point|number, y?: number, z?: number): boolean {
        if (typeof a === "number" && typeof y === "number" && typeof z === "number") { 
            if ( a < this.min.x || a > this.max.x ) return false;
            if ( y < this.min.y || y > this.max.y ) return false;
            if ( z < this.min.z || z > this.max.z ) return false;
            return true;
        }
        if (typeof a === "object" && a instanceof C_Point) { 
            const p = a as C_Point;
            if ( p.x < this.min.x || p.x > this.max.x ) return false;
            if ( p.y < this.min.y || p.y > this.max.y ) return false;
            if ( p.z < this.min.z || p.z > this.max.z ) return false;
            return true;
        }
        if (typeof a === "object" && a instanceof C_Range) {
            const p = a as C_Range;
            if ( p.min_x() < this.min.x || p.max_x() > this.max.x ) return false;
            if ( p.min_y() < this.min.y || p.max_y() > this.max.y ) return false;
            if ( p.min_z() < this.min.z || p.max_z() > this.max.z ) return false;
            return true;
        }
        return false;
    }
    public min_x(): number { return this.min.x;}
    public max_x(): number { return this.max.x;}
    public min_y(): number { return this.min.y;}
    public max_y(): number { return this.max.y;}
    public min_z(): number { return this.min.z;}
    public max_z(): number { return this.max.z;}
    public size_x(): number {
        return this.max.x - this.min.x + 1;
    } 
    public size_y(): number {
        return this.max.y - this.min.y + 1;
    } 
    public size_z(): number {
        return this.max.z - this.min.z + 1;
    } 
    public do_all_xyz(fn: (x: number, y: number, z: number) => boolean) {
        for (var z = this.min.z; z <= this.max.z; z++ ) {
            for (var y = this.min.y; y <= this.max.y; y++ ) {
                for (var x = this.min.x; y <= this.max.x; x++ ) {
                    if (!fn(x, y, z)) return false;
                }
            }
        }
        return true;
    }
    public do_all_p(fn: (p: C_Point) => boolean) {
        for (var z = this.min.z; z <= this.max.z; z++ ) {
            for (var y = this.min.y; y <= this.max.y; y++ ) {
                for (var x = this.min.x; y <= this.max.x; x++ ) {
                    if (!fn(new C_Point(x, y, z))) return false;
                }
            }
        }
        return true;
    }
    public encode(): JSON_Range {
        return {
            min: this.min.encode(),
            max: this.min.encode(),
        }
    }
    public decode(j: JSON_Range): C_Range {
        if (j === undefined)     return this;
        if (j.min === undefined) return this;
        if (j.max === undefined) return this;
        const p1 = new C_Point(j.min);
        const p2 = new C_Point(j.max);
        return this._init(p1, p2);
    }
}

