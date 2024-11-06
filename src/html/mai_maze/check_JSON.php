<?php 
    declare(strict_types=1);

// 本番環境はURLの先頭を書き換える
    $db_host = '127.0.0.1';

    // 日本語の利用
    mb_internal_encoding("UTF-8");
    mb_regex_encoding("UTF-8");

    // 利用クラス等の読み込み
    require_once '../lib/Class_DspMessage.php'; // 画面メッセージの表示用クラス


    // ダンジョンマップのセルの種類を表す列挙型
    require_once '../lib/Enum_MzKind.php';

    // 方向を表すクラス
    require_once '../lib/Class_Direct.php';

    // 位置・経路を表すクラス全般
    require_once '../lib/Class_PointSet.php';

    // MAZE関係クラス全般
    require_once '../lib/Class_Maze.php';

    // パーティークラス全般
    require_once '../lib/Class_Team.php';

    // ヒ－ロークラス全般
    require_once '../lib/Class_Hero.php';

/*******************************************************************************/
/*                                                                             */
/*                                 主　処　理                                   */
/*                                                                             */
/*******************************************************************************/

    init();
//    $ga->mode = 'new'; // 暫定
    switch ($ga->mode) {
        case 'new':
            for ($i = 0; $i < GlobalVar::Max_of_Maze_Floor; $i++) {
                $gv->maze->create_maze($i);
            }
            for ($i = 0; $i < GlobalVar::Max_of_Maze_Floor - 1; $i++) {
                $gv->maze->create_stair($i);
            }
            $gv->team = new_team();
            break;
        case 'save':
            $gv->maze_assoc = json_decode($ga->maze_JSON, true);
            $gv->team_assoc = json_decode($ga->team_JSON, true);

            $gv->maze->decode($gv->maze_assoc);
            $gv->team->decode($gv->team_assoc);
            break;
        default:
            break;
    }


//////////////////////////////////////////////
///   サブルーチン
//////////////////////////////////////////////

function new_team(): Team {
    global $gv;
    $x = 2 * random_int(0, (($gv->maze->get_size_x() - 1) / 2) - 1) + 1;
    $y = 2 * random_int(0, (($gv->maze->get_size_y() - 1) / 2) - 1) + 1;
    $z = 0;  //    $z = 1 * random_int(0,  ($gv->maze->get_size_z() - 1));
    $d = random_int(0, Direct::MAX);

    $heroes = [];
    for ($i = 0; $i <= 3; $i++) {
        array_push($heroes, new Hero());
    }
    return new Team(['x' => $x, 'y' => $y, 'z' => $z, 'd' => $d, 'Heroes' => $heroes]);
}

/*******************************************************************************/
/*                                                                             */
/*                             画　面　表　示　関　連                            */
/*                                                                             */
/*******************************************************************************/

    function display_maze_JSON(): void {
        global $gv, $ga;

        echo "<pre>\n";
        echo  $ga->maze_JSON . PHP_EOL;
        echo "</pre>\n";

        return;
    }

    function display_maze_assoc(): void {
        global $gv, $ga;

        if (is_null(($gv->maze_assoc))) return;

        echo "<ul>\n";
        foreach ($gv->maze_assoc as $key => $value) {
            echo "<li> {$key} = {$value} </li>\n";
        }
        echo "</ul>\n";

        return;
    }
    function display_maze_obj(): void {
        global $gv, $ga;

        echo "<ul>\n";
        echo "<li> id     = " . $gv->maze->get_id()     . "</li>\n";
        echo "<li> size_x = " . $gv->maze->get_size_x() . "</li>\n";
        echo "<li> size_y = " . $gv->maze->get_size_y() . "</li>\n";
        echo "<li> size_z = " . $gv->maze->get_size_z() . "</li>\n";
        echo "</ul>\n";

        echo "maze:\n<pre>"   . $gv->maze->to_string(0, false)  . "</pre>\n";
        echo "mask:\n<pre>"   . $gv->maze->to_string(0, true)   . "</pre>\n";

        return;
    }

    function display_team_JSON(): void {
        global $gv, $ga;

        echo "<pre>\n";
        echo  $ga->team_JSON . PHP_EOL;
        echo "</pre>\n";

        return;
    }
    function display_team_assoc(): void {
        global $gv, $ga;

        if (is_null(($gv->team_assoc))) return;

        echo "<ul>\n";
        echo "<li> id     = " . $gv->team_assoc['id']     . "</li>\n";
        echo "<li> name   = " . $gv->team_assoc['name']   . "</li>\n";
        echo "<li> cur_x  = " . $gv->team_assoc['point']['x'] . "</li>\n";
        echo "<li> cur_y  = " . $gv->team_assoc['point']['y'] . "</li>\n";
        echo "<li> cur_z  = " . $gv->team_assoc['point']['z'] . "</li>\n";
        echo "<li> cur_d  = " . $gv->team_assoc['direct']['d'] . "</li>\n";
        echo "<li> Heroes "; 
            display_heroes_assoc($gv->team_assoc['heroes']); 
        echo "</li>\n";
        echo "</ul>\n";

        return;
    }
    function display_heroes_assoc(array $heroes): void {
        if (is_null($heroes) || !is_array($heroes)) return;
        echo "<dl>\n";
        foreach($heroes as $hero) {
            echo "<dt>{$hero['name']}</dt>\n";
            echo "<dd> id   = {$hero['id']}</dd>\n";
        }
        echo "</dl>\n";
    }
    function display_team_obj(): void {
        global $gv, $ga, $DirectionName;


        echo "<ul>\n";
        echo "<li> id     = " . $gv->team->get_id()     . "</li>\n";
        echo "<li> name   = " . $gv->team->get_name()   . "</li>\n";
        echo "<li> cur_x  = " . $gv->team->get_pos()->x . "</li>\n";
        echo "<li> cur_y  = " . $gv->team->get_pos()->y . "</li>\n";
        echo "<li> cur_z  = " . $gv->team->get_pos()->z . "</li>\n";
        echo "<li> cur_d  = " . $gv->team->get_dir()->get_mb_name() . "</li>\n";
        echo "<li> Heroes: ";
            display_heroes_obj($gv->team);
        echo "</li>\n";
        echo "</ul>\n";

        return;
    }
    function display_heroes_obj(Team $team): void {
        if (is_null($team) || !is_object($team) || !($team instanceof("Team"))) return;
        echo "<dl>\n";
        $max = $team->get_number_of_heroes();
        for ($i = 0; $i < $max; $i++) {
            $hero = $team->get_hero($i);
            echo "<dt>"      . $hero->get_id()   . "</dt>\n";
            echo "<dd>id = " . $hero->get_name() . "</dd>\n";
        }
        echo "</dl>\n";
    }


/*******************************************************************************/
/*                                                                             */
/*                                初　期　設　定                                */
/*                                                                             */
/*******************************************************************************/

    function init(): void {
        global $gv,$ga;
        $gv = new GlobalVar();
        $ga = new GlobalArguments();
    
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

        public PDO    $mmd_db;

        public array  $maze_assoc = [];
        public Maze   $maze;
        public array  $team_assoc = [];
        public Team   $team;

        public const    Maze_size_x = 21;
        public const    Maze_size_y = 21;
        public const    Max_of_Maze_Floor = 3;
        public const    Limit_of_room     = 5;
        public const    Max_size_of_room  = 3;

        public function __construct() {
            global $db_host;

            $this->mes = new DspMessage( /* isHTML = */ true);
            $this->script_path = $_SERVER['SCRIPT_NAME'];
            $this->cgi_base    = pathinfo($this->script_path, PATHINFO_DIRNAME);
            $this->cgi_home    = dirname ($this->cgi_base);
            $this->icon_home   = "{$this->cgi_home}/icon-img/kkrn_icon_home_3.png";

            $this->mmd_db      = PDO_db_open($db_host, 'db_mai'); 

            $this->maze        =  new Maze([
                'fill_kind'    => MzKind::Empty,
                'size_x'       => GlobalVar::Maze_size_x,
                'size_y'       => GlobalVar::Maze_size_y,
                'size_z'       => GlobalVar::Max_of_Maze_Floor, 
                'limit_room'   => GlobalVar::Limit_of_room,
                'room_size'    => GlobalVar::Max_size_of_room,
            ]);
            $this->team        =  new Team(['name' => 'New Team', 'x'=>1, 'y'=>1, 'z'=>1, 'd'=>Direct::N]);
        }

        public function is_error (): bool {
            return $this->mes->is_err();
        }
    }
    
    
    // POST引数の設定
    class GlobalArguments {
        public string $mode;
        public string $maze_JSON;
        public string $team_JSON;

        public function __construct() {
            global $gv;

            if ( array_key_exists('mode', $_GET) && $_GET['mode'] != '') {
                $this->mode         = $_GET ['mode'];
            } else {
                if ( array_key_exists('mode', $_POST) &&  $_POST['mode'] != '') {
                    $this->mode     = $_POST['mode'];
                } else {
                    $this->mode     = 'view';
                } 
            }
            if ( array_key_exists('maze', $_POST) &&  $_POST['maze'] != '') {
                $this->maze_JSON    = $_POST['maze'];
            } else {
                $this->maze_JSON    = '';
            } 
            if ( array_key_exists('team', $_POST) &&  $_POST['team'] != '') {
                $this->team_JSON    = $_POST['team'];
            } else {
                $this->team_JSON    = '';
            } 
            $gv->mes->set_nor_message("MODE = [{$this->mode}]");
        }
    }
 
    

    function pdo_error1(PDOException $e, string $errmsg): void {
        global $gv;
        $gv->mes->set_err_message($errmsg);
        $gv->mes->set_err_message("{$e->getCode()}");
        $gv->mes->set_err_message("{$e->getMessage()}");
        return;
    }

    function pdo_error2(Error $e, string $errmsg): void {
        global $gv;
        $gv->mes->set_err_message($errmsg);
        $gv->mes->set_err_message("{$e->getCode()}");
        $gv->mes->set_err_message("{$e->getMessage()}");
        return;
    }
    

    function PDO_db_open(string $db_host, string $db_name): PDO {

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

<!DOCTYPE html>
<html lang="ja">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta charset="utf-8" />
    <title>Maze Adventure I JSON Checker</title>
    <link rel="stylesheet" href="css.php?time=<?php echo date("Y-m-d_H:i:s"); ?>&file=check_JSON" />
    <!-- script type="module" src="./js/bundle.js?time=<?php //echo date("Y-m-d_H:i:s"); ?>"></script -->
</head>
<body>
    <h1 class='h1'>ダンジョンアドベンチャーⅠ JSONデータチェック</h1>
    <article class='Maze_info' id='Maze_info_pane'>
        <h2>ダンジョン・データ</h2>
        <div id ='maze_view'>
            <p>『<?php echo $ga->mode ?>』モード</p>
            <dl>
                <dt>受信データ(JSON)</dt>
                <dd><?php display_maze_JSON() ?></dd>
                <dt>復元データ(連想配列)</dt>
                <dd><?php display_maze_assoc() ?></dd>
                <dt>復元済みデータ(オブジェクト)</dt>
                <dd><?php display_maze_obj() ?></dd>
            </dl>
        </div>
        <h2>チーム・データ</h2>
        <div id ='team_view'>
            <dl>
                <dt>受信データ(JSON)</dt>
                <dd><?php display_team_JSON() ?></dd>
                <dt>復元データ(連想配列)</dt>
                <dd><?php display_team_assoc() ?></dd>
                <dt>復元済みデータ(オブジェクト)</dt>
                <dd><?php display_team_obj() ?></dd>
            </dl>
        </div>
    </article>
    <article class='message_pane' id='message_pane'>
        <div id='client_message'></div>
        <?php 
            $gv->mes->display_err_message(); 
            $gv->mes->display_nor_message(); 
        ?>
    </article>
    <footer id='footer_pane'>
        <a href='../md/'><img src='icon-img/kkrn_icon_home_3.png' /></a>
        <p class='foot_print'>Maze Adventure Ⅰ.</p>
    </footer>
</body>
<?php
    free();
?>
</html>

