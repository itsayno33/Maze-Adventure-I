// 一般に使えるユーティリティな呪文
// オブジェクトを列挙型として型化するのに利用
export type T_MakeEnumType<T extends Record<any, any>> = T[keyof T];