<?php

include("./utils/shared.php");
check_is_logged();
allow_request_methods(["POST"]);
validate_field_names_in_data($_GET, ["id"]);

/** @var string 使用者名稱 */
$_SESSION["login"];

/** @var string 文章ID */
$article_id = $_GET["id"];

/** @var PDOStatement 文章讚數 */
$like_search_statement = $mysql_conn->prepare(
	"SELECT *
	FROM like_num
	WHERE account = ? AND post_id = ?"
);

$like_search_statement->execute([$account, $article_id]);
$like = $like_search_statement->fetch(PDO::FETCH_ASSOC);

/** @var bool 是否有按過讚 */
$is_like_exist = $like;

/** @var bool 是否按讚 */
$is_liked = false;

if ($is_like_exist) {
	$is_liked = $like["flag"] == 1;

	/** @var PDOStatement 按讚更新敘述 */
	$like_update_statement = $mysql_conn->prepare(
		"UPDATE like_num
		SET flag = ?
		WHERE post_id = ? AND account = ?"
	);

	$like_update_statement->execute([
		$is_liked ? 2 : 1,
		$article_id,
		$account
	]);
}
else {
	$is_liked = true;

	/** @var PDOStatement 按讚新增敘述 */
	$like_insert_statement = $mysql_conn->prepare(
		"INSERT INTO like_num (flag, post_id, account)
		VALUES (? , ? , ?)"
	);

	$like_insert_statement->execute([
		1,
		$article_id,
		$account
	]);
}

/** @var PDOStatement 文章更新敘述 */
$article_update_statement = $mysql_conn->prepare(
	"UPDATE article
	SET like_num = (SELECT article.like_num WHERE article.ID = ?) + ?
	WHERE article.ID = ?"
);

$article_update_statement->execute([
	$article_id,
	$is_liked ? -1 : 1,
	$article_id
]);

respond_json(["message" => $is_liked ? "已取消like" : "已like"]);
