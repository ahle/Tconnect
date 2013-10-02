<?php
$dir = dirname(__FILE__);
require_once $dir.'/includes/global_variable.php';

function get_user($session_id){
	global $db_server,$db_user,$db_pwd,$db_name;
	
	$con = mysqli_connect($db_server,$db_user,$db_pwd,$db_name);
	// Check connection
	if (mysqli_connect_errno())
	{
		echo "Failed to connect to MySQL: ".mysqli_connect_error();
		exit;
	}

	$select_sql = "SELECT * FROM ta_session WHERE local_session = '".$session_id."' order by modified_date desc";

	if ($result = mysqli_query($con,$select_sql))
	{
		$row = mysqli_fetch_object($result);
		return $row->user;
	}
}

$session_id = session_id();
$user_id = get_user($session_id);

if($_GET["page"]=="TraceView"){
	$page = file_get_contents($root_dir."/html/Trace.html");
	$page = str_replace("\$user_id", $user_id, $page);
	
	echo $page;
	exit;
}

if($_GET["page"]=="EditStyle"){
	$style_id = $_GET["id"];
	$page = file_get_contents($root_dir."/html/EditStyle.html");
	$page = str_replace("\$style_id", $style_id, $page);
	
	echo $page;
	exit;
}