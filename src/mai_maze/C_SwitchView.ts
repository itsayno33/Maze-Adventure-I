export class C_SwitchView {
    protected static me:   C_SwitchView;
    protected _maze: HTMLDivElement;
    protected _camp: HTMLDivElement;
    protected _load: HTMLDivElement;
    protected _save: HTMLDivElement;
    protected constructor() {
        this._maze = document.getElementById('Maze_view_switch_maze') as HTMLDivElement;
        this._camp = document.getElementById('Maze_view_switch_camp') as HTMLDivElement;
        this._load = document.getElementById('Maze_view_switch_load') as HTMLDivElement;
        this._save = document.getElementById('Maze_view_switch_save') as HTMLDivElement;
        this.hide_all();
    }
    public static get(): C_SwitchView {
        if (typeof this.me !== "object" || !(this.me instanceof C_SwitchView)) {
            this.me = new C_SwitchView();
        } 
        return this.me;
    }
    public hide_all(): void {
        this._maze.style.setProperty('display', 'none');
        this._camp.style.setProperty('display', 'none');
        this._load.style.setProperty('display', 'none');
        this._save.style.setProperty('display', 'none');
    }
    public view_maze(): void {
        this.hide_all();
        this._maze.style.setProperty('display', 'block');
    }
    public view_camp(): void {
        this.hide_all();
        this._camp.style.setProperty('display', 'block');
    }
    public view_load(): void {
        this.hide_all();
        this._load.style.setProperty('display', 'block');
    }
    public view_save(): void { 
        this.hide_all();
        this._save.style.setProperty('display', 'block');
    }
}
