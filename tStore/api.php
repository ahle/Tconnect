<?php

session_start();

$tStore_dir = dirname(__FILE__);
require_once $tStore_dir.'/php/String.php';
require_once $tStore_dir.'/php/Store.php';
require_once $tStore_dir.'/php/Http.php';
require_once $tStore_dir.'/php/User.php';
require_once $tStore_dir.'/php/Auth.php';

if(String::startsWith($_SERVER['PATH_INFO'], "/root")){
	$local_path = substr($_SERVER['PATH_INFO'], strlen("/root"));
	$remote_uri = null;
	// find the remote_uri
	$store = new Store();
	$references = $store->getReferences();
	
	for($i=0;$i<count($references);$i++){
		$reference = $references[$i];
		if($local_path==$reference->local_path){
			$remote_uri = $reference->remote_uri;
		}else if($local_path==$reference->local_path."@obsels.json"){
			$remote_uri = $reference->remote_uri."@obsels.json";			
		}
	}
	
	if($remote_uri==null){
		http_response_code(404);
		exit;
	}
	
	// authentication
	if (empty($_SESSION['authorized']))
	{
		$uri = $_SERVER['REQUEST_URI'];
		$tStore_uri = substr($uri, 0, strpos($uri, "/api.php/"));
		
		header('Location: '.$tStore_uri.'/index.php/logon?goto='.urlencode($uri));
		exit();
	}
	// authorization
	$auth = new Auth();
	$user_id = $_SESSION["user_id"];
	$object_id = substr($_SERVER['PATH_INFO'], strlen("/root")) ;
	$permissions = $auth->verify($user_id, $object_id);
	
	if($_SERVER[REQUEST_METHOD]=="POST"){
		
		if(!in_array("trace:create1",$permissions)){
			header('HTTP/1.1 403 Forbidden');
			echo 'You just don\’t have permission to access this resource';
			exit;
		}		
		
		$content = $_POST["content"];
		//$url = $_POST["url"];
		
		$headerinfo = apache_request_headers();
		//$content = $_POST;
		
		$header = array("Content-type:text/turtle", "Expect:");
		
		$curl = curl_init($remote_uri);
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
		
		if(!in_array("trace:read",$permissions)){
			header('HTTP/1.1 403 Forbidden');
			echo 'You just don\'t have permission to access this resource';
			exit;
		}
			
		$headerinfo = apache_request_headers();
	
		$curl = curl_init($remote_uri);
		curl_setopt($curl, CURLOPT_HTTPGET, true);
		curl_setopt($curl, CURLOPT_HEADER, true);
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
		$response = curl_exec($curl);
		$infos = curl_getinfo($curl);	
		$header_size = curl_getinfo($curl, CURLINFO_HEADER_SIZE);
		curl_close($curl);
		$header_str = substr($response, 0, $header_size);
		$body = substr($response, $header_size);
		
		$headers = Http::http_parse_headers($header_str);
		$etag = null;
			
		$http_code = $infos["http_code"];
	
		header("Content-Type: ".$infos["content_type"]);
		header("Etag: ".$headers["etag"]);
		header('HTTP/1.1 '.$http_code, true, $http_code);
	
		echo $body;
		
		exit;
	}
	
	
}

if($_SERVER[REQUEST_METHOD]=="GET"){
	$page = file_get_contents("/var/www/tracestore/tStore/input.html");
	echo $page;
	exit;
}

// trace consumer signup
if($_SERVER["REQUEST_METHOD"] == "POST" && $_SERVER['PATH_INFO']=="/register"){
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
if ($_SERVER["REQUEST_METHOD"] == "POST" && $_SERVER['PATH_INFO']=="/logon"){
	
	$user = new User();
	$user->name = $_POST["username"];
	$user->password = $_POST["password"];
	
	if($user->name == "sysadmin" && $user->password == "sysadmin"){
		// if successfully
		$_SESSION['authorized'] = true;
		
		if (!empty($_REQUEST['goto']))
		{
			header('Location: ' . $_REQUEST['goto']);
			die;
		}
		
		echo "Logon succesfull.";
	}
	
	if($user->name == "hoang" && $user->password == "hoang"){
		// if successfully
		$_SESSION['authorized'] = true;
		$_SESSION["user_id"] = "1";
	
		if (!empty($_REQUEST['goto']))
		{
			header('Location: ' . $_REQUEST['goto']);
			die;
		}
	
		echo "Logon succesfull.";
	}
	
}

// request authentication
if ($_SERVER["REQUEST_METHOD"] == "GET" && $_SERVER['PATH_INFO']=="/access_token"){
		
}