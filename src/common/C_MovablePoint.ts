import { C_Location, JSON_Location } from "./C_Location";
import { I_JSON_Uniq }               from "./C_SaveData";
import { _get_uuid }                 from "./F_Rand";

export interface JSON_MovablePoint extends JSON_Location {
    uniq_id?:  string,
    cur_url?:  string,
    team_uid?: string,
}

export class C_MovablePoint extends C_Location implements I_JSON_Uniq {
    protected uniq_id:  string;
    protected cur_url:  string;
    protected team_uid: string|undefined;
    public constructor(json?: JSON_MovablePoint) {
        super(json);
        this.uniq_id  = 'MvPoint#' + _get_uuid();
        this.cur_url  = '';
        this.team_uid = undefined;

        if (json !== undefined) this.decode(json);
    }
    public uid(): string { return this.uniq_id}
    public url(): string { return this.cur_url}
    public tid(): string|undefined { return this.team_uid}

    public set_url(url: string): void { this.cur_url  = url;}
    public set_tid(tid: string): void { this.team_uid = tid;}

    public encode(): JSON_MovablePoint {
        const j = super.encode() as JSON_MovablePoint;
        j.uniq_id  = this.uniq_id;
        j.cur_url  = this.cur_url;
        j.team_uid = this.team_uid ?? '';
        return j;
    }
    public decode(j: JSON_MovablePoint): C_MovablePoint {
        super.decode(j);
        if (j.uniq_id  !== undefined) this.uniq_id  = j.uniq_id;
        if (j.cur_url  !== undefined) this.cur_url  = j.cur_url;
        if (j.team_uid !== undefined) this.team_uid = j.team_uid;

        if (this.team_uid == '') this.team_uid = undefined;
        return this;
    }
}
