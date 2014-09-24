<?php
class OzaUserTCollector{
	
	function __construct(){
	
	}
	
	function makeTrace($obsel){
		//global $ozalid_correct;
		//require_once "$ozalid_correct/OzaDBClient.php";
	
		//$idDoc = "no_doc";
		//if(isset($obsel->idDoc)){
		//	$idDoc = $obsel->idDoc;
		//}
	
		$trace = new OzaTrace();
		$trace->id = "t".time().mt_rand(1000,9999);
		
		$properties = new OzaTraceProperties();
		$properties->type = "User";
		$properties->userid = $obsel->user;
		$properties->document_id = "";
		$properties->title = $obsel->user;
	
		$trace->properties = $properties;
		
		$stats = new stdClass();
		$trace->stats = $stats;
	
		$trace->obsels = "obsels".$trace->id;
	
		return $trace;
	}
	
	function receiveObsel($new_obsel){
	
		$new_trace = $this->makeTrace($new_obsel);
	
		$store = new OzaTStore();
		
		$properties = new stdClass();
		$properties->type = "User";
		$properties->userid = $new_trace->properties->userid;
	
		$old_trace = $store->getTraceByProperties($properties);
		$trace = false;
		if($old_trace===false){
			$ok = $store->addTrace($new_trace);
			if(!$ok) return false;
			$trace = $store->getTraceByProperties($properties);
		}else{
			$trace = $old_trace;
		}
	
		$ok = $store->addObsel($trace,$new_obsel);
		
		// after add obsel, add counter
		$counter = new OzaVWCounter($trace);
		$counter->receiveObsel($new_obsel);
		// add counter
		$counter = new BasicCounter($trace);
		$counter->receiveObsel($new_obsel);
		
		return $ok;
	}
	
}