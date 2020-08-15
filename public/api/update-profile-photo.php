<?php

include("./utils/shared.php");
check_is_logged();
allow_request_methods(["POST"]);
validate_field_names_in_data($_FILES, ["file"]);

/** @var string 使用者帳號 */
$account = $_SESSION["login"];

include("./utils/upload.php");

/** @var mixed 檔案資訊 */
$file_info = $_FILES["file"];

/** @var array 上傳資訊 */
$upload_info = uploadImageFile($file_info, "../upload");

/** @var array 上傳是否失敗 */
$is_upload_failed = isset($upload_info["message"]);

if ($is_upload_failed) {
    http_response_code(400);
    respond_json($upload_info);
}

$image_file_path = $upload_info["result"];

$member_update_statement = $mysql_conn->prepare(
    "UPDATE member
    SET photo = :member_avatar_url
    WHERE account = :member_account"
);

$member_update_statement->bindValue(":member_account", $account, PDO::PARAM_STR);
$member_update_statement->bindValue(":member_avatar_url", $image_file_path, PDO::PARAM_STR);
$member_update_statement->execute();

http_response_code(200);
exit(json_encode(["message" => "更新完成", "result" => $image_file_path]));
