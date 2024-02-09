import { _alert }       from "../d_cmn/global";
import {T_MakeEnumType} from "../d_utl/T_MakeEnumType";
export const T_ViewMode:{[mode: string]: string} = {
    Move:     'move',
    Batt:     'batt',
    Camp:     'camp',
    Load:     'load',
    Save:     'save',
} as const;
export type T_ViewMode = T_MakeEnumType<typeof T_ViewMode>;

export class C_SwitchView {
    protected static me:   C_SwitchView;
    protected static body: HTMLElement;
    protected static article:   {[name: string]: HTMLElement|null};
    protected static all_class: string[];

    public Move(): string {return T_ViewMode.Move;}
    public Batt(): string {return T_ViewMode.Batt;}
    public Camp(): string {return T_ViewMode.Camp;}
    public Load(): string {return T_ViewMode.Load;}
    public Save(): string {return T_ViewMode.Save;}

    protected constructor() {
        C_SwitchView.all_class = Object.values(T_ViewMode);
        C_SwitchView.article = {};
        try {
            C_SwitchView.body = document.body;

            C_SwitchView.article.view3d = document.getElementById('pane_maze_vw3D') as HTMLElement;
            C_SwitchView.article.view2d = document.getElementById('pane_maze_vw2D') as HTMLElement;
            C_SwitchView.article.camp_l = document.getElementById('pane_camp_list') as HTMLElement;
            C_SwitchView.article.load_l = document.getElementById('pane_load_list') as HTMLElement;
            C_SwitchView.article.load_d = document.getElementById('pane_load_data') as HTMLElement;
            C_SwitchView.article.save_l = document.getElementById('pane_save_list') as HTMLElement;
            C_SwitchView.article.save_d = document.getElementById('pane_save_data') as HTMLElement;
            C_SwitchView.article.camp_m = document.getElementById('pane_camp_mesg') as HTMLElement;
            C_SwitchView.article.game_m = document.getElementById('pane_maze_mesg') as HTMLElement;
            C_SwitchView.article.contls = document.getElementById('pane_ctls_boad') as HTMLElement;
            C_SwitchView.article.messag = document.getElementById('pane_sytm_mesg') as HTMLElement;
        } catch (err) {
            _alert('Layout Get Error: ' + err);
        }
        this.view('move');
    }
    public static getObj(): C_SwitchView {
        this.me ??=  new C_SwitchView();
        return this.me;
    }
    public view(mode: string): boolean {
        this.__set_class(mode);
        return true;
    }
    protected __set_class(c: string): void { 
        try {
            C_SwitchView.body?.classList.remove(...C_SwitchView.all_class);
            C_SwitchView.body?.classList.add(c);
            for (const ii in C_SwitchView.article) {
                if (C_SwitchView.article[ii] === null) continue;
                C_SwitchView.article[ii]?.classList.remove(...C_SwitchView.all_class);
                C_SwitchView.article[ii]?.classList.add(c);
            }
        } catch (err) {
            _alert('Layout Set Error: ' + err);
        }
    }
}
