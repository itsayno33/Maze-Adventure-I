import { T_Direction } from './T_Direction';
import { C_Point, JSON_Point } from "./C_Point";

export interface I_HasHope {
    has_hope: boolean,    // 希望行動の有無
    hope:     string,     // 行動の種類
}
export interface I_HopeAction extends I_HasHope {
    subj:    C_Point,    // 対象の指定(位置)
    doOK:    ()=>void,   // 許可時の行動(関数)
    doNG:    ()=>void,   // 不許可時の行動(関数)
}
export interface I_Action  extends I_HopeAction {
    // 行動関係
    where(): C_Point;   // optionで現在地を返す。
}
export interface I_Battle  extends I_HasHope {
    atack():   void; //攻撃値　与えたダメージの種類と大きさ、付帯効果(状態異常とか)
    defense(): void; //防御値　防いだダメージの種類と大きさ、付帯効果(状態異常解除とか)
    quick():   void; //回避率 (0から100)
    add_damage(kind: string, damege: number): void; // 被ダメージの追加(回復も)
    add_status(kind: string, damege: number): void; // 状態異常の追加(解除も)
    is_alive():  boolean;
    drop_item(): void;
}

export interface I_Exist {
    // 表示関係
    id:    ()=>string;
    layer: ()=>number;
    set_layer: (layer: number)=>void;
    within:    (p: C_Point)=>boolean;
    to_letter: ()=>string|null; // null: 見えない、何もない
}

export type T_EventMapResult = {
    isOK: boolean,
    code: number,    // Ordinary, NormalEnd = 0
    option?: string, // JSON string 
}
export interface I_EventMap {
    here_is(p: C_Point): T_EventMapResult;
    can_go (p: C_Point): T_EventMapResult; 
}
