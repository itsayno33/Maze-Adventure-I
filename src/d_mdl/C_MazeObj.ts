"use strict";

import { C_Point }                   from "./C_Point";
import { C_PointDir, JSON_PointDir } from "./C_PointDir";
import { I_Abstract, I_JSON_Uniq, JSON_Any }     from "./C_SaveInfo";
import { _get_uuid }                 from "../d_utl/F_Rand";
import { 
    C_MazeObjView, 
    I_MazeObjView, 
    JSON_MazeObjView 
} from "./C_MazeObjView";
import { C_Walker } from "./C_Walker";
import { C_WanderWalker } from "./C_WanderWalker";
import { new_walker } from "./F_New_Walker";


export interface JSON_MazeObj extends JSON_Any {
    clname?:    string,
    uniq_id?:   string, 
    pos?:       JSON_PointDir,
    view?:      JSON_MazeObjView|undefined,
    can_thr?:   string, 
    h_w_dmg?:   number,
    stat?:      string, // C_MazeObjのサブクラスの初期値を保持する 
}


export interface I_MazeObj extends I_JSON_Uniq, I_Abstract {
    get_pd:     ()=>C_PointDir;
    set_pd:     (pd:C_PointDir)=>void;
    within:     (p: C_Point)=>boolean;
    view:       ()=>I_MazeObjView|undefined;
    setView:    (view: I_MazeObjView|undefined)=>void;
    walker:     ()=>C_WanderWalker|undefined;
    canThrough: ()=>boolean;
    hitWallDmg: ()=>number;
}

export class C_MazeObj implements I_MazeObj {
    protected clname:    string = 'C_MazeObj';

    private   uniq_id:   string;
    protected pos:       C_PointDir;
    protected my_view:   I_MazeObjView|undefined;
    protected my_walker: C_WanderWalker|undefined; // C_Walkerオブジェクト
    protected can_thr:   boolean;
    protected h_w_dmg:   number;
    protected stat:      Object = {}; // C_MazeObjのサブクラスの初期値を保持する

    public constructor(j?: JSON_MazeObj|undefined) {
        this.clname     =  this.constructor.name;
        this.uniq_id    =  this.clname + '_' + _get_uuid();
        this.pos        =  new C_PointDir({x:0, y:0, z:0, d:0});
        this.my_view    =  undefined;
        this.my_walker  =  undefined; // C_Walkerオブジェクトは初期化しない
        this.can_thr    =  true;
        this.h_w_dmg    =  0;
        this.stat       =  {};

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
        if (j.worker  !== undefined) {
//            this.my_walker = new_walker(j.worker);
            this.my_walker?.set_mazeObj(this as I_MazeObj); // Walkerに自分自身を設定
        }
        
        if (j.can_thr !== undefined) this.can_thr = j.can_thr !== '0' ? true : false;
        if (j.h_w_dmg !== undefined) this.h_w_dmg = j.h_w_dmg;
        if (j.stat    !== undefined) this.stat    = JSON.parse(j.stat??'{}') as Object;
        return this;
}

    public uid(): string {return this.uniq_id}

    public className(): string {return this.clname}

    public view(): I_MazeObjView|undefined {return this.my_view}
    public setView(view: I_MazeObjView|undefined): void {this.my_view = view}

    public walker(): C_WanderWalker|undefined {return this.my_walker;}
    public setWalker(walker: C_WanderWalker|undefined): void {
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
    public encode(): JSON_MazeObj {
        return {
            uniq_id: this.uniq_id,
            clname:  this.clname,
            pos:     this.pos.encode(),
            view:    this.my_view?.encode() ?? {},
            worker:  this.my_walker?.encode() ?? {},
            can_thr: this.can_thr ? '1' : '0',
            h_w_dmg: this.h_w_dmg,
            stat:    JSON.stringify(this.stat??{}),
        }
    }

    public decode(j?: JSON_MazeObj|undefined): I_MazeObj {
        return this.__init(j);
    }
}

