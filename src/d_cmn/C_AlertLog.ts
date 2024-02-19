import { _get_uuid } from "../d_utl/F_Rand";
import { C_Dialog }  from "./C_Dialog";


export class C_AlertLog extends C_Dialog {
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

    protected msg: {[ttl: string]: string[]};

    protected pane: HTMLDivElement|undefined;
    protected logs: HTMLDivElement|undefined;
    protected btns: HTMLDivElement|undefined;
    protected upd:  HTMLButtonElement|undefined;
    protected clr:  HTMLButtonElement|undefined;
    protected cls:  HTMLButtonElement|undefined;

    protected constructor(target: HTMLDialogElement) {
        super(target);
        this.msg = {};

        this.__clearDialog();
        this.__makeDialog();
    }
    protected __clearDialog(): void {
        const ctx = super.getWindow();
        while (ctx.firstChild) ctx.removeChild(ctx.firstChild);
    }
    protected __makeDialog(): void {
        const ctx = super.getWindow();
        try {
            this.pane = this.__makeWindow ('pane');

            this.logs = this.__makePanel ('logs',   this.pane);
            this.btns = this.__makePanel ('btns',   this.pane);

            this.upd  = this.__makeButton('update', '更新',   this.btns);
            this.clr  = this.__makeButton('clear',  '消去',   this.btns);
            this.cls  = this.__makeButton('close',  '閉じる', this.btns);

            this.upd.addEventListener('click', ()=>{this.update()}, false);
            this.clr.addEventListener('click', ()=>{this.clear ()}, false);
            this.cls.addEventListener('click', ()=>{this.hide  ()}, false);

            this.logs.style.setProperty('user-select', 'text');
            this.logs.style.setProperty('max-width',   '90dvw');
            this.logs.style.setProperty('min-height',  '3.0rem');
            this.logs.style.setProperty('max-height',  '80dvh');
            this.logs.style.setProperty('overflow-x',  'auto');
            this.logs.style.setProperty('overflow-y',  'auto');
            this.setZoomElm(this.logs);
        } catch (err) {}
    }
    protected __makeWindow(id: string): HTMLDivElement {
        const div  = document.createElement('div') as HTMLDivElement;
        div.id     = `${this.id}_${id}`;
        this.setWindow(div);
        return div;
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
        this.__dom_clear();
        for (const title in this.msg) {
            for (let msg of this.msg[title]) {
                const fs = document.createElement('fieldset') as HTMLFieldSetElement;

                const lg = document.createElement('legend')   as HTMLLegendElement;
                lg.innerHTML = `${title} (${Date.now().toString()})`;
                fs.appendChild(lg);

                const pr = document.createElement('pre')      as HTMLPreElement;
                fs.appendChild(pr);
        
                const pg = document.createElement('p')    as HTMLParagraphElement;
                pg.innerHTML = msg;
                pr.appendChild(pg);

                this.logs?.appendChild(fs);
            }
        }
    }

    public clear(): void {this.clr_message()}
    protected __dom_clear(): void {
        while (this.logs?.firstChild) this.logs.removeChild(this.logs.firstChild);
    }

    public show(): void {
        this.update();
        try {super.show();} catch (err) {}
    }
    public hide(): void {
        try {super.hide();} catch (err) {}
    }
    public display(yn: boolean): void {
        yn?this.show():this.hide();
    }
}

