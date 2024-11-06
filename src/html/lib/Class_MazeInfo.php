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
    require_once 'Class_Rand.php'; 
    
    class MazeInfo {
        public string $name;
        public string $mbname;
        public int    $lv;
        public int    $size_x;
        public int    $size_y;
        public int    $size_z;
        public int    $max_room;
        public int    $room_size;

        public function __construct(array $j = []) {
            $this->name      = '';
            $this->mbname    = '';
            $this->lv        =  0;
            $this->size_x    =  0;
            $this->size_y    =  0;
            $this->size_z    =  0;
            $this->max_room  =  0;
            $this->room_size =  0;
            $this->decode($j);
        }
        public function encode(): array {
            $j = [];
            $j['name']      = $this->name;
            $j['mbname']    = $this->mbname;
            $j['lv']        = $this->lv;
            $j['size_x']    = $this->size_x;
            $j['size_y']    = $this->size_y;
            $j['size_z']    = $this->size_z;
            $j['max_room']  = $this->max_room;
            $j['room_size'] = $this->room_size;

            return $j;
        }
        public function decode(array $j): MazeInfo {
            if (is_null($j) || !is_array($j)) return $this;

            if(array_key_exists('name', $j) && is_string($j['name'])) {
                $this->name      = $j['name'];
            }
            if(array_key_exists('mbname', $j) && is_string($j['mbname'])) {
                $this->mbname    = $j['mbname'];
            }
            if(array_key_exists('lv', $j) && is_numeric($j['lv'])) {
                $this->lv        = intval($j['lv']);
            }
            if(array_key_exists('size_x', $j) && is_numeric($j['size_x'])) {
                $this->size_x    = intval($j['size_x']);
            }
            if(array_key_exists('size_y', $j) && is_numeric($j['size_y'])) {
                $this->size_y    = intval($j['size_y']);
            }
            if(array_key_exists('size_z', $j) && is_numeric($j['size_z'])) {
                $this->size_z    = intval($j['size_z']);
            }
            if(array_key_exists('max_room', $j) && is_numeric($j['max_room'])) {
                $this->max_room  = intval($j['max_room']);
            }
            if(array_key_exists('room_size', $j) && is_numeric($j['room_size'])) {
                $this->room_size = intval($j['room_size']);
            }
            return $this;
        }

        public static function get_tbl_all(PDO $db_mai, DspMessage $mes): array {
            $get_maze_SQL =<<<GET_MAZE01
            SELECT 	name, mbname, lv, size_x, size_y, size_z, max_room, room_size 
            FROM tbl_mazeinfo
GET_MAZE01;
            try {
                $get_maze_stmt = $db_mai->prepare($get_maze_SQL);
                $get_maze_stmt->execute();
                $resultRecordSet = $get_maze_stmt->fetchAll();
            } catch (PDOException $e) {
                $mes->pdo_error($e, "SQLエラー 3: {$get_maze_SQL}");
                return [false, []];
            } catch (Throwable $ee) {
                $mes->pdo_error($ee, "SQLの致命的エラー 5: {$get_maze_SQL}");
                return [false, []];
            } 
    
            if (count($resultRecordSet) < 1) {
                return [true,  []];
            }
            $mazeinfo_array = [];
            foreach ($resultRecordSet as $resultRecord) {
                $mazeinfo = new MazeInfo($resultRecord);
                $mazeinfo_array[$mazeinfo->name] = $mazeinfo;
            }
            return [true, $mazeinfo_array];
        }
    }














?>
