"use strict";

import { C_WanderWalker, JSON_WanderWalker } from "./C_WanderWalker";

export function new_walker(j?: JSON_WanderWalker): C_WanderWalker {
    // C_WanderWalkerのインスタンスを生成する
    // jはJSON_WanderWalker形式であることを期待する
    if (j === undefined) return new C_WanderWalker(j);
    switch (j?.clname??'') {
        case C_WanderWalker.constructor.name: new C_WanderWalker(j);
    }
    return new C_WanderWalker(j); // ここに到達することはないが、型の整合性のためにC_WanderWalkerを返す
}



