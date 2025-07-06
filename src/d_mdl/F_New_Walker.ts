"use strict";

import { C_WndrWalker, JSON_WndrWalker } from "./C_WndrWalker";

export function new_walker(j?: JSON_WndrWalker): C_WndrWalker {
    // C_WndrWalkerのインスタンスを生成する
    // jはJSON_WndrWalker形式であることを期待する
    if (j === undefined) return new C_WndrWalker(j);
    switch (j?.clname??'') {
        case C_WndrWalker.constructor.name: new C_WndrWalker(j);
    }
    return new C_WndrWalker(j); // ここに到達することはないが、型の整合性のためにC_WndrWalkerを返す
}



