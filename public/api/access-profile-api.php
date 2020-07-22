<?php

include("./utils/shared.php");
check_is_logged();
allow_request_methods(["GET"]);

/** @var string 使用者帳號 */
$account = $_SESSION["login"];

/** @var PDOStatement 使用者查詢敘述 */
$member_search_statement = $mysql_conn->prepare(
    "SELECT
        member.name,
        member.email,
        member.account,
        member.photo AS avatarUrl,
        IFNULL(special_color.color, '#fff') AS color
    FROM member
    LEFT JOIN special_color
    ON special_color.account = member.account
    WHERE member.account = :member_account"
);

$member_search_statement->bindValue(':member_account', $account, PDO::PARAM_STR);
$member_search_statement->execute();

/** @var array 使用者 */
$member = $member_search_statement->fetch(PDO::FETCH_ASSOC);

respond_json(["result" => $member]);
