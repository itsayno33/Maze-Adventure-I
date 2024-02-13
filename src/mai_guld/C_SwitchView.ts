import { _alert }       from "../d_cmn/global";
import {T_MakeEnumType} from "../d_utl/T_MakeEnumType";
export const T_ViewMode:{[mode: string]: string} = {
    Menu:     'menu',
    Hres:     'hres',
    LdSv:     'ldsv',
    ToMz:     'tomz',
} as const;
export type T_ViewMode = T_MakeEnumType<typeof T_ViewMode>;

export class C_SwitchView {
    protected static me:   C_SwitchView;
    protected static body: HTMLElement;
    protected static article:   {[name: string]: HTMLElement|null};
    protected static all_class: string[];

    public Menu(): string {return T_ViewMode.Menu;}
    public Hres(): string {return T_ViewMode.Hres;}
    public LdSv(): string {return T_ViewMode.LdSv;}
    public ToMz(): string {return T_ViewMode.ToMz;}

    protected constructor() {
        C_SwitchView.all_class = Object.values(T_ViewMode);
        C_SwitchView.article = {};
        try {
            C_SwitchView.body = document.body;

            C_SwitchView.article.mn_l = document.getElementById('guld_menu_list_pane') as HTMLElement;
            C_SwitchView.article.hr_l = document.getElementById('guld_hres_list_pane') as HTMLElement;
            C_SwitchView.article.hr_d = document.getElementById('guld_hres_data_pane') as HTMLElement;
            C_SwitchView.article.ls_l = document.getElementById('guld_ldsv_list_pane') as HTMLElement;
            C_SwitchView.article.ls_d = document.getElementById('guld_ldsv_data_pane') as HTMLElement;
            C_SwitchView.article.mz_l = document.getElementById('guld_tomz_maze_pane') as HTMLElement;
            C_SwitchView.article.mp_l = document.getElementById('guld_tomz_mvpt_pane') as HTMLElement;
            C_SwitchView.article.ctls = document.getElementById('guld_ctls_pane')      as HTMLElement;
            C_SwitchView.article.mssg = document.getElementById('sytm_logs_pane')      as HTMLElement;
        } catch (err) {
            _alert('Layout Get Error: ' + err);
        }
        this.view(this.Menu());
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
