import { g_debug }        from "../d_cmn/global";
import { g_maze, g_team } from "./global_for_maze";
import { 
    do_instant_load, 
    do_instant_save, 
    do_move_bottom_half 
}                         from "./F_set_move_mode";


export type T_Ctls= {
    name:  string,
    do_U?: T_marg, 
    do_D?: T_marg, 
    do_L?: T_marg, 
    do_R?: T_marg, 
    isOK?: T_marg, 
    isNG?: T_marg, 
    isSL?: T_marg, 
    isRT?: T_marg, 
    menu?: T_marg, 
    cpOK?: T_marg, 
    cpNG?: T_marg, 
    cpSL?: T_marg, 
    cpRT?: T_marg, 
    keyEvent?: T_karg,
}
type T_mfnc = (e?: MouseEvent)=>(void|boolean);
type T_marg = T_mfnc | undefined;
 
type T_kfnc = (e: KeyboardEvent)=>(void|boolean);
type T_karg = T_kfnc | undefined;

export class C_DefaultCtls {
    protected static me: C_DefaultCtls;
    protected ctls: {[name: string]: T_Ctls};
    protected flgs: {[name: string]: boolean};

    protected u_arr: HTMLButtonElement;
    protected d_arr: HTMLButtonElement;
    protected l_arr: HTMLButtonElement;
    protected r_arr: HTMLButtonElement;
    protected y_btn: HTMLButtonElement;
    protected n_btn: HTMLButtonElement;
    protected s_btn: HTMLButtonElement;
    protected r_btn: HTMLButtonElement;
    protected m_btn: HTMLButtonElement;
    protected y_cp1: HTMLButtonElement;
    protected n_cp1: HTMLButtonElement;
    protected s_cp1: HTMLButtonElement;
    protected r_cp1: HTMLButtonElement;

    protected constructor() {
        this.ctls = {};
        this.flgs = {};

        this.u_arr = document.getElementById('u_arr') as HTMLButtonElement;
        this.d_arr = document.getElementById('d_arr') as HTMLButtonElement;
        this.l_arr = document.getElementById('l_arr') as HTMLButtonElement;
        this.r_arr = document.getElementById('r_arr') as HTMLButtonElement;
        this.y_btn = document.getElementById('y_btn') as HTMLButtonElement;
        this.n_btn = document.getElementById('n_btn') as HTMLButtonElement;
        this.s_btn = document.getElementById('s_btn') as HTMLButtonElement;
        this.r_btn = document.getElementById('r_btn') as HTMLButtonElement;
        this.m_btn = document.getElementById('m_btn') as HTMLButtonElement;
        this.y_cp1 = document.getElementById('y_cp1') as HTMLButtonElement;
        this.n_cp1 = document.getElementById('n_cp1') as HTMLButtonElement;
        this.s_cp1 = document.getElementById('s_cp1') as HTMLButtonElement;
        this.r_cp1 = document.getElementById('r_cp1') as HTMLButtonElement;

        this.u_arr.style.display = 'none';
        this.d_arr.style.display = 'none';
        this.l_arr.style.display = 'none';
        this.r_arr.style.display = 'none';
        this.y_btn.style.display = 'none';
        this.n_btn.style.display = 'none';
        this.s_btn.style.display = 'none';
        this.r_btn.style.display = 'none';
        this.m_btn.style.display = 'none';
        this.y_cp1.style.display = 'none';
        this.n_cp1.style.display = 'none';
        this.s_cp1.style.display = 'none';
        this.r_cp1.style.display = 'none';
    }
    public static getObj(): C_DefaultCtls {
        this.me ??=  new C_DefaultCtls();
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
        
            if (_c(c?.do_U)) this.u_arr.removeEventListener("click", c.do_U as T_mfnc, false);
            if (_c(c?.do_D)) this.d_arr.removeEventListener("click", c.do_D as T_mfnc, false);
            if (_c(c?.do_L)) this.l_arr.removeEventListener("click", c.do_L as T_mfnc, false);
            if (_c(c?.do_R)) this.r_arr.removeEventListener("click", c.do_R as T_mfnc, false);
            if (_c(c?.isOK)) this.y_btn.removeEventListener("click", c.isOK as T_mfnc, false);
            if (_c(c?.isNG)) this.n_btn.removeEventListener("click", c.isNG as T_mfnc, false);
            if (_c(c?.isSL)) this.s_btn.removeEventListener("click", c.isSL as T_mfnc, false);
            if (_c(c?.isRT)) this.r_btn.removeEventListener("click", c.isRT as T_mfnc, false);
            if (_c(c?.menu)) this.m_btn.removeEventListener("click", c.menu as T_mfnc, false);
            if (_c(c?.cpOK)) this.y_cp1.removeEventListener("click", c.cpOK as T_mfnc, false);
            if (_c(c?.cpNG)) this.n_cp1.removeEventListener("click", c.cpNG as T_mfnc, false);
            if (_c(c?.cpSL)) this.s_cp1.removeEventListener("click", c.cpSL as T_mfnc, false);
            if (_c(c?.cpRT)) this.r_cp1.removeEventListener("click", c.cpRT as T_mfnc, false);
        
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
            this.s_btn.style.display = 'none';
            this.r_btn.style.display = 'none';
            this.m_btn.style.display = 'none';
            this.y_cp1.style.display = 'none';
            this.n_cp1.style.display = 'none';
            this.s_cp1.style.display = 'none';
            this.r_cp1.style.display = 'none';
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
            if (_c(c?.isSL)) this.s_btn.addEventListener("click", c.isSL as T_mfnc, false);
            if (_c(c?.isRT)) this.r_btn.addEventListener("click", c.isRT as T_mfnc, false);
            if (_c(c?.menu)) this.m_btn.addEventListener("click", c.menu as T_mfnc, false);
            if (_c(c?.cpOK)) this.y_cp1.addEventListener("click", c.cpOK as T_mfnc, false);
            if (_c(c?.cpNG)) this.n_cp1.addEventListener("click", c.cpNG as T_mfnc, false);
            if (_c(c?.cpSL)) this.s_cp1.addEventListener("click", c.cpSL as T_mfnc, false);
            if (_c(c?.cpRT)) this.r_cp1.addEventListener("click", c.cpRT as T_mfnc, false);
        
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
            this.s_btn.style.display = _c(c?.isSL) ? 'block' : 'none';
            this.r_btn.style.display = _c(c?.isRT) ? 'block' : 'none';
            this.m_btn.style.display = _c(c?.menu) ? 'block' : 'none';
            this.y_cp1.style.display = _c(c?.cpOK) ? 'block' : 'none';
            this.n_cp1.style.display = _c(c?.cpNG) ? 'block' : 'none';
            this.s_cp1.style.display = _c(c?.cpSL) ? 'block' : 'none';
            this.r_cp1.style.display = _c(c?.cpRT) ? 'block' : 'none';
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
    const ee = (e.target as HTMLInputElement)?.value??'*****'
    const ne=(ee === '*****') // Not Editting InputElement

    switch(e.code) { // Arrowは反応せず(イベント自体が発生せず)
        case 'ArrowUp': 
        case 'Numpad5': 
                e.preventDefault();
                (document.getElementById('u_arr') as HTMLButtonElement)?.click();
                break;
        case 'KeyO':
                if (ne) (document.getElementById('u_arr') as HTMLButtonElement)?.click();
                break;
        case 'ArrowDown': 
                e.preventDefault();
                (document.getElementById('d_arr') as HTMLButtonElement)?.click();
                break;
        case 'Numpad2': 
                (document.getElementById('d_arr') as HTMLButtonElement)?.click();
                break;
        case 'KeyL':
                if (!ne) break; 
                if (g_debug.isON()) {
                    do_instant_load();
                } else {
                    (document.getElementById('d_arr') as HTMLButtonElement)?.click();
                }
            break;
        case 'ArrowLeft': 
        case 'Numpad1': 
                e.preventDefault();
                (document.getElementById('l_arr') as HTMLButtonElement)?.click();
                break;
        case 'KeyK':
                if (ne) (document.getElementById('l_arr') as HTMLButtonElement)?.click();
                break;
        case 'ArrowRight': 
        case 'Numpad3': 
                e.preventDefault();
                (document.getElementById('r_arr') as HTMLButtonElement)?.click();
                break;
        case 'Semicolon':
                if (ne) (document.getElementById('r_arr') as HTMLButtonElement)?.click();
                break;
        case 'Enter':
        case 'NumpadEnter':
        case 'F10':
                e.preventDefault();
                if (e.shiftKey) (document.getElementById('n_btn') as HTMLButtonElement)?.click();
                else            (document.getElementById('y_btn') as HTMLButtonElement)?.click();
                break;
        case 'KeyY':
        case 'KeyP':
        case 'Digit0':
                if (ne) (document.getElementById('y_btn') as HTMLButtonElement)?.click();
                break;
        case 'F1':
        case 'Numpad0':
        case 'NumpadAdd':
                e.preventDefault();
                (document.getElementById('n_btn') as HTMLButtonElement)?.click();
                break;
        case 'KeyN':
        case 'KeyI':
        case 'Digit8':
                if (ne) (document.getElementById('n_btn') as HTMLButtonElement)?.click();
                break;
        case 'KeyU':
                if (!ne) break;
                if (g_debug.isON()) {
                    const z = g_team.walk().get_z();
                    if (z > 0) g_team.walk().set_z(z - 1);
                    do_move_bottom_half('blink_off');
//              } else {
//                  (document.getElementById('u_arr') as HTMLButtonElement)?.click();
                }
                break;
        case 'KeyD':
                if (!ne) break;
                if (g_debug.isON()) {
                    const z = g_team.walk().get_z();
                    if (z < g_maze.get_z_max()-1) g_team.walk().set_z(z + 1);
                    do_move_bottom_half('blink_off');
//              } else {
//                  (document.getElementById('u_arr') as HTMLButtonElement)?.click();
                }
                break;
        case 'KeyM':
        case 'Numpad7':
                if (ne) (document.getElementById('m_btn')   as HTMLButtonElement)?.click();
                break;
        case 'F5':
                e.preventDefault();
                (document.getElementById('s_btn') as HTMLButtonElement)?.click();
                break;
        case 'Comma':
                if (ne) (document.getElementById('s_btn') as HTMLButtonElement)?.click();
                break;
        case 'KeyS':
                if (!ne) break;
                if (g_debug.isON()) {
                    do_instant_save();
                    do_move_bottom_half('blink_off');
                } else {
                    (document.getElementById('s_btn') as HTMLButtonElement)?.click();
                }
                break;
        case 'F3':
        case 'Numpad8':
                e.preventDefault();
                (document.getElementById('r_btn') as HTMLButtonElement)?.click();
                break;
        case 'KeyR':
        case 'Period':
                if (ne) (document.getElementById('r_btn') as HTMLButtonElement)?.click();
                break;
    }
}
