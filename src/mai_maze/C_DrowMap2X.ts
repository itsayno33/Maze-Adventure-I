"use strict";

import { C_PointDir }         from "../d_mdl/C_PointDir";
import { C_Maze }             from '../d_mdl/C_Maze';
import { I_MazeObjView2X, T_Rect } from "../d_mdl/C_MazeObjView2X";
import { C_MazeObjView2X }    from "../d_mdl/C_MazeObjView2X";
import { _max, _min, _round } from "../d_utl/F_Math";
import { I_MazeObj }          from "../d_mdl/C_MazeObj";
import { g_debug }            from "../d_cmn/global";
import { g_maze, g_team }     from "./global_for_maze";

export interface I_DrowMap2X{
    set_xy_max(x_max: number, y_max: number) : void;
    calc_map_top(pd: C_PointDir): void;
}

export type T_DrowMap2X = {
    div_id: string,
    canvas_id: string,
    x_min: number,
    y_min: number,
}

export type T_DrowMap2X_Opt = {
    x_min:  number,
    y_min:  number,
}

export class C_DrowMap2X {
    static me: {[id: string]: C_DrowMap2X}|undefined= undefined;

    static getObj(a: T_DrowMap2X): C_DrowMap2X {
        C_DrowMap2X.me ??= {};
        if (C_DrowMap2X.me[a.canvas_id] === undefined) {
            switch (a.canvas_id) {
                case 'maze_view2D_canvas':
                    C_DrowMap2X.me[a.canvas_id] = new C_DrowMap2D(a); break;
                case 'maze_view2M_canvas':
                    C_DrowMap2X.me[a.canvas_id] = new C_DrowMap2M(a); break;
                default:
                    C_DrowMap2X.me[a.canvas_id] = new C_DrowMap2X(a); break;
            }
        }
        return C_DrowMap2X.me[a.canvas_id];
    }


    protected cell_masks = C_MazeObjView2X.newObj({
        layer: 0, letter: 'Ｘ', 
        show3D: '1',
        col_2: '#333333', col_L: '#6666ff', 
    })

/*****************
    protected cell_masks = C_MazeObjView2X.newObj({
        layer: 0, letter: 'Ｘ', 
        show3D: '1',
        pad_t: 0.0, pad_d: 0.0, pad_s: 0.0,
        col_f: '', col_b: '', col_s: '', col_t: '', col_d: '', 
        col_l: '#0000ff', col_2: '#333333', col_L: '#6666ff', 
    })

    protected cell_unexp = C_MazeObjView2X.newObj({
            layer: 0, letter: '謎', 
            show3D:  '1',
            pad_t: 0.0, pad_d: 0.0, pad_s: 0.0,
            col_f: '', col_b: '', col_s: '', col_t: '', col_d: '', 
            col_l: '#0000ff', col_2: '#ff00ff', col_L: '#6666ff', 
    })
****************/

    
    div: HTMLDivElement| null = null;
    cvs: HTMLCanvasElement|null = null;
    ctx: CanvasRenderingContext2D|null = null;

    px_size_x: number = 0;
    px_size_y: number = 0;

    px_min_x:  number = 3;
    px_min_y:  number = 3;

    view_wdth: number = 0;
    view_hght: number = 0;
    map_wdth:  number = 0;
    map_hght:  number = 0;

    protected constructor(a: T_DrowMap2X) {
        this.init(a);
    }
    public init(a: T_DrowMap2X): void {
        this.div = document.getElementById(a.div_id)    as HTMLDivElement;
        if (this.div === null) return;

        this.view_wdth  = this.div.clientWidth;
        this.view_hght  = this.div.clientHeight;

        this.cvs = document.getElementById(a.canvas_id) as HTMLCanvasElement;
        if (this.cvs === null) return;

        this.ctx = this.cvs.getContext('2d');
        if (this.ctx === null) return;

        this.set_xy({x_min: a.x_min, y_min: a.y_min} as T_DrowMap2X_Opt);
    }

    public set_xy(a: T_DrowMap2X_Opt): void {
        const col = g_maze.get_x_max();
        const row = g_maze.get_y_max();

        if (col   < 3   || row   < 3  ) return;
        if (a.x_min < 3 || a.y_min < 3) return;

        if (this.div === null || this.cvs === null) return;
        this.px_min_x = a.x_min;
        this.px_min_y = a.y_min; 
        this._calc_map_size(col, row);
    }

    protected _calc_map_size(col: number, row: number): void {
        if (this.div === null || this.cvs === null) return;

        const col_px = this.cvs.width  / col;
        const row_px = this.cvs.height / row;

        this.px_size_x = _max([this.px_min_x, _round(1.00 *  _min([col_px, row_px]), 2)]);
        this.px_size_y = _max([this.px_min_y, _round(1.00 *  _min([col_px, row_px]), 2)]);

        this.map_wdth     = this.px_size_x * col;
        this.map_hght     = this.px_size_y * col;

        this.cvs.setAttribute('width',  this.map_wdth.toString());
        this.cvs.setAttribute('height', this.map_hght.toString());
    }

    public calc_map_top(): void {
        const pd = g_team.get_pd();

        this.view_wdth  = this.div?.clientWidth  ?? -1;
        this.view_hght  = this.div?.clientHeight ?? -1;

        let top_x =  this.view_wdth / 2 - pd.x * this.px_size_x;
        if (top_x > 0) top_x = 0; // 左端制限
        if (top_x < this.view_wdth - this.map_wdth) top_x = this.view_wdth - this.map_wdth; // 右端制限

        let top_y =  this.view_hght / 2 - pd.y * this.px_size_y;
        if (top_y > 0) top_y = 0; // 上端制限
        if (top_y < this.view_hght - this.map_hght) top_y = this.view_hght - this.map_hght; // 下端制限

        this.cvs?.style.setProperty('left',      `${top_x}px`);
        this.cvs?.style.setProperty('top',       `${top_y}px`);

    //        alert(`View2D: ${this.view_wdth}x${this.view_hght} px, Cell: ${this.px_size_x}x${this.px_size_y} px`);
    //        alert(`View2D: ${top_x}px * ${top_y}px, PD: ${pd.x},${pd.y},${pd.z}`);
    }

    public drow_map2X(pd: C_PointDir, maze: C_Maze, is_masked: boolean = true): void { 
        if (this.cvs !== null) {this.to_2X();this.calc_map_top()};
    }


    public to_2X(): void {
        const size_x = g_maze.get_x_max();
        const size_y = g_maze.get_y_max();
        const pd     = g_team.get_pd();
        const floor  = pd.z

        for (let y = 0; y < size_y; y++) {
            for (let x = 0; x < size_x; x++) {
                let rect_2d: T_Rect = {
                    tl: { x: ( x     ) * this.px_size_x, y: ( y     ) * this.px_size_y },
                    tr: { x: ( x + 1 ) * this.px_size_x, y: ( y     ) * this.px_size_y },
                    dl: { x: ( x     ) * this.px_size_x, y: ( y + 1 ) * this.px_size_y },
                    dr: { x: ( x + 1 ) * this.px_size_x, y: ( y + 1 ) * this.px_size_y },
                };

                if (!g_debug.isON() && g_maze.is_masked_xyz(x, y, floor)) {
                    // マスクされているセルは、マスク表示
                    if (this.ctx !== null) this.cell_masks.drow2X(this.ctx, rect_2d, 0);
                } else { 
                    // マスクされていないセルは、通常表示

                    // 床のビューを描写
                    const flr_obj = g_maze.get_cell_xyz(x, y, floor)?.getObj();
                    flr_obj?.view2D()?.drow2X(this.ctx, rect_2d, 0);
                    flr_obj?.view2M()?.drow2X(this.ctx, rect_2d, 0);

                    // オブジェクトが存在する場合は、そのビューを描画
                    const obj_cell = g_maze.get_obj_xyz(x, y, floor);
                    if (obj_cell !== undefined) {
                        this.obje_view2X(obj_cell)?.drow2X(this.ctx, rect_2d, obj_cell?.get_pd().d??0);
                    }
                }
            }
        }
        return;
    }

    // 2Dか2Mか。サブクラスで実装
    protected obje_view2X(obj_cell: I_MazeObj|null): I_MazeObjView2X| undefined {
        return undefined
    }

}


// 2Dマップのサブクラス
// 2Dマップは、C_DrowMap2Xを継承して
// 2Dマップの描画を行うクラスを作成する。
export class C_DrowMap2D extends C_DrowMap2X {
    constructor(a: T_DrowMap2X = {
        div_id:    'div_maze_vw2D',
        canvas_id: 'maze_view2D_canvas',
        x_min:     15,
        y_min:     15,
    }) {
        super(a);
    }

    // 2Dマップのオブジェクトビューを取得
    public  obje_view2X(obj_cell: I_MazeObj|null): I_MazeObjView2X| undefined {
        return obj_cell?.view2D();
    }
}

// 2Dマップのサブクラス
// 2Dミニマップ（2M）は、C_DrowMap2Xを継承して
// 2Dミニマップの描画を行うクラスを作成する。
export class C_DrowMap2M extends C_DrowMap2X {

    constructor(a: T_DrowMap2X = {
        div_id:    'div_maze_vw2M',
        canvas_id: 'maze_view2M_canvas',
        x_min:      5,
        y_min:      5,
    }) {
        super(a);
    }

    // 2Mマップのオブジェクトビューを取得
    public  obje_view2X(obj_cell: I_MazeObj|null): I_MazeObjView2X| undefined {
        return obj_cell?.view2M();
    }
}
