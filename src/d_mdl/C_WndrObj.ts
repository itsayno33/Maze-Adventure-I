"use strict";

import { 
    C_MazeObj, 
    I_MazeObj, 
    JSON_MazeObj, 
    JSON_MazeObjSTAT 
} from "./C_MazeObj";

import { C_WndrView, JSON_WndrView }      from "./C_WndrView";
import { I_WndrWalker, JSON_WndrWalker }  from "./C_WndrWalker";
import { C_PointDir }   from './C_PointDir';
import { _json_console, _json_output } from "../d_utl/F_Utility";
import { C_WndrView2X } from "./C_WndrView2X";
import { new_walker } from "./F_new_Walker";
import { C_Wndr, I_Wndr, JSON_Wndr } from "./C_Wndr";

export interface JSON_WndrObjSTAT extends JSON_MazeObjSTAT {
    wo?: {
        dmy?:       string, // ダミー変数
    }
}
export interface JSON_WndrObj extends JSON_MazeObj {
    clname?:    string,
    view?:      JSON_WndrView  |undefined,
    walk?:      JSON_WndrWalker|undefined,
    wndr?:      JSON_Wndr[]    |undefined,
    stat?:      JSON_WndrObjSTAT, // C_WndrObjのサブクラスの初期値を保持する
}

export interface I_WndrObj extends I_MazeObj {
    free():    void;
    walker():  I_WndrWalker|undefined;       // C_WndrWalkerオブジェクトを呼出
    set_walker(walk: I_WndrWalker|undefined): void; // C_WndrWalkerオブジェクトを設定
    wres():    I_Wndr[]|undefined;           // C_WndrWalkerオブジェクトを呼出
    set_wres  (wres:   I_Wndr[]|undefined):   void; // C_WndrWalkerオブジェクトを設定
    add_wndr(wndr: I_Wndr): void;            // C_Wndrオブジェクトを追加
    encode():  JSON_WndrObj;                 // JSON_WndrObj形式でエンコード
    decode(j:  JSON_WndrObj|undefined): I_WndrObj;  // JSON_WndrObj形式でデコード
}

export class C_WndrObj  extends C_MazeObj implements I_WndrObj {
    public clname: string = 'C_WndrObj';
    protected walk: I_WndrWalker|undefined = undefined; // WndrWalkerオブジェクト
    protected my_wres: I_Wndr[]  |undefined = undefined; // Wndrオブジェクトの配列
    private   dmy:    string = 'ダミー'; // ダミー変数

    public constructor(j?: JSON_MazeObj) {
        super(j);
        this.clname    = 'C_WndrObj';

        this.can_thr = true; // 壁を通過可能
        this.hit_dmg = 0;    // 壁に当たったときのダメージ無し

                                                                   //console.log('##############');_json_output(j??{}); // デバッグ用：C_WndrObjの初期化時にjの内容を出力

//        j ??= {} as JSON_WndrObj; // jが未定義の場合は空のオブジェクトを用意
        if (j === undefined) return; // jが未定義の場合はViewやwalker等の初期化はしない

        // loc_posが未定義の場合は初期位置を設定
        // decode(j)でthis.set_pd()を呼び出す
        if (j.pos === undefined) j.pos ??= j.walk?.loc_pos ?? {x:1, y:1, z:0, d:0}; 

        // viewが未定義の場合はこれを初期化
        // Viewはdecode(j)でJSON_WndrWalkerViewを使用して生成する
        j.view ??= {
                layer: 0, letter: '漂', 
                show3D:  '1',
                pad_t: 0.2, pad_d: 0.0, pad_s: 0.38,
                col_f: '#ff99ff', col_b: '#dd88dd', col_s: '#dd88dd', col_t: '#dd88dd', col_d: '#dd88dd', 
                col_l: '#9999ff', col_2: '',        col_L: '#6666ff', 
                col_2_arw: '#ffffff', col_2_tri: '#cc6666',
        } as JSON_WndrView;
        
//        j.walk   ??= {} as JSON_WndrWalker;
//        j.wres   ??= [] as JSON_Wndr[];

        if (j !== undefined) this.__init(j);
    }

    protected __init(j: JSON_WndrObj|undefined): C_WndrObj {
        super.__init(j);
        if (j === undefined) return this;
        if (j?.clname   !== undefined) this.clname    = j.clname;

        // loc_posが未定義の場合は初期位置を設定
        if (j?.pos  === undefined && j.walk?.loc_pos  !== undefined)  j.pos = j.walk.loc_pos; 
        if (j?.pos  !== undefined)  this.set_pd(new C_PointDir(j.pos)); 

        if (j?.view     !== undefined) {
            this.setView  (new C_WndrView  (j.view));
            this.setView2D(new C_WndrView2X(j.view));
            this.setView2M(new C_WndrView2X(j.view));
        }

        if (j?.walk   !== undefined) {
            j.walk.loc_pos ??= ( j?.pos ?? {x:1, y:1, z:0, d:0} ); // loc_posが未定義の場合は初期位置を設定

                                                                        //console.log('C_WndrObj.__init() json_output = ');_json_output(j); // デバッグ用：walkの内容を出力

            this.walk        = new_walker(j.walk);
            this.walk?.set_mazeObj(this); // MazeObjを設定
        }
        
        if (j?.wres !== undefined && (j.wres?.length??0) > 0) {
            this.my_wres = [];
            for (const jw of j.wres) {
                if (jw === undefined) continue;
                if (jw.name === "No Name Wonder") continue; // 初期設定されていないWndrは無視（対症療法）

                const wndr = new C_Wndr(jw);
                this.my_wres.push(wndr);
            }
        }

        if (j?.stat?.wo !== undefined) {
            this.dmy = j.stat.wo.dmy ?? ''; // ダミー変数
        }
        return this;
    }
    public free():void {
        this.walk?.free(); this.walk = undefined;
        for (const wndr of this.my_wres ?? []) {
            if (wndr === undefined) continue;
            wndr.free();
        }
    }

    public walker(): I_WndrWalker|undefined {return this.walk;}
    public set_walker(walk: I_WndrWalker|undefined): void {this.walk = walk;}

    public wres():  I_Wndr[]|undefined {return this.my_wres??undefined;}
    public set_wres(wres: I_Wndr[]|undefined): void {this.my_wres = wres;}
    public add_wndr(wndr: I_Wndr): void {
        this.my_wres ??= [];
        this.my_wres.push(wndr);
    }   

    public encode(): JSON_WndrObj {
        const wres: JSON_Wndr[]|undefined = this.my_wres?.map((wndr) => wndr.encode());


        const j    = super.encode() as JSON_WndrObj;
        j.clname   = this.clname;
        j.walk     = this.walk?.encode()   ?? undefined;
        j.wres     = wres;
        j.stat     ??= {};
        j.stat.wo  = {dmy: this.dmy}; // ダミー変数
        return j;
    }
    public decode(j: JSON_WndrObj|undefined): I_WndrObj {
        return this.__init(j);
    }
}
