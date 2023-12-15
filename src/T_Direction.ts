import {T_MakeEnumType} from "./T_MakeEnumType";
export const T_Direction = {
    N: 0,
    E: 1,
    S: 2,
    W: 3,
    X: 99
} as const;
export type T_Direction = T_MakeEnumType<typeof T_Direction>;
