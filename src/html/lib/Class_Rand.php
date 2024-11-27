<?php
    declare(strict_types=1);

    // 日本語の利用
    mb_internal_encoding("UTF-8");
    mb_regex_encoding("UTF-8");

    // 利用クラス等の読み込み
    require_once 'Class_DspMessage.php'; // 画面メッセージの表示用クラス

    Class Rand {
        public static function i_rand(int $min = 0,int $max = 100 ): int {
            return mt_rand($min, $max);
        }

        public static function f_rand(float $min = 0.0, float $max = 1.0): float {
            return  $min + mt_rand() / mt_getrandmax() * ($max - $min);
        }
        public static function in_rand(int $min = 0, int $max = 100): int {
            return intVal(Rand::n_rand($min, $max));
        }
/*
        public static function in_rand(int $min = 0, int $max = 100): int {
            [$x, $y] = Rand::n_rand($min, $max);
            return intval(floor($x));
        }
*/
        public static function n_rand(float $min = 0.0, float $max = 1.0, float $dd = 3.0): float {
            $ave = 0.5;
            $a = Rand::f_rand(0.0, 1.0);
            $b = Rand::f_rand(0.0, 1.0);

            $x = $ave + Rand::__fab($a, $b) / (2.0 * $dd);
//            $y = $ave + Rand::__gab($a, $b) / 6.0;

            $xx = $min + $x * ($max - $min);
            if ($xx < $min) $xx = $min;
            if ($xx > $max) $xx = $max;

            return $xx;
        }
        protected static function __fab(float $a, float $b): float {
            return sqrt(-2.0 * log($a)) * sin(2 * pi() * $b);
        }
        protected static function __gab(float $a, float $b): float {
            return sqrt(-2.0 * log($a)) * cos(2 * pi() * $b);
        }


        public static function uniq_id(string $pre = ''): string {
            return uniqid($pre . mt_rand(0, 100), true);
        }

        public static function random_id(int $len = 10): string {
            $id_array = random_bytes($len);
            return bin2hex($id_array);
        }

        public static function random_str(int $len = 10): string {
            $ch_array = [];
            for ($i = 0; $i < $len; $i++) {
                array_push($ch_array, Rand::__make_ch());
            }
            return implode('', $ch_array);
        }
        protected static function __make_ch(): string {
/*            $ch = Rand::i_rand(0, 62);
            if ($ch < 10) return chr($ch + 48);
            if ($ch < 36) return chr($ch + 65);
            if ($ch < 62) return chr($ch + 97);
            return '_';
*/
            return chr(Rand::i_rand(65, 90));
        }
    }



?>
