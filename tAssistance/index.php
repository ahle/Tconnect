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
#$user_id = get_user($session_id); // comment for debug
$user_id = "u1";// debug, need to be uncommented


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
	
	function utc_to_local($format_string, $o, $time_zone)
	{
		$utc_datetime=date_create();
		date_timestamp_set($utc_datetime,$o);
		$date->setTimeZone(new DateTimeZone($time_zone));
		return $date->format($format_string);
	}
	
	$obsel_id = $_GET["id"];
	$obsel_str = $_GET["obsel"];
	$obsel = json_decode($obsel_str);
		
	//$page = file_get_contents($root_dir."/html/Property.html");
	//echo $obsel;
	$page = "<div class='table-responsive span5'>";
	$page.= "<table class='table table-striped table-bordered' style='padding: 3px;word-wrap: break-word;table-layout:fixed;'>";
	$page.= "<caption><div style='border-radius: 4px;background-color: #F9F9F9; padding: 3px'>Properties<button type='button' class='close' aria-hidden='true' onclick=\"document.getElementById('controlPanel').innerHTML='';\">&times;</button></div></caption>";
	foreach($obsel as $p => $o){
		if($p=="begin"||$p=="end"){
			$o1 = $o;
			$date=date_create();
			//$time = date_timestamp_get($date);
			date_timestamp_set($date,$o/1000);
			$milliseconds = fmod($o,1000);
			$o = date_format($date,"Y-m-d H:i:s.".str_pad($milliseconds, 3, "0", STR_PAD_LEFT)." T");
			//utc_to_local('M j Y g:i:s a T',$o,'America/New_York');
			//$o = date_format($object, $format)
		}
		
		if($p=="m:idSession"){
		#	$page.= "<code data-toggle='tooltip' title='".htmlentities($o)."' data_placement='right'>session</code> ";
		}
		elseif($p=="m:idDoc"){
		#	$page.= "<code data-toggle='tooltip' title='".htmlentities($o)."' data_placement='right'>doc</code> ";
		}
		#else{
		if(true){
			$page.= "<tr><td style='font-size: 12px'><code>".htmlentities($p)."</code></td><td style='font-size: 12px;'>".htmlentities($o)."</td></tr>";	
		}
	}
	$page.= "</div>";
	
	//$page = str_replace("\$style_id", $style_id, $page);

	echo $page;
	exit;
}

if($_GET["page"]=="UserPreference"){
	$user_id = $_GET["userid"];
	
	//echo $obsel;
	$page = file_get_contents($root_dir."/html/UserPreference.html");
	
	echo $page;
	exit;
}