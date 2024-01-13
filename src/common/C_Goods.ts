import { T_MakeEnumType } from "./T_MakeEnumType";

export const T_GoodsKind:{[lckd: string]: number}  = {
    Unkn:  0,
    Arms:  1,
    Shld:  2,
    Drug:  3,
    Item:  5,
} as const;
export type T_GoodsKind = T_MakeEnumType<typeof T_GoodsKind>;

function T_GoodsKind_key(gdkd: T_GoodsKind): string {
    return Object.keys(T_GoodsKind).find(key => T_GoodsKind[key] === gdkd) ?? "Unkn";
}

export interface I_GoodsItem {
    uid:      ()=>string;
    get_kind: ()=>T_GoodsKind;
    get_name: ()=>string;
}

export class C_GoodsItem {

}