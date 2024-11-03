"use strict";

    // 一般に使えるユーティリティな呪文
    // オブジェクトを列挙型として型化するのに利用
    import {T_MakeEnumType} from "../d_utl/T_MakeEnumType";

    // ダンジョンマップのセルの種類を表す列挙型
    // NoDef: 未定義・不明
    // Floor: 床
    // Unexp: 未踏地
    // Stone: 石壁
    // StrUp: 上り階段
    // StrDn: 下り階段
    // Empty: 初期状態・何もなし
    // 
    // function to_int(MzKind):      int        列挙型に対応する値(整数値)を返す
    // function from_int(int):       T_MzKind     整数値に対応する列挙型を返す(クラスメソッド)
    // function to_letter(MzKind):   string     列挙型に対応する文字を返す(ダンジョンの2D表示用)
    // function from_letter(string): T_MzKind     文字に対応する列挙型を返す(クラスメソッド)

    export const T_MzKind:{[key: string]: number}  = {
        NoDef:   0,
        Floor:   1,
        Unexp:   2,
        Stone:   3,
        Unkwn:   4,
        StrUp:   5,
        StrDn:   6,
        StrUD:   7,
        Empty: 255,
    } as const;
    export type T_MzKind   = T_MakeEnumType<typeof T_MzKind>;

    export const T_RvMzKind:{[key: number]: T_MzKind}  = {
        0:   T_MzKind.NoDef,
        1:   T_MzKind.Floor,
        2:   T_MzKind.Unexp,
        3:   T_MzKind.Stone,
        4:   T_MzKind.Unkwn,
        5:   T_MzKind.StrUp,
        6:   T_MzKind.StrDn,
        7:   T_MzKind.StrUD,
        255: T_MzKind.Empty,
    } as const;
    export type T_RvMzKind = T_MakeEnumType<typeof T_RvMzKind>;

