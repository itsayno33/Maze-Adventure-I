import { _get_uuid } from "../d_utl/F_Rand";

type  T_OnOffOption = {
    yn?:       boolean,
    onName?:   string,
    offName?:  string,
    onClass?:  string,
    offClass?: string,
    fnc?:      _T_Fnc,
}

type  _T_OnOffOption = {
    onName:    string,
    offName:   string,
    onClass:   string,
    offClass:  string,
    fnc?:      _T_Fnc,
}

type _T_Fnc = (yn: boolean)=>(void|boolean);

export class C_OnOffButton {
    protected static me: {[id: string]: C_OnOffButton};

    public    static getObj(elm: HTMLButtonElement, ooo?: T_OnOffOption): C_OnOffButton {
        this.me ??= {};
        this.me[elm.id] ??= new C_OnOffButton(elm, ooo);
        return this.me[elm.id];
    }

    protected yn:  boolean;
    protected elm: HTMLButtonElement;
    protected ooo: _T_OnOffOption;
    protected def_ooo: _T_OnOffOption = {
        onName:   'ON',
        offName:  'off',
        onClass:  '_toggle_on',
        offClass: '_toggle_off',
    };
    protected fnc: {[id: string]: _T_Fnc};

    protected constructor(elm: HTMLButtonElement, ooo?: T_OnOffOption) {
        this.fnc = {};
        this.ooo = this.def_ooo;
        this.yn  = false;

        if (elm.name === undefined || elm.name === '') elm.name = elm.id;
        this.elm = elm;
        this.elm.addEventListener("click", (event:MouseEvent)=>{this.toggle();}, false);

        if (ooo !== undefined) this.setObj(ooo); 
    }
    public setObj(ooo: T_OnOffOption): C_OnOffButton {
        try {
            this.yn  = ooo.yn ?? false;

            this.ooo = ooo as _T_OnOffOption; 
            this.ooo.onName   ??= this.def_ooo.onName; 
            this.ooo.offName  ??= this.def_ooo.offName; 
            this.ooo.onClass  ??= this.def_ooo.onClass; 
            this.ooo.offClass ??= this.def_ooo.offClass; 
            this._setStyle(this.yn);
        } catch {}
        return this;
    }
    protected _setStyle(yn: boolean): void {
        this.yn   = yn;
        const ooo = this.ooo;
        this.elm.value = yn?'on':'off';
        this.elm.innerHTML = yn ? ooo.onName : ooo.offName;
        this.elm.classList.remove(yn? ooo.offClass : ooo.onClass);
        this.elm.classList.add   (yn? ooo.onClass  : ooo.offClass);
    }

    public setON():   boolean {return this._setYN(true) ?? false};
    public setOFF():  boolean {return this._setYN(false) ?? false};
    public toggle():  boolean {return this._setYN(!this.yn) ?? false}

    protected _setYN(yn: boolean): boolean|void {
        this._setStyle(yn);

        let tf:boolean|void  = true; 
        for (const i in this.fnc) tf &&= this.fnc[i](yn); 
        return tf;
    }

    public id():      string  {return this.elm.id};
    public isON():    boolean {return this.yn;}

    public addFnc(fnc: _T_Fnc): string {
        const id = 'oofunc_' + _get_uuid();
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
