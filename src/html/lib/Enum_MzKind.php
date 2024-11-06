<?php
    // 日本語の利用
    mb_internal_encoding("UTF-8");
    mb_regex_encoding("UTF-8");

    // ダンジョンマップのセルの種類を表す列挙型
    // NoDef: 未定義・不明
    // Floor: 床
    // Unexp: 未踏地
    // Stone: 石壁
    // StrUp: 上り階段
    // StrDn: 下り階段
    // Empty: 初期状態・何もなし
    // 
    // function to_int(MzKind):      int        列挙型に対応する値(整数値)を返す
    // function from_int(int):       MzKind     整数値に対応する列挙型を返す(クラスメソッド)
    // function to_letter(MzKind):   string     列挙型に対応する文字を返す(ダンジョンの2D表示用)
    // function from_letter(string): MzKind     文字に対応する列挙型を返す(クラスメソッド)
    enum MzKind: int {
        case NoDef  =   0;
        case Floor  =   1;
        case Unexp  =   2;
        case Stone  =   3;
        case Unkwn  =   4;
        case StrUp  =   5;
        case StrDn  =   6;
        case StrUD  =   7;
        case Empty  = 255;

        public function to_int(MzKind|null $kind = null): int {
            if (is_null($kind)) $kind = $this;
            return $kind->value;
        }

        public static function from_int(int $num): MzKind {
            return MzKind::tryFrom($num) ?? MzKind::NoDef;
        }

        public function to_letter(MzKind|null $kind = null): string {
            if (is_null($kind)) $kind = $this;
            return match ($kind) {
                MzKind::Floor => '　',
                MzKind::Unexp => '・',
                MzKind::Stone => '＃',
                MzKind::Unkwn => '？',
                MzKind::StrUp => 'Ｕ',
                MzKind::StrDn => 'Ｄ',
                MzKind::StrUD => '通',
                MzKind::Empty => 'Ｏ',
                MzKind::NoDef => 'Ｘ',
                default       => 'Ｘ',
            };
        }

        public static function from_letter(string $str): MzKind {
            return match ($str) {
                '　'     => MzKind::Floor,
                '・'     => MzKind::Unexp,
                '＃'     => MzKind::Stone,
                '？'     => MzKind::Unkwn,
                'Ｕ'     => MzKind::StrUp,
                'Ｄ'     => MzKind::StrDn,
                '通'     => MzKind::StrUD,
                'Ｏ'     => MzKind::Empty,
                'Ｘ'     => MzKind::NoDef,
                default  => MzKind::NoDef,
            };
        }
    }
?>