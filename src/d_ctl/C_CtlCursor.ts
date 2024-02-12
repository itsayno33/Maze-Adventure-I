import { _ceil, _floor, _isNum } from "../d_utl/F_Math";
import { _alert }                from "../d_cmn/global";

export class C_CtlCursor {
    protected static me: {[id: string]: C_CtlCursor};

    protected _id:   string;
    protected _list: HTMLElement|undefined;
    protected _leng: number;
    protected _cols: number;
    protected _indx: number;

    protected constructor(list?: HTMLElement) {
        C_CtlCursor.me ??= {}

        this._id   = '__dmy__';
        this._list = undefined;
        this._leng = 0;
        this._cols = 1;
        this._indx = 0;
        C_CtlCursor.me[this._id] = this;
    }
    public static getObj(list?: HTMLElement): C_CtlCursor  {
        this.me ??= {}

        const id = list !== undefined ? list.id : '__dmy__';
        this.me[id] ??= new C_CtlCursor(list);

        if (list !== undefined) this.me[id].set(list);
        return this.me[id];
    }
    public set(list: HTMLElement): C_CtlCursor {
        this._id   = list.id;
        this._list = list;
        this._leng = this.__get_leng();
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
        return this.__get_rows();
    }
    public cols(): number {
        return this._cols;
    }

    public pos(): number {
        return this._indx;
    }
    public set_pos(indx: number): C_CtlCursor {
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
    public pos_L(): number {
        if (this._list === undefined) return 0;

        let   indx = this._indx;
        const rows = this.__get_rows();
        if (indx  > rows - 1) {
            // 最前列(左端)以外
            indx -= rows;
        } else {
            // 最前列(左端)
            const   vurtual_list_leng = this._cols * rows;
            indx += vurtual_list_leng - rows;
            while (indx > this._leng - 1) {
                indx -= rows;
                if (indx < 0) {indx = 0; break;}
            }
        } 
        this._indx = indx; this.high_light_on();
        return this._indx;
    }
    public pos_R(): number {
        if (this._list === undefined) return 0;

        let   indx = this._indx;
        const rows = this.__get_rows();
        if (indx  < this._leng - rows) { 
            // 最終列(右端)以外
            indx += rows;
        } else {
            // 最終列(右端)
            const   old_indx = indx;
            const   vurtual_list_leng = this._cols * rows;
            indx -= vurtual_list_leng - rows;
            if (indx < 0) {
                indx += rows;
                if (indx < 0 || indx > this._leng - 1) indx = _floor((old_indx + 1) / this._cols, 0);
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
            let cols = window.getComputedStyle(this._list).columnCount;
            return _isNum(cols) ? Number(cols) : 1; 
        } catch(err) {
            return 1;
        }
    }

    // メニューのデフォルト操作(ハイライトと詳細表示制御)
    public high_light_on(): void {
        if (this._list === undefined) return;

        const children = this._list.children;
        const len      = children.length;
        if (this._indx < 0 || this._indx > len - 1) return;

        for (let i = 0; i < len; i++) {
            const li = children.item(i) as HTMLElement;
            this.__high_light_on(li, false);
        }
        const li = children.item(this._indx) as HTMLElement;
        this.__high_light_on(li, true);
    }
    public high_light_off(): void {
        if (this._list === undefined) return;

        const children = this._list.children;
        const len      = children.length;
        for (var i = 0; i < len; i++) {
            const li = children.item(i) as HTMLElement;
            this.__high_light_on(li, false);
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












