import { C_Location, JSON_Location } from "./C_Location";
import { I_JSON_Uniq }               from "./C_SaveData";
import { _get_uuid }                 from "./F_Rand";

export interface JSON_MovablePoint extends JSON_Location {
    uniq_id?:  string,
    cur_url?:  string,
    team_uid?: string,
}


export function alert_mvpt_info(a: JSON_MovablePoint|undefined): void {
    if (a === undefined) return;
    alert("MvPt Info:" 
        + "\nuniq_id:  "  + (a.uniq_id    ?? '?')
        + "\ncur_url:  "  + (a.cur_url    ?? '?')
        + "\nteam_uid: "  + (a.team_uid   ?? '?')
        + "\nlckd: "      + (a.kind       ?? '?')
        + "\nlcnm: "      + (a.name       ?? '?')
        + "\nlcid: "      + (a.loc_uid    ?? '?')
        + "\ncur_x: "     + (a.loc_pos?.x ?? '?')
        + "\ncur_y: "     + (a.loc_pos?.y ?? '?')
        + "\ncur_z: "     + (a.loc_pos?.z ?? '?')
        + "\ncur_d: "     + (a.loc_pos?.d ?? '?')
        + "\n"
    );
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

    public new_uid(): void {this.uniq_id = 'MvPoint#' + _get_uuid();}
    public set_url(url: string): void { this.cur_url  = url;}
    public set_tid(tid: string): void { this.team_uid = tid;}

    public clone(): C_MovablePoint {
        const mvpt = new C_MovablePoint(this.encode());
        mvpt.new_uid();
        return mvpt;
    }

    public fromJSON(txt: string): C_MovablePoint {
        try {
            const j = JSON.parse(txt) as JSON_MovablePoint;
            return this.decode(j);
        } catch (err) {
            return this;
        };
    }
    public toJSON(): string {
        return JSON.stringify(this.encode(), null, "\t");
    }

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
