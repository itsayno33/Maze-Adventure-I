// 画面表示用メッセージ(通常用とエラー用)のカプセル化
export class C_DspMessage {
    private isHTML: boolean;       // 表示先がHTMLか(true)、コンソールか(false)の指定
    private nor_message: string[]; // 通常のメッセージを格納する文字列配列
    private err_message: string[]; // エラーメッセージを格納する文字列配列

    public constructor(isHTML: boolean = false) {
        this.isHTML      = isHTML;
        this.nor_message = [];
        this.err_message = [];
    }

    public set_nor_message(msg: string): void {
        this.nor_message.push(msg);
        return;
    }

    public set_err_message(msg: string): void {
        this.err_message.push(msg);
        return;
    }

    public display_nor_message(): void {
        if (this.nor_message.length < 1) return;

        if (this.isHTML) {
            let all_msg = "<p class='normal_message'>\n";
            for (const msg in this.nor_message) all_msg += "{$msg}</br>\n";
            all_msg +=  "</p>\n";
            alert(all_msg);
        } else {
            for (const msg in this.nor_message) console.log(msg);
        }
        return;
    }

    public display_err_message(): void {
        if (this.err_message.length < 1) return;

        if (this.isHTML) {
            let all_msg = "<p class='error_message'>\n";
            for (const msg in this.err_message) all_msg += "{$msg}</br>\n";
            all_msg +=  "</p>\n";
            alert(all_msg);
        } else {
            console.log("\n\n\n###\n### ERROR Occuerd.\n###\n");
            for (const msg in this.err_message) console.log(`### ${msg}`);
            console.log("###\n");
        }
        return;
    }

    
    public pdo_error(e: any, errmsg: string): void {
        const ecode = e?.getCode()    ?? '99999';
        const emess = e?.getMessage() ?? '???';
        this.set_err_message(errmsg);
        this.set_err_message(`code: ${ecode}`);
        this.set_err_message(`message: ${emess}`);
        return;
    }


    public get_nor_messages(): string[] {
        return [...this.nor_message];
    }
    public get_err_messages(): string[] {
        return [...this.err_message];
    }

    public is_err(): boolean {
        return  this.err_message.length !== 0;
    }
}
