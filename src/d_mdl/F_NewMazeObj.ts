"use strict";

import { C_MazeObj, I_MazeObj, JSON_MazeObj } from "./C_MazeObj";
import { C_MazeObjShadow, C_MazeObjShogai, JSON_MazeObjShadow, JSON_MazeObjShogai }   from './C_MazeObjEtc';
import { C_WanderObj, JSON_WanderObj }                        from "./C_WanderObj";

export function new_mazeObj(j: JSON_MazeObj|undefined): I_MazeObj {
    // C_MazeObjのインスタンスを生成する
    // jはJSON_MazeObj形式であることを期待する
    if (j === undefined)  return new C_MazeObj(j);

    switch (j.clname) {
        case C_MazeObj      .constructor.name: return new C_MazeObj(j);
        case C_WanderObj    .constructor.name: return new C_WanderObj    (j as JSON_WanderObj);
        case C_MazeObjShadow.constructor.name: return new C_MazeObjShadow(j as JSON_MazeObjShadow);
        case C_MazeObjShogai.constructor.name: return new C_MazeObjShogai(j as JSON_MazeObjShogai);
        default: return new C_MazeObj(j); // C_TeamやC_MazeCell系の場合等
    }
}

