// コントロールに使うHTMLElementの実体(の型定義)
// HTMLElemenには必ずidをしていしておくこと
// さもないと暴走する(笑)
// イベントリスナを操作する前に設定すること
// 出来ればコンストラクタで初期化すること
type T_CtlsElements = {
    [id: string]: HTMLElement,
}

// ひとまとまりのコントロール管理用のプロパティの型定義
// nameでaddしたりremoveするグループを識別する
type T_IsSet         = {[name: string]:  boolean};
type T_Listeners     = {[name: string]:  T_CtlsListener[]};

// イベントリスナー指定用の型定義
// id重要
type T_CtlsListener = {
    id: string,
    fn: T_arg,
}

// イベントリスナーの有無をundefined(やnull)で行っているので
// その制御用
// イベントリスナーが指定されていないHTMLElementの非表示とか
// に使用
type T_arg = T_fnc | null;
type T_fnc = (e?: MouseEvent)=>void; 

type T_KeyDownArg    = {[name: string]: T_KeyDownFnc|null}
type T_KeyDownFnc    = (e: KeyboardEvent)=>void;


export class C_Ctls0 {
    protected static me: C_Ctls0|undefined;
    public ctls:        T_CtlsElements;
    public is_set:      T_IsSet;
    public listeners:   T_Listeners;
    public keydown_fnc: T_KeyDownArg;

    protected constructor(ctls?: HTMLElement[]) {
        this.ctls        = {};
        this.is_set      = {};
        this.listeners   = {};
        this.keydown_fnc = {};

        if (ctls !== undefined) this.init(ctls);
    }

    // シングルトン仕様
    // ひとつのプログラムに複数の入力制御があると地雷になるからね
    // 
    public static get(ctls?: HTMLElement[]): C_Ctls0|undefined {
        if (C_Ctls0.me === undefined) C_Ctls0.me = new C_Ctls0(ctls);
        return C_Ctls0.me;
    }

    // 入力制御用の要素のユニークな識別子としてHTML要素のidを使用している
    // くれぐれも設定を忘れないこと！！ 
    // 
    public init(ctls: HTMLElement[]): C_Ctls0|undefined {
        for (let ctl of ctls) {
            if (ctl?.id === undefined) return undefined;
            this.ctls[ctl.id] = ctl;
        }
        return this;
    }

    // 入力制御に使うHTML要素(ボタンを想定)にイベントリスナーを追加する
    // 追加した要素のみdisplayで表示する
    // マウスクリックのイベントリスナーのみ扱うが、キー押下にも対応
    // キー押下はマウスクリックのショートカットを想定
    // 
    public add_ctls(
            name: string, 
            ctl_listeners: T_CtlsListener[], 
            keydown_func?: T_KeyDownArg,
        ): void {
        
        // is_setが定義されてないか
        // is_setがtrue(既にイベントリスナーが登録済)の場合はスルーする
        // is_setが未定義の場合は、その名前のadd_ctl()もrmv_ctl()も
        // まだ呼ばれていないか、もしくはrmv_ctl()で削除済みの状態
        // 
        this.is_set[name] ??= false;
        if (this.is_set[name]) return;

        this.listeners[name] ??= [];
        for (let listener of ctl_listeners) {
            if (this._check_fn(listener.fn)) {
                this.ctls[listener.id].addEventListener("click", listener.fn as T_fnc, false);
                this.ctls[listener.id].style.display = "block";
            } else {
                this.ctls[listener.id].style.display = "none";
            }
            this.listeners[name].push(listener);
        } 
        if (this._check_kd(keydown_func?.[name] as T_KeyDownFnc)) {
            window.addEventListener('keydown', keydown_func?.[name] as T_KeyDownFnc);
            this.keydown_fnc[name] = keydown_func?.[name] as T_KeyDownFnc;
        }
        this.is_set[name] = true;
    }

    // 上記で追加したイベントリスナーの削除と非表示化
    // 追加していないイベントリスナーをremoveEventListener()すると
    // 暴走しちゃうので(Chromeの仕様か?)、神経を使って制御してる
    // このために作ったクラスだと言っても過言ではない（笑）
    // 
    public rmv_ctls(name: string): void {
        this.is_set[name] ??= false;
        if (!this.is_set[name]) return;

        for (let listener of this.listeners[name]) {
            if (this._check_fn(listener.fn)) {
                this.ctls[listener.id].removeEventListener("click", listener.fn as T_fnc, false);
            }
            this.ctls[listener.id].style.display = "none";
        }
        if (this._check_kd(this.keydown_fnc[name] as T_KeyDownFnc)) {
            window.removeEventListener('keydown', this.keydown_fnc[name] as T_KeyDownFnc);
            delete this.keydown_fnc[name];
        }
        delete this.listeners[name];
        this.is_set[name] = false;
    }


    protected _check_fn(c: T_arg | undefined): boolean {
        if (c === undefined) return false;
        if (c === null)      return false;
        return true;
    }

    protected _check_kd(c: T_KeyDownFnc|undefined): boolean {
        if (c === undefined) return false;
        if (c === null)      return false;
        return true;
    }
}