<?php
session_start();// it works only in global

$assistance_url = "http://tassistance.com/srv/service.php";
$app_id = "azerty";
//$assistant_prikey = "silex_ozalid2013";
$tApp_dir = "/var/www/tapp1.com/tApp"; 

function get_ticket(){
	
}

function logout(){
	
}

if($_GET["sendAssistance"]){
	$data = $_GET["sendAssistance"];
	$session_id = session_id();
	session_start();
	$user_id = $_SESSION["user"];
	
	$query_url = "action=update_session"
			."&app_id=$app_id"
			."&session_id=$session_id"
			."&session_id=$user_id";
	
	$ret = file_get_contents($assistance_url."?".$query_url);
	
	echo $ret;
}




if($_POST["getTicket"]){
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
	
	function get_private_key(){
		global $tApp_dir;
		
		$dir = dirname(__FILE__);
		$root_path = dirname($dir);
		$filename = $tApp_dir."/data/tApp.conf";
		$data = file_get_contents($filename);
	
		$lines = explode("\n", $data);
	
		function startsWith($haystack, $needle)
		{
			return $needle === "" || strpos($haystack, $needle) === 0;
		}
		
		foreach ($lines as $line){
			if(startsWith($line, "private_key = ")){
				$priv_key = str_replace("private_key = ","", $line);
				return $priv_key;
			}			
		}		
	}
	
	$priv_key = get_private_key();
	
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

if($_POST["user"]){
	ini_set('session.save_path','/tmp');
	
	
	if (!is_writable(session_save_path())) {
		echo 'Session path "'.session_save_path().'" is not writable for PHP!';
	}
	else{
		echo session_save_path();
	}
	
	// update session
	//$app_id = $_GET["app_id"];
	$session_id = session_id();
	$user_id = $_POST["user"];
	
	file_get_contents($assistance_url."?action=update_session&app_id=".$app_id."&session_id=".$session_id."&user_id=".$user_id);
	
	$_SESSION["user"] = $user_id;
	echo $_SESSION["user"];	
}
if($_GET["action"]=="get_private_key"){
	
	$priv_key = file_get_contents($assistance_url."?action=get_private_key&app_id=".$app_id);
	
	function save_private_key($priv_key){
		$dir = dirname(__FILE__);
		$root_path = dirname($dir);
		$filename = $tApp_dir."/data/tApp.conf";
		$data = file_get_contents($filename);
		
		$lines = explode("\n", $data);
		
		function startsWith($haystack, $needle)
		{
			return $needle === "" || strpos($haystack, $needle) === 0;
		}
		$new_line = array();
		foreach ($lines as $line){
			if(startsWith($line, "private_key = ")){
				$line = "private_key = ".$priv_key;
			}
			$new_line[] = $line;
		}
		$data = implode("\n", $new_line);
		file_put_contents($filename, $data);
	}	
	save_private_key($priv_key);
	
	if($priv_key===false){
		echo "Cannot get a private key";
	}
	
	exit;
}