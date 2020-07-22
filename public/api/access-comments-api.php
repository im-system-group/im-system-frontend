<?php

include("./utils/shared.php");
allow_request_methods(["GET"]);
validate_field_names_in_data($_GET, ["id"]);

/** @var string 文章ID */
$article_id = $_GET["id"];

/** @var PDOStatement 文章留言查詢敘述 */
$article_comments_search_statement = $mysql_conn->prepare(
    "SELECT
        comments.id,
        comments.text AS content,
        member.name AS commenterName,
        member.photo AS commenterAvatar_url,
        IFNULL(special_color.color, '#fff') AS commenterAvatarBorderColor
    FROM comments
    LEFT JOIN member
    ON member.account = comments.commenter
    LEFT JOIN special_color
    ON special_color.account = member.account
    WHERE comments.post_id = :article_id
    ORDER BY comments.id ASC"
);

$article_comments_search_statement->bindValue(':article_id', $article_id, PDO::PARAM_INT);
$article_comments_search_statement->execute();

/** @var array 文章留言 */
$article_comments = $article_comments_search_statement->fetchAll(PDO::FETCH_ASSOC);

http_response_code(200);
respond_json(["results" => $article_comments]);
