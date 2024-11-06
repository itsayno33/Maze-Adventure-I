<?php
    // MAZE関係クラス全般

    declare(strict_types=1);

    // 本番環境はURLの先頭を書き換える
    $db_host = '127.0.0.1';
    
    // 日本語の利用
    mb_internal_encoding("UTF-8");
    mb_regex_encoding("UTF-8");
    
    // 利用クラス等の読み込み
    require_once 'Class_DspMessage.php'; // 画面メッセージの表示用クラス
    require_once 'Class_Location.php'; 
    require_once 'Class_Maze.php'; 
    require_once 'Class_Team.php'; 
    require_once 'Class_Guild.php'; 
 
    class SaveData {
        public int      $save_id;
        public int      $uniq_no;
        public int      $player_id; 
        public string   $title;
        public string   $detail;
        public string   $point;
        public bool     $auto_mode;
        public bool     $is_active;
        public bool     $is_delete;
        public DateTime $save_time;

        public Location $mypos;    // 保存時の現在地

        public array    $all_mvpt; // その時点で挑戦した迷宮一式 Maze[]
        public array    $all_maze; // その時点で挑戦した迷宮一式 Maze[]
        public array    $all_team; // 同、迷宮探検中のチーム一式 Team[]
        public array    $all_guld; // 同、ギルド等で待機しているキャラ一式 Hero[] <- ここはギルドクラス(Guild。略称guld)を作ってそのインスタンスを持つべきか

        public function __construct(array $a) {
            $this->save_id   = -1;
            $this->player_id = 1; 
            $this->uniq_no   = -1;
            $this->title     = '';
            $this->detail    = '';
            $this->point     = '';
            $this->auto_mode = false;
            $this->is_active = true;
            $this->is_delete = false;
            $this->save_time = new DateTime('now');

            $this->mypos     = new Location();

            $this->all_mvpt  = [];
            $this->all_maze  = [];
            $this->all_team  = [];
            $this->all_guld  = []; 

            if (!is_null($a) && is_array($a)) $this->decode($a);
        }


        public function get_sid(): int {
            return $this->save_id;
        }

        public function set_sid(int $save_id): void {
            $this->save_id = $save_id;
        }



        public function get_from_odb(PDO $db_mai, DspMessage $mes): bool {
            $save_id = $this->save_id;

            $rslt = $this->get_from_tbl($db_mai, $mes, $save_id);
            if (!$rslt || $mes->is_err()) {
                    return false;
            }

            [$rslt, $maze_array] = Maze::get_from_odb_all($db_mai, $mes, $save_id);
            if (!$rslt || $mes->is_err()) {
                return false;
            }
            $this->all_maze = $maze_array;
           
            [$rslt, $team_array] = Team::get_from_odb_all($db_mai, $mes, $save_id);
            if (!$rslt || $mes->is_err()) {
                return false;
            }
            $this->all_team = $team_array;
            
            [$rslt, $guld_array] = Guild::get_from_odb_all($db_mai, $mes, $save_id);
            if (!$rslt || $mes->is_err()) {
                return false;
            }
            $this->all_guld = $guld_array;

            return true;
        }


        public function set_to_odb(PDO $db_mai, DspMessage $mes): bool {
            [$rslt0, $save_id] = $this->add_tbl($db_mai, $mes);
            if (!$rslt0 || $mes->is_err()) {
                return false;
            }

            foreach ($this->all_maze as $maze) {
                $rslt1 = $maze->set_to_odb($db_mai, $mes, $save_id);
                if (!$rslt1 || $mes->is_err()) {
                    return false;
                }
            }
            
            foreach ($this->all_team as $team) {
                $rslt2 = $team->set_to_odb($db_mai, $mes, $save_id);
                if (!$rslt2 || $mes->is_err()) {
                    return false;
                }
            }
            
            foreach ($this->all_guld as $guld) {
                $rslt3 = $guld->set_to_odb($db_mai, $mes, $save_id);
                if (!$rslt3 || $mes->is_err()) {
                    return false;
                }
            }

            return true;
        }

        
        public function del_to_odb(PDO $db_mai, DspMessage $mes, int $save_id): bool {
            $rslt = Hero::del_tbl_all($db_mai, $mes, $save_id);
            if (!$rslt || $mes->is_err()) {
                return false;
            }

            $rslt = Guild::del_tbl($db_mai, $mes, $save_id);
            if (!$rslt || $mes->is_err()) {
                return false;
            }

            $rslt = Team::del_tbl($db_mai, $mes, $save_id);
            if (!$rslt || $mes->is_err()) {
                return false;
            }

            $rslt = Maze::del_tbl($db_mai, $mes, $save_id);
            if (!$rslt || $mes->is_err()) {
                return false;
            }

            $rslt = SaveData::del_tbl($db_mai, $mes, $save_id);
            if (!$rslt || $mes->is_err()) {
                return false;
            }

            return true;
        }


                
        // DB処理。player_dに該当するセーブデータをDBから読み込み
        // SaveData[]の配列を返す
        // 非活性データや削除済データはスキップする
        // 
        public static function get_list_by_pid(PDO $db_mai, DspMessage $mes, int $player_id): array {
            $get_save_SQL =<<<GET_SAVE_INFO01
                SELECT save_id, player_id, uniq_no, title, detail, point, 
                       auto_mode, is_active, is_delete, 
                       mypos, all_mvpt, 
                       DATE_FORMAT(save_time,'%Y-%m-%dT%H:%i:%s.%fZ') AS save_time
                FROM   tbl_save
                WHERE  player_id = :player_id 
                ORDER  BY title COLLATE utf8mb4_unicode_ci ASC
GET_SAVE_INFO01;
            try {
                $get_save_stmt = $db_mai->prepare($get_save_SQL);
                $get_save_stmt->bindValue(':player_id', $player_id);
                $get_save_stmt->execute();
                $resultRecordSet = $get_save_stmt->fetchAll();
            } catch (PDOException $e) {
                $mes->pdo_error($e, "SQLエラー 50: {$get_save_SQL}");
                return [false, []];
            } catch (Throwable $ee) {
                $mes->pdo_error($ee, "SQLの致命的エラー 51: {$get_save_SQL}");
                return [false, []];
            } 

            if (count($resultRecordSet) < 1) return [true, []];

            $save_data_set = [];
            foreach ($resultRecordSet as $resultRecord) {
                if ($resultRecord['is_active'] == '0') continue;
                if ($resultRecord['is_delete'] != '0') continue;

                array_push(
                    $save_data_set, 
                    (new SaveData([]))->decode($resultRecord)
                );
            }
            return [true, $save_data_set];
        }

        // DB処理。ユニーク・ナンバーからsave_idを得る。該当するレコードが無ければ戻り値でfalseを返す
        // 
        public function get_save_id_at_tbl(PDO $db_mai, DspMessage $mes): array {
            $seek_save_SQL =<<<SEEK_SAVE01
            SELECT save_id, player_id, uniq_no, title, detail, point, 
                   auto_mode, is_active, is_delete, 
                   mypos, all_mvpt, 
                   DATE_FORMAT(save_time,'%Y-%m-%dT%H:%i:%s.%fZ') AS save_time
            FROM   tbl_save
            WHERE  player_id = :player_id AND uniq_no = :uniq_no
            ORDER  BY uniq_no
SEEK_SAVE01;
            try {
                $seek_save_stmt = $db_mai->prepare($seek_save_SQL);
                $seek_save_stmt->bindValue(':player_id', $this->player_id);
                $seek_save_stmt->bindValue(':uniq_no',   $this->uniq_no);
                $seek_save_stmt->execute();
                $resultRecordSet = $seek_save_stmt->fetchAll();
            } catch (PDOException $e) {
                $mes->pdo_error($e, "SQLエラー 20: {$seek_save_SQL}");
                return [false, -1];
            } catch (Throwable $ee) {
                $mes->pdo_error($ee, "SQLの致命的エラー 21: {$seek_save_SQL}");
                return [false, -1];
            } 
            if (count($resultRecordSet) < 1) {
                return [false, -1];
            }

//            $this->decode($resultRecordSet[0]);
            return [true, $resultRecordSet[0]];
        }

        // DB処理。save_idで指定されたsaveレコード(単数)を読み込み
        // save_idを返す
        // その際に該当するレコードが有れば自身のプロパティにセットする
        // 
        protected function get_from_tbl(PDO $db_mai, DspMessage $mes, int $save_id): bool {
            $get_save_SQL =<<<GET_SAVE01
                SELECT save_id, player_id, uniq_no, title, detail, point, 
                       auto_mode, is_active, is_delete, 
                       mypos, all_mvpt, 
                       DATE_FORMAT(save_time,'%Y-%m-%dT%H:%i:%s.%fZ') AS save_time
                FROM   tbl_save
                WHERE  save_id = :save_id
GET_SAVE01;
            try {
                $get_save_stmt = $db_mai->prepare($get_save_SQL);
                $get_save_stmt->bindValue(':save_id', $save_id);
                $get_save_stmt->execute();
                $resultRecordSet = $get_save_stmt->fetchAll();
            } catch (PDOException $e) {
                $mes->pdo_error($e, "SQLエラー 30: {$get_save_SQL}");
                return false;
            } catch (Throwable $ee) {
                $mes->pdo_error($ee, "SQLの致命的エラー 31: {$get_save_SQL}");
                return false;
            } 
            if (count($resultRecordSet) < 1) {
                $mes->set_err_message("該当するデータが有りません: {$get_save_SQL}");
                return false;
            }

            $this->decode($resultRecordSet[0]);
            return true;
        }

        // DB処理。saveテーブルに自身のデータを追加(insert)して
        // そのID(save_id)を返す
        // 
        protected function add_tbl(PDO $db_mai, DspMessage $mes): array {
            if ($this->auto_mode) $auto_mode = '1'; else $auto_mode = '0';
            if ($this->is_active) $is_active = '1'; else $is_active = '0';
            if ($this->is_delete) $is_delete = '1'; else $is_delete = '0';

            $insert_save_SQL =<<<NEW_SAVE01
                INSERT  INTO tbl_save (
                        player_id, uniq_no,   title, detail, point, 
                        mypos, all_mvpt, 
                        auto_mode, is_active, is_delete
                    )
                VALUES ( 
                        :player_id, :uniq_no,   :title, :detail, :point, 
                        :mypos, :all_mvpt, 
                        :auto_mode, :is_active, :is_delete)
NEW_SAVE01;
            try {
                $insert_save_stmt = $db_mai->prepare($insert_save_SQL);
                $insert_save_stmt->bindValue(':player_id', $this->player_id);
                $insert_save_stmt->bindValue(':uniq_no',   $this->uniq_no);
                $insert_save_stmt->bindValue(':title',     $this->title);
                $insert_save_stmt->bindValue(':detail',    $this->detail);
                $insert_save_stmt->bindValue(':point',     $this->point);
                $insert_save_stmt->bindValue(':mypos',     $this->mypos->to_JSON());
                $insert_save_stmt->bindValue(':all_mvpt',  Location::from_obj_to_JSON($this->all_mvpt));
                $insert_save_stmt->bindValue(':auto_mode', $auto_mode);
                $insert_save_stmt->bindValue(':is_active', $is_active);
                $insert_save_stmt->bindValue(':is_delete', $is_delete);
                $insert_save_stmt->execute();
            } catch (PDOException $e) {
                $mes->pdo_error($e, "SQLエラー 0: {$insert_save_SQL}");
                return [false, -1];
            } catch (Throwable $ee) {
                $mes->pdo_error($ee, "SQLの致命的エラー 00: {$insert_save_SQL}");
                return [false, -1];
            } 
            $this->save_id = intval($db_mai->lastInsertId());
            return [true, $this->save_id];
        }

        // DB処理。save_idで指定されたレコードを削除(delete)する
        // 
        protected static function del_tbl(PDO $db_mai, DspMessage $mes, int $save_id): bool {
            $delete_save_SQL =<<<DELETE_SAVE01
                DELETE FROM tbl_save 
                WHERE  save_id = :save_id
        DELETE_SAVE01;
            try {
                $delete_save_stmt = $db_mai->prepare($delete_save_SQL);
                $delete_save_stmt->bindValue(':save_id', $save_id);
                $delete_save_stmt->execute();
            } catch (PDOException $e) {
                $mes->pdo_error($e, "SQLエラー 10: {$delete_save_SQL}");
                return false;
            } catch (Throwable $ee) {
                $mes->pdo_error($ee, "SQLの致命的エラー 11: {$delete_save_SQL}");
                return false;
            } 
            return true;
        }

        
        public function encode(): array {
            $a = [];
            $a['save_id']    = strval($this->save_id);
            $a['player_id']  = strval($this->player_id);
            $a['uniq_no']    = strval($this->uniq_no);
            $a['title']      = $this->title;
            $a['detail']     = $this->detail;
            $a['point']      = $this->point;
            if ($this->auto_mode) $a['auto_mode'] = '1'; else $a['auto_mode'] = '0';
            if ($this->is_active) $a['is_active'] = '1'; else $a['is_active'] = '0';
            if ($this->is_delete) $a['is_delete'] = '1'; else $a['is_delete'] = '0';

            $a['save_time']  = $this->save_time->format('Y-m-d H:i:s:u');

            $a['mypos']      = $this->mypos->encode();

            $a['all_mvpt']  = Location ::encode_all($this->all_mvpt);
            $a['all_maze']  = Maze ::encode_all($this->all_maze);
            $a['all_team']  = Team ::encode_all($this->all_team);
            $a['all_guld']  = Guild::encode_all($this->all_guld);

            return $a;
        }
        public function decode(array $a): SaveData {
            if (is_null($a) || !is_array($a)) return $this;

            if (array_key_exists('save_id', $a) && is_numeric($a['save_id'])) {
                $this->save_id    = intval($a['save_id']);
            }
            if (array_key_exists('player_id', $a) && is_numeric($a['player_id'])) {
                $this->player_id  = intval($a['player_id']);
            }
            if (array_key_exists('uniq_no', $a) && is_numeric($a['uniq_no'])) {
                $this->uniq_no    = intval($a['uniq_no']);
            }
            if (array_key_exists('title', $a) && $a['title'] != '') {
                $this->title      = $a['title'];
            }
            if (array_key_exists('detail', $a) && $a['detail'] != '') {
                $this->detail     = $a['detail'];
            }
            if(array_key_exists('point', $a) && $a['point'] != '') {
                $this->point      = $a['point'];
            }
            if (array_key_exists('auto_mode', $a)) {
                if ($a['auto_mode'] != '0') $this->auto_mode = true; else $this->auto_mode = false; 
            }
            if (array_key_exists('is_active', $a)) {
                if ($a['is_active'] != '0') $this->is_active = true; else $this->is_active  = false; 
            }
            if (array_key_exists('is_delete', $a)) {
                if ($a['is_delete'] != '0') $this->is_delete = true; else $this->is_delete = false; 
            }
            if (array_key_exists('save_time', $a)) {
                $this->save_time = date_create($a['save_time'], new DateTimeZone('Asia/Tokyo')); 
            }

            if (array_key_exists('mypos', $a)) {
                if (is_string($a['mypos'])) {
                    $this->mypos->from_JSON($a['mypos']);
                } else {
                    $this->mypos->decode($a['mypos']);
                }
            }

            if (array_key_exists('all_mvpt', $a) && is_string($a['all_mvpt'])) {
                $this->all_mvpt  = Location::from_JSON_to_obj($a['all_mvpt']);
            }
            if (array_key_exists('all_mvpt', $a) && is_array($a['all_mvpt'])) {
                $this->all_mvpt  = Location::decode_all($a['all_mvpt']);
            }
            if (array_key_exists('all_maze', $a) && is_array($a['all_maze'])) {
                $this->all_maze  = Maze::decode_all($a['all_maze']);
            }
            if (array_key_exists('all_team', $a) && is_array($a['all_team'])) {
                $this->all_team  = Team::decode_all($a['all_team']);
            }
            if (array_key_exists('all_guld', $a) && is_array($a['all_guld'])) {
                $this->all_guld  = Guild::decode_all($a['all_guld']);
            }
            return $this;
        }
    }

?>