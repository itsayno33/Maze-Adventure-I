import { C_Point } from "./C_Point";

export type T_ActionResult = {
    isOK:    boolean,
    code?:   number,    // Ordinary, NormalEnd = 0
    kind?:   string,    // move,atack等
    option?: {type: string, value: string}, // type: 型名・クラス名　value:JSON string 
}
export interface I_Action {
    // 行動関係
    where(): T_ActionResult; // optionで現在地を返す。(C_PointかC_Range?)
    hope():  T_ActionResult; // 希望行動の申請（移動希望、バトル希望。。。）
    isOK():  T_ActionResult; // 希望行動許可後の処理
    isNG():  T_ActionResult  // 希望行動不許可後の処理
}
export interface I_Battle {
    atack():   T_ActionResult; //攻撃値　与えたダメージの種類と大きさ、付帯効果(状態異常とか)
    defense(): T_ActionResult; //防御値　防いだダメージの種類と大きさ、付帯効果(状態異常解除とか)
    quick():   T_ActionResult; //回避率 (0から100)
    add_damage(kind: string, damege: number): T_ActionResult; // 被ダメージの追加(回復も)
    add_status(kind: string, damege: number): T_ActionResult; // 状態異常の追加(解除も)
    is_alive():  T_ActionResult;
    drop_item(): T_ActionResult;
}
 
export interface I_Exist {
    // 表示関係
    id():     string;
    layer():  number;
    set_layer(layer: number): void;
    within(p: C_Point): boolean;
    to_letter(): string|null; // null: 見えない、何もない
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
