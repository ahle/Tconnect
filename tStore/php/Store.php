<?php
$tStore_dir = dirname(dirname(__FILE__));

require_once $tStore_dir.'/php/model/Node.php';
require_once $tStore_dir.'/php/model/Reference.php';
require_once $tStore_dir.'/php/model/Grant.php';

class Store {
	
	function getNodes(){
		global $tStore_dir;
		
		$nodes = array();
		
		$db = new SQLite3($tStore_dir."/db/test.db");
		//$db->open();
		$results = $db->query('SELECT * FROM Node');
		while ($row = $results->fetchArray()) {
		   	$node = new Node();
		   	$node->id = $row["id"];
		   	$node->name = $row["name"];
		   	$node->parent_id = $row["parent_id"];
			$nodes[] = $node;
		}
		return $nodes;
	}
	
	function getReferences(){
		global $tStore_dir;
		$references = array();
	
		$db = new SQLite3($tStore_dir."/db/test.db");

		$results = $db->query('SELECT * FROM Reference');
		while ($row = $results->fetchArray()) {
			$reference = new Reference();
			$reference->id = $row["id"];
			$reference->local_path = $row["local_path"];
			$reference->remote_uri = $row["remote_uri"];
			$references[] = $reference;
		}
		return $references;
	}
	
	function getGrants(){
		global $tStore_dir;
		$grants = array();
	
		$db = new SQLite3($tStore_dir."/db/test.db");
	
		$results = $db->query('SELECT * FROM Grant');
		while ($row = $results->fetchArray()) {
			$grant = new Grant();
			$grant->id = $row["id"];
			$grant->user_id = $row["user_id"];
			$grant->object_id = $row["object_id"];
			$grant->permissions = $row["permissions"];
			$grants[] = $grant;
		}
		return $grants;
	}

	function getUsers(){
		global $tStore_dir;
		$users = array();
		
		$db = new SQLite3($tStore_dir."/db/test.db");
		
		$results = $db->query('SELECT * FROM User');
		while ($row = $results->fetchArray()) {
			$user = new User();
			$user->id = $row["id"];
			$user->name = $row["name"];
			$user->password = $row["password"];
			$users[] = $user;
		}
		return $users;		
	}

	function addUser($user_infos){
				
	}
	
	function deleteUser($user_id){
		
		
	}
	
	function getTracesByUserId($user_id){
		
	}
	
}