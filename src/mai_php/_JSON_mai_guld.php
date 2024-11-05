<?php 
    declare(strict_types=1);

// 本番環境はURLの先頭を書き換える
    $db_host = '127.0.0.1';

    // 日本語の利用
    mb_internal_encoding("UTF-8");
    mb_regex_encoding("UTF-8");

    // 利用クラス等の読み込み

    // ダンジョンマップのセルの種類を表す列挙型
    require_once './lib/Enum_MzKind.php';

    // 方向を表すクラス
    require_once './lib/Class_Direct.php';

    // 位置・経路を表すクラス全般
    require_once './lib/Class_PointSet.php';

    // MAZE関係クラス全般
    require_once './lib/Class_Maze.php';

    // ギルドクラス全般
    require_once './lib/Class_Guild.php';

    // パーティークラス全般
    require_once './lib/Class_Team.php';

    // ヒーロークラス全般
    require_once './lib/Class_Hero.php';

    // セーブデータ(クライアントとの連携)全般
    require_once './lib/Class_SaveData.php';

/*******************************************************************************/
/*                                                                             */
/*                                 主　処　理                                   */
/*                                                                             */
/*******************************************************************************/

    $gv = new GlobalVar();
    $ga = new GlobalArguments();

    init();

    $ret_JSON = '';
    switch ($ga->mode) {
        case 'new_game':
            $guld = new_guld();
            $team = new_team($guld);
            $save = new_save($guld, $team);
            $ret_JSON = save_encode(0,  $save);
            break;
        case 'new_hero':
            $hres = new_hres();
            $ret_JSON = hres_encode(0,  $hres);
            break;
        default:
            $gv->mes->set_err_message('Unknwn Mode was requested.');
            $ret_JSON = err_encode(999);
            break;
    }

    header("Content-type: application/json");
    echo $ret_JSON;
    free();
 
//////////////////////////////////////////////
///   サブルーチン
//////////////////////////////////////////////

function all_encode(int $code, array $data = []): string {
    global $gv, $ga;

    $ret_assoc = [];
    $ret_assoc['ecode'] = $code;
    if ($code !== 0 || $gv->mes->is_err()) {
        $ret_assoc['emsg'] = implode("\n", $gv->mes->get_err_messages());
    } else {
        $ret_assoc['emsg'] = 'Status OK';
        $ret_assoc['data'] = $data;
    }

    $ret_JSON = json_encode(
                    $ret_assoc, 
                    JSON_NUMERIC_CHECK     | 
                    JSON_PRETTY_PRINT      | 
                    JSON_UNESCAPED_UNICODE |
                    JSON_PARTIAL_OUTPUT_ON_ERROR
                );
    return $ret_JSON;

}

function err_encode(int $code): string {
    global $gv, $ga;

    if ($code == 0 && $gv->mes->is_err()) $code = 888;

    $ret_assoc = [];
    $ret_assoc['ecode'] = $code;
    $ret_assoc['emsg'] = implode("\n", $gv->mes->get_err_messages());

    $ret_JSON = json_encode(
                    $ret_assoc, 
                    JSON_NUMERIC_CHECK     | 
                    JSON_PRETTY_PRINT      | 
                    JSON_UNESCAPED_UNICODE |
                    JSON_PARTIAL_OUTPUT_ON_ERROR
                );
    return $ret_JSON;
}

function save_encode(int $code, SaveData $save): string {
    global $gv, $ga;

    $ret_assoc = [];

    $ret_assoc['ecode'] = $code;
    if ($code !== 0 || $gv->mes->is_err()) {
        $ret_assoc['emsg'] = implode("\n", $gv->mes->get_err_messages());
    } else {
        $ret_assoc['emsg'] = 'Status OK';
        $ret_assoc['save'] = $save->encode();
    }

    $ret_JSON = json_encode(
                    $ret_assoc, 
                    JSON_NUMERIC_CHECK     | 
                    JSON_PRETTY_PRINT      | 
                    JSON_UNESCAPED_UNICODE |
                    JSON_PARTIAL_OUTPUT_ON_ERROR
                );
    return $ret_JSON;
}

function hres_encode(int $code, array $hres): string {
    global $gv, $ga;

    $ret_assoc = [];

    $ret_assoc['ecode'] = $code;
    if ($code !== 0 || $gv->mes->is_err()) {
        $ret_assoc['emsg'] = implode("\n", $gv->mes->get_err_messages());
    } else {
        $ret_assoc['emsg'] = 'Status OK';

        $hres_array = [];
        foreach($hres as $hero) {
            array_push($hres_array, $hero->encode());
        }
        $ret_data = ['hres' => $hres_array];
        $ret_assoc['data'] = $ret_data;
    }

    $ret_JSON = json_encode(
                    $ret_assoc, 
                    JSON_NUMERIC_CHECK     | 
                    JSON_PRETTY_PRINT      | 
                    JSON_UNESCAPED_UNICODE |
                    JSON_PARTIAL_OUTPUT_ON_ERROR
                );
    return $ret_JSON;
}

function new_hres(): array {
    global $gv, $ga;
    $heroes = [];
    for ($i = 0; $i < $ga->number; $i++) {
        array_push($heroes, (new Hero())->random_make());
    }
    return $heroes;
}

function new_save(Guild $guld, Team $team): SaveData {
    return new SaveData([
        'auto_mode' => '0',
        'is_active' => '1',
        'is_delete' => '0',

        'all_mvpt'  => [],
        'all_maze'  => [],
        'all_guld'  => [$guld->encode()], 
        'all_team'  => [$team->encode()],

        'mypos'     => $team->get_loc()->encode(), 
    ]);
}

function new_guld(): Guild {
    global $gv, $ga;
    $guld = new Guild();
    $guld->decode(['name' => '始まりの街の冒険者ギルド']);

    for ($i = 0; $i < 12; $i++) {
        $guld->append_hero((new Hero())->random_make());
    }

    return $guld;
}

function new_team(Guild $guld): Team {
    global $gv, $ga;

    $loc  = new Location();
    $loc->decode([
        'kind'    => 'Guld',
        'name'    => $guld->get_name(),
        'loc_uid' => $guld->uid(),
        'loc_pos' => [
            'x'   => 0,
            'y'   => 0,
            'z'   => 0,
            'd'   => 0,
        ],
    ]);

    $team = new Team();
    $team->set_name('ひよこさんチーム');
    $team->set_loc($loc);
    for ($i = 0; $i <= 3; $i++) { 
        $team->append_hero((new Hero())->random_make());
    }

    return $team;
}


/*******************************************************************************/
/*                                                                             */
/*                                初　期　設　定                                */
/*                                                                             */
/*******************************************************************************/

    function init(): void {
        global $gv,$ga;
    
        return;
    }

//////////////////////////////////////////////
/////
/////     クラス宣言
/////
//////////////////////////////////////////////

    // 大域変数の設定
    class GlobalVar {
        public DspMessage $mes;

        public string $script_path;
        public string $cgi_base;
        public string $cgi_home;

        public string $icon_home;

        public PDO    $db_mai;

        public const  Maze_size_x = 21;
        public const  Maze_size_y = 21;
        public const  Limit_of_room     = 5;
        public const  Max_size_of_room  = 3;
        public const  Max_of_Maze_Floor = 3;

        public array  $team_assoc = [];
        public Team   $team;
        public array  $guld_assoc = [];
        public Team   $guld;
        public array  $heroes = [];

        public function __construct() {
            global $db_host;

            $this->mes = new DspMessage( /* isHTML = */ false);

            $this->script_path = $_SERVER['SCRIPT_NAME'];
            $this->cgi_base    = pathinfo($this->script_path, PATHINFO_DIRNAME);
            $this->cgi_home    = dirname ($this->cgi_base);
            $this->icon_home   = "{$this->cgi_home}/icon-img/kkrn_icon_home_3.png";

            $this->db_mai      = PDO_db_open($db_host, 'db_mai'); 
        }
    }
    
    
    // POST引数の設定
    class GlobalArguments {
        public string $mode;
        public string $hres_JSON   = '';
        public int    $number      =  1;

        public int    $pid         =  1;

        public function __construct() {
            global $gv;

            if ( array_key_exists('mode', $_GET) && $_GET['mode'] != '') {
                $this->mode         = $_GET ['mode'];
            } else {
                if ( array_key_exists('mode', $_POST) &&  $_POST['mode'] != '') {
                    $this->mode     = $_POST['mode'];
                } else {
                    $this->mode     = 'unknown';
                } 
            }
            if ( array_key_exists('pid', $_GET) && is_numeric($_GET['pid'])) {
                $this->pid          = intval($_GET ['pid']);
            } else {
                if ( array_key_exists('pid', $_POST) &&  is_numeric($_POST['pid'])) {
                    $this->pid      = intval($_POST['pid']);
                } else {
                    $this->pid      = 1;
                } 
            }
            if ( array_key_exists('hres', $_POST) &&  $_POST['hres'] != '') {
                $this->hres_JSON    = $_POST['hres'];
            } 
            if ( array_key_exists('number', $_POST) &&  is_numeric($_POST['number'])) {
                $this->number   = intval($_POST['number']);
            } else {
                $this->number   = 1;
            } 
        }
    }


    function PDO_db_open(string $db_host, string $db_name): PDO {
        global $gv;

        // データベース関連定数
        $db_user = "namwons33";
        $db_passwd = "PE333833";
        $db_options =  array(
            // SQL実行失敗時には例外をスローしてくれる
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            // カラム名をキーとする連想配列で取得する．これが一番ポピュラーな設定
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            // ページ終了時に終わらない持続的な接続を使う 
            // PDO::ATTR_PERSISTENT => true,
            // バッファードクエリを使う(一度に結果セットをすべて取得し、サーバー負荷を軽減)
            // SELECTで得た結果に対してもrowCountメソッドを使えるようにする
            // PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => true,
        );

        $dsn = "mysql:dbname={$db_name};host={$db_host};charset=utf8mb4";
        try {
            $dbh = new PDO($dsn,$db_user,$db_passwd,$db_options);
        } catch (PDOException $e) {
            $gv->mes->pdo_error($e, "データベース接続エラー: {$dsn}");
        }
        return $dbh;
    }

    function free(): void{
        global $gv, $ga;
        // 大域変数の開放
        $gv  = null;
        // POST引数の解放
        $ga  = null;
    }
?>

