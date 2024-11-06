<?php
    // 方向を表すクラス
    class Direct {
        public const N = 0;
        public const E = 1;
        public const S = 2;
        public const W = 3;
        public const Unknown = 99;
        public const MAX = 3;
        protected int $direction;
        public function __construct(int $direction = Direct::Unknown)
        {
            $this->set($direction);
        }
        public function get(): int {
            return $this->direction;
        }
        public function set(int $direction) {
            switch ($direction) {
                case Direct::N:
                case Direct::E:
                case Direct::S:
                case Direct::W:
                    $this->direction = $direction; 
                    break;
                default:
                    $this->direction = Direct::Unknown;
                    break;
            }
        }
        public function get_mb_name(): string {
            return Direct::s_get_mb_name($this->direction);
        }

        public static function s_get_mb_name(int $d): string {
            switch ($d) {
                case Direct::N: return '北';
                case Direct::E: return '東';
                case Direct::S: return '南';
                case Direct::W: return '西';
                default: return '謎';
            }
        }
        public function encode(): array {
            return ['d' => $this->direction];
        }
        public function decode(array $a): Direct {
            if (!is_null($a) && is_array($a)) {
                if(array_key_exists('d', $a) && (is_numeric($a['d']))) {
                    $this->direction = intval($a['d']);
                }
            }
            return $this;
        }
        public static function decode_and_new(array $a): Direct {
            if (!is_null($a) && is_array($a)) {
                if(array_key_exists('d', $a) && (is_numeric($a['d']))) {
                    return new Direct($a['d']);
                }
            }
        }
    }
?>