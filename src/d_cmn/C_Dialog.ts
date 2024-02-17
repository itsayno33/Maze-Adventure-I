import { _getNum } from "../d_utl/F_Math";
import { _get_uuid } from "../d_utl/F_Rand";

type xy = {x: number, y: number};

export class C_Dialog {
    protected id:  string;
    private   __dia: HTMLDialogElement;
    private   __pan: HTMLDivElement;
    private   __ctx: HTMLDivElement;
    private   __mop: xy = {x:0, y:0};
    private   __siz: xy = {x:0, y:0};

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
        this.__pan.style.border       = 'none';
        this.__pan.style.borderRadius = '10px';
        this.__pan.style.userSelect   = 'auto';
        this.__pan.style.margin       = '0';
        this.__pan.style.padding      = '0';

        this.__pan.style.display      = 'grid';
        this.__pan.style.gridTemplateAreas = '"tl tm tr" "ml mm mr" "bl bm br"';
    }
    private __set_bar_style(area: string): HTMLElement {
        const elm = document.createElement('div') as HTMLDivElement;
        elm.innerHTML = "　";
        elm.style.backgroundColor = 'lightcyan';
        elm.style.userSelect      = 'none';
        elm.style.gridArea = area;
        this.__set_move_dialog(elm);
        this.__pan.appendChild(elm);
        return elm;
    }
    private __set_corner_style(area: string): HTMLElement {
        const elm = document.createElement('div') as HTMLDivElement;
        elm.innerHTML = "　";
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
            this.__siz = {x:0, y:0};
            this.__mop.y = ev.pageY;
            this.__mop.x = ev.pageX;
            this.__siz.y = this.__ctx.offsetHeight;
            this.__siz.x = this.__ctx.offsetWidth;
        });
        elm.addEventListener('drag', (ev:DragEvent)=>{
            if (ev.x === 0 && ev.y === 0) return;
            const ctx_sizeY  = this.__siz.y + ev.pageY - this.__mop.y;
            const ctx_sizeX  = this.__siz.x + ev.pageX - this.__mop.x;

            this.__ctx.style.height = ctx_sizeY + 'px';
            this.__ctx.style.width  = ctx_sizeX + 'px';
        });
        elm.addEventListener('dragend', (ev:DragEvent)=>{ 
            this.__mop = {x:0, y:0};
            this.__siz = {x:0, y:0};
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
    protected getWindow(): HTMLElement {
        return this.__ctx;
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