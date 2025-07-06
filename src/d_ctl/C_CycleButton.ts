import { _get_uuid } from "../d_utl/F_Rand";

type  T_CycleOption = {
    seq?:      number,
    ccName?:   string[],
    ccClass?:  string[],
    fnc?:      _T_Fnc,
}

type  _T_CycleOption = {
    ccName:    string[],
    ccClass:   string[],
    fnc?:      _T_Fnc,
}

type _T_Fnc = (seq: number)=>(void|boolean);

export class C_CycleButton {
    protected static me: {[id: string]: C_CycleButton};

    public    static getObj(elm: HTMLButtonElement, cco?: T_CycleOption): C_CycleButton {
        this.me ??= {};
        this.me[elm.id] ??= new C_CycleButton(elm, cco);
        return this.me[elm.id];
    }

    protected seq: number = 0;
    protected elm: HTMLButtonElement;
    protected cco: _T_CycleOption;
    protected def_cco: _T_CycleOption = {
        ccName:   ['one','two','three'],
        ccClass:  ['_cycle_one','_cycle_two','_cycle_three'],
    };
    protected fnc: {[id: string]: _T_Fnc};

    protected constructor(elm: HTMLButtonElement, cco?: T_CycleOption) {
        this.fnc = {};
        this.cco = this.def_cco;
        this.seq = 0;

        if (elm.name === undefined || elm.name === null || elm.name === '') elm.name = elm.id;
        this.elm = elm;
        this.elm.addEventListener("click", (event:MouseEvent)=>{this.cycle();}, false);

        if (cco !== undefined) this.setObj(cco); 
    }
    public setObj(cco: T_CycleOption): C_CycleButton {
        try {
            this.seq = cco.seq ?? 0;

            this.cco = {...cco} as _T_CycleOption;

            if (cco.ccName !== undefined)  this.cco.ccName  = [...cco.ccName];
            else                           this.cco.ccName  = [...this.def_cco.ccName];

            if (cco.ccClass !== undefined) this.cco.ccClass = [...cco.ccClass];
            else                           this.cco.ccClass = [...this.def_cco.ccClass];

            this._setStyle(this.seq);
        } catch {}
        return this;
    }
    protected _setStyle(seq: number): void {
        const old_seq = this.seq;
        this.seq  = seq;
        const cco = this.cco;
        this.elm.value     = cco.ccName[seq];
        this.elm.innerHTML = cco.ccName[seq];
        this.elm.classList.remove(cco.ccClass[old_seq]);
        this.elm.classList.add   (cco.ccClass[this.seq]);
    }
    public cycle(): boolean|void {
        this.seq++;
        if (this.seq >= this.cco.ccName.length) this.seq = 0;
        if (this.seq <  0                     ) this.seq = this.cco.ccName.length - 1;
        this._setStyle(this.seq);

        let rslt:boolean|void = true; 
        for (const i in this.fnc) rslt &&= this.fnc[i](this.seq); 
        return rslt;
    }

    public id():      string  {return this.elm.id};
    public at():      number  {return this.seq;}

    public addFnc(fnc: _T_Fnc): string {
        const id = 'ccfunc_' + _get_uuid();
        this.fnc[id] = fnc;
        return id;
    }
    public rmvFnc(fnc: _T_Fnc|string): boolean {
        if (typeof fnc === 'string') {
            try{
                delete this.fnc[fnc]; 
                return true;
            }catch(err){return false}
        }
        for (const i in this.fnc) if (fnc === this.fnc[i]) {delete this.fnc[i]; return true}
        return false;
    }
}
