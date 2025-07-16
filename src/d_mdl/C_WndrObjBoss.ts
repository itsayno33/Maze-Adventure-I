"use strict";

import { JSON_MazeObj }               from "./C_MazeObj";
import { C_WndrObj, JSON_WndrObj }    from "./C_WndrObj";

export class C_WndrObjBoss2 extends C_WndrObj {
    public clname: string = 'C_WndrObjBoss2';

    public constructor(j?: JSON_WndrObj) {
        super(undefined);
        this.clname = 'C_WndrObjBoss2';

        // 特定の初期化処理が必要な場合はここに追加
        const new_j = {          // 中ボス設置
            pos:  j?.pos ??  {x:1, y:1, z:0, d:0}, // 位置は親の位置を引き継ぐ
            view: { // 配色は銀色
                layer: 0, letter: 'ボ', 
                show3D:  '1',
                pad_t: 0.1, pad_d: 0.0, pad_s: 0.3,
                col_f: '#B9C3C9', col_b: '#DCDDDD', col_s: '#9EACB3', col_t: '#DCDDDD', col_d: '#9EACB3', 
                col_l: '#9999ff', col_2: '#B9C3C9', col_L: '#6666ff', 
                col_2_arw: '#9EACB3', col_2_tri: '#DCDDDD',
            },
            walk: {
                cond: { canMove: '0', canSlid: "0", canUpDn: "0", canThru: "1" },
                loc_pos: j?.walk?.loc_pos ?? j?.pos ?? {x:1, y:1, z:0, d:0}, // 位置は親の位置を引き継ぐ
            },
            wres: [
                    {
                        boss_level: 2,
                        family:    '中ボス',
                    },
            ],
        } as JSON_WndrObj;
        this.__init(new_j);
    }
} 

export class C_WndrObjBoss3 extends C_WndrObj {
    public clname: string = 'C_WndrObjBoss3';

    public constructor(j?: JSON_MazeObj) {
        super();
        this.clname = 'C_WndrObjBoss3';

        // 特定の初期化処理が必要な場合はここに追加
        const new_json = {              // 大ボス設置
            pos:  j?.pos ?? {x:1, y:1, z:0, d:0}, // 位置は親の位置を引き継ぐ
            view: { // 配色は金色
                layer: 0, letter: 'ボ', 
                show3D:  '1',
                pad_t: 0.1, pad_d: 0.0, pad_s: 0.3,
                col_f: '#F5D100', col_b: '#BF9223', col_s: '#DBB300', col_t: '#F5D100', col_d: '#F5D100', 
                col_l: '#9999ff', col_2: '#F5D100', col_L: '#6666ff', 
                col_2_arw: '#BF9223', col_2_tri: '#F5D100',
            },

            walk: {
                cond: { canMove: '0', canSlid: "0", canUpDn: "0", canThru: "1" },
                loc_pos: j?.walk?.loc_pos ?? j?.pos ?? {x:1, y:1, z:0, d:0}, // 位置は親の位置を引き継ぐ
            },
            wres: [
                    {
                        boss_level: 3,
                        family:    '大ボス',
                    },
            ],
        } as JSON_WndrObj;

        this.__init(new_json);
    }
} 