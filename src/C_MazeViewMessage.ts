

export class C_MazeViewMessage {
    protected static  me : C_MazeViewMessage;
    protected p  : HTMLParagraphElement;

    protected constructor() {
        C_MazeViewMessage.me = this;
        this.p = document.getElementById('Maze_view_message') as HTMLParagraphElement;
        C_MazeViewMessage.me.clear_message();
    }
    public static get(): C_MazeViewMessage  {
        if (typeof this.me !== "object" || !(this.me instanceof C_MazeViewMessage)) 
            this.me = new C_MazeViewMessage();
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
    public notice_message(mes: string) {
        this.display_message(mes, '#006600', '#ccffcc');
    }
    public warning_message(mes: string) {
        this.display_message(mes, '#ffffff', '#ff0000');
    }
}
