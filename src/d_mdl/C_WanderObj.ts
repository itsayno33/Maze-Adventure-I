"use strict";

import { 
    C_MazeObj, 
    I_MazeObj, 
    JSON_MazeObj, 
    JSON_MazeObjSTAT 
} from "./C_MazeObj";

import { C_WanderView, JSON_WanderView }      from "./C_WanderView";
import { C_WanderWalker, JSON_WanderWalker }  from "./C_WanderWalker";
import { new_walker }                         from "./F_New_Walker";
import { C_PointDir } from './C_PointDir';

export interface JSON_WanderObjSTAT extends JSON_MazeObjSTAT {
    wo?: {
        dmy?:       string, // ダミー変数
    }
}
export interface JSON_WanderObj extends JSON_MazeObj {
    clname?:    string,
    walk?:      JSON_WanderWalker|undefined,
    view?:      JSON_WanderView|undefined,
    stat?:      JSON_WanderObjSTAT, // C_WanderObjのサブクラスの初期値を保持する
}

export interface I_WanderObj extends I_MazeObj {
    walker(): C_WanderWalker|undefined;       // C_WanderWalkerオブジェクトを呼出
    set_walker(wdwalk: C_WanderWalker): void; // C_WanderWalkerオブジェクトを設定
    encode(): JSON_WanderObj;                 // JSON_WanderObj形式でエンコード
    decode(j: JSON_WanderObj): C_WanderObj;   // JSON_WanderObj形式でデコード
}

export class C_WanderObj  extends C_MazeObj implements I_WanderObj {
    protected clname: string = 'C_WanderObj';
    protected wdwalk: C_WanderWalker|undefined; // WanderWalkerオブジェクト
    private   dmy:    string = ''; // ダミー変数

    public constructor(j?: JSON_MazeObj) {
        super(j);
        this.clname    = 'C_WanderObj';

        this.can_thr = true; // 壁を通過可能
        this.h_w_dmg = 0;    // 壁に当たったときのダメージ無し

        j ??= {} as JSON_WanderObj; // jが未定義の場合は空のオブジェクトを用意


        // loc_posが未定義の場合は初期位置を設定。decode(j)でthis.set_pd()を呼び出す
        if (j.pos === undefined) j.pos ??= j.wdwalk.loc_pos ?? {x:1, y:1, z:0, d:0}; 

        // viewが未定義の場合はこれを初期化
        // Viewはdecode(j)でJSON_WanderWalkerViewを使用して生成する
        j.view ??= {
                layer: 0, letter: '漂', 
                show3D:  '1',
                pad_t: 0.2, pad_d: 0.0, pad_s: 0.38,
                col_f: '#ff99ff', col_b: '#dd88dd', col_s: '#dd88dd', col_t: '#dd88dd', col_d: '#dd88dd', 
                col_l: '#9999ff', col_2: '',        col_L: '#6666ff', 
//                col_l: '#9999ff', col_2: '#ff33ff', col_L: '#6666ff', 
                col_2_arw: '#338866', col_2_tri: '#cc6666',
        } as JSON_WanderView;
        
        // Walkerの初期化。decode(j)にて新しいC_WanderWalkerを生成
        j.wdwalk ??= {} as JSON_WanderWalker; // 初期化

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
        super.decode(j);
        if (j?.clname   !== undefined) this.clname    = j.clname;

        // loc_posが未定義の場合は初期位置を設定
        if (j?.pos  === undefined && j.wdwalk.loc_pos  !== undefined)  j.pos = j.wdwalk.loc_pos; 
        if (j?.pos  !== undefined)  this.set_pd(new C_PointDir(j.pos)); 

        if (j?.view     !== undefined) this.setView(new C_WanderView(j.view));

        if (j?.wdwalk   !== undefined) {
            j.wdwalk.loc_pos ??= j?.pos ?? {x:1, y:1, z:0, d:0}
            this.wdwalk        = new_walker(j.wdwalk);
            this.wdwalk.set_mazeObj(this); // MazeObjを設定
        }

        if (j?.stat?.wo !== undefined) {
            this.dmy = j.stat.wo.dmy ?? ''; // ダミー変数
        }
        return this;
    }
}
