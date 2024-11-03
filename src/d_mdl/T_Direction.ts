"use strict";

import {T_MakeEnumType} from "../d_utl/T_MakeEnumType";

export const T_Direction = {
    N: 0,
    E: 1,
    S: 2,
    W: 3,
    X: 99
} as const;
export type T_Direction = T_MakeEnumType<typeof T_Direction>;

export var $DirectionName = {
    0:  '北',
    1:  '東',
    2:  '南',
    3:  '西',
    99: '謎'
}
