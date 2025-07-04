// 利用クラス等の読み込み
import mysql from 'mysql2/promise';
import { C_DspMessage }      from '../d_utl/C_DspMessage'; // 画面メッセージの表示用クラス
import { C_MazeObj, I_MazeObj, JSON_MazeObj }         from '../d_mdl/C_MazeObj';

type db_connect = mysql.PoolConnection;

interface I_tbl_obje extends mysql.RowDataPacket {
    id:          number,
    save_id:     number,
    uniq_id:     string,
    maze_uid:    string,  // マップのユニークID
    cl_name:     string,  // クラス名
    pos_x:       number,  // X座標
    pos_y:       number,  // y座標
    pos_z:       number,  // z座標
    pos_d:       number,  // 向き(0:N, 1:E, 2:S, 3:W, 99:X)
    view:        string,  // C_MazeObjViewクラスの初期値
    wdwalk:      string,  // C_MazeObjクラスの初期値
    stat:        string,  // C_MazeObjクラスの初期値
  }
interface I_lastInsert extends mysql.RowDataPacket {
    id: number;
}


export class C_MazeObjRDB {
    public constructor() {}


    public static async get_from_rdb_all(
        db_mai:   db_connect,
        mes:      C_DspMessage, 
        save_id:  number,
        join_uid: string
    ): Promise<C_MazeObj[]> {
        const obje_array = await C_MazeObjRDB.get_from_tbl_all(db_mai, mes, save_id, join_uid);
        if (mes.is_err()) {
            return [];
        }
        return obje_array;
    }


    public static async set_to_rdb(
        db_mai: db_connect, 
        mes: C_DspMessage, 
        save_id: number, 
        maze_uid: string, 
        obje: I_MazeObj
    ): Promise<boolean> {
        const mase_id = await C_MazeObjRDB.add_tbl(db_mai, mes, save_id, maze_uid, obje);
        if (mes.is_err()) {
            return false;
        }
        return true;
    }


    public static async del_to_rdb_all(db_mai: db_connect, mes: C_DspMessage, save_id: number): Promise<boolean> {
        const rslt = await C_MazeObjRDB.del_tbl_all(db_mai, mes, save_id);
        if (mes.is_err()) {
            return false;
        }
        return true;
    }

    
    public static async del_to_rdb(db_mai: db_connect, mes: C_DspMessage, save_id: number, maze_uid: string): Promise<boolean> {
        C_MazeObjRDB.del_tbl(db_mai, mes, save_id, maze_uid);
        if (mes.is_err()) {
            return false;
        }
        return true;
    }
    

    // DB処理。save_idで指定されたmazeレコードセットを読み込み
    // MazeObjクラスの配列にセットする
    // 
    protected static async get_from_tbl_all(
            db_mai:   db_connect, 
            mes:      C_DspMessage, 
            save_id:  number,
            maze_uid: string
    ): Promise<C_MazeObj[]> {
        const get_obje_SQL = `
            SELECT 	id,       save_id,  uniq_id, 
                    maze_uid, cl_name, 
                    pos_x,    pos_y,    pos_z,   pos_d, 
                    view,     walker,   stat 
            FROM tbl_obje
            WHERE   save_id = :save_id AND maze_uid = :maze_uid
        `
        const [resultRecordSet] = await db_mai.query<I_tbl_obje[]>(get_obje_SQL, {save_id: save_id, maze_uid: maze_uid})
        .catch(err=>{
            mes.set_err_message(`SQLエラー 33: ${get_obje_SQL}`);
            return [];
        });
    
        if (resultRecordSet.length < 1) {
            return [];
        }
        const obje_array = [] as C_MazeObj[];
        for (const rr of resultRecordSet) {
            obje_array.push(new C_MazeObj(C_MazeObjRDB.from_stringArray_to_JSON(rr)));
        }
        return obje_array;
    }
    

    // DB処理。mazeテーブルに自身のデータを追加(insert)して
    // そのID(maze_id)を返す
    // 
    protected static async add_tbl(
            db_mai:   db_connect, 
            mes:      C_DspMessage, 
            save_id:  number,
            maze_uid: string,
            obje:     I_MazeObj
        ): Promise<number> {

        const insert_obje_SQL = `
            INSERT INTO tbl_obje(
                save_id,  uniq_id, maze_uid, cl_name, 
                pos_x,    pos_y,   pos_z,    pos_d, 
                view,     walker,  stat 
            )
            VALUES (
                :save_id,  :uniq_id, :maze_uid, :cl_name, 
                :pos_x,    :pos_y,   :pos_z,    :pos_d, 
                :view,     :walker,  :stat 
            )
        `
        const j    = obje.encode();
        j.wdwalk ??= {};

        //Debug
/***************************/
    console.log("C_MazeObjRDB: add_tbl() called:");
    for (const key in j) console.warn(`: ${key} = ` + JSON?.stringify(j[key]));
/****************************/

/********************
    // SQLにセットする値を指定
    const stat = {
        can_thr:   j.can_thr ? '1' : '0', // C_MazeObjの初期値
        h_w_dmg:   j.h_w_dmg,             // C_MazeObjの初期値
    }
********************/

    await db_mai.query(insert_obje_SQL, {
            save_id:     save_id,
            uniq_id:     j.uniq_id,
            maze_uid:    maze_uid,
            cl_name:     j.clname,
            pos_x:       j.pos?.x??0,
            pos_y:       j.pos?.y??0,
            pos_z:       j.pos?.z??0,
            pos_d:       j.pos?.d??0,
            view:        JSON?.stringify(j.view)??"{}",
            walker:      JSON?.stringify(j.wdwalk)??"{}", // C_MazeObjの初期値
            stat:        JSON?.stringify(j.stat)??"{}",
        })
        .catch(err=>{
            mes.set_err_message(`SQLエラー 3: ${insert_obje_SQL}`);
            return [];
        });
        return C_MazeObjRDB.lastInsert(db_mai, mes);
    }
    
    // tbl_teamで最後に追加した行番号(save_id)を返す【1行挿入専用】
    protected static async lastInsert(db_mai: db_connect, mes: C_DspMessage) : Promise<number> {
        const lastInsert_SQL =`
            SELECT LAST_INSERT_ID() as id FROM tbl_obje;
        `
        const [recordSet] = await db_mai.query<I_lastInsert[]>(lastInsert_SQL)
        .catch ((err) => {
            mes.set_err_message(`SQLエラー 500: ${lastInsert_SQL} ` + err);
            return [];
        });
        if (recordSet.length < 1) return -1;
        return recordSet[0].id;
    }


// DB処理。save_idで指定されたレコード(複数)を削除(delete)する
    // 
    public static async del_tbl_all(db_mai: db_connect, mes: C_DspMessage, save_id: number): Promise<boolean> {
        const delete_obje_SQL = `
            DELETE FROM tbl_obje 
            WHERE  save_id = :save_id 
        `
        await db_mai.query(delete_obje_SQL,{save_id: save_id})
        .catch ((err) => {
            mes.set_err_message(`SQLエラー 17: ${delete_obje_SQL} ` + err);
            return false;
        });
        return true;
    }

    // DB処理。save_idで指定されたレコード(単数)を削除(delete)する
    // 
    public static async del_tbl(db_mai: db_connect, mes: C_DspMessage, save_id: number, maze_uid: string): Promise<boolean> {
        const delete_obje_SQL = `
            DELETE FROM tbl_obje 
            WHERE  save_id = :save_id AND maze_uid = :maze_uid
        `
        await db_mai.query(delete_obje_SQL, {save_id: save_id, maze_uid: maze_uid})
        .catch ((err) => {
            mes.set_err_message(`SQLエラー 12: ${delete_obje_SQL} ` + err);
            return false;
        });
        return true;
    }

    public static from_stringArray_to_JSON(j: I_tbl_obje): JSON_MazeObj {
        const jj = JSON.parse(j.stat??'{}') as any; // C_MazeObjの初期値
        return {
                clname:    j.cl_name,
                uniq_id:   j.uniq_id, 
                maze_uid:  j.maze_uid,
                pos:       {x: j.pos_x, y: j.pos_y, z: j.pos_z, d: j.pos_d},
                view:      JSON.parse(j.view??'{}')   as any, // C_MazeObjViewの初期値
                walker:    JSON.parse(j.wdwalk??'{}') as any, // C_MazeObjの初期値
                stat:      JSON.parse(j.stat??'{}')   as any, // C_MazeObjの初期値
                can_thr:   jj.can_thr ?? '1',                 // C_MazeObjの初期値
                h_w_dmg:   jj.h_w_dmg ?? 0,                   // C_MazeObjの初期値
            };
    }
}
