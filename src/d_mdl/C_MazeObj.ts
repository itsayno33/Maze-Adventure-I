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

import { C_WndrWalker, I_WndrWalker } from "./C_WndrWalker";
import { C_MazeObjView2X, I_MazeObjView2X } from "./C_MazeObjView2X";
import { I_Wres } from "./C_Wres";
import { I_Wndr } from "./C_Wndr";


export interface JSON_MazeObjSTAT {
    can_thr?:   string, 
    hit_dmg?:   number,
}

export interface JSON_MazeObj extends JSON_Any {
    clname?:    string,
    uniq_id?:   string, 
    pos?:       JSON_PointDir,
    view?:      JSON_MazeObjView|undefined,
    can_thr?:   string, 
    hit_dmg?:   number,
    stat?:      JSON_MazeObjSTAT, // C_MazeObjのサブクラスの初期値を保持する
}

export interface I_MazeObj extends I_JSON_Uniq, I_Abstract {
    free:       ()=>void;
    get_pd:     ()=>C_PointDir;
    set_pd:     (pd:C_PointDir)=>void;
    within:     (p: C_Point)=>boolean;
    view2D:     ()=>I_MazeObjView2X|undefined;
    setView2D:  (view: I_MazeObjView2X|undefined)=>void;
    view2M:     ()=>I_MazeObjView2X|undefined;
    setView2M:  (view: I_MazeObjView2X|undefined)=>void;
    view:       ()=>I_MazeObjView|undefined;
    setView:    (view: I_MazeObjView|undefined)=>void;
    walker:     ()=>I_WndrWalker|undefined;
    set_walker: (wdwalk: I_WndrWalker|undefined)=>void;
    wres:       ()=>I_Wndr[]|undefined;
    set_wres:   (wres: I_Wndr[]|undefined)=>void;
    add_wndr:   (wndr: I_Wndr)=>void;
    canThrough: ()=>boolean;
    hitDamage: ()=>number;
    encode:     ()=>JSON_MazeObj;
    decode:     (j?: JSON_MazeObj|undefined)=>I_MazeObj;
}

export class C_MazeObj implements I_MazeObj {
    protected clname:    string = 'C_MazeObj';

    private   uniq_id:   string;
    protected pos:       C_PointDir|undefined;
    protected my_view:   I_MazeObjView|undefined;
    protected my_view2D: I_MazeObjView2X|undefined;
    protected my_view2M: I_MazeObjView2X|undefined;
    protected my_walker: I_WndrWalker|undefined; // C_Walkerオブジェクト(抽象プロパティ)
    protected my_wres  : I_Wndr[]|undefined;     // C_Wndrの配列オブジェクト(抽象プロパティ)
    protected can_thr:   boolean;
    protected hit_dmg:   number;

    public constructor(j?: JSON_MazeObj|undefined) {
        this.clname     =  'C_MazeObj'; // クラス名
        if (j?.clname  !== undefined) this.clname = j.clname; //
        this.uniq_id    =  this.clname + '_' + _get_uuid();
        this.pos        =  new C_PointDir({x:0, y:0, z:0, d:0});
        this.my_view    =  undefined;
        this.my_view2D  =  undefined;
        this.my_view2M  =  undefined;
        this.my_walker  =  undefined; // C_Walkerオブジェクトは初期化しない
        this.my_wres    =  undefined; // C_Wresオブジェクトは初期化しない
        this.can_thr    =  true;
        this.hit_dmg    =  0;

        if (j !== undefined) this.__init(j);
    }

    protected __init(j: JSON_MazeObj|undefined): C_MazeObj {
        if (j === undefined) return this;

        if (j.uniq_id !== undefined) this.uniq_id   = j.uniq_id;
        if (j.clname  !== undefined) this.clname    = j.clname;
        if (j.pos     !== undefined) this.pos?.decode(j.pos);
        if (j.view    !== undefined) {
            this.my_view   = C_MazeObjView  .newObj(j.view); 
            this.my_view2D = C_MazeObjView2X.newObj(j.view); 
            this.my_view2M = C_MazeObjView2X.newObj(j.view); 
        };

        if (j.stat    !== undefined) {
            // データベースからのプロパティの復元(j.statはJSON形式)
            if (j?.stat?.can_thr !== undefined) this.can_thr = j.stat.can_thr !== '0' ? true : false;
            if (j?.stat?.hit_dmg !== undefined) this.hit_dmg = j.stat.hit_dmg;
        }
        if (j.can_thr !== undefined) this.can_thr = j.can_thr !== '0' ? true : false;
        if (j.hit_dmg !== undefined) this.hit_dmg = j.hit_dmg;
        return this;
}

    public free(): void {
        this.pos = undefined;
        this.my_view  ?.free();this.my_view    =  undefined;
        this.my_view2D?.free();this.my_view2D  =  undefined;
        this.my_view2M?.free();this.my_view2M  =  undefined;
        this.my_walker?.free();this.my_walker  =  undefined; // C_Walkerオブジェクトは初期化しない
                               this.my_wres    =  undefined; // C_Wndrオブジェクトは初期化しない
    }

    public uid(): string {return this.uniq_id}

    public className(): string {return this.clname}

    public view(): I_MazeObjView|undefined {return this.my_view}
    public setView(view: I_MazeObjView|undefined): void {this.my_view = view}

    public view2D(): I_MazeObjView2X|undefined {return this.my_view2D}
    public setView2D(view2D: I_MazeObjView2X|undefined): void {this.my_view2D = view2D}

    public view2M(): I_MazeObjView2X|undefined {return this.my_view2M}
    public setView2M(view2M: I_MazeObjView2X|undefined): void {this.my_view2M = view2M}

    public walker(): I_WndrWalker|undefined {return this.my_walker;}
    public set_walker(walker: I_WndrWalker|undefined): void {
        this.my_walker = walker;
    }

    public wres(): I_Wndr[]|undefined {return this.my_wres;}
    public set_wres(wres: I_Wndr[]|undefined): void {
        this.my_wres = wres;
    }
    public add_wndr(wndr: I_Wndr): void {
        this.my_wres ??= [];
        this.my_wres.push(wndr);
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
        return this.pos?.within(p) ?? false;
    }

    public hitDamage() :number {
        return this.hit_dmg;
    }
    public encode(): JSON_MazeObj {                    //alert('C_MazeObj.encode()');
        const stat = {
            can_thr: this.can_thr ? '1' : '0',
            hit_dmg: this.hit_dmg,
        }
        return {
            uniq_id: this.uniq_id,
            clname:  this.clname,
            pos:     this.pos?.encode()??{x:0,y:0,z:0,d:99},
            view:    this.my_view?.encode() ?? {},
            can_thr: this.can_thr ? '1' : '0',
            hit_dmg: this.hit_dmg,
            stat:    stat,
        }
    }

    public decode(j?: JSON_MazeObj|undefined): I_MazeObj {
        return this.__init(j);
    }
}
