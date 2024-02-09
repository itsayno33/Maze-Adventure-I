export class C_DisplayMessage {
    protected static  me: C_DisplayMessage;
    protected id:  string;
    protected div: HTMLDivElement;

    protected constructor(con: HTMLElement, id: string = 'client_message') {
        C_DisplayMessage.me = this;

        this.id   = id;
        this.div  = document.createElement('div') as HTMLDivElement;
        if (this.div === null) alert('Can not founnd Div#client_message!');
        this.div.setAttribute('id', this.id);

        con.insertBefore(this.div, con.firstChild);
        C_DisplayMessage.me.clear_message();
    }
    public static getObj(con: HTMLElement|null = null, id: string = 'client_message')
                : C_DisplayMessage  {
        if (typeof this.me !== "object" || !(this.me instanceof C_DisplayMessage)) { 
            if (con === null) {
                con = document.createElement('div') as HTMLDivElement;
                document.body.appendChild(con);
            }
            this.me = new C_DisplayMessage(con, id);
        }
        return this.me;
    }
    public display_message(mes: string, fr_color = 'inherit', bg_color: string = 'inherit') {
        const p = document.createElement('p') as HTMLParagraphElement;
        p.style.setProperty('color',            fr_color);
        p.style.setProperty('background-color', bg_color);
        p.innerHTML = mes;
        // 記録型メッセージなので先頭に追加していく
        this.div.insertBefore(p, this.div.firstChild); 
    }

    public clear_message() {
        while (this.div.firstChild) {
            this.div.removeChild(this.div.firstChild);
        };
    }
    public normal_message(mes: string) {
        this.display_message(mes);
    }
    public notice_message(mes: string) {
        this.display_message(mes, '#006600', '#ccffcc');
    }
    public warning_message(mes: string) {
        this.display_message(mes, '#ffffff', '#ff0000');
    }
}
