<?php
$tconnect_dir = dirname(dirname(__FILE__));
$tStore_dir = $tconnect_dir."/tStore";
$ktbsPhp_dir = $tconnect_dir."/ktbs-php";

require_once $tStore_dir.'/php/Node.php';
require_once $tStore_dir.'/php/Reference.php';
require_once $tStore_dir.'/php/Grant.php';
require_once $ktbsPhp_dir."/KtbsClient.php";
require_once $ktbsPhp_dir."/KtbsBase.php";

class KtbsStore {
	public $uri = "https://dsi-liris-silex.univ-lyon1.fr/ozalid/ktbs/";
	
	function __construct($ktbs_uri){
		if($ktbs_uri){
			$this->uri = $ktbs_uri;
		}
	}
	
	function getNodes(){
		
	}
	
	function getReferences(){
		
		return $references;
	}
	
	function getGrants(){
		
		return $grants;
	}

	function getUsers(){
		
		$ktbs = new KtbsClient($this->uri);
		$bases = $ktbs->getBases();
		
		$users = $bases;
		
		return $users;
	}
	
	function addUser($user_infos){
		
		$base_infos = array();
		$base_infos["@root_uri"] = $this->uri;
		$base_infos["@name"] = $user_infos["id"];
		
		$base = new KtbsBase($base_infos);
		
		$ktbs = new KtbsClient($this->uri);
		
		$ok = $ktbs->postBase($base);
		
		return $ok;
	}

	function getTracesByUserId($userid){
		
		$ktbs = new KtbsClient($this->uri);
		$traces = $ktbs->getTracesByBaseId($userid);
		
		return $traces;
	}
	
	function getTraces(){
		
		$ktbs = new KtbsClient($this->uri);
		$traces = $ktbs->getTraces();
		
		return $traces;
	}
}