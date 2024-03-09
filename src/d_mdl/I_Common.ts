"use strict";

import { C_Point    } from "./C_Point"
import { C_PointDir } from "./C_PointDir"


export interface I_HasHope {
    has_hope: boolean,    // 希望行動の有無
    hope:     string,     // 行動の種類
}
export interface I_HopeAction extends I_HasHope {
    subj:    C_PointDir,    // 対象の指定(位置)
    doOK:    ()=>void,   // 許可時の行動(関数)
    doNG:    ()=>void,   // 不許可時の行動(関数)
}
export interface I_Action  extends I_HopeAction {
    // 行動関係
    where(): C_PointDir;   // optionで現在地を返す。
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

