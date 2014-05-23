<?php

$trace_dir = dirname(__FILE__);

if($_SERVER['PATH_INFO']=="/log" && $_SERVER[REQUEST_METHOD]=="GET"){
	
	$log = file_get_contents($trace_dir."/data/update.log");
	
	$log = str_replace("\n", "<br/>", $log);
	
	echo $log;
	
	exit;
}

$page = file_get_contents($trace_dir."/html/index.html");

echo $page;



