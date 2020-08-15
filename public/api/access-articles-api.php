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
        article.like_num AS likes_count,
        member.name AS poster_name,
        member.photo AS poster_avator_url,
        IFNULL(special_color.color, '#fff') AS poster_avator_border_color
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
