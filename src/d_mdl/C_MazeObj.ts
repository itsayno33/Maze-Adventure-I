"use strict";

import { C_Point }                           from "./C_Point";
import { C_PointDir, JSON_PointDir }         from "./C_PointDir";
import { I_Abstract, I_JSON_Uniq, JSON_Any } from "./C_SaveInfo";
import { _get_uuid }                         from "../d_utl/F_Rand";
import { 
    C_MazeObjView, 
    I_MazeObjView, 
    JSON_MazeObjView 
} from "./C_MazeObjView";

import { I_WndrWalker } from "./C_WndrWalker";


export interface JSON_MazeObjSTAT {
    can_thr?:   string, 
    h_w_dmg?:   number,
}

export interface JSON_MazeObj extends JSON_Any {
    clname?:    string,
    uniq_id?:   string, 
    pos?:       JSON_PointDir,
    view?:      JSON_MazeObjView|undefined,
    can_thr?:   string, 
    h_w_dmg?:   number,
    stat?:      JSON_MazeObjSTAT, // C_MazeObjのサブクラスの初期値を保持する
}

export interface I_MazeObj extends I_JSON_Uniq, I_Abstract {
    get_pd:     ()=>C_PointDir;
    set_pd:     (pd:C_PointDir)=>void;
    within:     (p: C_Point)=>boolean;
    view:       ()=>I_MazeObjView|undefined;
    setView:    (view: I_MazeObjView|undefined)=>void;
    walker:     ()=>I_WndrWalker|undefined;
    canThrough: ()=>boolean;
    hitWallDmg: ()=>number;
    encode:     ()=>JSON_MazeObj;
    decode:     (j?: JSON_MazeObj|undefined)=>I_MazeObj;
}

export class C_MazeObj implements I_MazeObj {
    protected clname:    string = 'C_MazeObj';

    private   uniq_id:   string;
    protected pos:       C_PointDir;
    protected my_view:   I_MazeObjView|undefined;
    protected my_walker: I_WndrWalker|undefined; // C_Walkerオブジェクト(抽象プロパティ)
    protected can_thr:   boolean;
    protected h_w_dmg:   number;

    public constructor(j?: JSON_MazeObj|undefined) {
        this.clname     =  'C_MazeObj'; // クラス名
        if (j?.clname  !== undefined) this.clname = j.clname; //
        this.uniq_id    =  this.clname + '_' + _get_uuid();
        this.pos        =  new C_PointDir({x:0, y:0, z:0, d:0});
        this.my_view    =  undefined;
        this.my_walker  =  undefined; // C_Walkerオブジェクトは初期化しない
        this.can_thr    =  true;
        this.h_w_dmg    =  0;

        if (j !== undefined) this.__init(j);
    }

    protected __init(j: JSON_MazeObj|undefined): C_MazeObj {
        if (j === undefined) return this;

        if (j.uniq_id !== undefined) this.uniq_id   = j.uniq_id;
        if (j.clname  !== undefined) this.clname    = j.clname;
        if (j.pos     !== undefined) this.pos.decode(j.pos);
        if (j.view    !== undefined) {
            if (Object.keys(j.view).length > 0) {
                this.my_view ??= C_MazeObjView.newObj(j.view); 
            } else this.my_view  = undefined;
        }
/***************************
    // WndrObj専用の処理  コメントアウトすると実行時エラーになる
    if (j.wdwalk  !== undefined) {
            const walker = new_walker(j.wdwalk);
            if (walker !== undefined)  this.my_walker = walker;
        }
***************************/
        if (j.stat    !== undefined) {
            // データベースからのプロパティの復元(j.statはJSON形式)
            if (j?.stat?.can_thr !== undefined) this.can_thr = j.stat.can_thr !== '0' ? true : false;
            if (j?.stat?.h_w_dmg !== undefined) this.h_w_dmg = j.stat.h_w_dmg;
        }
        if (j.can_thr !== undefined) this.can_thr = j.can_thr !== '0' ? true : false;
        if (j.h_w_dmg !== undefined) this.h_w_dmg = j.h_w_dmg;
        return this;
}

    public uid(): string {return this.uniq_id}

    public className(): string {return this.clname}

    public view(): I_MazeObjView|undefined {return this.my_view}
    public setView(view: I_MazeObjView|undefined): void {this.my_view = view}

    public walker(): I_WndrWalker|undefined {return this.my_walker;}
    public setWalker(walker: I_WndrWalker|undefined): void {
        this.my_walker = walker;
    }

    public canThrough(): boolean {return this.can_thr}
    public setThrough(thr: boolean): boolean {return this.can_thr = thr}

    public get_pd(): C_PointDir {
        return new C_PointDir(this.pos);
    }
    public set_pd(p: C_PointDir): void {
        this.pos = p;
    }
    public within(p: C_Point): boolean {
        return this.pos.within(p);
    }

    public hitWallDmg() :number {
        return this.h_w_dmg;
    }
    public encode(): JSON_MazeObj {                    //alert('C_MazeObj.encode()');
        const stat = {
            can_thr: this.can_thr ? '1' : '0',
            h_w_dmg: this.h_w_dmg,
        }
        return {
            uniq_id: this.uniq_id,
            clname:  this.clname,
            pos:     this.pos.encode(),
            view:    this.my_view?.encode() ?? {},
            can_thr: this.can_thr ? '1' : '0',
            h_w_dmg: this.h_w_dmg,
            stat:    stat,
        }
    }

    public decode(j?: JSON_MazeObj|undefined): I_MazeObj {
        return this.__init(j);
    }
}
