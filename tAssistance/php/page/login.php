<?php

if($_SERVER[REQUEST_METHOD]=="POST"){
	$user_id = $_POST["user"];
	$return_url = $_GET["return"];
	
	$_SESSION['user'] = $user_id;
	if($return!=null){
		header('Location: '.$return_url);
	}
	else{
		header('Location: index.php');
	}
	
	// success
	exit;
}

$user_id = $_GET["userid"];

$layout = file_get_contents($tassist_html_dir."/layout.html");
$layout = str_replace("\$title", "Trace Assistance - Login", $layout);

$login = file_get_contents($tassist_html_dir."/login.html");

$page = str_replace("\$body", $login, $layout);

echo $page;
