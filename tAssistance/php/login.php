<?php

if($_SERVER[REQUEST_METHOD]=="POST"){
	$user_id = $_POST["user"];

	$_SESSION['user'] = $user_id;
	
	echo $_SESSION['user'];

	// success
	exit;
}

$user_id = $_GET["userid"];

$layout = file_get_contents($tassist_html_dir."/layout.html");
$layout = str_replace("\$title", "Trace Assistance - Login", $layout);

$login = file_get_contents($tassist_html_dir."/login.html");

$page = str_replace("\$body", $login, $layout);

echo $page;
