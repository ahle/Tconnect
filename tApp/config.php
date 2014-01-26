<?php
$dir= dirname(__FILE__);
require_once $dir.'/include/global.php';


if($_SERVER[REQUEST_METHOD]=="GET"){
	$file_content = file_get_contents("config/app.conf");
	
	$page = file_get_contents("html/config.html");
	
	$page = str_replace("\$file_content", $file_content, $page);
	
	echo $page;
	exit;
}
if($_SERVER[REQUEST_METHOD]=="POST"){
	$new_file_content = $_POST["file_content"];

	$ret = file_put_contents("config/app.conf", $new_file_content);

	if($ret){
		echo "The configuration is saved";
	}
	else{
		echo "An error occurs";
	}
	
	exit;
}