<?php 
session_start();

header("Content-Type: application/json; charset=utf8");
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization");

/** 請求的方法是否允許 */
$is_request_method_not_allowed = $_SERVER["REQUEST_METHOD"] !== "POST";

if ($is_request_method_not_allowed) {
    http_response_code(405);
    exit(json_encode(["message" => "不允許的方法"]));
}

include("../connect.php"); //連接資料庫


if(!isset($_SESSION["login"]))
{
    http_response_code(401);
    exit(json_encode(["message" => "未登入"]));
}

$password = htmlspecialchars($_POST['password']);
$change_password = htmlspecialchars($_POST['change_password']);

$statement = $con->prepare("SELECT password FROM member WHERE account = ?");
$statement->execute(array($account));
$result    = $statement->fetch(PDO::FETCH_ASSOC);

if (($account && $password))
{
	if (password_verify($password, $result["password"])) 
	{
		if($password != $change_password)
		{
			$hash = password_hash("$change_password", PASSWORD_DEFAULT);
			$statement3 = $con->prepare("UPDATE member SET password=? WHERE account=?");
			$statement3->execute(array($hash,$account));
		}
		http_response_code(201);
        exit(json_encode(["message" => "密碼已修改"]));
	}
	else
	{
		http_response_code(401);
        exit(json_encode(["message" => "密碼錯誤"]));
	}
}
else
{
    http_response_code(400);
    exit(json_encode(["message" => "未填寫完整"]));
}

?>