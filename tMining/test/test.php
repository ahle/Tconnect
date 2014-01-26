<?php 
	$tMining_dir = dirname(dirname(__FILE__));
	echo $tMining_dir.'/php/ReservoirSampling.php';
	require_once $tMining_dir.'/php/ReservoirSampling.php';
	
	$file = file_get_contents("../data/t1.json");
	
	$list = json_decode($file);
	
	$reservoir = new ReservoirSampling();
	$result = $reservoir->reservoir($list, 5);
	echo json_encode($result);
?>


