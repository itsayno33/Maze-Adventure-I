"use strict";

import { C_PointDir, JSON_PointDir } from "./C_PointDir"

export type T_HopeReqKind =
     'Wait'      // 待機
  |  'Move'      // 移動
  |  'Turn'      // ターン
  |  'Up'        // 上へ
  |  'Down'      // 下へ 
  |  'Attack'    // 攻撃
  |  'Defense'   // 防御   
  |  'Quick'     // 回避
  |  'Item'       // アイテム使用
  ;


export type T_HopeResKind =
     'Wait'      // 待機
  |  'Move'      // 移動できる
  |  'Turn'      // ターンできる
  |  'Block'     // 行動を阻止された
  ;


export interface I_HasHope {
    has_hope: boolean,         // 希望行動の有無
    hope:     T_HopeReqKind,   // 行動の種類
}
export interface JSON_HasHope {
    has_hope?: boolean,         // 希望行動の有無
    hope?:     T_HopeReqKind,   // 行動の種類
}
export class C_HasHope implements I_HasHope {
    public has_hope: boolean =false;  // 希望行動の有無
    public hope:     T_HopeReqKind = 'Wait'; // 行動の種類
    public constructor(j?: JSON_HasHope) {
        if (j) {
            this.has_hope = j.has_hope ?? false;
            this.hope     = j.hope     ?? 'Wait';
        }
    }
}


export interface I_HopeAction extends I_HasHope {
    subj:    C_PointDir,    // 対象の指定(位置)
}
export interface JSON_HopeAction extends JSON_HasHope {
    subj?:   JSON_PointDir,    // 対象の指定(位置)
}
export class C_HopeAction implements I_HopeAction {
    public has_hope: boolean = false;        // 希望行動の有無
    public hope:     T_HopeReqKind = 'Wait'; // 行動の種類
    public subj:     C_PointDir;             // 対象の指定(位置)
    public constructor(j?: JSON_HopeAction) {
        this.has_hope = j?.has_hope ?? false;
        this.hope     = j?.hope     ?? 'Wait';
        this.subj     = j?.subj !== undefined ? new C_PointDir(j.subj) : new C_PointDir();
    }
}

export interface I_HopeResponce {
    ok:   boolean,         // 行動可否
    res:  T_HopeResKind,   // 行動結果
    dmg:  number,          // 基本ダメージ値
    hope: I_HopeAction,    // 希望行動の種類
}

export interface I_HopeResponceMove extends I_HopeResponce {}
export interface I_HopeResponceTurn extends I_HopeResponce {}

