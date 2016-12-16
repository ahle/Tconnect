<?php
$dir = dirname(__FILE__);
//require_once $dir.'/php/global.php';

// render a register page
if($_GET["page"]=="register" && $_SERVER[REQUEST_METHOD]=="GET"){

	if (empty($_SESSION['authorized']))
	{
		$uri = $_SERVER['REQUEST_URI'];
		header('Location: /index.php/logon?goto=' . urlencode($uri));
		exit();
	}
	
	$page = file_get_contents($dir."/html/register.html");

	echo $page;
	exit;
}

// render a logon page
if($_SERVER['PATH_INFO']=="/logon" && $_SERVER[REQUEST_METHOD]=="GET"){
	
	$page = file_get_contents($dir."/html/logon.html");
	$page = str_replace("\$goto", $_REQUEST["goto"], $page);

	echo $page;
	exit;
}

// render a test page
if($_SERVER['PATH_INFO']=="/test" && $_SERVER[REQUEST_METHOD]=="GET"){
	
	$page = file_get_contents($dir."/html/test.html");

	echo $page;
	exit;
}

// render a index page
if(true && $_SERVER[REQUEST_METHOD]=="GET"){

	$page = file_get_contents($dir."/html/index.html");

	echo $page;
	exit;
}