<?php

include("./utils/shared.php");
allow_request_methods(["POST"]);
validate_field_names_in_data($_POST, ["account","email"]);

// Import PHPMailer classes into the global namespace
// These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

// Load Composer's autoloader
require '../../vendor/autoload.php';

function getrand_id()
{
    $id_len = 15;
    $id = '';
    $word = 'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $len = strlen($word);
 
    for($i = 0; $i < $id_len; $i++)
	{
        $id .= $word[rand() % $len];
    }
    return $id;
}

$account = htmlspecialchars($_POST["account"]);
$email   = htmlspecialchars($_POST["email"]);

$new_password = getrand_id();

$check_account_and_email_statement = $mysql_conn->prepare(
	"SELECT * 
	FROM `member` 
	WHERE account = ?"
);

$check_account_and_email_statement->execute([$account]);
$result = $check_account_and_email_statement->fetch(PDO::FETCH_ASSOC);
if($result["account"] == "" or $result["email"] == "")
{
	http_response_code(401);
	respond_json(["message" => "帳號或Email不存在"]);
}


/** @var string hash過的密碼 */
$hashed_new_password = password_hash($new_password, PASSWORD_DEFAULT);

/** @var PDOStatement 密碼更新敘述 */
$password_update_statement = $mysql_conn->prepare(
	"UPDATE member
	SET password = ?
	WHERE account = ?"
);

$password_update_statement->execute([$hashed_new_password,$account]);

// Instantiation and passing `true` enables exceptions
$mail = new PHPMailer(true);

try {
    //Server settings
	$mail->CharSet = 'UTF-8';
    $mail->isSMTP();                                            // Send using SMTP
    $mail->Host       = 'mail.gandi.net';                    // Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
    $mail->Username   = 'admin@imsystem.site';                     // SMTP username
    $mail->Password   = '@123456a970236';                               // SMTP password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;         // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
    $mail->Port       = 465;                                    // TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above

    //Recipients
    $mail->setFrom('admin@imsystem.site');
    $mail->addAddress($email);               // Name is optional

    // Content
    $mail->isHTML(true);                                  // Set email format to HTML
    $mail->Subject = 'iM系統密碼更改通知';
    $mail->Body    = '感謝您('.$account.')申請更改密碼服務！<br>
					您的密碼已變更為：'.$new_password.' <br>
					請登入後自行更改密碼，感謝您的配合！';

    $mail->send();
	http_response_code(200);
	respond_json(["message" => "傳送成功"]);
}
catch(Exception $e)
{
	http_response_code(400);
	respond_json(["message" => $mail->ErrorInfo]);
}