/**********************
 * 
 * 未使用：　作成中(本当にコレ必要か？笑)
 * 
***********************/

// 標準キーのみ定義
// 個別キーについてはサブクラスのconstructor()でthis.keys[]の要素を追加・上書きして使用する
// window.addEventListener('keydown',(key:KeyboardEvent)=>{C_DefaultKeysTmplのサブクラスのインスタンス.KeyPressedFunctiom(key)})

type T_kfnc = (e: KeyboardEvent)=>(void|boolean);
type T_karg = T_kfnc | undefined;

export class C_DefaultKeysTmpl {
    public keys: {[key: string]:  T_karg};
    protected constructor() {
        this.keys = {
            ArrowUp:     __u_arr,
            Numpad5:     __u_arr,
            o:           __u_arr,

            ArrowDown:   __d_arr,
            Numpad2:     __d_arr,
            l:           __d_arr,

            ArrowLeft:   __l_arr,
            Numpad1:     __l_arr,
            k:           __l_arr,

            ArrowRight:  __r_arr,
            Numpad3:     __r_arr,
            ';':         __r_arr,

            Enter:       key=>{(key.shiftKey) ? __n_btn(key) : __y_btn(key)},
            NumpadEnter: key=>{(key.shiftKey) ? __n_btn(key) : __y_btn(key)},
            F10:         key=>{(key.shiftKey) ? __n_btn(key) : __y_btn(key)},

            y:           __y_btn,
            Digit0:      __y_btn,

            F1:          __n_btn,
            Numpad0:     __n_btn,
            NumpadAdd:   __n_btn,
            n:           __n_btn,
            Y:           __n_btn,
            Digit8:      __n_btn,

            m:           __m_btn,
            Numpad7:     __m_btn,

            s:           __s_btn,
            ',':         __s_btn,

            F3:          __r_btn,
            Numpad8:     __r_btn,
            r:           __r_btn,
            '.':         __r_btn,
        }
    }
    public  KeyPressedFunctiom(e: KeyboardEvent):void  {
        if (e.key in this.keys) {
            if (e.key.length !== 1) {e.preventDefault(); this.keys[e.key];} //非表示キーならバブルとキャストを止めて実行
            else if ((e.target as HTMLInputElement)?.value === undefined) this.keys[e.key]; // 表示キーで非変更項目なら実行
        }
    }
}

function __u_arr(e?: KeyboardEvent): void {
    (document.getElementById('u_arr') as HTMLButtonElement)?.click()
}
function __d_arr(e?: KeyboardEvent): void {
    (document.getElementById('d_arr') as HTMLButtonElement)?.click()
}
function __l_arr(e?: KeyboardEvent): void {
    (document.getElementById('l_arr') as HTMLButtonElement)?.click()
}
function __r_arr(e?: KeyboardEvent): void {
    (document.getElementById('r_arr') as HTMLButtonElement)?.click()
}
function __y_btn(e?: KeyboardEvent): void {
    (document.getElementById('y_btn') as HTMLButtonElement)?.click()
}
function __n_btn(e?: KeyboardEvent): void {
    (document.getElementById('n_btn') as HTMLButtonElement)?.click()
}
function __m_btn(e?: KeyboardEvent): void {
    (document.getElementById('m_btn') as HTMLButtonElement)?.click()
}
function __s_btn(e?: KeyboardEvent): void {
    (document.getElementById('s_btn') as HTMLButtonElement)?.click()
}
function __r_btn(e?: KeyboardEvent): void {
    (document.getElementById('r_btn') as HTMLButtonElement)?.click()
}
