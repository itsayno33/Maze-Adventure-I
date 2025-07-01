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


// 1. この位置でイベントが起きるか判断
// 2. 起きる場合はイベント処理
export function on_event_team(r: I_HopeAction): void {
    if (_jdge_stepon_team(r)) _do_stepon_team(r);   // 位置イベントの処理
    if (_jdge_pickup_team(r)) _do_pickup_team(r);   // ドロップ品の処理
}


// 当たり判定（上に乗る）
// 今は上に乗るものがない設定
function _jdge_stepon_team(r: I_HopeAction): boolean {
    _jdge_trap_team(r);  // 罠の判定
    _jdge_enemy_team(r); // 敵の判定
    return false; // ここでは上に乗るものはない設定
}


// 上に乗るものがある場合の処理
function _do_stepon_team(r: I_HopeAction): void {}


// 拾うものがあるか
// 今は拾うものがない設定
function _jdge_pickup_team(r: I_HopeAction): boolean {
    return false; // ここでは拾うものはない
}


// 拾うものがある場合の処理
function _do_pickup_team(r: I_HopeAction): void {}


// 罠があるか
function _jdge_trap_team(r: I_HopeAction): boolean {
    return false; // ここでは罠はない設定
}


// 敵がいるか
function _jdge_enemy_team(r: I_HopeAction): boolean {
    return false; // ここでは敵はいない設定
}
