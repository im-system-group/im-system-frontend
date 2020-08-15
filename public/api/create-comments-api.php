<?php

include("./utils/shared.php");
check_is_logged();
allow_request_methods(["POST"]);
validate_field_names_in_data($_GET, ["id"]);
validate_field_names_in_data($_POST, ["content"]);

/** @var string 使用者名稱 */
$account = $_SESSION["login"];

/** @var string 留言ID */
$article_id = $_GET["id"];

/** @var string 留言內容 */
$content = preg_replace("/\n/", "<br>", preg_replace("/\r/", "", htmlspecialchars($_POST["content"])));

/** @var bool 內容是否沒輸入 */
$is_content_not_inputted = $content == "";

if ($is_content_not_inputted) {
    http_response_code(400);
    respond_json(["message" => "未完整輸入"]);
}

/** @var PDOStatement 留言計數查詢敘述 */
$comment_search_statement = $mysql_conn->prepare("SELECT COUNT(*) FROM comments WHERE post_id = ?");
$comment_search_statement->execute([$article_id]);

/** @var int 留言ID */
$comment_id = $comment_search_statement->fetchColumn() + 1;

/** @var PDOStatement 留言新增敘述 */
$comment_insert_statement = $mysql_conn->prepare(
    "INSERT INTO comments (post_id, id, text, commenter) VALUES (?, ?, ?, ?)"
);

$comment_insert_statement->execute([$article_id, $comment_id, $content, $account]);

http_response_code(201);
respond_json(["message" => "文章已創立"]);
