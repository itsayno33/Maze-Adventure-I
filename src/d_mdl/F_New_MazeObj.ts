"use strict";

import { 
    C_MazeObj, 
    I_MazeObj, 
    JSON_MazeObj 
} from "./C_MazeObj";

import { 
    C_MazeObjShadow, 
    C_MazeObjShogai, 
    JSON_MazeObjShadow, 
    JSON_MazeObjShogai 
}   from './C_MazeObjEtc';

import { C_WndrObj, JSON_WndrObj } from "./C_WndrObj";
import { C_WndrObjBoss2, C_WndrObjBoss3 } from "./C_WndrObjBoss";

export function new_mazeObj(j: JSON_MazeObj|undefined): I_MazeObj {
    // C_MazeObjのインスタンスを生成する
    // jはJSON_MazeObj形式であることを期待する
    if (j === undefined)  return new C_MazeObj(j);

    switch (j.clname) {
        case 'C_MazeObj'      : return new C_MazeObj(j);
        case 'C_WndrObj'      : return new C_WndrObj      (j as JSON_WndrObj);
        case 'C_WndrObjBoss2' : return new C_WndrObjBoss2 (j as JSON_WndrObj);
        case 'C_WndrObjBoss3' : return new C_WndrObjBoss3 (j as JSON_WndrObj);
        case 'C_MazeObjShadow': return new C_MazeObjShadow(j as JSON_MazeObjShadow);
        case 'C_MazeObjShogai': return new C_MazeObjShogai(j as JSON_MazeObjShogai);
        default: return new C_MazeObj(j); // C_TeamやC_MazeCell系の場合等
    }
}

