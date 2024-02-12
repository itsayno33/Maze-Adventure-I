export class C_OneLineViewMessage {
    protected static  me : {[id: string]: C_OneLineViewMessage};
    protected p  : HTMLParagraphElement;

    protected constructor(id: string, parent?: HTMLElement) {
        C_OneLineViewMessage.me ??= {}
        C_OneLineViewMessage.me[id] = this;
        try {
            this.p = document.getElementById(id) as HTMLParagraphElement;
        } catch (err) {
            this.p = document.createElement('p');
            this.p.id = id;

            parent ??= document.body;
            parent.appendChild(this.p);
        }
        C_OneLineViewMessage.me[id].clear_message();
    }
    public static getObj(id: string, parent?: HTMLElement): C_OneLineViewMessage  {
        C_OneLineViewMessage.me ??= {}
        this.me[id] ??= new C_OneLineViewMessage(id, parent);
        return this.me[id];
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
