<?php

include("./utils/shared.php");
allow_request_methods(["POST"]);
validate_field_names_in_data($_POST, ["account", "password", "name", "email"]);

/** @var string 使用者名稱 */
$account = htmlspecialchars($_POST["account"]);

/** @var string 使用者密碼 */
$password = password_hash(htmlspecialchars($_POST["password"]), PASSWORD_DEFAULT);

/** @var string 使用者暱稱 */
$name = htmlspecialchars($_POST["name"]);

/** @var string 使用者Email */
$email = htmlspecialchars($_POST["email"]);

/** @var string 使用者預設大頭貼 */
$picture  = "../image/def_picture.jpg";

/** @var PDOStatement 使用者查詢敘述 */
$member_search_statement = $mysql_conn->prepare(
    "SELECT COUNT(*) 
    FROM member 
    WHERE account = ?"
);
$member_search_statement ->execute([$account]);

/** @var bool 是否有該用戶 */
$is_member_exist = $member_search_statement->fetchColumn() >= 1;

if ($is_member_exist) {
    http_response_code(422);
    respond_json(["message" => "此帳號名稱已被註冊"]);
}

/** @var PDOStatement 使用者新增敘述 */
$member_insert_statement = $mysql_conn->prepare(
    "INSERT INTO member(account, password, name, email, photo) 
    VALUES (?, ?, ?, ?, ?)"
);

$member_insert_statement->execute([$account, $password, $name, $email, $picture]);

http_response_code(201);
respond_json(["message" => "註冊成功"]);
