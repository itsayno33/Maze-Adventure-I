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


// チーム全体のダメージ処理
export function get_damage_team(basic_damage: number): void {
    const hres = g_team.hres();
    for (const hero of hres) get_damage_hero(hero, basic_damage);
}

// Heroのダメージ処理
// ここではダメージはない設定
export function get_damage_hero(hero: C_Hero, basic_damage: number): number { return 0; } 
