
// 利用クラス等の読み込み
import   mysql            from "mysql2/promise";
import { C_DspMessage }   from '../../../mai/src/d_utl/C_DspMessage'; // 画面メッセージの表示用クラス
import { C_SaveData }     from "../../../mai/src/d_mdl/C_SaveData";
import { C_SaveInfo }     from "../../../mai/src/d_mdl/C_SaveInfo";
import { C_MovablePoint } from "../../../mai/src/d_mdl/C_MovablePoint";
import { C_TeamRDB }      from "./C_TeamRDB";
import { C_HeroRDB }      from "./C_HeroRDB";
import { C_MazeRDB }      from "./C_MazeRDB";
import { C_GuildRDB }     from "./C_GuildRDB";
import { C_MvptRDB } from "./C_MvptRDB";

type db_connect = mysql.PoolConnection;

interface I_tbl_SaveInfo extends mysql.RowDataPacket {
    save_id:   number;
    player_id: number;
    uniq_no:   number; 
    title:     string; 
    detail:    string; 
    point:     string; 
    auto_mode: string; 
    is_active: string; 
    is_delete: string; 
    mp:        string;  // mypos
    save_time: string;
}
interface I_tbl_SaveData extends mysql.RowDataPacket  {
    save_id:   number;
    player_id: number;
    uniq_no:   number; 
    title:     string; 
    detail:    string; 
    point:     string; 
    auto_mode: string; 
    is_active: string; 
    is_delete: string; 
    mp:        string;  // mypos
    save_time: string;
//    mvpt:      string;  // all_mvpt
}
interface I_tbl_SaveId   extends mysql.RowDataPacket {
    save_id: number;
}
interface I_lastInsert   extends mysql.RowDataPacket {
    id: number;
}

export class C_SaveInfoRDB {
    // DB処理。player_dに該当するセーブデータをDBから読み込み
    // SaveInfo[]の配列を返す
    // 非活性データや削除済データはスキップする
    // 
    public static async get_list_by_pid(db_mai: db_connect, mes: C_DspMessage, player_id: number): Promise<C_SaveInfo[]> {
        const get_save_SQL = `
            SELECT save_id, player_id, uniq_no, title, detail, point, 
                    auto_mode, is_active, is_delete, 
                    mypos as mp, 
                    DATE_FORMAT(save_time,'%Y-%m-%dT%H:%i:%s.%fZ') AS save_time
            FROM   tbl_save
            WHERE  player_id = :player_id 
            ORDER  BY title COLLATE utf8mb4_unicode_ci ASC
        `
        const [recordSet] = await db_mai.query<I_tbl_SaveInfo[]>(get_save_SQL, {player_id: player_id})
        .catch ((err) => {
            mes.set_err_message(`SQLエラー 50: ${get_save_SQL} ` + err);
            return [];
        });
        if (recordSet.length < 1) return [];

        const save_data_set: C_SaveInfo[] = [];
        for (const ii in recordSet) {
            if (recordSet[ii].is_active == '0') continue;
            if (recordSet[ii].is_delete != '0') continue;

            const save = new C_SaveInfo(recordSet[ii]);
            save.mypos     = C_MovablePoint.from_string_to_obj(recordSet[ii].mp)
    
            save_data_set.push(save);
        }
        return save_data_set;
    }


    // DB処理。ユニーク・ナンバーからsave_idを得る。該当するレコードが無ければ戻り値で-1を返す
    // 
    public static async get_save_id_at_tbl(db_mai: db_connect, mes: C_DspMessage, player_id: number,uniq_no: number): Promise<number> {
        const seek_save_SQL = `
            SELECT save_id
            FROM   tbl_save
            WHERE  player_id = :player_id AND uniq_no = :uniq_no
            ORDER  BY uniq_no
        `
        const [recordSet] = await db_mai.query<I_tbl_SaveId[]>(seek_save_SQL, {player_id: player_id, uniq_no: uniq_no})
        .catch ((err) => {
            mes.set_err_message(`SQLエラー 20: ${seek_save_SQL} ` + err);
            return [];
        });
        if (recordSet.length < 1) {
            return -1;
        }
        if (isNaN(recordSet[0].save_id)) {
            mes.set_err_message(`save_id 数値エラー 21: ${recordSet[0].save_id} `);
            return -1;
        }
        return Number(recordSet[0].save_id);
    }
}



export class C_SaveDataRDB {

    public static async get_from_rdb(db_mai: db_connect, mes: C_DspMessage, save_id: number): Promise<C_SaveData|undefined> {
//debug console.error(`pre get_from SaveDataRDB save_id=${save_id}`);
        const save_data  = await C_SaveDataRDB.get_from_tbl(db_mai, mes, save_id);
        if (save_data === undefined || mes.is_err()) {
                return undefined;
        }

//debug console.error(`pre get_from MazeRDB save_id=${save_id}`);
        const maze_array = await C_MazeRDB.get_from_rdb_all(db_mai, mes, save_id);
        if (mes.is_err()) {
            return undefined;
        }
        for (const maze of maze_array) save_data.all_maze[maze.uid()] = maze;
 
//debug console.error(`pre get_from MvptRDB save_id=${save_id}`);
        const mvpt_array = await C_MvptRDB.get_from_rdb_all(db_mai, mes, save_id);
        if (mes.is_err()) {
            return undefined;
        }
        for (const mvpt of mvpt_array) save_data.all_mvpt[mvpt.uid()] = mvpt;
        
//debug console.error(`pre get_from TeamRDB save_id=${save_id}`);
        const team_array = await C_TeamRDB.get_from_rdb_all(db_mai, mes, save_id);
        if (mes.is_err()) {
                return undefined;
        }
        for (const team of team_array) save_data.all_team[team.uid()] = team;
        
//debug console.error(`pre get_from GuildRDB save_id=${save_id}`);
        const guld_array = await C_GuildRDB.get_from_rdb_all(db_mai, mes, save_id);
        if (mes.is_err()) {
                return undefined;
        }
        for (const guld of guld_array) save_data.all_guld[guld.uid()] = guld;
        
        return save_data;
    }


    public static async set_to_rdb(db_mai: db_connect, mes: C_DspMessage, save: C_SaveData|undefined): Promise<boolean> {
        if (save === undefined) return false;
        
        const save_id = await C_SaveDataRDB.add_tbl(db_mai, mes, save);
        if (mes.is_err()) {
            return false;
        }
//debug console.error(`save_id = ${save_id}`);
        for (const ii in save.all_maze) {
            await C_MazeRDB.set_to_rdb(db_mai, mes, save_id, save.all_maze[ii]);
            if (mes.is_err()) {
                return false;
            }
        }

        for (const ii in save.all_mvpt) {
//debug console.error(`save_id = ${save_id}, mvpt[${ii}] = ${save.all_mvpt[ii]}`);
            await C_MvptRDB.set_to_rdb(db_mai, mes, save_id, save.all_mvpt[ii]);
            if (mes.is_err()) {
                return false;
            }
        }
        
        for (const ii in save.all_team) {
            await C_TeamRDB.set_to_rdb(db_mai, mes, save_id, save.all_team[ii]);
            if (mes.is_err()) {
                return false;
            }
        }
        
        for (const ii in save.all_guld) {
            await C_GuildRDB.set_to_rdb(db_mai, mes, save_id, save.all_guld[ii]);
            if (mes.is_err()) {
                return false;
            }
        }
        
        return true;
    }

    
    public static async del_to_rdb(db_mai: db_connect, mes: C_DspMessage, save_id: number): Promise<boolean> {
        await C_HeroRDB.del_tbl_all(db_mai, mes, save_id);
        if (mes.is_err()) {
            return false;
        }

        await C_GuildRDB.del_tbl(db_mai, mes, save_id);
        if (mes.is_err()) {
            return false;
        }

        await C_TeamRDB.del_tbl(db_mai, mes, save_id);
        if (mes.is_err()) {
            return false;
        }

        await C_MvptRDB.del_tbl(db_mai, mes, save_id);
        if (mes.is_err()) {
            return false;
        }

        await C_MazeRDB.del_tbl(db_mai, mes, save_id);
        if (mes.is_err()) {
            return false;
        }

        await C_SaveDataRDB.del_tbl(db_mai, mes, save_id);
        if (mes.is_err()) {
            return false;
        }

        return true;
    }


    // DB処理。save_idで指定されたsaveレコード(単数)を読み込み
    // save_dataを返す
    // 
    protected static async get_from_tbl(db_mai: db_connect, mes: C_DspMessage, save_id: number): Promise<C_SaveData|undefined> {
        const get_save_SQL = `
            SELECT  save_id, player_id, uniq_no, title, detail, point, 
                    auto_mode, is_active, is_delete, 
                    mypos as mp, DATE_FORMAT(save_time,'%Y-%m-%dT%H:%i:%s.%fZ') AS save_time
            FROM   tbl_save
            WHERE  save_id = :save_id
        `
        const [recordSet] = await db_mai.query<I_tbl_SaveData[]>(get_save_SQL, {save_id: save_id})
        .catch ((err) => {
            mes.set_err_message(`SQLエラー 30: ${get_save_SQL} ` + err);
            return [];
        });

//degub 
if (recordSet === undefined) console.error(`SaveDataRDB.get_from_table Error: undefinde!! save_id=${save_id}`);
        if (recordSet.length < 1) {
            mes.set_err_message(`該当するデータが有りません: ${get_save_SQL}`);
            return undefined;
        }

        const save = new C_SaveData(recordSet[0]);
        save.mypos     = C_MovablePoint.from_string_to_obj(recordSet[0].mp)
//        save.all_mvpt  = C_MovablePoint.from_string_to_objArray(recordSet[0].mvpt);
//        save.all_maze  = C_Maze .from_string_to_objArray(recordSet[0].maze);
//        save.all_team  = C_Team .from_string_to_objArray(recordSet[0].team);
//        save.all_guld  = C_Guild.from_string_to_objArray(recordSet[0].guld);

        return save;
    }

    
    // DB処理。saveテーブルに自身のデータを追加(insert)して
    // そのID(save_id)を返す
    // 
    protected static async add_tbl(db_mai: db_connect, mes: C_DspMessage, save: C_SaveData): Promise<number> {
        const auto_mode = save.auto_mode ? '1' : '0';
        const is_active = save.is_active ? '1' : '0';
        const is_delete = save.is_delete ? '1' : '0';

        const insert_save_SQL =`
            INSERT  INTO tbl_save (
                    player_id, uniq_no,   title, detail, point, 
                    mypos, 
                    auto_mode, is_active, is_delete
                )
            VALUES ( 
                    :player_id, :uniq_no,   :title, :detail, :point, 
                    :mypos, 
                    :auto_mode, :is_active, :is_delete)
        `
        await db_mai.query(insert_save_SQL, {
            player_id: save.player_id,
            uniq_no:   save.uniq_no,
            title:     save.title,
            detail:    save.detail,
            point:     save.point,
            mypos:     C_MovablePoint.from_obj_to_string(save.mypos),
//            all_mvpt:  C_MovablePoint.from_objArray_to_string(save.all_mvpt),
            auto_mode: auto_mode,
            is_active: is_active,
            is_delete: is_delete,
        })
        .catch ((err) => {
            mes.set_err_message(`SQLエラー 0: ${insert_save_SQL} ` + err);
            return -1
        });
        return C_SaveDataRDB.lastInsert(db_mai, mes);
    }


    // tbl_save_dataで最後に追加した行番号(save_id)を返す【1行挿入専用】
    protected static async lastInsert(db_mai: db_connect, mes: C_DspMessage) : Promise<number> {
        const lastInsert_SQL =`
            SELECT LAST_INSERT_ID() as id FROM tbl_save;
        `
        const [recordSet] = await db_mai.query<I_lastInsert[]>(lastInsert_SQL)
        .catch ((err) => {
            mes.set_err_message(`SQLエラー 500: ${lastInsert_SQL} ` + err);
            return [];
        });
        if (recordSet.length < 1) return -1;
        return recordSet[0].id;
    }


    // DB処理。save_idで指定されたレコードを削除(delete)する
    // 
    protected static async del_tbl(db_mai: db_connect, mes: C_DspMessage, save_id: number): Promise<boolean> {
        const delete_save_SQL = `
            DELETE FROM tbl_save 
            WHERE  save_id = :save_id
        `
        await db_mai.query(delete_save_SQL, {
            save_id  : save_id,
        })
        .catch ((err) => {
            mes.set_err_message(`SQLエラー 10: ${delete_save_SQL} ` + err);
            return false;
        });
        return true;
    }
}
