"use strict";

import { _json_console } from "../d_utl/F_Utility";
import { JSON_MazeObj }               from "./C_MazeObj";
import { C_WndrObj, JSON_WndrObj }    from "./C_WndrObj";

export class C_WndrObjBoss2 extends C_WndrObj {
    public clname: string = 'C_WndrObjBoss2';

    public constructor(j?: JSON_WndrObj) {
        super(undefined);
        this.clname = 'C_WndrObjBoss2';
        if (j === undefined) return; // jが未定義の場合はViewやwalker等の初期化はしない

        // 特定の初期化処理が必要な場合はここに追加(__init()の処理はマスト)

        // WndrObjの基本情報を設定
        j.pos    ??= j.walk?.loc_pos ?? {x:1, y:1, z:0, d:0}; // 位置は親の位置を引き継ぐ

        // ビューの設定
        const new_view = {
                layer: 0, letter: 'ボ', 
                show3D:  '1',
                pad_t: 0.1, pad_d: 0.0, pad_s: 0.3,
                col_f: '#B9C3C9', col_b: '#DCDDDD', col_s: '#9EACB3', col_t: '#DCDDDD', col_d: '#9EACB3', 
                col_l: '#9999ff', col_2: '#B9C3C9', col_L: '#6666ff', 
                col_2_arw: '#9EACB3', col_2_tri: '#DCDDDD',
        } as {[key: string]: string | number | boolean | undefined};

        j.view ??= {};
        for (const key in new_view) {
            if (j.view[key] !== undefined) continue;
            j.view[key] = new_view[key];
        }

        // ウォークの設定
        const new_walk = {
                cond: { canMove: '0', canSlid: "0", canUpDn: "0", canThru: "1" },
                loc_pos: j?.walk?.loc_pos ?? j?.pos ?? {x:1, y:1, z:0, d:0}, // 位置は親の位置を引き継ぐ
        } as {[key: string]: any};

        j.walk ??= {};
        for (const key in new_walk) {
            if (j.walk[key] !== undefined) continue;
            j.walk[key] = new_walk[key];
        }

        // Wndrの設定
        const new_wres = [
            {
                boss_level: 2,
                family:    '中ボス',
            },
        ] as JSON_WndrObj[];

        j.wres ??= [];
        for (const new_wndr of new_wres) {
            if ((j.wres?.length ?? 4) > 3 ) break;
            j.wres.push(new_wndr);
        }

        this.__init(j);
    }

    public __init(j: JSON_WndrObj|undefined): C_WndrObjBoss2 {

        //_json_console(j, 'C_WndrObjBoss2.__init() json_output = '); // デバッグ用：初期化時にjの内容を出力
        super.__init(j);

        return this;
    }
}

export class C_WndrObjBoss3 extends C_WndrObj {
    public clname: string = 'C_WndrObjBoss3';

    public constructor(j?: JSON_MazeObj) {
        super(undefined);
        this.clname = 'C_WndrObjBoss3';
        if (j === undefined) return; // jが未定義の場合はViewやwalker等の初期化はしない

        // 特定の初期化処理が必要な場合はここに追加(__init()の処理はマスト)

        // WndrObjの基本情報を設定
        j.pos    ??= j.walk?.loc_pos ?? {x:1, y:1, z:0, d:0}; // 位置は親の位置を引き継ぐ

        // ビューの設定
        const new_view = {
                layer: 0, letter: 'ボ', 
                show3D:  '1',
                pad_t: 0.1, pad_d: 0.0, pad_s: 0.3,
                col_f: '#F5D100', col_b: '#BF9223', col_s: '#DBB300', col_t: '#F5D100', col_d: '#F5D100', 
                col_l: '#9999ff', col_2: '#F5D100', col_L: '#6666ff', 
                col_2_arw: '#BF9223', col_2_tri: '#F5D100',
        } as {[key: string]: string | number | boolean | undefined};

        j.view ??= {};
        for (const key in new_view) {
            if (j.view[key] !== undefined) continue;
            j.view[key] = new_view[key];
        }

        // ウォークの設定
        const new_walk = {
                cond: { canMove: '0', canSlid: "0", canUpDn: "0", canThru: "1" },
                loc_pos: j?.walk?.loc_pos ?? j?.pos ?? {x:1, y:1, z:0, d:0}, // 位置は親の位置を引き継ぐ
        } as {[key: string]: any};

        j.walk ??= {};
        for (const key in new_walk) {
            if (j.walk[key] !== undefined) continue;
            j.walk[key] = new_walk[key];
        }

        // Wndrの設定
        const new_wres = [
            {
                boss_level: 3,
                family:    '大ボス',
            },
        ] as JSON_WndrObj[];

        j.wres ??= [];
        for (const new_wndr of new_wres) {
            if ((j.wres?.length ?? 4) > 3 ) break;
            j.wres.push(new_wndr);
        }

        this.__init(j);
    }
    public __init(j: JSON_WndrObj|undefined): C_WndrObjBoss2 {

        //_json_console(j, 'C_WndrObjBoss2.__init() json_output = '); // デバッグ用：初期化時にjの内容を出力
        super.__init(j);

        return this;
    }
} 