<?php

if($_GET["page"]=="Trace" && $_GET["trace_uri"]){

	//$traceid = $_GET["traceid"];
	$trace_uri = $_GET["trace_uri"];

	$page = file_get_contents("$tassist_dir/html/Traces.html");
	$page = str_replace("\$user_id", "undefined", $page);
	$page = str_replace("\$trace_uri", $trace_uri, $page);

	echo $page;
	exit;
}
elseif($_GET["widget"]== "OzaTraceSearch" && !isset($_GET["search"])){
	require_once "$ozalid_tstore/OzaTStoreClient.php";
	require_once "$tassist_dir/php/OzaTraceMenu.php";
	require_once "$tassist_dir/php/OzaTraceSearch.php";
	
	// data
	//$tstore = new OzaTStoreClient();
	//$traces = $tstore->getTraces();
	
	// presentation
	$search = new OzaTraceSearch();
	$html = $search->toHtml();

	echo $html;
	exit;
}
elseif($_GET["widget"]== "OzaTraceList" && !isset($_GET["search"])){
	require_once "$ozalid_tstore/OzaTStoreClient.php";	
	require_once "$tassist_dir/php/OzaTraceList.php";

	$tstore = new OzaTStoreClient();
	
	//$users = $tstore->getUsers();
	
	$traces = $tstore->getTraces();
	
	$search = $_GET["search"];
	
	$list = new OzaTraceList($traces);
	$html = $list->toHtml();
	
	echo $html;
	exit;
}
elseif($_GET["widget"]== "OzaTraceList" && isset($_GET["search"])){
	require_once "$ozalid_tstore/OzaTStoreClient.php";
	require_once "$tassist_dir/php/OzaTraceList.php";

	$tstore = new OzaTStoreClient();

	//$users = $tstore->getUsers();

	$traces = $tstore->getTraces();

	$search = $_GET["search"];

	$list = new OzaTraceList($traces);
	$list->search($search);
	$html = $list->toHtml();

	echo $html;
	exit;
}