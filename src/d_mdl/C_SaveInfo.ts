"use strict";

import { C_MovablePoint, JSON_MovablePoint } from "./C_MovablePoint";

// サーバー側とやりとりするJSON形式データのテンプレート
export interface JSON_Any {
    [key: string]: any
}

// サーバー側とやりとりするクラスに必要なメソッド
export interface I_JSON {
    encode: ()=>JSON_Any,
    decode: (j:JSON_Any)=>I_JSON,
}

export interface I_JSON_Uniq extends I_JSON {
    uid: ()=>string,
}

export interface I_Abstract {
    newObj?: (j?:JSON_Any)=>I_Abstract|undefined,
    encode:  ()=>JSON_Any,
//  static decode: (j:JSON_Any)=>I_JSON,
}

export interface I_JSON_Class {
    new: (j?: JSON_Any)=>I_JSON,
}

// サーバー側とやり取りする際に自身を文字列化するクラスのメソッド
export interface I_JSONValue extends I_JSON{
    fromJSON: ()=>void,
    toJSON:   ()=>void,
}

export interface JSON_SaveInfo extends JSON_Any {
    save_id?:   number,
    player_id?: number, 
    uniq_no?:   number,
    title?:     string,
    detail?:    string,
    point?:     string,
    auto_mode?: string,
    is_active?: string,
    is_delete?: string,
    save_time?: string,
    mypos?:     JSON_MovablePoint,
}

export function alert_saveinfo_info(a: JSON_SaveInfo|undefined): void {
    if (a === undefined) return;
    alert("Save Info:" 
        + "\nsave_id:    " + (a.save_id   ?? '?')
        + "\nplayer_id:  " + (a.player_id ?? '?')
        + "\nuniq_no:    " + (a.uniq_no   ?? '?')
        + "\ntitle:      " + (a.title     ?? '?')
        + "\ndetail:     " + (a.detail    ?? '?')
        + "\npoint:      " + (a.point     ?? '?')
        + "\nauto_mode:  " + (a.auto_mode ?? '?')
        + "\nis_active:  " + (a.is_active ?? '?')
        + "\nis_delete:  " + (a.is_delete ?? '?')
        + "\nsave_time:  " + (a.save_time ?? '?')
        + "\nmyurl:      " + (a.mypos?.cur_url   ?? '?')
        + "\nteam_uid:   " + (a.mypos?.team_uid  ?? '?')
        + "\nloc_kind:   " + (a.mypos?.kind      ?? '?')
        + "\nloc_name:   " + (a.mypos?.name      ?? '?')
        + "\nloc_uid:    " + (a.mypos?.loc_uid   ?? '?')
        + "\n"
    );
}

export class C_SaveInfo implements I_JSON {
    public save_id:   number;
    public player_id: number; 
    public uniq_no:   number;
    public title:     string;
    public detail:    string;
    public point:     string;
    public auto_mode: boolean;
    public is_active: boolean;
    public is_delete: boolean;
    public save_time: Date;
    public mypos:     C_MovablePoint;

    public constructor(a?: JSON_SaveInfo) {
        this.save_id   = -1;
        this.player_id = -1; 
        this.uniq_no   = -1;
        this.title     = '';
        this.detail    = '';
        this.point     = '';
        this.auto_mode = false;
        this.is_active = true;
        this.is_delete = false;
        this.save_time = new Date();

        this.mypos     = new C_MovablePoint();

        if (a !== undefined) this.__init(a);
    }
    protected __init(s: JSON_SaveInfo): C_SaveInfo {
        this.save_id   = s.save_id   ?? this.save_id;
        this.player_id = s.player_id ?? this.player_id; 
        this.uniq_no   = s.uniq_no   ?? this.uniq_no;
        this.title     = s.title     ?? this.title;
        this.detail    = s.detail    ?? this.detail;
        this.point     = s.point     ?? this.point;
        if (s.auto_mode === undefined) this.auto_mode; else s.auto_mode !== '0' ? true : false;
        if (s.is_active === undefined) this.is_active; else s.is_active !== '0' ? true : false;
        if (s.is_delete === undefined) this.is_delete; else s.is_delete !== '0' ? true : false;
        if (s.save_time !== undefined) this.save_time = new Date(s.save_time); 

        if (s.mypos     !== undefined) this.mypos.decode(s.mypos); 

        return this;
    }

    public static new(a?: JSON_SaveInfo): C_SaveInfo {
        return new C_SaveInfo(a);
    }

    public encode(): JSON_SaveInfo {
        let save_date: string;
        try {
            save_date = this.save_time.toISOString();
        } catch (err) {
            save_date = new Date().toISOString();
        }

        try {
            return {
                save_id:   this.save_id, 
                player_id: this.player_id,  
                uniq_no:   this.uniq_no, 
                title:     this.title, 
                detail:    this.detail, 
                point:     this.point, 
                auto_mode: this.auto_mode ? '1' : '0', 
                is_active: this.is_active ? '1' : '0', 
                is_delete: this.is_delete ? '1' : '0', 
                save_time: save_date, 
                mypos:     this.mypos.encode(),
            }
        } catch (err) {
            alert('SaveData Encode Error: ' + err);
            return {};
        }
    }

    public decode(s: JSON_SaveInfo): C_SaveInfo {
        return this.__init(s);
    }
    
    public alert(): void {
        alert("SaveInfo DATA:" 
            + "\nsave_id:    " + (this.save_id   ?? '?')
            + "\nplayer_id:  " + (this.player_id ?? '?')
            + "\nuniq_no:    " + (this.uniq_no   ?? '?')
            + "\ntitle:      " + (this.title     ?? '?')
            + "\ndetail:     " + (this.detail    ?? '?')
            + "\npoint:      " + (this.point     ?? '?')
            + "\nauto_mode:  " + (this.auto_mode?'Y':'N')
            + "\nis_active:  " + (this.is_active?'Y':'N')
            + "\nis_delete:  " + (this.is_delete?'Y':'N')
            + "\nmyurl:      " + (this.mypos.url()      ?? '?')
            + "\nteam_uid:   " + (this.mypos.tid()      ?? '?')
            + "\nloc_kind:   " + (this.mypos.get_lckd() ?? '?')
            + "\nloc_name:   " + (this.mypos.get_name() ?? '?')
            + "\nloc_uid:    " + (this.mypos.get_uid()  ?? '?')
            + "\n"
        );
    }
}
