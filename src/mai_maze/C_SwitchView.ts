import { _alert } from "../d_cmn/global";
import { set_camp_controlles } from "./F_set_camp_controlles";
import { set_move_controlles } from "./F_set_move_controlles";
import { set_mvpt_controlles } from "./F_set_mvpt_controlles";
import { set_load_controlles, set_save_controlles } from "./F_set_save_controlles";

export class C_SwitchView {
    protected static me:   C_SwitchView;
    protected static body: HTMLElement;
    protected static article: {[name: string]: HTMLElement|null} = {
        view3d: null, 
        view2d: null, 
        camp_l: null, 
        load_l: null, 
        load_d: null, 
        save_l: null, 
        save_d: null, 
        camp_m: null, 
        game_m: null, 
        contls: null, 
        messag: null, 
    };

    protected static all_class: string[] = [
        'move',
        'camp',
        'load',
        'save',
    ]

    protected constructor() {
//        C_SwitchView.article = {};
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
        this.init_all();
    }
    public static get(): C_SwitchView {
        this.me ??=  new C_SwitchView();
        return this.me;
    }
    public init_all(): void {
        this.view_move();
    }
    public view_move(): void {
        set_move_controlles();
        this.__set_class('move');
    }
    public view_camp(): void {
        set_camp_controlles();
        this.__set_class('camp');
    }
    public view_load(): void {
        set_load_controlles();
        this.__set_class('load');
    }
    public view_save(): void { 
        set_save_controlles();
        this.__set_class('save');
    }
    public view_mvpt(): void { 
        set_mvpt_controlles();
        this.__set_class('camp');
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
