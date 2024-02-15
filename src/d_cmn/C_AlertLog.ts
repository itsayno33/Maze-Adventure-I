import { _get_uuid } from "../d_utl/F_Rand";

export class C_AlertLog {
    protected static me: {[id: string]: C_AlertLog};
    public    static getObj(target?: HTMLDialogElement) {
        this.me ??= {};
        if (target === undefined) {
            target    = document.createElement('dialog') as HTMLDialogElement;
            target.id = 'dialog_' + _get_uuid();
            document.body.appendChild(target);
        }

        return this.me[target.id] ??= new C_AlertLog(target);
    }

    protected id:  string;
    protected msg: {[ttl: string]: string[]};

    protected dia:  HTMLDialogElement;
    protected pane: HTMLDivElement|undefined;
    protected logs: HTMLDivElement|undefined;
    protected btns: HTMLDivElement|undefined;
    protected upd:  HTMLButtonElement|undefined;
    protected clr:  HTMLButtonElement|undefined;
    protected cls:  HTMLButtonElement|undefined;

    protected mousep: {x: number, y: number} = {x:0, y:0}

    protected constructor(target: HTMLDialogElement) {
        this.id  = target.id;
        this.dia = target;
        this.msg = {};

        this.__clearDialog();
        this.__makeDialog();

        this.dia.setAttribute('draggable', 'true');
        this.dia.addEventListener('dragstart', (ev:DragEvent)=>{ 
            this.mousep = {x:0, y:0};
            this.mousep.y = this.dia.offsetTop  - ev.pageY;
            this.mousep.x = this.dia.offsetLeft - ev.pageX;
            ev.dataTransfer?.setDragImage(document.createElement('div'), 0, 0);
        });
        this.dia.addEventListener('drag', (ev:DragEvent)=>{
            if (ev.x === 0 && ev.y === 0) return;
            const top  = ev.pageY + this.mousep.y;
            const left = ev.pageX + this.mousep.x;
            const right = window.outerWidth - ev.pageX;
            this.dia.style.top   = top   + 'px';
            this.dia.style.left  = left  + 'px';
            this.dia.style.right = right + 'px';
        });
        this.dia.addEventListener('dragend', (ev:DragEvent)=>{ 
            this.mousep = {x:0, y:0};
        });
    }
    protected __clearDialog(): void {
        while (this.dia.firstChild) this.dia.removeChild(this.dia.firstChild);
    }
    protected __makeDialog(): void {
        try {
            this.pane = this.__makePanel ('pane',   this.dia);
            this.logs = this.__makePanel ('logs',   this.pane);
            this.btns = this.__makePanel ('btns',   this.pane);

            this.upd  = this.__makeButton('update', '更新',   this.btns);
            this.clr  = this.__makeButton('clear',  '消去',   this.btns);
            this.cls  = this.__makeButton('close',  '閉じる', this.btns);

            this.upd.addEventListener('click', ()=>{this.update()}, false);
            this.clr.addEventListener('click', ()=>{this.clear ()}, false);
            this.cls.addEventListener('click', ()=>{this.hide  ()}, false);


            this.dia.style.setProperty('border', 'none');
            this.dia.style.setProperty('border-radius', '10px');
            this.dia.style.setProperty('border', 'none');
            this.dia.style.setProperty('padding', '20px');

            this.logs.style.setProperty('min-height', '3.0rem');
            this.logs.style.setProperty('max-height', '80dvh');
            this.logs.style.setProperty('overflow-y', 'scroll');
        } catch (err) {}
    }
    protected __makePanel(id: string, parent: HTMLElement): HTMLDivElement {
        const div  = document.createElement('div') as HTMLDivElement;
        div.id     = `${this.id}_${id}`;
        parent.appendChild(div);
        return div;
    }
    protected __makeButton(id: string, name: string, parent: HTMLElement): HTMLButtonElement {
        const btn  = document.createElement('button') as HTMLButtonElement;
        btn.id         = `${this.id}_${id}`;
        btn.innerHTML  = name;
        parent.appendChild(btn);
        return btn;
    }

    public set_message(ttl: string, msg: string): void {
        (this.msg[ttl] ??= []).push(msg);
        this.__dom_update();
    }

    public clr_message(ttl?: string): void {
        if (ttl !== undefined) {this.msg[ttl] = [];return;}
        for (const ii in this.msg) this.msg[ii] = [];
        this.__dom_clear();
        return;
    }

    public update(): void {this.__dom_update()}
    protected __dom_update(): void {
        for (const title in this.msg) {
            if (this.msg[title] === undefined) continue;
            if (this.msg[title].length < 1)    continue;

            const fs = document.createElement('fieldset') as HTMLFieldSetElement;

            const lg = document.createElement('legend')   as HTMLLegendElement;
            lg.innerHTML = title;
            fs.appendChild(lg);

            const pr = document.createElement('pre')      as HTMLPreElement;
            fs.appendChild(pr);
            for (let msg of this.msg[title]) {
                const pg = document.createElement('p')    as HTMLParagraphElement;
                pg.innerHTML = msg;
                pr.appendChild(pg);
            }
            this.logs?.appendChild(fs);
        }
    }

    public clear(): void {this.clr_message()}
    protected __dom_clear(): void {
        while (this.logs?.firstChild) this.logs.removeChild(this.logs.firstChild);
    }

    public show(): void {
        this.update();
        try {this.dia.show();} catch (err) {}
    }
    public hide(): void {
        try {this.dia.close();} catch (err) {}
    }
    public display(yn: boolean): void {
        yn?this.show():this.hide();
    }
}
