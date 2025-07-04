"use strict";

import { C_MazeObj, I_MazeObj, JSON_MazeObj } from "./C_MazeObj";
import { JSON_MazeObjView }                   from "./C_MazeObjView";
import { C_Walker, JSON_Walker }              from "./C_Walker";
import { C_WanderView, JSON_WanderView }      from './C_WanderView';
import { I_HopeAction, C_HopeAction }         from './C_Hope';
import { _irand }                             from "../d_utl/F_Rand";
import { C_PointDir } from "./C_PointDir";
import { g_mes } from "../d_cmn/global";

export interface JSON_WanderWalker extends JSON_Walker {}

type T_Condition = {
    canMove:  boolean; // 移動可能
    canTurn:  boolean; // 向き変更可能
    canSlid:  boolean; // スライド可能
    canUpDn:  boolean; // 上下移動可能
    canThru:  boolean; // 壁を通過可能
    careWal:  boolean; // 壁を気にする
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
    protected clname: string = 'C_WanderWalker'; // クラス名
    protected mazeObj: I_MazeObj|undefined;
    protected cond:    T_Condition = {
        canMove:  true,   // 移動可能
        canTurn:  true,   // 向き変更可能
        canSlid:  true,   // スライド可能
        canUpDn:  false,   // 上下移動可能
        canThru:  false,   // 壁を通過可能
        careWal:  false,   // 壁を気にする
    }; 
    protected action: T_Action[] = []; // 選択できる行動の配列

    constructor(j?: JSON_WanderWalker) {
        super(j);
        if (j !== undefined) this.decode(j);
    }

    public get_mazeObj(): I_MazeObj|undefined {
        return this.mazeObj;
    }
    public set_mazeObj(mo: I_MazeObj): void {
        this.mazeObj = mo;
    }

    public set_pd(pd: C_PointDir): C_PointDir {                                 g_mes.normal_message(`WanderWalkerの位置を(x:${pd.x??-2},y:${pd.y??-2},z:${pd.z??-2},d:${pd.d??-88})に設定しました。`);
        super.set_pd(pd);
        if (this.mazeObj !== undefined) this.mazeObj.set_pd(pd);
        return pd;
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

        j.clname = this.clname;
        j.cond  = {
            canMove:  this.cond.canMove ? '1' : '0',
            canTurn:  this.cond.canTurn ? '1' : '0',
            canThru:  this.cond.canThru ? '1' : '0',
            canSlid:  this.cond.canSlid ? '1' : '0',
            canUpDn:  this.cond.canUpDn ? '1' : '0',
            careWal:  this.cond.careWal ? '1' : '0',
/**         mazeObjをエンコードすると無限ループになる。向こうでもこのクラスをencodeするので。
            mazeObj:  this.mazeObj?.encode()??{},
**/
        }

        return j;
    }
    public decode(a: JSON_WanderWalker): C_WanderWalker {
        if (a === undefined) return this;
        super.decode(a);
        if (a.clname !== undefined) this.clname = a.clname;

        if (a.cond?.canMove !== undefined) this.cond.canMove  = a.cond.canMove !== '0' ? true : false;
        if (a.cond?.canTurn !== undefined) this.cond.canTurn  = a.cond.canTurn !== '0' ? true : false;
        if (a.cond?.canThru !== undefined) this.cond.canThru  = a.cond.canThru !== '0' ? true : false;
        if (a.cond?.canMove !== undefined) this.cond.canSlid  = a.cond.canSlid !== '0' ? true : false;
        if (a.cond?.canMove !== undefined) this.cond.canUpDn  = a.cond.canUpDn !== '0' ? true : false;
        if (a.cond?.canMove !== undefined) this.cond.careWal  = a.cond.careWal !== '0' ? true : false;
/**     mazeObjをデコードすると無限ループになる。向こうでもこのクラスをdecodeするので。
        if (a.cond?.mazeObj??false) {
            this.mazeObj = new C_MazeObj(a.cond.mazeObj);
        }
**/
        if (a.loc_pos !== undefined) {
            const loc_pos = new C_PointDir(a.loc_pos);
            this.set_pd(loc_pos);
//            this.mazeObj?.set_pd(loc_pos);
        }
        return this;
    }
}
