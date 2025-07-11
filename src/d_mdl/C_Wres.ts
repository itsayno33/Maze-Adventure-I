"use strict";

import { _get_uuid }                 from "../d_utl/F_Rand";
import { I_JSON_Uniq, JSON_Any }     from "./C_SaveInfo";
import { C_Wndr, I_Wndr, JSON_Wndr } from "./C_Wndr";
import { JSON_WndrObj } from "./C_WndrObj";
import { I_WndrWalker, JSON_WndrWalker } from "./C_WndrWalker";

export interface JSON_Wres extends JSON_Any {
    uniq_id?: string;
//ww    wres?:    JSON_Wndr[];               // C_Wndrオブジェクト
    wowalk?:  JSON_WndrWalker|undefined; // C_WndrWalkerオブジェクト
}

export type T_WresDoAllFnc = (wndr: I_Wndr, arg?:{[key:string]: any})=>boolean;

export interface I_Wres extends I_JSON_Uniq {
    free:       ()=>void,
    wres:       ()=>I_Wndr[],
    set_wres:   (wres: I_Wndr[])=>void,
    clr_wres:   ()=>void,
    add_wres:   (wndr: I_Wndr)=>void,
    walker:     ()=>I_WndrWalker|undefined,
    set_walker: (wowalk: I_WndrWalker|undefined)=>void
    doAll:      (fnc: T_WresDoAllFnc, arg?:{[key:string]: any})=>boolean|void
}

export class C_Wres  implements I_Wres {
    protected uniq_id: string;
    protected myWres:  I_Wndr[]|undefined;
    protected wowalk:  I_WndrWalker|undefined; // WndrWalkerオブジェクト
    

    public constructor(j?: JSON_Wres) {
        this.uniq_id    = 'mai_wres#' + _get_uuid();

        j ??= {} as JSON_WndrObj; // jが未定義の場合は空のオブジェクトを用意

//ww        // C_WonderWalkerは__init()で*必ず*生成される
//ww        // よって未定義のまま呼び出さないように初期値を設定する
//ww        j.wowalk ??= {} as JSON_WndrWalker;
        
        this.__init(j);
    }
    public free():void {
        for (const wndr of this?.myWres??[]) {
            wndr?.free();
        }
        this.myWres = [];
        this.wowalk?.free(); this.wowalk = undefined;
    }

    uid():string {return this.uniq_id}

    public wres(): I_Wndr[]               {return this.myWres??[]};
    public set_wres(wres: I_Wndr[]):void  {if (wres !== undefined && wres.length > 0) this.myWres = wres;}
    public clr_wres():void                {this.myWres = [];}
    public add_wres(wndr: I_Wndr):void    {if (wndr !== undefined) this.myWres?.push(wndr)}

    public walker(): I_WndrWalker|undefined {return this.wowalk;}
    public set_walker(wowalk: I_WndrWalker|undefined): void {this.wowalk = wowalk;}

    public doAll(fnc: T_WresDoAllFnc, arg?:{[key:string]: any}): boolean|void {
        if (fnc === undefined) return false;
        let rsltAll = true;
        for (const wndr of this.myWres??[]) {
            const rslt  = fnc(wndr, arg);
            if (typeof rslt === 'boolean') rsltAll &&= rslt;
        }
        return rsltAll;
    }

    public encode(): JSON_Wres {
        const wres: JSON_Wndr[] = [];
        for (const wndr of this.myWres??[]) wres.push(wndr.encode());

        const j = {
            uniq_id: this.uniq_id,
            wres:    wres,
//ww            wowalk:  this.wowalk?.encode() ?? undefined,
        }
        return {}
    }

    protected __init(j?: JSON_Wres): I_Wres {
        if (j === undefined) return this;

        if (j.uniq_id  !== undefined) this.uniq_id  = j.uniq_id;
        if (j.wres     !== undefined  &&  (j.wres?.length??-1) > 0) {
            this.myWres = [];
            for (const wres of j.wres) this.myWres.push(new C_Wndr(wres));
        }

//ww        if (j?.wowalk   !== undefined) {
//ww            j.wowalk.loc_pos ??= ( j?.pos ?? {x:1, y:1, z:0, d:0} ); // loc_posが未定義の場合は初期位置を設定
            //console.log('C_WndrObj.__init() json_output = ');_json_output(j); // デバッグ用：wdwalkの内容を出力

//ww            this.wowalk        = new_walker(j.wowalk);
//ww        }

        return this;
    }

    public decode(j: JSON_Wres|undefined): I_Wres {
        return this.__init(j)
    }; 
}
