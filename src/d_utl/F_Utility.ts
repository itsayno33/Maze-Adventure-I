"use strict";

import { JSON_Any } from "../d_mdl/C_SaveInfo";

// ブラウザやnode.jsでJSONファイルを出力
export function _json_output(j: JSON_Any, title: string = '************\n'): void {
    console.log(title);
    console.log(_json_to_str(j)); // タブ整形ありで出力
}

// JSONを文字列に変換（第二引数：true=>タブ整形あり、false=>タブ整形無し）
export function _json_to_str(j: JSON_Any, tab?:string): string {
    if (tab === undefined) {
        return JSON.stringify(j, null, '\t'); // タブ整形あり
    } else {
        return JSON.stringify(j, null, tab); // タブ整形無し
    }
}
