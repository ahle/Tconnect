<?php

class OzaUserCollector{
	
	function __construct(){
				
	}
	
	function makeUser($userid){
		global $ozalid_tstore,$ozalid_snet;
		require_once "$ozalid_snet/OzaNetClient.php";
		require_once "$ozalid_tstore/php/OzaUser.php";
		
		//$net = new OzaNetClient();
		//$userid = $net->getUser($obsel->user);
		
		$user = new OzaUser();
		$user->id = $userid;
		
		return $user;		
	}
	
	function receiveUser($userid){
		
		$new_user = $this->makeUser($userid);
		
		$store = new OzaTStore();
		
		$old_user = $store->getUserById($new_user->id);
		$user = false;
		if($old_user===false){
			$ok = $store->addUser($new_user);
			if(!$ok) return false;
			$user = $store->getUserById($new_user->id);
		}else{
			$user = $old_user;
		}
		
	}
	
	
}