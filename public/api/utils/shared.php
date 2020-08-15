<?php

header("Content-Type: application/json; charset=utf8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(204);
    exit();
}

/** @var string mysql 主機 */
$mysql_conn_host = "localhost";

/** @var string mysql DB名稱 */
$mysql_conn_dbname = "im";

/** @var string mysql 帳號 */
$mysql_conn_account = "user";

/** @var string mysql 密碼 */
$mysql_conn_password = "@123456a970236";

/** @var PDO mysql 連線 */
$mysql_conn = new PDO(
    "mysql:host=$mysql_conn_hostname;dbname=$mysql_conn_dbname;charset=utf8",
    $mysql_conn_account,
    $mysql_conn_password
);

/**
 * 允許的HTTP請求方法，若非允許的方法將回應 405
 * @param array $method_names 請求方法名稱
 */
function allow_request_methods($method_names) {
    foreach ($method_names as $method_name) {
        /** @var bool 請求方法是否允許 */
        $is_request_method_allowed = $_SERVER["REQUEST_METHOD"] === $method_name;

        if ($is_request_method_allowed) {
            return;
        }
    }

    http_response_code(405);
    respond_json(["message" => "不允許的方法"]);
}

/**
 * 驗證欄位在資料中的名稱
 * @param array $data 資料
 * @param array $field_names 欄位名稱
 */
function validate_field_names_in_data($data, $field_names) {
    foreach ($field_names as $field_name) {
        /** @var bool 欄位名稱是否存在 */
        $is_field_name_exist = isset($data[$field_name]);

        if (!$is_field_name_exist) {
            http_response_code(400);
            respond_json(["message" => "缺少欄位: {$field_name}"]);
        }
    }
}

/**
 * 確認是否登入
 */
function check_is_logged() {
    session_start();

    /** @var bool 是否已經登入 */
    $is_logged = isset($_SESSION["login"]);

    if (!$is_logged) {
        http_response_code(401);
        respond_json(["message" => "尚未登入"]);
    }
}

/**
 * 回應JSON
 * @param mixed $data 資料
 */
function respond_json($data) {
    exit(json_encode($data, JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES));
}
