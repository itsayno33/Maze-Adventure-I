export class C_GldViewMessage {
    protected static  me : C_GldViewMessage;
    protected p  : HTMLParagraphElement;

    protected constructor() {
        C_GldViewMessage.me = this;
        try {
            this.p = document.getElementById('gld_view_message') as HTMLParagraphElement;
        } catch (err) {
            this.p = document.createElement('p') as HTMLParagraphElement;
            this.p.id = 'gld_view_message';
            document.body.appendChild(this.p);
        }
        C_GldViewMessage.me.clear_message();
    }
    public static getObj(): C_GldViewMessage  {
        if (typeof this.me !== "object" || !(this.me instanceof C_GldViewMessage)) 
            this.me = new C_GldViewMessage();
        return this.me;
    }
    public display_message(mes: string, fr_color = 'inherit', bg_color: string = 'inherit') {
        this.p.style.setProperty('color',            fr_color);
        this.p.style.setProperty('background-color', bg_color);
        this.p.innerHTML = mes;
    }

    public clear_message() {
        this.display_message('　');
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
