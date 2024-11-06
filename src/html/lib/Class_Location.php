<?php
    declare(strict_types=1);

    // 日本語の利用
    mb_internal_encoding("UTF-8");
    mb_regex_encoding("UTF-8");

    // 利用クラス等の読み込み
    require_once 'Class_DspMessage.php'; // 画面メッセージの表示用クラス
    require_once 'Class_PointSet.php'; 
    require_once 'Class_Direct.php'; 

    interface I_Locate {
        public function uid(): string;

        public function get_lckd(): string;
        public function get_name(): string;
        public function get_pos(): Point3D;
        public function get_dir(): Direct;
    }

    class Location {
        protected string  $uniq_id;
        protected string  $cur_url;
        protected string  $team_uid;

        protected string  $loc_kind;
        protected string  $loc_uid;
        protected string  $loc_name;
        protected int $x;
        protected int $y;
        protected int $z;
        protected int $d;
        public function __construct(array $a = null)
        {
            $this->uniq_id  = Rand::uniq_id('MvLocatin#');;
            $this->cur_url  = '';
            $this->team_uid = '';

            $this->loc_kind = '';
            $this->loc_uid  = '';
            $this->loc_name = '';
            $this->x  = 0;
            $this->y  = 0;
            $this->z  = 0;
            $this->d  = 0;
            if (!is_null($a)) $this->decode($a);
        }

        public function set(I_Locate $loc): self {
            $this->loc_uid   = $loc->uid();
            $this->loc_kind  = $loc->get_lckd();
            $this->loc_name  = $loc->get_name();

            $pos = $loc->get_pos();
            $this->x  = $pos->x;
            $this->y  = $pos->y;
            $this->z  = $pos->z;
            $this->d  = $loc->get_dir()->get();
            return $this;
        }        

        public function get_tid(): string {
            return $this->team_uid;
        }
        public function set_tid(string $tid): void {
            $this->team_uid = $tid;
        }
        public function get_url(): string {
            return $this->cur_url;
        }
        public function set_url(string $url): void {
            $this->cur_url  = $url;
        }
        public function get_uid(): string {
            return $this->loc_uid;
        }
        public function get_lckd(): string {
            return $this->loc_kind;
        }
        public function get_name(): string {
            return $this->loc_name;
        }
        public function get_pos(): Point3D {
            return new Point3D($this->x, $this->y, $this->z);
        }
        public function get_dir(): Direct {
            return new Direct($this->d);
        }
        public function set_pos(Point3D $pos): void {
            $this->x = $pos->x;
            $this->y = $pos->y;
            $this->z = $pos->z;
        }
        public function set_dir(Direct $dir): void {
            $this->d = $dir->get();
        }

        public function from_JSON(string $j): self {
            $this->decode(self::from_JSON_to_array($j));
            return $this;
        }
        public static function from_JSON_to_obj(string $j): array {
            $loc_data_array = self::from_JSON_to_array($j);

            $loc_array = [];
            foreach ($loc_data_array as $loc_data) {
                array_push($loc_array, (new Location())->decode($loc_data));
            }
            return $loc_array;
        }
        public static function from_JSON_to_array(string $j): array {
            return  json_decode(
                $j, true, 512, 
                JSON_BIGINT_AS_STRING  | 
                JSON_OBJECT_AS_ARRAY   | 
                JSON_UNESCAPED_UNICODE |
                JSON_PARTIAL_OUTPUT_ON_ERROR
            );
        }
        public function to_JSON(): string {
            return self::from_array_to_JSON($this->encode());
        }
        public static function from_obj_to_JSON(array $a): string {
            $loc_data_array = [];
            foreach ($a as $loc) array_push($loc_data_array, $loc->encode());
            return self::from_array_to_JSON($loc_data_array);
        }
        public static function from_array_to_JSON(array $a): string {
            return json_encode( 
                    $a, 
                    JSON_NUMERIC_CHECK     | 
                    JSON_PRETTY_PRINT      | 
                    JSON_UNESCAPED_UNICODE |
                    JSON_PARTIAL_OUTPUT_ON_ERROR
                );
        }

        public function encode(): array {
            $a = [];
            $a['uniq_id']  = $this->uniq_id;
            $a['cur_url']  = $this->cur_url;
            $a['team_uid'] = $this->team_uid;

            $a['kind']     = $this->loc_kind;
            $a['name']     = $this->loc_name;
            $a['loc_uid']  = $this->loc_uid;

            $b = [];
            $b['x']        = $this->x;
            $b['y']        = $this->y;
            $b['z']        = $this->z;
            $b['d']        = $this->d;
            $a['loc_pos']  = $b;

            return $a;
        }
        public function decode(array $a): Location {
            if (is_null($a)) return $this;
            if (is_string($a)) $a = self::from_JSON_to_array($a);

            if (array_key_exists('uniq_id', $a) && is_string($a['uniq_id'])) {
                $this->uniq_id  = $a['uniq_id'];
            }
            if (array_key_exists('cur_url', $a) && is_string($a['cur_url'])) {
                $this->cur_url  = $a['cur_url'];
            }
            if (array_key_exists('team_uid', $a) && is_string($a['team_uid'])) {
                $this->team_uid = $a['team_uid'];
            }

            if (array_key_exists('kind', $a) && is_string($a['kind'])) {
                $this->loc_kind = $a['kind'];
            }
            if (array_key_exists('name', $a)  && is_string($a['name'])) {
                $this->loc_name = $a['name'];
            }
            if (array_key_exists('loc_uid', $a)  && is_string($a['loc_uid'])) {
                $this->loc_uid  = $a['loc_uid'];
            }
            if (array_key_exists('loc_pos', $a)  && is_array($a['loc_pos'])) {
                $b = $a['loc_pos'];
                if (
                    array_key_exists('x', $b) && is_numeric($b['x']) && $b['x'] >  0
                &&  array_key_exists('y', $b) && is_numeric($b['y']) && $b['y'] >  0
                &&  array_key_exists('z', $b) && is_numeric($b['z']) && $b['z'] >= 0
                ) {
                    $this->x = $b['x'];
                    $this->y = $b['y'];
                    $this->z = $b['z'];
                }
                if (
                    array_key_exists('d', $b) 
                    && is_numeric($b['d']) 
                    && $b['d']  >=  0 
                    && $b['d']  <=  3
                ) {
                    $this->d = $b['d'];
                }
            }
            return $this;
        }
        public static function encode_all(array $a): array {
            $all_loc_data = [];
            if (!is_null($a) && is_array($a)) {
                foreach ($a as $loc) {
                    array_push($all_loc_data, $loc->encode());
                }
            }
            return $all_loc_data;
        }
        public static function decode_all(array $a): array {
            $all_loc = [];
            if (!is_null($a) && is_array($a)) {
                foreach ($a as $loc_data) {
                    array_push($all_loc, (new Location())->decode($loc_data));
                }
            }
            return $all_loc;
        }
    }
?>



