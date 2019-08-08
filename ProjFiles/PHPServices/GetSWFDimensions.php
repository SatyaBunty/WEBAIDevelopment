<?php

try
{
//require_once("UserService.php");
//require_once("ServiceController.php");

//to get post or get or .. request method type
$method = $_SERVER['REQUEST_METHOD'];
//echo $method."\n";

//to get data type like xml or json or text type
$requestContentType = $_SERVER["CONTENT_TYPE"];
//echo $requestContentType."\n";

//to get values from url that attached
$userRequest = "";
if(isset($_GET["userRequest"]))
{
    $userRequest = $_GET["userRequest"];
    //echo $userRequest."\n";
}
else
{
    $userRequest="faultRequest";
}

//$rh = new RequestHandler();


//$rawData = array('error' => 'No mobiles found!',
//'method' => $method);

$rawData = json_decode(file_get_contents('php://input'),true);

// echo json_encode($rawData);

$file = $rawData["fileUrl"];//"../../planerace.swf";
$info = getimagesize($file);
$width = $info[0];
$height = $info[1];
// echo $info;
// print "{$width}x{$height}\n";
$dimensions = array("width"=>$width, "height"=>$height);

// echo json_encode($dimensions);

function encodeXml($responseData) {
    // creating object of SimpleXMLElement
    $xml = new SimpleXMLElement('<?xml version="1.0"?><mobile></mobile>');
    foreach($responseData as $key=>$value) {
        $xml->addChild($key, $value);
    }
    return $xml->asXML();
}

function encodeHtml($responseData) {

    $htmlResponse = "<table border='1'>";
    foreach($responseData as $key=>$value) {
            $htmlResponse .= "<tr><td>". $key. "</td><td>". $value. "</td></tr>";
    }
    $htmlResponse .= "</table>";
    return $htmlResponse;
}


function encodeJson($responseData) {
    $jsonResponse = json_encode($responseData);
    //var_dump("receiveservice.php".$jsonResponse);
    return $jsonResponse;
}

$_response = array("message"=>"Service successful", "code"=>"1", "dimensions"=>$dimensions);
$response = encodeJson($_response);
echo $response;



// if(strpos($requestContentType,'application/json') !== false)
// {
//     //here we are converting data from json object to an array
//     $json = json_decode(file_get_contents('php://input'),true);
//     $raw = $rh -> Request_Handler($userRequest, $json);
//     $response = encodeJson($raw);
//     echo $response."\n";
// }
// else if(strpos($requestContentType,'text/html') !== false)
// {
//     print_r($_REQUEST."\n");
//     //echo $response;
// }
// else if(strpos($requestContentType,'application/xml') !== false)
// {
//     $response = new SimpleXMLElement($response);
//     print_r($_REQUEST."\n");
//     //echo $response;
// }
// else if(strpos($requestContentType,'application/x-www-form-urlencoded') !== false)
// {
//     $response = new SimpleXMLElement($response);
//     print_r($_REQUEST."\n");
//     //echo $response;
// }
// else
// {

// }
}
catch(PDOException $e)
{
    $user_data = array();
            $responseData = array("message"=>"*username/password is incorrect",
                             "code"=>"0",
                              "UserDetails"=>$user_data
                             );
                             $jsonResponse = json_encode($responseData);
		//var_dump("receiveservice.php".$jsonResponse);
		echo $jsonResponse;
            //return $response;
}

?>
