import { _ceil, _floor, _isNum } from "./F_Math";

export class C_CtlCursor {
    protected static me: {[id: string]: C_CtlCursor};

    protected id:   string;
    protected list: HTMLElement;
    protected leng: number;
    protected cols: number;
    protected indx: number;

    protected constructor(list: HTMLElement) {
        C_CtlCursor.me ??= {}

        this.id = list.id;
        C_CtlCursor.me[this.id] = this;

        this.list = list;
        this.leng = this.__get_leng();
        this.cols = this.__get_cols();
        this.indx = 0;
    }
    public static get(list: HTMLElement): C_CtlCursor  {
        this.me ??= {}

        const id = list.id;
        this.me[id] ??= new C_CtlCursor(list);
        return this.me[id];
    }

    public set_cursor(indx: number): number {
        this.indx = indx; this.high_light_on();
        return this.indx;
    }

    public pos_U(): number {
        let   indx = this.indx;
        const rows = this.__get_rows();
        const cur_row   = indx % rows;
        if (cur_row !== 0) {
            // 最上段(上端)以外
            --indx;
        } else {
            // 最上段(上端)
            indx += rows - 1;
            while (indx > this.leng - 1) {
                --indx;
            }
        } 
        this.indx = indx; this.high_light_on();
        return this.indx;
    }
    public pos_D(): number {
        let   indx = this.indx;
        const rows = this.__get_rows();
        const cur_row = indx % rows;
        if (cur_row !== rows - 1 && indx !== this.leng - 1) {
            // 最下段(下端)以外
            ++indx;
        } else {
            // 最下段(下端)
            indx -= rows - 1;
            while (indx % rows !== 0 && indx < this.leng - 1) {
                ++indx;
            }
        } 
        this.indx = indx; this.high_light_on();
        return this.indx;
    }
    public pos_L(): number {
        let   indx = this.indx;
        const rows = this.__get_rows();
        if (indx  > rows - 1) {
            // 最前列(左端)以外
            indx -= rows;
        } else {
            // 最前列(左端)
            const   vurtual_list_leng = this.cols * rows;
            indx += vurtual_list_leng - rows;
            while (indx > this.leng - 1) {
                indx -= rows;
                if (indx < 0) {indx = 0; break;}
            }
        } 
        this.indx = indx; this.high_light_on();
        return this.indx;
    }
    public pos_R(): number {
        let   indx = this.indx;
        const rows = this.__get_rows();
        if (indx  < this.leng - rows) { 
            // 最終列(右端)以外
            indx += rows;
        } else {
            // 最終列(右端)
            const   old_indx = indx;
            const   vurtual_list_leng = this.cols * rows;
            indx -= vurtual_list_leng - rows;
            if (indx < 0) {
                indx += rows;
                if (indx < 0 || indx > this.leng - 1) indx = _floor((old_indx + 1) / this.cols, 0);
            }
        } 
        this.indx = indx; this.high_light_on();
        return this.indx;
    }
    
    protected __get_rows(): number {
        return _ceil(this.leng / this.cols, 0);
    }
    // DOMリスト一覧の行数の取得
    protected __get_leng(): number {
        try {
            return this.list.children.length; 
        } catch(err) {
            return 1;
        }
    }
    // DOMリスト一覧の列数(CSSから取得)の取得
    protected  __get_cols(): number {
        try {
            let cols   = window.getComputedStyle(this.list).columnCount;
            return _isNum(cols) ? Number(cols) : 1; 
        } catch(err) {
            return 1;
        }
    }

    // メニューのデフォルト操作(ハイライトと詳細表示制御)
    public high_light_on(): void {
        const children = this.list.children;
        const len      = children.length;
        if (this.indx < 0 || this.indx > len - 1) return;

        for (let i = 0; i < len; i++) {
            const li = children.item(i) as HTMLElement;
            this.__high_light_on(li, false);
        }
        const li = children.item(this.indx) as HTMLElement;
        this.__high_light_on(li, true);
    }
    public high_light_off(): void {
        const children = this.list.children;
        const len      = children.length;
        for (var i = 0; i < len; i++) {
            const li = children.item(i) as HTMLElement;
            this.__high_light_on(li, false);
        }
    }
    protected __high_light_on(elm: HTMLElement | null, isOn: boolean): void {
        if (elm === null) return;
        const perentStyle = window.getComputedStyle(elm.parentElement ?? elm);
        const fw_color = perentStyle.color           ?? 'black';
        const bg_color = perentStyle.backgroundColor ?? 'white';

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
}












