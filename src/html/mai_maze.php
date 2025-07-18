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
//    $ga->mode = 'new'; // 暫定
    switch ($ga->mode) {
        case 'new':
//            $gv->maze->create_maze(0);
//            $gv->team = new_team();
            break;
        default:
            break;
    }

//////////////////////////////////////////////
///   サブルーチン
//////////////////////////////////////////////

function new_team(): Team {
    global $gv;
    $x = 2 * random_int(0, intval(($gv->maze->get_size_x() - 1) / 2) - 1) + 1;
    $y = 2 * random_int(0, intval(($gv->maze->get_size_y() - 1) / 2) - 1) + 1;
    $z = 2 * random_int(0,  ($gv->maze->get_size_z() - 1));
    $d = random_int(0, Direct::MAX);
    return new Team(['x' => $x, 'y' => $y, 'z' => $z, 'd' => $d]);
}

/*******************************************************************************/
/*                                                                             */
/*                             画　面　表　示　関　連                            */
/*                                                                             */
/*******************************************************************************/



    function display_maze(): void {
        global $gv;

        echo "<pre>\n";
        echo  $gv->maze->to_string() . PHP_EOL;
        echo "</pre>\n";

        return;
    }

    function display_cntl(): void {
        global $gv,$ga;
        return;
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

        public const    Maze_size_x = 21;
        public const    Maze_size_y = 21;
        public const    Maze_size_z =  1;
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
                                    'size_z'     => GlobalVar::Maze_size_z,
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
    <link rel="stylesheet" href="css.php?time=<?php echo date("Y-m-d_H:i:s"); ?>&file=mai_maze" />
    <script src="./js/mai_maze.js?time=<?php echo date("Y-m-d_H:i:s"); ?>"></script>
</head>
<body id='body'>
    <header id='pane_header'>
        <h1 class='h1'>ダンジョンアドベンチャーⅠ</h1>
    </header>
    <article id='pane_maze_vw3D'>
        <div id='div_maze_vw3D'>
            <canvas id='maze_view3D_canvas'></canvas>
        </div>
        <div id='div_maze_vwCh'>
            <pre id='maze_viewCh_pre'></pre>
        </div>
        <div id='div_maze_vw2D'>
            <canvas id='maze_view2D_canvas'></canvas>
        </div>
            <p id='maze_view3D_maze_name_info'></p>
            <p id='maze_view3D_direction_info'></p>
    </article>
    <article id='pane_maze_vw2m'>
        <div id='div_maze_vw2M'>
            <canvas id='maze_view2M_canvas'></canvas>
        </div>
        <div id='div_hres_info'>
            <table id='div_hres_info_table'>
                <tbody id="div_hres_info_tbody">
                    <tr id="div_hres_info_tr0">
                        <td id="div_hres_info_tr0_name"></td>
                        <td id="div_hres_info_tr0_stat"></td>
                        <td id="div_hres_info_tr0_hpCh"></td>
                        <td id="div_hres_info_tr0_mpCh"></td>
                    </tr>
                    <tr id="div_hres_info_tr1">
                        <td id="div_hres_info_tr1_name"></td>
                        <td id="div_hres_info_tr1_stat"></td>
                        <td id="div_hres_info_tr1_hpCh"></td>
                        <td id="div_hres_info_tr1_mpCh"></td>
                    </tr>
                    <tr id="div_hres_info_tr2">
                        <td id="div_hres_info_tr2_name"></td>
                        <td id="div_hres_info_tr2_stat"></td>
                        <td id="div_hres_info_tr2_hpCh"></td>
                        <td id="div_hres_info_tr2_mpCh"></td>
                    </tr>
                    <tr id="div_hres_info_tr3">
                        <td id="div_hres_info_tr3_name"></td>
                        <td id="div_hres_info_tr3_stat"></td>
                        <td id="div_hres_info_tr3_hpCh"></td>
                        <td id="div_hres_info_tr3_mpCh"></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </article>
    <article id='pane_hres_info'>
    </article>
    <article id='pane_menu_list'>
        <ul id='menu_list'>
            <li id='menu_load'>冒険の復活
                <p>以前保存した冒険を再開できます</p></li>
            <li id='menu_save'>冒険の記録
                <p>直前までの冒険を保存できます</p></li>
            <li id='menu_mvpt'>街への帰還
                <p>街(冒険者ギルド)へジャンプします</p></li>
            <li id='menu_bttl'>いきなりバトル（仮）
                <p>戦闘画面のテスト用です。完成したら消えます</p></li>
        </ul>
    </article>
    <article id='pane_ldsv_list'>
        <form id='ldsv_data_form'>
            <input id='ldsv_data_id' for='ldsv_data_form' type='hidden' name='ldsv_data_id' value='-1' />
        </form>
        <ul id='ldsv_data_list'></ul>
    </article>
    <article id='pane_ldsv_data'>
        <fieldset id='ldsv_data_fields'>
            <legend id='ldsv_data_legend'>
                セーブ情報
            </legend>
            <ul id='ldsv_data_detail'>
                <li>
                    <label for='ldsv_data_time'>保存日時:</label>
                    <p id='ldsv_data_time'></p>
                </li>
                <li>
                    <label for='ldsv_data_point'>保存場所:</label>
                    <p id='ldsv_data_point'></p>
                </li>
                <li>
                    <label for='ldsv_data_detail_'>詳細:</label>
                    <textarea id='ldsv_data_detail_' for='load_data_form' type='text' name='detail' minlength='0' maxlength='99' cols='30' rows='5' placeholder='(任意)' readonly></textarea>
                </li>
            </ul>
        </fieldset>
    </article>
    <article id ='pane_bttl_scrn'>
        <h2 id="bttl_h2">バトル・モード</h2>
        <div id='div_bttl_scrn'>
            <table id='bttl_team' bordercolor="#0000ff">
                <thead>
                    <tr><th id='bttl_team_h3' colspan="6">仲間：</th></tr>
                </thead>
                <tbody id='bttl_team_body'>
                    <tr id='bttl_team_tr0'>
                        <td id='bttl_team_tr0_nmlv'></td>
                        <td id='bttl_team_tr0_acst'></td>
                        <td id='bttl_team_tr0_hpmp'></td>
                    </tr>
                    <tr id='bttl_team_tr1'>
                        <td id='bttl_team_tr1_nmlv'></td>
                        <td id='bttl_team_tr1_acst'></td>
                        <td id='bttl_team_tr1_hpmp'></td>
                    </tr>
                    <tr id='bttl_team_tr2'>
                        <td id='bttl_team_tr2_nmlv'></td>
                        <td id='bttl_team_tr2_acst'></td>
                        <td id='bttl_team_tr2_hpmp'></td>
                    </tr>
                    <tr id='bttl_team_tr3'>
                        <td id='bttl_team_tr3_nmlv'></td>
                        <td id='bttl_team_tr3_acst'></td>
                        <td id='bttl_team_tr3_hpmp'></td>
                    </tr>
                </tbody>
            </table>
            <table id='bttl_enmy' bordercolor="#0000ff">
                <thead>
                    <tr><th id='bttl_enmy_h3' colspan="6">敵：</th></tr>
                </thead>
                <tbody id='bttl_enmy_body'>
                    <tr id='bttl_enmy_tr0'>
                        <td id='bttl_enmy_tr0_nmlv'>a</td>
                        <td id='bttl_enmy_tr0_acst'>b</td>
                        <td id='bttl_enmy_tr0_hpmt'>e</td>
                    </tr>
                    <tr id='bttl_enmy_tr1'>
                        <td id='bttl_enmy_tr1_nmlv'>aaaaaaaaaaaaaaa<br />ＬＶ：10,000</td>
                        <td id='bttl_enmy_tr1_acst'>行動：逃げる</br>状態：正　常</td>
                        <td id='bttl_enmy_tr1_hpmp'>ＨＰ： 10,000 / 10,000<br />ＭＰ： 10,000 / 10,000</td>
                    </tr>
                    <tr id='bttl_enmy_tr2'>
                        <td id='bttl_enmy_tr2_nmlv'></td>
                        <td id='bttl_enmy_tr2_acst'></td>
                        <td id='bttl_enmy_tr2_hpmp'></td>
                    </tr>
                    <tr id='bttl_enmy_tr3'>
                        <td id='bttl_enmy_tr3_nmlv'></td>
                        <td id='bttl_enmy_tr3_acst'></td>
                        <td id='bttl_enmy_tr3_hpmp'></td>
                    </tr>
                </tbody>
            </table>
            <ul id='bttl_cmmd_ul'>
                <li id='bttl_atk'>攻撃</li>
                <li id='bttl_spl'>魔法</li>
                <li id='bttl_def'>防御</li>
                <li id='bttl_avd'>回避</li>
                <li id='bttl_cvr'>かばう</li>
                <li id='bttl_run'>逃げる</li>
                <li id='bttl_use'>使う</li>
                <li id='bttl_thr'>祈る</li>
            </ul>
            <ul id='bttl_slct_ul'></ul>
        </div>
    </article>
    <article id ='pane_bttl_mesg'>
        <h2 id='bttl_mesg_p'>バトル・メッセージ</h2>
        <div id='bttl_mesg'></div>
    </article>
    <article id='pane_menu_mesg'>
        <button id='r_cp1' type='button' name='r_cp1' value='R'>戻る（Ｒ）</button>
        <p id='menu_mesg'></p>
        <button id='n_cp1' type='button' name='n_cp1' value='N'>いいえ（Ｎ）</button>
        <button id='y_cp1' type='button' name='y_cp1' value='Y'>はい（Ｙ）</button>
        <button id='s_cp1' type='button' name='s_cp1' value='S'>切替（Ｓ）utton>
    </article>
    <article id='pane_maze_mesg'>
        <p id='maze_mesg'></p>
    </article>
    <article id ='pane_ctls_boad'> 
        <div id ='div_ctls_boad'>
        <div id='ctls_boad'>
            <button id='debug_mode' type='button' name='debug_mode_button' value='false'>通常</button>
            <button id='alert_mode' type='button' name='alert_mode_button' value='false'>ログ</button>
            <button id='view3_mode' type='button' name='view3_mode_button' value='true' >３D</button>
            <button id='u_arr' type='button' name='u_arr' value='U'>↑</button>
            <button id='d_arr' type='button' name='d_arr' value='D'>↓</button>
            <button id='l_arr' type='button' name='l_arr' value='L'>←</button>
            <button id='r_arr' type='button' name='r_arr' value='R'>→</button>
            <button id='y_btn' type='button' name='y_btn' value='Y'>〇</button>
            <button id='n_btn' type='button' name='n_btn' value='N'>✖</button>
            <button id='s_btn' type='button' name='s_btn' value='S'>替</button>
            <button id='r_btn' type='button' name='r_btn' value='T'>戻</button>
            <button id='m_btn' type='button' name='m_btn' value='M'>メニュー（Ｍ）</button>
        </div>
        </div>
    </article>
    <article id ='pane_sytm_logs'>
        <!-- div id='client_message'></div -->
        <?php 
            $gv->mes->display_err_message(); 
            $gv->mes->display_nor_message(); 
        ?>
    </article>
    <footer id='pane_footer'>
        <a href='../mai/'><img src='./icon-img/kkrn_icon_home_3.png' /></a>
        <p class='foot_print'>Maze Adventure Ⅰ.</p>
    </footer>
    <script id='ts_caller'>
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

