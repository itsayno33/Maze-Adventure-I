import { T_MzKind }                   from "../d_mdl/T_MzKind";
import { C_Point }                    from "../d_mdl/C_Point";
import { g_debug }                    from "../d_cmn/global";

import { 
    g_mvm, 
    g_vsw, 
    g_maze, 
    g_team,
} from "./global_for_maze";

import { 
    I_HopeAction, 
    I_HopeResponceMove, 
    I_HopeResponceTurn
}                 from "../d_mdl/I_Hope";

import { C_Hero } from "../d_mdl/C_Hero";


// 移動時の判定   true: 移動可能  false: 移動不可
export function can_move_team(r: I_HopeAction): I_HopeResponceMove {
    const _touch = _is_touch_team(r);
    if (!_touch) {
        // 進行方向の衝突判定
        const _damage  = _how_collide_team(r); // _damage >0 なら移動可、<=0 なら基本ダメージ量
        if (_damage < 0) _take_damage_team(_damage); // ダメージ処理
        return {
            ok:  _damage > 0,   // 移動可否
            res: _damage > 0 ? 'Move' : 'Block', // 行動結果
            hope: r,            // 希望行動
        }
    } else {
        return {
            ok:      false,     // 移動不能
            res:    'Block',    // 行動結果
            hope:    r,         // 希望行動
        }
    }
}


// ターン時の判定  true: ターン可能  false: ターン不可
export function can_turn_team(r: I_HopeAction): I_HopeResponceTurn {
    const _turn = _can_turn_team(r);
    if (_turn) {
        const _touch =_is_touch_team(r);
        return {ok: !_touch , hope: r, res: _touch ? 'Block' : 'Turn'}; // ターン可能
    } else {
        return {ok: false, hope: r, res: 'Block'}; // ターン不可
    }
}


// 1. この位置でイベントが起きるか判断
// 2. 起きる場合はイベント処理
export function on_event_team(r: I_HopeAction): void {
    if (_jdge_stepon_team(r)) _do_stepon_team(r);   // 位置イベントの処理
    if (_jdge_pickup_team(r)) _do_pickup_team(r);   // ドロップ品の処理
}


// ターン可否  true:可, false:不可
function _can_turn_team(r: I_HopeAction): boolean { return true; }


// 当たり判定（接触）  true: 接触あり  false: 接触なし
// ここでは接触はない設定
function _is_touch_team(r: I_HopeAction): boolean { return false; }


// 当たり判定（衝突）  <= 0: 衝突あり  > 0: 衝突なし 負値はダメージ値（仮設定）
function _how_collide_team(r: I_HopeAction): number {
    const cell = g_maze.get_cell(r.subj);

    // 進行方向が壁等なら移動不可
    if (!cell?.getObj().canThrough()) {
        return 0; // 衝突あり
    }
    const obj = g_maze.get_obj(r.subj);
    if (obj !== null) {
        if (obj.canThrough()) {
            // 進行方向にオブジェが在るが通り抜け可能
            return 1; // 衝突なし
        } else {
            // 進行方向にオブジェが有り通り抜け不能
            // 移動せずにオブジェ接近処理(以降の階段処理等はスルー)
            return 0; // 衝突あり
        }
    }
    return 1; // 衝突なし
}


// 当たり判定（上に乗る）
function _jdge_stepon_team(r: I_HopeAction): boolean {
    _jdge_trap_team(r);  // 罠の判定
    _jdge_enemy_team(r); // 敵の判定
    return false; // ここでは上に乗るものはない設定
}


// 上に乗るものがある場合の処理
// ここでは上に乗るものはない設定
function _do_stepon_team(r: I_HopeAction): void {}


// 拾うものがあるか
function _jdge_pickup_team(r: I_HopeAction): boolean {
    return false; // ここでは拾うものはない
}


// 拾うものがある場合の処理
// ここでは拾うものはない設定
function _do_pickup_team(r: I_HopeAction): void {}


// 罠があるか
function _jdge_trap_team(r: I_HopeAction): boolean {
    return false; // ここでは罠はない
}


// 敵がいるか
function _jdge_enemy_team(r: I_HopeAction): boolean {
    return false; // ここでは敵はいない
}


// チーム全体のダメージ処理
function _take_damage_team(basic_damage: number): void {
    const hres = g_team.hres();
    for (const hero of hres) _take_damage_hero(hero, basic_damage);
}

// Heroのダメージ処理
// ここではダメージはない設定
function _take_damage_hero(hero: C_Hero, basic_damage: number): number { return 0; } 
