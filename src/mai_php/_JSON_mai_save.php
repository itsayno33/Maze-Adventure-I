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

    // Save/Load関係クラス全般
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
        case 'save_info':
            [$result, $save_array] = SaveData::get_list_by_pid($gv->db_mai, $gv->mes, $ga->pid);
            if (!$result) {
                $code = 500;
                $ret_JSON = err_encode($code);
                break;
            }
            $ret_JSON = all_save_info(0, $save_array);
            break;
        case 'tmp_load':
//            $ret_JSON = auto_load($gv->db_mai, 100, '__TemporarySaveData__', 330);
            $ret_JSON = _load($gv->db_mai, $ga->pid, 100, 330);
            break;
        case 'tmp_save':
            $ret_JSON = _save($gv->db_mai, 100, '__TemporarySaveData__', 230);
            break;
        case 'instant_load':
            $ret_JSON = _load($gv->db_mai, $ga->pid, 101, 310);
            break;
        case 'instant_save':
            $ret_JSON = _save($gv->db_mai, 101, '__InstantSaveData__', 210);
            break;
        case 'UD_load':
            $ret_JSON = _load($gv->db_mai, $ga->pid, 102, 350);
            break;
        case 'UD_save':
            $ret_JSON = _save($gv->db_mai, 102, '__UpDownSaveData__', 250);
            break;
        case 'before_load':
            $ret_JSON = _load($gv->db_mai, $ga->pid, 103, 380);
            break;
        case 'before_save':
            $ret_JSON = _save($gv->db_mai, 103, '__BeforeTheEventData__', 280);
            break;
        case 'load':
            $ret_JSON = _load($gv->db_mai, $ga->pid, $ga->uno, 30);
            break;
        case 'save':
            $ret_JSON = _save($gv->db_mai, $ga->save->uniq_no, $ga->save->title, 230);
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

function _load(PDO $db_mai, int $pid, int $uno, int $ecode): string {
    global $gv, $ga;

    $save = new SaveData(['player_id' => $pid, 'uniq_no' => $uno]);

    tr_begin($db_mai);

    // ユニーク・ナンバーでsaveデータを探す。見つかれば$save_dataにセットする
    [$result, $save_data] = $save->get_save_id_at_tbl($db_mai, $gv->mes);
    if (!$result) {
        tr_rollback($db_mai);
        return all_encode($ecode, $save);;
    }
    if (is_array($save_data)) $save->decode($save_data);

    // mezeやteam等の関連するデータを反映する
    $result = $save->get_from_odb($db_mai, $gv->mes);
    if (!$result) {
        tr_rollback($db_mai);
        return all_encode($ecode, $save);;
    }

    tr_commit($db_mai);
    return all_encode(0, $save);

}

function _save(PDO $db_mai, int $uniq_no, string $title, int $ecode): string {
    global $gv, $ga;

    $save = $ga->save;
    $save->uniq_no = $uniq_no;
    $save->title   = $title;

    tr_begin($db_mai);

    // ユニーク・ナンバーでsaveデータを探す。見つかれば$save_dataにセットする
    [$rslt, $save_data] = $save->get_save_id_at_tbl($db_mai, $gv->mes);
    if ($gv->mes->is_err()) {
        tr_rollback($db_mai);
        return all_encode($ecode + 10, $save);
    }
    // 同じユニーク・ナンバーの既存データが有るので一旦削除する
    if ($rslt) {
        $rslt = $save->del_to_odb($db_mai, $gv->mes, intval($save_data['save_id'])); 
        if ($rslt === false) {
            tr_rollback($db_mai);
            return all_encode($ecode + 33, $save);
        }
    }
    // 改めて(別のレコードに)セーブする
    $rslt = $save->set_to_odb($db_mai, $gv->mes, $save);
    if ($rslt === false) {
        tr_rollback($db_mai);
        return all_encode($ecode + 23, $save);
    }

    tr_commit($db_mai);
    return all_encode(0, $save);
}
/*
function auto_save(PDO $db_mai, int $uniq_no, string $title, int $ecode): string {
    global $gv, $ga;

    $save = $ga->save;
    $save->uniq_no = $uniq_no;
    $save->title   = $title;

    tr_begin($db_mai);

    // ユニーク・ナンバーでsaveデータを探す。見つかれば$save_dataにセットする
    [$rslt, $save_data] = $save->get_save_id_at_tbl($db_mai, $gv->mes);
    if ($gv->mes->is_err()) {
        tr_rollback($db_mai);
        return all_encode($ecode + 10, $save);
    }
    // 同じユニーク・ナンバーの既存データが有るので一旦削除する
    if ($rslt) {
        $rslt = $save->del_to_odb($db_mai, $gv->mes, intval($save_data['save_id'])); 
        if ($rslt === false) {
            tr_rollback($db_mai);
            return all_encode($ecode + 33, $save);
        }
    }
    // 改めて(別のレコードに)セーブする
    $rslt = $save->set_to_odb($db_mai, $gv->mes, $save);
    if ($rslt === false) {
        tr_rollback($db_mai);
        return all_encode($ecode + 23, $save);
    }

    tr_commit($db_mai);
    return all_encode(0, $save);
}

function manual_save(PDO $db_mai, int $ecode): string {
    global $gv,$ga;

    $save = $ga->save;
    tr_begin($db_mai);

    // ユニーク・ナンバーでsaveデータを探す。見つかれば$save_dataにセットする
    [$rslt, $save_data] = $save->get_save_id_at_tbl($db_mai, $gv->mes);
    if ($gv->mes->is_err()) {
        tr_rollback($db_mai);
        return all_encode($ecode + 10, $save);
    }
    // 同じユニーク・ナンバーの既存データが有るので一旦削除する
    if ($rslt) {
        $rslt = $save->del_to_odb($db_mai, $gv->mes, intval($save_data['save_id']));
        if ($rslt === false) {
            tr_rollback($db_mai);
            return all_encode($ecode + 33, $save);
        }
    }
    // 改めて(別のレコードに)セーブする
    $rslt = $save->set_to_odb($db_mai, $gv->mes, $save);
    if ($rslt === false) {
        tr_rollback($db_mai);
        return all_encode($ecode + 23, $save);
    }

    tr_commit($db_mai);
    return all_encode(0, $save);
}
*/
function all_encode(int $code, SaveData $save): string {
    global $gv, $ga;

    $ret_assoc = [];

    $ret_assoc['ecode'] = $code;
    if ($code !== 0 || $gv->mes->is_err()) {
        if ($code === 0) $ret_assoc['ecode'] = 999;
        $ret_assoc['emsg'] = implode("\n", $gv->mes->get_err_messages());
    } else {
        $ret_assoc['emsg'] = 'Status OK';

        if (!is_null($save)) {
            $ret_assoc['save']    = $save->encode();
        } else {
            $ret_assoc['save']    = [];
        }
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

function all_save_info(int $code, array $save_array): string {
    global $gv;

    $ret_assoc = [];

    $ret_assoc['ecode'] = $code;
    if ($code !== 0 || $gv->mes->is_err()) {
        $ret_assoc['emsg'] = implode("\n", $gv->mes->get_err_messages());
    } else {
        $ret_assoc['emsg'] = 'Status OK';

        $save_dat_array = [];
        foreach ($save_array as $save) {
            array_push($save_dat_array, $save->encode());
        }
        $ret_assoc['save_info']    = $save_dat_array;
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

    $ret_assoc = [];

    $ret_assoc['ecode'] = $code;
    if ($code === 0) $ret_assoc['ecode'] = 888;
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
        public string   $mode;
        
        public string   $save_JSON   = '';
        public SaveData|null $save   = null;

        public int      $pid         =  1;
        public int      $uno         = -1;
        public int      $save_id     = -1;
        public string   $save_title  = ''; 
        public string   $save_detail = ''; 
        public string   $save_point  = ''; 
        public string   $save_time   = ''; 

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
            if ( array_key_exists('uno', $_GET) && is_numeric($_GET['uno'])) {
                $this->uno          = intval($_GET ['uno']);
            } else {
                if ( array_key_exists('uno', $_POST) &&  is_numeric($_POST['uno'])) {
                    $this->uno      = intval($_POST['uno']);
                } else {
                    $this->uno      = -1;
                } 
            } 
            if ( array_key_exists('save', $_POST) &&  $_POST['save'] != '') {
                $this->save_JSON    = $_POST['save'];
                $a = json_decode(
                    $this->save_JSON, true, 512, 
                    JSON_BIGINT_AS_STRING  | 
                    JSON_OBJECT_AS_ARRAY   | 
                    JSON_UNESCAPED_UNICODE |
                    JSON_PARTIAL_OUTPUT_ON_ERROR
                );
                $this->save         = new SaveData($a);
            } else {
                $this->save         = null;
            }
            if ( array_key_exists('save_id', $_POST) &&  is_numeric($_POST['save_id'])) {
                $this->save_id      = intval($_POST['save_id']);
            } 
            if ( array_key_exists('save_title',  $_POST) &&  $_POST['save_title']  != '') {
                $this->save_title    = $_POST['save_title'];
            } 
            if ( array_key_exists('save_detail', $_POST) &&  $_POST['save_detail'] != '') {
                $this->save_detail   = $_POST['save_detail'];
            } 
            if ( array_key_exists('save_point',  $_POST) &&  $_POST['save_point']  != '') {
                $this->save_point   = $_POST['save_point'];
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

