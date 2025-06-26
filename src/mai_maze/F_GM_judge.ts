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
}               from "../d_mdl/I_Hope";

import { C_Hero } from "../d_mdl/C_Hero";


// 移動時の判定   true: 移動可能  false: 移動不可
export function can_move_team(r: I_HopeAction): I_HopeResponceMove {
    const _touch = _is_touch_team(r);
    if (!_touch) {
        const _damage  = _can_move_team(r); // _damage > 0なら移動可能、<= 0なら基本ダメージ量
        if (_damage < 0) _take_damage_team(_damage); // ダメージ処理
        return {
            ok:  _damage > 0,   // 移動可否
            res: _damage > 0 ? 'Move' : 'Block', // 行動結果
            hope: r,          // 希望行動
        }
    } else {
        return {
            ok:      false,   // 移動不能
            res:    'Block',  // 行動結果
            hope:    r,       // 希望行動
        }
    }
}


// ターン時の判定  true: ターン可能  false: ターン不可
export function can_turn_team(r: I_HopeAction): I_HopeResponceTurn {
    const _turn =_can_turn_team(r);
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
    _jdge_event_team(r);
    _do_event_team(r);
}


// この位置でイベントが起きるか判断
function _jdge_event_team(r: I_HopeAction): void {
    _jdge_stepon_team(r);
    _jdge_pickup_team(r);
}

// この位置におけるイベント処理
// ここではイベントはない設定
function _do_event_team(r: I_HopeAction): void {}


// 移動可否    ゼロ以下なら移動不可。その場合の値はダメージ値
function _can_move_team(r: I_HopeAction): number { return 1; }

// ターン可否  true:可, false:不可
function _can_turn_team(r: I_HopeAction): boolean { return true; }

// 当たり判定（接触）  true: 接触あり  false: 接触なし
// ここでは接触はない設定
function _is_touch_team(r: I_HopeAction): boolean { return false; }

// 当たり判定（衝突）  true: 衝突あり  false: 衝突なし
// ここでは衝突はない設定
function _is_collide_team(r: I_HopeAction): boolean { return false; }



// 当たり判定（上に乗る）
function _jdge_stepon_team(r: I_HopeAction): void {
    _jdge_trap_team(r);  // 罠の判定
    _jdge_enemy_team(r); // 敵の判定
}

// 拾うものがあるか
function _jdge_pickup_team(r: I_HopeAction): boolean {
    return false; // ここでは拾うものはない
}

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
