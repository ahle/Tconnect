<?php
$ozalid_collector = dirname(dirname(__FILE__));
$ozalid_dir = dirname($ozalid_collector);
$ozalid_tstore = $ozalid_dir."/TStore";
$tconnect_dir = dirname(dirname($ozalid_dir));

//$ozalid_correct = $ozalid_dir."/CorrectionServer";
//$ozalid_snet = $ozalid_dir."/SocialNetwork";
require_once "$ozalid_tstore/php/OzaTrace.php";
require_once "$ozalid_tstore/php/OzaObsel.php";
require_once "$ozalid_tstore/php/OzaTStore.php";
require_once "$ozalid_tstore/php/OzaTraceProperties.php";
require_once "$ozalid_tstore/php/OzaVWCounter.php";
require_once "$ozalid_tstore/php/BasicCounter.php";

class OzaUserDocTCollector{
	
	function __construct(){
		
	}
	
	function makeTrace($obsel){
		//global $ozalid_correct;
		//require_once "$ozalid_correct/OzaDBClient.php";
	
		$idDoc = "no_doc";
		if(isset($obsel->idDoc)){
			$idDoc = $obsel->idDoc;
		}
	
		$trace = new OzaTrace();
		$trace->id = "t".time().mt_rand(1000,9999);
			
		$properties = new OzaTraceProperties();
		$properties->type = "UserDoc";
		$properties->userid = $obsel->user;
		$properties->document_id = $idDoc;
		$properties->title = $doc_title;
	
		$trace->properties = $properties;
	
		$stats = new stdClass();
		$trace->stats = $stats;
	
		$trace->obsels = "obsels".$trace->id;
	
		return $trace;
	}	
	
	function receiveObsel($new_obsel){
		
		$new_trace = $this->makeTrace($new_obsel);
		
		$store = new OzaTStore();
		
		$old_trace = $store->getTraceByIds($new_trace->properties->userid, $new_trace->properties->document_id);
		$trace = false;
		if($old_trace===false){
			$ok = $store->addTrace($new_trace);
			if(!$ok) return false;
			$trace = $store->getTraceByIds($new_trace->properties->userid, $new_trace->properties->document_id);
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