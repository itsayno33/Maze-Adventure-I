<?php 
    declare(strict_types=1);

// 本番環境はURLの先頭を書き換える
    $db_host = '127.0.0.1';

    // 日本語の利用
    mb_internal_encoding("UTF-8");
    mb_regex_encoding("UTF-8");

    // 利用クラス等の読み込み
    require_once './lib/Class_DspMessage.php'; // 画面メッセージの表示用クラス


    // ダンジョンマップのセルの種類を表す列挙型
    require_once './lib/Enum_MzKind.php';

    // 方向を表すクラス
    require_once './lib/Class_Direct.php';

    // 位置・経路を表すクラス全般
    require_once './lib/Class_PointSet.php';

    // MAZE関係クラス全般
    require_once './lib/Class_Maze.php';

    // パーティークラス全般
    require_once './lib/Class_Team.php';

    // ヒ－ロークラス全般
    require_once './lib/Class_Hero.php';

    // ギルドクラス全般
    require_once './lib/Class_Guild.php';

    // Save/Load関係クラス全般
    require_once './lib/Class_SaveData.php';

/*******************************************************************************/
/*                                                                             */
/*                                 主　処　理                                   */
/*                                                                             */
/*******************************************************************************/

    init();
//    $ga->mode = 'new'; // 暫定
    switch ($ga->mode) {
        case 'save':
            if ($ga->save_JSON != '') {
                $gv->save_assoc = json_decode($ga->save_JSON, true);

                $ga->maze_JSON  = '';
                $ga->team_JSON  = '';
                $ga->guld_JSON  = '';

                $gv->maze_assoc = $gv->save_assoc['all_maze'][0];
                $gv->team_assoc = $gv->save_assoc['all_team'][0];
                $gv->guld_assoc = $gv->save_assoc['all_guld'][0];
            } else {
                $gv->maze_assoc = json_decode($ga->maze_JSON, true);
                $gv->team_assoc = json_decode($ga->team_JSON, true);
                $gv->guld_assoc = json_decode($ga->guld_JSON, true);
            }

            if ($ga->save_JSON != '') $gv->save = (new SaveData([]))->decode($gv->save_assoc);
            $gv->maze = (new Maze([])) ->decode($gv->maze_assoc);
            $gv->team = (new Team([])) ->decode($gv->team_assoc);
            $gv->guld = (new Guild([]))->decode($gv->guld_assoc);
            break;
        default:
            break;
    }


//////////////////////////////////////////////
///   サブルーチン
//////////////////////////////////////////////





/*******************************************************************************/
/*                                                                             */
/*                             画　面　表　示　関　連                            */
/*                                                                             */
/*******************************************************************************/

    function display_save_JSON(): void {
        global $gv, $ga;

        echo "<pre>\n";
        echo  $ga->save_JSON . PHP_EOL;
        echo "</pre>\n";

        return;
    }

    function display_save_assoc(): void {
        global $gv, $ga;

        __nested_display($gv->save_assoc);
        return;
    }

    function display_save_obj(): void {
        global $gv, $ga;

        $save = $gv->save->encode();
        echo "<ul>\n";
        echo "<li> save_id = "   . $save['save_id']     . "</li>\n";
        echo "<li> player_id = " . $save['player_id'] . "</li>\n";
        echo "<li> title = "     . $save['title'] . "</li>\n";
        echo "<li> detail = "    . $save['detail'] . "</li>\n";
        echo "<li> point = "     . $save['point'] . "</li>\n";
        echo "<li> auto_mode = " . $save['auto_mode'] . "</li>\n";
        echo "<li> is_active = " . $save['is_active'] . "</li>\n";
        echo "<li> is_delete = " . $save['is_delete'] . "</li>\n";
        echo "<li> save_time = " . $save['save_time'] . "</li>\n";
        echo "</ul>\n";

        return;
    }

    function __nested_display(array $a) {
        if (is_null(($a)) || !is_array($a)) return;

        echo "<ul>\n";
        foreach ($a as $key => $value) {
            if (is_array($value)) {
                echo "<li>{$key}\n";
                __nested_display($value);
                echo "</li>\n";
            } else {
                echo "<li> {$key} = {$value} </li>\n";
            }
        }
        echo "</ul>\n";
    }


    function display_maze_JSON(): void {
        global $gv, $ga;

        echo "<pre>\n";
        echo  $ga->maze_JSON . PHP_EOL;
        echo "</pre>\n";

        return;
    }

    function display_maze_assoc(): void {
        global $gv, $ga;
        __nested_display($gv->maze_assoc);
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
        __nested_display($gv->team_assoc);
        return;
    }
    function display_team_obj(): void {
        global $gv, $ga, $DirectionName;

        $team = $gv->team->encode();
        echo "<ul>\n";
        echo "<li> id     = " . $team['id']           . "</li>\n";
        echo "<li> name   = " . $team['name']         . "</li>\n";
        echo "<li> cur_x  = " . $team['point']['x'] . "</li>\n";
        echo "<li> cur_y  = " . $team['point']['y'] . "</li>\n";
        echo "<li> cur_z  = " . $team['point']['z'] . "</li>\n";
        echo "<li> cur_d  = " . $gv->team->get_dir()->get_mb_name() . "</li>\n";
        echo "<li> Heroes: ";
            display_heroes_obj($team['heroes']);
        echo "</li>\n";
        echo "</ul>\n";

        return;
    }

    function display_guld_JSON(): void {
        global $gv, $ga;

        echo "<pre>\n";
        echo  $ga->guld_JSON . PHP_EOL;
        echo "</pre>\n";

        return;
    }
    function display_guld_assoc(): void {
        global $gv, $ga;
        __nested_display($gv->team_assoc);
        if (is_null(($gv->guld_assoc))) return;
        return;
    }
    function display_guld_obj(): void {
        global $gv, $ga, $DirectionName;


        echo "<ul>\n";
        echo "<li> id      = " . $gv->guld->id      . "</li>\n";
        echo "<li> name    = " . $gv->guld->name    . "</li>\n";
        echo "<li> save_id = " . $gv->guld->save_id . "</li>\n";
        echo "<li> team_id = " . $gv->guld->team_id . "</li>\n";
        echo "<li> Heroes: ";
            display_heroes_obj($gv->guld->heroes);
        echo "</li>\n";
        echo "</ul>\n";

        return;
    }

    function display_heroes_assoc(array $heroes): void {
        __nested_display($heroes);
    }
    function display_heroes_obj(array $hres): void {
        if (is_null($hres) || !is_array($hres)) return;
        echo "<dl>\n";
        foreach ($hres as $hero) {
            $hero_data = $hero->encode();
            __nested_display($hero_data);
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
        public string   $script_path;
        public string   $cgi_base;
        public string   $cgi_home;

        public string   $icon_home;

        public PDO      $db_mai;

        public array    $save_assoc = [];
        public SaveData $save;
        public array    $maze_assoc = [];
        public Maze     $maze;
        public array    $team_assoc = [];
        public Team     $team;
        public array    $guld_assoc = [];
        public Guild    $guld;

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

            $this->db_mai      = PDO_db_open($db_host, 'db_mai'); 

        }

        public function is_error (): bool {
            return $this->mes->is_err();
        }
    }
    
    
    // POST引数の設定
    class GlobalArguments {
        public string $mode;
        public string $save_JSON;
        public string $maze_JSON;
        public string $team_JSON;
        public string $guld_JSON;

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
            if ( array_key_exists('guld', $_POST) &&  $_POST['guld'] != '') {
                $this->guld_JSON    = $_POST['guld'];
            } else {
                $this->guld_JSON    = '';
            } 
            if ( array_key_exists('save', $_POST) &&  $_POST['save'] != '') {
                $this->save_JSON    = $_POST['save'];
            } else {
                $this->save_JSON    = '';
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
    <p>『<?php echo $ga->mode ?>』モード</p>
    <article class='Maze_info' id='Maze_info_pane'>
        <h3>セーブ情報</h3>
        <div id ='save_view'>
            <dl>
                <dt>受信データ(JSON)</dt>
                <dd><?php display_save_JSON() ?></dd>
                <dt>復元データ(連想配列)</dt>
                <dd><?php display_save_assoc() ?></dd>
                <dt>復元済みデータ(オブジェクト)</dt>
                <dd><?php display_save_obj() ?></dd>
            </dl>
        </div>
        <h3>ダンジョン・データ</h3>
        <div id ='maze_view'>
            <dl>
                <dt>受信データ(JSON)</dt>
                <dd><?php display_maze_JSON() ?></dd>
                <dt>復元データ(連想配列)</dt>
                <dd><?php display_maze_assoc() ?></dd>
                <dt>復元済みデータ(オブジェクト)</dt>
                <dd><?php display_maze_obj() ?></dd>
            </dl>
        </div>
        <h3>チーム・データ</h3>
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
        <h3>ギルド・データ</h3>
        <div id ='guld_view'>
            <dl>
                <dt>受信データ(JSON)</dt>
                <dd><?php display_guld_JSON() ?></dd>
                <dt>復元データ(連想配列)</dt>
                <dd><?php display_guld_assoc() ?></dd>
                <dt>復元済みデータ(オブジェクト)</dt>
                <dd><?php display_guld_obj() ?></dd>
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

