<?php

include("./utils/shared.php");
allow_request_methods(["GET"]);
validate_field_names_in_data($_GET, ["id"]);

/** @var string 文章ID */
$article_id = $_GET["id"];

/** @var PDOStatement 文章查詢敘述 */
$article_search_statement = $mysql_conn->prepare(
    "SELECT
        article.ID AS id,
        article.title,
        article.text AS content,
        article.like_num AS likesCount,
        IF(article.post_time = '0000-00-00 00:00:00', '未知', article.post_time) AS createTime,
        member.name AS posterName,
        member.photo AS posterAvatarUrl,
        IFNULL(special_color.color, '#fff') AS posterColor
    FROM article
    LEFT JOIN member
    ON member.account = article.poster
    LEFT JOIN special_color
    ON special_color.account = member.account
    WHERE article.ID = :article_id"
);

$article_search_statement->bindValue(':article_id', $article_id, PDO::PARAM_INT);
$article_search_statement->execute();

/** @var array 文章 */
$article = $article_search_statement->fetch(PDO::FETCH_ASSOC);
http_response_code(200);
respond_json(["result" => $article]);
