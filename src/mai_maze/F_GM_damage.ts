import { 
    g_mvm, 
    g_vsw, 
    g_maze, 
    g_team,
    g_hres,
} from "./global_for_maze";

import { 
    I_HopeAction, 
    I_HopeResponceMove, 
    I_HopeResponceTurn
}                 from "../d_mdl/I_Hope";

import { C_Hero } from "../d_mdl/C_Hero";
import { _irand } from "../d_utl/F_Rand";


// チーム全体のダメージ処理（ＨＰ）
export function hp_damage_team(basic_damage: number): void {
    for (const hero of g_hres) hp_damage_hero(hero, basic_damage);
}

// Heroのダメージ処理（ＨＰ）
export function hp_damage_hero(hero: C_Hero, basic_damage: number): number
{ 
    const  real_damage = _irand(Math.trunc(basic_damage * 0.9), Math.ceil(basic_damage * 1.1));
    const  d = hero.hp_damage(real_damage);
    return d; 
} 
