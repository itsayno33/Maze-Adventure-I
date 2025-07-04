"use strict";

import { C_MazeObj, I_MazeObj, JSON_MazeObj, JSON_MazeObjSTAT } from "./C_MazeObj";
import { C_PointDir } from "./C_PointDir";
import { C_WanderView, JSON_WanderView } from "./C_WanderView";
import { C_WanderWalker, JSON_WanderWalker }  from "./C_WanderWalker";
import { new_walker } from "./F_New_Walker";

export interface JSON_WanderObjSTAT extends JSON_MazeObjSTAT {
    wo?: {
        dmy?:       string, // ダミー変数
    }
}
export interface JSON_WanderObj extends JSON_MazeObj {
    clname?:    string,
    wdwalk?:    JSON_WanderWalker|undefined,
    stat?:      JSON_WanderObjSTAT, // C_WanderObjのサブクラスの初期値を保持する
}

export class C_WanderObj  extends C_MazeObj implements I_MazeObj {
    protected clname: string = 'C_WanderObj';
    protected wdwalk: C_WanderWalker|undefined; // WanderWalkerオブジェクト
    private   dmy:    string = ''; // ダミー変数

    public constructor(j?: JSON_MazeObj) {
        super(j);
        this.clname    = 'C_WanderObj';

        this.can_thr = true; // 壁を通過可能
        this.h_w_dmg = 0;    // 壁に当たったときのダメージ無し

        const loc_pos    = new C_PointDir(j?.loc_pos ?? {x:1, y:1, z:0, d:0});
        this.set_pd(loc_pos);


        // Viewの初期化
        // ViewはJSON_WanderWalkerViewを使用して初期化する
        const view = new C_WanderView({
                layer: 0, letter: '漂', 
                show3D:  '1',
                pad_t: 0.2, pad_d: 0.0, pad_s: 0.38,
                col_f: '#ff99ff', col_b: '#dd88dd', col_s: '#dd88dd', col_t: '#dd88dd', col_d: '#dd88dd', 
                col_l: '#9999ff', col_2: '#ff33ff', col_L: '#6666ff', 
                col_2_arw: '#338866', col_2_tri: '#cc6666',
        } as JSON_WanderView);
        this.setView(view);
        
        // Walkerの初期化
        // loc_posはC_WanderWalkerの初期位置に使用される
        this.wdwalk      = new_walker(loc_pos);              // new C_WanderWalker(loc_pos)を使用して初期化？？？
//        this.wdwalk.set_pd(loc_pos);
        this.wdwalk.set_mazeObj(this); // Walkerに自分自身を設定

        if (j !== undefined) this.decode(j);
    }

    public walker(): C_WanderWalker|undefined {return this.wdwalk;}
    public set_walker(wdwalk: C_WanderWalker): void {this.wdwalk = wdwalk;}

    public encode(): JSON_WanderObj {
        const j = super.encode() as JSON_WanderObj;
        j.clname = this.clname;
        j.wdwalk = this.wdwalk?.encode() ?? undefined;
        j.stat     ??= {};
        j.stat.wo  = {dmy: this.dmy}; // ダミー変数
        return j;
    }
    public decode(j: JSON_WanderObj): C_WanderObj {
        super.decode(j)
        if (j.clname   !== undefined) this.clname    = j.clname;
        if (j.wdwalk   !== undefined) this.wdwalk    = new_walker(j.wdwalk);
        if (j.stat?.wo !== undefined) {
            this.dmy = j.stat.wo.dmy ?? ''; // ダミー変数
        }
        return this;
    }
}
