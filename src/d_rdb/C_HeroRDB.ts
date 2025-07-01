import mysql from 'mysql2/promise';
import { C_DspMessage }  from '../d_utl/C_DspMessage'; // 画面メッセージの表示用クラス
import { C_Hero, JSON_Hero }  from '../d_mdl/C_Hero'; 

type db_connect = mysql.PoolConnection;

interface I_tbl_hero extends mysql.RowDataPacket {
    id:        number;
    save_id:   number;
    uniq_id:   string;
    join_uid:  string; 
    name:      string;
    sex:       number;
    age:       number;
    gold:      number;
//    goods:     string;
    state:     number;
    lv:        number;
    skp_ttl:   string;
    skp_now:   string;
    exp_ttl:   string;
    exp_now:   string;
    nxe:       string;
    abi_p_bsc: string;
    abi_m_bsc: string;
    abi_p_ttl: string;
    abi_m_ttl: string;
    abi_p_now: string;
    abi_m_now: string;
//    is_alive:  number;
}
interface I_lastInsert extends mysql.RowDataPacket {
    id: number;
}

export class C_HeroRDB {

    public constructor(j?: JSON_Hero) {}

    public static async get_from_rdb_all(
        db_mai:   db_connect, 
        mes:      C_DspMessage, 
        save_id:  number,
        join_uid: string
    ): Promise<C_Hero[]>
    {
        const hres_array = await C_HeroRDB.get_from_tbl_all(db_mai, mes, save_id, join_uid);
        if (mes.is_err()) {
            return [];
        }
        return hres_array;
    }


    public static async set_to_rdb(
        db_mai:   db_connect, 
        mes:      C_DspMessage, 
        save_id:  number,
        join_uid: string,
        hero:     C_Hero,
    ): Promise<boolean> 
    { 
        const hero_id = await C_HeroRDB.add_tbl(db_mai, mes, save_id, join_uid, hero);
        if (mes.is_err()) {
            return false;
        }
        return true;
    }


    public static async del_to_rdb_all(db_mai: db_connect, mes: C_DspMessage, save_id: number): Promise<boolean> {
        const rslt = await C_HeroRDB.del_tbl_all(db_mai, mes, save_id);
        if (mes.is_err()) {
            return false;
        }
        return true;
    }

    public static async del_to_rdb(db_mai: db_connect, mes: C_DspMessage, save_id: number, join_uid: string): Promise<boolean> {
        const rslt = await C_HeroRDB.del_tbl(db_mai, mes, save_id, join_uid);
        if (mes.is_err()) {
            return false;
        }
        return true;
    }

    

    // DB処理。idで指定されたheroレコードセット(単数)を読み込み
    // Heroクラスの配列にセットする
    // 
    protected static async get_from_tbl(
        db_mai: db_connect, 
        mes:    C_DspMessage, 
        id:     number,
    ): Promise<C_Hero|undefined> {
        const get_heroes_SQL = `
            SELECT 	id, save_id, uniq_id, join_uid, 
                    name, sex, age, gold, state, lv,  
                    skp_ttl, skp_now, exp_ttl, exp_now, nxe, 
                    abi_p_bsc, abi_m_bsc, 
                    abi_p_ttl, abi_m_ttl, 
                    abi_p_now, abi_m_now 
            FROM    tbl_hero
            WHERE   id = :id
        `
        const [resultRecordSet] = await db_mai?.query<I_tbl_hero[]>(get_heroes_SQL, {id:  id})
        .catch(err=>{
            mes.set_err_message(`SQLエラー 37a: ${get_heroes_SQL}`);
            return [];
        });

        if (resultRecordSet.length < 1) {
            mes.set_err_message("データが有りません 39a: {$get_heroes_SQL}");
            return undefined;
        }
        return new C_Hero().decode(C_HeroRDB.from_stringArray_to_JSON(resultRecordSet[0]));
    }


    // DB処理。save_idとjoin_uidで指定されたheroレコードセット(複数)を読み込み
    // Heroクラスの配列にセットする
    // 
    protected static async get_from_tbl_all(
        db_mai:   db_connect, 
        mes:      C_DspMessage, 
        save_id:  number,
        join_uid: string,
    ): Promise<C_Hero[]> {
        const get_heroes_SQL = `
            SELECT 	id, save_id, uniq_id, join_uid, 
                    name, sex, age, gold, state, lv,  
                    skp_ttl, skp_now, exp_ttl, exp_now, nxe, 
                    abi_p_bsc, abi_m_bsc, 
                    abi_p_ttl, abi_m_ttl, 
                    abi_p_now, abi_m_now 
            FROM    tbl_hero
            WHERE   save_id = :save_id AND join_uid = :join_uid
        `
        const [resultRecordSet] = await db_mai?.query<I_tbl_hero[]>(get_heroes_SQL, {save_id: save_id, join_uid: join_uid})
        .catch(err=>{
            mes.set_err_message(`SQLエラー 37b: ${get_heroes_SQL}`);
            return [];
        });

        if (resultRecordSet.length < 1) {
//            mes.set_err_message("データが有りません 39b: {$get_heroes_SQL}");
            return [];
        }

        const hres_array = [] as C_Hero[];
        for (const rr of resultRecordSet) {
            hres_array.push((new C_Hero()).decode(C_HeroRDB.from_stringArray_to_JSON(rr)));
        }
        return hres_array;
    }


    // DB処理。teamテーブルに自身のデータを1件追加(insert)して
    // そのID(id)を返す
    // 
    protected static async add_tbl(
        db_mai:   db_connect, 
        mes:      C_DspMessage, 
        save_id:  number,
        join_uid: string,
        hero:     C_Hero,
    ): Promise<number> {

        const insert_hero_SQL = `
            INSERT INTO tbl_hero (
                save_id, uniq_id, join_uid, 
                name, sex, age, gold, state, lv, 
                skp_ttl, skp_now, exp_ttl, exp_now, nxe,
                abi_p_bsc, abi_m_bsc, 
                abi_p_ttl, abi_m_ttl, 
                abi_p_now, abi_m_now 
            )
            VALUES ( 
                :save_id, :uniq_id, :join_uid, 
                :name, :sex, :age, :gold, :state, :lv, 
                :skp_ttl, :skp_now, :exp_ttl, :exp_now, :nxe,
                :abi_p_bsc, :abi_m_bsc, 
                :abi_p_ttl, :abi_m_ttl, 
                :abi_p_now, :abi_m_now 
            )
        `
        const jsonHero = hero.encode();
//debug
/*
console.error(
     '  save_id='   +save_id 
    +', join_uid='  +join_uid 
    +', uniq_id='   +jsonHero.uniq_id 
    +', name='      +jsonHero.name
    +', sex='       +jsonHero.sex
    +', age='       +jsonHero.age
    +', gold='      +jsonHero.gold
    +', goods='     +(JSON.stringify(jsonHero?.goods)??'???')
    +', state='     +jsonHero.state
    +', lv='        +jsonHero.lv
    +', skp_ttl='   +(jsonHero.val?.skp?.ttl??'???')
    +', skp_now='   +(jsonHero.val?.skp?.now??jsonHero.val?.skp?.ttl??'???')
    +', exp_ttl='   +(jsonHero.val?.exp?.ttl??'???')
    +', exp_now='   +(jsonHero.val?.exp?.now??jsonHero.val?.exp?.ttl??'???')
    +', nxe='       +(jsonHero.val?.nxe??-1)
    +', abi_p_bsc=' +(JSON.stringify(jsonHero.abi_p_bsc)??'???')
    +', abi_m_bsc=' +(JSON.stringify(jsonHero.abi_m_bsc)??'???')
    +', abi_p_ttl=' +(JSON.stringify(jsonHero.abi_p_ttl)??'???')
    +', abi_m_ttl=' +(JSON.stringify(jsonHero.abi_m_ttl)??'???')
    +', abi_p_now=' +(JSON.stringify(jsonHero.abi_p_now)??'???')
    +', abi_m_now=' +(JSON.stringify(jsonHero.abi_m_now)??'???')
)
*/
        await db_mai.query(insert_hero_SQL, {
            'save_id':   save_id, 
            'join_uid':  join_uid, 
            'uniq_id':   jsonHero.uniq_id, 
            'name':      jsonHero.name,
            'sex':       jsonHero.sex,
            'age':       jsonHero.age,
            'gold':      jsonHero.gold,
//            'goods':     JSON.stringify(jsonHero.goods),
            'state':     jsonHero.state,
            'lv':        jsonHero.lv,
            'skp_ttl':   jsonHero.val?.skp?.ttl??'',
            'skp_now':   jsonHero.val?.skp?.now??jsonHero.val?.skp?.ttl??'',
            'exp_ttl':   jsonHero.val?.exp?.ttl??'',
            'exp_now':   jsonHero.val?.exp?.now??jsonHero.val?.exp?.ttl??'',
            'nxe':       jsonHero.val?.nxe??-1,
            'abi_p_bsc': JSON.stringify(jsonHero.abi_p_bsc)??'',
            'abi_m_bsc': JSON.stringify(jsonHero.abi_m_bsc)??'',
            'abi_p_ttl': JSON.stringify(jsonHero.abi_p_ttl)??'',
            'abi_m_ttl': JSON.stringify(jsonHero.abi_m_ttl)??'',
            'abi_p_now': JSON.stringify(jsonHero.abi_p_now)??'',
            'abi_m_now': JSON.stringify(jsonHero.abi_m_now)??'',
        })
        .catch(err=>{
            mes.set_err_message(`SQLエラー 37b: ${insert_hero_SQL}`);
            return [];
        });


        return C_HeroRDB.lastInsert(db_mai, mes);
    }
    

    // tbl_heroで最後に追加した行番号(save_id)を返す【1行挿入専用】
    protected static async lastInsert(db_mai: db_connect, mes: C_DspMessage) : Promise<number> {
        const lastInsert_SQL =`
            SELECT LAST_INSERT_ID() as id FROM tbl_hero;
        `
        const [recordSet] = await db_mai.query<I_lastInsert[]>(lastInsert_SQL)
        .catch ((err) => {
            mes.set_err_message(`SQLエラー 500: ${lastInsert_SQL} ` + err);
            return [];
        });
        if (recordSet.length < 1) return -1;
        return recordSet[0].id;
    }

    // DB処理(クラス・メソッド)。Heroクラスの配列を受け取って、
    // 指定されたsave_idで　heroテーブルに追加(insert)して
    // そのID(id)の配列を返す
    // 
    protected static async add_tbl_all(
        db_mai:     db_connect, 
        mes:        C_DspMessage, 
        save_id:    number,
        join_uid:   string,
        hero_array :C_Hero[], 
    ): Promise<number[]> 
    {
        const hero_id_set = [] as number[];
        for (const hero of hero_array) {
            const hero_id = await C_HeroRDB.add_tbl(db_mai, mes, save_id, join_uid, hero);
            if (mes.is_err()) return [];
            hero_id_set.push(hero_id);
        }
        return hero_id_set;
    }

    
    // DB処理。save_idで指定されたレコード(複数)を削除(delete)する
    // 
    public static async del_tbl_all(db_mai: db_connect, mes: C_DspMessage, save_id: number): Promise<boolean> {
        const delete_hero_SQL = `
            DELETE FROM tbl_hero 
            WHERE  save_id = :save_id 
        `
        await db_mai.query(delete_hero_SQL,{save_id: save_id})
        .catch ((err) => {
            mes.set_err_message(`SQLエラー 17: ${delete_hero_SQL} ` + err);
            return false;
        });
        return true;
    }

    // DB処理。save_idとjoin_uidで指定されたレコード(複数)を削除(delete)する
    // 
    public static async del_tbl(db_mai: db_connect, mes: C_DspMessage, save_id: number, join_uid: string): Promise<boolean> {
        const delete_hero_SQL = `
            DELETE FROM tbl_hero 
            WHERE  save_id = :save_id AND join_uid = :join_uid
        `
        await db_mai.query(delete_hero_SQL,{save_id: save_id, join_uid: join_uid})
        .catch ((err) => {
            mes.set_err_message(`SQLエラー 18: ${delete_hero_SQL} ` + err);
            return false;
        });
        return true;
    }

    
    public static from_stringArray_to_JSON(j: I_tbl_hero): JSON_Hero {
        const abi_p = JSON.parse(j.abi_p_bsc);
        const abi_m = JSON.parse(j.abi_m_bsc);

        const json  = {
            id:        j.id,
            save_id:   j.save_id,
            uniq_id:   j.uniq_id,
            name:      j.name,
            sex:       j.sex,
            age:       j.age,
            gold:      j.gold,
//            goods:     JSON.parse(j.goods),
            state:     j.state,
            lv:        j.lv,
            val: {
                skp: {
                    ttl:   JSON.parse(j.skp_ttl),
                    now:   JSON.parse(j.skp_now),
                },
                exp: {
                    ttl:   JSON.parse(j.exp_ttl),
                    now:   JSON.parse(j.exp_now),
                },
                nxe:       JSON.parse(j.nxe),
            },
            abi_p_bsc:     JSON.parse(j.abi_p_bsc),
            abi_m_bsc:     JSON.parse(j.abi_m_bsc),
            abi_p_ttl:     JSON.parse(j.abi_p_ttl),
            abi_m_ttl:     JSON.parse(j.abi_m_ttl),
            abi_p_now:     JSON.parse(j.abi_p_now),
            abi_m_now:     JSON.parse(j.abi_m_now),
/*
            abi_p: {
                bsc: abi_p,
                ttl: abi_p,
                now: abi_p,
            },
            abi_m: {
                bsc: abi_m,
                ttl: abi_m,
                now: abi_m,
            },
 */
//            is_alive:  j.is_alive !== 0 ? "Y" : "N",
        }
        return json;
    }
}
