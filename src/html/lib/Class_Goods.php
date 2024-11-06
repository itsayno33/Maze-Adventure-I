<?php
    declare(strict_types=1);

    // 日本語の利用
    mb_internal_encoding("UTF-8");
    mb_regex_encoding("UTF-8");

    // 利用クラス等の読み込み
    require_once 'Class_DspMessage.php'; // 画面メッセージの表示用クラス
    require_once 'Class_Rand.php'; 

    class Goods {
        protected int     $gold   = 0;
        protected array   $arms;
        protected array   $shld;
        protected array   $drug;
        protected array   $item;

        public function __construct(array $a = null) {
            $this->gold = 0;
            $this->arms = [];
            $this->shld = [];
            $this->drug = [];
            $this->item = [];
            if(!is_null(($a)) && is_array($a)) $this->decode($a);
        }
        public function random_make(): self {
            $this->gold     = Rand::i_rand(100, 1000); 
            return $this;
        }
        
        public function from_JSON(string $j): self {
            $this->decode(self::from_JSON_to_array($j));
            return $this;
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
            $a['gold'] = [$this->gold];
            return $a;
        }
 
        public function decode(array $a): self {
            if (!is_null($a) && is_array($a)) {
                if (
                    array_key_exists('gold', $a) 
                    && is_array($a['gold']) 
                    && array_key_exists('0', $a['gold']) 
                    && is_numeric($a['gold']['0']) 
                ) {
                    $this->gold = intval($a['gold'][0]);
                }
            }
            return $this;
        }
    }
