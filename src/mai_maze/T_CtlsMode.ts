import {T_MakeEnumType} from "../d_utl/T_MakeEnumType";
export const T_CtlsMode = {
    Nop:      0,
    Move:     1,
    UD:       2,
    Battle:   3,
    Menu:     5,
    Load:     6,
    Save:     7,
    MvPt:     8,
    Unknown: 99
} as const;
export type T_CtlsMode = T_MakeEnumType<typeof T_CtlsMode>;
