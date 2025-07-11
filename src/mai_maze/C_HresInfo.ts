"use strict";

import { C_Hero } from "../d_mdl/C_Hero";
import { g_hres } from "./global_for_maze";

// g_hresからの抜粋
type _T_HeroInfo = {
    name: string|undefined;
    stat: string|undefined;
    nwHp: number|undefined;
    nwMp: number|undefined;
    mxHp: number|undefined;
    mxMp: number|undefined;
}

// 表組みのTDと対応
type _T_InfoTR = {
    "name": HTMLTableCellElement|null;
    "stat": HTMLTableCellElement|null;
    "hpCh": HTMLTableCellElement|null;
    "mpCh": HTMLTableCellElement|null;
}

const max_hres = 4;

export class C_HresInfo {
    protected elm:    HTMLDivElement|null = null;
    protected myHres: C_Hero[] = [];
    protected tbody:  HTMLTableSectionElement|null   = null;
    protected hres:  (_T_HeroInfo|undefined)[]|undefined = undefined;
    protected rows:   _T_InfoTR[]|undefined   = undefined;

    constructor() {
        this.init();
    }


    public init(): void {
        this.rows = []; this._init_rows();
    }

    protected _init_rows(): void {
        for (let idx = 0; idx < max_hres; idx++) this._init_a_row(idx); // 並び順が重要なので for で回す
    }
    protected _init_a_row(idx: number): void {
        if (this.rows === undefined || this.rows.length < 0) return;
        this._init_a_col(idx, "name");
        this._init_a_col(idx, "stat");
        this._init_a_col(idx, "hpCh");
        this._init_a_col(idx, "mpCh");
    }

    protected _init_a_col(idx: number, key: string): void {
        if (this.rows === undefined || this.rows.length < 0) return;

        this.rows[idx] ??= {} as _T_InfoTR;
        this.rows[idx][key as keyof _T_InfoTR] 
            = document.getElementById(`div_hres_info_tr${idx.toString()}_${key}`) as HTMLTableCellElement;
    }


    public update(): void {
        this._init_hres();
        this._hres_to_rows();
    }

    protected _init_hres(): void {
        this.hres = [];
        let idx = 0;
        for (let idx = 0; idx < max_hres; idx++) {
            this._init_a_hero(idx); // 並び順が重要なので for で回す
        }
    }

    protected _init_a_hero(idx: number): void {
        if (g_hres[idx] === undefined) return;
        if (this.hres   === undefined || this.hres.length < 0) return;

        this.hres[idx] = {} as _T_HeroInfo;

        if (idx < g_hres.length) {
            this.hres[idx].name = g_hres[idx].name();
            this.hres[idx].stat = g_hres[idx].is_alive() ? '　正常　' : '行動不能';
            this.hres[idx].nwHp = g_hres[idx].get_abi_p_now("xp") - g_hres[idx].get_abi_p_now("xd");
            this.hres[idx].mxHp = g_hres[idx].get_abi_p_now("xp");
            this.hres[idx].nwMp = g_hres[idx].get_abi_m_now("xp") - g_hres[idx].get_abi_m_now("xd");
            this.hres[idx].mxMp = g_hres[idx].get_abi_m_now("xp");
        } else {
            this.hres[idx] = undefined;
        }
    }

    protected _hres_to_rows(): void {
        for (let idx = 0; idx < max_hres; idx++) this._hero_to_a_row(idx); // 並び順が重要なので for で回す
    }
    protected _hero_to_a_row(idx: number): void {
        if (this.rows === undefined || this.rows.length < 0) return;

        if (this.rows[idx]?.name === undefined) return;
        if (this.rows[idx]?.stat === undefined) return;
        if (this.rows[idx]?.hpCh === undefined) return;
        if (this.rows[idx]?.mpCh === undefined) return;

        if (this.rows[idx].name === null) return;
        if (this.rows[idx].stat === null) return;
        if (this.rows[idx].hpCh === null) return;
        if (this.rows[idx].mpCh === null) return;

        if (this.hres !== undefined  &&  this.hres[idx] !== undefined) {
            this.rows[idx].name.innerHTML =  this.hres[idx].name ?? '';
            this.rows[idx].stat.innerHTML =  this.hres[idx].stat ?? '';
            this.rows[idx].hpCh.innerHTML = 'HP：'
                                          + (this.hres[idx].nwHp?.toString() ?? '???')
                                          + ' / '
                                          + (this.hres[idx].mxHp?.toString() ?? '???')
                                          ;
            this.rows[idx].mpCh.innerHTML = 'MP：'
                                          + (this.hres[idx].nwMp?.toString() ?? '???')
                                          + ' / '
                                          + (this.hres[idx].mxMp?.toString() ?? '???')
                                          ;
        } else {
            this.rows[idx].name.innerHTML = '';
            this.rows[idx].stat.innerHTML = '';
            this.rows[idx].hpCh.innerHTML = '';
            this.rows[idx].mpCh.innerHTML = '';
        }
    }
}