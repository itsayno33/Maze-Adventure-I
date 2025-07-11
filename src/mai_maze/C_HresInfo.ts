"use strict";

import { C_Hero } from "../d_mdl/C_Hero";

type _T_HeroInfo = {
    name: string|undefined;
    stat: string|undefined;
    nwHp: number|undefined;
    nwMp: number|undefined;
    mxHp: number|undefined;
    mxMp: number|undefined;
}

type _T_InfoTR = {
    name: HTMLTableCellElement;
    stat: HTMLTableCellElement;
    hpCh: HTMLTableCellElement;
    mpCh: HTMLTableCellElement;
}

const max_hres = 4;

export class C_HresInfo {
    protected elm:    HTMLDivElement|null = null;
    protected myHres: C_Hero[] = [];
    protected tbl:    HTMLTableElement|null   = null;
    protected cols:   _T_InfoTR[]|undefined   = undefined;
    protected info:  (_T_HeroInfo|undefined)[]|undefined = undefined;

    constructor(eid: string, hres?: C_Hero[]) {
        this.init(eid);
        this.update(hres);
    }

    public init(eid: string) {
        this.elm = document.getElementById(eid) as HTMLDivElement;
        if (this.elm === null) return;

        this.tbl = document.createElement("table");
        if (this.tbl === null) return;

        this._createTable();
    }

    public update(hres: C_Hero[]|undefined) {
        if (hres !== undefined && hres.length > 0) {
            this.myHres = hres;
            this._update();
        }
    }

    public hres(): C_Hero[] {return this.myHres}

    protected _createTable(): void {
        if (this.elm === undefined || this.elm === null) return;
        if (this.tbl === undefined || this.tbl === null) return;

        this.tbl.setAttribute('id',      this.elm.id + '_table');
        this.tbl.setAttribute('display', 'none');

        const tbody = document.createElement("tbody");

        for (let ii = 0; ii < max_hres; ii++) { // 順番が大事なのでfor inは使わない。人数も分からないし
            this._createTR(ii, tbody);
            this._updateTR(ii);
        }

        this.tbl.appendChild(tbody);
        this.tbl.setAttribute('display', 'block');
        this.elm?.appendChild(this.tbl);
    }

    protected _createTR(idx: number, tbody: HTMLTableSectionElement): void {
        if (idx < 0 || idx >= max_hres) return;

        const tr = document.createElement("tr");
        tr.setAttribute('display', 'hidden');

        this.cols      ??= [];
        this.cols[idx] ??= {} as _T_InfoTR;
        this.cols[idx]   = this._createTD(tr);

        tr.setAttribute('display', 'block');
        tbody.appendChild(tr);

    }
    protected _createTD(tr: HTMLTableRowElement): _T_InfoTR { // ここは順番が大事（表示順）
        const tds:_T_InfoTR = {} as _T_InfoTR;
        tds.name = document.createElement('td');
        tds.stat = document.createElement('td');
        tds.hpCh = document.createElement('td');
        tds.mpCh = document.createElement('td');

        tr.appendChild(tds.name);
        tr.appendChild(tds.stat);
        tr.appendChild(tds.hpCh);
        tr.appendChild(tds.mpCh);

        return tds;
    }

    protected _update(): void {
        for (let ii = 0; ii < this.myHres.length; ii++) { // 順番が大事なのでfor inは使わない
            if (this.myHres[ii] === undefined || this.myHres[ii] === null) continue;
            this._setInfo (ii);
            this._updateTR(ii);
        }
    }


    protected _setInfo(idx: number): void {
        if (idx < 0 || idx >= max_hres) return;

        this.info ??= [];
        this.info[idx] ??= {} as _T_HeroInfo;

        if (idx < this.myHres.length) {
            this.info[idx].name = this.myHres[idx].name();
            this.info[idx].stat = this.myHres[idx].is_alive() ? '　正常　' : '行動不能';
            this.info[idx].nwHp = this.myHres[idx].get_abi_p_now("xp") - this.myHres[idx].get_abi_p_now("xd");
            this.info[idx].mxHp = this.myHres[idx].get_abi_p_now("xp");
            this.info[idx].nwMp = this.myHres[idx].get_abi_m_now("xp") - this.myHres[idx].get_abi_m_now("xd");
            this.info[idx].mxMp = this.myHres[idx].get_abi_m_now("xp");
        } else {
            this.info[idx] = undefined;
        }
    }

    protected _updateTR(idx: number): void {
        if (this.cols === undefined || this.cols.length < 0) return;

        if (this.info !== undefined  &&  this.info[idx] !== undefined) {
            this.cols[idx].name.innerHTML =  this.info[idx].name ?? '';
            this.cols[idx].stat.innerHTML =  this.info[idx].stat ?? '';
            this.cols[idx].hpCh.innerHTML = 'HP：'
                                          + (this.info[idx].nwHp?.toString() ?? '???')
                                          + ' / '
                                          + (this.info[idx].mxHp?.toString() ?? '???')
                                          ;
            this.cols[idx].mpCh.innerHTML = 'MP：'
                                          + (this.info[idx].nwMp?.toString() ?? '???')
                                          + ' / '
                                          + (this.info[idx].mxMp?.toString() ?? '???')
                                          ;
        }
    }
}
