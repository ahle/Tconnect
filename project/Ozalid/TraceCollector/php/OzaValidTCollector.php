<?php
class OzaValidTCollector{
	
	function __construct($parent_trace){
		$this->parent_trace = $parent_trace;
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
		$properties->type = "Validation";
		$properties->parent_id = $this->parent_trace->id;
		$properties->title = $this->parent_trace->title." - Validations";
	
		$trace->properties = $properties;
		
		$stats = new stdClass();
		$trace->stats = $stats;
	
		$trace->obsels = "obsels".$trace->id;
	
		return $trace;
	}
	
	function receiveObsel($new_obsel){
		
		if($new_obsel->type!="ozev_w") return false;
	
		$new_trace = $this->makeTrace($new_obsel);
	
		$store = new OzaTStore();
		
		$properties = new stdClass();
		$properties->type = "Validation";
		$properties->parent_id = $new_trace->properties->parent_id;
	
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

		// add counter
		$counter = new BasicCounter($trace);
		$counter->receiveObsel($new_obsel);
		
		return $ok;
	}
	
	function rebuild(){
		
	}
	
}