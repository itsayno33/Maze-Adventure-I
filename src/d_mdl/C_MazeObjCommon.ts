"use strict";

import { C_MazeObj, I_MazeObj, JSON_MazeObj } from './C_MazeObj';
import { C_MazeObjMono } from './C_MazeObjEtc';

export function new_MazeObj(j: JSON_MazeObj|undefined): I_MazeObj {
    if (j === undefined) {
        return new C_MazeObj(j);
    }
    switch (j.clname) {
        case 'C_MazeObj':
            return new C_MazeObj(j);
        case 'C_MazeObjMono':
            return new C_MazeObjMono(j);
        default:
            return new C_MazeObj(j);
    }
}



