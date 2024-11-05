<?php
    declare(strict_types=1);

    // 日本語の利用
    mb_internal_encoding("UTF-8");
    mb_regex_encoding("UTF-8");

    // 利用クラス等の読み込み
    require_once 'Class_DspMessage.php'; // 画面メッセージの表示用クラス
    require_once 'Class_Rand.php'; 

    class HeroAbility {
        protected int   $xp;
        protected array $el;
        protected array $pr;

        public function __construct(array $a = null) {
            $this->xp  =  0;  // p:HP、m:MP

            $this->el['atk'] =  0;  // 攻撃値
            $this->el['def'] =  0;  // 防御値
            $this->el['quc'] =  0;  // 瞬発力
            $this->el['cnc'] =  0;  // 機運値(チャンス)
        
            $this->pr['str'] =  0;  // 根性。攻撃/防御力にも影響。HP/MP回復やアイテムの最大所持重量にボーナス
            $this->pr['pwr'] =  0;  // 基本的強さ。攻撃力に影響
            $this->pr['vit'] =  0;  // 耐久力。HP/MPの最大値や防御力に影響を与える
            $this->pr['dex'] =  0;  // 器用さ。命中率に影響を与える。飛び道具や長距離魔法では特に影響。罠解除にも影響
            $this->pr['agi'] =  0;  // 素早さ。行動速度や回避率に影響を与える。命中率にも影響
            $this->pr['tec'] =  0;  // 技術力。経験で向上して能力値(quc/cnc)にボーナスを与える
            $this->pr['luk'] =  0;  // 幸運値。cncに大きく影響する

            if(!is_null(($a)) && is_array($a)) $this->decode($a);
        }

        public function random_make(): HeroAbility {
            $this->xp  =  Rand::in_rand(0, 1000, 3.0);

            $this->el['atk'] =  Rand::in_rand(0,  100, 2.5);
            $this->el['def'] =  Rand::in_rand(0,  100, 2.5);
            $this->el['quc'] =  Rand::in_rand(0,  100, 2.5);
            $this->el['cnc'] =  Rand::in_rand(0,  100, 2.5);
        
            $this->pr['str'] =  Rand::in_rand(0,   20, 2.0);
            $this->pr['pwr'] =  Rand::in_rand(0,   20, 2.0);
            $this->pr['vit'] =  Rand::in_rand(0,   20, 2.0);
            $this->pr['dex'] =  Rand::in_rand(0,   20, 2.0);
            $this->pr['agi'] =  Rand::in_rand(0,   20, 2.0);
            $this->pr['tec'] =  Rand::in_rand(0,   20, 2.0);
            $this->pr['luk'] =  Rand::in_rand(0,   20, 2.0);

            return $this;
        }

        public function add_xp_bonus(int $bonus): void {
            $this->xp  +=  $bonus;
        }
        public function add_el_bonus(int $bonus): void {
            foreach ($this->el as $el) $el += $bonus;
        }
        public function add_pr_bonus(int $bonus): void {
            foreach ($this->pr as $pr) $pr += $bonus;
        }

        public function from_JSON(string $j): HeroAbility {
            $this->decode(HeroAbility::from_JSON_to_array($j));
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
            return HeroAbility::from_array_to_JSON($this->encode());
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
            $a['xp']  = $this->xp;

            foreach($this->el as $key => $val) $a[$key] = $val;
            foreach($this->pr as $key => $val) $a[$key] = $val;
            return $a;
        }

        public function decode(array $a = null): HeroAbility {
            if (!is_null($a) && is_array($a)) {
                if (array_key_exists('xp',  $a) && (is_numeric($a['xp' ]))) {
                    $this->xp      = intval($a['xp']);
                }

                if (array_key_exists('atk', $a) && (is_numeric($a['atk']))) {
                    $this->el['atk'] = intval($a['atk']);
                }
                if (array_key_exists('def', $a) && (is_numeric($a['def']))) {
                    $this->el['def'] = intval($a['def']);
                }
                if (array_key_exists('quc', $a) && (is_numeric($a['quc']))) {
                    $this->el['quc'] = intval($a['quc']);
                }
                if (array_key_exists('cnc', $a) && (is_numeric($a['cnc']))) {
                    $this->el['cnc'] = intval($a['cnc']);
                }

                if (array_key_exists('str', $a) && (is_numeric($a['str']))) {
                    $this->pr['str'] = intval($a['str']);
                }
                if (array_key_exists('pwr', $a) && (is_numeric($a['pwr']))) {
                    $this->pr['pwr'] = intval($a['pwr']);
                }
                if (array_key_exists('vit', $a) && (is_numeric($a['vit']))) {
                    $this->pr['vit'] = intval($a['vit']);
                }
                if (array_key_exists('dex', $a) && (is_numeric($a['dex']))) {
                    $this->pr['dex'] = intval($a['dex']);
                }
                if (array_key_exists('agi', $a) && (is_numeric($a['agi']))) {
                    $this->pr['agi'] = intval($a['agi']);
                }
                if (array_key_exists('tec', $a) && (is_numeric($a['tec']))) {
                    $this->pr['tec'] = intval($a['tec']);
                }
                if (array_key_exists('luk', $a) && (is_numeric($a['luk']))) {
                    $this->pr['luk'] = intval($a['luk']);
                }
            }
            return $this;
        }
    }

?>
