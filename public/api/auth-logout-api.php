<?php

include("./utils/shared.php");
allow_request_methods(["POST"]);
session_destroy();

http_response_code(200);
exit(json_encode(["message" => "登出成功"]));
