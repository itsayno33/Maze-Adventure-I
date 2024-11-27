<?php
    declare(strict_types=1);

    // 日本語の利用
    mb_internal_encoding("UTF-8");
    mb_regex_encoding("UTF-8");

    // 利用クラス等の読み込み
    require_once 'Class_DspMessage.php'; // 画面メッセージの表示用クラス
    require_once 'Class_PointSet.php';   // 位置情報のクラス
    require_once 'Class_Direct.php';     // 方向(東西南北)のクラス
    require_once 'Class_Hero.php';       // Hero(チームメンバー)のクラス
    require_once 'Class_Location.php'; 
    require_once 'Class_Rand.php'; 

    class Guild implements I_Locate {
        public int     $id      = -1;
        public int     $save_id = -1;
        public string  $uniq_id = '';
        public string  $name    = '';
        public Goods   $goods;
        public array   $heroes;

        public function __construct(array $a = null) {
            $this->id        = -1;
            $this->save_id   = -1;
            $this->uniq_id   = Rand::uniq_id('mai_guld#');
            $this->name      = '始まりの街のギルド';
            $this->goods     = new Goods();
            $this->heroes    = [];

            if (!is_null($a) && is_array($a)) $this->decode($a);
        } 

        public function uid(): string {return $this->uniq_id;}
        public function get_lckd(): string {return 'Guld';}
        public function get_name(): string {return $this->name;}
        public function get_pos(): Point3D {return new Point3D(0, 0, 0);}
        public function get_dir(): Direct  {return new Direct();}


        public function get_number_of_heroes(): int {
            return count($this->heroes);
        }
        public function get_hero(int $num): Hero|null {
            if ($num < 0 || $num >= count($this->heroes)) return null;
            return $this->heroes[$num];
        }
        public function append_hero(Hero $hero): void {
            array_push($this->heroes, $hero);
        }
        public function remove_hero(Hero $hero): void {
            for ($i = 0; $i < count($this->heroes); $i++) {
                if ($hero == $this->heroes[$i]) {
                    array_splice($this->heroes, $i, 1);
                    return;
                }
            }
        }


        public static function get_from_odb_all(PDO $db_mai, DspMessage $mes, int $save_id): array {
            [$rslt0, $guld_array] = self::get_from_tbl_all($db_mai, $mes, $save_id);
            if (!$rslt0 || $mes->is_err()) {
                return [false, []];
            }

            foreach ($guld_array as $guld) {
                [$rslt1, $hres_array] = Hero::get_from_odb_all($db_mai, $mes, $save_id, $guld->uid());
                if (!$rslt1 || $mes->is_err()) {
                    return [false, []];
                }
                $guld->heroes = $hres_array;
            }

            return [true, $guld_array];
        }


        public function set_to_odb(PDO $db_mai, DspMessage $mes, int $save_id): bool {
            [$rslt1, $guld_id] = $this->add_tbl($db_mai, $mes, $save_id);
            if (!$rslt1 || $mes->is_err()) {
                return false;
            }
            foreach ($this->heroes as $hero) {
                $rslt2 = $hero->set_to_odb($db_mai, $mes, $save_id, $this->uniq_id);
                if (!$rslt2 || $mes->is_err()) {
                    return false;
                }
            }
            return true;
        } 


        public function del_to_odb(PDO $db_mai, DspMessage $mes, int $save_id): bool {
            $rslt1 = Hero::del_to_odb($db_mai, $mes, $save_id, $this->uniq_id);
            if (!$rslt1 || $mes->is_err()) {
                return false;
            }
            $rslt1 = $this->del_tbl($db_mai, $mes, $save_id);
            if (!$rslt1 || $mes->is_err()) {
                return false;
            }
            return true;
        }



        // DB処理。save_idで指定されたguldレコードセットを読み込み
        // Guildクラスの配列にセットする
        // 
        protected static function get_from_tbl_all(
            PDO $db_mai, 
            DspMessage $mes, 
            int $save_id
        ): array {
            $get_guld_SQL =<<<GET_GULD01
                SELECT 	id, save_id, uniq_id, name, goods 
                FROM    tbl_guld
                WHERE   save_id = :save_id
GET_GULD01;
            try {
                $get_guld_stmt = $db_mai->prepare($get_guld_SQL);
                $get_guld_stmt->bindValue(':save_id',  $save_id);
                $get_guld_stmt->execute();
                $resultRecordSet = $get_guld_stmt->fetchAll();
            } catch (PDOException $e) {
                $mes->pdo_error($e, "SQLエラー 67: {$get_guld_SQL}");
                return [false, []];
            } catch (Throwable $ee) {
                $mes->pdo_error($ee, "SQLの致命的エラー 68: {$get_guld_SQL}");
                return [false, []];
            } 
        
            if (count($resultRecordSet) < 1) {
                return [true,  []];
            }
            $guld_array = [];
            foreach ($resultRecordSet as $resultRecord) {
                array_push($guld_array,  (new Guild())->decode($resultRecord));
            }
            return [true, $guld_array];
        }

        // DB処理。guldテーブルに自身のデータを追加(insert)して
        // そのID(id)を返す
        // 
        protected function add_tbl(
            PDO $db_mai, 
            DspMessage $mes, 
            int $save_id
        ): array {

            $insert_guld_SQL =<<<INSERT_GULD02
                INSERT INTO tbl_guld ( save_id,  uniq_id,  name,  goods )
                VALUES              ( :save_id, :uniq_id, :name, :goods )
INSERT_GULD02;
            try {
                $insert_guld_stmt = $db_mai->prepare($insert_guld_SQL);
                $insert_guld_stmt->bindValue(':save_id',  $save_id);  
                $insert_guld_stmt->bindValue(':uniq_id',  $this->uniq_id);  
                $insert_guld_stmt->bindValue(':name',     $this->name); 
                $insert_guld_stmt->bindValue(':goods',    $this->goods->to_JSON());  
                $insert_guld_stmt->execute();
            } catch (PDOException $e) {
                $mes->pdo_error($e, "SQLエラー 61: {$insert_guld_SQL}");
                return [false, -1];
            } catch (Throwable $ee) {
                $mes->pdo_error($ee, "SQLの致命的エラー 62: {$insert_guld_SQL}");
                return [false, -1];
            } 
            $this->id = intval($db_mai->lastInsertId());
            return [true, $this->id];
        }

        // DB処理。save_idで指定されたレコード(複数)を削除(delete)する
        // 
        public static function del_tbl(PDO $db_mai, DspMessage $mes, int $save_id): bool {
            $delete_guld_SQL =<<<DELETE_GULD01
                DELETE FROM tbl_guld 
                WHERE  save_id = :save_id
DELETE_GULD01;
            try {
                $delete_guld_stmt = $db_mai->prepare($delete_guld_SQL);
                $delete_guld_stmt->bindValue(':save_id', $save_id);
                $delete_guld_stmt->execute();
            } catch (PDOException $e) {
                $mes->pdo_error($e, "SQLエラー 68: {$delete_guld_SQL}");
                return false;
            } catch (Throwable $ee) {
                $mes->pdo_error($ee, "SQLの致命的エラー 69: {$delete_guld_SQL}");
                return false;
            } 
            return true;
        }


        public function encode(): array {
            $e = [];
            $e['id']        = strval($this->id);
            $e['save_id']   = strval($this->save_id);
            $e['uniq_id']   = $this->uniq_id;
            $e['name']      = $this->name;
            $e['goods']     = $this->goods->encode();
            $e['heroes']    = Hero::encode_heroes($this->heroes);
            return $e;
        }
        public function decode(array $a): Guild {
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
                if (array_key_exists('name', $a) && ($a['name'] != '')) {
                    $this->name    = $a['name'];
                }
                if (array_key_exists('goods', $a) && is_array($a['goods'])) {
                    if (is_string($a['goods'])) {
                        $this->goods->from_JSON($a['goods']);
                    } else {
                        $this->goods->decode($a['goods']);
                    }
                }
                if (array_key_exists('heroes', $a) && is_array($a['heroes'])) {
                    $this->heroes     = Hero::decode_heroes($a['heroes']);
                }
            }
            return $this;
        }
        public static function encode_all(array $a): array {
            $all_guld_data = [];
            if (!is_null($a) && is_array($a)) {
                foreach ($a as $guld) {
                    array_push($all_guld_data, $guld->encode());
                }
            }
            return $all_guld_data;
        }
        public static function decode_all(array $a): array {
            $all_guld = [];
            if (!is_null($a) && is_array($a)) {
                foreach ($a as $guld_data) {
                    array_push($all_guld, (new Guild())->decode($guld_data));
                }
            }
            return $all_guld;
        }
    }

?>
