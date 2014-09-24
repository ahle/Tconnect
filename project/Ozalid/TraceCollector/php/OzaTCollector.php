<?php
$ozalid_collector = dirname(dirname(__FILE__));
$ozalid_dir = dirname($ozalid_collector);
$ozalid_tstore = $ozalid_dir."/TStore";
$tconnect_dir = dirname(dirname($ozalid_dir));
$ktbsPhp_dir = "$tconnect_dir/ktbs-php";
$ozalid_correct = $ozalid_dir."/CorrectionServer";
$ozalid_snet = $ozalid_dir."/SocialNetwork";
require_once $ktbsPhp_dir."/KtbsClient.php";
require_once $ktbsPhp_dir."/KtbsBase.php";
require_once $ktbsPhp_dir."/KtbsStoredTrace.php";
require_once $ktbsPhp_dir."/KtbsObsel.php";
require_once "$ozalid_tstore/php/OzaTrace.php";
require_once "$ozalid_tstore/php/OzaObsel.php";
require_once "$ozalid_tstore/php/OzaDoc.php";
require_once "$ozalid_tstore/php/OzaTStore.php";
require_once "$ozalid_tstore/php/OzaTraceProperties.php";
require_once "$ozalid_collector/php/OzaUserDocTCollector.php";
require_once "$ozalid_collector/php/OzaDocTCollector.php";
require_once "$ozalid_collector/php/OzaUserCollector.php";
require_once "$ozalid_collector/php/OzaUserTCollector.php";
require_once "$ozalid_collector/php/OzaDocCollector.php";
require_once "$ozalid_collector/php/OzaAllTCollector.php";
require_once "$ozalid_collector/php/OzaValidTCollector.php";
require_once "$ozalid_collector/php/OzaObselModifier.php";
require_once "$ozalid_tstore/php/OzaVWCounter.php";
require_once "$ozalid_tstore/php/BasicCounter.php";
require_once "$ozalid_correct/OzaDBClient.php";
require_once "$ozalid_correct/OzaWsUlti.php";

class OzaTCollector {
	
	function __construct($root_uri){
		$this->uri = $root_uri;
	}
	
	// api for processing a new obsel
	public function receiveObsel($obsel){
		
		$new_obsel = $this->makeOzaObsel($obsel);
		
		$new_user = $this->makeOzaUser($obsel);
		
		$user = false;
		
		$user_collector = new OzaUserCollector();
		$user_collector->receiveUser($new_user->id);
		
		$doc_collector = new OzaDocCollector();
		$doc_collector->receiveDoc($new_obsel->idDoc);
		
		$user_doc_tcollector = new OzaUserDocTCollector();
		$ok = $user_doc_tcollector->receiveObsel($new_obsel);
		
		
		$doc_tcollector = new OzaDocTCollector();
		$doc_tcollector->receiveObsel($new_obsel);
		
		$user_tcollector = new OzaUserTCollector();
		$user_tcollector->receiveObsel($new_obsel);
		
		$all_tcollector = new OzaAllTCollector();
		$all_tcollector->receiveObsel($new_obsel);
				
		return $ok;
	}
	
	// api for manipulating the meta infos of an obsel from its attributes
	function makeOzaObsel($obsel){
		
		// complete the infos of obsel as altoId, indPage
		$modifier = new OzaObselModifier();
		$obsel = $modifier->modify($obsel);
				
		$oza_obsel = new OzaObsel();
		$oza_obsel->id = "o".time().mt_rand(1000,9999);
		$oza_obsel->type = $obsel->type;
		$oza_obsel->user = $obsel->user;
	
		foreach($obsel as $p=>$o){
			$oza_obsel->$p = $o;
		}		
	
		return $oza_obsel;
	}	
	
	
	// api for building a user from his obsel
	function makeOzaUser($obsel){
		global $ozalid_tstore,$ozalid_snet;
		require_once "$ozalid_snet/OzaNetClient.php";
		require_once "$ozalid_tstore/php/OzaUser.php";
		
		$net = new OzaNetClient();
		$userid = $net->getUser($obsel->user);
		
		$user = new OzaUser();
		$user->id = $userid;
		
		return $user;	
	}	
	
	
	
	
	
}