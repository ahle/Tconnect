<?php
$dir = dirname(dirname(__FILE__));
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
	
	if($_POST["action"]=="add_style"){
		// read data input
		
		$data = $_POST["data"];
		$style = json_decode($data);
		
		$con = mysqli_connect($db_server,$db_user,$db_pwd,$db_name);
		// Check connection
		if (mysqli_connect_errno())
		{
			echo "Failed to connect to MySQL: " . mysqli_connect_error();
		}
		
		$sql="INSERT INTO ta_style (user, style) VALUES	('".$style->user."','".$style->style."')";
		
		if (!mysqli_query($con,$sql))
		{
			die('Error: ' . mysqli_error($con));
		}
		echo "1 record added";
		
		mysqli_close($con);
		
		exit;
	}
	
	if($_POST["action"]=="remove_style"){
		// read data input
		
		$data = $_POST["data"];
		$style = json_decode($data);
		
		$con = mysqli_connect($db_server,$db_user,$db_pwd,$db_name);
		// Check connection
		if (mysqli_connect_errno())
		{
			echo "Failed to connect to MySQL: " . mysqli_connect_error();
		}
		
		$sql="DELETE FROM ta_style WHERE id=".$style->id;
		
		if (!mysqli_query($con,$sql))
		{
			die('Error: ' . mysqli_error($con));
		}
		echo "1 record deleted";
		
		mysqli_close($con);
		
		exit;
	}
	
	if($_POST["action"]=="update_style"){
		// read data input
	
		$data = $_POST["data"];
		$style = json_decode($data);
	
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
		echo "1 record updated";
	
		mysqli_close($con);
		
		exit;
	}
	
	if($_POST["action"]=="get_style_by_id"){
		// read data input
		
		$data = $_POST["data"];
		$style = json_decode($data);
	
		$ret = get_style_by_id($style->id);
		$data = json_encode($ret);
		echo $data;
		
		exit;
	}

	if($_POST["action"]=="get_style_by_user"){
		// read data input
	
		$data = $_POST["data"];
		$style = json_decode($data);
	
		$con = mysqli_connect($db_server,$db_user,$db_pwd,$db_name);
		// Check connection
		if (mysqli_connect_errno())
		{
			echo "Failed to connect to MySQL: " . mysqli_connect_error();
		}
	
		$sql = "select * from ta_style where user = '".$style->user. "' ";
	
		$ret = array();
	
		if ($result = mysqli_query($con,$sql))
		{
			while ($row = mysqli_fetch_object($result)) {
				$ret[] = $row;
			}
	
			$data = json_encode($ret);
			echo $data;
		}
		else{
			die('Error: ' . mysqli_error($con));
		}
			
		mysqli_close($con);
		
		exit;
	}
	
	if($_POST["action"]=="open_assist_w"){
				
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
		$message = $_POST["ticket"];
		$app_id = $_POST["app_id"];
		
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
		
		$ticket_str = oza_decript($message, $priv_key);
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
		$url = $_SERVER['REQUEST_URI'];
		$url = str_replace("service.php", "index.php", $url); // TODO
		
		header('Location: '.$url);
		exit;
	}

	if($_GET["action"]=="edit_style"){
		$style_id = $_GET["id"];
		$html = '
				
				<html>
				<head>
				<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
				<title>Trace Assistant - Edit Style</title>
				<link href="../css/trace.css" rel="stylesheet" >
				<link href="../css/bootstrap.css" rel="stylesheet" >
				<script type="text/javascript" src="../../tService/js/js.php"></script>
				<script type="text/javascript" src="../js/js.php"></script>
				<script type="text/javascript" src="../js/bootstrap.js"></script>
				</head>
				<body>
				<form>
				  <fieldset>
				    <legend>Style:'.$style_id.'</legend>
				    <label>Source</label>
				    <input type="hidden" name="action" value="edit_style"/>
				    <input type="hidden" name="id" value="'.$style_id.'"/>
				    <textarea class="span8" rows="18" placeholder="Type something…"></textarea><br/>	    
				    <button type="submit" class="btn">Save</button>
				    <button class="btn" onclick="close();return false;">Discard</button>
				  </fieldset>				    
				</form>
				</body>
				</html>
				';
				
		echo $html;
		exit;
	}
	
	if($_GET["action"]=="update_session"){
		$app_id = $_GET["app_id"];
		$remote_session = $_GET["session_id"];
		$user_id = $_GET["user_id"];
		//echo json_encode($_SERVER);
		
		$con = mysqli_connect($db_server,$db_user,$db_pwd,$db_name);
		// Check connection
		if (mysqli_connect_errno())
		{
			echo "Failed to connect to MySQL: ".mysqli_connect_error();
			exit;
		}
		
		$select_sql = "SELECT 1 FROM ta_session WHERE remote_app = '".$app_id."' and remote_session = '".$remote_session."'";
		
		if ($result = mysqli_query($con,$select_sql))
		{
			$row_num = mysqli_num_rows($result);
			if($row_num==0){
				$insert_sql = "INSERT INTO ta_session (remote_app, remote_session, user) VALUES ('".$app_id."', '".$session_id."', '".$user_id."')";
				
				if (!mysqli_query($con,$insert_sql))
				{
					echo 'Error: ' . mysqli_error($con);
					exit;
				}
			}
			else{
				$update_sql="UPDATE ta_session SET user = '".$user_id."', modified_date=NOW() WHERE remote_app = '".$app_id."' and remote_session = '".$remote_session."'";
				
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
		// success
		exit;			
	}
	else if($_GET["action"]=="get_private_key"){
		$app_id = $_GET["app_id"];
		
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
				echo $priv_key;
			}
			else{
				$row = mysqli_fetch_object($result);
				$priv_key = $row->priv_key;
				echo $priv_key;
			}			
			
			exit;
		}
	}
	