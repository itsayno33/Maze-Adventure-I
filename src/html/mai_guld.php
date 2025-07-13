<?php 
    declare(strict_types=1);

// 本番環境はURLの先頭を書き換える
//    $db_host = '127.0.0.1';
    $db_host = 'sql';

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

/*******************************************************************************/
/*                                                                             */
/*                                 主　処　理                                   */
/*                                                                             */
/*******************************************************************************/

    init();
    switch ($ga->mode) {
        case 'new':
            break;
        default:
            break;
    }

//////////////////////////////////////////////
///   サブルーチン
//////////////////////////////////////////////

//function new_team(): Team {
//    global $gv;
//    $x = 2 * random_int(0, (($gv->maze->get_size_x() - 1) / 2) - 1) + 1;
//    $y = 2 * random_int(0, (($gv->maze->get_size_y() - 1) / 2) - 1) + 1;
//    $z = 2 * random_int(0,  ($gv->maze->get_size_z() - 1));
//    $d = random_int(0, Direct::MAX);
//    return new Team(['x' => $x, 'y' => $y, 'z' => $z, 'd' => $d]);
//}

/*******************************************************************************/
/*                                                                             */
/*                             画　面　表　示　関　連                            */
/*                                                                             */
/*******************************************************************************/



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

        public const    Maze_size_x = 21;
        public const    Maze_size_y = 21;
        public const    Limit_of_room    = 5;
        public const    Max_size_of_room = 3;
        public Maze     $maze;
        public Team     $team;

        public function __construct() {
            global $db_host;

            $this->mes = new DspMessage( /* isHTML = */ true);
            $this->script_path = $_SERVER['SCRIPT_NAME'];
            $this->cgi_base    = pathinfo($this->script_path, PATHINFO_DIRNAME);
            $this->cgi_home    = dirname ($this->cgi_base);
            $this->icon_home   = "{$this->cgi_home}/icon-img/kkrn_icon_home_3.png";

            $this->mmd_db      = PDO_db_open(); 

//            $this->maze        = new Maze(MzKind::Empty);
            $this->maze        = new Maze([
                                    'fill_kind'  => MzKind::Empty,
                                    'size_x'     => GlobalVar::Maze_size_x,
                                    'size_y'     => GlobalVar::Maze_size_y,
                                    'limit_room' => GlobalVar::Limit_of_room,
                                    'room_size'  => GlobalVar::Max_size_of_room,
                                ]);
        }

        public function is_error (): bool {
            return $this->mes->is_err();
        }
    }
    
        // POST引数の設定

        class GlobalArguments {
        public string $mode;
        public int    $pid = 1;
        public string $opt = '';

        public function __construct() {
            global $gv;

            if ( array_key_exists('mode', $_GET) && $_GET['mode'] != '') {
                $this->mode         = $_GET ['mode'];
            } else {
                if ( array_key_exists('mode', $_POST) &&  $_POST['mode'] != '') {
                    $this->mode     = $_POST['mode'];
                } else {
                    $this->mode     = 'new';
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
            if ( array_key_exists('opt', $_GET) && is_string($_GET['opt'])) {
                $this->opt          = $_GET ['opt'];
            } else {
                if ( array_key_exists('opt', $_POST) &&  is_string($_POST['opt'])) {
                    $this->opt      = $_POST['opt'];
                } else {
                    $this->opt      = '';
                } 
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
    

    function PDO_db_open(): PDO {

        // データベース関連定数
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

        try {
            $dsn = 'mysql:host=sql;dbname=db_mai;charset=utf8mb4';
            $dbh = new PDO($dsn, 'itsayno33', 'PE333833',$db_options);
        } catch (PDOException $e) {
            pdo_error1($e, "データベース接続エラー: {$dsn}");
        }
        return $dbh;
    }

?>

<!DOCTYPE html>
<html lang="ja">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0 ,user-scalable=0, shrink-to-fit=no, viewport-fit=cover">
    <title>Maze Adventure I</title>
    <link rel="stylesheet" href="css.php?time=<?php echo date("Y-m-d_H:i:s"); ?>&file=mai_guld" />
    <script src="./js/mai_guld.js?time=<?php echo date("Y-m-d_H:i:s"); ?>"></script>
</head>
<body id='body'>
    <article id='guld_head_pane'>
        <h1 class='h1'>ダンジョンアドベンチャーⅠ【ギルド】</h1>
        <button id='debug_mode' name='debug_mode' value='false' class='normal'>通常</button>
        <button id='alert_mode' name='alert_mode' value='false' class='normal'>ログ</button>
        <div id='guld_head_button'>
            <button id='r_cp1' name='r_cp1' value='R'>窓口に戻る(Ｒ)</button>
            <button id='s_cp1' name='s_cp1' value='S'>切替(Ｓ)</button>
            <button id='y_cp1' name='y_cp1' value='Y'>はい(Ｙ)</button>
            <button id='n_cp1' name='n_cp1' value='N'>いいえ(Ｎ)</button>
        </div>
        <p id='guld_head_message'></p>
    </article>
    <article id='guld_menu_list_pane'>
        <h2>街の入り口</h2>
        <ul id='guld_menu_list'>
            <li id='guld_hres'>冒険者ギルド
                <p>　仲間を募れます</p>
            </li>
            <li id='guld_tmpl'>寺院
                <p>　冒険者の治療や解呪をします</p>
            </li>
            <li id='guld_shop'>故売屋
                <p>　武器やアイテムの売り買いができます</p>
            </li>
            <li id='guld_load'>冒険の呼び出し
                <p>　冒険情報をロードできます</p>
            </li>
            <li id='guld_save'>冒険の記録
                <p>　冒険情報をセーブできます</p>
            </li>
            <li id='guld_tomz'>冒険出発
                <p>　ダンジョンに出発します</p>
            </li>
        </ul>
    </article>
    <article id='guld_hres_list_pane'>
        <h2>冒険者ギルド</h2>
        <fieldset id='hres_team_fields'>
            <legend>パーティ・メンバー</legend>
            <ul id='team_list'></ul>
        </fieldset>
        <fieldset id='hres_guld_fields'>
            <legend>ギルド・メンバー</legend>
            <ul id='guld_list'></ul>
        </fieldset>
        <fieldset id='hres_appd_fields'>
            <legend>求人募集メンバー</legend>
            <ul id='appd_list'></ul>
        </fieldset>
        <fieldset id='hres_menu_fields'>
            <legend>コマンド</legend>
            <ul id='menu_list'></ul>
        </fieldset>
        <fieldset id='hres_inpt_fields'>
            <legend>入力</legend>
            <ul id='inpt_list'></ul>
        </fieldset>
    </article>
    <article id='guld_hres_data_pane'>
        <fieldset id='hres_hero_fields'>
            <legend>冒険者の詳細情報</legend>
            <ul id='hres_hero_info'></ul>
        </fieldset>
    </article>
    <article id='guld_tmpl_list_pane'>
        <h2>寺院</h2>
        <fieldset id='tmpl_team_fields'>
            <legend>パーティ・メンバー</legend>
            <ul id='tmpl_list'></ul>
        </fieldset>
        <fieldset id='tmpl_guld_fields'>
            <legend>ギルド・メンバー</legend>
            <ul id='tmpl_guld_list'></ul>
        </fieldset>
        <fieldset id='tmpl_appd_fields'>
            <legend>求人募集メンバー</legend>
            <ul id='tmpl_appd_list'></ul>
        </fieldset>
        <fieldset id='tmpl_menu_fields'>
            <legend>コマンド</legend>
            <ul id='tmpl_menu_list'></ul>
        </fieldset>
    </article>
    <article id='guld_tmpl_data_pane'>
        <fieldset id='tmpl_hero_fields'>
            <legend>冒険者の詳細情報</legend>
            <ul id='tmpl_hero_info'></ul>
        </fieldset>
    </article>
    <article id='guld_shop_list_pane'>
        <h2>故売屋</h2>
        <fieldset id='shop_arms_fields'>
            <legend>武具</legend>
            <ul id='arms_list'></ul>
        </fieldset>
        <fieldset id='shop_shld_fields'>
            <legend>防具</legend>
            <ul id='shld_list'></ul>
        </fieldset>
        <fieldset id='shop_item_fields'>
            <legend>道具</legend>
            <ul id='item_list'></ul>
        </fieldset>
        <fieldset id='shop_drag_fields'>
            <legend>薬品</legend>
            <ul id='drag_list'></ul>
        </fieldset>
    </article>
    <article id='guld_shop_data_pane'>
        <fieldset id='shop_good_fields'>
            <legend>アイテムの詳細情報</legend>
            <ul id='shop_good_info'></ul>
        </fieldset>
    </article>
    <article id='guld_ldsv_list_pane'>
        <h2>冒険の記録</h2>
        <ul id='ldsv_list'></ul>
    </article>
    <article id='guld_ldsv_data_pane'>
                <fieldset id='ldsv_info_fields'>
                    <legend>記録の概要</legend>
                    <ul id='ldsv_info_detail'></ul>
                </fieldset>
    </article>
    <article id='guld_tomz_maze_pane'>
        <h2>迷宮への挑戦</h2>
        <fieldset id='tomz_maze_fields'>
            <legend>新たな迷宮への入り口</legend>
            <ul id='maze_list'></ul>
        </fieldset>
    </article>
    <article id='guld_tomz_mvpt_pane'>
        <fieldset id='tomz_mvpt_fields'>
            <legend>攻略中の迷宮に戻る</legend>
            <ul id='mvpt_list'></ul>
        </fieldset>
    </article>
    <article id='guld_ctls_pane'>
        <div id ='ctls_view'><div id='ctls_panel'>
            <button id='u_arr' type='button' name='u_arr' value='U'>↑</button>
            <button id='d_arr' type='button' name='d_arr' value='D'>↓</button>
            <button id='l_arr' type='button' name='l_arr' value='L'>←</button>
            <button id='r_arr' type='button' name='r_arr' value='R'>→</button>
            <button id='y_btn' type='button' name='y_btn' value='U'>〇</button>
            <button id='n_btn' type='button' name='n_btn' value='N'>✖</button>
            <button id='s_btn' type='button' name='s_btn' value='S'>替</button>
            <button id='r_btn' type='button' name='r_btn' value='R'>戻</button>
        </div></div>
    </article>
    <article id='sytm_logs_pane'>
        <div id='client_message'></div>
        <?php 
            $gv->mes->display_err_message(); 
            $gv->mes->display_nor_message(); 
        ?>
    </article>
    <footer id='foot_pane'>
        <a href='../../mai/'><img src='./icon-img/kkrn_icon_home_3.png' /></a>
        <p class='foot_print'>Guild in Maze Adventure I.</p>
    </footer>
    <script>
        window.tsCall.start_game(
            '<?php echo $ga->mode; ?>', 
            '<?php echo $gv->script_path; ?>', 
             <?php echo $ga->pid; ?>, 
            '<?php echo $ga->opt; ?>', 
        );
    </script>
</body>
<?php
    // 大域変数の開放
    $gv  = null;
    // POST引数の解放
    $ga  = null;
?>
</html>

