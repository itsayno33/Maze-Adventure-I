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
    require_once 'Class_Goods.php'; 
    require_once 'Class_Rand.php'; 

    class Team implements I_Locate { 
        protected int      $id      = 0;
        protected int      $save_id = 0;
        protected string   $uniq_id = '';
        protected string   $name;
        protected string   $loc_kind;
        protected Location $loc;
        protected Point3D  $cur_pos;
        protected Direct   $cur_dir;
        protected Goods    $goods;
        protected array    $heroes;
        protected bool     $is_hero;

        public    function __construct(array $a = null) {
            $this->cur_pos   =  new Point3D(0, 0, 0);
            $this->cur_dir   =  new Direct(Direct::N);
            $this->name      = 'New Team';
            $this->uniq_id   =  Rand::uniq_id('mai_team#');
            $this->loc_kind  = '';
            $this->loc       =  new Location();
            $this->goods     =  new Goods();
            $this->heroes    =  [];
            $this->is_hero   =  true;

            $this->__init($a);
        } 
        protected function __init(array $a = null) {
            if (!is_null($a) && is_array($a)) {
                if (array_key_exists('name', $a) && ($a['name'] !== '')) {
                    $this->name   = $a['name'];
                }
                if (array_key_exists('uniq_id', $a)   && ($a['uniq_id'] !== '')) {
                    $this->uniq_id = $a['uniq_id'];
                }
                if (array_key_exists('loc_kind', $a)   && ($a['loc_kind'] !== '')) {
                    $this->loc_kind = $a['loc_kind'];
                }
                if (array_key_exists('is_hero', $a) && (is_numeric($a['is_hero']))) {
                    if ($a['is_hero'] != '0') $this->is_hero = true; else $this->is_hero = false;
                }
                if (array_key_exists('Point3D', $a) && ($a['Point3D'] instanceof Point3D)) {
                    $this->cur_pos = $a['Point3D'];
                }
                if (
                    array_key_exists('x', $a) && (is_numeric($a['x']) && $a['x'] >  0)
                &&  array_key_exists('y', $a) && (is_numeric($a['y']) && $a['y'] >  0)
                &&  array_key_exists('z', $a) && (is_numeric($a['z']) && $a['z'] >= 0)
                ) {
                    $this->cur_pos = new Point3D($a['x'], $a['y'], $a['z']);
                    $this->loc->set_pos($this->cur_pos);
                }
                if (array_key_exists('Direct', $a) && ($a['Direct'] instanceof Direct)) {
                    $this->cur_dir = $a['Direct'];
                    $this->loc->set_dir($this->cur_dir);
                }
                if (array_key_exists('d', $a) && (is_numeric($a['d']))) {
                    $this->cur_dir = new Direct($a['d']);
                    $this->loc->set_dir($this->cur_dir);
                }
                if (array_key_exists('Hero', $a) && ($a['Hero'] instanceof Hero)) {
                    $this->append_hero($a['Hero']);
                }
                if (array_key_exists('Location', $a) && is_object($a['Location'])) {
                    if ($a['Location'] instanceof Location) $this->loc = $a['Location'];
                }
                if (array_key_exists('Goods', $a) && is_object($a['Goods'])) {
                    if ($a['Goods'] instanceof Goods) $this->goods = $a['Goods'];
                }
                if (array_key_exists('Heroes', $a) && is_array($a['Heroes'])) {
                    foreach ($a['Heroes'] as $hero) {
                        if ($hero instanceof Hero) $this->append_hero($hero);
                    }
                }
            }
        }
        public function set_prp(array $a = null): void {
            $this->__init($a);
        }
        public function get_id()  : int    {return $this->id;}
        public function get_name(): string {return $this->name;}
        public function set_name(string $name): void {$this->name = $name;}

        public function uid(): string      {return $this->uniq_id;}
        public function get_lckd(): string {return $this->loc_kind;}
        public function set_lckd(string $lckd): void {$this->loc_kind = $lckd;}

        
        public function get_pos(): Point3D {
            return $this->cur_pos; 
        }
        public function set_pos(Point3D $p): void {
            $this->cur_pos  = $p;
        }
        public function get_z(): int {
            return $this->cur_pos->z;
        }
        public function set_z(int $z): void {
            $this->cur_pos->z = $z;
        }
        public function get_dir(): Direct {
            return $this->cur_dir;
        }
        public function set_dir(Direct $d): void {
            $this->cur_dir = $d;
        }
        public function get_loc(): Location {
            return $this->loc;
        }
        public function set_loc(Location $loc): void {
            $loc->set_tid($this->uniq_id);

            $this->loc = $loc;
            $this->set_pos($loc->get_pos());
            $this->set_dir($loc->get_dir());
        }
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
            [$rslt0, $team_array] = self::get_from_tbl_all($db_mai, $mes, $save_id);
            if (!$rslt0 || $mes->is_err()) {
                return [false, []];
            }
            foreach ($team_array as $team) {
                [$rslt1, $hres_array] = Hero::get_from_odb_all($db_mai, $mes, $save_id, $team->uid());
                if (!$rslt1 || $mes->is_err()) {
                    return [false, []];
                }
                $team->heroes = $hres_array;
            }
            return [true, $team_array];
        }

        public function get_from_odb(PDO $db_mai, DspMessage $mes, int $save_id): bool {
            $rslt0 = $this->get_from_tbl($db_mai, $mes, $save_id);
            if (!$rslt0 || $mes->is_err()) {
                return false;
            }
            [$rslt1, $hres_array] = Hero::get_from_odb_all($db_mai, $mes, $save_id, $this->uniq_id);
            if (!$rslt1 || $mes->is_err()) {
                return false;
            }
            $this->heroes = $hres_array;
            return true;
        }


        public function set_to_odb(PDO $db_mai, DspMessage $mes, int $save_id): bool {
            [$rslt0, $team_id] = $this->add_tbl($db_mai, $mes, $save_id);
            if (!$rslt0 || $mes->is_err()) {
                return false;
            }
            foreach ($this->heroes as $hero) {
                $rslt1 = $hero->set_to_odb($db_mai, $mes, $save_id, $this->uniq_id);
                if (!$rslt1 || $mes->is_err()) {
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
            $rslt2 = $this->del_tbl($db_mai, $mes, $save_id);
            if (!$rslt2 || $mes->is_err()) {
                return false;
            }
            return true;
        }



        // DB処理。save_idで指定されたteamレコードセットを読み込み
        // Teamクラスの配列にセットする
        // 
        protected static function get_from_tbl_all(
            PDO $db_mai, 
            DspMessage $mes, 
            int $save_id
        ): array {
            $get_team_SQL =<<<GET_TEAM01
                SELECT 	id, save_id, uniq_id, name, locate, goods, is_hero
                FROM tbl_team
                WHERE   save_id = :save_id
        GET_TEAM01;
            try {
                $get_team_stmt = $db_mai->prepare($get_team_SQL);
                $get_team_stmt->bindValue(':save_id',  $save_id);
                $get_team_stmt->execute();
                $resultRecordSet = $get_team_stmt->fetchAll();
            } catch (PDOException $e) {
                $mes->pdo_error($e, "SQLエラー 37: {$get_team_SQL}");
                return [false, []];
            } catch (Throwable $ee) {
                $mes->pdo_error($ee, "SQLの致命的エラー 38: {$get_team_SQL}");
                return [false, []];
            } 
        
            if (count($resultRecordSet) < 1) {
                return [true,  []];
            }
            $team_array = [];
            foreach ($resultRecordSet as $resultRecord) {
                array_push($team_array,  (new Team())->decode($resultRecord));
            }
            return [true, $team_array];
        }

        // DB処理。save_idと自身のuniq_idで指定されたteamレコードセットを読み込む
        // 
        protected function get_from_tbl(
            PDO $db_mai, 
            DspMessage $mes, 
            int $save_id
        ): bool {
            $get_team_SQL =<<<GET_TEAM02
                SELECT 	id, save_id, uniq_id, name, locate, goods, is_hero 
                FROM tbl_team
                WHERE   save_id = :save_id  AND  uniq_id = :uniq_id
        GET_TEAM02;
            try {
                $get_team_stmt = $db_mai->prepare($get_team_SQL);
                $get_team_stmt->bindValue(':save_id',  $save_id);
                $get_team_stmt->bindValue(':uniq_id',  $this->uniq_id);
                $get_team_stmt->execute();
                $resultRecordSet = $get_team_stmt->fetchAll();
            } catch (PDOException $e) {
                $mes->pdo_error($e, "SQLエラー 37b: {$get_team_SQL}");
                return false;
            } catch (Throwable $ee) {
                $mes->pdo_error($ee, "SQLの致命的エラー 38b: {$get_team_SQL}");
                return false;
            } 
        
            if (count($resultRecordSet) < 1) {
                $mes->set_err_message('Uniq_idに該当するTeamデータが有りません');
                return false;
            }
            $this->decode($resultRecordSet[0]);
            return true;
        }
        

        // DB処理。teamテーブルに自身のデータを追加(insert)して
        // そのID(id)を返す
        // 
        protected function add_tbl(
            PDO $db_mai, 
            DspMessage $mes, 
            int $save_id
        ): array {
            $insert_team_SQL =<<<INSERT_TEAM01
                INSERT INTO tbl_team (
                    save_id, uniq_id, name, locate,  goods, is_hero
                )
                VALUES ( 
                    :save_id, :uniq_id, :name, :locate,  :goods, :is_hero
                )
INSERT_TEAM01;
            if ($this->is_hero) $is_hero = 1; else $is_hero = 0;
            try {
                $insert_team_stmt = $db_mai->prepare($insert_team_SQL);
                $insert_team_stmt->bindValue(':save_id',   $save_id);  
                $insert_team_stmt->bindValue(':uniq_id',   $this->uniq_id); 
                $insert_team_stmt->bindValue(':name',      $this->name); 
                $insert_team_stmt->bindValue(':locate',    $this->loc->to_JSON()); 
                $insert_team_stmt->bindValue(':goods',     $this->goods->to_JSON());  
                $insert_team_stmt->bindValue(':is_hero',   $is_hero); 
                $insert_team_stmt->execute();
            } catch (PDOException $e) {
                $mes->pdo_error($e, "SQLエラー 6: {$insert_team_SQL}");
                return [false, -1];
            } catch (Throwable $ee) {
                $mes->pdo_error($ee, "SQLの致命的エラー 7: {$insert_team_SQL}");
                return [false, -1];
            } 
            $this->id = intval($db_mai->lastInsertId());
            return [true, $this->id];
        }
        
        // DB処理(クラス・メソッド)。Teamクラスの配列を受け取って、
        // 指定されたsave_idで　teamテーブルに追加(insert)して
        // そのID(id)の配列を返す
        // 
        protected static function add_tbl_all(
            PDO $db_mai, 
            DspMessage $mes, 
            array $team_array, 
            int $save_id
        ): array 
        {
            if(!is_null($team_array) && is_array($team_array)) {
                $team_id_set = [];
                foreach ($team_array as $team) {
                    [$rslt, $team_id] = $team->add_tbl($db_mai, $mes, $save_id);
                    if (!$rslt) return [false, []];
                    array_push($team_id_set, $team_id);
                }
                return [true, $team_id_set];
            }
            return [false, -1];
        }

        // DB処理。save_idで指定されたレコード(複数)を削除(delete)する
        // 
        public static function del_tbl(PDO $db_mai, DspMessage $mes, int $save_id): bool {
            $delete_team_SQL =<<<DELETE_TEAM01
                DELETE FROM tbl_team 
                WHERE  save_id = :save_id
DELETE_TEAM01;
            try {
                $delete_team_stmt = $db_mai->prepare($delete_team_SQL);
                $delete_team_stmt->bindValue(':save_id', $save_id);
                $delete_team_stmt->execute();
            } catch (PDOException $e) {
                $mes->pdo_error($e, "SQLエラー 15: {$delete_team_SQL}");
                return false;
            } catch (Throwable $ee) {
                $mes->pdo_error($ee, "SQLの致命的エラー 16: {$delete_team_SQL}");
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
            $e['locate']    = $this->loc->encode();
            $e['goods']     = $this->goods->encode();
            $e['heroes']    = Hero::encode_heroes($this->heroes);

            if ($this->is_hero) $e['is_hero'] = '1'; else $e['is_hero'] = '0';

            return $e;
        }
        public function decode(array $a): Team {
            if (!is_null($a) && is_array($a)) {
                if (array_key_exists('id', $a) && is_numeric($a['id'])) {
                    $this->id         = intval($a['id']);
                }
                if (array_key_exists('save_id', $a) && is_numeric($a['save_id'])) {
                    $this->save_id    = intval($a['save_id']);
                }
                if (array_key_exists('uniq_id', $a) && is_string($a['uniq_id'])) {
                    $this->uniq_id    = $a['uniq_id'];
                }
                if (array_key_exists('name', $a) && $a['name'] !== '') {
                    $this->name       = $a['name'];
                }
                if (array_key_exists('is_hero', $a) && is_numeric($a['is_hero'])) {
                    if ($a['is_hero'] != '0') $this->is_hero = true; else $this->is_hero = false;
                }
                if (array_key_exists('locate', $a)) {
                    if (is_string($a['locate'])) {
                        $this->loc->from_JSON($a['locate']);
                    } else {
                        $this->loc->decode($a['locate']);
                    }
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
            $all_team_data = [];
            if (!is_null($a) && is_array($a)) {
                foreach ($a as $team) {
                    array_push($all_team_data, $team->encode());
                }
            }
            return $all_team_data;
        }
        public static function decode_all(array $a): array {
            $all_team = [];
            if (!is_null($a) && is_array($a)) {
                foreach ($a as $team_data) {
                    array_push($all_team, (new Team())->decode($team_data));
                }
            }
            return $all_team;
        }
    }

?>
