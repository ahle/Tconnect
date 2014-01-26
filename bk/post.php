<?php
$dir=dirname(__FILE__);
require_once $dir.'/KtbsObsel.php';

function post_obsel($json, $trace_uri,$model_uri){
	$obsels = json_decode($json);
	
	//$trace_uri = "http://localhost:8001/ozalid/t1/";
	//$model_uri = "http://localhost:8001/ozalid/model1/";
	
	foreach($obsels as $obsel){
		$a = new KtbsObsel($model_uri,$trace_uri);
		$a->load($obsel);
		$a->dump();
	}	
	
}

if($_POST["input"]){
	$data = $_POST["input"];
	$trace_uri = $_POST["trace_uri"];
	$model_uri = $_POST["model_uri"];
	//$data = file_get_contents($source);
	post_obsel($data,$trace_uri,$model_uri);
}