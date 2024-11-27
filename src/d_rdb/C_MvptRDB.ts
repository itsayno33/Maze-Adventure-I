// 利用クラス等の読み込み
import mysql from 'mysql2/promise';
import { C_DspMessage }      from '../d_utl/C_DspMessage'; // 画面メッセージの表示用クラス
import { C_MovablePoint, JSON_MovablePoint } from '../d_mdl/C_MovablePoint';

type db_connect = mysql.PoolConnection;

interface I_tbl_mvpt extends mysql.RowDataPacket {
    id:          number,
    save_id:     number,
    uniq_id:     string,
    cur_url:     string,
    team_uid:    string,
    loc_kind:    string, /* Unkn:0, Maze:1, Guld:2 */
    loc_name:    string,
    loc_uid:     string,
    loc_pos_x:   number,
    loc_pos_y:   number,
    loc_pos_z:   number,
    loc_pos_d:   number, /* N:0, E:1, S:2, W:3 X:99 */
  }
interface I_lastInsert extends mysql.RowDataPacket {
    id: number;
}


export class C_MvptRDB {
    public constructor() {}


    public static async get_from_rdb_all(db_mai: db_connect, mes: C_DspMessage, save_id: number): Promise<C_MovablePoint[]> {
        const mvpt_array = await C_MvptRDB.get_from_tbl_all(db_mai, mes, save_id);
        if (mes.is_err()) {
            return [];
        }
        return mvpt_array;
    }


    public static async set_to_rdb(db_mai: db_connect, mes: C_DspMessage, save_id: number, mvpt: C_MovablePoint): Promise<boolean> {
        const mase_id = await C_MvptRDB.add_tbl(db_mai, mes, save_id, mvpt);
        if (mes.is_err()) {
            return false;
        }
        return true;
    }

    
    public static async del_to_rdb(db_mai: db_connect, mes: C_DspMessage, save_id: number): Promise<boolean> {
        C_MvptRDB.del_tbl(db_mai, mes, save_id);
        if (mes.is_err()) {
            return false;
        }
        return true;
    }



    // DB処理。save_idで指定されたmazeレコードセットを読み込み
    // Mazeクラスの配列にセットする
    // 
    protected static async get_from_tbl_all(
            db_mai: db_connect, 
            mes: C_DspMessage, 
            save_id: number
    ): Promise<C_MovablePoint[]> {
        const get_mvpt_SQL = `
            SELECT 	    id, save_id, uniq_id, cur_url, team_uid,
                        loc_kind,  loc_name,  loc_uid,
                        loc_pos_x, loc_pos_y, loc_pos_z, loc_pos_d
            FROM tbl_mvpt
            WHERE   save_id = :save_id
        `
        const [resultRecordSet] = await db_mai.query<I_tbl_mvpt[]>(get_mvpt_SQL, {save_id: save_id})
        .catch(err=>{
            mes.set_err_message(`SQLエラー 33: ${get_mvpt_SQL}`);
            return [];
        });
    
        if (resultRecordSet.length < 1) {
            return [];
        }
        const mvpt_array = [] as C_MovablePoint[];
        for (const rr of resultRecordSet) {
            mvpt_array.push(new C_MovablePoint(C_MvptRDB.from_stringArray_to_JSON(rr)));
        }
        return mvpt_array;
    }
    

    // DB処理。mazeテーブルに自身のデータを追加(insert)して
    // そのID(maze_id)を返す
    // 
    protected static async add_tbl(
            db_mai:  db_connect, 
            mes:     C_DspMessage, 
            save_id: number,
            mvpt:    C_MovablePoint
        ): Promise<number> {

        const insert_mvpt_SQL = `
            INSERT INTO tbl_mvpt(
                save_id,    uniq_id,    cur_url,    team_uid,
                loc_kind,   loc_name,   loc_uid,
                loc_pos_x,  loc_pos_y,  loc_pos_z,  loc_pos_d
            )
            VALUES (
                :save_id,   :uniq_id,   :cur_url,   :team_uid,
                :loc_kind,  :loc_name,  :loc_uid,
                :loc_pos_x, :loc_pos_y, :loc_pos_z, :loc_pos_d 
            )
        `
        const j = mvpt.encode();
//Debug
/*
console.error(
        "save_id="   +    save_id
    + ", uniq_id="   +    j.uniq_id
    + ", cur_url="   +    j.cur_url
    + ", team_uid="  +    j.team_uid
    + ", loc_kind="  +    j.kind
    + ", loc_name="  +    j.name
    + ", loc_uid="   +    j.loc_uid
    + ", loc_pos_x=" +   (j.loc_pos?.x??0)
    + ", loc_pos_y=" +   (j.loc_pos?.y??0)
    + ", loc_pos_z=" +   (j.loc_pos?.z??0)
    + ", loc_pos_d=" +   (j.loc_pos?.d??0)
)
*/
await db_mai.query(insert_mvpt_SQL, {
            save_id:     save_id,
            uniq_id:     j.uniq_id,
            cur_url:     j.cur_url,
            team_uid:    j.team_uid,
            loc_kind:    j.kind,
            loc_name:    j.name,
            loc_uid:     j.loc_uid,
            loc_pos_x:   j.loc_pos?.x??0,
            loc_pos_y:   j.loc_pos?.y??0,
            loc_pos_z:   j.loc_pos?.z??0,
            loc_pos_d:   j.loc_pos?.d??99,
        })
        .catch(err=>{
            mes.set_err_message(`SQLエラー 3: ${insert_mvpt_SQL}`);
            return [];
        });
        return C_MvptRDB.lastInsert(db_mai, mes);
    }
    
    // tbl_teamで最後に追加した行番号(save_id)を返す【1行挿入専用】
    protected static async lastInsert(db_mai: db_connect, mes: C_DspMessage) : Promise<number> {
        const lastInsert_SQL =`
            SELECT LAST_INSERT_ID() as id FROM tbl_mvpt;
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
    public static async del_tbl(db_mai: db_connect, mes: C_DspMessage, save_id: number): Promise<boolean> {
        const delete_mvpt_SQL = `
            DELETE FROM tbl_mvpt 
            WHERE  save_id = :save_id
        `
        await db_mai.query(delete_mvpt_SQL, {save_id: save_id})
        .catch ((err) => {
            mes.set_err_message(`SQLエラー 12: ${delete_mvpt_SQL} ` + err);
            return false;
        });
        return true;
    }

    public static from_stringArray_to_JSON(j: I_tbl_mvpt): JSON_MovablePoint {
        return {
            uniq_id:     j.uniq_id,
            cur_url:     j.cur_url,
            team_uid:    j.team_uid,
            kind:        j.loc_kind,
            name:        j.loc_name,
            loc_uid:     j.loc_uid,
            loc_pos: {
                x:       j.loc_pos_x??0,
                y:       j.loc_pos_y??0,
                z:       j.loc_pos_z??0,
                d:       j.loc_pos_d??99,
            }
        };
    }
}
