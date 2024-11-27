<?php
    // MAZE関係クラス全般

    declare(strict_types=1);

    // 本番環境はURLの先頭を書き換えるかも
    $db_host = '127.0.0.1';
    
    // 日本語の利用
    mb_internal_encoding("UTF-8");
    mb_regex_encoding("UTF-8");
    
    // 利用クラス等の読み込み
    require_once 'Class_DspMessage.php'; // 画面メッセージの表示用クラス
    require_once 'Class_Rand.php'; 
    
    // ダンジョンマップのセルの種類を表す列挙型
    // MzKind::NoDef: 未定義・不明
    // MzKind::Floor: 床
    // MzKind::Unexp: 未踏地
    // MzKind::Stone: 石壁
    // MzKind::Empty: 初期状態・何もなし
    // 
    // function to_int(MzKind):      int        列挙型に対応する値(整数値)を返す
    // function from_int(int):       MzKind     整数値に対応する列挙型を返す(クラスメソッド)
    // function to_letter(MzKind):   string     列挙型に対応する文字を返す(ダンジョンの2D表示用)
    // function from_letter(string): MzKind     文字に対応する列挙型を返す(クラスメソッド)
    require_once 'Enum_MzKind.php';

    // 方向を表すクラス
    require_once 'Class_Direct.php';

    // 位置・経路を表すクラス全般
    require_once 'Class_PointSet.php';


    class MazeCell {
        public    MzKind   $cell;

        public function __construct(MzKind $kind = MzKind::Empty) {
            $this->cell = $kind;
        }

        public function get_cell(): MzKind {
            return $this->cell;
        }

        public function set_cell(MzKind $kind): bool {
            $this->cell = $kind;
            return true;
        }

        public function set_cell_from_int(int $kind_id): bool {
            global $gv;

            $k = MzKind::tryFrom($kind_id);
            if (is_null($k)) {
                $this->cell =  MzKind::NoDef;
                return false;
            }
            $this->cell = $k;
            return true;
        }

        public function to_letter(): string {
            global $gv;
            return $this->cell->to_letter();
        }

        public function from_letter(string $s): void {
            global $gv;
            $this->cell->from_letter($s);
        }

        public function encode(): string {
            return sprintf('%02x',$this->cell->value);
        }

        public function decode(string $s): void {
            $num = intval($s, 16);
            $this->set_cell_from_int($num);
            return;
        }
    }


    class Maze {
        protected int    $maze_id;
        protected int    $save_id;
        protected string $uniq_id;
        protected int    $maze_floor;
        protected string $name;

        protected int    $size_x;  /* 外壁も含めたセルの数(横) */ 
        protected int    $size_y;  /* 外壁も含めたセルの数(縦) */
        protected int    $size_z;  /* Mazeの階層の数 */
        protected int    $num_of_room; /* ランダム生成の際の部屋の数の最大数 */
        protected int    $max_size_of_room; /* ランダム生成の際の部屋の大きさ */
        protected array  $cells;
        protected array  $masks;

        protected const  Max_x    = 21;
        protected const  Max_y    = 21;
        protected const  Max_z    =  1;
        protected const  Limit_of_room =  5;
        protected const  Max_size_of_room =  3;

        public function __construct(?array $pp = null) {
            global $gv;

            $this->maze_id    = 0;
            $this->save_id    = 0;
            $this->uniq_id    = Rand::uniq_id('mai_maze#');
            $this->maze_floor = 0;
            $this->name       = 'NewMaze_'. sprintf("%03x",$this->maze_id);


            $this->size_x           = Maze::Max_x;
            $this->size_y           = Maze::Max_y;
            $this->size_z           = Maze::Max_z;
            $this->num_of_room      = Maze::Limit_of_room;
            $this->max_size_of_room = Maze::Max_size_of_room;

            $this->cells = [];
            $this->masks = [];

            $this->decode($pp);
        }
/*
        public function set_maze(?array $pp = null) {

            $fill_kind              = MzKind::Empty;
            if (!is_null($pp) && is_array($pp)) {
                if(array_key_exists('fill_kind', $pp) && ($pp['fill_kind'] instanceof MzKind)) {
                    $fill_kind = $pp['fill_kind'];
                }
                if(array_key_exists('id', $pp) && is_numeric($pp['id'])) {
                    $this->maze_id    = $pp['id'];
                }
                if(array_key_exists('uniq_id', $pp) && ($pp['uniq_id'] != '')) {
                    $this->uniq_id    = $pp['uniq_id'];
                }
                if(array_key_exists('floor', $pp) && is_numeric($pp['floor'] && $pp['floor'] > 0)) {
                    $this->maze_floor = $pp['floor'];
                }
                if(array_key_exists('name', $pp) && is_string($pp['name'])) {
                    $this->name       = $pp['name'];
                }
                if(array_key_exists('size_x', $pp) && is_numeric($pp['size_x']) && $pp['size_x'] > 3) {
                    $this->size_x     = $pp['size_x'];
                }
                if(array_key_exists('size_y', $pp) && is_numeric($pp['size_y']) && $pp['size_y'] > 3) {
                    $this->size_y     = $pp['size_y'];
                }
                if(array_key_exists('size_z', $pp) && is_numeric($pp['size_z']) && $pp['size_z'] >= 0) {
                    $this->size_z     = $pp['size_z'];
                }
                if(array_key_exists('limit_room', $pp) && is_numeric($pp['limit_room']) && $pp['limit_room'] > 0) {
                    $this->num_of_room = $pp['limit_room'];
                }
                if(array_key_exists('max_room', $pp) && is_numeric($pp['max_room']) && $pp['max_room'] > 0) {
                    $this->num_of_room = $pp['max_room'];
                }
                if(array_key_exists('room_size', $pp) && is_numeric($pp['room_size']) && $pp['room_size'] >= 3) {
                    $this->max_size_of_room = $pp['room_size'];
                }
            }
            $this->cells = [];
            $this->masks = [];
            for ($z = 0; $z < $this->size_z; $z++) {
                $this->cells[$z] = [];
                $this->masks[$z] = [];
                for ($y = 0; $y < $this->size_y; $y++) {
                    $this->cells[$z][$y] = [];
                    $this->masks[$z][$y] = [];
                    for ($x = 0; $x < $this->size_x; $x++) {
                        array_push($this->cells[$z][$y], new MazeCell($fill_kind));
                        array_push($this->masks[$z][$y], true);
                    }
                }
            }
        }
*/

        public function uid(): string {return $this->uniq_id;}

        public function within_XYZ(int $pos_x, int $pos_y, int $pos_z): bool {
            return (    $pos_x >  0 && $pos_x < $this->size_x
                     && $pos_y >  0 && $pos_y < $this->size_y
                     && $pos_z >= 0 && $pos_z < $this->size_z);
        }
        public function get_id():     int {return $this->maze_id;}
        public function get_size_x(): int {return $this->size_x;}
        public function get_size_y(): int {return $this->size_y;}
        public function get_size_z(): int {return $this->size_z;}
        public function get_name():   string {return $this->name;}

        public function get_cell(int $pos_x, int $pos_y, int $pos_z): MzKind {
            if (!$this->within_XYZ($pos_x, $pos_y, $pos_z)) return false;
            return $this->cells[$pos_z][$pos_y][$pos_x]->get_cell();
        }

        public function set_cell(MzKind $kind, int $pos_x, int $pos_y, int $pos_z = 0): bool {
            return $this->cells[$pos_z][$pos_y][$pos_x]->set_cell($kind);
        }

        public function fill_cell(MzKind $kind, int $floor = 0): void {
            for ($h = 0; $h < $this->size_y; $h++)
            for ($w = 0; $w < $this->size_x; $w++)
                $this->set_cell($kind, $w, $h, $floor);
            return;
        }

        public function set_box(MzKind $kind, int $top_x, int $top_y, int $size_x, int $size_y, int $floor = 0): void {
            if ($top_x + $size_x > $this->size_x) $size_x = $this->size_x - $top_x + 1; 
            if ($top_y + $size_y > $this->size_y) $size_y = $this->size_y - $top_y + 1;
            
            $top = $top_y;
            $btm = $top    + $size_y - 1;
            $lft = $top_x;
            $rgt = $lft    + $size_x - 1;
            
            // 北側(上)と南側(下)を石壁に
            for ($x = 0; $x < $size_x; $x++) {
                $this->set_cell($kind, $x, $top, $floor);
                $this->set_cell($kind, $x, $btm, $floor);
            }
            // 東側(右)と西側(左)を石壁に
            for ($y = 0; $y < $size_y; $y++) {
                $this->set_cell($kind, $lft, $y, $floor);
                $this->set_cell($kind, $rgt, $y, $floor);
            }
            return;
        }

        // 階上と階下に階段を設置する
        public function create_stair(int $floor): array {
            $H_size_x       = ($this->size_x - 1) / 2;
            $H_size_y       = ($this->size_y - 1) / 2;
            $pos_x = 2 * random_int(0, $H_size_x - 1) + 1;
            $pos_y = 2 * random_int(0, $H_size_y - 1) + 1;
            $pos_d =     random_int(0, Direct::MAX);

            // 乱数で得た座標に階段を置く
            if ($floor >= 1) {
                if ($this->get_cell($pos_x, $pos_y, $floor - 1) !== MzKind::StrUp) {
                    $this->set_cell(MzKind::StrDn, $pos_x, $pos_y, $floor - 1);
                } else {
                    $this->set_cell(MzKind::StrUD, $pos_x, $pos_y, $floor - 1);
                }
            }
            if ($this->get_cell($pos_x, $pos_y, $floor    ) !== MzKind::StrDn) {
                $this->set_cell(MzKind::StrUp, $pos_x, $pos_y, $floor);
            } else {
                $this->set_cell(MzKind::StrUD, $pos_x, $pos_y, $floor);
            }

            return ['x' => $pos_x, 'y' => $pos_y, 'z' => $floor, 'd' => $pos_d];
        }

        public function create_maze(int $floor = 0): void {
            $size_x       = $this->size_x;
            $size_y       = $this->size_y;
    
    
            // ダンジョンで$floorで指定された階を未踏地にする 
            $this->fill_cell(MzKind::Unexp, $floor);
    
            // ダンジョンの輪郭を石壁にする
            $this->set_box(MzKind::Stone, 0, 0, $size_x, $size_y, $floor);
    
            // 通路に一つ置きに壁が成長するポイントを設定する
            // ポイントから壁を伸ばす方向をランダムに決める
            $points = new PointSet();
            for ($h = 2; $h < $size_y - 2; $h += 2){
                for ($w = 2; $w < $size_x - 2; $w += 2){
                    $di = random_int(0, Direct::MAX);
                    $points->push(new PointLink($w, $h, $di));
                }
            }
    
            // 乱数でいくつか部屋を作る
            $rooms_array = [];
            $num_of_room = random_int(0, $this->num_of_room);
            for ($cnt = 0; $cnt < $num_of_room; $cnt++) {
                $leng_x = random_int(1,  $this->max_size_of_room) * 2 + 1;
                $leng_y = random_int(1,  $this->max_size_of_room) * 2 + 1;
                $room_x = random_int(0, ($size_x - $leng_x) / 2) * 2;
                $room_y = random_int(0, ($size_y - $leng_y) / 2) * 2;
                array_push($rooms_array, ['tx' => $room_x, 'ty' => $room_y, 'sx' => $leng_x, 'sy' => $leng_y]);
            }
    
            // 部屋の中のポイントを削除する
            foreach ($rooms_array as $room) {
                for ($ii = 0; $ii < count($points->set); $ii++) {
                    $p = $points->set[$ii];
                    if (is_null($p)) continue;
    
                    if (    ($p->x >= $room['tx']) 
                        &&  ($p->x <= $room['tx'] + $room['sx'])
                        &&  ($p->y >= $room['ty'])
                        &&  ($p->y <= $room['ty'] + $room['sy'])) {
                            $points->remove($p);
                        }
                }
            }
    
    
            // ポイントから壁を成長させて迷路を作る
            foreach ($points->set as $p) {
                if (is_null($p)) continue;
                
                // ポイントの位置に石壁を置く
                $this->set_cell(MzKind::Stone, $p->x, $p->y, $floor);
                // 柱の東西南北のいずれかにも石壁を置く
                $direction = [0, 0, 0, 0];
                switch ($p->di) {
                    case Direct::N: 
                        $direction[Direct::N] = 1; // 北
                        break;
                    case Direct::E: 
                        $direction[Direct::E] = 1; // 東
                        break;
                    case Direct::S: 
                        $direction[Direct::S] = 1; // 南
                        break;
                    case Direct::W: 
                        $direction[Direct::W] = 1; // 西
                        break;
                }
    
                $this->set_cell(
                    MzKind::Stone,
                    $p->x - $direction[Direct::W] + $direction[Direct::E], 
                    $p->y - $direction[Direct::N] + $direction[Direct::S], 
                    $floor
                    );
                
            }

            // 閉鎖空間が出来ていたら出口を作る
            // ポイントをトレースして、既出のポイントに繋がっていたら閉鎖空間
            foreach ($points->set as $set) {
                if (is_null($set)) continue;

                [$yn, $trace_set] = $this->check_close($set->x, $set->y, $points, new PointSet());
                if ($yn) {
                    $this->open_exit($trace_set, MzKind::Unexp, $floor);
                    foreach ($trace_set->set as $t) $points->remove($t);
                }
            }
            return;
        }
    
        protected function check_close(int $x, int $y, PointSet $point_set, PointSet $trace_set): array {
            if ($x < 2 || $y < 2 || $x > $this->size_x - 2 || $y > $this->size_y - 2) 
                return [false, []];
            if ($point_set->is_exist($x, $y) == false) return [false, []];
            if ($trace_set->is_exist($x, $y) == true)  return [true,  $trace_set];

            $p = $point_set->get_point($x, $y);
            $trace_set->push(new PointLink($x, $y, PointLink::cast($p)->di));
            switch (PointLink::cast($p)->di) {
                case Direct::N:  // 北
                    $next_x = $x;
                    $next_y = $y - 2;
                    break;
                case Direct::E:  // 東
                    $next_x = $x + 2;
                    $next_y = $y;
                    break;
                case Direct::S:  // 南
                    $next_x = $x;
                    $next_y = $y + 2;
                    break;
                case Direct::W:  // 西
                    $next_x = $x - 2;
                    $next_y = $y;
                    break;
                }
                return $this->check_close($next_x, $next_y, $point_set, $trace_set);
        }

        protected function open_exit(PointSet $p, MzKind $kind, int $floor = 0): void {
            $cnt = random_int(0,count($p->set) - 1);
            $pp  = $p->set[$cnt];

            $direction = [0, 0, 0, 0];
            switch ($pp->di) {
                case Direct::N: 
                    $direction[Direct::N] = 1; // 北
                    break;
                case Direct::E: 
                    $direction[Direct::E] = 1; // 東
                    break;
                case Direct::S: 
                    $direction[Direct::S] = 1; // 南
                    break;
                case Direct::W: 
                    $direction[Direct::W] = 1; // 西
                    break;
            }

            $this->set_cell(
                $kind, 
                $pp->x - $direction[Direct::W] + $direction[Direct::E], 
                $pp->y - $direction[Direct::N] + $direction[Direct::S], 
                $floor
            );
            return;
        }

        public function to_string(int $floor = 0, bool $do_mask = false): string {
            $ret_str = '';
            for ($h = 0; $h < count($this->cells[$floor]); $h++) {
                for ($w = 0; $w < count($this->cells[$floor][$h]); $w++) {
                    if ($do_mask && $this->masks[$floor][$h][$w]) $ret_str .= '■';
                    else $ret_str .= $this->cells[$floor][$h][$w]->to_letter();
                }
                $ret_str .= "\n";
            }
            return $ret_str;
        }

        public function from_string(string $s, int $floor = 0): Maze {
            $maze_raws = mb_split("\n", $s);

            $size_y    = min($this->size_y, count($maze_raws));
            for ($h = 0; $h < $size_y; $h++) {
                $cells = preg_split('//u', $maze_raws[$h], -1, PREG_SPLIT_NO_EMPTY);
                
                $size_x    = min($this->size_x, count($cells));
                for ($w = 0; $w < $this->size_x; $w++) {
                    $this->set_cell(MzKind::from_letter($cells[$w]), $w, $h, $floor);
                    $w++;
                }
            }
            return $this;
        }


        public static function get_from_odb_all(PDO $db_mai, DspMessage $mes, int $save_id): array {
            [$rslt0, $maze_array] = self::get_from_tbl_all($db_mai, $mes, $save_id);
            if (!$rslt0 || $mes->is_err()) {
                return [false, []];
            }
/*
            foreach ($maze_array as $maze) {
                foreach ($maze->all_exist as $exist) {
                    $rslt1 = $exist->set_to_odb($db_mai, $mes, $save_id, $maze->id);
                    if (!$rslt1 || $mes->is_err()) {
                        return false;
                    }
                }
            }
*/
            return [true, $maze_array];
        }


        public function set_to_odb(PDO $db_mai, DspMessage $mes, int $save_id): bool {
            [$rslt0, $mase_id] = $this->add_tbl($db_mai, $mes, $save_id);
            if (!$rslt0 || $mes->is_err()) {
                return false;
            }
            /*
            foreach ($this->all_exist as $exist) {
                $rslt1 = $exist->set_to_odb($db_mai, $mes, $save_id, $this->id);
                if (!$rslt1 || $mes->is_err()) {
                    return false;
                }
            }
            */
            return true;
        }

        
        public function del_to_odb(PDO $db_mai, DspMessage $mes, int $save_id): bool {
            $rslt = $this->del_tbl($db_mai, $mes, $save_id);
            if (!$rslt || $mes->is_err()) {
                return false;
            }
            /*
            foreach ($this->all_exist as $exist) {
                $rslt1 = $exist->del_to_odb($db_mai, $mes, $save_id, $this->id);
                if (!$rslt1 || $mes->is_err()) {
                    return false;
                }
            }
            */
            return true;
        }



        // DB処理。save_idで指定されたmazeレコードセットを読み込み
        // Mazeクラスの配列にセットする
        // 
        protected static function get_from_tbl_all(
                PDO $db_mai, 
                DspMessage $mes, 
                int $save_id
            ): array {
                $get_maze_SQL =<<<GET_MAZE01
                SELECT 	id, save_id, uniq_id, name, 
                        size_x, size_y, size_z, maps AS maze, mask 
                FROM tbl_maze
                WHERE   save_id = :save_id
GET_MAZE01;
            try {
                $get_maze_stmt = $db_mai->prepare($get_maze_SQL);
                $get_maze_stmt->bindValue(':save_id',  $save_id);
                $get_maze_stmt->execute();
                $resultRecordSet = $get_maze_stmt->fetchAll();
            } catch (PDOException $e) {
                $mes->pdo_error($e, "SQLエラー 33: {$get_maze_SQL}");
                return [false, []];
            } catch (Throwable $ee) {
                $mes->pdo_error($ee, "SQLの致命的エラー 35: {$get_maze_SQL}");
                return [false, []];
            } 
        
            if (count($resultRecordSet) < 1) {
                return [true,  []];
            }
            $maze_array = [];
            foreach ($resultRecordSet as $resultRecord) {
                array_push($maze_array,  (new Maze())->decode($resultRecord));
            }
            return [true, $maze_array];
        }
        

        // DB処理。mazeテーブルに自身のデータを追加(insert)して
        // そのID(maze_id)を返す
        // 
        protected function add_tbl(
                PDO $db_mai, 
                DspMessage $mes, 
                int $save_id
            ): array {

            $insert_maze_SQL =<<<INSERT_MAZE01
                INSERT INTO tbl_maze (
                    save_id, uniq_id, name, 
                    size_x, size_y, size_z, maps, mask
                )
                VALUES (
                    :save_id, :uniq_id, :name, 
                    :size_x, :size_y, :size_z, :maps, :mask 
                )
INSERT_MAZE01;
            try {
                $insert_maze_stmt = $db_mai->prepare($insert_maze_SQL);
                $insert_maze_stmt->bindValue(':save_id', $save_id); 
                $insert_maze_stmt->bindValue(':uniq_id', $this->uniq_id); 
                $insert_maze_stmt->bindValue(':name',    $this->name); 
                $insert_maze_stmt->bindValue(':size_x',  $this->size_x); 
                $insert_maze_stmt->bindValue(':size_y',  $this->size_y); 
                $insert_maze_stmt->bindValue(':size_z',  $this->size_z); 
                $insert_maze_stmt->bindValue(':maps',    $this->__encode_maze()); 
                $insert_maze_stmt->bindValue(':mask',    $this->__encode_mask()); 
                $insert_maze_stmt->execute();
            } catch (PDOException $e) {
                $mes->pdo_error($e, "SQLエラー 3: {$insert_maze_SQL}");
                return [false, -1];
            } catch (Throwable $ee) {
                $mes->pdo_error($ee, "SQLの致命的エラー 5: {$insert_maze_SQL}");
                return [false, -1];
            } 
            $this->maze_id =  intval($db_mai->lastInsertId());
            return [true, $this->maze_id];
        }
        
        // DB処理。save_idで指定されたレコード(複数)を削除(delete)する
        // 
        public static function del_tbl(PDO $db_mai, DspMessage $mes, int $save_id): bool {
            $delete_maze_SQL =<<<DELETE_MAZE01
                DELETE FROM tbl_maze 
                WHERE  save_id = :save_id
DELETE_MAZE01;
            try {
                $delete_maze_stmt = $db_mai->prepare($delete_maze_SQL);
                $delete_maze_stmt->bindValue(':save_id', $save_id);
                $delete_maze_stmt->execute();
            } catch (PDOException $e) {
                $mes->pdo_error($e, "SQLエラー 12: {$delete_maze_SQL}");
                return false;
            } catch (Throwable $ee) {
                $mes->pdo_error($ee, "SQLの致命的エラー 13: {$delete_maze_SQL}");
                return false;
            } 
            return true;
        }
        
        public function encode(): array {
            $maze_str = $this->__encode_maze();
            $mask_str = $this->__encode_mask();

            $ret = [    
                'id'      => $this->maze_id,
                'save_id' => $this->save_id,
                'uniq_id' => $this->uniq_id,
                'floor'   => $this->maze_floor,
                'name'    => $this->name,
                'size_x'  => $this->size_x,
                'size_y'  => $this->size_y,
                'size_z'  => $this->size_z,
                'maze'    => $maze_str,
                'mask'    => $mask_str,
            ];
            return $ret;

        }
        protected function __encode_maze():string {
            // MAZEの文字列化
            $flr_array = [];
            for ($d = 0; $d < count($this->cells); $d++) {
                $raw_array = [];
                for ($h = 0; $h < count($this->cells[$d]); $h++) {
                    $col_array = [];
                    for ($w = 0; $w < count($this->cells[$d][$h]); $w++) {
                        array_push($col_array, $this->cells[$d][$h][$w]->encode());
                    }
                    array_push($raw_array, implode('X', $col_array));
                }
                array_push($flr_array, implode('Y', $raw_array));
            }
            return implode('Z', $flr_array);
        }
        protected function __encode_mask():string {
                        // MASKの文字列化
            $flr_array = [];
            for ($d = 0; $d < count($this->masks); $d++) {
                $raw_array = [];
                for ($h = 0; $h < count($this->masks[$d]); $h++) {
                    $col_array = [];
                    for ($w = 0; $w < count($this->masks[$d][$h]); $w++) {
                        if ($this->masks[$d][$h][$w]) {
                            array_push($col_array, '1');
                        } else {
                            array_push($col_array, '0');
                        }
                    }
                    array_push($raw_array, implode('X', $col_array));
                }
                array_push($flr_array, implode('Y', $raw_array));
            }
            return  implode('Z', $flr_array);
        }

        public function decode(?array $e): Maze {
            if (is_null($e) || !is_array($e)) return $this;

            $resize = false;

            if (array_key_exists('maze_id', $e) && is_numeric($e['maze_id'])) {
                $this->maze_id    = $e['maze_id'];
            }
            if (array_key_exists('save_id', $e) && is_numeric($e['save_id'])) {
                $this->save_id    = $e['save_id'];
            }
            if (array_key_exists('uniq_id', $e) && is_string($e['uniq_id'])) {
                $this->uniq_id    = $e['uniq_id'];
            }
            if (array_key_exists('floor', $e) && is_numeric($e['floor'])) {
                $this->maze_floor = $e['floor'];
            }
            if (array_key_exists('name', $e)  && $e['name'] != '') {
                $this->name      = $e['name'];
            }
            if (array_key_exists('size_x', $e) && is_numeric($e['size_x'])) {
                $this->size_x     = $e['size_x'];
                $resize = true;
            }
            if (array_key_exists('size_y', $e) && is_numeric($e['size_y'])) {
                $this->size_y     = $e['size_y'];
                $resize = true;
            }
            if (array_key_exists('size_z', $e) && is_numeric($e['size_z'])) {
                $this->size_z     = $e['size_z'];
                $resize = true;
            }

            // MAZEとMASKのリサイズ
            if ($resize) {
                $this->cells = [];
                $this->masks = [];
                for ($z = 0; $z < $this->size_z; $z++) {
                    $this->cells[$z] = [];
                    $this->masks[$z] = [];
                    for ($y = 0; $y < $this->size_y; $y++) {
                        $this->cells[$z][$y] = [];
                        $this->masks[$z][$y] = [];
                        for ($x = 0; $x < $this->size_x; $x++) {
                            array_push($this->cells[$z][$y], new MazeCell(MzKind::Empty));
                            array_push($this->masks[$z][$y], true);
                        }
                    }
                }
            }

            // MAZEの復元
            if (is_array($e) && array_key_exists('maze', $e) && $e['maze'] != '') {
                $maze_str         = $e['maze'];

                $flr_array = explode('Z', $maze_str);
                $size_z    = min($this->size_z, count($flr_array));
                for ($d = 0; $d < $size_z; $d++) { 
                    $raw_array = explode('Y', $flr_array[$d]);
                    $size_y    = min($this->size_y, count($raw_array));
                    for ($h = 0; $h < $size_y; $h++) {
                        $col_array = explode('X', $raw_array[$h]);
                        $size_x    = min($this->size_x, count($col_array));
                        for ($w = 0; $w < $size_x; $w++) {
                            $this->cells[$d][$h][$w]->decode($col_array[$w]);
                        }
                    }
                }
            }

            // MASKの復元
            if (is_array($e) && array_key_exists('mask', $e) && $e['mask'] != '') {
                $mask_str         = $e['mask'];
                $flr_array = explode('Z', $mask_str);
                $size_z    = min($this->size_z, count($flr_array));
                for ($d = 0; $d < $size_z; $d++) { 
                    $raw_array = explode('Y', $flr_array[$d]);
                    $size_y    = min($this->size_y, count($raw_array));
                    for ($h = 0; $h < $size_y; $h++) {
                        $col_array = explode('X', $raw_array[$h]);
                        $size_x    = min($this->size_x, count($col_array));
                        for ($w = 0; $w < $size_x; $w++) {
                            if ($col_array[$w] == '1') {
                                $this->masks[$d][$h][$w] = true;
                            } else {
                                $this->masks[$d][$h][$w] = false;
                            }
                        }
                    }
                }
            }

            return $this;
        }
        public static function encode_all(array $a): array {
            $all_maze_data = [];
            if (!is_null($a) && is_array($a)) {
                foreach ($a as $maze) {
                    array_push($all_maze_data, $maze->encode());
                }
            }
            return $all_maze_data;
        }
        public static function decode_all(array $a): array {
            $all_maze = [];
            if (!is_null($a) && is_array($a)) {
                foreach ($a as $maze_data) {
                    array_push($all_maze, (new Maze())->decode($maze_data));
                }
            }
            return $all_maze;
        }
    }

?>