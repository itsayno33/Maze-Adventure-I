import { _get_uuid } from "../d_utl/F_Rand";

export class C_Dialog {
    protected dia: HTMLDialogElement;
    protected pan: HTMLDivElement;
    protected ctx: HTMLDivElement;
    protected id:  string;
    protected mousep: {x: number, y: number} = {x:0, y:0}

    public constructor(target?: HTMLDialogElement) {
        if (target === undefined) {
            target = document.createElement('dialog') as HTMLDialogElement;
            document.body.appendChild(target);
        }
        if (target.id === undefined || target.id === '') target.id = 'dialog_' + _get_uuid();
        this.id = target.id;

        target.style.margin  = '0';
        target.style.padding = '0';
        this.dia = target;

        this.pan = document.createElement('div') as HTMLDivElement;
        this.__set_dialog_style();


        this.ctx = document.createElement('div') as HTMLDivElement;
        this.ctx.style.gridArea = 'mm';
        this.pan.appendChild(this.ctx);


        this.__set_bar_style('tm');
        this.__set_bar_style('ml');
        this.__set_bar_style('mr');
        this.__set_bar_style('bm');

        this.__set_corner_style('tl');
        this.__set_corner_style('tr');
        this.__set_corner_style('bl');
        this.__set_corner_style('br');


        this.dia.appendChild(this.pan);
    } 
    protected __set_dialog_style(): void {
        this.pan.style.border       = 'none';
        this.pan.style.borderRadius = '10px';
        this.pan.style.userSelect   = 'auto';
        this.pan.style.margin       = '0';
        this.pan.style.padding      = '0';

        this.pan.style.display      = 'grid';
        this.pan.style.gridTemplateAreas = '"tl tm tr" "ml mm mr" "bl bm br"';
    }
    protected __set_bar_style(area: string): HTMLElement {
        const elm = document.createElement('div') as HTMLDivElement;
        elm.innerHTML = "　";
        elm.style.backgroundColor = 'lightcyan';
        elm.style.userSelect      = 'none';
        elm.style.gridArea = area;
        this.__set_move_dialog(elm);
        this.pan.appendChild(elm);
        return elm;
    }
    protected __set_corner_style(area: string): HTMLElement {
        const elm = document.createElement('div') as HTMLDivElement;
        elm.innerHTML = "　";
        elm.style.backgroundColor = 'cyan';
        elm.style.userSelect      = 'none';
        elm.style.gridArea = area;
        this.__set_move_dialog(elm);
        this.pan.appendChild(elm);
        return elm;
    }
    protected __set_move_dialog(elm: HTMLElement): void { 
        elm.setAttribute('draggable', 'true');
        elm.addEventListener('dragstart', (ev:DragEvent)=>{ 
            this.mousep = {x:0, y:0};
            this.mousep.y = this.dia.offsetTop  - ev.pageY;
            this.mousep.x = this.dia.offsetLeft - ev.pageX;
            ev.dataTransfer?.setDragImage(document.createElement('div'), 0, 0);
        });
        elm.addEventListener('drag', (ev:DragEvent)=>{
            if (ev.x === 0 && ev.y === 0) return;
            const top  = ev.pageY + this.mousep.y;
            const left = ev.pageX + this.mousep.x;
            const right = window.outerWidth - ev.pageX;
            this.dia.style.top   = top   + 'px';
            this.dia.style.left  = left  + 'px';
            this.dia.style.right = right + 'px';
        });
        elm.addEventListener('dragend', (ev:DragEvent)=>{ 
            this.mousep = {x:0, y:0};
        });
    }
    
    public show(): void { 
        try {this.dia.show()} catch (err) {}
    }
    public hide(): void { 
        try {this.dia.close()} catch (err) {}
    }
    public display(yn: boolean): void { 
        yn?this.show():this.hide();
    }
}