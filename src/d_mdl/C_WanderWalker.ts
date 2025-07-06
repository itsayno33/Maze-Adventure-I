"use strict";

import { I_MazeObj }                  from "./C_MazeObj";
import { C_Walker, JSON_Walker }      from "./C_Walker";
import { I_HopeAction, C_HopeAction } from './C_Hope';
import { C_PointDir }                 from "./C_PointDir";
import { I_JSON_Uniq }                from "./C_SaveInfo";
import { _irand }                     from "../d_utl/F_Rand";
import { _json_output } from "../d_utl/F_Utility";

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

export interface I_WanderWalker extends I_JSON_Uniq {
    get_pd(): C_PointDir;               // C_PointDirを取得
    set_pd(pd: C_PointDir): C_PointDir; // C_PointDirを設定
    encode(): JSON_WanderWalker;        // JSON_WanderWalker形式でエンコード
    decode(j: JSON_WanderWalker): C_WanderWalker; // JSON_WanderWalker形式でデコード
    
    get_mazeObj(): I_MazeObj|undefined; // I_MazeObjを取得
    set_mazeObj(mo: I_MazeObj): void;   // I_MazeObjを設定
    wonder(): I_HopeAction;             // ランダムに行動を選択
}

export class C_WanderWalker extends C_Walker {
    protected clname: string = 'C_WanderWalker'; // クラス名
    protected mazeObj: I_MazeObj|undefined;
    protected cond:    T_Condition = {
        canMove:  true,    // 移動可能
        canTurn:  true,    // 向き変更可能
        canSlid:  true,    // スライド可能
        canUpDn:  false,   // 上下移動可能
        canThru:  false,   // 壁を通過可能
        careWal:  false,   // 壁を気にする
    }; 
    protected action: T_Action[] = []; // 選択できる行動の配列

    constructor(j?: JSON_WanderWalker) {
        super(j);
        if (j !== undefined) this.__init(j);
    }
    protected __init(a?: JSON_WanderWalker): C_WanderWalker {
        super.__init(a);
        if (a === undefined) return this;
                                                                           //_json_output(a,`C_WanderWalkerのコンストラクタが呼ばれました。クラス ＝ : `); // デバッグ用：コンストラクタの引数を出力

        if (a.clname        !== undefined) this.clname = a.clname;
        
        this.cond ??= {} as T_Condition; // 初期化
        if (a.cond?.canMove !== undefined) this.cond.canMove  = (a.cond.canMove??'0') !== '0' ? true : false;
        if (a.cond?.canTurn !== undefined) this.cond.canTurn  = (a.cond.canTurn??'0') !== '0' ? true : false;
        if (a.cond?.canMove !== undefined) this.cond.canSlid  = (a.cond.canSlid??'0') !== '0' ? true : false;
        if (a.cond?.canMove !== undefined) this.cond.canUpDn  = (a.cond.canUpDn??'0') !== '0' ? true : false;
        if (a.cond?.canThru !== undefined) this.cond.canThru  = (a.cond.canThru??'1') !== '0' ? true : false;
        if (a.cond?.canMove !== undefined) this.cond.careWal  = (a.cond.careWal??'1') !== '0' ? true : false;
    /**     mazeObjをデコードすると無限ループになる。向こうでもこのクラスをdecodeするので。
        if (a.cond?.mazeObj??false) {
            this.mazeObj = new C_MazeObj(a.cond.mazeObj);
        }
    **/
        if (a.loc_pos !== undefined) this.set_pd(new C_PointDir(a.loc_pos));

        return this;
    }


    public get_mazeObj(): I_MazeObj|undefined {
        return this.mazeObj;
    }
    public set_mazeObj(mo: I_MazeObj): void {
        this.mazeObj = mo;
    }

    public set_pd(pd: C_PointDir): C_PointDir {
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
            canMove:  (this.cond.canMove??false) ? '1' : '0',
            canTurn:  (this.cond.canTurn??false) ? '1' : '0',
            canSlid:  (this.cond.canSlid??false) ? '1' : '0',
            canUpDn:  (this.cond.canUpDn??false) ? '1' : '0',
            canThru:  (this.cond.canThru??true)  ? '1' : '0',
            careWal:  (this.cond.careWal??true)  ? '1' : '0',
/**         mazeObjをエンコードすると無限ループになる。向こうでもこのクラスをencodeするので。
            mazeObj:  this.mazeObj?.encode()??{},
**/
        }

        return j;
    }
    public decode(a?: JSON_WanderWalker): C_WanderWalker {
        return this.__init(a);
    }
}
