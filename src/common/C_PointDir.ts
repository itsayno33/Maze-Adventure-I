import { C_Point, JSON_Point } from './C_Point';
import {T_MakeEnumType} from "./T_MakeEnumType";

export const T_Direction = {
    N: 0,
    E: 1,
    S: 2,
    W: 3,
    X: 99
} as const;
export type T_Direction = T_MakeEnumType<typeof T_Direction>;

export interface JSON_PointDir extends JSON_Point {
    d: number;
}

export class  C_PointDir extends C_Point {
    public d: T_Direction;
    public constructor(d?: number|T_Direction|C_PointDir|JSON_PointDir) {
        super(d);
        this.d = T_Direction.X;

        if (d === undefined) {
            return;
        }
        if (typeof d === "number") {
            this.d = d as T_Direction;
            return;
        }
        if (typeof d === "object") {
            if (d instanceof C_PointDir) {
                this.d = d.d as T_Direction;
            } else {
                this.decode(d);
            }
            return;
        }
        this.d = T_Direction.X;
        return;
    }
    public get_mb_name(): string {
        switch (this.d) {
            case 0:  return '北';
            case 1:  return '東';
            case 2:  return '南';
            case 3:  return '西';
            default: return '謎';
        }        
    }

    public get_d(): T_Direction {
        return this.d;
    }
    public set_d(d: T_Direction): C_PointDir|undefined {
        if (!(d in T_Direction)) return undefined;
        this.d = d;
        return this;
    }
    public get_pd(): C_PointDir {
        return this;
    }
    public set_pd(d: C_PointDir|JSON_PointDir): C_PointDir|undefined {
        if (d instanceof C_PointDir) {
            if (!(d.d in T_Direction)) return undefined;
            super.set_p(d);
            this.d = d.d;
            return this;
        }
        if (!(d.d in T_Direction)) return undefined;
        this.decode(d);
        this.d = d.d as T_Direction;
        return this;
    }

    public encode(): JSON_PointDir {
        const j = super.encode() as JSON_PointDir;
        j.d     = this.d as number;
        return j;
    }
    public decode(j: JSON_PointDir): C_PointDir {
        if (j === undefined) return this;
        if (!(j.d in T_Direction)) return this;

        super.decode(j);
        this.d = j.d as T_Direction;
        return this;
    }
}
