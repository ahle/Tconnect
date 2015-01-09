<?php
if($_GET["page"]=="Traces"){

	$user_id = $_SESSION["user"];

	$page = file_get_contents("html/layout1.html");
	$page = str_replace("\$user_id", $user_id, $page);
	$page = str_replace("\$script", "var page = new tAssistance.TraceListPage();", $page);

	echo $page;
	exit;
}
elseif($_GET["page"]=="Trace" && $_GET["trace_uri"]){

	$user_id = $_SESSION["user"];
	$trace_uri = $_GET["trace_uri"];

	$page = file_get_contents("$tassist_dir/html/Traces.html");
	$page = str_replace("\$user_id", $user_id, $page);
	$page = str_replace("\$trace_uri", $trace_uri, $page);

	echo $page;
	exit;
}
elseif($_GET["page"]=="Users"){

	$user_id = $_SESSION["user"];

	$page = file_get_contents("html/layout1.html");
	$page = str_replace("\$user_id", $user_id, $page);
	$page = str_replace("\$script", "var page = new tAssistance.UserListPage();", $page);

	echo $page;
	exit;
}
elseif($_GET["page"]=="Docs"){

	$user_id = $_SESSION["user"];

	$page = file_get_contents("html/layout1.html");
	$page = str_replace("\$user_id", $user_id, $page);
	$page = str_replace("\$script", "var page = new tAssistance.DocListPage();", $page);

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
elseif($_GET["test"]== "test"){
	//require_once "$ozalid_tstore/OzaTStoreClient.php";
	//require_once "$tassist_dir/php/OzaTraceList.php";

	//echo "aaa";
	$maker = new OzaWordFreMaker();
	
	exit;
}
elseif($_GET["test"]== "test1"){
	//require_once "$ozalid_tstore/OzaTStoreClient.php";
	//require_once "$tassist_dir/php/OzaTraceList.php";

	$user_id = $_SESSION["user"];

	$page = file_get_contents("html/layout1.html");
	$page = str_replace("\$user_id", $user_id, $page);
	$page = str_replace("\$script", "var page = new tAssistance.OzaWordFreMaker();", $page);

	echo $page;
	exit;
}
elseif($_GET["test"]== "test2"){
	//require_once "$ozalid_tstore/OzaTStoreClient.php";
	//require_once "$tassist_dir/php/OzaTraceList.php";

	$user_id = $_SESSION["user"];

	$page = file_get_contents("html/layout1.html");
	$page = str_replace("\$user_id", $user_id, $page);
	$page = str_replace("\$script", "var page = new tAssistance.DashBoardPage();", $page);

	echo $page;
	exit;
}
elseif($_GET["test"]== "test3"){
	//require_once "$ozalid_tstore/OzaTStoreClient.php";
	//require_once "$tassist_dir/php/OzaTraceList.php";

	$user_id = $_SESSION["user"];

	$page = file_get_contents("html/layout1.html");
	$page = str_replace("\$user_id", $user_id, $page);
	$page = str_replace("\$script", "var page = new tAssistance.DashBoardPage();", $page);

	echo $page;
	exit;
}