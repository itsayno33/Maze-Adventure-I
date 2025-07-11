"use strict";

import { JSON_Any } from "../d_mdl/C_SaveInfo";

// ブラウザやnode.jsでJSONファイルを出力(console)
export function _json_output(j: JSON_Any, title: string = '************\n'): void {
    _json_console(j, title);
}

export function _json_console(j: any, title: string = '************\n'): void {
    console.log(title);
    console.log(_json_to_str(j)); // タブ整形ありで出力
}

// ブラウザでJSONファイルを出力(alert)
export function _json_alert(j: any, title: string = '************\n'): void {
    alert(`${title} = ${_json_to_str(j)}`); // タブ整形ありで出力
}

// JSONを文字列に変換（第二引数：true=>タブ整形あり、false=>タブ整形無し）
export function _json_to_str(j: any, tab?:string): string {
    if (tab === undefined) {
        return JSON.stringify(j, null, '\t'); // タブ整形あり
    } else {
        return JSON.stringify(j, null, tab); // タブ整形無し
    }
}
