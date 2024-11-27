/* SET GLOBAL local_infile=on; */

USE db_mai;


INSERT INTO tbl_player (id, name, email, passwd) VALUES
 (1, 'なむうぉんす', 'namwons33@gmail.com', '')
,(2, 'いっせい', 'itsay33@gmail.com', '')
,(3, 'テスト', 'test03', '')
;



INSERT INTO tbl_djob (
        name, 
        need_p, 
        need_e, 

        abi_p, 
        abi_m
) VALUES
(
        /* name    */        '戦士', 
        /* need_p*/           0, 
        /* need_e*/        1000, 

    '{
        "str":              10, 
        "pwr":                  5, 
        "vit":              10, 
        "dex":               1, 
        "agi":               3, 
        "tec":              10, 
        "luk":               1 
    }',
    '{
        "str":               0, 
        "pwr":               0,  
        "vit":               0, 
        "dex":               0, 
        "agi":               0, 
        "tec":               0, 
        "luk":               0 
    }'
)
,(
        /* job_name    */    '魔導士', 
        /* need_p    */       0, 
        /* need_e    */    1000, 

    '{
        "str":               0, 
        "pwr":                  0, 
        "vit":               0, 
        "dex":               0, 
        "agi":               0, 
        "tec":               0, 
        "luk":               0 
    }',
    '{
        "str":              10, 
        "pwr":               5,  
        "vit":              10, 
        "dex":               1, 
        "agi":               3, 
        "tec":              10, 
        "luk":               1 
    }'
)
,(
        /* job_name    */    '治療師', 
        /* need_p    */       0, 
        /* need_e    */    1000, 

    '{
        "str":               3, 
        "pwr":                  2, 
        "vit":               5, 
        "dex":               1, 
        "agi":               0, 
        "tec":               3, 
        "luk":               2 
    }',
    '{
        "str":               7, 
        "pwr":               3,  
        "vit":               5, 
        "dex":               1, 
        "agi":               3, 
        "tec":               3, 
        "luk":               2 
    }'
)
;


INSERT INTO tbl_mazeinfo (
        name, 
        mbname, 
        lv, 
        size_x, 
        size_y, 
        size_z, 
        max_room, 
        room_size 
) VALUES
(
/* name   */    'maze010', 
/* mbname */    '教練場', 
/* lv     */     1, 
/* size_x */    11, 
/* size_y */    11, 
/* size_z */     3, 
/* max_room */     2, 
/* room_size */     3 
)
,(
/* name   */    'maze011', 
/* mbname */    '始まりの迷宮', 
/* lv     */     1, 
/* size_x */    21, 
/* size_y */    21, 
/* size_z */     5, 
/* max_room */     3, 
/* room_size */     3 
)
;

