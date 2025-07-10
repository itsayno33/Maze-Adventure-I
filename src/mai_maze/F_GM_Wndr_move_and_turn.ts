"use strict";

import { I_HopeAction, I_HopeResponceMove, I_HopeResponceTurn } from "../d_mdl/C_Hope";
import { C_WndrWalker } from "../d_mdl/C_WndrWalker";
import { g_maze } from "./global_for_maze";

// 大域変数使用
// g_maze

// 移動時の判定   true: 移動可能  false: 移動不可
export function can_move_wndr(walk: C_WndrWalker, r: I_HopeAction): I_HopeResponceMove {
    const _touch = _is_touch_wndr(r);  // 当たり判定（隣接）
    if (!_touch) {
        // 進行方向にある壁やオブジェとの衝突判定
        const _how_collide  = _how_collide_wndr(walk, r); // 戻り値 canMove:trueなら移動可、damageは基本ダメージ量

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

// 当たり判定（隣接）  true: 接触あり  false: 接触なし
// ここでは接触はない設定
function _is_touch_wndr(r: I_HopeAction): boolean { return false; }


// ターン時の判定  true: ターン可能  false: ターン不可
export function can_turn_wndr(r: I_HopeAction): I_HopeResponceTurn {
    const _turn = _can_turn_wndr(r);
    if (_turn) {
        const _touch =_is_touch_wndr(r);  // 当たり判定（隣接）
        return {ok: !_touch , hope: r, res: _touch ? 'Block' : 'Turn', dmg: 0}; // ターン可能
    } else {
        return {ok: false,    hope: r, res: 'Block', dmg: 0}; // ターン不可
    }
}

// ターン可否  true:可, false:不可
function _can_turn_wndr(r: I_HopeAction): boolean { return true; }



// 当たり判定の結果
// canMove: trueなら移動可能、falseなら移動不可
interface _I_how_collide_wndr_rslt {
    canMove: boolean; // 移動可能か
    damage:  number;   // 基本ダメージ値（仮設定）
}

// 当たり判定（衝突）  
// 進行方向にある壁やオブジェとの衝突判定
// 戻り値 canMove:trueなら移動可、damageは基本ダメージ量
// 今は基本ダメージがゼロの設定
function _how_collide_wndr(walk: C_WndrWalker, r: I_HopeAction): _I_how_collide_wndr_rslt {
    const cell = g_maze.get_cell(r.subj);

    // 進行方向が迷宮外なら移動不可
    if (!g_maze.within(r.subj)) {
        const damage = 50;
        return {canMove: false, damage: damage}; // 迷宮の外壁との衝突あり
    }

    // 自分自身が透過タイプなら移動可
    if (walk.canThru()) return {canMove: true, damage: 0};

    // 以下、自分自身が衝突タイプの場合
    // 進行方向が壁等なら移動不可
    if (!(cell?.getObj().canThrough() ?? true)) {
        const damage = cell?.getObj().hitDamage() ??  10;
        return {canMove: false, damage: damage}; // 壁との衝突あり
    }

    // 以下、移動先にある他のオブジェ群とぶつかる場合はダメージの累積を計算
    const objs = g_maze.get_any_obj(r.subj);

    let full_damage = 0;
    for (const obje of objs) {
        if (obje === undefined || obje === null) continue;
        if (!obje.canThrough()) {
            // 進行方向にオブジェが有り通り抜け不能
            // 移動せずにオブジェ接近処理(以降の階段処理等はスルー)
            const full_damage   = obje.hitDamage();
        } else {}; // 透過するオブジェは無干渉
    }
    // オブジェとの衝突加算の結果、衝突ありの場合
    if (full_damage > 0) return {canMove: false, damage: full_damage};

    // 結局衝突無し
    return {canMove: true, damage: 0};
}

