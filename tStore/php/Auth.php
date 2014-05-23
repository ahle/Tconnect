<?php
$tStore_dir = dirname(dirname(__FILE__));

require_once $tStore_dir.'/php/Store.php';

class Auth{
	
	static function verify($user_id, $object_id){
		$store = new Store();
		$grants = $store->getGrants();
		
		for($i=0;$i<count($grants);$i++){
			$grant = $grants[$i];
			//$user_id = $grant->user_id;
			if($user_id==$grant->user_id && $object_id==$grant->object_id){
				$permissions = explode(";", $grant->permissions);
				return $permissions;
			}			
		}
	}
}