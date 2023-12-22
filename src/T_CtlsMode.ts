import {T_MakeEnumType} from "./T_MakeEnumType";
export const T_CtlsMode = {
    Nop:     0,
    Move:    1,
    UD:      2,
    Battle:  3,
    Unknown: 99
} as const;
export type T_CtlsMode = T_MakeEnumType<typeof T_CtlsMode>;
