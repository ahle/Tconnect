<?php

use TAssistance;

$php_tassist_store = dirname(__FILE__);
$tassist_store = dirname($php_tstore);

class TAssistant {
	public $db = "/var/www/tconnect/tAssistance/db/";
	
	function __construct(){
		global $tassist_store;
		$this->db = $tassist_store."/db/";
	}
	
	function getTrace(){
		
		
	}
	
	function getUsers(){
		
		$filename = $this->db."user.json";
		$data = file_get_contents($filename);
		$users = json_decode($data);
		return $users;
	}
	
	function getUserById($user_id){
		$users = $this->getUsers();
		$user = TAssistance\store\User::getUserById($users, $user_id);
		
		return $user;
	}
	
	
	
	function updateUser($new_user){
		$users = $this->getUsers();
		$pos=$this->indexOf($users, $new_user);
		
		if($pos===false){// if not exist, create new
			// add new selector
			$users[]= $new_user;
			$this->updateUsers($users);
			return $ok;
		}
		else{// if exist, replace
			$users[$pos] = $new_user;
			$ok = updateUsers($users);
			return $ok;
		}
	}
	
	function updateUsers($users){
		$filename = $this->db."user.json";
		$users_in_json = json_encode($users);
		$ok = file_put_contents($filename, $users_in_json);
		return $ok;
	}
	
	function addUser($new_user){
		$users = $this->getUsers();
		$pos=$this->indexOf($users, $new_user);
		
		if($pos===false){// if not exist, create new
			// add new selector
			$users[]= $new_user;
			$this->updateUsers($users);
			return $ok;
		}
		else{// if exist, replace			
			return false;
		}
	}
	
	function deleteUser($user_id){
		$users = $this->getUsers();
		$user = new stdClass();
		$user->id  = $user_id;
		$pos=$this->indexOf($users, $user);
		array_splice($users, $pos, 1);
		$ok = updateUsers($users);
		return $ok;
	}
	
	function getFilter($user_id, $velement_id){
		
		$users = $this->getUsers();
		$filter = TAssistance\store\User::getFilter($users, $user_id, $velement_id);
		return $filter;
	}
	
	function updatePFilter($user_id, $velement_id, $pfilter_id, $updates){
		$users = $this->getUsers();
		$pos=TAssistance\common\_Object::getKeyById($users, $user_id);
	
		if($pos===false){// if not exist
			return false;
		}
		else{// if exist, replace
			$pfilter_info = &TAssistance\store\User::getPFilterInfo($users, $user_id, $velement_id, $pfilter_id);	
			
			$pfilter = &$pfilter_info->pfilter;
			$key = $pfilter_info->key;
			
			foreach($updates as $key => $value){
				$pfilter->$key = $value;
			}
				
			$ok = $this->updateUsers($users);
			return $ok;
		}
	}
	
	function replacePFilter($user_id, $velement_id, $pfilter_id, $new_pfilter){
		$users = $this->getUsers();
		$pos=TAssistance\common\_Object::getKeyById($users, $user_id);
	
		if($pos===false){// if not exist
			return false;
		}
		else{// if exist, replace
			$pfilter_info = &TAssistance\store\User::getPFilterInfo($users, $user_id, $velement_id, $pfilter_id);	
			
			$pfilters = &$pfilter_info->pfilters;
			$key = $pfilter_info->key;
			
			$pfilters[$key] = &$new_pfilter;
				
			$ok = $this->updateUsers($users);
			return $ok;
		}	
	}
			
}