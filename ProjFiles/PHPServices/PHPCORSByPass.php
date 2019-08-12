<?php

// echo file_get_contents('http://www.blog.qnimate.com/child.html');

//to get post or get or .. request method type
$method = $_SERVER['REQUEST_METHOD'];
//echo $method."\n";

//to get data type like xml or json or text type
if(isset($_SERVER["CONTENT_TYPE"]))
{
	// echo $_SERVER["CONTENT_TYPE"];
	$requestContentType = $_SERVER["CONTENT_TYPE"];
	// if($requestContentType != "application/json")
	// {
	// 	$requestContentType = "application/json";
	// }
	// echo $requestContentType."\n";
}
else
{
	$requestContentType = "application/json";
	// echo "CONTENT_TYPE is not set.";
	// exit;
}


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

if(strpos($requestContentType,'application/json') !== false)
{
    //here we are converting data from json object to an array
    $json = json_decode(file_get_contents('php://input'),true);
    $raw = GetWEBHTMLUIData($userRequest, $json);
    $response = encodeJson($raw);
    echo $response."\n";
}
else if(strpos($requestContentType,'text/html') !== false)
{
    print_r($_REQUEST."\n");
    //echo $response;
}
else if(strpos($requestContentType,'application/xml') !== false)
{
    $response = new SimpleXMLElement($response);
    print_r($_REQUEST."\n");
    //echo $response;
}
else if(strpos($requestContentType,'application/x-www-form-urlencoded') !== false)
{
    $response = new SimpleXMLElement($response);
    print_r($_REQUEST."\n");
    //echo $response;
}
else
{
	echo "Content-Type is not valid try application/json";
}

    function encodeXml($responseData)
    {
		// creating object of SimpleXMLElement
		$xml = new SimpleXMLElement('<?xml version="1.0"?><mobile></mobile>');
		foreach($responseData as $key=>$value) {
			$xml->addChild($key, $value);
		}
		return $xml->asXML();
    }
    
    function encodeHtml($responseData) 
    {

		$htmlResponse = "<table border='1'>";
		foreach($responseData as $key=>$value) {
    			$htmlResponse .= "<tr><td>". $key. "</td><td>". $value. "</td></tr>";
		}
		$htmlResponse .= "</table>";
		return $htmlResponse;
    }
    
    function encodeJson($responseData) 
    {
		$jsonResponse = json_encode($responseData);
		//var_dump("receiveservice.php".$jsonResponse);
		return $jsonResponse;
    }
    
    function GetWEBHTMLUIData($UserOption, $data)
    {
        try
        {
            $url = $data['webURL'];
            $urlResponse = file_get_contents($url);
            $response = array("message"=>"Successful", "code"=>"1", "URLDetails"=>$urlResponse);
            return $response;
        }
        catch(PDOException $e)
        {
          // echo 'Exception -> ';
          //   var_dump($e->getMessage());
            $user_data = array();
            $response = array("message"=>"Songs cannot be retrived.".$e->getMessage(),
                             "code"=>"0",
                              "URLDetails"=>""
                             );
            return $response;
            //echo "Connection failed: " . $e->getMessage();
        }
    }
?>