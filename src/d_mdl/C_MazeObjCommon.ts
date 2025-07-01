"use strict";

import { C_MazeObj, I_MazeObj, JSON_MazeObj } from './C_MazeObj';
import { C_MazeObjMono, C_MazeObjShogai, JSON_MazeObjMono, JSON_MazeObjShogai } from './C_MazeObjEtc';

export function new_MazeObj(j: JSON_MazeObj|undefined): I_MazeObj {
    if (j === undefined) {
        return new C_MazeObj(j);
    }
    switch (j.clname) {
        case 'C_MazeObj':
            return new C_MazeObj(j);
        case 'C_MazeObjMono':
            return new C_MazeObjMono(j as JSON_MazeObjMono);
        case 'C_MazeObjShogai':
            return new C_MazeObjShogai(j as JSON_MazeObjShogai);
        default:
            return new C_MazeObj(j);
    }
}



