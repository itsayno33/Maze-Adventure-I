<?php 
    declare(strict_types=1);

// 本番環境はURLの先頭を書き換える
    $db_host = '127.0.0.1';

    // 日本語の利用
    mb_internal_encoding("UTF-8");
    mb_regex_encoding("UTF-8");

    // 利用クラス等の読み込み

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
        case 'new':
            new_maze();
            new_team();
            $ret_JSON = all_encode(0);
            break;
        case 'save_info':
            $save_info = get_save_info($gv->db_mai, $ga->pid);
            if ($save_info === null) {
                $code = 500;
                $ret_JSON = all_encode($code);
                break;
            }
            $ret_JSON = all_save_info(0, $save_info);
            break;
        case 'UD_load':
            $save_id = get_save_id($gv->db_mai, $ga->pid, '__UpDownSaveData__');
            if ($save_id === false) {
                $code = 320;
                $ret_JSON = all_encode($code);
                break;
            }
            $ret_JSON = all_load($save_id);
            break;
        case 'UD_save':
            $save_id = get_save_id($gv->db_mai, $ga->pid, '__UpDownSaveData__');
            if ($save_id === false) {
                [$rslt, $save_id] = new_save($gv->db_mai, $ga->pid, '__UpDownSaveData__', true);
                if ($rslt === false) {
                    $code = 220;
                    $ret_JSON = all_encode($code);
                    break;
                }
            }
            $ret_JSON = all_save($ga->pid, $save_id, '__UpDownSaveData__', true);
            break;
        case 'instant_load':
            $save_id = get_save_id($gv->db_mai, $ga->pid, '__InstantSaveData__');
            if ($save_id === false) {
                $code = 310;
                $ret_JSON = all_encode($code);
                break;
            }
            $ret_JSON = all_load($save_id);
            break;
        case 'instant_save':
            $save_id = get_save_id($gv->db_mai, $ga->pid, '__InstantSaveData__');
            if ($save_id === false) {
                [$rslt, $save_id] = new_save($gv->db_mai, $ga->pid, '__InstantSaveData__', true);
                if ($rslt === false) {
                    $code = 210;
                    $ret_JSON = all_encode($code);
                    break;
                }
            }
            $ret_JSON = all_save($ga->pid, $save_id, '__InstantSaveData__', true);
            break;
        case 'load':
            $ret_JSON = all_load($ga->save_id);
            break;
        case 'save':
            if ($ga->save_id < 1) {
                tr_begin($gv->db_mai);
                [$rslt, $save_id] = new_save($gv->db_mai, $ga->pid, $ga->save_title, false);
                if ($rslt === false) {
                    tr_rollback($gv->db_mai);
                    $code = 610;
                    $ret_JSON = all_encode($code);
                    break;
                }
                tr_commit($gv->db_mai);
                $ga->save_id = $save_id;
            }
            $rslt = all_save($ga->pid, $ga->save_id, $ga->save_title, false);
            if ($rslt === false) {
                $code = 620;
                $ret_JSON = all_encode($code);
                break;
            }
            $ret_JSON = all_encode(0);
            break;
        default:
            $gv->mes->set_err_message('Unknwn Mode was requested.');
            $ret_JSON = all_encode(999);
            break;
    }

    header("Content-type: application/json");
    echo $ret_JSON;
    free();
 
//////////////////////////////////////////////
///   サブルーチン
//////////////////////////////////////////////

function all_load(int $save_id): string {
    global $gv;
    $result = do_load($save_id);

    if (!$result || $gv->mes->is_err()) {
        $code = 100;
        $ret_JSON = all_encode($code);
    } else {
        $ret_JSON = all_encode(0);
    }
    return $ret_JSON;
}

function all_save(int $pid, int $save_id, string $title, bool $is_instant): string {
    global $gv, $ga;

    $gv->maze_assoc = json_decode($ga->maze_JSON, true);
    $gv->maze->decode($gv->maze_assoc);

    $gv->team_assoc = json_decode($ga->team_JSON, true);
    $gv->team->decode($gv->team_assoc);

    $result    = do_save($pid, $save_id, $title, $is_instant);
    if ($result) do_load($save_id);

    if (!$result || $gv->mes->is_err()) {
        $code = 200;
        $ret_JSON = all_encode($code);
    } else {
        $ret_JSON = all_encode(0);
    }
    return $ret_JSON;
}
function all_encode(int $code): string {
    global $gv, $ga;

    $ret_assoc = [];

    $ret_assoc['ecode'] = $code;
    if ($code !== 0 || $gv->mes->is_err()) {
        $ret_assoc['emsg'] = implode("\n", $gv->mes->get_err_messages());
    } else {
        $save = [];
        $save['save_id']      = $ga->save_id;
        $save['title']        = $ga->save_title;
        $save['detail']       = $ga->save_detail;
        $save['point']        = $ga->save_point;
        $save['time']         = $ga->save_time;

        $ret_assoc['save']    = [$save];
        $ret_assoc['maze']    = $gv->maze->encode();
        $ret_assoc['team']    = $gv->team->encode();
    }

    $ret_JSON = json_encode($ret_assoc,  
                JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    return $ret_JSON;
}

function all_save_info(int $code, array $save_info): string {
    global $gv, $ga;

    $ret_assoc = [];

    $ret_assoc['ecode'] = $code;
    if ($code !== 0 || $gv->mes->is_err()) {
        $ret_assoc['emsg'] = implode("\n", $gv->mes->get_err_messages());
    } else {
        $save_array = [];
        foreach ($save_info as $save_dat) {
            $save = [];
            $save['save_id']      = $save_dat['id'];
            $save['title']        = $save_dat['title'];
            $save['detail']       = $save_dat['detail'];
            $save['point']        = $save_dat['point'];
            $save['save_time']    = $save_dat['save_time'];
            if ($save_dat['auto_mode'] != '0') $save['auto_mode'] = "Y"; else $save['auto_mode'] = "N";
            array_push($save_array, $save);
        }
        $ret_assoc['save']    = $save_array;
    }

    $ret_JSON = json_encode($ret_assoc,  
                JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    return $ret_JSON;
}

function new_maze(): void {
    global $gv;
    for ($i = 0; $i < GlobalVar::Max_of_Maze_Floor; $i++) {
        $gv->maze->create_maze($i);
    }
    for ($i = 0; $i < GlobalVar::Max_of_Maze_Floor - 1; $i++) {
        $gv->maze->create_stair($i);
    }
}

function new_team(): void {
    global $gv;
    $x = 2 * random_int(0, (($gv->maze->get_size_x() - 1) / 2) - 1) + 1;
    $y = 2 * random_int(0, (($gv->maze->get_size_y() - 1) / 2) - 1) + 1;
    $z = 0;  //    $z = 1 * random_int(0,  ($gv->maze->get_size_z() - 1));
    $d = random_int(0, Direct::MAX);

    $heroes = [];
    for ($i = 0; $i <= 3; $i++) {
        array_push($heroes, new Hero());
    }
    $gv->team->set_prp(['x' => $x, 'y' => $y, 'z' => $z, 'd' => $d, 'Heroes' => $heroes]);
}

function do_load(int $save_id): bool {
    global $gv, $ga;
    $db_mai = $gv->db_mai;

    tr_begin($db_mai);

    $result = get_save($db_mai, $save_id);
    if (is_null($result) || !is_array($result)) {
        $gv->mes->set_err_message('No Save Data Exist.');
        tr_rollback($db_mai);
        return false;
    }
    if (array_key_exists('is_active', $result) && $result['is_active'] == 0) {
        $gv->mes->set_err_message('The Active Save Data Is Not Exist.');
        tr_rollback($db_mai);
        return false;
    }
    if (array_key_exists('is_delete', $result) && $result['is_delete'] != 0) {
        $gv->mes->set_err_message('This Save Data Has Been Deleted.');
        tr_rollback($db_mai);
        return false;
    }
    if (array_key_exists('id', $result) && is_numeric($result['id'])) {
        $ga->save_id = intval($result['id']);
    }
    if (array_key_exists('title', $result)) {
        $ga->save_title  = $result['title'];
    }
    if (array_key_exists('detail', $result)) {
        $ga->save_detail = $result['detail'];
    }
    if (array_key_exists('point',  $result)) {
        $ga->save_point  = $result['point'];
    }
    if (array_key_exists('save_time',  $result)) {
        $ga->save_time   = $result['save_time'];
    }

    $maze_assoc = get_maze($db_mai, $save_id);    
    if (is_null($maze_assoc) || !is_array($maze_assoc)) {
        $gv->mes->set_err_message('The Read Save Data of Maze Failed.');
        tr_rollback($db_mai);
        return false;
    }
    if (!set_maze($maze_assoc)) {
        $gv->mes->set_err_message('Can not set The Save Data of Maze.');
        tr_rollback($db_mai);
        return false;
    }

    $heroes_array = get_heroes($db_mai, $save_id);    
    if (is_null($heroes_array) || !is_array($heroes_array)) {
        $gv->mes->set_err_message('The Read Save Data of Heroes Failed.');
        tr_rollback($db_mai);
        return false;
    }

    $team_assoc = get_team($db_mai, $save_id);    
    if (is_null($team_assoc) || !is_array($team_assoc)) {
        $gv->mes->set_err_message('The Read Save Data of Team Failed.');
        tr_rollback($db_mai);
        return false;
    }
    if (!set_team($team_assoc)) {
        $gv->mes->set_err_message('Can not set The Save Data of Team.');
        tr_rollback($db_mai);
        return false;
    }

    if (!set_heroes($heroes_array)) {
        $gv->mes->set_err_message('Can not set The Save Data of Heroes.');
        tr_rollback($db_mai);
        return false;
    }

    return tr_commit($db_mai);
}

function get_save_info(PDO $db_mai, int $player_id): array | null {
    global $gv;
    $get_save_SQL =<<<GET_SAVE_INFO01
        SELECT id, title, detail, point, auto_mode, save_time FROM tbl_save
        WHERE  player_id = :player_id 
        ORDER BY title COLLATE utf8mb4_unicode_ci ASC
GET_SAVE_INFO01;
    try {
        $get_save_stmt = $db_mai->prepare($get_save_SQL);
        $get_save_stmt->bindValue(':player_id', $player_id);
        $get_save_stmt->execute();
        $resultRecordSet = $get_save_stmt->fetchAll();
    } catch (PDOException $e) {
        pdo_error1($e, "SQLエラー 50: {$get_save_SQL}");
        return null;
    } catch (Throwable $ee) {
        pdo_error2($ee, "SQLの致命的エラー 51: {$get_save_SQL}");
        return null;
    } 

    return $resultRecordSet;
}

function get_save(PDO $db_mai, int $save_id): array | null {
    global $gv;
    $get_save_SQL =<<<GET_SAVE01
        SELECT id, title, detail, point, auto_mode, is_active, is_delete, save_time FROM tbl_save
        WHERE  id = :save_id
GET_SAVE01;
    try {
        $get_save_stmt = $db_mai->prepare($get_save_SQL);
        $get_save_stmt->bindValue(':save_id', $save_id);
        $get_save_stmt->execute();
        $resultRecordSet = $get_save_stmt->fetchAll();
    } catch (PDOException $e) {
        pdo_error1($e, "SQLエラー 30: {$get_save_SQL}");
        return null;
    } catch (Throwable $ee) {
        pdo_error2($ee, "SQLの致命的エラー 31: {$get_save_SQL}");
        return null;
    } 

    if (count($resultRecordSet) < 1) {
        $gv->mes->set_err_message("データが有りません 32: {$get_save_SQL}");
        return null;
    }
    return $resultRecordSet[0];
}

function get_maze(PDO $db_mai, int $save_id): array | null {
    global $gv;
    $get_maze_SQL =<<<GET_MAZE01
        SELECT 	id, save_id, title, size_x, size_y, size_z, maps, mask FROM tbl_maze
        WHERE   save_id = :save_id
GET_MAZE01;
    try {
        $get_maze_stmt = $db_mai->prepare($get_maze_SQL);
        $get_maze_stmt->bindValue(':save_id',  $save_id);
        $get_maze_stmt->execute();
        $resultRecordSet = $get_maze_stmt->fetchAll();
    } catch (PDOException $e) {
        pdo_error1($e, "SQLエラー 33: {$get_maze_SQL}");
        return null;
    } catch (Throwable $ee) {
        pdo_error2($ee, "SQLの致命的エラー 35: {$get_maze_SQL}");
        return null;
    } 

    if (count($resultRecordSet) < 1) {
        $gv->mes->set_err_message("データが有りません 36: {$get_maze_SQL}");
        return null;
    }
    return $resultRecordSet[0];
}

function get_team(PDO $db_mai, int $save_id): array | null {
    $get_team_SQL =<<<GET_TEAM01
        SELECT 	id, save_id, name, pos_x, pos_y, pos_z, pos_d FROM tbl_team
        WHERE   save_id = :save_id
GET_TEAM01;
    try {
        $get_team_stmt = $db_mai->prepare($get_team_SQL);
        $get_team_stmt->bindValue(':save_id',  $save_id);
        $get_team_stmt->execute();
        $resultRecordSet = $get_team_stmt->fetchAll();
    } catch (PDOException $e) {
        pdo_error1($e, "SQLエラー 37: {$get_team_SQL}");
        return null;
    } catch (Throwable $ee) {
        pdo_error2($ee, "SQLの致命的エラー 38: {$get_team_SQL}");
        return null;
    } 

    if (count($resultRecordSet) < 1) {
        $gv->mes->set_err_message("データが有りません 39: {$get_team_SQL}");
        return null;
    }
    return $resultRecordSet[0];
}

function get_heroes(PDO $db_mai, int $save_id): array | null {
    $get_heroes_SQL =<<<GET_HEROES01
        SELECT 	id, save_id, team_id, name, is_hero, is_alive FROM tbl_hero
        WHERE   save_id = :save_id
GET_HEROES01;
    try {
        $get_heroes_stmt = $db_mai->prepare($get_heroes_SQL);
        $get_heroes_stmt->bindValue(':save_id',  $save_id);
        $get_heroes_stmt->execute();
        $resultRecordSet = $get_heroes_stmt->fetchAll();
    } catch (PDOException $e) {
        pdo_error1($e, "SQLエラー 37: {$get_heroes_SQL}");
        return null;
    } catch (Throwable $ee) {
        pdo_error2($ee, "SQLの致命的エラー 38: {$get_heroes_SQL}");
        return null;
    } 

    if (count($resultRecordSet) < 1) {
        $gv->mes->set_err_message("データが有りません 39: {$get_heroes_SQL}");
        return null;
    }
    return $resultRecordSet;
}

function set_maze(array $maze_assoc): bool {
    global $gv;

    if (is_null($maze_assoc) || !is_array($maze_assoc)) return false;
    $a = [];

    if (array_key_exists('id', $maze_assoc) && is_numeric($maze_assoc['id'])) 
        $a['maze_id'] = intval($maze_assoc['id']);
    else return false;

    if (array_key_exists('save_id', $maze_assoc) && is_numeric($maze_assoc['save_id'])) 
    $a['save_id'] = intval($maze_assoc['save_id']);
    else return false;

    if (array_key_exists('title', $maze_assoc) && $maze_assoc['title'] != '') 
        $a['title']   = $maze_assoc['title'];
    else return false;

    if (array_key_exists('size_x', $maze_assoc) && is_numeric($maze_assoc['size_x'])) 
        $a['size_x']  = intval($maze_assoc['size_x']);
    else return false;

    if (array_key_exists('size_y', $maze_assoc) && is_numeric($maze_assoc['size_y'])) 
        $a['size_y']  = intval($maze_assoc['size_y']);
    else return false;

    if (array_key_exists('size_z', $maze_assoc) && is_numeric($maze_assoc['size_z'])) 
        $a['size_z']  = intval($maze_assoc['size_z']);
    else return false;

    if (array_key_exists('maps', $maze_assoc) && $maze_assoc['maps'] != '') 
        $a['maze']    = $maze_assoc['maps'];
    else return false;

    if (array_key_exists('mask', $maze_assoc) && $maze_assoc['mask'] != '') 
        $a['mask']    = $maze_assoc['mask'];
    else return false;

    $gv->maze->decode($a);
    return true;
}

function set_team(array $team_assoc): bool {
    global $gv;

    if (is_null($team_assoc) || !is_array($team_assoc)) return false;
    $a = [];

    if (array_key_exists('id', $team_assoc) && is_numeric($team_assoc['id'])) 
        $a['id']        = intval($team_assoc['id']);
    else return false;

    if (array_key_exists('save_id', $team_assoc) && is_numeric($team_assoc['save_id'])) 
        $a['save_id']        = intval($team_assoc['save_id']);
    else return false;

    if (array_key_exists('name', $team_assoc) && $team_assoc['name'] != '') 
        $a['name']      = $team_assoc['name'];
    else return false;

    if (array_key_exists('pos_x', $team_assoc) && is_numeric($team_assoc['pos_x']) 
     && array_key_exists('pos_y', $team_assoc) && is_numeric($team_assoc['pos_y']) 
     && array_key_exists('pos_z', $team_assoc) && is_numeric($team_assoc['pos_z'])) 
    {
        $p = [];
        $p['x'] = $team_assoc['pos_x'];
        $p['y'] = $team_assoc['pos_y'];
        $p['z'] = $team_assoc['pos_z'];
        $a['point'] = $p;
    }
    else return false;


    if (array_key_exists('pos_d', $team_assoc) && is_numeric($team_assoc['pos_d'])) {
        $d = [];
        $d['d'] = $team_assoc['pos_d'];
        $a['direct'] = $d;
    } 
    else return false;

    $gv->team->decode($a);
    return true;
}

function set_heroes(array $heroes_array): bool {
    global $gv;

    $aa = [];
    if (is_null($heroes_array) || !is_array($heroes_array)) return false;
    foreach($heroes_array as $hero_assoc) {
        $a = [];

        if (array_key_exists('id', $hero_assoc) && is_numeric($hero_assoc['id'])) 
            $a['id']        = intval($hero_assoc['id']);
        else return false;

        if (array_key_exists('save_id', $hero_assoc) && is_numeric($hero_assoc['save_id'])) 
            $a['save_id']        = intval($hero_assoc['save_id']);
        else return false;

        if (array_key_exists('team_id', $hero_assoc) && is_numeric($hero_assoc['team_id'])) 
            $a['team_id']        = intval($hero_assoc['team_id']);
        else return false;

        if (array_key_exists('name', $hero_assoc) && $hero_assoc['name'] != '') 
            $a['name']           = $hero_assoc['name'];
        else return false;

        if (array_key_exists('is_hero', $hero_assoc) && is_numeric($hero_assoc['is_hero'])) 
            if (intval($hero_assoc['is_hero']) != 0) $a['is_hero'] = true; else $a['is_hero'] = false;
        else return false;

        if (array_key_exists('is_alive', $hero_assoc) && is_numeric($hero_assoc['is_alive'])) 
            if (intval($hero_assoc['is_alive']) != 0) $a['is_alive'] = true; else $a['is_alive'] = false;
        else return false;

        array_push($aa, $a);
    }
    $gv->team->decode(['heroes' => $aa]);
    return true;
}


function do_save(int $player_id, int $save_id, string $title, bool $is_instant): bool {
    global $gv;
    $db_mai = $gv->db_mai;

    tr_begin($db_mai);

    $result = del_hero($db_mai, $save_id);
    if ($result === false) {
        tr_rollback($db_mai);
        return false;
    }

    $result = del_team($db_mai, $save_id);
    if ($result === false) {
        tr_rollback($db_mai);
        return false;
    }

    $result = del_maze($db_mai, $save_id);
    if ($result === false) {
        tr_rollback($db_mai);
        return false;
    }

    $result = del_save($db_mai, $save_id);
    if ($result === false) {
        tr_rollback($db_mai);
        return false;
    }

    $result = add_save($db_mai, $player_id, $save_id, $title, $is_instant);
    if ($result === false) {
        tr_rollback($db_mai);
        return false;
    } 

    $result = add_maze($db_mai, $save_id);
    if ($result === false) {
        tr_rollback($db_mai);
        return false;
    }

    $team_id = add_team($db_mai, $save_id);
    if ($team_id  === false) {
        tr_rollback($db_mai);
        return false;
    }

    $result = add_hero($db_mai, $save_id, $team_id);
    if ($result  === false) {
        tr_rollback($db_mai);
        return false;
    }

    return tr_commit($db_mai);
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

            $this->maze        = new Maze([
                'fill_kind'    => MzKind::Empty,
                'size_x'       => GlobalVar::Maze_size_x,
                'size_y'       => GlobalVar::Maze_size_y,
                'size_z'       => GlobalVar::Max_of_Maze_Floor, 
                'limit_room'   => GlobalVar::Limit_of_room,
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
        public int    $save_id     = -1;
        public string $save_title  = ''; 
        public string $save_detail = ''; 
        public string $save_point  = ''; 
        public string $save_time   = ''; 

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
    try {
        $db_mai->beginTransaction();
    } catch (PDOException $e) {
        pdo_error1($e, "トランザクションの開始失敗");
        return false;
    } catch (Throwable $ee) {
        pdo_error2($ee, "トランザクション開始の致命的失敗");
        return false;
    } 
    return true;
}

function tr_commit(PDO $db_mai): bool {
    try {
        $db_mai->commit();
    } catch (PDOException $e) {
        pdo_error1($e, "トランザクションのコミット失敗");
        return false;
    } catch (Throwable $ee) {
        pdo_error2($ee, "トランザクション・コミットの致命的失敗");
        return false;
    } 
    return true;
}

function tr_rollback(PDO $db_mai): bool {
    try {
        $db_mai->rollback();
    } catch (PDOException $e) {
        pdo_error1($e, "トランザクションのロールバック失敗");
        return false;
    } catch (Throwable $ee) {
        pdo_error2($ee, "トランザクション・ロールバックの致命的失敗");
        return false;
    } 
    return true;
}

function get_save_id(PDO $db_mai, int $player_id, string $title): int | false {
    global $gv;
    $seek_save_SQL =<<<SEEK_SAVE01
        SELECT id FROM tbl_save
        WHERE  player_id = :player_id AND title = :title
SEEK_SAVE01;
    try {
        $seek_save_stmt = $db_mai->prepare($seek_save_SQL);
        $seek_save_stmt->bindValue(':player_id', $player_id);
        $seek_save_stmt->bindValue(':title',     $title);
        $seek_save_stmt->execute();
        $resultRecordSet = $seek_save_stmt->fetchAll();
    } catch (PDOException $e) {
        pdo_error1($e, "SQLエラー 20: {$seek_save_SQL}");
        return false;
    } catch (Throwable $ee) {
        pdo_error2($ee, "SQLの致命的エラー 21: {$seek_save_SQL}");
        return false;
    } 
    if (count($resultRecordSet) < 1) {
//        $gv->mes->set_err_message("プレイヤーID({$player_id})のセーブデータでタイトル『{$title}』が見つかりませんでした");
        return false;
    }
    return intval($resultRecordSet[0]['id']);
}

function new_save(PDO $db_mai, int $player_id, string $title, bool $is_instant): array {
    global $ga;

    if ($is_instant) $is_instant_int = 1; else $is_instant_int = 0;

    $insert_save_SQL =<<<NEW_SAVE01
        INSERT INTO tbl_save (player_id, title, detail, point, auto_mode, is_active, is_delete)
        VALUES ( :player_id, :title, :detail, :point, :auto_mode, true, false)
NEW_SAVE01;
    try {
        $insert_save_stmt = $db_mai->prepare($insert_save_SQL);
        $insert_save_stmt->bindValue(':player_id', $player_id);
        $insert_save_stmt->bindValue(':title',     $title);
        $insert_save_stmt->bindValue(':detail',    $ga->save_detail);
        $insert_save_stmt->bindValue(':point',     $ga->save_point);
        $insert_save_stmt->bindValue(':auto_mode', $is_instant_int);
        $insert_save_stmt->execute();
    } catch (PDOException $e) {
        pdo_error1($e, "SQLエラー 0: {$insert_save_SQL}");
        return [false, null];
    } catch (Throwable $ee) {
        pdo_error2($ee, "SQLの致命的エラー 00: {$insert_save_SQL}");
        return [false, null];
    } 
    return [true, intval($db_mai->lastInsertId())];
}

function add_save(PDO $db_mai, int $player_id, int $save_id, string $title, bool $is_instant): int | bool {
    global $ga;

    if ($is_instant) $is_instant_int = 1; else $is_instant_int = 0;
    
    $insert_save_SQL =<<<INSERT_SAVE01
        INSERT INTO tbl_save (id, player_id, title, detail, point, auto_mode, is_active, is_delete)
        VALUES ( :id, :player_id, :title, :detail, :point, :auto_mode, true, false)
INSERT_SAVE01;
    try {
        $insert_save_stmt = $db_mai->prepare($insert_save_SQL);
        $insert_save_stmt->bindValue(':id',        $save_id);
        $insert_save_stmt->bindValue(':player_id', $player_id);
        $insert_save_stmt->bindValue(':title',     $title);
        $insert_save_stmt->bindValue(':detail',    $ga->save_detail);
        $insert_save_stmt->bindValue(':point',     $ga->save_point);
        $insert_save_stmt->bindValue(':auto_mode', $is_instant_int);
        $insert_save_stmt->execute();
    } catch (PDOException $e) {
        pdo_error1($e, "SQLエラー 1: {$insert_save_SQL}");
        return false;
    } catch (Throwable $ee) {
        pdo_error2($ee, "SQLの致命的エラー 2: {$insert_save_SQL}");
        return false;
    } 
//    return intval($db_mai->lastInsertId());
    return true;
}

function add_maze(PDO $db_mai, int $save_id): int | bool {
    global $gv;
    $a = $gv->maze->encode();

    $insert_maze_SQL =<<<INSERT_MAZE01
        INSERT INTO tbl_maze (save_id, title, size_x, size_y, size_z, maps, mask)
        VALUES ( :save_id , :title , :size_x , :size_y , :size_z , :maps , :mask )
INSERT_MAZE01;
    try {
        $insert_maze_stmt = $db_mai->prepare($insert_maze_SQL);
        $insert_maze_stmt->bindValue(':save_id', $save_id); 
        $insert_maze_stmt->bindValue(':title',   $a['title']); 
        $insert_maze_stmt->bindValue(':size_x',  $a['size_x']); 
        $insert_maze_stmt->bindValue(':size_y',  $a['size_y']); 
        $insert_maze_stmt->bindValue(':size_z',  $a['size_z']); 
        $insert_maze_stmt->bindValue(':maps',    $a['maze']); 
        $insert_maze_stmt->bindValue(':mask',    $a['mask']); 
        $insert_maze_stmt->execute();
    } catch (PDOException $e) {
        pdo_error1($e, "SQLエラー 3: {$insert_maze_SQL}");
        return false;
    } catch (Throwable $ee) {
        pdo_error2($ee, "SQLの致命的エラー 5: {$insert_maze_SQL}");
        return false;
    } 
//    return intval($db_mai->lastInsertId());
    return true;
}

function add_team(PDO $db_mai, int $save_id): int | bool {
    global $gv;
    $a = $gv->team->encode();

    $insert_team_SQL =<<<INSERT_TEAM01
        INSERT INTO tbl_team (save_id, name, pos_x, pos_y, pos_z, pos_d)
        VALUES ( :save_id , :name , :pos_x , :pos_y , :pos_z , :pos_d )
INSERT_TEAM01;
    try {
        $insert_team_stmt = $db_mai->prepare($insert_team_SQL);
        $insert_team_stmt->bindValue(':save_id', $save_id);  
        $insert_team_stmt->bindValue(':name',    $a['name']); 
        $insert_team_stmt->bindValue(':pos_x',   $a['point']['x']); 
        $insert_team_stmt->bindValue(':pos_y',   $a['point']['y']); 
        $insert_team_stmt->bindValue(':pos_z',   $a['point']['z']); 
        $insert_team_stmt->bindValue(':pos_d',   $a['direct']['d']); 
        $insert_team_stmt->execute();
    } catch (PDOException $e) {
        pdo_error1($e, "SQLエラー 6: {$insert_team_SQL}");
        return false;
    } catch (Throwable $ee) {
        pdo_error2($ee, "SQLの致命的エラー 7: {$insert_team_SQL}");
        return false;
    } 
    return intval($db_mai->lastInsertId());
//    return true;
}

function add_hero(PDO $db_mai, int $save_id, int $team_id): int | bool {
    global $gv;

    $insert_hero_SQL =<<<INSERT_HERO01
        INSERT INTO tbl_hero (save_id, team_id, name, is_hero, is_alive)
        VALUES ( :save_id , :team_id , :name , :is_hero , :is_alive )
INSERT_HERO01;
    try {
        $insert_hero_stmt = $db_mai->prepare($insert_hero_SQL);
        $heroes = ($gv->team->encode())['heroes'];
        foreach ($heroes as $hero) {
            $insert_hero_stmt->bindValue(':save_id',   $save_id); 
            $insert_hero_stmt->bindValue(':team_id',   $team_id); 
            $insert_hero_stmt->bindValue(':name',      $hero['name']);
            $insert_hero_stmt->bindValue(':is_hero',   true);
            $insert_hero_stmt->bindValue(':is_alive',  true);
            $insert_hero_stmt->execute();
        }
    } catch (PDOException $e) {
        pdo_error1($e, "SQLエラー 8: {$insert_hero_SQL}");
        return false;
    } catch (Throwable $ee) {
        pdo_error2($ee, "SQLの致命的エラー 9: {$insert_hero_SQL}");
        return false;
    } 
//    return intval($db_mai->lastInsertId());
    return true;
}

function del_save(PDO $db_mai, int $save_id): bool {
    global $ga;

    $delete_save_SQL =<<<DELETE_SAVE01
        DELETE FROM tbl_save 
        WHERE  id = :save_id
DELETE_SAVE01;
    try {
        $delete_save_stmt = $db_mai->prepare($delete_save_SQL);
        $delete_save_stmt->bindValue(':save_id', $save_id);
        $delete_save_stmt->execute();
    } catch (PDOException $e) {
        pdo_error1($e, "SQLエラー 10: {$delete_save_SQL}");
        return false;
    } catch (Throwable $ee) {
        pdo_error2($ee, "SQLの致命的エラー 11: {$delete_save_SQL}");
        return false;
    } 
    return true;
}

function del_maze(PDO $db_mai, int $save_id): bool {
    global $ga;

    $delete_maze_SQL =<<<DELETE_MAZE01
        DELETE FROM tbl_maze 
        WHERE  save_id = :save_id
DELETE_MAZE01;
    try {
        $delete_maze_stmt = $db_mai->prepare($delete_maze_SQL);
        $delete_maze_stmt->bindValue(':save_id', $save_id);
        $delete_maze_stmt->execute();
    } catch (PDOException $e) {
        pdo_error1($e, "SQLエラー 12: {$delete_maze_SQL}");
        return false;
    } catch (Throwable $ee) {
        pdo_error2($ee, "SQLの致命的エラー 13: {$delete_maze_SQL}");
        return false;
    } 
    return true;
}

function del_team(PDO $db_mai, int $save_id): bool {
    global $ga;

    $delete_team_SQL =<<<DELETE_TEAM01
        DELETE FROM tbl_team 
        WHERE  save_id = :save_id
DELETE_TEAM01;
    try {
        $delete_team_stmt = $db_mai->prepare($delete_team_SQL);
        $delete_team_stmt->bindValue(':save_id', $save_id);
        $delete_team_stmt->execute();
    } catch (PDOException $e) {
        pdo_error1($e, "SQLエラー 15: {$delete_team_SQL}");
        return false;
    } catch (Throwable $ee) {
        pdo_error2($ee, "SQLの致命的エラー 16: {$delete_team_SQL}");
        return false;
    } 
    return true;
}

function del_hero(PDO $db_mai, int $save_id): bool {
    global $ga;

    $delete_hero_SQL =<<<DELETE_HERO01
        DELETE FROM tbl_hero 
        WHERE  save_id = :save_id
DELETE_HERO01;
    try {
        $delete_hero_stmt = $db_mai->prepare($delete_hero_SQL);
        $delete_hero_stmt->bindValue(':save_id', $save_id);
        $delete_hero_stmt->execute();
    } catch (PDOException $e) {
        pdo_error1($e, "SQLエラー 17: {$delete_hero_SQL}");
        return false;
    } catch (Throwable $ee) {
        pdo_error2($ee, "SQLの致命的エラー 18: {$delete_hero_SQL}");
        return false;
    } 
    return true;
}





    function pdo_error1(PDOException $e, string $errmsg): void {
        global $gv;
        $gv->mes->set_err_message($errmsg);
        $gv->mes->set_err_message("code: {$e->getCode()}");
        $gv->mes->set_err_message("message: {$e->getMessage()}");
        return;
    }

    function pdo_error2(Throwable $e, string $errmsg): void {
        global $gv;
        $gv->mes->set_err_message($errmsg);
        $gv->mes->set_err_message("code: {$e->getCode()}");
        $gv->mes->set_err_message("message: {$e->getMessage()}");
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

