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

$account  = $_SESSION["login"];
//$account  = "C2PAFF";
$name     = htmlspecialchars($_POST['name']);
$email     = htmlspecialchars($_POST['email']);

if(!isset($_POST['name']) || !isset($_POST['email']))
{
    http_response_code(200);
    exit(json_encode(["message" => "error"]));
}

$statement2 = $con->prepare("UPDATE member SET name=?, email=? WHERE account=?");
$statement2->execute(array($name,$email,$account));

http_response_code(200);
exit(json_encode(["message" => "success"]));

?>