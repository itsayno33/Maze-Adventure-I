DROP DATABASE db_mai;

CREATE DATABASE IF NOT EXISTS db_mai DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_ja_0900_as_cs_ks DEFAULT ENCRYPTION='N';

USE db_mai;


CREATE TABLE IF NOT EXISTS tbl_player (
    id                INT                AUTO_INCREMENT, 
    name            VARCHAR(32)        CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci UNIQUE NOT NULL, 
    email            VARCHAR(32)        CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci UNIQUE NOT NULL, 
    passwd            VARCHAR(120)    CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL, 
    create_time        DATETIME        DEFAULT CURRENT_TIMESTAMP NOT NULL,
    update_time        DATETIME        DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL, 

    PRIMARY KEY (id)
) ENGINE=INNODB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_ja_0900_as_cs_ks;

ALTER TABLE tbl_player ADD INDEX idx_player_email(email);


CREATE TABLE IF NOT EXISTS tbl_djob ( /* ジョブの基本値テーブル */
    id                INT                AUTO_INCREMENT, 
    name            VARCHAR(60)        CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,     /* ジョブ名 */
    need_p            INT UNSIGNED    NOT NULL,    /* 習得に必要なスキル・ポイントの増分 */
    need_e            INT UNSIGNED    NOT NULL,    /* レベル・アップに必要な経験値の増分 */
    
    abi_p            JSON            NOT NULL,    /* ステータス: レベルアップ時の能力値の増分(物理)。 */
    abi_m            JSON            NOT NULL,    /* ステータス: レベルアップ時の能力値の増分(魔法)。 */
    create_time        DATETIME        DEFAULT CURRENT_TIMESTAMP NOT NULL,
    update_time        DATETIME        DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL, 

    PRIMARY KEY (id)
) ENGINE=INNODB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_ja_0900_as_cs_ks;

ALTER TABLE IF NOT EXISTS tbl_djob ADD INDEX idx_djob_name(name);

CREATE TABLE IF NOT EXISTS tbl_save (
    save_id            INT                AUTO_INCREMENT,
    uniq_no            INT                NOT NULL,             /* 保存番号。uniq_idと似た名前だが別物！！！ */
    player_id        INT                NOT NULL, 
    title            VARCHAR(60)        CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL, 
    detail            VARCHAR(200)    CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL, 
    point            VARCHAR(100)    CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL, 

    mypos            JSON            NOT NULL,
    all_mvpt        JSON            NOT NULL,

    auto_mode        BOOL            NOT NULL,    /* 自動か手動か */
    is_active        BOOL            DEFAULT true  NOT NULL,    /* ロード可否 */
    is_delete        BOOL            DEFAULT false NOT NULL,    /* 削除済みの記録かどうか */
    save_time        DATETIME        DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
    create_time        DATETIME        DEFAULT CURRENT_TIMESTAMP NOT NULL,
    update_time        DATETIME        DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL, 

    PRIMARY KEY (save_id),
    UNIQUE JOINY_ID_INDEX (player_id, uniq_no), 
    CONSTRAINT player_id_check 
        FOREIGN KEY (player_id)  REFERENCES tbl_player(id) 
            ON DELETE RESTRICT 
            ON UPDATE CASCADE 
) ENGINE=INNODB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_ja_0900_as_cs_ks;

ALTER TABLE tbl_save ADD INDEX idx_save_title(title);


CREATE TABLE IF NOT EXISTS tbl_team (
    id                INT                AUTO_INCREMENT,
    save_id            INT                NOT NULL,    /* tbl_saveのid */
    uniq_id            VARCHAR(60)        CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    name            VARCHAR(32)         CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL, 

    locate            JSON            NOT NULL,
/*
    {
        "maze" ?:
        {
            "name":        STRING,    // 迷宮名。tbl_mazeのnameと同じ。デバッグ用 
            "maze_uid":    STRING,    // tbl_mazeのuniq_id      
            "poz_x":    INT,    // パーティーの位置(横)   
            "poz_y":    INT,    // パーティーの位置(縦)   
            "poz_z":    INT,    // パーティーの位置(階数) 
            "poz_d":    INT,    // パーティーの向き(北=0, 東=1, 南=2, 西=3, 不明=99) 
        },
        "guld" ?:
        {
            "name":        STRING,    // ギルド名。tbl_guldのnameと同じ。デバッグ用 
            "guld_uid":    STRING,    // tbl_guldのuniq_id      
        },
    },
*/

    goods            JSON            NOT NULL,            /* パーティの所持品 */
/*
    {
        "gold":        BIGINT UNSIGNED    DEFAULT 0 NOT NULL, // パーティーの所持金 
        "arms":        STRING[],                            // パーティーが所持している武器のuni_id配列 
        "shld":        STRING[],                            // パーティーが所持している防具のuni_id配列 
        "drug":        STRING[],                            // パーティーが所持している薬剤のuni_id配列 
        "item":        STRING[],                            // パーティーが所持している道具のuni_id配列 
    }
*/

    is_hero            BOOL            NOT NULL,    /* PCならtrue, NPCならfalse   */
    create_time        DATETIME        DEFAULT CURRENT_TIMESTAMP NOT NULL,
    update_time        DATETIME        DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL, 

    PRIMARY KEY (id),
    CONSTRAINT save_id_check_for_team  
        FOREIGN KEY (save_id)  REFERENCES tbl_save(save_id) 
            ON DELETE RESTRICT 
            ON UPDATE CASCADE 
) ENGINE=INNODB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_ja_0900_as_cs_ks;

ALTER TABLE tbl_team ADD INDEX idx_team_save_id(save_id, uniq_id);


CREATE TABLE IF NOT EXISTS tbl_maze (
    id            INT                AUTO_INCREMENT, 
    save_id        INT                NOT NULL,    /* tbl_saveのid */
    uniq_id        VARCHAR(60)        CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    name        VARCHAR(32)        CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    size_x        INT                NOT NULL,
    size_y        INT                NOT NULL,
    size_z        INT                NOT NULL,
    maps         LONGTEXT        CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL, 
    mask         LONGTEXT        CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL, 
    create_time    DATETIME        DEFAULT CURRENT_TIMESTAMP NOT NULL, 
    update_time    DATETIME        DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL, 

    PRIMARY KEY (id),
    CONSTRAINT save_id_check_for_maze  
        FOREIGN KEY (save_id)  REFERENCES tbl_save(save_id) 
            ON DELETE RESTRICT 
            ON UPDATE CASCADE 
) ENGINE=INNODB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_ja_0900_as_cs_ks;

ALTER TABLE tbl_maze ADD INDEX idx_maze_save_id(save_id, uniq_id);


CREATE TABLE IF NOT EXISTS tbl_guld (
    id                INT                AUTO_INCREMENT, 
    save_id            INT                NOT NULL,    /* tbl_saveのid */
    uniq_id            VARCHAR(60)        CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    name            VARCHAR(32)         CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL, 
    goods            JSON            NOT NULL,            /* パーティの所持品 */
    create_time        DATETIME        DEFAULT CURRENT_TIMESTAMP NOT NULL,
    update_time        DATETIME        DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL, 

    PRIMARY KEY (id),
    CONSTRAINT save_id_check_for_guld  
        FOREIGN KEY (save_id)  REFERENCES tbl_save(save_id) 
            ON DELETE RESTRICT 
            ON UPDATE CASCADE 
) ENGINE=INNODB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_ja_0900_as_cs_ks;

ALTER TABLE tbl_guld ADD INDEX idx_guld_save_id(save_id, uniq_id);



CREATE TABLE IF NOT EXISTS tbl_hero (
    id                INT                AUTO_INCREMENT, 
    save_id            INT                NOT NULL,    /* tbl_saveのid  */
    uniq_id            VARCHAR(60)        CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    join_uid        VARCHAR(60)        NOT NULL,    /*保存時点で 所属するチームなりギルドmのuniq_id */
    name            VARCHAR(60)        CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL, 
    sex                INT UNSIGNED    NOT NULL,                    /* 性別。選べる職業に影響する。ジェンダーはプログラムで考慮してます。 */
    age                INT UNSIGNED    NOT NULL,                    /* 年齢。ステータスの伸び率に関係。(ageが高いと初期能力が高い) */
    goods            JSON            NOT NULL,                    /* ヒーローの所持品 */
/*
    {
        "gold":        BIGINT UNSIGNED    DEFAULT 0 NOT NULL, // ヒーローの所持金 
        "arms":        STRING[],                            // ヒーローが所持している武器のuni_id配列 
        "shld":        STRING[],                            // ヒーローが所持している防具のuni_id配列 
        "drug":        STRING[],                            // ヒーローが所持している薬剤のuni_id配列 
        "item":        STRING[],                            // ヒーローが所持している道具のuni_id配列 
    }
*/
    state            INT UNSIGNED    NOT NULL,                    /* 状態異常等 */
    is_alive        BOOL            DEFAULT true  NOT NULL,        /* 生きてるかどうか */

    lv                INT UNSIGNED    DEFAULT 0    NOT NULL,        /* ヒーローレベル */

    skp_ttl            BIGINT UNSIGNED    DEFAULT 0    NOT NULL,        /* 今までに得たスキル値のトータル(仕様変更で再計算が必要になったとき用)。*/
    skp_now            INT UNSIGNED    DEFAULT 0    NOT NULL,        /* 現在のスキル値。前回のヒーローレベルのアップ後の分 */

    exp_ttl            BIGINT UNSIGNED    DEFAULT 0    NOT NULL,        /* 今までに得た経験値のトータル(仕様変更で再計算が必要になったとき用)。 */
    exp_now            INT UNSIGNED    DEFAULT 0    NOT NULL,        /* 現在の経験値。前回のヒーローレベルのアップ後の分 */
    nxe                INT UNSIGNED    DEFAULT 0    NOT NULL,        /* 次回のヒーローレベルアップに必要な経験値 */

    abi_p_bsc        JSON            NOT NULL,
    abi_m_bsc        JSON            NOT NULL,


/*    hp_bsc            INT UNSIGNED    DEFAULT 0    NOT NULL,        /* ライフのデフォルト値。 */
/*    hp_max            INT UNSIGNED    DEFAULT 0    NOT NULL,        /* ライフのブースト込みの最大値。 */
/*    hp_dmg            INT UNSIGNED    DEFAULT 0    NOT NULL,        /* ライフのダメージ。これが最大値を超えるとお陀仏。。 */

/*    mp_bsc            INT UNSIGNED    DEFAULT 0    NOT NULL,        /* 使える魔法のデフォルト値。 */
/*    mp_max            INT UNSIGNED    DEFAULT 0    NOT NULL,        /* 使える魔法のブースト込みの最大値。 */
/*    mp_dmg            INT UNSIGNED    DEFAULT 0    NOT NULL,        /* 使える魔法の消費量。これが最大値を超えるとhpが削られる。 */



    /* 外的要因で決まる増減は装備時や戦闘時に計算する */
/*    atkp_bsc        INT UNSIGNED    DEFAULT 0    NOT NULL,        /* 物理攻撃値の基本値(才能部分)。ヒーローレベルやステータスアップで加算 */
/*    atkm_bsc        INT UNSIGNED    DEFAULT 0    NOT NULL,        /* 魔法攻撃値の基本値(才能部分)。ヒーローレベルやステータスアップで加算 */
/*    defp_bsc        INT UNSIGNED    DEFAULT 0    NOT NULL,        /* 物理防御値の基本値(才能部分)。ヒーローレベルやステータスアップで加算 */
/*    defm_bsc        INT UNSIGNED    DEFAULT 0    NOT NULL,        /* 魔法防御値の基本値(才能部分)。ヒーローレベルやステータスアップで加算 */
/*    qucp_bsc        INT UNSIGNED    DEFAULT 0    NOT NULL,        /* 物理瞬発力の基本値(才能部分)。ヒーローレベルやステータスアップで加算 */
/*    qucm_bsc        INT UNSIGNED    DEFAULT 0    NOT NULL,        /* 魔法瞬発力の基本値(才能部分)。ヒーローレベルやステータスアップで加算 */
/*    cncp_bsc        INT UNSIGNED    DEFAULT 0    NOT NULL,        /* 物理幸運度の基本値(才能部分)。ヒーローレベルやステータスアップで加算 */
/*    cncm_bsc        INT UNSIGNED    DEFAULT 0    NOT NULL,        /* 魔法幸運度の基本値(才能部分)。ヒーローレベルやステータスアップで加算 */

    /* statusは拡張性や汎用性の観点からも一つのJSON文字列にしてはどうか？ */
    /* {status: {str: {p: **, m: **}}, atk: {...}, ...} みたいな */
    /* status            TEXT            NOT NULL, */

/*    strp_bsc        INT UNSIGNED    DEFAULT 0    NOT NULL,         /* ステータス: 物理的強さ。物理攻撃/防御力にも影響。HP回復やアイテムの最大所持重量にボーナス */
/*    strm_bsc        INT UNSIGNED    DEFAULT 0    NOT NULL,         /* ステータス: 精神的強さ。魔法攻撃/防御力にも影響。MP回復やアイテムの最大所持重量にボーナス */
/*    pwrp_bsc        INT UNSIGNED    DEFAULT 0    NOT NULL,         /* ステータス: 基本攻撃力(物理) */
/*    pwrm_bsc        INT UNSIGNED    DEFAULT 0    NOT NULL,         /* ステータス: 基本攻撃力(魔法) */
/*    vitp_bsc        INT UNSIGNED    DEFAULT 0    NOT NULL,         /* ステータス: 肉体的生命力。HPの最大値や物理防御力に影響を与える。状態異常耐性にも影響 */
/*    vitm_bsc        INT UNSIGNED    DEFAULT 0    NOT NULL,         /* ステータス: 精神的生命力。MPの最大値や魔法防御力に影響を与える。状態異常耐性にも影響 */
/*    dexp_bsc        INT UNSIGNED    DEFAULT 0    NOT NULL,         /* ステータス: 器用さ(物理)。命中率に影響を与える。飛び道具では特に影響。物理的な罠解除にも影響 */
/*    dexm_bsc        INT UNSIGNED    DEFAULT 0    NOT NULL,         /* ステータス: 器用さ(魔法)。命中率に影響を与える。長距離魔法では特に影響。魔法的な罠解除にも影響 */
/*    agip_bsc        INT UNSIGNED    DEFAULT 0    NOT NULL,         /* ステータス: 素早さ(物理)。行動速度や回避率に影響を与える。命中率に影響を与えることも。 */
/*    agim_bsc        INT UNSIGNED    DEFAULT 0    NOT NULL,         /* ステータス: 素早さ(魔法)。行動速度や回避率に影響を与える。命中率に影響を与えることも。 */
/*    tecp_bsc        INT UNSIGNED    DEFAULT 0    NOT NULL,         /* ステータス: 技術力(物理)。経験で向上してpadやpdf、pdxにボーナスを与える */
/*    tecm_bsc        INT UNSIGNED    DEFAULT 0    NOT NULL,         /* ステータス: 技術力(魔法)。経験で向上してmadやmdf、mdxにボーナスを与える */
/*    lukp_bsc        INT UNSIGNED    DEFAULT 0    NOT NULL,         /* ステータス: 幸運値(物理)。 */
/*    lukm_bsc        INT UNSIGNED    DEFAULT 0    NOT NULL,         /* ステータス: 幸運値(魔法)。 */

    create_time        DATETIME        DEFAULT CURRENT_TIMESTAMP NOT NULL,
    update_time        DATETIME        DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL, 

    PRIMARY KEY (id),
    CONSTRAINT save_id_check_for_hero  
        FOREIGN KEY (save_id)  REFERENCES tbl_save(save_id) 
            ON DELETE RESTRICT 
            ON UPDATE CASCADE 
) ENGINE=INNODB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_ja_0900_as_cs_ks;

ALTER TABLE tbl_hero ADD INDEX idx_hero_save_id(save_id, uniq_id);
ALTER TABLE tbl_hero ADD INDEX idx_hero_save_id(save_id, team_id, uniq_id);


CREATE TABLE IF NOT EXISTS tbl_eqpt ( /* 装備 (ステータスに加減算)*/ /* 一般的な基準表も必要か。 tbl_deqp */
    id                INT                AUTO_INCREMENT, 
    save_id            INT                NOT NULL,    /* tbl_saveのid  */
    hero_id            INT                NOT NULL,    /* tbl_partyのid */
    uniq_id            VARCHAR(60)        CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,

    name            VARCHAR(30)        CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,    /* 装備の名前 */
    kind            INT                NOT NULL,    /* 装備の種類 */

    abi_p            JSON            NOT NULL,    /* 物理属性の加算値 */
    abi_m            JSON            NOT NULL,    /* 魔法属性の加算値 */

    create_time        DATETIME        DEFAULT CURRENT_TIMESTAMP NOT NULL,
    update_time        DATETIME        DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL, 

    PRIMARY KEY (id),
    CONSTRAINT save_id_check_for_eqpt  
        FOREIGN KEY (save_id)  REFERENCES tbl_save(save_id) 
            ON DELETE RESTRICT 
            ON UPDATE CASCADE, 
    CONSTRAINT hero_id_check_for_eqpt  
        FOREIGN KEY (hero_id)  REFERENCES tbl_hero(id) 
            ON DELETE RESTRICT 
            ON UPDATE CASCADE
) ENGINE=INNODB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_ja_0900_as_cs_ks;


CREATE TABLE IF NOT EXISTS tbl_buff ( /* バフ(正数)、デバフ(負数) (能力に加減算) */ /* 一般的な基準表も必要か。 tbl_dbuf */
    id                INT                AUTO_INCREMENT, 
    save_id            INT                NOT NULL,    /* tbl_saveのid  */
    hero_id            INT                NOT NULL,    /* tbl_partyのid */
    uniq_id            VARCHAR(60)        CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,

    name            VARCHAR(30)        CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,    /* バフ、デバフの種類 */
    kind            INT                NOT NULL,    /* バフ、デバフの種類   */
    ress            INT                NOT NULL,    /* 解除の抵抗レベル */
    turn            INT                NOT NULL,    /* 有効ターンの残り */

    abi_p            JSON            NOT NULL,    /* 物理属性の加算値 */
    abi_m            JSON            NOT NULL,    /* 魔法属性の加算値 */

    create_time        DATETIME        DEFAULT CURRENT_TIMESTAMP NOT NULL,
    update_time        DATETIME        DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL, 

    PRIMARY KEY (id),
    CONSTRAINT save_id_check_for_buff  
        FOREIGN KEY (save_id)  REFERENCES tbl_save(save_id) 
            ON DELETE RESTRICT 
            ON UPDATE CASCADE, 
    CONSTRAINT hero_id_check_for_buff  
        FOREIGN KEY (hero_id)  REFERENCES tbl_hero(id) 
            ON DELETE RESTRICT 
            ON UPDATE CASCADE
) ENGINE=INNODB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_ja_0900_as_cs_ks;


CREATE TABLE IF NOT EXISTS tbl_sick ( /* 状態異常 (能力に加減算) */ /* 一般的な基準表も必要か。 tbl_dsic */
    id                INT                AUTO_INCREMENT, 
    save_id            INT                NOT NULL,    /* tbl_saveのid  */
    hero_id            INT                NOT NULL,    /* tbl_partyのid */
    uniq_id            VARCHAR(60)        CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,

    name            VARCHAR(30)        CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,    /* 状態異常の名前 */
    kind            INT                NOT NULL,    /* 状態異常の種類   */
    ress            INT                NOT NULL,    /* 解除の抵抗レベル */
    turn            INT                NOT NULL,    /* 有効ターンの残り */

    abi_p            JSON            NOT NULL,    /* 物理属性の加算値(毎ターン)。(通常はマイナス) */
    abi_m            JSON            NOT NULL,    /* 魔法属性の加算値(毎ターン)。(通常はマイナス) */

    create_time        DATETIME        DEFAULT CURRENT_TIMESTAMP NOT NULL,
    update_time        DATETIME        DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL, 

    PRIMARY KEY (id),
    CONSTRAINT save_id_check_for_sick  
        FOREIGN KEY (save_id)  REFERENCES tbl_save(save_id) 
            ON DELETE RESTRICT 
            ON UPDATE CASCADE, 
    CONSTRAINT hero_id_check_for_sick  
        FOREIGN KEY (hero_id)  REFERENCES tbl_hero(id) 
            ON DELETE RESTRICT 
            ON UPDATE CASCADE
) ENGINE=INNODB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_ja_0900_as_cs_ks;


CREATE TABLE IF NOT EXISTS tbl_jobs (
    id                INT                AUTO_INCREMENT, 
    save_id            INT                NOT NULL,    /* tbl_saveのid  */
    hero_id            INT                NOT NULL,    /* tbl_partyのid */
    uniq_id            VARCHAR(60)        CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,

    djob_id            INT                NOT NULL,    /* ジョブの種類 */
    djob_lvl        INT                NOT NULL,    /* ジョブのレベル */
    

    create_time        DATETIME        DEFAULT CURRENT_TIMESTAMP NOT NULL,
    update_time        DATETIME        DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL, 

    PRIMARY KEY (id),
    CONSTRAINT save_id_check_for_jobs  
        FOREIGN KEY (save_id)  REFERENCES tbl_save(save_id) 
            ON DELETE RESTRICT 
            ON UPDATE CASCADE, 
    CONSTRAINT hero_id_check_for_jobs  
        FOREIGN KEY (hero_id)  REFERENCES tbl_hero(id) 
            ON DELETE RESTRICT 
            ON UPDATE CASCADE, 
    CONSTRAINT job_id_check_for_jobs  
        FOREIGN KEY (djob_id)  REFERENCES tbl_djob(id) 
            ON DELETE RESTRICT 
            ON UPDATE CASCADE 
) ENGINE=INNODB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_ja_0900_as_cs_ks;

ALTER TABLE tbl_jobs ADD INDEX idx_jbs_save_id(save_id, hero_id);


CREATE TABLE IF NOT EXISTS tbl_mazeinfo (
    id                INT                AUTO_INCREMENT, 
    lv                INT                NOT NULL, 
    name            VARCHAR(32)        NOT NULL UNIQUE,
    mbname            VARCHAR(60)        CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    size_x            INT                NOT NULL, 
    size_y            INT                NOT NULL, 
    size_z            INT                NOT NULL, 
    max_room        INT                NOT NULL, 
    room_size        INT                NOT NULL, 
    PRIMARY KEY (id)
) ENGINE=INNODB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_ja_0900_as_cs_ks;

ALTER TABLE tbl_mazeinfo ADD INDEX idx_mif_name(name);

SHOW TABLES;
