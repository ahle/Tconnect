<?php

class OzaTStore{
	public $db = "/var/www/tconnect/project/Ozalid/TStore/db/";
	
	function __construct(){
		
	}
	
	function addUser(){
		
		
	}
	
	function getUsers(){
		$file = $this->db."users.json";
		$json = file_get_contents($file);
		$users = json_decode($json);
		
		return $users;		
	}
	
	
	
	
	
}


