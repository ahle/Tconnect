<?php
$oza_tstore_dir = dirname(__FILE__);
$ozalid_dir = dirname(dirname(__FILE__));
$tconnect_dir = dirname(dirname($ozalid_dir));
$ktbsStore_dir = $tconnect_dir."/ktbs-store";
 
require_once "/var/www/tconnect/project/Ozalid/TStore/php/OzaTStore.php";
//require_once $trace_dir."/lib/Console.php";

//$ktbs_uri = "https://dsi-liris-silex.univ-lyon1.fr/ozalid/ktbs/";

if($_SERVER['PATH_INFO']=="/users" && $_SERVER[REQUEST_METHOD]=="GET"){
	
	$ktbs = new KtbsStore();
	$users = $ktbs->getUsers();
	
	echo json_encode($users);
	
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

if($_SERVER['PATH_INFO']=="/traces" && $_SERVER[REQUEST_METHOD]=="GET"){

	if(isset($_GET["userid"])){
		
		$user_id = $_GET["userid"];
	
		$ktbs = new KtbsStore();
	
		$traces = $ktbs->getTracesByUserId($user_id);
	
		echo json_encode($traces);
	
		exit;
	}
	
	if(isset($_GET["traceid"])){
	
		$trace_id = $_GET["traceid"];
	
		$store = new OzaTStore();
	
		$trace = $store->getCompleteTraceById($trace_id);
	
		echo json_encode($trace);
	
		exit;
	}
	
	// get all

	$ktbs = new OzaTStore();

	$traces = $ktbs->getTraces();

	echo json_encode($traces);
	
	exit;
}

if($_SERVER['PATH_INFO']=="/traces" && $_SERVER[REQUEST_METHOD]=="POST"){

	$user = $_POST["user"];

	// get all
	$user_id = $_GET["userid"];

	$ktbs = new KtbsStore();

	$traces = $ktbs->getTraces();

	echo json_encode($traces);

	exit;
}