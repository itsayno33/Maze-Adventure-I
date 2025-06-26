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


// 移動時の判定   true: 移動可能  false: 移動不可
export function hero_can_move(r: I_HopeAction): I_HopeResponceMove {
    const _touch = _hero_can_touch(r);
    if (!_touch) {
        const _move  = _hero_can_move(r);
        return {
            ok: _move > 0,    // 移動可否
            hope: r,          // 希望行動
            res: _move > 0 ? 'Move' : 'Block', // 行動結果
            damage: _move,    // 移動不可時のダメージ値
        }
    } else {
        return {
            ok:      false,   // 移動不能
            hope:    r,       // 希望行動
            res:    'Block',  // 行動結果
            damage:  0,       // 移動不可時のダメージ値
        }
    }
}


export function hero_jdge_move(r: I_HopeAction): void {
    _hero_jdge_collide(r);
    _hero_jdge_stepon(r);
}


// ターン時の判定  true: ターン可能  false: ターン不可
export function hero_can_turn(r: I_HopeAction): I_HopeResponceTurn {
    const _turn =_hero_can_turn(r);
    if (_turn) {
        const _touch =_hero_can_touch(r);
        return {ok: !_touch , hope: r, res: _touch ? 'Block' : 'Turn'}; // ターン可能
    } else {
        return {ok: false, hope: r, res: 'Block'}; // ターン不可
    }
}


export function hero_jdge_turn(r: I_HopeAction): void {}


// 移動可否    ゼロ以下なら移動不可。その場合の値はダメージ値
function _hero_can_move(r: I_HopeAction): number { return 1; }

// ターン可否  true:可, false:不可
function _hero_can_turn(r: I_HopeAction): boolean { return true; }

// 当たり判定（接触）  true: 接触あり  false: 接触なし
// ここでは接触はない設定
function _hero_can_touch(r: I_HopeAction): boolean { return false; }

// 当たり判定（衝突）
function _hero_jdge_collide(r: I_HopeAction): void {}

// 当たり判定（上に乗る）
function _hero_jdge_stepon(r: I_HopeAction): void {}

// 拾うものがあるか
function _hero_jdge_pickup(r: I_HopeAction): boolean {
    return false; // ここでは拾うものはない
}

// 罠があるか
function _hero_jdge_trap(r: I_HopeAction): boolean {
    return false; // ここでは罠はない
}

// 敵がいるか
function _hero_jdge_enemy(r: I_HopeAction): boolean {
    return false; // ここでは敵はいない
}
