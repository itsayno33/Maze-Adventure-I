import { C_Maze, JSON_Maze  }  from "./C_Maze";
import { C_Team, JSON_Team  }  from "./C_Team";
import { C_Guild, JSON_Guild } from "./C_Guild";

type JSON_SaveData = {
    save_id?:   number,
    player_id?: number, 
    uniq_no?:   number,
    title?:     string,
    detail?:    string,
    scene?:     string,
    point?:     string,
    auto_mode?: string,
    is_active?: string,
    is_delete?: string
    save_time?: string,

    all_maze?:  JSON_Maze[],
    all_team?:  JSON_Team[],
    all_guld?:  JSON_Guild[],

    cur_maze?:  string,
    cur_team?:  string,
    cur_guld?:  string,
}

export function alert_save_info(a: JSON_SaveData|undefined): void {
    if (a === undefined) return;
    alert("Save Info:" 
        + "\nsave_id:   " + (a.save_id   ?? '?')
        + "\nplayer_id: " + (a.player_id ?? '?')
        + "\nuniq_no    " + (a.uniq_no   ?? '?')
        + "\ntitle:     " + (a.title     ?? '?')
        + "\ndetail:    " + (a.detail    ?? '?')
        + "\nscene:     " + (a.scene     ?? '?')
        + "\npoint:     " + (a.point     ?? '?')
        + "\nauto_mode: " + (a.auto_mode ?? '?')
        + "\nis_active: " + (a.is_active ?? '?')
        + "\nis_delete: " + (a.is_delete ?? '?')
        + "\n"
    );
}


export class C_SaveData {
    public save_id:   number;
    public player_id: number; 
    public uniq_no:   number;
    public title:     string;
    public detail:    string;
    public scene:     string;
    public point:     string;
    public auto_mode: boolean;
    public is_active: boolean;
    public is_delete: boolean;
    public save_time: Date;

    public all_maze:  C_Maze[];
    public all_team:  C_Team[];
    public all_guld:  C_Guild[];

    public cur_maze:  string;
    public cur_team:  string;
    public cur_guld:  string;

    public constructor(a?: JSON_SaveData) {
        this.save_id   = -1;
        this.player_id = -1; 
        this.uniq_no   = -1;
        this.title     = '';
        this.detail    = '';
        this.scene     = '';
        this.point     = '';
        this.auto_mode = false;
        this.is_active = true;
        this.is_delete = false;
        this.save_time = new Date();
    
        this.all_maze  = [];
        this.all_team  = [];
        this.all_guld  = [];
    
        this.cur_maze  = '';
        this.cur_team  = '';
        this.cur_guld  = '';

        if (a !== undefined) this.decode(a);
    }
    public encode(): JSON_SaveData {
        return {
            save_id:   this.save_id, 
            player_id: this.player_id,  
            uniq_no:   this.uniq_no, 
            title:     this.title, 
            detail:    this.detail, 
            scene:     this.scene, 
            point:     this.point, 
            auto_mode: this.auto_mode ? '1' : '0', 
            is_active: this.is_active ? '1' : '0', 
            is_delete: this.is_delete ? '1' : '0', 
            save_time: this.save_time.toISOString(), 
            all_maze:  C_Maze.encode_all(this.all_maze), 
            all_team:  C_Team.encode_all(this.all_team), 
            all_guld:  C_Guild.encode_all(this.all_guld),
            cur_maze:  this.cur_maze, 
            cur_team:  this.cur_team, 
            cur_guld:  this.cur_guld,
        }
    }
    public decode(s: JSON_SaveData): C_SaveData {
        this.save_id   = s.save_id   ?? this.save_id;
        this.player_id = s.player_id ?? this.player_id; 
        this.uniq_no   = s.uniq_no   ?? this.uniq_no;
        this.title     = s.title     ?? this.title;
        this.detail    = s.detail    ?? this.detail;
        this.scene     = s.scene     ?? this.scene;
        this.point     = s.point     ?? this.point;
        this.auto_mode = s.auto_mode != '0' ?? this.auto_mode;
        this.is_active = s.is_active != '0' ?? this.is_active;
        this.is_delete = s.is_delete != '0' ?? this.is_delete;
        if (s.save_time !== undefined) this.save_time = new Date(s.save_time);
        if (s.all_maze  !== undefined) this.all_maze = C_Maze.decode_all(s.all_maze); 
        if (s.all_team  !== undefined) this.all_team = C_Team.decode_all(s.all_team);
        if (s.all_guld  !== undefined) this.all_guld = C_Guild.decode_all(s.all_guld);
        this.cur_maze = s.cur_maze   ?? this.cur_maze;
        this.cur_team = s.cur_team   ?? this.cur_team;
        this.cur_guld = s.cur_guld   ?? this.cur_guld;
        return this;
    }
}
