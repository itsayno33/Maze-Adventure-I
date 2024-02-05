import { do_instant_load, do_instant_save, do_move_bottom_half } from "./F_set_move_controlles";
import { g_debug_mode } from "./global_for_maze";


export type T_Ctls = {
    name?: string,
    do_U?: T_marg, 
    do_D?: T_marg, 
    do_L?: T_marg, 
    do_R?: T_marg, 
    isOK?: T_marg, 
    isNG?: T_marg, 
    camp?: T_marg, 
    keyEvent?: T_karg,
}
type T_mfnc = (e?: MouseEvent)=>(void|boolean);
type T_marg = T_mfnc | undefined;
 
type T_kfnc = (e: KeyboardEvent)=>(void|boolean);
type T_karg = T_kfnc | undefined;

export class C_DefaultCtls {
    protected ctls: {[name: string]: T_Ctls};
    protected flgs: {[name: string]: boolean};

    protected u_arr: HTMLButtonElement;
    protected d_arr: HTMLButtonElement;
    protected l_arr: HTMLButtonElement;
    protected r_arr: HTMLButtonElement;
    protected y_btn: HTMLButtonElement;
    protected n_btn: HTMLButtonElement;
    protected c_btn: HTMLButtonElement;

    public constructor() {
        this.ctls = {};
        this.flgs = {};

        this.u_arr = document.getElementById('u_arr') as HTMLButtonElement;
        this.d_arr = document.getElementById('d_arr') as HTMLButtonElement;
        this.l_arr = document.getElementById('l_arr') as HTMLButtonElement;
        this.r_arr = document.getElementById('r_arr') as HTMLButtonElement;
        this.y_btn = document.getElementById('y_btn') as HTMLButtonElement;
        this.n_btn = document.getElementById('n_btn') as HTMLButtonElement;
        this.c_btn = document.getElementById('c_btn') as HTMLButtonElement;
        
        this.u_arr.style.display = 'none';
        this.d_arr.style.display = 'none';
        this.l_arr.style.display = 'none';
        this.r_arr.style.display = 'none';
        this.y_btn.style.display = 'none';
        this.n_btn.style.display = 'none';
        this.c_btn.style.display = 'none';
}
    public clr(): boolean {
        this.ctls = {};
        this.flgs = {};
        return true;
    }
    public add(name: string, ctls: T_Ctls): boolean {
        try {
            ctls.name = name;
            this.ctls[name] = ctls;
            this.flgs[name] = false;
            return true;
        } catch (err) {
            return false;
        }
    }
    public rmv(name: string): boolean {
        try {
            delete this.ctls[name];
            delete this.flgs[name];
            return true;
        } catch(err) {
            return false;
        }
    }
    public deact(): boolean {
        for (const ii in this.ctls) {
            if (this.ctls[ii]?.name === undefined) continue;
            if (!this._rmv_default_ctls(this.ctls[ii].name as string)) return false;
        }
        return true;
    }
    public act(name: string): boolean {
        if(!this.deact()) return false;
        return this._add_default_ctls(name);
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
        
            if (_c(c?.do_U)) this.u_arr.removeEventListener("click", c.do_U as T_mfnc, false);
            if (_c(c?.do_D)) this.d_arr.removeEventListener("click", c.do_D as T_mfnc, false);
            if (_c(c?.do_L)) this.l_arr.removeEventListener("click", c.do_L as T_mfnc, false);
            if (_c(c?.do_R)) this.r_arr.removeEventListener("click", c.do_R as T_mfnc, false);
            if (_c(c?.isOK)) this.y_btn.removeEventListener("click", c.isOK as T_mfnc, false);
            if (_c(c?.isNG)) this.n_btn.removeEventListener("click", c.isNG as T_mfnc, false);
            if (_c(c?.camp)) this.c_btn.removeEventListener("click", c.camp as T_mfnc, false);
        
            if (c?.keyEvent !== undefined) {
                window.removeEventListener('keydown', c.keyEvent);
            } else {
                window.removeEventListener('keydown', key_press_function);
            }
        
            this.u_arr.style.display = 'none';
            this.d_arr.style.display = 'none';
            this.l_arr.style.display = 'none';
            this.r_arr.style.display = 'none';
            this.y_btn.style.display = 'none';
            this.n_btn.style.display = 'none';
            this.c_btn.style.display = 'none';
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
            if (_c(c?.do_U)) this.u_arr.addEventListener("click", c.do_U as T_mfnc, false);
            if (_c(c?.do_D)) this.d_arr.addEventListener("click", c.do_D as T_mfnc, false);
            if (_c(c?.do_L)) this.l_arr.addEventListener("click", c.do_L as T_mfnc, false);
            if (_c(c?.do_R)) this.r_arr.addEventListener("click", c.do_R as T_mfnc, false);
            if (_c(c?.isOK)) this.y_btn.addEventListener("click", c.isOK as T_mfnc, false);
            if (_c(c?.isNG)) this.n_btn.addEventListener("click", c.isNG as T_mfnc, false);
            if (_c(c?.camp)) this.c_btn.addEventListener("click", c.camp as T_mfnc, false);
        
            if (c?.keyEvent !== undefined) {
                window.addEventListener('keydown', c.keyEvent);
            } else {
                window.addEventListener('keydown', key_press_function);
            }
        
            this.u_arr.style.display = _c(c?.do_U) ? 'block' : 'none';
            this.d_arr.style.display = _c(c?.do_D) ? 'block' : 'none';
            this.l_arr.style.display = _c(c?.do_L) ? 'block' : 'none';
            this.r_arr.style.display = _c(c?.do_R) ? 'block' : 'none';
            this.y_btn.style.display = _c(c?.isOK) ? 'block' : 'none';
            this.n_btn.style.display = _c(c?.isNG) ? 'block' : 'none';
            this.c_btn.style.display = _c(c?.camp) ? 'block' : 'none';
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

function key_press_function(e: KeyboardEvent):void  {
    switch(e.code) { // Arrowは反応せず(イベント自体が発生せず)
        case 'ArrowUp': 
        case 'KeyK': 
        case 'Numpad5': 
                (document.getElementById('u_arr') as HTMLButtonElement)?.click();
                break;
        case 'ArrowDown': 
        case 'KeyJ': 
        case 'Numpad2': 
                (document.getElementById('d_arr') as HTMLButtonElement)?.click();
                break;
        case 'ArrowLeft': 
        case 'KeyH': 
        case 'Numpad1': 
                (document.getElementById('l_arr') as HTMLButtonElement)?.click();
                break;
        case 'ArrowRight': 
        case  'Numpad3': 
                (document.getElementById('r_arr') as HTMLButtonElement)?.click();
                break;
        case 'KeyL':
            if (g_debug_mode) {
                do_instant_load();
            } else {
                (document.getElementById('r_arr') as HTMLButtonElement)?.click();
            }
            break;
        case 'KeyC':
                (document.getElementById('c_btn')   as HTMLButtonElement)?.click();
                break;
        case 'KeyY':
        case 'KeyZ':
        case 'Digit0':
        case 'Enter':
        case 'NumpadEnter':
                (document.getElementById('y_btn') as HTMLButtonElement)?.click();
                break;
        case 'KeyN':
        case 'KeyX':
        case 'Numpad0':
        case 'NumpadAdd':
                (document.getElementById('n_btn') as HTMLButtonElement)?.click();
                break;
        case 'Numpad7':
        case 'Space':
                (document.getElementById('s_btn') as HTMLButtonElement)?.click();
                break;
        case 'KeyS':
            if (g_debug_mode) {
                do_instant_save();
                do_move_bottom_half('blink_off');
            } else {
                (document.getElementById('s_btn') as HTMLButtonElement)?.click();
            }
            break;
        case 'KeyQ':
        case 'Numpad9':
                (document.getElementById('r_btn') as HTMLButtonElement)?.click();
                break;
    }
}
