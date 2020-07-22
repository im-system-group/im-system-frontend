<?php

include("./utils/shared.php");
allow_request_methods(["GET"]);
validate_field_names_in_data($_GET, ["page"]);
session_start();

/** @var int 文章分頁 */
$articles_page = ($_GET["page"] - 1);

/** @var PDOStatement 文章列表查詢敘述 */
$articles_search_statement = $mysql_conn->prepare(
    "SELECT
        article.ID AS id,
        article.title,
        article.like_num AS likesCount,
        member.name AS posterName,
        member.photo AS posterAvatarUrl,
        IFNULL(special_color.color, '#fff') AS posterAvatarBorderColor
    FROM article
    LEFT JOIN member
    ON member.account = article.poster
    LEFT JOIN special_color
    ON special_color.account = member.account
    ORDER BY article.ID DESC
    LIMIT 10 OFFSET :articles_start_index"
);

$articles_search_statement->bindValue(':articles_start_index', $articles_page * 10, PDO::PARAM_INT);
$articles_search_statement->execute();

/** @var array 文章 */
$articles = $articles_search_statement->fetchAll(PDO::FETCH_ASSOC);
http_response_code(200);
respond_json(["results" => $articles]);
