"use strict";

import { C_Maze, JSON_Maze, alert_maze_info  }  from "./C_Maze";
import { C_Guild, JSON_Guild, alert_guld_info } from "./C_Guild";
import { C_MovablePoint, JSON_MovablePoint, alert_mvpt_info } from "./C_MovablePoint";
import { C_Team, JSON_Team, alert_team_info  }  from "./C_Team";

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
    newObj: (j?:JSON_Any)=>I_Abstract|undefined,
    encode: ()=>JSON_Any,
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

export interface JSON_SaveData extends JSON_Any {
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

    all_mvpt?:  JSON_MovablePoint[],
    all_maze?:  JSON_Maze[],
    all_team?:  JSON_Team[],
    all_guld?:  JSON_Guild[],
}

export function alert_save_info(a: JSON_SaveData|undefined): void {
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
        + "\nmyurl:      " + (a.mypos?.cur_url   ?? '?')
        + "\nteam_uid:   " + (a.mypos?.team_uid  ?? '?')
        + "\nloc_kind:   " + (a.mypos?.kind      ?? '?')
        + "\nloc_name:   " + (a.mypos?.name      ?? '?')
        + "\nloc_uid:    " + (a.mypos?.loc_uid   ?? '?')
        + "\nmvpt_count: " + (a.all_mvpt?.length ?? '?')
        + "\nmaze_count: " + (a.all_maze?.length ?? '?')
        + "\nguld_count: " + (a.all_guld?.length ?? '?')
        + "\nteam_count: " + (a.all_team?.length ?? '?')
        + "\n"
    );
}

export function alert_save_detail(a: JSON_SaveData|undefined): void {
    if (a === undefined) return;

    try { 
//        alert("Save Detail(mvpt):");
        for (const mvpt of a.all_mvpt??[]) alert_mvpt_info(mvpt);
    } catch (err) {alert('alert mvpt error: ' + err)}

    try { 
//        alert("Save Detail(team):");
        for (const team of a.all_team??[]) alert_team_info(team);
    } catch (err) {alert('alert team error: ' + err)}

    try { 
//        alert("Save Detail(maze):");
        for (const maze of a.all_maze??[]) alert_maze_info(maze);
    } catch (err) {alert('alert maze error: ' + err)}

    try { 
//        alert("Save Detail(guld):");
        for (const guld of a.all_guld??[]) alert_guld_info(guld);
    } catch (err) {alert('alert guld error: ' + err)}
}


export class C_SaveData implements I_JSON {
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

    public all_mvpt:  {[uid: string]: C_MovablePoint};
    public all_maze:  {[uid: string]: C_Maze};
    public all_team:  {[uid: string]: C_Team};
    public all_guld:  {[uid: string]: C_Guild};

    public constructor(a?: JSON_SaveData) {
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

        this.all_mvpt  = {};
        this.all_maze  = {};
        this.all_team  = {}
        this.all_guld  = {};

        if (a !== undefined) this.decode(a);
    }

    public static new(a?: JSON_SaveData): C_SaveData {
        return new C_SaveData(a);
    }

    public encode(): JSON_SaveData {
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

                all_mvpt:  this._encode_all_data(this.all_mvpt), 
                all_maze:  this._encode_all_data(this.all_maze), 
                all_team:  this._encode_all_data(this.all_team), 
                all_guld:  this._encode_all_data(this.all_guld),
            }
        } catch (err) {
            alert('SaveData Encode Error: ' + err);
            return {};
        }
    }
    protected _encode_all_data(all_data: {[uid:string]:I_JSON}): JSON_Any[] {
        const all_JSON: JSON_Any[] = [];
        for (let i in all_data) all_JSON.push(all_data[i].encode());
        return all_JSON;
    }

    public decode(s: JSON_SaveData): C_SaveData {
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

        if (s.all_mvpt  !== undefined) {
            this.all_mvpt = {};
            for (const json_mvpt of s.all_mvpt) {
                 const mvpt = (new C_MovablePoint()).decode(json_mvpt); 
                 this.all_mvpt[mvpt.uid()] = mvpt;
            }
        } 
        if (s.all_maze  !== undefined) {
            this.all_maze = {};
            for (const json_maze of s.all_maze) {
                 const maze = (new C_Maze()).decode(json_maze); 
                 this.all_maze[maze.uid()] = maze;
            }
        } 
        if (s.all_team  !== undefined) {
            this.all_team = {};
            for (const json_team of s.all_team) {
                 const team = (new C_Team()).decode(json_team); 
                 this.all_team[team.uid()] = team;
            }
        } 
        if (s.all_guld  !== undefined) {
            this.all_guld = {};
            for (const json_guld of s.all_guld) {
                const guld = (new C_Guild()).decode(json_guld); 
                this.all_guld[guld.uid()] = guld;
           }
        } 
        return this;
    }
    
    public alert(): void {
        alert("Save Info:" 
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
            + "\nmvpt_count: " + (this.all_mvpt?.length ?? '?')
            + "\nmaze_count: " + (this.all_maze?.length ?? '?')
            + "\nguld_count: " + (this.all_guld?.length ?? '?')
            + "\nteam_count: " + (this.all_team?.length ?? '?')
            + "\n"
        );
    }

    public alert_detail(): void {
        try { 
//            alert("Save Detail(mvpt):");
            for (const ii in this.all_mvpt) this.all_mvpt[ii].alert();
        } catch (err) {alert('alert mvpt error: ' + err)}
            
        try { 
//            alert("Save Detail(team):");
            for (const ii in this.all_team) this.all_team[ii].alert();
        } catch (err) {alert('alert team error: ' + err)}
            
        try { 
//            alert("Save Detail(maze):");
            for (const ii in this.all_maze) this.all_maze[ii].alert();
        } catch (err) {alert('alert maze error: ' + err)}
            
        try { 
//            alert("Save Detail(guld):");
            for (const ii in this.all_guld) this.all_guld[ii].alert();
        } catch (err) {alert('alert guld error: ' + err)}
            
    }
}
