"use strict";

import { C_PointDir } from "./C_PointDir"

export type T_HopeKind =
     'Move'      // 移動
  |  'Turn'      // ターン
  |  'Up'        // 上へ
  |  'Down'      // 下へ 
  |  'Attack'    // 攻撃
  |  'Defense'   // 防御   
  |  'Quick'     // 回避
  |  'Item'       // アイテム使用

export interface I_HasHope {
    has_hope: boolean,    // 希望行動の有無
    hope:     T_HopeKind,     // 行動の種類
}

export interface I_HopeAction extends I_HasHope {
    subj:    C_PointDir,    // 対象の指定(位置)
    doOK:    ()=>void,   // 許可時の行動(関数)
    doNG:    ()=>void,   // 不許可時の行動(関数)
}

