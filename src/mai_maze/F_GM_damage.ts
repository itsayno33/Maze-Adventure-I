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
}                 from "../d_mdl/C_Hope";

import { C_Hero } from "../d_mdl/C_Hero";
import { _irand } from "../d_utl/F_Rand";


// チーム全体のダメージ処理（ＨＰ）
export function hp_damage_hres(damage: number): void {
    for (const hero of g_hres) hp_damage_hero(hero, damage);
}
// Heroのダメージ処理（ＨＰ）
export function hp_damage_hero(hero: C_Hero, damage: number): number
{ 
    return hero.hp_damage(damage);
} 


// チーム全体の回復処理（ＨＰ）
export function hp_recover_hres(recover: number): void {
    for (const hero of g_hres) hp_recover_hero(hero, recover);
}
// Heroの回復処理（ＨＰ）
export function hp_recover_hero(hero: C_Hero, recover: number): number
{ 
    return hero.hp_damage(recover);
} 

// Team全体の自動回復処理（ＨＰ）
/*****************
export function hp_auto_recover_hres() {
    for (const hero of g_hres) hero.hp_auto_heal();
}
*****************/
