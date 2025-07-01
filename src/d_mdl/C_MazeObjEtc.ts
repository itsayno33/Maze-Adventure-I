"use strict";

import { C_MazeObj, I_MazeObj, JSON_MazeObj } from "./C_MazeObj";

export interface JSON_MazeObjMono extends JSON_MazeObj {}

export class C_MazeObjMono extends C_MazeObj implements I_MazeObj {
    public constructor(j?: JSON_MazeObjMono|undefined) {
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

