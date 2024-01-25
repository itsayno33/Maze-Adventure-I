import { C_Maze, JSON_Maze  }  from "./C_Maze";
import { C_Team, JSON_Team  }  from "./C_Team";
import { C_Guild, JSON_Guild } from "./C_Guild";
import { C_Location, JSON_Location } from "./C_Location";

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

    location?:  JSON_Location,
    team_uid?:  string,

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
        + "\nteam_uid    " + (a.team_uid  ?? '?')
        + "\nloc_kind:   " + (a.location?.kind   ?? '?')
        + "\nloc_name:   " + (a.location?.name   ?? '?')
        + "\nloc_uid:    " + (a.location?.uid    ?? '?')
        + "\nmaze_count: " + (a.all_maze?.length ?? '?')
        + "\nguld_count: " + (a.all_guld?.length ?? '?')
        + "\nteam_count: " + (a.all_team?.length ?? '?')
        + "\n"
    );
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

    public team_uid:  string;
    public location:  C_Location;

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

        this.team_uid  = '';
        this.location  = new C_Location();

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
    
                team_uid:  this.team_uid,
                location:  this.location.encode(),
    
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
        this.auto_mode = s.auto_mode != '0' ?? this.auto_mode;
        this.is_active = s.is_active != '0' ?? this.is_active;
        this.is_delete = s.is_delete != '0' ?? this.is_delete; 
        if (s.save_time !== undefined) this.save_time = new Date(s.save_time); 

        if (s.team_uid !== undefined) this.team_uid = s.team_uid;
        if (s.location !== undefined) this.location = new C_Location(s.location);

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
                if (guld.myteam_uid in this.all_team) {
                    guld.myteam = this.all_team[guld.myteam_uid];
                }
                
                this.all_guld[guld.uid()] = guld;
           }
        } 
        return this;
    }
}
