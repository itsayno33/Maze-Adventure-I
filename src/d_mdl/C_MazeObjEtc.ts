"use strict";

import { C_MazeObj, I_MazeObj, JSON_MazeObj } from "./C_MazeObj";

export interface JSON_MazeObjMono extends JSON_MazeObj {
    pos:   {x: number, y: number, z: number, d: number},
}

export interface JSON_MazeObjShogai extends JSON_MazeObj {
    pos:   {x: number, y: number, z: number, d: number},
}

export class C_MazeObjMono extends C_MazeObj implements I_MazeObj {
    public constructor(j?: JSON_MazeObjMono) {
        super(j);
        const jj = {
            clname:  this.constructor.name,
            can_thr: '1',
            h_w_dmg:  0,
            view: {
                layer:   2,
                letter: '物',
            },
        }
        this.__init(jj);
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
        this.__init(jj);
    }
}
