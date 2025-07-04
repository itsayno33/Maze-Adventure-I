"use strict";

import { C_MazeObj, I_MazeObj, JSON_MazeObj } from './C_MazeObj';
import { C_MazeObjShadow, C_MazeObjShogai, JSON_MazeObjShadow, JSON_MazeObjShogai } from './C_MazeObjEtc';

function new_MazeObj(j: JSON_MazeObj|undefined): I_MazeObj {
    if (j === undefined) {
        return new C_MazeObj(j);
    }
    switch (j.clname) {
        case 'C_MazeObj':
            return new C_MazeObj(j);
        case 'C_MazeObjShadow':
            return new C_MazeObjShadow(j as JSON_MazeObjShadow);
        case 'C_MazeObjShogai':
            return new C_MazeObjShogai(j as JSON_MazeObjShogai);
        default:
            return new C_MazeObj(j);
    }
}



