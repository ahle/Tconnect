<?php
//$dir=dirname(__FILE__);
//require_once $dir.'/KtbsObsel.php';
//echo "hoang";

function query_json($json){
	$obsels = json_decode($json);

	//$trace_uri = "http://localhost:8001/ozalid/t1/";
	//$model_uri = "http://localhost:8001/ozalid/model1/";

	$users = array();
	foreach($obsels as $obsel){
		if(!in_array($obsel->user, $users)){
			$users[] = $obsel->user;
		}
	}
	echo json_encode($users);

}


if($_POST["input"]){
	$data = $_POST["input"];
	//$data = file_get_contents($source);
	query_json($data);
}