<?php
//echo "start";

function normalizeObsels($json){
	//global $firephp;

	$received_microtime = microtime();

	$packages = json_decode($json);

	# Processing the obsel
	# $trace_uri = $masterdata["trace"];
	# $model_uri = $masterdata["model"];

	//$id = $obsel_req->{"id"};
	//$firephp->log($id,"GET");
	//$packages = $obsel_req->{"packages"};
	//$all_ok = true;
	$obsels = array();

	foreach($packages as $package){
			
		// header
		$header = $package->{"hT"};

		$dt1 = 	$header->{"dT1"};
		$dt2 = 	$header->{"dT2"};
		$dt3 = 	$header->{"dT3"};
		$user = $header->{"user"};
		$idSession = $header->{"idSession"};
		$lock = 	$header->{"lock"};
		$ready = 	$header->{"ready"};
		$idDoc = 	$header->{"idDoc"};
		$idPage = 	$header->{"idPage"};
		// body
		$oza_obsels = $package->{"pT"};

		foreach($oza_obsels as $oza_obsel){

			$obsel = new stdClass();

			$dt = $oza_obsel->{"dT"};

			// body->message
			$mt = $oza_obsel->{"mT"};
			$type = $mt->{"tid"};
			$infos = $mt->{"infos"};

			// ktbs_obsel
			$time = (int)strtotime($dt1)*1000 + (int)substr($dt1,20,3) + (int)$dt;
			$obsel->begin = $time;
			$obsel->end = $time;
			$obsel->type = $type;
			$obsel->user = $user;
			$obsel->idDoc = $idDoc;
			$obsel->idPage = $idPage;
			$obsel->idSession = $idSession;

			foreach($infos as $info){
				// process properties et values of obsels

				foreach($info as $p => $value){
					//$value = $p;
					$obsel->{"info_".$p} = $value;
				}
			}
			$obsels[] = $obsel;
		}
	}
	
	$data1 = json_encode($obsels);
	echo $data1;
	return $data1;
}
//$data = file_get_contents("http://localhost/tracestore/data/14obsels.json");
if($_POST["input"]){
	$data = $_POST["input"];
	//$data = file_get_contents($source);
	normalizeObsels($data);
	exit;
}

//$data = file_get_contents("http://localhost/tracestore/bk/data/exper.json");
//$data1 = normalizeObsels($data);
//$ok = file_put_contents("output1.json", $data1, FILE_APPEND);

?>