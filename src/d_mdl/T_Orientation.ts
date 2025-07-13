"use strict";

import {T_MakeEnumType} from "../d_utl/T_MakeEnumType";
import { C_PointDir, T_Direction } from "./C_PointDir";

export const T_Orientation = {
    F:   0,
    L:   1,
    B:   2,
    R:   3,
    X:  99,
    MAX: 3
} as const;
export type T_Orientation = T_MakeEnumType<typeof T_Orientation>;

export var OrientationName = {
    0:  '前',
    1:  '左',
    2:  '後',
    3:  '右',
    99: '謎'
}

export function getOrientationName(ori: T_Orientation): string {
    return OrientationName[ori] ?? '謎';
}

export function relativeOrientation(
    pd: C_PointDir,
    me: C_PointDir, 
): T_Orientation {
    return relativeOrientationDir(pd.d, me.d);
}

export function relativeOrientationDir(
    pd_d: T_Direction,
    me_d: T_Direction, 
): T_Orientation {
    if (me_d === T_Direction.X || pd_d === T_Direction.X) return T_Orientation.X;
    switch (pd_d) {
        case T_Direction.N:
            switch (me_d) {
                case T_Direction.N: return T_Orientation.F;
                case T_Direction.E: return T_Orientation.R;
                case T_Direction.S: return T_Orientation.B;
                case T_Direction.W: return T_Orientation.L;
                default: return T_Orientation.X;
            }
        case T_Direction.E:
            switch (me_d) {
                case T_Direction.N: return T_Orientation.R;
                case T_Direction.E: return T_Orientation.F;
                case T_Direction.S: return T_Orientation.L;
                case T_Direction.W: return T_Orientation.B;
                default: return T_Orientation.X;
            }
        case T_Direction.S:
            switch (me_d) {
                case T_Direction.N: return T_Orientation.B;
                case T_Direction.E: return T_Orientation.R;
                case T_Direction.S: return T_Orientation.F;
                case T_Direction.W: return T_Orientation.L;
                default: return T_Orientation.X;
            }
        case T_Direction.W:
            switch (me_d) {
                case T_Direction.N: return T_Orientation.R;
                case T_Direction.E: return T_Orientation.B;
                case T_Direction.S: return T_Orientation.L;
                case T_Direction.W: return T_Orientation.F;
                default: return T_Orientation.X;
            }
        default:
            return T_Orientation.X;
        }
}