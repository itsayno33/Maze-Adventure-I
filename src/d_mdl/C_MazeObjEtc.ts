"use strict";

import { C_MazeObj, I_MazeObj, JSON_MazeObj } from "./C_MazeObj";
import { JSON_PointDir } from "./C_PointDir";

export interface JSON_MazeObjShadow extends JSON_MazeObj {
    pos?:   JSON_PointDir,
}

export interface JSON_MazeObjShogai extends JSON_MazeObj {
    pos?:   JSON_PointDir,
}

export class C_MazeObjShadow extends C_MazeObj implements I_MazeObj {
    public constructor(j?: JSON_MazeObjShadow) {
        super(j);
        const jj = {
            clname:  this.constructor.name,
            can_thr: '1',
            h_w_dmg:  0,
            view: {
                layer:   2,
                letter: '影',
            },
        }
        this.decode(jj);
    }
}


export class C_MazeObjShogai extends C_MazeObj implements I_MazeObj {
    public constructor(j?: JSON_MazeObjShogai) {
        super(j);
        const jj = {
            clname:  this.constructor.name,
            can_thr: '0',
            h_w_dmg:  100,
            view: {
                layer:   2,
                letter: '障',
                show3D:  '1',
                col_2: '#9999cc', col_L: '#6666ff', 
            }
        }
        this.decode(jj);
    }
}
