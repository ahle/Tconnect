<?php
// require curl

if($_SERVER[REQUEST_METHOD]=="POST"){
	// read data input
	
	$content = $_POST["uri"];
	
	$headerinfo = apache_request_headers();
	//$content = $_POST;
	
	$header = array("Content-type:text/turtle", "Expect:");
	
	$curl = curl_init("http://localhost:8001/");
	curl_setopt($curl, CURLOPT_POST, true);
	curl_setopt($curl, CURLOPT_HTTPHEADER, $header);
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($curl, CURLOPT_POSTFIELDS, $content);
	$reponse = curl_exec($curl);
	$infos = curl_getinfo($curl);
	curl_close($curl);
	
	//echo json_encode($infos);
	echo $reponse;
	
	$http_code = $infos["http_code"];
	//if($http_code == "201") return true;
	
	header("Content-Type: ".$infos["content_type"]);
	header('HTTP/1.1 '.$http_code, true, $http_code);
		
	exit;
}

if($_SERVER[REQUEST_METHOD]=="GET"){
	$page = file_get_contents("/var/www/tracestore/tStore/input.html");
	echo $page;
	exit;
}

// trace consumer signup
if($_SERVER["REQUEST_METHOD"] == "POST" && $_GET["f"]=="register"){
	//$store = new Store();
	//$user_id = 1;
	//$key = updateConsumer();
	//$c = $store->getConsumer($key,$user_id);
	//echo "".$c["consumer_key"];
	
	// verify the sysadmin
	
	
	$register = new Register();
	$register->requester_name = $_POST["requester_name"];
	$register->requester_email = $_POST["requester_email"];
	$register->application_uri = $_POST["application_uri"];
	$register->callback_uri = $_POST["callback_uri"];
	
}

// trace consumer logon
if ($_SERVER["REQUEST_METHOD"] == "POST" && $_GET["f"]=="logon"){
	
	$user = new User();
	$user->username = $_POST["username"];
	$user->password = $_POST["password"];
	
	if($user->username == "sysadmin" && $user->password == "sysadmin"){
		// if successfully
		$_SESSION['authorized'] = true;
		if (!empty($_REQUEST['goto']))
		{
			header('Location: ' . $_REQUEST['goto']);
			die;
		}
		
		echo "Logon succesfull.";
	}
}

// request authentication
if ($_SERVER["REQUEST_METHOD"] == "GET" && $_GET["f"]=="access_token"){
	
	
	
	
	
	
	
	
	
	
}





























