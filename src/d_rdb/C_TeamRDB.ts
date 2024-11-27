// 利用クラス等の読み込み
import mysql from 'mysql2/promise';
import { C_DspMessage }       from '../d_utl/C_DspMessage'; // 画面メッセージの表示用クラス
import { C_Team, JSON_Team }  from "../d_mdl/C_Team";
import { C_HeroRDB }          from './C_HeroRDB';

type db_connect = mysql.PoolConnection;

interface I_tbl_team extends mysql.RowDataPacket {
    id: number,
    save_id: number,
    uniq_id: string,
    name:    string,
    locate:  string,
    gold:    number,
//    goods:   string,
}
interface I_lastInsert extends mysql.RowDataPacket {
    id: number;
}

export class C_TeamRDB { 
    public constructor() {}

    public static async get_from_rdb_all(db_mai: db_connect, mes: C_DspMessage, save_id: number): Promise<C_Team[]> {
        const team_array = await C_TeamRDB.get_from_tbl_all(db_mai, mes, save_id);
        if (mes.is_err()) {
            return [];
        }
        for (const team of team_array) {
            const hres_array = await C_HeroRDB.get_from_rdb_all(db_mai, mes, save_id, team.uid());
            if (mes.is_err()) {
                return [];
            }
            for (const hero of hres_array) team.add_hero(hero);
        }
        return team_array;
    }


    public static async get_from_rdb(db_mai: db_connect, mes: C_DspMessage, save_id: number, team: C_Team): Promise<boolean> {
        const rslt0 = await C_TeamRDB.get_from_tbl(db_mai, mes, save_id, team.uid());
        if (mes.is_err()) {
            return false;
        }
        const hres_array = await C_HeroRDB.get_from_rdb_all(db_mai, mes, save_id, team.uid());
        if (mes.is_err()) {
            return false;
        }
        for (const hero of hres_array) team.add_hero(hero);
        return true;
    }


    public static async set_to_rdb(
        db_mai:  db_connect,
        mes:     C_DspMessage,
        save_id: number,
        team:    C_Team
    ): Promise<boolean> {
        const team_id = await C_TeamRDB.add_tbl(db_mai, mes, save_id, team);
        if (mes.is_err()) {
            return false;
        }
        for (const hero of team.hres()) {
            await C_HeroRDB.set_to_rdb(db_mai, mes, save_id, team.uid(), hero);
            if (mes.is_err()) {
                return false;
            }
        }
        return true;
    }

    
    public static async del_to_rdb(db_mai: db_connect, mes: C_DspMessage, save_id: number, team_uid: string): Promise<boolean> {
        await C_HeroRDB.del_to_rdb(db_mai, mes, save_id, team_uid);
        if (mes.is_err()) {
            return false;
        }
        await C_TeamRDB.del_tbl(db_mai, mes, save_id);
        if (mes.is_err()) {
            return false;
        }
        return true;
    }



    // DB処理。save_idで指定されたteamレコードセットを読み込み
    // Teamクラスの配列にセットする
    // 
    protected static async get_from_tbl_all(
        db_mai:  db_connect, 
        mes:     C_DspMessage, 
        save_id: number,
    ): Promise<C_Team[]> {
        const get_team_SQL =`
            SELECT 	id, save_id, uniq_id, name, locate, gold
            FROM tbl_team
            WHERE   save_id = :save_id
        `
        const [resultRecordSet] = await db_mai.query<I_tbl_team[]>(get_team_SQL, {save_id: save_id})
        .catch(err=>{
            mes.set_err_message(`SQLエラー 37a: ${get_team_SQL} ` + err);
            return [];
        });
    
        if (resultRecordSet.length < 1) {
            return [];
        }
        const team_array = [];
        for (const rr of resultRecordSet) {
            team_array.push(new C_Team(C_TeamRDB.from_stringArray_to_JSON(rr)));
        }
        return team_array;
    }

    // DB処理。save_idと自身のuniq_idで指定されたteamレコードセットを読み込む
    // 
    protected static async get_from_tbl(
        db_mai:   db_connect, 
        mes:      C_DspMessage, 
        save_id:  number,
        join_uid: string,
    ): Promise<C_Team|undefined> {
        const get_team_SQL = `
            SELECT 	id, save_id, uniq_id, name, locate, gold 
            FROM tbl_team
            WHERE   save_id = :save_id  AND  uniq_id = :uniq_id
        `
        const [resultRecordSet] = await db_mai.query<I_tbl_team[]>(get_team_SQL, {save_id: save_id, join_uid: join_uid})
        .catch(err=>{
            mes.set_err_message(`SQLエラー 37b: ${get_team_SQL} ` + err);
            return [];
        });
    
        if (resultRecordSet.length < 1) {
            mes.set_err_message('Uniq_idに該当するTeamデータが有りません');
            return undefined;
        }
        return new C_Team(C_TeamRDB.from_stringArray_to_JSON(resultRecordSet[0]))
    }
    

    // DB処理。teamテーブルにC_Teamのデータを追加(insert)して
    // そのID(id)を返す
    // 
    protected static async add_tbl(
        db_mai:  db_connect, 
        mes:     C_DspMessage, 
        save_id: number,
        team:    C_Team,
    ): Promise<number> {
        const insert_team_SQL = `
            INSERT INTO tbl_team (
                save_id, uniq_id, name, locate, gold
            )
            VALUES ( 
                :save_id, :uniq_id, :name, :locate, :gold
            )
        `
        const j = team.encode();
//console.error(`${save_id}, ${j.uniq_id}, ${j.name}, ${JSON.stringify(j.locate)}, ${JSON.stringify(j.gold)}`);
        await db_mai.query(insert_team_SQL, {
            save_id : save_id,  
            uniq_id : j.uniq_id, 
            name    : j.name, 
            locate  : JSON.stringify(j.locate), 
            gold    : j.gold,  
//            goods   : JSON.stringify(j.goods),  
        })
        .catch(err=>{
            mes.set_err_message(`SQLエラー 6: ${insert_team_SQL} ` + err);
            return [];
        });

        return C_TeamRDB.lastInsert(db_mai, mes);
    }

    // tbl_teamで最後に追加した行番号(save_id)を返す【1行挿入専用】
    protected static async lastInsert(db_mai: db_connect, mes: C_DspMessage) : Promise<number> {
        const lastInsert_SQL =`
            SELECT LAST_INSERT_ID() as id FROM tbl_team;
        `
        const [recordSet] = await db_mai.query<I_lastInsert[]>(lastInsert_SQL)
        .catch ((err) => {
            mes.set_err_message(`SQLエラー 500: ${lastInsert_SQL} ` + err);
            return [];
        });
        if (recordSet.length < 1) return -1;
        return recordSet[0].id;
    }


    // DB処理(クラス・メソッド)。Teamクラスの配列を受け取って、
    // 指定されたsave_idで　teamテーブルに追加(insert)して
    // そのID(id)の配列を返す
    // 
    protected static async add_tbl_all(
        db_mai:     db_connect, 
        mes:        C_DspMessage, 
        save_id:    number,
        team_array: C_Team[], 
    ): Promise<number[]> 
    {
        const team_id_set = [] as number[];
        for (const team of team_array) {
            const team_id = await C_TeamRDB.add_tbl(db_mai, mes, save_id, team);
            if (mes.is_err()) return [];
            team_id_set.push(team_id);
        }
        return team_id_set;
    }

    // DB処理。save_idで指定されたレコード(複数)を削除(delete)する
    // 
    public static async del_tbl(db_mai: db_connect, mes: C_DspMessage, save_id: number): Promise<boolean> {
        const delete_team_SQL = `
            DELETE FROM tbl_team 
            WHERE  save_id = :save_id
        `
        await db_mai.query(delete_team_SQL, {save_id : save_id,})
        .catch(err=>{
            mes.set_err_message(`SQLエラー 15: ${delete_team_SQL} ` + err);
            return false;
        });
        return true;
    }


    public static from_stringArray_to_JSON(j: I_tbl_team): JSON_Team {
        return {
            id:      j.id,
            save_id: j.save_id,
            uniq_id: j.uniq_id,
            name:    j.name,
            locate:  JSON.parse(j.locate),
            gold:    j.gold,
//            goods:   JSON.parse(j.goods),
        };
    }
}
