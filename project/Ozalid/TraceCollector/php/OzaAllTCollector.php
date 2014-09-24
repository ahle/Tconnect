<?php
class OzaAllTCollector{
	
	function __construct(){
		
	}
	
	function makeTrace($obsel){
			
		$idDoc = "no_doc";
		if(isset($obsel->idDoc)){
			$idDoc = $obsel->idDoc;
		}
	
		$trace = new OzaTrace();
		$trace->id = "t_all";
			
		$properties = new OzaTraceProperties();
		$properties->type = "All";
		$properties->userid = "";
		$properties->document_id = "";
		$properties->title = "Tous les documents, tous les utilisateurs";
		
		$trace->properties = $properties;

		$stats = new stdClass();
		$trace->stats = $stats;
	
		$trace->obsels = "obsels".$trace->id;
	
		return $trace;
	}	
	
	function receiveObsel($new_obsel){
		
		$new_trace = $this->makeTrace($new_obsel);
		
		$store = new OzaTStore();
		
		$old_trace = $store->getTraceById($new_trace->id);
		$trace = false;
		if($old_trace===false){
			$ok = $store->addTrace($new_trace);
			if(!$ok) return false;
			$trace = $store->getTraceById($new_trace->id);
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
		
		$valid_tcollector = new OzaValidTCollector($trace->id);
		$valid_tcollector->receiveObsel($new_obsel);
		
		return $ok;
	}
	
}