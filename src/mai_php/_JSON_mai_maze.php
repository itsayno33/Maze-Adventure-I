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

    require_once './lib/Class_Location.php'; 

    // MAZE関係クラス全般
    require_once './lib/Class_Maze.php';
    require_once './lib/Class_MazeInfo.php'; // Maze作成のテンプレート情報

    // パーティークラス全般
    require_once './lib/Class_Team.php';

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
        case 'maze_info':
            $maze_info_array = [];
            foreach ($gv->mazeinfo as $name => $info) array_push($maze_info_array, $info->encode());
            $ret_JSON = all_encode(
                0, 
                ['mazeinfo' => $maze_info_array],
            );
            break;
        case 'new_maze':
            [$new_maze, $new_pos] = create_maze($ga->maze_name); 
            $ret_JSON = all_encode(
                0, 
                [
                    'maze' => $new_maze->encode(),
                    'pos'  => $new_pos,
                ],
            );
            break;
        case 'new_game':
            [$new_maze, $new_pos] = create_maze(''); 
            $new_team = create_team($new_maze, $new_pos); 
            $new_save = new_save($new_maze, $new_team);
            $ret_JSON = save_encode(0, $new_save);
/*
            $ret_JSON = all_encode(
                0, 
                [
                    'maze' => $new_maze->encode(), 
                    'pos'  => $new_pos,
                    'hres' => $new_hres,
                ]);
*/
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

function all_encode(int $code, array $data): string {
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


function new_save(Maze $maze, Team $team): SaveData {
    return new SaveData([
        'auto_mode' => '0',
        'is_active' => '1',
        'is_delete' => '0',

        'all_team'  => [$team->encode()],
        'all_maze'  => [$maze->encode()],
        'all_guld'  => [], 
        'all_mvpt'  => [], 

        'mypos'     => $team->get_loc()->encode(),
    ]);
}

function create_maze(string $maze_name = ''): array {
    global $gv, $ga;

    if ($maze_name == '') {
        $maze = new Maze([
            'name'   => '始まりの迷宮', 
            'size_x' => 21, 
            'size_y' => 21, 
            'size_z' => GlobalVar::Max_of_Maze_Floor
        ]);
    } else {
        $mazeinfo = $gv->mazeinfo[$maze_name];
        $maze = new Maze([
            'name'   => $mazeinfo->mbname, 
            'size_x' => $mazeinfo->size_x, 
            'size_y' => $mazeinfo->size_y, 
            'size_z' => $mazeinfo->size_z
        ]);
    }
    for ($i = 0; $i < $maze->get_size_z(); $i++) {
        $maze->create_maze($i);
    } 
    for ($i = 1; $i < $maze->get_size_z(); $i++) {
        $maze->create_stair($i);
    }
    $pos = $maze->create_stair(0);
    return [$maze, $pos];
}

/*
// 迷宮探索 新規ゲーム用の暫定版処置。その一
function create_pos(Maze $maze): array {
    $x = 2 * random_int(0, (($maze->get_size_x() - 1) / 2) - 1) + 1;
    $y = 2 * random_int(0, (($maze->get_size_y() - 1) / 2) - 1) + 1;
    $z = 0;  //    $z = 1 * random_int(0,  ($gv->maze->get_size_z() - 1));

    $d = random_int(0, Direct::MAX);
    return ['x' => $x, 'y' => $y, 'z' => $z, 'd' => $d];
}
*/

// 迷宮探索 新規ゲーム用の暫定版処置。その二
function create_hres(): array {
    $hres = [];
    for ($i = 0; $i <= 3; $i++) {
        array_push($hres, (new Hero())->random_make()->encode());
    }

    return $hres;
}

function create_team(Maze $maze, array $pos): Team {
/*
    $x = 2 * random_int(0, (($maze->get_size_x() - 1) / 2) - 1) + 1;
    $y = 2 * random_int(0, (($maze->get_size_y() - 1) / 2) - 1) + 1;
    $z = 0;  //    $z = 1 * random_int(0,  ($gv->maze->get_size_z() - 1));

    $d = random_int(0, Direct::MAX);
*/
    $loc  = new Location();
    $loc->decode([
        'kind'    => 'Maze',
        'name'    => $maze->get_name(),
        'loc_uid' => $maze->uid(),
        'loc_pos' => $pos,
/*
        'loc_pos' => [
            'x'   => $x,
            'y'   => $y,
            'z'   => $z,
            'd'   => $d,
        ],
*/
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
        public array  $mazeinfo = [];

        public const  Maze_size_x = 21;
        public const  Maze_size_y = 21;
        public const  Limit_of_room     = 5;
        public const  Max_size_of_room  = 3;
        public const  Max_of_Maze_Floor = 3;

        public array  $maze_assoc = [];
        public Maze   $maze;
        public array  $team_assoc = [];
        public Team   $team;
        public array  $heroes = [];

        public function __construct() {
            global $db_host;

            $this->mes = new DspMessage( /* isHTML = */ false);

            $this->script_path = $_SERVER['SCRIPT_NAME'];
            $this->cgi_base    = pathinfo($this->script_path, PATHINFO_DIRNAME);
            $this->cgi_home    = dirname ($this->cgi_base);
            $this->icon_home   = "{$this->cgi_home}/icon-img/kkrn_icon_home_3.png";

            $this->db_mai      = PDO_db_open($db_host, 'db_mai'); 
           [$rslt, $mazeinfo]  = MazeInfo::get_tbl_all($this->db_mai, $this->mes);
            if ($rslt) $this->mazeinfo = $mazeinfo; 

            $this->maze        = new Maze([
                'fill_kind'    => MzKind::Empty,
                'size_x'       => GlobalVar::Maze_size_x,
                'size_y'       => GlobalVar::Maze_size_y,
                'size_z'       => GlobalVar::Max_of_Maze_Floor, 
                'max_room'     => GlobalVar::Limit_of_room,
                'room_size'    => GlobalVar::Max_size_of_room,
            ]);
            $this->team        =  new Team(['name' => 'New Team', 'x'=>1, 'y'=>1, 'z'=>1, 'd'=>Direct::N]);
        }
    }
    
    
    // POST引数の設定
    class GlobalArguments {
        public string $mode;
        public string $maze_JSON   = '';
        public string $team_JSON   = '';

        public int    $pid         =  1;
        public string $maze_name   = '';

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
            if ( array_key_exists('maze', $_POST) &&  $_POST['maze'] != '') {
                $this->maze_JSON    = $_POST['maze'];
            } 
            if ( array_key_exists('team', $_POST) &&  $_POST['team'] != '') {
                $this->team_JSON    = $_POST['team'];
            } 
            if ( array_key_exists('maze_name', $_POST) &&  $_POST['maze_name'] != '') {
                $this->maze_name    = $_POST['maze_name'];
            } 
        }
    }

    ///////////////////////////////////////////////
///   データベース関係 
///////////////////////////////////////////////   


function tr_begin(PDO $db_mai): bool {
    global $gv;
    try {
        $db_mai->beginTransaction();
    } catch (PDOException $e) {
        $gv->mes->pdo_error($e, "トランザクションの開始失敗");
        return false;
    } catch (Throwable $ee) {
        $gv->mes->pdo_error($ee, "トランザクション開始の致命的失敗");
        return false;
    } 
    return true;
}

function tr_commit(PDO $db_mai): bool {
    global $gv;
    try {
        $db_mai->commit();
    } catch (PDOException $e) {
        $gv->mes->pdo_error($e, "トランザクションのコミット失敗");
        return false;
    } catch (Throwable $ee) {
        $gv->mes->pdo_error($ee, "トランザクション・コミットの致命的失敗");
        return false;
    } 
    return true;
}

function tr_rollback(PDO $db_mai): bool {
    global $gv;
    try {
        $db_mai->rollback();
    } catch (PDOException $e) {
        $gv->mes->pdo_error($e, "トランザクションのロールバック失敗");
        return false;
    } catch (Throwable $ee) {
        $gv->mes->pdo_error($ee, "トランザクション・ロールバックの致命的失敗");
        return false;
    } 
    return true;
}



function PDO_db_open(string $db_host, string $db_name): PDO {

    // データベース関連定数
    $db_user    = "namwons33";
    $db_passwd  = "PE333833";
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
        pdo_error1($e, "データベース接続エラー: {$dsn}");
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

