import { _getNum } from "../d_utl/F_Math";
import { _get_uuid } from "../d_utl/F_Rand";

type xy = {x: number, y: number};

class resizeDom {
    private __elem: HTMLElement;
    private __size: xy;
    public constructor(elem?: HTMLElement) {
        this.__elem = document.body;
        this.__size = {x:0, y:0};
        if (elem !== undefined) this.set(elem);
    }
    public set(elem: HTMLElement) {
        this.__elem = elem;
        this.__size.x = this.__elem.offsetWidth;  
        this.__size.y = this.__elem.offsetHeight; 
    }
    public reset() {
        this.__size.x = this.__elem.offsetWidth; 
        this.__size.y = this.__elem.offsetHeight; 
    }
    public resize(x: number, y: number): void {
        this.__elem.style.width  = this.__size.x + x + 'px';
        this.__elem.style.height = this.__size.y + y + 'px';
    }
}
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

        this.__rsz = {}; this.appendZoom(this.__ctx);

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
        this.__set_zoom_dialog(elm);
        this.__pan.appendChild(elm);
        return elm;
    }
    private __set_zoom_dialog(elm: HTMLElement): void {
        elm.setAttribute('draggable', 'true');
        elm.addEventListener('dragstart', (ev:DragEvent)=>{ 
            this.__mop = {x:0, y:0};
            this.__mop.y = ev.pageY;
            this.__mop.x = ev.pageX;
            for (const ii in this.__rsz) this.__rsz[ii].reset();
        });
        elm.addEventListener('drag', (ev:DragEvent)=>{
            if (ev.pageX === this.__mop.x && ev.pageY === this.__mop.y) return;
            const sizeX  = ev.pageX - this.__mop.x;
            const sizeY  = ev.pageY - this.__mop.y;
            for (const ii in this.__rsz) this.__rsz[ii].resize(sizeX, sizeY);
        });
        elm.addEventListener('dragend', (ev:DragEvent)=>{ 
            this.__mop = {x:0, y:0};
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
            const right = window.outerWidth - ev.pageX;
            this.__dia.style.top   = top   + 'px';
            this.__dia.style.left  = left  + 'px';
            this.__dia.style.right = right + 'px';
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
            this.removeZoom(this.__ctx);

            this.__pan.appendChild(ctx);
            this.appendZoom(ctx);
            return this.__ctx = ctx;
        } catch (err) {}
        return ctx;
    }

    public appendZoom(elm: HTMLElement): void {
        if (elm.id === undefined || elm.id === '') elm.id = 'dialog_elm_' + _get_uuid();
        this.__rsz[elm.id] = new resizeDom(elm);
    }
    public removeZoom(elm: HTMLElement): void {
        if (elm.id === undefined || elm.id === '') return;
        if (elm.id in this.__rsz) delete this.__rsz[elm.id];
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