<?php

include("./utils/shared.php");
check_is_logged();
allow_request_methods(["POST"]);
validate_field_names_in_data($_POST, ["password", "new_password"]);

/** @var string 使用者帳號 */
$account = $_SESSION["login"];

/** @var string 使用者輸入原密碼 */
$password = htmlspecialchars($_POST["password"]);

/** @var string 使用者輸入新密碼 */
$new_password = htmlspecialchars($_POST["new_password"]);

/** @var PDOStatement 密碼查詢敘述 */
$member_search_statement = $mysql_conn->prepare(
	"SELECT password FROM member WHERE account = :member_account"
);

$member_search_statement->bindValue(':member_account', $account, PDO::PARAM_STR);
$member_search_statement->execute();

/** @var string 查詢到的舊密碼(hashed) */
$hashed_password = $member_search_statement->fetchColumn();

/** @var bool 密碼是否符合 */
$is_password_matched = password_verify($password, $hashed_password);

if (!$is_password_matched) {
	http_response_code(422);
	respond_json(["message" => "密碼錯誤"]);
}

/** @var string hash過的密碼 */
$hashed_new_password = password_hash($new_password, PASSWORD_DEFAULT);

/** @var PDOStatement 密碼更新敘述 */
$member_update_statement = $mysql_conn->prepare(
	"UPDATE member
	SET password = :member_password
	WHERE account = :member_account"
);

$member_update_statement->bindValue(':member_account', $account, PDO::PARAM_STR);
$member_update_statement->bindValue(':member_password', $hashed_new_password, PDO::PARAM_STR);
$member_update_statement->execute();

http_response_code(200);
respond_json(["message" => "更新完成"]);
