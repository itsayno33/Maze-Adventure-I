"use strict";

import { C_Maze, JSON_Maze, alert_maze_info  }  from "./C_Maze";
import { C_Guild, JSON_Guild, alert_guld_info } from "./C_Guild";
import { C_MovablePoint, JSON_MovablePoint, alert_mvpt_info } from "./C_MovablePoint";
import { C_Team, JSON_Team, alert_team_info  }  from "./C_Team";
import { C_SaveInfo, I_JSON, JSON_Any, JSON_SaveInfo } from "./C_SaveInfo";

export interface JSON_SaveData extends JSON_SaveInfo {
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


export class C_SaveData extends C_SaveInfo implements I_JSON {

/*
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
*/

    public all_mvpt:  {[uid: string]: C_MovablePoint};
    public all_maze:  {[uid: string]: C_Maze};
    public all_team:  {[uid: string]: C_Team};
    public all_guld:  {[uid: string]: C_Guild};

    public constructor(a?: JSON_SaveData) {
        super(a);

        this.all_mvpt  = {};
        this.all_maze  = {};
        this.all_team  = {}
        this.all_guld  = {};

        if (a !== undefined) this.__init(a);
    }
    protected __init(s: JSON_SaveData): C_SaveData {
        super.__init(s);

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

    public static new(a?: JSON_SaveData): C_SaveData {
        return new C_SaveData(a);
    }

    public encode(): JSON_SaveData {
        let save_date: string;
        try {
            const save_data    = super.encode() as JSON_SaveData;

            save_data.all_mvpt = this._encode_all_data(this.all_mvpt); 
            save_data.all_maze = this._encode_all_data(this.all_maze); 
            save_data.all_team = this._encode_all_data(this.all_team); 
            save_data.all_guld = this._encode_all_data(this.all_guld);
            return save_data;
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
        return this.__init(s);
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
