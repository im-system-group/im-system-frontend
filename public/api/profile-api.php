<?php
session_start();
header("Content-Type: application/json; charset=utf8");
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization");

/** 請求的方法是否允許 */
$is_request_method_not_allowed = $_SERVER["REQUEST_METHOD"] !== "GET";

if ($is_request_method_not_allowed) {
    http_response_code(405);
    exit(json_encode(["message" => "不允許的方法"]));
}

include("../connect.php"); //連接資料庫
include("special-account.php");

if(!isset($_SESSION["login"]))
{
    http_response_code(401);
    exit(json_encode(["message" => "未登入"]));
}

$name = $_SESSION["login"];
//$name = "C2PAFF";
$statement = $con->prepare("SELECT * FROM member WHERE account = ?");
$statement->execute([$name]);
$result = $statement->fetch(PDO::FETCH_ASSOC);

for($i=0;$i<count($special_Account);$i++){
    if($name == $special_Account[$i]){
        $default_color = $special_color[$i];
    }
}

http_response_code(200);
exit(json_encode(["message" => "查詢成功",
                  "avator_url" => $result["photo"],
                  "user_avator_color" => $default_color,
                  "profile" => 
                  [
                    "screen_name" => $name,
                    "name" => $result["name"],
                    "email" => $result["email"]
                  ]
                  
                  ]));

?>