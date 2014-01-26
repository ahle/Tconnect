<?php
//echo "start";

function transformObsels($json, $code){

	$obsels = json_decode($json);

	$transformed_obsels = array();

	foreach($obsels as $obsel){
		$new_obsel = null;
		// filter & fusion in here
		
		eval($code);
		
		if($new_obsel)
			$transformed_obsels[] = $new_obsel;
	}

	$data1 = json_encode($transformed_obsels);
	echo $data1;
}

if($_POST["input"]){
	$data = $_POST["input"];
	if(substr($data,0,7)=="http://"){
		$data = file_get_contents($data);
	}
	$code = $_POST["code"];
	//$data = file_get_contents($source);
	transformObsels($data,$code);
}



?>