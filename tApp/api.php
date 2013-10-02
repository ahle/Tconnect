<?php
$dir= dirname(__FILE__);
require_once $dir.'/include/global.php';


					
function get_private_key(){
	global $app_config;

	$filename = $app_config;
	
	$ini_array=parse_ini_file($filename);
	return $ini_array["private_key"];
}

function set_private_key($private_key){
	global $app_config;
	
	$filename = $app_config;
	
	$ini_array=parse_ini_file($filename);
	$ini_array["private_key"]=$private_key;
	write_ini_file($ini_array,$filename,false);
}

if($_GET["o"]=="ticket" && $_SERVER[REQUEST_METHOD]=="GET" && $_GET["p1"]=="new"){
	//$data = $_POST["getTicket"];
	//$obj = json_decode($data);
	
	//$private_key = "silex_ozalid2013";
	
	function oza_encript($string,$secretHash){
		$textToEncrypt = $string;
		$encryptionMethod = "AES-256-CBC";  // AES is used by the U.S. gov't to encrypt top secret documents.
		//$secretHash = "25c6c7ff35b9979b151f2136cd13b0ff";

		//To encrypt
		$encryptedMessage = openssl_encrypt($textToEncrypt, $encryptionMethod, $secretHash);
		return $encryptedMessage;
	}

	function oza_decript($encryptedMessage){
		$encryptionMethod = "AES-256-CBC";  // AES is used by the U.S. gov't to encrypt top secret documents.
		$secretHash = "25c6c7ff35b9979b151f2136cd13b0ff";
		
		//To decrypt
		$decryptedMessage = openssl_decrypt($encryptedMessage, $encryptionMethod, $secretHash);
		return $decryptedMessage;
	}	
	
	$priv_key = get_private_key();
	//echo "Key	".$priv_key. " ********** ";
	$user_id = $_SESSION["user"];
	$session_id = session_id();
	
	$ticket = new stdClass();
	$ticket->app_id = $app_id;
	$ticket->session_id = $session_id;
	$ticket->user_id = $user_id;
		
	$ticket_str= json_encode($ticket);
	
	$message = oza_encript($ticket_str,$priv_key);
	echo $message;
}

// test
if($_POST["user"]){
	ini_set('session.save_path','/tmp');
	
	
	if (!is_writable(session_save_path())) {
		echo 'Session path "'.session_save_path().'" is not writable for PHP!';
	}
	else{
		//echo session_save_path();
	}
	
	// update session
	//$app_id = "abcde";
	$session_id = session_id();
	$user_id = $_POST["user"];
	
	//$header = array("Content-type:text/turtle");
	$session = new stdClass();
	$session->app_id = $app_id;
	$session->session_id = $session_id;
	$session->user_id = $user_id;
	
	$url = $assistance_url."session/".$app_id."/".$session_id;
	
	//echo $url;
	
	$curl = curl_init($url);
	curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "PUT");
	//curl_setopt($curl, CURLOPT_HTTPHEADER, $header);
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($curl, CURLOPT_POSTFIELDS, http_build_query($session));
	$reponse = curl_exec($curl);
	$infos = curl_getinfo($curl);
	curl_close($curl);
	//echo "HTTP REPOSNE: ".$reponse;
	$http_code = $infos["http_code"];
	
	//echo "HTTPCODE".$http_code;
	//Log::writeRestfulLog("put", $url, $content, $http_code);
	//if($http_code == "200") return true; else return false;
	
	//file_get_contents($assistance_url."?action=update_session&app_id=".$app_id."&session_id=".$session_id."&user_id=".$user_id);
	
	$_SESSION["user"] = $user_id;
	echo $_SESSION["user"];	
}

# GET /key/update
if($_GET["o"]=="key" && $_SERVER[REQUEST_METHOD]=="GET" && $_GET["p1"]=="update"){
		
	$data = file_get_contents($assistance_url."key/".$app_id);
	if($data===false){
		echo "Cannot get the private key";
	}
	
	$key = json_decode($data);
	$priv_key = $key->value;
			
	$ret = set_private_key($priv_key);
	
	if($ret===false){
		echo "Cannot save the private key";
	}
	# debug
	echo $priv_key;
	exit;
}