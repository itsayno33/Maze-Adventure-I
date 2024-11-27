// 利用クラス等の読み込み
import mysql from 'mysql2/promise';
import { C_DspMessage }        from '../d_utl/C_DspMessage'; // 画面メッセージの表示用クラス
import { C_Guild, JSON_Guild } from "../d_mdl/C_Guild";
import { C_HeroRDB }           from './C_HeroRDB';

type db_connect = mysql.PoolConnection;
interface I_tbl_guld extends mysql.RowDataPacket {
    id:      number,
    save_id: number,
    uniq_id: string,
    name:    string,
    gold:    number,
//    goods:   string,
}
interface I_lastInsert extends mysql.RowDataPacket {
    id: number;
}

export class C_GuildRDB {
    public constructor() {}

    public static async get_from_rdb_all(db_mai: db_connect, mes: C_DspMessage, save_id: number): Promise<C_Guild[]> {
        const guld_array = await C_GuildRDB.get_from_tbl_all(db_mai, mes, save_id);
        if (mes.is_err()) {
            return [];
        }

        for (const guld of guld_array) {
            const hres_array =  await C_HeroRDB.get_from_rdb_all(db_mai, mes, save_id, guld.uid());
            if (mes.is_err()) {
                return [];
            }
            for (const hero of hres_array) guld.add_hero(hero);
        }

        return guld_array;
    }


    public static async set_to_rdb(db_mai: db_connect, mes: C_DspMessage, save_id: number, guld: C_Guild): Promise<boolean> {
        const guld_id = await C_GuildRDB.add_tbl(db_mai, mes, save_id, guld);
        if (mes.is_err()) {
            return false;
        }
        for (const hero of guld.hres()) {
            await C_HeroRDB.set_to_rdb(db_mai, mes, save_id, guld.uid(), hero);
            if (mes.is_err()) {
                return false;
            }
        }
        return true;
    } 


    public static async del_to_rdb(db_mai: db_connect, mes: C_DspMessage, save_id: number, guld_uid: string): Promise<boolean> {
        await C_HeroRDB.del_to_rdb(db_mai, mes, save_id, guld_uid);
        if (mes.is_err()) {
            return false;
        }
        await C_GuildRDB.del_tbl(db_mai, mes, save_id);
        if (mes.is_err()) {
            return false;
        }
        return true;
    }



    // DB処理。save_idで指定されたguldレコードセットを読み込み
    // Guildクラスの配列にセットする
    // 
    protected static async get_from_tbl_all(
        db_mai:  db_connect, 
        mes:     C_DspMessage, 
        save_id: number,
    ): Promise<C_Guild[]> {
        const get_guld_SQL = `
            SELECT 	id, save_id, uniq_id, name, gold
            FROM    tbl_guld
            WHERE   save_id = :save_id
        `
        const [resultRecordSet] = await db_mai.query<I_tbl_guld[]>(get_guld_SQL, {save_id: save_id})
        .catch(err=>{
            mes.set_err_message(`SQLエラー 67: ${get_guld_SQL}`);
            return [];
        });
    
        if (resultRecordSet.length < 1) {
            return [];
        }
        const guld_array = [] as C_Guild[];
        for (const rr of resultRecordSet) {
            guld_array.push(new C_Guild(C_GuildRDB.from_stringArray_to_JSON(rr)));
        }
        return guld_array;
    }

    // DB処理。guldテーブルに自身のデータを追加(insert)して
    // そのID(id)を返す
    // 
    protected static async add_tbl(
        db_mai:  db_connect, 
        mes:     C_DspMessage, 
        save_id: number,
        guld:    C_Guild
    ): Promise<number> {

        const insert_guld_SQL =`
            INSERT INTO tbl_guld ( save_id,  uniq_id,  name,  gold )
            VALUES              ( :save_id, :uniq_id, :name, :gold )
        `
        const j = guld.encode();
        await db_mai.query(insert_guld_SQL, {
            save_id:  save_id,  
            uniq_id:  j.uniq_id,  
            name:     j.name,
            gold:     j.gold,
//            goods:    JSON.stringify(j.goods),
        })
        .catch(err=>{
            mes.set_err_message(`SQLエラー 61: ${insert_guld_SQL}`);
            return [];
        });
        return C_GuildRDB.lastInsert(db_mai, mes);
    }

    // tbl_teamで最後に追加した行番号(save_id)を返す【1行挿入専用】
    protected static async lastInsert(db_mai: db_connect, mes: C_DspMessage) : Promise<number> {
        const lastInsert_SQL =`
            SELECT LAST_INSERT_ID() as id FROM tbl_guld;
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
        const delete_guld_SQL = `
            DELETE FROM tbl_guld 
            WHERE  save_id = :save_id
        `
        await db_mai.query(delete_guld_SQL,{save_id: save_id})
        .catch ((err) => {
            mes.set_err_message(`SQLエラー 68: ${delete_guld_SQL} ` + err);
            return false;
        });
        return true;
    }


    public static from_stringArray_to_JSON(j: I_tbl_guld): JSON_Guild {
        return {
            id:      j.id,
            save_id: j.save_id,
            uniq_id: j.uniq_id,
            name:    j.name,
            gold:    j.gold,
//            goods:   JSON.parse(j.goods),
        };
    }
}

