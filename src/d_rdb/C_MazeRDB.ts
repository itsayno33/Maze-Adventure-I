// 利用クラス等の読み込み
import mysql from 'mysql2/promise';
import { C_DspMessage }      from '../d_utl/C_DspMessage'; // 画面メッセージの表示用クラス
import { C_Maze, JSON_Maze } from "../d_mdl/C_Maze";
import { C_MazeObjRDB }      from './C_MazeObjRDB';
import { C_MazeObj }         from '../d_mdl/C_MazeObj';

type db_connect = mysql.PoolConnection;

interface I_tbl_maze extends mysql.RowDataPacket {
    id:      number,
    save_id: number,
    uniq_id: string,
    name:    string, 
    size_x:  number,
    size_y:  number,
    size_z:  number,
    maps:    string,
    mask:    string,
}
interface I_lastInsert extends mysql.RowDataPacket {
    id: number;
}


export class C_MazeRDB {
    public constructor() {}


    public static async get_from_rdb_all(db_mai: db_connect, mes: C_DspMessage, save_id: number): Promise<C_Maze[]> {
        const maze_array = await C_MazeRDB.get_from_tbl_all(db_mai, mes, save_id);
        if (mes.is_err()) {
            return [];
        }

        for (const maze of maze_array) {
            const  obje_array =  await C_MazeObjRDB.get_from_rdb_all(db_mai, mes, save_id, maze.uid());
            if (mes.is_err()) {
                return [];
            }
            for (const obje of obje_array) maze.add_obj(obje);
        }

        return maze_array;
    }


    public static async set_to_rdb(db_mai: db_connect, mes: C_DspMessage, save_id: number, maze: C_Maze): Promise<boolean> {
        const mase_id = await C_MazeRDB.add_tbl(db_mai, mes, save_id, maze);
        if (mes.is_err()) {
            return false;
        }
        for (const obje of maze.get_obj_array()) {
            await C_MazeObjRDB.set_to_rdb(db_mai, mes, save_id, maze.uid(), obje as C_MazeObj);
            if (mes.is_err()) {
                return false;
            }
        }
        return true;
    }

    public static async del_to_rdb(db_mai: db_connect, mes: C_DspMessage, save_id: number, maze_uid: string): Promise<boolean> {
        await C_MazeObjRDB.del_to_rdb(db_mai, mes, save_id, maze_uid);
        if (mes.is_err()) {
            return false;
        }
        C_MazeRDB.del_tbl(db_mai, mes, save_id);
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
    ): Promise<C_Maze[]> {
        const get_maze_SQL = `
            SELECT 	id, save_id, uniq_id, name, 
                    size_x, size_y, size_z, maps, mask 
            FROM tbl_maze
            WHERE   save_id = :save_id
        `
        const [resultRecordSet] = await db_mai.query<I_tbl_maze[]>(get_maze_SQL, {save_id: save_id})
        .catch(err=>{
            mes.set_err_message(`SQLエラー 33: ${get_maze_SQL}`);
            return [];
        });
    
        if (resultRecordSet.length < 1) {
            return [];
        }
        const maze_array = [] as C_Maze[];
        for (const rr of resultRecordSet) {
            maze_array.push(new C_Maze(C_MazeRDB.from_stringArray_to_JSON(rr)));
        }
        return maze_array;
    }
    

    // DB処理。mazeテーブルに自身のデータを追加(insert)して
    // そのID(maze_id)を返す
    // 
    protected static async add_tbl(
            db_mai:  db_connect, 
            mes:     C_DspMessage, 
            save_id: number,
            maze:    C_Maze
        ): Promise<number> {

        const insert_maze_SQL = `
            INSERT INTO tbl_maze (
                save_id, uniq_id, name, 
                size_x, size_y, size_z, maps, mask
            )
            VALUES (
                :save_id, :uniq_id, :name, 
                :size_x, :size_y, :size_z, :maps, :mask 
            )
        `
        const j = maze.encode();
//Debug
/*
console.error(
       "save_id=" + save_id
    +", uniq_id=" + j.uniq_id
    +", name="    + j.name
    +", size_x="  + j.size_x
    +", size_y="  + j.size_y
    +", size_z="  + j.size_z
    +", maps="    + j.maze
    +", mask="    + j.mask
)
*/
        await db_mai.query(insert_maze_SQL, {
            save_id: save_id,
            uniq_id: j.uniq_id,
            name:    j.name,
            size_x:  j.size_x,
            size_y:  j.size_y,
            size_z:  j.size_z,
            maps:    j.maze,
            mask:    j.mask,
        })
        .catch(err=>{
            mes.set_err_message(`SQLエラー 3: ${insert_maze_SQL}`);
            return [];
        });
        return C_MazeRDB.lastInsert(db_mai, mes);
    }
    
    // tbl_teamで最後に追加した行番号(save_id)を返す【1行挿入専用】
    protected static async lastInsert(db_mai: db_connect, mes: C_DspMessage) : Promise<number> {
        const lastInsert_SQL =`
            SELECT LAST_INSERT_ID() as id FROM tbl_maze;
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
        const delete_maze_SQL = `
            DELETE FROM tbl_maze 
            WHERE  save_id = :save_id
        `
        await db_mai.query(delete_maze_SQL, {save_id: save_id})
        .catch ((err) => {
            mes.set_err_message(`SQLエラー 12: ${delete_maze_SQL} ` + err);
            return false;
        });
        return true;
    }

    public static from_stringArray_to_JSON(j: I_tbl_maze): JSON_Maze {
        return {
            id:      j.id,
            uniq_id: j.uniq_id,
            save_id: j.save_id,
            name:    j.name,
            size_x:  j.size_x,
            size_y:  j.size_y,
            size_z:  j.size_z,
            maze:    j.maps,
            mask:    j.mask,
//            objs:    JSON.parse(j.objs),
        };
    }
}
