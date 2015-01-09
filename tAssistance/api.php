<?php
error_reporting(0);

//echo json_encode($_GET);
//echo json_encode($_SERVER[REQUEST_METHOD]);

$dir = dirname(__FILE__);
require_once $dir.'/php/global.php';
	
	if($_GET["o"]=="style" && $_SERVER[REQUEST_METHOD]=="POST"){
		// read data input
		
		$style = $_POST;
		
		style_post($style);
		
		echo "1 record added";
		exit;
	}
	
	if($_GET["o"]=="style" && $_SERVER[REQUEST_METHOD]=="DELETE"){
		// read data input
		
		$style_id = $_GET["p1"];
		
		style_delete($style_id);
		echo "1 record deleted";
		
		exit;
	}
	
	if($_GET["o"]=="style" && $_SERVER[REQUEST_METHOD]=="PUT"){
		// read data input
		$input = file_get_contents("php://input");
		//parse_str($input,$style);
		$style=json_decode($input);
		echo "received";
		$ok = style_post($style);
		echo $ok;
		
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
		exit;
	}	
// selector
	if($_GET["o"]=="selector" && $_GET["p1"]=="all" && $_SERVER[REQUEST_METHOD]=="GET"){
	
		$selectors = selector_get_all();
	
		echo json_encode($selectors);
		exit;
	}
	
	if($_GET["o"]=="selector" && $_SERVER[REQUEST_METHOD]=="POST"){
		// read data input
	
		$selector = $_POST;
	
		selector_post($selector);
	
		echo "1 record added";
		exit;
	}	

	if($_GET["o"]=="selector" && $_SERVER[REQUEST_METHOD]=="PUT"){
		// read data input
		$input = file_get_contents("php://input");
		//parse_str($input,$style);
		$selector=json_decode($input);
		echo "received";
		$ok = selector_post($selector);
		echo $ok;
	
		exit;
	}
	
	if($_GET["o"]=="selector" && $_SERVER[REQUEST_METHOD]=="DELETE"){
		// read data input
	
		$selector_id = $_GET["p1"];
	
		selector_delete($selector_id);
		echo "1 record deleted";
	
		exit;
	}
	
// rule
if($_GET["o"]=="rule" && $_GET["p1"]=="full" && $_SERVER[REQUEST_METHOD]=="GET"){

	$rules = rule_get_full();

	echo json_encode($rules);
	exit;
}
	
if($_GET["o"]=="rule" && $_GET["p1"]=="all" && $_SERVER[REQUEST_METHOD]=="GET"){
	
	$rules = rule_get_all();

	echo json_encode($rules);
	exit;
}
	
if($_GET["o"]=="rule" && $_SERVER[REQUEST_METHOD]=="POST"){
	// read data input

	$rule = $_POST;

	rule_post($rule);

	echo "1 record added";
	exit;
}	

if($_GET["o"]=="rule" && $_SERVER[REQUEST_METHOD]=="PUT"){
	// read data input
	$input = file_get_contents("php://input");
	//parse_str($input,$style);
	$rule=json_decode($input);
	echo "received";
	$ok = rule_post($rule);
	echo $ok;

	exit;
}

if($_GET["o"]=="rule" && $_SERVER[REQUEST_METHOD]=="DELETE"){
	// read data input

	$rule_id = $_GET["p1"];

	rule_delete($rule_id);
	echo "1 record deleted";

	exit;
}

if($_SERVER['PATH_INFO']=="/users" && $_SERVER[REQUEST_METHOD]=="GET"){

	if($_GET["o"]=="filter"){
	
		$user_id = $_GET["userid"];
	
		$velement_id = $_GET["velement_id"];
				
		$store = new TAssistant();
	
		$filter = $store->getFilter($user_id, $velement_id);
	
		echo json_encode($filter);
	
		exit;
	}
	
	if(isset($_GET["userid"])){

		$user_id = $_GET["userid"];

		$store = new TAssistant();

		$users = $store->getUserById($user_id);

		echo json_encode($users);

		exit;
	}

	// get all

	$store = new TAssistant();

	$users = $store->getUsers();

	echo json_encode($users);

	exit;
}

if($_SERVER['PATH_INFO']=="/users" && $_SERVER[REQUEST_METHOD]=="PUT"){

	if($_GET["o"]=="pfilter" && $_GET["fn"]=="replace"){

		$user_id = $_GET["userid"];
		
		$velement_id = $_GET["velement_id"];
		
		$pfilter_id = $_GET["pfilter_id"];
		
		$pfilter_str = file_get_contents("php://input");
		
		$pfilter = json_decode($pfilter_str);

		$store = new TAssistant();

		$users = $store->replacePFilter($user_id, $velement_id, $pfilter_id, $pfilter);
		
		echo "ok"; 

		exit;
	}
	else if($_GET["o"]=="pfilter"){
	
		$user_id = $_GET["userid"];
	
		$velement_id = $_GET["velement_id"];
	
		$pfilter_id = $_GET["pfilter_id"];
	
		$updates_str = file_get_contents("php://input");
	
		$updates = json_decode($updates_str);
	
		$store = new TAssistant();
	
		$users = $store->updatePFilter($user_id, $velement_id, $pfilter_id, $updates);
	
		echo "ok";
	
		exit;
	}
	exit;
}



if($_SERVER['PATH_INFO']=="/users" && $_SERVER[REQUEST_METHOD]=="POST"){

	$user = $_POST["user"];

	$user_infos["id"] = $user;

	$ktbs = new KtbsStore();

	$ok = $ktbs->addUser($user_infos);

	echo $ok;

	exit;
}


if($_SERVER['PATH_INFO']=="/widget/TraceSearch" && $_GET["search"]){
	// read data input
	require_once "/var/www/tconnect/project/Ozalid/TStore/OzaTStoreClient.php";
	require_once "/var/www/tconnect/tAssistance/php/OzaTraceMenu.php";
	require_once "/var/www/tconnect/tAssistance/php/TraceSearch.php";

	$tstore = new OzaTStoreClient();

	//$users = $tstore->getUsers();
	
	$traces = $tstore->getTraces();
	
	$search = $_GET["search"];	
	
	$traceSearch = new TraceSearch($traces);
	$html = $traceSearch->search($search);
	
	echo $html;
	
	exit;
}

require_once "/var/www/tconnect/tAssistance/php/oza-api.php";

