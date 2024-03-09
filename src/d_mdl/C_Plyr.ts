"use strict";

import { C_MovablePoint } from './C_MovablePoint';
import { _get_uuid }      from '../d_utl/F_Rand';
export class C_Plyr {
    public    pid:      number;
    public    name:     string;
    public    cur_url:  string;
    public    cur_team: string; /* team_uid */
    protected mvp:  {[uid: string]: C_MovablePoint};
    public constructor() {
        this.pid      = -1;
        this.name     = '';
        this.cur_url  = '';
        this.cur_team = '';
        this.mvp      = {};
    }
}
