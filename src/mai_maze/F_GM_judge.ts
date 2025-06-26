import { T_MzKind }                   from "../d_mdl/T_MzKind";
import { I_HopeAction }               from "../d_mdl/I_Common";
import { C_Point }                    from "../d_mdl/C_Point";
import { g_debug }                    from "../d_cmn/global";

import { 
    g_mvm, 
    g_vsw, 
    g_maze, 
    g_team,
} from "./global_for_maze";


// 移動時の判定
export function jdge_move() {}


// ターン時の判定
export function jdge_turn() {}


// 移動可否    ゼロ以下なら移動不可。その場合の値はダメージ値
function _can_move(): number { return 1; }

// ターン可否  true:可, false:不可
function _can_turn(): boolean { return true; }

// 当たり判定（接触）
function _jdge_touch() {}

// 当たり判定（衝突）
function _jdge_collide() {}

// 当たり判定（上に乗る）
function _jdge_on() {}


