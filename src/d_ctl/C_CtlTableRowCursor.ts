/*
 * Tableではなく、Tbodyを対象としたカーソル制御クラス
 * カーソル制御クラスは行方向のみ
 * 
 * 1. tbodyの配下にtrのみがあることを前提とする。
 * 2. trの配下にtdのみがあることを前提とする。
 * 
 * 未テスト。多分バグあり
*/

import { _ceil, _floor, _isNum } from "../d_utl/F_Math";
import { _alert }                from "../d_cmn/global";

export class C_CtlTableRowCursor {
    protected static me: {[id: string]: C_CtlTableRowCursor};

    public static getObj(list?: HTMLTableSectionElement): C_CtlTableRowCursor  {
        this.me ??= {}

        const id = list !== undefined ? list.id : '__dmy__';
        this.me[id] ??= new C_CtlTableRowCursor(list);

        if (list !== undefined) this.me[id].set(list);
        return this.me[id];
    }

    protected _id:   string;
    protected _list: HTMLTableSectionElement|undefined;
    protected _leng: number;
    protected _rows: number;
    protected _cols: number;
    protected _indx: number;

    protected constructor(list?: HTMLTableSectionElement) {
        C_CtlTableRowCursor.me ??= {}

        this._id   = '__dmy__';
        this._list = undefined;
        this._leng = 0;
        this._rows = 0;
        this._cols = 1;
        this._indx = 0;
        C_CtlTableRowCursor.me[this._id] = this;
    }
    public set(list: HTMLTableSectionElement): C_CtlTableRowCursor {
        this._id   = list.id;
        this._list = list;
        this._leng = this.__get_leng();
        this._rows = this.__get_rows();
        this._cols = this.__get_cols();
        this._indx = 0;

        this.high_light_on();
        return this;
    }

    public uid(): string {
        return this._id;
    }
    public leng(): number {
        return this._leng;
    }
    public rows(): number {
        return this._rows;
    }
    public cols(): number {
        return this._cols;
    }

    public pos(): number {
        return this._indx;
    }
    public set_pos(indx: number): C_CtlTableRowCursor {
        if (indx <  0) indx = 0;
        if (indx >= this._leng) indx = this._leng - 1;

        this._indx = indx; this.high_light_on();
        return this;
    }

    public pos_U(): number {
        if (this._list === undefined) return 0;

        let   indx = this._indx;
        const rows = this.__get_rows();
        const cur_row   = indx % rows;
        if (cur_row !== 0) {
            // 最上段(上端)以外
            --indx;
        } else {
            // 最上段(上端)
            indx += rows - 1;
            while (indx > this._leng - 1) {
                --indx;
            }
        } 
        this._indx = indx; this.high_light_on();
        return this._indx;
    }
    public pos_D(): number {
        if (this._list === undefined) return 0;

        let   indx = this._indx;
        const rows = this.__get_rows();
        const cur_row = indx % rows;
        if (cur_row !== rows - 1 && indx !== this._leng - 1) {
            // 最下段(下端)以外
            ++indx;
        } else {
            // 最下段(下端)
            indx -= rows - 1;
            while (indx % rows !== 0 && indx < this._leng - 1) {
                ++indx;
            }
        } 
        this._indx = indx; this.high_light_on();
        return this._indx;
    }
    
    protected __get_rows(): number {
        return _ceil(this._leng / this._cols, 0);
    }
    // DOMリスト一覧の行数の取得
    protected __get_leng(): number {
        if (this._list === undefined) return 0;
        try {
            return this._list.children.length; 
        } catch(err) {
            return 1;
        }
    }
    // DOMリスト一覧の列数(CSSから取得)の取得
    protected  __get_cols(): number {
        if (this._list === undefined) return 0;
        try {
            const firstRow = this._list.children.item(0);
            if (firstRow !== null) {
                const cells = firstRow.children;
                return cells.length;
            } else {
                return 1; // Default to 1 column if no rows are present
            }
        } catch(err) {
            return 1;
        }
    }

    // メニューのデフォルト操作(ハイライトと詳細表示制御)
    public high_light_on(): void {
        if (this._list === undefined) return;

        this.high_light_off();
        const tr = this._list.children.item(this._indx) as HTMLTableRowElement;
        this.__high_light_on(tr, true);
    }
    public high_light_off(): void {
        if (this._list === undefined) return;

        const children = this._list.children;
        const len      = children.length;
        for (var i = 0; i < len; i++) {
            const tr = children.item(i) as HTMLTableRowElement;
            this.__high_light_on(tr, false);
        }
    }
    protected __high_light_on(elm: HTMLTableRowElement | null, isOn: boolean): void {
        if (elm === null) return;
        const perentStyle = window.getComputedStyle(elm.parentElement ?? elm);

        const fw_color = perentStyle.color;
        const bg_color = perentStyle.backgroundColor;

        elm.style.color           = isOn ? bg_color : fw_color;
        elm.style.backgroundColor = isOn ? fw_color : bg_color;

        elm.style.fontWeight =  isOn ? 'bold' : 'normal';
        for (var j = 0; j < elm.children.length; j++) {
            const p = elm.children.item(j) as HTMLElement;
            if (isOn) {
                p.style.fontWeight      = 'normal';
                p.style.color           = fw_color;
                p.style.backgroundColor = bg_color;
                p.style.display         = 'block';
            } else {
                p.style.display         = 'none';
            }
        }
    }
    public alert(): void {
        _alert(
              "CtlCursor: "
            + "\nid   = " + this._id
            + "\nindx = " + this._indx
            + "\nleng = " + this._leng
            + "\ncols = " + this._cols
        )
    };
}












