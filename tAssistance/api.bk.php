<?php

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