

export class C_DisplayMessage {
    protected static  me : C_DisplayMessage;
    protected div  : HTMLDivElement;

    protected constructor() {
        C_DisplayMessage.me = this;
        this.div = document.getElementById('client_message') as HTMLDivElement;
        if (this.div === null) alert('Can not founnd Div#client_message!');
        C_DisplayMessage.me.clear_message();
    }
    public static get(): C_DisplayMessage  {
        if (typeof this.me !== "object" || !(this.me instanceof C_DisplayMessage)) 
            this.me = new C_DisplayMessage();
        return this.me;
    }
    public display_message(mes: string, fr_color = 'inherit', bg_color: string = 'inherit') {
        const p = document.createElement('p') as HTMLParagraphElement;
        p.style.setProperty('color',            fr_color);
        p.style.setProperty('background-color', bg_color);
        p.innerHTML = mes;
        // 記録型メッセージなので先頭に追加していく
        this.div.insertBefore(p, this.div.firstChild); 
//        this.div.appendChild(p);
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
