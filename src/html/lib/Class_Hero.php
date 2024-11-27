<?php
    declare(strict_types=1);

    // 日本語の利用
    mb_internal_encoding("UTF-8");
    mb_regex_encoding("UTF-8");

    // 利用クラス等の読み込み
    require_once 'Class_DspMessage.php'; // 画面メッセージの表示用クラス
    require_once 'Class_Rand.php'; 
    require_once 'Class_HeroAbility.php'; 

    class Hero {
        protected static   $max_id   = 0;
        protected int      $id       = 0;
        protected int      $save_id  = 0;
        protected string   $uniq_id  = '';
        protected string   $join_uid = '';
        protected string   $name     = '';
        protected bool     $is_alive = true;

        protected int      $sex      = 0; /* 0:男、1:女 */
        protected int      $age      = 0; 
        protected int      $state    = 0; 
        protected int      $lv       = 0; 
        protected array    $val      = [];
        protected array    $abi_p    = [];
        protected array    $abi_m    = [];
        protected Goods    $goods;
    

        public function __construct(array $a = null) {
            $this->id       = 0; // --Hero::$max_id;
            $this->name     = 'New Hero #' . sprintf('%03d', -1 * $this->id);
            $this->uniq_id  = Rand::uniq_id('mai_hero#');
            $this->join_uid = '';
            $this->sex      = 0; 
            $this->age      = 0; 
            $this->state    = 0; 
            $this->lv       = 0; 
            $this->val      = [
                'skp' => ['ttl' => 0, 'now' => 0], 
                'exp' => ['ttl' => 0, 'now' => 0],
                'nxe' => 0
            ];
            $this->abi_p    = [
                'bsc' =>  new HeroAbility()
            ];
            $this->abi_m    = [
                'bsc' =>  new HeroAbility()
            ];
            $this->goods    = new Goods();

            if(!is_null(($a)) && is_array($a)) $this->decode($a);
        }

        public function uid(): string {return $this->uniq_id;}


        public function random_make(): Hero {
            $this->id       = 0; // --Hero::$max_id;
            $this->name     = "冒険者 " . Rand::random_str(05);
            $this->sex      = Rand::i_rand( 0,     1); 
            $this->age      = Rand::i_rand( 15,   25); 
            $this->state    = 0; 
            $this->lv       = 0; 
            $this->val      = [
                'skp' => ['ttl' => 0, 'now' => 0], 
                'exp' => ['ttl' => 0, 'now' => 0],
                'nxe' => 1000
            ];

            $this->goods->random_make(); 

            $abi_p_bsc = $this->abi_p['bsc'];
            $abi_p_bsc->random_make();
            $abi_p_bsc->add_xp_bonus(($this->age - 15) * 10);
            $abi_p_bsc->add_el_bonus(($this->age - 15) *  5);
            $abi_p_bsc->add_pr_bonus(($this->age - 15) *  2);
            $this->abi_p['bsc'] = $abi_p_bsc;

            $abi_m_bsc = $this->abi_m['bsc'];
            $abi_m_bsc->random_make();
            $abi_m_bsc->add_xp_bonus(($this->age - 15) * 10);
            $abi_m_bsc->add_el_bonus(($this->age - 15) *  5);
            $abi_m_bsc->add_pr_bonus(($this->age - 15) *  2);
            $this->abi_m['bsc'] = $abi_m_bsc;


            return $this;
        }


        public static function get_from_odb_all(
            PDO $db_mai, 
            DspMessage $mes, 
            int    $save_id,
            string $join_uid): array 
        {
            [$rslt, $hres_array] = Hero::get_from_tbl_all($db_mai, $mes, $save_id, $join_uid);
            if (!$rslt || $mes->is_err()) {
                return [false, []];
            }
            return [$rslt, $hres_array];
        }


        public function set_to_odb(
            PDO $db_mai, 
            DspMessage $mes, 
            int     $save_id,
            string  $join_uid): bool 
        { 
            [$rslt, $hero_id] = $this->add_tbl($db_mai, $mes, $save_id, $join_uid);
            if (!$rslt || $mes->is_err()) {
                return false;
            }
            return true;
        }


        public static function del_to_odb_all(PDO $db_mai, DspMessage $mes, int $save_id): bool {
            $rslt = self::del_tbl_all($db_mai, $mes, $save_id);
            if (!$rslt || $mes->is_err()) {
                return false;
            }
            return true;
        }

        public static function del_to_odb(PDO $db_mai, DspMessage $mes, int $save_id, string $join_uid): bool {
            $rslt = self::del_tbl($db_mai, $mes, $save_id, $join_uid);
            if (!$rslt || $mes->is_err()) {
                return false;
            }
            return true;
        }

        

        // DB処理。idで指定されたheroレコードセット(単数)を読み込み
        // Heroクラスの配列にセットする
        // 
        protected function get_from_tbl(
            PDO $db_mai, 
            DspMessage $mes, 
            int $id
        ): array {
            $get_heroes_SQL =<<<GET_HEROES01
                SELECT 	id, save_id, uniq_id, join_uid, 
                        name, sex, age, goods, state, lv,  
                        skp_ttl, skp_now, exp_ttl, exp_now, nxe, 
                        abi_p_bsc, abi_m_bsc, is_alive 
                FROM    tbl_hero
                WHERE   id = :id
GET_HEROES01;
            try {
                $get_heroes_stmt = $db_mai->prepare($get_heroes_SQL);
                $get_heroes_stmt->bindValue(':id',  $id);
                $get_heroes_stmt->execute();
                $resultRecordSet = $get_heroes_stmt->fetchAll();
            } catch (PDOException $e) {
                $mes->pdo_error($e, "SQLエラー 37: {$get_heroes_SQL}");
                return [false, []];
            } catch (Throwable $ee) {
                $mes->pdo_error($ee, "SQLの致命的エラー 38: {$get_heroes_SQL}");
                return [false, []];
            } 

            if (count($resultRecordSet) < 1) {
                $mes->set_err_message("データが有りません 39: {$get_heroes_SQL}");
                return [false, []];
            }
            $this->decode($resultRecordSet[0]);
            return [true, $this];
        }


        // DB処理。save_idとjoin_uidで指定されたheroレコードセット(複数)を読み込み
        // Heroクラスの配列にセットする
        // 
        protected static function get_from_tbl_all(
            PDO $db_mai, 
            DspMessage $mes, 
            int $save_id,
            string $join_uid
        ): array {
            $get_heroes_SQL =<<<GET_HEROES01
                SELECT 	id, save_id, uniq_id, join_uid, 
                        name, sex, age, goods, state, lv,  
                        skp_ttl, skp_now, exp_ttl, exp_now, nxe, 
                        abi_p_bsc, abi_m_bsc, is_alive 
                FROM    tbl_hero
                WHERE   save_id = :save_id AND join_uid = :join_uid
GET_HEROES01;
            try {
                $get_heroes_stmt = $db_mai->prepare($get_heroes_SQL);
                $get_heroes_stmt->bindValue(':save_id',  $save_id);
                $get_heroes_stmt->bindValue(':join_uid', $join_uid);
                $get_heroes_stmt->execute();
                $resultRecordSet = $get_heroes_stmt->fetchAll();
            } catch (PDOException $e) {
                $mes->pdo_error($e, "SQLエラー 37: {$get_heroes_SQL}");
                return [false, []];
            } catch (Throwable $ee) {
                $mes->pdo_error($ee, "SQLの致命的エラー 38: {$get_heroes_SQL}");
                return [false, []];
            } 

            if (count($resultRecordSet) < 1) {
                return [true, []];
            }
            $hres_array = [];
            foreach ($resultRecordSet as $hero_data) {
                array_push($hres_array, (new Hero())->decode($hero_data));
            }
            return [true, $hres_array];
        }


        // DB処理。teamテーブルに自身のデータを追加(insert)して
        // そのID(id)を返す
        // 
        protected function add_tbl(
            PDO        $db_mai, 
            DspMessage $mes, 
            int        $save_id,
            string     $join_uid
        ): array {

            $insert_hero_SQL =<<<INSERT_HERO01
            INSERT INTO tbl_hero (
                save_id, uniq_id, join_uid, 
                name, sex, age, goods, state, lv, 
                skp_ttl, skp_now, exp_ttl, exp_now, nxe,
                abi_p_bsc, abi_m_bsc, is_alive 
            )
            VALUES ( 
                :save_id, :uniq_id, :join_uid, 
                :name, :sex, :age, :goods, :state, :lv, 
                :skp_ttl, :skp_now, :exp_ttl, :exp_now, :nxe,
                :abi_p_bsc, :abi_m_bsc, :is_alive 
            )
INSERT_HERO01;
            try {
                if ($this->is_alive) $is_alive = '1'; else $is_alive = '0';
                $insert_hero_stmt = $db_mai->prepare($insert_hero_SQL);
                $insert_hero_stmt->bindValue(':save_id',   $save_id); 
                $insert_hero_stmt->bindValue(':join_uid',  $join_uid); 
                $insert_hero_stmt->bindValue(':uniq_id',   $this->uniq_id); 
                $insert_hero_stmt->bindValue(':name',      $this->name);
                $insert_hero_stmt->bindValue(':sex',       $this->sex);
                $insert_hero_stmt->bindValue(':age',       $this->age);
                $insert_hero_stmt->bindValue(':goods',     $this->goods->to_JSON());
                $insert_hero_stmt->bindValue(':state',     $this->state);
                $insert_hero_stmt->bindValue(':lv',        $this->lv);
                $insert_hero_stmt->bindValue(':skp_ttl',   $this->val['skp']['ttl']);
                $insert_hero_stmt->bindValue(':skp_now',   $this->val['skp']['now']);
                $insert_hero_stmt->bindValue(':exp_ttl',   $this->val['exp']['ttl']);
                $insert_hero_stmt->bindValue(':exp_now',   $this->val['exp']['now']);
                $insert_hero_stmt->bindValue(':nxe',       $this->val['nxe']);
                $insert_hero_stmt->bindValue(':abi_p_bsc', $this->abi_p['bsc']->to_JSON());
                $insert_hero_stmt->bindValue(':abi_m_bsc', $this->abi_m['bsc']->to_JSON());
                $insert_hero_stmt->bindValue(':is_alive',  $is_alive);
                $insert_hero_stmt->execute();
            } catch (PDOException $e) {
                $mes->pdo_error($e, "SQLエラー 8: {$insert_hero_SQL}");
                return [false, -1];
            } catch (Throwable $ee) {
                $mes->pdo_error($ee, "SQLの致命的エラー 9: {$insert_hero_SQL}");
                return [false, -1];
            } 
            $this->id = intval($db_mai->lastInsertId());
            return [true, $this->id];
        }
        

        // DB処理(クラス・メソッド)。Mazeクラスの配列を受け取って、
        // 指定されたsave_idで　heroテーブルに追加(insert)して
        // そのID(id)の配列を返す
        // 
        protected static function add_tbl_all(
            PDO $db_mai, 
            DspMessage $mes, 
            array $hero_array, 
            int $save_id
        ): array 
        {
            if(!is_null($hero_array) && is_array($hero_array)) {
                $hero_id_set = [];
                foreach ($hero_array as $hero) {
                    [$rslt, $hero_id] = $hero->add_tbl($db_mai, $mes, $save_id);
                    if (!$rslt) return [false, []];
                    array_push($hero_id_set, $hero_id);
                }
                return [true, $hero_id_set];
            }
            return [false, -1];
        }

        
        // DB処理。save_idで指定されたレコード(複数)を削除(delete)する
        // 
        public static function del_tbl_all(PDO $db_mai, DspMessage $mes, int $save_id): bool {
            $delete_hero_SQL =<<<DELETE_HERO01
                DELETE FROM tbl_hero 
                WHERE  save_id = :save_id 
DELETE_HERO01;
            try {
                $delete_hero_stmt = $db_mai->prepare($delete_hero_SQL);
                $delete_hero_stmt->bindValue(':save_id', $save_id);
                $delete_hero_stmt->execute();
            } catch (PDOException $e) {
                $mes->pdo_error($e, "SQLエラー 17: {$delete_hero_SQL}");
                return false;
            } catch (Throwable $ee) {
                $mes->pdo_error($ee, "SQLの致命的エラー 18: {$delete_hero_SQL}");
                return false;
            } 
            return true;
        }

                // DB処理。save_idとjoin_uidで指定されたレコード(複数)を削除(delete)する
        // 
        public static function del_tbl(PDO $db_mai, DspMessage $mes, int $save_id, string $join_uid): bool {
            $delete_hero_SQL =<<<DELETE_HERO02
                DELETE FROM tbl_hero 
                WHERE  save_id = :save_id  AND  join_uid = :join_uid
DELETE_HERO02;
            try {
                $delete_hero_stmt = $db_mai->prepare($delete_hero_SQL);
                $delete_hero_stmt->bindValue(':save_id',  $save_id);
                $delete_hero_stmt->bindValue(':join_uid', $join_uid);
                $delete_hero_stmt->execute();
            } catch (PDOException $e) {
                $mes->pdo_error($e, "SQLエラー 17: {$delete_hero_SQL}");
                return false;
            } catch (Throwable $ee) {
                $mes->pdo_error($ee, "SQLの致命的エラー 18: {$delete_hero_SQL}");
                return false;
            } 
            return true;
        }


        public function encode(): array {
            $a = [];
            $a['id']        = $this->id;
            $a['save_id']   = $this->save_id;
            $a['uniq_id']   = $this->uniq_id;
            $a['name']      = $this->name;
            if ($this->is_alive) $a['is_alive'] = '1'; else $a['is_alive'] = '0';
            $a['sex']       = $this->sex; 
            $a['age']       = $this->age; 
            $a['state']     = $this->state; 
            $a['lv']        = $this->lv; 
            $a['val']       = [
                'skp' => ['ttl' => $this->val['skp']['ttl'], 'now' => $this->val['skp']['now']], 
                'exp' => ['ttl' => $this->val['exp']['ttl'], 'now' => $this->val['exp']['now']],
                'nxe' => $this->val['nxe']
            ];
            $a['abi_p_bsc'] = $this->abi_p['bsc']->encode();
            $a['abi_m_bsc'] = $this->abi_m['bsc']->encode(); 
            $a['goods'] = $this->goods->encode(); 

            return $a;
        }
        public function decode(array $a = null): Hero {
            if (!is_null($a) && is_array($a)) {
                if (array_key_exists('id', $a) && is_numeric($a['id'])) {
                    $this->id      = intval($a['id']);
                }
                if (array_key_exists('save_id', $a) && is_numeric($a['save_id'])) {
                    $this->save_id = intval($a['save_id']);
                }
                if (array_key_exists('uniq_id', $a) && is_string($a['uniq_id'])) {
                    $this->uniq_id = $a['uniq_id'];
                }
                if (array_key_exists('join_uid', $a) && is_string($a['join_uid'])) {
                    $this->join_uid = $a['join_uid'];
                }
                if (array_key_exists('name', $a) && is_string($a['name'])) {
                    $this->name    = $a['name'];
                }
                if (array_key_exists('is_alive', $a) && is_numeric($a['is_alive'])) {
                    if ($a['is_alive'] !== '0') $this->is_alive = true; else $this->is_alive = false;
                }
                if (array_key_exists('sex', $a) && is_numeric($a['sex'])) {
                    $this->sex     = intval($a['sex']);
                }
                if (array_key_exists('age', $a) && is_numeric($a['age'])) {
                    $this->age     = intval($a['age']);
                }
                if (array_key_exists('state', $a) && is_numeric($a['state'])) {
                    $this->state   = intval($a['state']);
                }
                if (array_key_exists('lv', $a) && is_numeric($a['lv'])) {
                    $this->lv      = intval($a['lv']);
                }

                // サーバークライアント連携の場合
                if (array_key_exists('val', $a) && is_array($a['val'])) {
                    $val = $a['val'];
                    if (array_key_exists('skp', $val) && is_array($val['skp'])) {
                        if (array_key_exists('ttl', $val['skp']) && is_numeric($val['skp']['ttl'])) {
                            $this->val['skp']['ttl']  = intval($val['skp']['ttl']); 
                        }
                        if (array_key_exists('now', $val['skp']) && is_numeric($val['skp']['now'])) {
                            $this->val['skp']['now']  = intval($val['skp']['now']); 
                        }
                    }
                    if (array_key_exists('exp', $val) && is_array($val['exp'])) {
                        if (array_key_exists('ttl', $val['exp']) && is_numeric($val['exp']['ttl'])) {
                            $this->val['exp']['ttl']  = intval($val['exp']['ttl']); 
                        }
                        if (array_key_exists('now', $val['exp']) && is_numeric($val['exp']['now'])) {
                            $this->val['exp']['now']  = intval($val['exp']['now']); 
                        }
                    }
                    if (array_key_exists('nxe', $val) && is_array($val['nxe'])) {
                        $this->val['nxe']  = intval($val['nxe']); 
                    }
                }
                if (array_key_exists('abi_p_bsc', $a) && is_array($a['abi_p_bsc'])) {
                        $this->abi_p['bsc']->decode($a['abi_p_bsc']);
                }
                if (array_key_exists('abi_m_bsc', $a) && is_array($a['abi_m_bsc'])) {
                        $this->abi_m['bsc']->decode($a['abi_m_bsc']);
                }
                if (array_key_exists('goods', $a) && is_array($a['goods'])) {
                    $this->goods->decode($a['goods']);
                }
                
                // データベース連携の場合
                if (array_key_exists('skp_ttl', $a) && is_numeric($a['skp_ttl'])) {
                    $this->val['skp']['ttl']  = intval($a['skp_ttl']); 
                }
                if (array_key_exists('skp_now', $a) && is_numeric($a['skp_now'])) {
                    $this->val['skp']['now']  = intval($a['skp_now']); 
                }
                if (array_key_exists('exp_ttl', $a) && is_numeric($a['exp_ttl'])) {
                    $this->val['exp']['ttl']  = intval($a['exp_ttl']); 
                }
                if (array_key_exists('exp_now', $a) && is_numeric($a['exp_now'])) {
                    $this->val['exp']['now']  = intval($a['exp_now']); 
                }
                if (array_key_exists('nxe',     $a) && is_numeric($a['nxe'])) {
                    $this->val['nxe']  = intval($a['nxe']); 
                }

                if (array_key_exists('abi_p_bsc', $a) && is_string($a['abi_p_bsc'])) {
                    $this->abi_p['bsc']->from_JSON($a['abi_p_bsc']);
                }
                if (array_key_exists('abi_m_bsc', $a) && is_string($a['abi_m_bsc'])) {
                    $this->abi_m['bsc']->from_JSON($a['abi_m_bsc']);
                }
                if (array_key_exists('goods', $a) && is_string($a['goods'])) {
                    $this->goods->from_JSON($a['goods']);
                }
            }
            return $this;
        }
        public static function encode_heroes(array $a): array {
            $heroes_data = [];
            if (!is_null($a) && is_array($a)) {
                foreach ($a as $hero) {
                    array_push($heroes_data, $hero->encode());
                }
            }
            return $heroes_data;
        }
        public static function decode_heroes(array $a): array {
            $heroes = [];
            if (!is_null($a) && is_array($a)) {
                foreach ($a as $heroes_data) {
                    $hero = new Hero();
                    $hero->decode($heroes_data);
                    array_push($heroes, $hero);
                }
            }
            return $heroes;
        }
    }
?>
