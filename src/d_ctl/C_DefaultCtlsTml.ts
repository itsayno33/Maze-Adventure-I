/**********************
 * 
 * 未使用：　作成中
 * 
***********************/

export type T_Ctls= {
    name:  string,
    mevt:  {[eid:string]:  T_marg},
//    keyEvent?: T_karg,
//    kevt?: {[kid:string]: T_karg},
}
type T_mfnc = (e?: MouseEvent)=>(void|boolean);
type T_marg = T_mfnc | undefined;
 
export class C_DefaultCtlsTmpl {
    protected static me: C_DefaultCtlsTmpl;
    protected flgs: {[name: string]: boolean};
    protected ctls: {[name: string]: T_Ctls};

    protected btns: {[eid: string]: HTMLButtonElement};

    protected constructor(ids: string[]) {
        this.flgs = {};
        this.ctls = {};

        this.btns = {};
        for (const id of ids) {
            this.btns[id] = document.getElementById(id) as HTMLButtonElement;
            this.btns[id].style.display = 'node';
        }
    }
    public static getObj(ids: string[]): C_DefaultCtlsTmpl {
        this.me ??=  new C_DefaultCtlsTmpl(ids);
        return this.me;
    }
    public clr(): boolean {
        this.ctls = {};
        this.flgs = {};
        return true;
    }
    public set(name: string|T_Ctls, ctls?:T_Ctls): boolean {
        try {
            if (typeof name === 'string' && ctls !== undefined) {
                this.ctls[name] = ctls;
                this.flgs[name] = false;
            } else {
                const c = name as T_Ctls;
                this.ctls[c.name] = c;
                this.flgs[c.name] = false;
            }
            return true;
        } catch (err) {
            return false;
        }
    }
    public rmv(ctls: string|T_Ctls): boolean {
        try {
            const name = typeof ctls === 'string' ? ctls : ctls.name;
            delete this.ctls[name];
            delete this.flgs[name];
            return true;
        } catch(err) {
            return false;
        }
    }
    public deact(): boolean {
        for (const ii in this.ctls) {
            if (this.ctls[ii].name === undefined) continue;
            if (!this._rmv_default_ctls(this.ctls[ii].name as string)) return false;
        }
        return true;
    }
    public act(ctls: string|T_Ctls): boolean {
        try {
            if(!this.deact()) return false;
            const name = typeof ctls === 'string' ? ctls : ctls.name;
            return this._add_default_ctls(name);
        } catch(err) {
            return false;
        }
    }

    public is_act(ctls: string|T_Ctls): boolean {
        try {
            const name = typeof ctls === 'string' ? ctls : ctls.name;
            return  this.flgs[name] ?? false;
        } catch(err) {
            return false;
        }
    }

    public keys_of_add(): string[] {
        const key_list = [] as string[];
        for (const name in this.ctls) key_list.push(name);
        return key_list;
    }

    public keys_of_act(): string[] {
        const key_list = [] as string[];
        for (const name in this.flgs) if (this.flgs[name]) key_list.push(name);
        return key_list;
    }

    protected _rmv_default_ctls(name: string): boolean {
        // flgs[name]が定義されていない
        // つまり_add_default_ctlsがまだ呼ばれてない(ctlsがaddされてない)か、
        // _all_ctls_name[call.name]がfalse(既にctllsがremoveされている)なら、
        // 何もしない。
        this.flgs[name] ??= false; 
    
        if (!this.flgs[name]) return true;
        this.flgs[name] = false;

        const c = this.ctls[name];
        try {
            for (const eid in this.btns)
                if (_c(c.mevt[eid])) this.btns[eid].removeEventListener("click", c.mevt[eid] as T_mfnc, false);
/*
            if (c?.keyEvent !== undefined) {
                window.removeEventListener('keydown', c.keyEvent);
            } else {
                window.removeEventListener('keydown', key_press_function);
            }
*/
            } catch (err) {
            alert('Error Occuerd at Remove Default Ctls.');
            alert('' + err);
            return false;
        }
        return true;
    }

    protected _add_default_ctls(name: string): boolean {
        this.flgs[name] ??= false; 
    
        if (this.flgs[name]) return true;
        this.flgs[name] = true;
    
        const c = this.ctls[name];
        try {
            for (const eid in this.btns)
                if (_c(c.mevt[eid])) {
                    this.btns[eid].addEventListener("click", c.mevt[eid] as T_mfnc, false);
                    this.btns[eid].style.display = 'block';
                } else {
                    this.btns[eid].style.display = 'none';
                }
/*
                if (c?.keyEvent !== undefined) {
                window.addEventListener('keydown', c.keyEvent);
            } else {
                window.addEventListener('keydown', key_press_function);
                }
*/
        } catch (err) {
            alert('Error Occuerd at Append Default Ctls.');
            alert('' + err);
            return false;
        }
        return true;
    }
}

function _c(c: T_marg): boolean {
    if (c === undefined) return false;
    if (c === null)      return false;
    return true;
}
