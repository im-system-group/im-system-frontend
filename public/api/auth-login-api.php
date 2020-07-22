<?php

include("./utils/shared.php");
allow_request_methods(["POST"]);
validate_field_names_in_data($_POST, ["account", "password"]);
session_start();

/** @var string 使用者名稱 */
$account = htmlspecialchars($_POST["account"]);

/** @var string 使用者密碼 */
$password = htmlspecialchars($_POST["password"]);

/** @var PDOStatement 使用者查詢敘述 */
$member_search_statement = $mysql_conn->prepare(
    "SELECT
        member.name,
        member.email,
        member.account,
        member.photo AS avatarUrl,
        IFNULL(special_color.color, '#fff') AS color,
        member.password
    FROM member
    LEFT JOIN special_color
    ON special_color.account = member.account
    WHERE member.account = :member_account"
);

$member_search_statement->bindValue(':member_account', $account, PDO::PARAM_STR);
$member_search_statement->execute();

/** @var bool 使用者 */
$member = $member_search_statement->fetch(PDO::FETCH_ASSOC);

/** @var bool 密碼是否正確 */
$is_password_verified = password_verify($password, $member["password"]);

if ($is_password_verified) {
    $_SESSION["login"] = $account;
    http_response_code(200);
    respond_json(["message" => "登入成功", "result" => $member]);
}
else {
    http_response_code(401);
    exit(json_encode(["message" => "登入失敗"]));
}
