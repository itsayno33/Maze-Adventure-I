"use strict";

import { C_MazeObj } from "./C_MazeObj";
import { C_Walker, JSON_Walker } from "./C_Walker";
import { I_HopeAction, C_HopeAction } from './C_Hope';
import { _irand } from "../d_utl/F_Rand";

export interface JSON_WanderWalker extends JSON_Walker {
}

type T_Condition = {
    "canMove":  boolean; // 移動可能
    "canTurn":  boolean; // 向き変更可能
    "canSlid":  boolean; // スライド可能
    "canThru":  boolean; // 壁を通過可能
    "canUpDn":  boolean; // 上下移動可能
    "careWal":  boolean; // 壁を気にする
};

export type T_Action =
      'Wait_'      // 待機
    | 'MoveF'      // 前に移動
    | 'MoveB'      // 後ろに移動（スウェイバック）
    | 'TurnL'      // 左にターン
    | 'TurnR'      // 右にターン
    | 'SlidF'      // 前にスライド
    | 'SlidB'      // 後ろにスライド
    | 'SlidL'      // 左にスライド
    | 'SlidR'      // 右にスライド
    | 'FlorU'      // 上に移動
    | 'FlorD'      // 下に移動
    ;

export class C_WanderWalker extends C_Walker {
    protected mazeObj: C_MazeObj|undefined;
    protected cond:    T_Condition = {
        "canMove":  false,   // 移動可能
        "canTurn":  false,   // 向き変更可能
        "canSlid":  false,   // スライド可能
        "canThru":  false,   // 壁を通過可能
        "canUpDn":  false,   // 上下移動可能
        "careWal":  false,   // 壁を気にする
    }; 
    protected action: T_Action[] = []; // 選択できる行動の配列

    constructor(j?: JSON_WanderWalker) {
        super(j);
        this.mazeObj = new C_MazeObj({
            can_thr:  '1',
            h_w_dmg:  0,
            pos:     {x:1, y:1, z:1},
            view:    {
                layer: 0, letter: '　', 
                show3D:  '1',
                pad_t: 0.0, pad_d: 0.3, pad_s: 0.3,
                col_f: '', col_b: '', col_s: '', col_t: '#ff66ff', col_d: '', 
                col_l: '#9999ff', col_2: '#ff33ff', col_L: '#6666ff', 
            },
        })
        if (j) {
            this.decode(j);
        }
    }

    public wonder(): I_HopeAction {
        const actions = this.selectable_action();
        if (actions.length <= 0) return this._wait();
        
        const selected_idx = Math.floor(_irand(0, actions.length - 1));
        const selected     = actions[selected_idx];

        return this.return_hope_action(selected);
    }

    private _wait(): I_HopeAction {
        return new C_HopeAction({});
    }

    // 選択可能な行動の配列を返す
    protected selectable_action(): T_Action[] {
        let selected:T_Action[] = [];

        if (this.cond.canMove) {
            selected.push('MoveF');
            selected.push('MoveB');
        }
        if (this.cond.canTurn) {
            selected.push('TurnL');
            selected.push('TurnR');
        }
        if (this.cond.canSlid) {
            selected.push('SlidF');
            selected.push('SlidB');
            selected.push('SlidL');
            selected.push('SlidR');
        }
        if (this.cond.canUpDn) {
            selected.push('FlorU');
            selected.push('FlorD');
        }

        return selected;
    }

    protected return_hope_action(action: T_Action): I_HopeAction {
        switch (action) { 
            case 'Wait_': return this._wait();
            case 'MoveF': return this.hope_p_fwd();
            case 'MoveB': return this.hope_p_bak();
            case 'TurnL': return this.hope_turn_l();
            case 'TurnR': return this.hope_turn_r();
            case 'SlidF': return this.hope_p_fwd();
            case 'SlidB': return this.hope_p_bak();
            case 'SlidL': return this.hope_p_lft();
            case 'SlidR': return this.hope_p_rgt();
            case 'FlorU': return this.hope_p_up();
            case 'FlorD': return this.hope_p_down();
        }
    }

    public encode(): JSON_WanderWalker {
        const j = super.encode() as JSON_WanderWalker;

        j.cond  = {
            canMove:  this.cond.canMove,
            canTurn:  this.cond.canTurn,
            canThru:  this.cond.canThru,
            canSlid:  this.cond.canSlid, 
            canUpDn:  this.cond.canUpDn,
            careWal:  this.cond.careWal,
            mazeObj:  this.mazeObj?.encode()??{},
        }

        return j;
    }
    public decode(a: JSON_WanderWalker): C_WanderWalker {
        if (a === undefined) return this;
        super.decode(a);
        this.cond.canMove  = a.cond?.canMove  ?? this.cond.canMove;
        this.cond.canTurn  = a.cond?.canTurn  ?? this.cond.canTurn;
        this.cond.canThru  = a.cond?.canThru  ?? this.cond.canThru;
        this.cond.canSlid  = a.cond?.canSlid  ?? this.cond.canSlid;
        this.cond.canUpDn  = a.cond?.canUpDn  ?? this.cond.canUpDn;
        this.cond.careWal  = a.cond?.careWal  ?? this.cond.careWal;
        if (a.cond?.mazeObj??false) {
            this.mazeObj = new C_MazeObj(a.cond.mazeObj);
        }
        return this;
    }
}
