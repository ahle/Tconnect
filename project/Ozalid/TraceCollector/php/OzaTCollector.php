<?php

$ktbsPhp_dir = "/var/www/tconnect/ktbs-php";
require_once $ktbsPhp_dir."/KtbsClient.php";
require_once $ktbsPhp_dir."/KtbsBase.php";
require_once $ktbsPhp_dir."/KtbsStoredTrace.php";
require_once $ktbsPhp_dir."/KtbsObsel.php";
require_once "/var/www/tconnect/project/Ozalid/TStore/php/OzaTrace.php";
require_once "/var/www/tconnect/project/Ozalid/TStore/php/OzaObsel.php";
require_once "/var/www/tconnect/project/Ozalid/TStore/php/OzaTStore.php";
require_once "/var/www/tconnect/project/Ozalid/TStore/php/OzaTraceProperties.php";
require_once "/var/www/tconnect/project/Ozalid/TStore/php/OzaVWCounter.php";
require_once "/var/www/tconnect/project/Ozalid/TStore/php/BasicCounter.php";

class OzaTCollector {
	
	function __construct($root_uri){
		$this->uri = $root_uri;
	}
	
	// api for processing a new obsel
	public function receiveObsel($obsel){
		
		$new_obsel = $this->makeOzaObsel($obsel);
		
		$new_user = $this->makeOzaUser($obsel);
		
		$new_trace = $this->makeOzaTrace($new_obsel);
		
		$store = new OzaTStore();

		$user = false;
		
		$old_user = $store->getUserById($new_user->id);
		$user = false;
		if($old_user===false){
			$ok = $store->addUser($new_user);
			if(!$ok) return false;
			$user = $store->getUserById($new_trace->properties->userid);
		}else{
			$user = $old_user;
		}
				
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
		// add counter
		$counter = new OzaVWCounter($trace);
		$counter->receiveObsel($obsel);
		// add counter
		$counter = new BasicCounter($trace);
		$counter->receiveObsel($obsel);		
		
		return $ok;		
	}
	
	// api for manipulating the meta infos of an obsel from its attributes
	function makeOzaObsel($obsel){
		
		$oza_obsel = new OzaObsel();
		$oza_obsel->id = "o".time().mt_rand(1000,9999);
		$oza_obsel->type = $obsel->type;		
		$oza_obsel->user = $obsel->user;
		
		foreach($obsel as $p=>$o){
			$oza_obsel->$p = $o;
		}
		
		return $oza_obsel;
	}
	
	// api for manipulating the trace infos of an obsel from its attributes
	function makeOzaTrace($obsel){
		require_once "/var/www/tconnect/project/Ozalid/CorrectionServer/OzaDBClient.php";
		
		$idDoc = "no_doc";
		if(isset($obsel->idDoc)){
			$idDoc = $obsel->idDoc;
		}
		
		$trace = new OzaTrace();
		$trace->id = "t".time().mt_rand(1000,9999);
		
		$db = new OzaDBClient();
		$doc_title = "No document";
		if($idDoc!="no_doc"){
			$doc_title = $db->getDocumentSummary($idDoc)->desc->title;
		}
		$properties = new OzaTraceProperties();
		$properties->userid = $obsel->user;
		$properties->document_id = $idDoc;
		$properties->document_title = $doc_title;
		
		$trace->properties = $properties;
		
		$stats = new stdClass();
		$trace->stats = $stats;
		
		$trace->obsels = "obsels".$trace->id;
		
		return $trace;
	}
	// api for building a user from his obsel
	function makeOzaUser($obsel){
		require_once '/var/www/tconnect/project/Ozalid/SocialNetwork/OzaNetClient.php';
		require_once '/var/www/tconnect/project/Ozalid/TStore/php/OzaUser.php';
		
		$net = new OzaNetClient();
		$userid = $net->getUser($obsel->user);
		
		$user = new OzaUser();
		$user->id = $userid;
		
		return $user;	
	}	
	
	// api for getting obsels in a trace
	public function getObsels($trace_uri){
		$ktbs = new KtbsClient($this->uri);
		
		$obsels = $ktbs->getResource($trace_uri."@obsels.json","json");
		return $obsels;
	}
	
}