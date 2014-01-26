<?php
$dir = dirname(__FILE__);
//require_once $dir.'/php/global.php';

// produit the register page
if($_GET["page"]=="register" && $_SERVER[REQUEST_METHOD]=="GET"){

	if (empty($_SESSION['authorized']))
	{
		$uri = $_SERVER['REQUEST_URI'];
		header('Location: /index.php?page=logon&goto=' . urlencode($uri));
		exit();
	}
	
	$page = file_get_contents($dir."/html/register.html");

	echo $page;
	exit;
}

// produit the logon page
if($_SERVER['PATH_INFO']=="/logon" && $_SERVER[REQUEST_METHOD]=="GET"){

	$page = file_get_contents($dir."/html/logon.html");

	echo $page;
	exit;
}

