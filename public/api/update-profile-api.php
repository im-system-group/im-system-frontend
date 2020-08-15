<?php

include("./utils/shared.php");
check_is_logged();
allow_request_methods(["POST"]);
validate_field_names_in_data($_POST, ["name", "email"]);

/** @var string 使用者帳號 */
$account = $_SESSION["login"];

/** @var string 使用者暱稱 */
$name = htmlspecialchars($_POST["name"]);

/** @var string 使用者Email */
$email = htmlspecialchars($_POST["email"]);

/** @var PDOStatement 暱稱與Email更改敘述 */
$member_update_statement = $mysql_conn->prepare(
    "UPDATE member
    SET name = :member_name, email = :member_email
    WHERE account= :member_account"
);

$member_update_statement->bindValue(':member_account', $account, PDO::PARAM_STR);
$member_update_statement->bindValue(':member_name', $name, PDO::PARAM_STR);
$member_update_statement->bindValue(':member_email', $email, PDO::PARAM_STR);
$member_update_statement->execute();

http_response_code(200);
exit(json_encode(["message" => "更新完成"]));
