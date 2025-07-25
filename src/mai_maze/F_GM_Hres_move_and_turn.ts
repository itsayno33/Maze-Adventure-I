"use strict";

// 大域変数使用
// g_maze

import { 
    g_maze, 
} from "./global_for_maze";

import { 
    I_HopeAction, 
    I_HopeResponceMove, 
    I_HopeResponceTurn
}                 from "../d_mdl/C_Hope";

import { _irand }         from "../d_utl/F_Rand";


// 移動時の判定   true: 移動可能  false: 移動不可
export function can_move_team(r: I_HopeAction): I_HopeResponceMove {
    const _touch = _is_touch_team(r);  // 当たり判定（隣接）
    if (!_touch) {
        // 進行方向にある壁やオブジェとの衝突判定
        const _how_collide  = _how_collide_team(r); // 戻り値 canMove:trueなら移動可、damageは基本ダメージ量

        return {
            ok:  _how_collide.canMove,   // 移動可否
            res: _how_collide.canMove ? 'Move' : 'Block', // 行動結果
            dmg: _how_collide.damage, // 基本ダメージ値
            hope: r,                     // 希望行動
        }
    } else {
        return {
            ok:      false,     // 移動不能
            res:    'Block',    // 行動結果
            dmg:     0,         // 基本ダメージ値
            hope:    r,         // 希望行動
        }
    }
}


// ターン時の判定  true: ターン可能  false: ターン不可
export function can_turn_team(r: I_HopeAction): I_HopeResponceTurn {
    const _turn = _can_turn_team(r);
    if (_turn) {
        const _touch =_is_touch_team(r);  // 当たり判定（隣接）
        return {ok: !_touch , hope: r, res: _touch ? 'Block' : 'Turn', dmg: 0}; // ターン可能
    } else {
        return {ok: false,    hope: r, res: 'Block', dmg: 0}; // ターン不可
    }
}


// ターン可否  true:可, false:不可
function _can_turn_team(r: I_HopeAction): boolean { return true; }


// 当たり判定（隣接）  true: 接触あり  false: 接触なし
// ここでは接触はない設定
function _is_touch_team(r: I_HopeAction): boolean { return false; }


// 当たり判定の結果
// canMove: trueなら移動可能、falseなら移動不可
interface _I_how_collide_team_rslt {
    canMove: boolean; // 移動可能か
    damage:  number;   // 基本ダメージ値（仮設定）
}


// 当たり判定（衝突）  
// 進行方向にある壁やオブジェとの衝突判定
// 戻り値 canMove:trueなら移動可、damageは基本ダメージ量
// 今は基本ダメージがゼロの設定
function _how_collide_team(r: I_HopeAction): _I_how_collide_team_rslt {
    const cell = g_maze.get_cell(r.subj);

    // 進行方向が迷宮外なら移動不可
    // 進行方向が壁等なら移動不可
    if (!g_maze.within(r.subj) || !(cell?.getObj().canThrough() ?? true)) {
        const damage = cell?.getObj().hitDamage() ??  10;
        return {canMove: false, damage: damage}; // 壁との衝突あり
    }
    const obj = g_maze.get_obj(r.subj);
    if (obj !== null) {
        if (obj.canThrough()) {
            // 進行方向にオブジェが在るが通り抜け可能
            return {canMove: true, damage: 0}; // オブジェとの衝突なし(通り抜け可能)
        } else {
            // 進行方向にオブジェが有り通り抜け不能
            // 移動せずにオブジェ接近処理(以降の階段処理等はスルー)
            const damage   = obj.hitDamage();
            return {canMove: false, damage: damage}; // オブジェとの衝突あり
        }
    }
//    alert('進行方向にオブジェがない');
    return {canMove: true, damage: 0}; // 衝突なし(進行方向に障害なし)
}
