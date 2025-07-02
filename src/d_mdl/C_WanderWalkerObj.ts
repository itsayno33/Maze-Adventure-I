"use strict";

import { C_MazeObj, I_MazeObj, JSON_MazeObj } from "./C_MazeObj";
import { C_WanderWalker, JSON_WanderWalker  } from "./C_WanderWalker";

export interface JSON_WanderWalkerObj extends JSON_MazeObj {
    clname?:    string,
    walker?:    JSON_WanderWalker,
}

export class C_WanderWalkerObj  extends C_MazeObj implements I_MazeObj {
    private my_walker: C_WanderWalker;

    public constructor(walker: C_WanderWalker, j?: JSON_MazeObj) {
        super(j);
        this.clname    = 'C_WanderWalkerObj';
        this.my_walker = walker;
        if (j !== undefined) this.decode(j);
    }

    public getWalker(): C_WanderWalker {
        return this.my_walker;
    }

    public getPos(): {x: number, y: number, z: number} {
        return this.my_walker.get_pd().get_p();
    }

    public encode(): JSON_WanderWalkerObj {
        const j = super.encode();
        j.clname = this.clname;
        j.walker = this.my_walker.encode();
        return j;
    }
    public decode(j: JSON_WanderWalkerObj): C_WanderWalkerObj {
        super.decode(j)
        if (j.clname !== undefined) this.clname    = j.clname;
        if (j.walker !== undefined) this.my_walker = new C_WanderWalker(j.walker);
        return this;
    }
}
