<?php
$dir = dirname(__FILE__);
require_once $dir.'/includes/global.php';

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
	global $base_uri;
	$trace_uri = $base_uri."trc_".$user_id."/";
	
	$page = file_get_contents($root_dir."/html/Trace.html");
	$page = str_replace("\$user_id", $user_id, $page);
	$page = str_replace("\$trace_uri", $trace_uri, $page);
	
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

if($_GET["page"]=="Property"){
	$obsel_id = $_GET["id"];
	$obsel_str = $_GET["obsel"];
	$obsel = json_decode($obsel_str);
		
	//$page = file_get_contents($root_dir."/html/Property.html");
	//echo $obsel;
	$page = "<div class='table-responsive'>";
	$page.= "<table class='table table-striped' style='padding: 3px;'>";
	foreach($obsel as $p => $o){
		if($p=="begin"||$p=="end"){
			$o = gmdate("c",$o/1000);
		}
		
		if($p=="m:idSession"){
		#	$page.= "<code data-toggle='tooltip' title='".htmlentities($o)."' data_placement='right'>session</code> ";
		}
		elseif($p=="m:idDoc"){
		#	$page.= "<code data-toggle='tooltip' title='".htmlentities($o)."' data_placement='right'>doc</code> ";
		}
		#else{
		if(true){
			$page.= "<tr><td style='font-size: 12px'><code>".htmlentities($p)."</code></td><td style='font-size: 12px'>".htmlentities($o)."</td></tr>";	
		}
	}
	$page.= "</div>";
	
	//$page = str_replace("\$style_id", $style_id, $page);

	echo $page;
	exit;
}