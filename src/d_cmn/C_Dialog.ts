import { _getNum } from "../d_utl/F_Math";
import { _get_uuid } from "../d_utl/F_Rand";
type xy = {x: number, y: number};

export class C_Dialog {
    protected id:  string;
    private   __dia: HTMLDialogElement;
    private   __pan: HTMLDivElement;
    private   __ctx: HTMLDivElement;
    private   __mop: xy = {x:0, y:0};
    private   __rsz: {[id: string]: resizeDom};

    public constructor(target?: HTMLDialogElement) {
        if (target === undefined) {
            target = document.createElement('dialog') as HTMLDialogElement;
            document.body.appendChild(target);
        }
        if (target.id === undefined || target.id === '') target.id = 'dialog_' + _get_uuid();
        this.id = target.id;

        target.style.margin  = '0';
        target.style.padding = '0';
        this.__dia = target;

        this.__pan = document.createElement('div') as HTMLDivElement;
        this.__set_dialog_style();


        this.__ctx = document.createElement('div') as HTMLDivElement;
        this.__ctx.style.gridArea = 'mm';
        this.__pan.appendChild(this.__ctx);

        this.__rsz = {};

        this.__set_bar_style('tm');
        this.__set_bar_style('ml');
        this.__set_bar_style('mr');
        this.__set_bar_style('bm');

        this.__set_corner_style('tl');
        this.__set_corner_style('tr');
        this.__set_corner_style('bl');
        this.__set_corner_style('br');


        this.__dia.appendChild(this.__pan);
    } 
    private __set_dialog_style(): void {
        this.__dia.style.border       = 'none';
        this.__dia.style.borderRadius = '10px';
        this.__dia.style.userSelect   = 'auto';
        this.__dia.style.margin       = '0';
        this.__dia.style.padding      = '0';

        this.__pan.style.display      = 'grid';
        this.__pan.style.gridTemplateColumns = `
            [tl-start ml-start bl-start]
            20px
            [tl-end ml-end bl-end tm-start mm-start bm-start]
            1fr
            [tm-end mm-end bm-end tr-start mr-start br-start]
            20px
            [tr-end mr-end br-end]
        `;
        this.__pan.style.gridTemplateRows = `
            [tl-start tm-start tr-start]
            20px
            [tl-end tm-end tr-end ml-start mm-start mr-start]
            1fr
            [ml-end mm-end mr-end bl-start bm-start br-start]
            20px
            [bl-end bm-end br-end]
        `;

//        this.__pan.style.gridTemplateAreas = '"tl tm tr" "ml mm mr" "bl bm br"';
    }
    private __set_bar_style(area: string): HTMLElement {
        const elm = document.createElement('div') as HTMLDivElement;
        elm.style.backgroundColor = 'lightcyan';
        elm.style.userSelect      = 'none';
        elm.style.gridArea = area;
        this.__set_move_dialog(elm);
        this.__pan.appendChild(elm);
        return elm;
    }
    private __set_corner_style(area: string): HTMLElement {
        const elm = document.createElement('div') as HTMLDivElement;
        elm.style.backgroundColor = 'cyan';
        elm.style.userSelect      = 'none';
        elm.style.gridArea = area;

        if (elm.id === undefined || elm.id === '') elm.id = area;
        this.__rsz[elm.id] = new resizeDom(elm, this.__dia);

        this.__set_zoom_dialog(elm);
        this.__pan.appendChild(elm);
        return elm;
    }
    private __set_zoom_dialog(elm: HTMLElement): void {
        elm.setAttribute('draggable', 'true');
        elm.addEventListener('dragstart', (ev:DragEvent)=>{ 
            this.__mop = {x:0, y:0};
            this.__mop.x = ev.pageX;
            this.__mop.y = ev.pageY;
            if (elm.id in this.__rsz) this.__rsz[elm.id].reset();
        });
        elm.addEventListener('drag', (ev:DragEvent)=>{
            if (ev.pageX === this.__mop.x && ev.pageY === this.__mop.y) return;

            const resizeX  = ev.pageX - this.__mop.x;
            const resizeY  = ev.pageY - this.__mop.y;
            if (elm.id in this.__rsz) this.__rsz[elm.id].resize(resizeX, resizeY);
        });
        elm.addEventListener('dragend', (ev:DragEvent)=>{ 
            const resizeX  = ev.pageX - this.__mop.x;
            const resizeY  = ev.pageY - this.__mop.y;
            if (elm.id in this.__rsz) this.__rsz[elm.id].resize(resizeX, resizeY);
        });
    }
    private __set_move_dialog(elm: HTMLElement): void { 
        elm.setAttribute('draggable', 'true');
        elm.addEventListener('dragstart', (ev:DragEvent)=>{ 
            this.__mop = {x:0, y:0};
            this.__mop.y = this.__dia.offsetTop  - ev.pageY;
            this.__mop.x = this.__dia.offsetLeft - ev.pageX;
//            ev.dataTransfer?.setDragImage(document.createElement('div'), 0, 0);
        });
        elm.addEventListener('drag', (ev:DragEvent)=>{
            if (ev.x === 0 && ev.y === 0) return;
            const top  = ev.pageY + this.__mop.y;
            const left = ev.pageX + this.__mop.x;
//            const right = window.outerWidth - ev.pageX;
            this.__dia.style.top   = top   + 'px';
            this.__dia.style.left  = left  + 'px';
//            this.__dia.style.right = right + 'px';
        });
        elm.addEventListener('dragend', (ev:DragEvent)=>{ 
            this.__mop = {x:0, y:0};
        });
    }
    protected getWindow(): HTMLDivElement {
        return this.__ctx;
    }
    protected setWindow(ctx: HTMLDivElement): HTMLDivElement {
        try {
            this.__pan.removeChild(this.__ctx);
            this.__pan.appendChild(ctx);
            return this.__ctx = ctx;
        } catch (err) {}
        return ctx;
    }

    public setZoomElm(elm: HTMLElement): void {
        for (const ii in this.__rsz) this.__rsz[ii].setZoomElm(elm);
    }
    public clrZoom(): void {
        for (const ii in this.__rsz) this.__rsz[ii].clrZoomElm();
    }
    
    public show(): void { 
        try {this.__dia.show()} catch (err) {}
    }
    public hide(): void { 
        try {this.__dia.close()} catch (err) {}
    }
    public display(yn: boolean): void { 
        yn?this.show():this.hide();
    }
}

class resizeDom {
    private __dia:  HTMLElement;
    private __cnr:  HTMLElement;
    private __trg:  HTMLElement|undefined;
    private __can: {x: boolean, y: boolean};
    private __top:  xy;
    private __siz:  xy;
    public constructor(cnr: HTMLElement, dia: HTMLElement) {
        this.__dia = dia; this.__cnr = cnr;
        this.__can = {x:false, y: false};
        this.__top = {x:0, y:0};
        this.__siz = {x:0, y:0};
    }
    public setZoomElm(trg: HTMLElement): void {
        this.__trg   = trg;
    }
    public clrZoomElm(): void {
        this.__trg   = undefined;
    }
    public reset(): void {
        // Zoom対象が設定されていなければ何もしない
        if (this.__trg === undefined) return;

        try {
            // Dialogの左半分に対象コーナーが有ればサイズ変更の際に左辺を動かすのでそのフラグ設定(x)
            // Dialogの上半分に対象コーナーが有ればサイズ変更の際に上辺を動かすのでそのフラグ設定(y)
            const parent  =  this.__cnr.offsetParent as HTMLElement;
            this.__can.x  =  this.__cnr.offsetLeft < (parent?.offsetWidth  / 2);
            this.__can.y  =  this.__cnr.offsetTop  < (parent?.offsetHeight / 2);
        } catch (err) {
            this.__can.x  =  this.__can.y  = false;
        }
        // Dialogの左上の座標を保存
        this.__top.x = this.__dia.offsetLeft; 
        this.__top.y = this.__dia.offsetTop; 

        // Zoom対象とする要素の幅と高さを保存
        this.__siz.x = this.__trg.offsetWidth; 
        this.__siz.y = this.__trg.offsetHeight; 
    }
    public resize(resizeX: number, resizeY: number): void {
        // Zoom対象が設定されていなければ何もしない
        if (this.__trg === undefined) return;

        // Dialogの左半分に対象コーナーが有れば左辺を動かす
        // 左辺を伸ばすのでリサイズ量は反転させる
        if (this.__can.x) {
            resizeX = -resizeX;
            this.__dia.style.left  = this.__top.x - resizeX  + 'px';
        }
        // Dialogの上半分に対象コーナーが有れば上辺を動かす
        // 上辺を伸ばすのでリサイズ量は反転させる
        if (this.__can.y) {
            resizeY = -resizeY;
            this.__dia.style.top   = this.__top.y - resizeY   + 'px';
        }
        // Zoom対象をサイズ変更する
        this.__trg.style.width  = this.__siz.x + resizeX + 'px';
        this.__trg.style.height = this.__siz.y + resizeY + 'px';
    }
}
