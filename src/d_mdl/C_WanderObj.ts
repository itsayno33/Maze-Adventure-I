"use strict";

import { C_MazeObj, I_MazeObj, JSON_MazeObj } from "./C_MazeObj";

export interface JSON_WanderObj extends JSON_MazeObj {
    clname?:    string,
}

export class C_WanderObj  extends C_MazeObj implements I_MazeObj {
    public constructor(j?: JSON_MazeObj) {
        super(j);
        this.clname    = 'C_WanderObj';
        if (j !== undefined) this.decode(j);
    }
    public encode(): JSON_WanderObj {
        const j = super.encode();
        j.clname = this.clname;
        return j;
    }
    public decode(j: JSON_WanderObj): C_WanderObj {
        super.decode(j)
        if (j.clname !== undefined) this.clname    = j.clname;
        return this;
    }
}
