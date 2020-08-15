<?php

include("./utils/shared.php");
check_is_logged();
allow_request_methods(["POST"]);
validate_field_names_in_data($_POST, ["title", "content"]);

/** @var string 使用者名稱 */
$account = $_SESSION["login"];

/** @var string 文章標題 */
$title = htmlspecialchars($_POST["title"]);

/** @var string 文章內文 */
$content = preg_replace("/\n/", "<br>", preg_replace("/\r/", "", htmlspecialchars($_POST["content"])));

/** @var int 預設按讚次數 */
$likes_count = 0;

/** @var bool 標題是否沒輸入 */
$is_title_not_inputted = $title == "";

if ($is_title_not_inputted) {
    http_response_code(400);
    respond_json(["message" => "未完整輸入"]);
}

$image_file_path = "";

if (isset($_FILES["file"])) {
    include_once './utils/upload.php';

    /** @var mixed 檔案資訊 */
    $file_info = $_FILES["file"];

    /** @var array 上傳資訊 */
    $upload_info = uploadImageFile($file_info, "../postupload");

    /** @var array 上傳是否失敗 */
    $is_upload_failed = isset($upload_info["message"]);

    if ($is_upload_failed) {
        http_response_code(400);
        respond_json($upload_info);
    }

    $image_file_path = $upload_info["result"];
}

$article_insert_statement = $mysql_conn->prepare(
    "INSERT INTO article (poster, title, text, like_num, photo) VALUES (?, ?, ?, ?, ?)"
);

$article_insert_statement->execute([$account, $title, $content, $likes_count, $image_file_path]);

http_response_code(201);
exit(json_encode(["message" => "文章已創立"]));
