import { _get_uuid } from "../d_utl/F_Rand";

type  T_OnOffOption = {
    yn:       boolean,
    onName:   string,
    offName:  string,
    onClass:  string,
    offClass: string,
}

export class C_OnOffButton {
    protected static me: C_OnOffButton;

    public    static getObj(elm: HTMLButtonElement, ooo?: T_OnOffOption): C_OnOffButton {
        this.me ??= new C_OnOffButton(elm, ooo);
        return this.me;
    }

    protected elm: HTMLButtonElement;
    protected ooo: T_OnOffOption = {
        yn:        false,
        onName:   'On',
        offName:  'Off',
        onClass:  'on',
        offClass: 'off',
    };

    protected constructor(elm: HTMLButtonElement, ooo?: T_OnOffOption ) {
        this.ooo = ooo ?? this.ooo;
        this.elm = this._setObj(elm);
    }
    protected _setObj(elm: HTMLButtonElement): HTMLButtonElement {
        if (elm.id   === undefined || elm.id   === '') elm.id   = 'oob_' + _get_uuid();
        if (elm.name === undefined || elm.name === '') elm.name = elm.id;
        this.elm = elm;
        this._setAttrs();
        return this.elm;
    }
    protected _setAttrs(): void {
        const ooo = this.ooo;
        this.elm.value = ooo.yn?'On':'Off';
        this.elm.innerHTML = ooo.yn? ooo.onName: ooo.offName;
        this.elm.classList.remove(ooo.yn? ooo.offClass : ooo.onClass);
        this.elm.classList.add   (ooo.yn? ooo.onClass  : ooo.offClass);
    }
    public setON():   boolean {this.ooo.yn = true;         this._setAttrs(); return true;};
    public setOFF():  boolean {this.ooo.yn = false;        this._setAttrs(); return true;};
    public toggle():  boolean {this.ooo.yn = !this.ooo.yn; this._setAttrs(); return true;}

    public id():      string  {return this.elm.id};
    public isON():    boolean {return this.ooo.yn;}
}
