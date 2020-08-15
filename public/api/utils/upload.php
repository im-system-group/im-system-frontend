<?php

/**
 * 上傳圖檔
 * @param string $file_info 檔案資訊
 * @param string $target_dir 目的資料夾路徑
 * @return array 上傳資訊
 */
function uploadImageFile($file_info, $target_dir) {
	/** @var bool 是否是檔案 */
	$is_not_file = $file_info === NULL || $file_info["error"] == 4;

	if ($is_not_file) {
		return ["message" => "沒有檔案"];
	}

	/** @var string 附檔名 */
	$ext = pathinfo($file_info['name'], PATHINFO_EXTENSION);

	/** @var string 上傳檔名 */
	$uni_name = md5(uniqid(microtime(true), true)) . '.' . $ext;

	/** @var string 檔案目標路徑 */
	$target_file_name = $target_dir . "/" . basename($uni_name);

	/** @var string 檔案類型 */
	$file_type = strtolower(pathinfo($target_file_name, PATHINFO_EXTENSION));

	/** @var bool 是否是圖檔 */
	$is_not_image_file =
		!in_array($file_type, ["jpg", "png", "jpeg", "gif"]);

	if ($is_not_image_file) {
		return ["message" => "此檔案不是圖片"];
	}

	/** @var bool 檔案是否過大 */
	$is_file_size_too_large = $file_info["size"] > 5000000;

	if ($is_file_size_too_large) {
		return ["message" => "檔案過大"];
	}

	/** @var bool 路徑是否衝突 */
	$is_pathname_confilct = file_exists($target_file_name);

	if ($is_pathname_confilct) {
		return ["message" => "檔名衝突"];
	}

	/** @var bool 檔案是否上傳 */
	$is_file_uploaded = move_uploaded_file($file_info["tmp_name"], $target_file_name);

	if (!$is_file_uploaded) {
		return ["message" => "檔案移動失敗"];
	}

	return ["result" => $target_file_name];
}