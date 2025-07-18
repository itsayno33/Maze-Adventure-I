/*
 * Tableではなく、Tbodyを対象としたカーソル制御クラス
 * 1. tbodyの配下にtrのみがあることを前提とする。
 * 2. trの配下にtdのみがあることを前提とする。
 * 
 * 未テスト。多分バグあり
*/


import { _ceil, _floor, _isNum } from "../d_utl/F_Math";
import { _alert }                from "../d_cmn/global";

export type T_xy = {x: number, y: number};

export class C_CtlTbodyCursor {
    protected static me: {[id: string]: C_CtlTbodyCursor};

    public static getObj(list?: HTMLTableSectionElement): C_CtlTbodyCursor  {
        this.me ??= {}

        const id = list !== undefined ? list.id : '__dmy__';
        this.me[id] ??= new C_CtlTbodyCursor(list);

        if (list !== undefined) this.me[id].set(list);
        return this.me[id];
    }

    protected _id:    string;
    protected _list:  HTMLTableSectionElement|undefined;
    protected _leng:  number;
    protected _rows:  number;
    protected _cols:  number;
    protected _indx:  T_xy;

    protected constructor(list?: HTMLTableSectionElement) {
        C_CtlTbodyCursor.me ??= {}

        this._id   = '__dmy__';
        this._list = undefined;
        this._leng = 0;
        this._rows = 1;
        this._cols = 1;
        this._indx = {x:0, y:0};
        C_CtlTbodyCursor.me[this._id] = this;
    }
    public set(list: HTMLTableSectionElement): C_CtlTbodyCursor {
        this._id   = list.id;
        this._list = list;
        this._leng = this.__get_leng();
        this._rows = this.__get_rows();
        this._cols = this.__get_cols();
        this._indx = {x:0, y:0};;

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
        return this.__get_rows();
    }
    public cols(): number {
        return this._cols;
    }

    public pos(): T_xy {
        return this._indx;
    }
    public set_pos(indx: T_xy): C_CtlTbodyCursor {
        if (indx.x <  0) indx.y = 0;
        if (indx.x >= this._cols) indx.y = this._cols - 1;
        if (indx.y <  0) indx.y = 0;
        if (indx.y >= this._rows) indx.y = this._rows - 1;

        this._indx = indx; this.high_light_on();
        return this;
    }

    public pos_U(): T_xy {
        if (this._list === undefined) return {x: 0, y: 0};

        let   indx = this._indx;
        const rows = this._rows;
        const cur_row   = {x: indx.x, y:indx.y % rows};
        if (cur_row.y !== 0) {
            // 最上段(上端)以外
            --indx.y;
        } else {
            // 最上段(上端)
            indx.y += rows - 1;
            while (indx.y > this._rows - 1) {
                --indx.y;
            }
        } 
        this._indx = indx; this.high_light_on();
        return this._indx;
    }
    public pos_D(): T_xy {
        if (this._list === undefined) return {x: 0, y: 0};

        let   indx = this._indx;
        const rows = this._rows;
        const cur_row = {x: indx.x, y: indx.y % rows};
        if (cur_row.y !== rows - 1 && indx.y !== this._rows - 1) {
            // 最下段(下端)以外
            ++indx.y;
        } else {
            // 最下段(下端)
            indx.y -= rows - 1;
            while (indx.y % rows !== 0 && indx.y < this._rows - 1) {
                ++indx.y;
            }
        } 
        this._indx = indx; this.high_light_on();
        return this._indx;
    }
    public pos_L(): T_xy {
        if (this._list === undefined) return {x: 0, y: 0};

        let   indx = this._indx;
        const cols = this._cols;
        if (indx.x  > 0) {
            // 最前列(左端)以外
            indx.x--;
        } else {
            // 最前列(左端)
            indx.x += cols;
        } 
        this._indx = indx; this.high_light_on();
        return this._indx;
    }
    public pos_R(): T_xy {
        if (this._list === undefined) return {x: 0, y: 0};

        let   indx = this._indx;
        const cols = this._cols;
        if (indx.x  < cols - 1) { 
            // 最終列(右端)以外
            indx.x++;
        } else {
            // 最終列(右端)
            indx.x -= cols;
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
            return this._list.children.length; // Ordinary, Number of TR
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

        const td = this._list.children.item(this._indx.y)?.children.item(this._indx.x) as HTMLElement;
        this.__high_light_on(td, true);
    }
    public high_light_off(): void {
        if (this._list === undefined) return;

        for (let y = 0; y < this.__get_rows(); y++) {
            const tr = this._list.children.item(y) as HTMLElement;
            for (let x = 0; x < this.__get_cols(); x++) {
                const td = tr.children.item(x) as HTMLElement;
                this.__high_light_on(td, false);
            }
        }
    }
    protected __high_light_on(elm: HTMLElement | null, isOn: boolean): void {
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
                p.style.fontWeight      = 'bold';
                p.style.color           = bg_color;
                p.style.backgroundColor = fw_color;
//                p.style.display         = 'table-cell';
            } else {
                p.style.fontWeight      = 'normal';
                p.style.color           = fw_color;
                p.style.backgroundColor = bg_color;
//                p.style.display         = 'none';
            }
        }
    }
    public alert(): void {
        _alert(
              "CtlCursor: "
            + "\nid     = " + this._id
            + "\nindx.x = " + this._indx.x
            + "\nindx.y = " + this._indx.y
            + "\nleng   = " + this._leng
            + "\ncols   = " + this._cols
        )
    };
}












