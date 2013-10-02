<?php
//echo json_encode($_GET);
//echo json_encode($_SERVER[REQUEST_METHOD]);

$dir = dirname(__FILE__);
require_once $dir.'/includes/global_variable.php';

	function get_style_by_id($style_id){
		
		$con =  mysqli_connect($db_server,$db_user,$db_pwd,$db_name);
		// Check connection
		if (mysqli_connect_errno())
		{
			if($debug){
				echo "Failed to connect to MySQL: " . mysqli_connect_error();
			}
		}
		
		$sql = "select * from ta_style where id = ".$style_id. " ";
		
		$ret = array();
		
		if ($result = mysqli_query($con,$sql))
		{
			while ($row = mysqli_fetch_object($result)) {
				$ret[] = $row;
			}			
		}
		else{
			if($debug){
				die('Error: ' . mysqli_error($con));
			}
		}
			
		mysqli_close($con);
		
		return $ret;
	}

	function get_user($session_id){
		$con = mysqli_connect($db_server,$db_user,$db_pwd,$db_name);
		// Check connection
		if (mysqli_connect_errno())
		{
			echo "Failed to connect to MySQL: ".mysqli_connect_error();
			exit;
		}
		
		$select_sql = "SELECT * FROM ta_session WHERE local_session = '".$session_id."'";
		
		if ($result = mysqli_query($con,$select_sql))
		{
			$row_num = mysqli_num_rows($result);
		}
		
	}
	
	function create_style($style){
		global $db_server,$db_user,$db_pwd,$db_name;
		
		$con = mysqli_connect($db_server,$db_user,$db_pwd,$db_name);
		// Check connection
		if (mysqli_connect_errno())
		{
			echo "Failed to connect to MySQL: " . mysqli_connect_error();
			exit;
		}
		
		$sql="INSERT INTO ta_style (user, style) VALUES	('".$style->user."','".$style->style."')";
		
		if (!mysqli_query($con,$sql))
		{
			die('Error: ' . mysqli_error($con));
		}		
		
		mysqli_close($con);
	}
	
	function remove_style($style_id){
		global $db_server,$db_user,$db_pwd,$db_name;
		
		$con = mysqli_connect($db_server,$db_user,$db_pwd,$db_name);
		// Check connection
		if (mysqli_connect_errno())
		{
			echo "Failed to connect to MySQL: " . mysqli_connect_error();
		}
		
		$sql="DELETE FROM ta_style WHERE id=".$style_id;
		
		if (!mysqli_query($con,$sql))
		{
			die('Error: ' . mysqli_error($con));
		}		
		
		mysqli_close($con);
	}
	
	function update_style($style){
		global $db_server,$db_user,$db_pwd,$db_name;
	
		$con = mysqli_connect($db_server,$db_user,$db_pwd,$db_name);
		// Check connection
		if (mysqli_connect_errno())
		{
			echo "Failed to connect to MySQL: " . mysqli_connect_error();
		}
	
		$sql="UPDATE ta_style SET user='".$style->user."', style='".$style->style."' WHERE id=".$style->id;
	
		if (!mysqli_query($con,$sql))
		{
			die('Error: ' . mysqli_error($con));
		}		
	
		mysqli_close($con);
	}
	
	function get_style_by_user($user){
		global $db_server,$db_user,$db_pwd,$db_name;
		
		$con = mysqli_connect($db_server,$db_user,$db_pwd,$db_name);
		// Check connection
		if (mysqli_connect_errno())
		{
			echo "Failed to connect to MySQL: " . mysqli_connect_error();
		}
		
		$sql = "select * from ta_style where user = '".user. "' ";
		
		$ret = array();
		
		if ($result = mysqli_query($con,$sql))
		{
			while ($row = mysqli_fetch_object($result)) {
				$ret[] = $row;
			}			
		}
		else{
			die('Error: ' . mysqli_error($con));
		}
			
		mysqli_close($con);
		
		return $ret;
	}
	
	function get_new_key($app_id){
		global $db_server,$db_user,$db_pwd,$db_name;
		
		$con = mysqli_connect($db_server,$db_user,$db_pwd,$db_name);
		// Check connection
		if (mysqli_connect_errno())
		{
			echo "Failed to connect to MySQL: ".mysqli_connect_error();
			exit;
		}
		
		$select_sql = "SELECT * FROM ta_key WHERE remote_app = '".$app_id."' ";
		
		if ($result = mysqli_query($con,$select_sql))
		{
			$row_num = mysqli_num_rows($result);
			if($row_num==0){
		
				function generateRandomString($length = 10) {
					$characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
					$randomString = '';
					for ($i = 0; $i < $length; $i++) {
						$randomString .= $characters[rand(0, strlen($characters) - 1)];
					}
					return $randomString;
				}
		
				$priv_key = generateRandomString();
				$insert_sql = "INSERT INTO ta_key (remote_app, priv_key, modified_date) VALUES ('".$app_id."', '".$priv_key."', NOW()) ";
					
				if (!mysqli_query($con,$insert_sql))
				{
					echo 'Error: ' . mysqli_error($con);
					exit;
				}
				$key = new stdClass();
				$key->value =  $priv_key;
				$ret = json_encode($key);
				echo $ret;
			}
			else{
				$row = mysqli_fetch_object($result);
				$priv_key = $row->priv_key;
				$key = new stdClass();
				$key->value =  $priv_key;
				$ret = json_encode($key);
				echo $ret;
			}
				
			exit;
		}		
	}
	
	function update_session($session){
		global $db_server,$db_user,$db_pwd, $db_name;
		
		$user = $session["user_id"];
		$remote_app= $session["app_id"];
		$remote_session = $session["session_id"];
		
		$con = mysqli_connect($db_server,$db_user,$db_pwd,$db_name);
		// Check connection
		if (mysqli_connect_errno())
		{
			echo "Failed to connect to MySQL: ".mysqli_connect_error();
			exit;
		}
		
		$select_sql = "SELECT 1 FROM ta_session WHERE remote_app = '".$remote_app."' and remote_session = '".$remote_session."'";
		
		if ($result = mysqli_query($con,$select_sql))
		{
			$row_num = mysqli_num_rows($result);
			if($row_num==0){
				$insert_sql = "INSERT INTO ta_session (remote_app, remote_session, user) VALUES ('".$remote_app."', '".$remote_session."', '".$user."')";
		
				if (!mysqli_query($con,$insert_sql))
				{
					echo 'Error: ' . mysqli_error($con);
					exit;
				}
			}
			else{
				$update_sql="UPDATE ta_session SET user = '".$user."', modified_date=NOW() WHERE remote_app = '".$remote_app."' and remote_session = '".$remote_session."'";
		
				if (!mysqli_query($con,$update_sql))
				{
					echo 'Error: ' . mysqli_error($con);
					exit;
				}
			}
		}
		else{
			die('Error: ' . mysqli_error($con));
		}	
		
		mysqli_close($con);
	}
	
	if($_GET["o"]=="style" && $_SERVER[REQUEST_METHOD]=="POST"){
		// read data input
		
		$style = $_POST;		
		
		create_style($style);
		
		echo "1 record added";
		exit;
	}
	
	if($_GET["o"]=="style" && $_SERVER[REQUEST_METHOD]=="DELETE"){
		// read data input
		
		$style_id = $_GET["p1"];		
		
		remove_style($style_id);
		echo "1 record deleted";
		
		exit;
	}
	
	if($_GET["o"]=="style" && $_SERVER[REQUEST_METHOD]=="PUT"){
		// read data input
	
		parse_str(file_get_contents("php://input"),$style);
	
		update_style($style);
		echo "1 record updated";
		
		exit;
	}
	
	if($_GET["o"]=="style" && $_SERVER[REQUEST_METHOD]=="GET" && $_GET["p1"]=="id"){
		// read data input
		
		
		$style_id = $_GET["p2"];
	
		$ret = get_style_by_id($style_id);
		
		$data = json_encode($ret);
		echo $data;
		
		exit;
	}

	if($_GET["o"]=="style" && $_SERVER[REQUEST_METHOD]=="GET" && $_GET["p1"]=="user"){
		// read data input
	
		$user = $_GET["p2"];
	
		$ret = get_style_by_user($user);
		
		$data = json_encode($ret);
		echo $data;
		
		exit;
	}
	
	if($_GET["o"]=="session" && $_SERVER[REQUEST_METHOD]=="GET"){
				
		function oza_encript($string){
			$textToEncrypt = $string;
			$encryptionMethod = "AES-256-CBC";  // AES is used by the U.S. gov't to encrypt top secret documents.
			$secretHash = "25c6c7ff35b9979b151f2136cd13b0ff";
	
			//To encrypt
			$encryptedMessage = openssl_encrypt($textToEncrypt, $encryptionMethod, $secretHash);
			return $encryptedMessage;
		}
		
		function oza_decript($encryptedMessage,$secretHash){
			$encryptionMethod = "AES-256-CBC";  // AES is used by the U.S. gov't to encrypt top secret documents.
			//$secretHash = "25c6c7ff35b9979b151f2136cd13b0ff";
					
			//To Decrypt
			$decryptedMessage = openssl_decrypt($encryptedMessage, $encryptionMethod, $secretHash);
			return $decryptedMessage;
		}	
		
		//$assistant_prikey = "silex_ozalid2013";
		$app_id = $_GET["p1"];
		$encrypted_ticket = $_GET["ticket"];
		$returnUrl = $_GET["returnUrl"];
		
		function get_private_key($app_id){
			global $db_server,$db_user,$db_pwd,$db_name;
			$con = mysqli_connect($db_server,$db_user,$db_pwd,$db_name);
			// Check connection
			if (mysqli_connect_errno())
			{
				echo "Failed to connect to MySQL: ".mysqli_connect_error();
				exit;
			}
			
			$select_sql = "SELECT * FROM ta_key WHERE remote_app = '".$app_id."' ";
			
			if ($result = mysqli_query($con,$select_sql))
			{
				$row = mysqli_fetch_object($result);
		
				return $row->priv_key;
			}
			
		}
		$priv_key = get_private_key($app_id);
		
		$ticket_str = oza_decript($encrypted_ticket, $priv_key);
		$ticket = json_decode($ticket_str);
		
		// update session
		
		$con = mysqli_connect($db_server,$db_user,$db_pwd,$db_name);
		// Check connection
		if (mysqli_connect_errno())
		{
			echo "Failed to connect to MySQL: ".mysqli_connect_error();
			exit;
		}
		$app_id = $ticket->app_id;
		$remote_session = $ticket->session_id;
		$user_id = $ticket->user_id;
		
		
		$local_session = session_id();
		
		$select_sql = "SELECT 1 FROM ta_session WHERE remote_app = '".$app_id."' and remote_session = '".$remote_session."'";
		
		if ($result = mysqli_query($con,$select_sql))
		{
			$row_num = mysqli_num_rows($result);
			if($row_num==0){
				$insert_sql = "INSERT INTO ta_session (remote_app, remote_session, user, local_session, modified_date) VALUES ('".$app_id."', '".$remote_session."', '".$user_id."', '".$local_session."', NOW())";
		
				if (!mysqli_query($con,$insert_sql))
				{
					echo 'Error: ' . mysqli_error($con);
					exit;
				}
			}
			else{
				$update_sql="UPDATE ta_session SET user = '".$user_id."', local_session='".$local_session."' , modified_date=NOW() WHERE remote_app = '".$app_id."' and remote_session = '".$remote_session."'";
		
				if (!mysqli_query($con,$update_sql))
				{
					echo 'Error: ' . mysqli_error($con);
					exit;
				}
			}
		}
		else{
			die('Error: ' . mysqli_error($con));
		}
		
		
		// synchonize user
		// verify that session_start is set in global;
		$_SESSION["user"] = $user_id;
		
		// redirect 
		//$url = $_SERVER['REQUEST_URI'];
		//$url = str_replace("service.php", "index.php", $url); // TODO
		
		header('Location: '.$returnUrl);
		exit;
	}	
	
	if($_GET["o"]=="session" && $_SERVER[REQUEST_METHOD]=="PUT"){
		$app_id = $_GET["p1"];
		$remote_session = $_GET["p2"];
		
		parse_str(file_get_contents("php://input"),$session);
		
		//$user_id = $session["user_id"];
		echo json_encode($session);
		update_session($session);
		
		// success
		exit;			
	}
	else if($_GET["o"]=="key" && $_SERVER[REQUEST_METHOD]=="GET"){
		
		$app_id = $_GET["p1"];
		
		get_new_key($app_id);
	}
	