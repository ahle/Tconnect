<?php

class OzaTStore{
	public $db = "/var/www/tconnect/project/Ozalid/TStore/db/";
	
	function __construct(){
		
	}	
	
	function getUserById($userid){
		$file = $this->db."users.json";
		$json = file_get_contents($file);
		$users = json_decode($json);
		
		foreach($users as $user){
			if($user->id == $userid){
				return $user;
			}
		}
		
		return false;
	}
	
	function getUsers(){
		$file = $this->db."users.json";
		$json = file_get_contents($file);
		$users = json_decode($json);
	
		return $users;
	}
	
	function addUser($user){
		$file = $this->db."users.json";
		$json = file_get_contents($file);
		$users = json_decode($json);
		
		$users[] = $user;
		
		$json = json_encode($users);
		
		$ok = file_put_contents($file, $json);
		
		return $ok;
		
	}
	
	function addTrace($trace){
		$file = $this->db."traces.json";
		$json = file_get_contents($file);
		$traces = json_decode($json);
	
		$traces[] = $trace;
	
		$json = json_encode($traces);
	
		$ok = file_put_contents($file, $json);
	
		return $ok;
	
	}
	
	function updateTrace($new_trace){
		$file = $this->db."traces.json";
		$json = file_get_contents($file);
		$traces = json_decode($json);
		
		$index = false;
		for($i=0;$i<count($traces);$i++){
			if($traces[$i]->id == $new_trace->id){
				$index = $i;
			}
		}
		
		if($index===false) return false;
		
		$traces[$index] = $new_trace;
		
		$json = json_encode($traces);
		
		$ok = file_put_contents($file, $json);
		
		return $ok;
		
	}
	
	function getTraces(){
		$file = $this->db."traces.json";
		$json = file_get_contents($file);
		$traces = json_decode($json);
		
		return $traces;
	}
	
	function getTraceByIds($userId, $docId){
		$file = $this->db."traces.json";
		$json = file_get_contents($file);
		$traces = json_decode($json);
		
		
		
		foreach($traces as $trace){
			$doc_id = $trace->properties->document_id;
			$user_id = $trace->properties->userid;
			if($doc_id == $docId && $user_id == $userId){
				return $trace;	
			}
		}
		
		return false;
	}
	
	function getTracesById($trace_id){
		$file = $this->db."traces.json";
		$json = file_get_contents($file);
		$traces = json_decode($json);
		
		foreach($traces as $trace){
			if($trace->id == $trace_id){
				return $trace;
			}
		}
		
		return false;
	}
	
	function getCompleteTraceById($trace_id){
		$trace = $this->getTracesById($trace_id);
		
		$obsels = $this->getObsels($trace_id);
		
		$trace->obsels = $obsels;
		
		return $trace;
	}
	
	
	function getObsels($traceid){
		$file = $this->db."obsels".$traceid.".json";
		$json = file_get_contents($file);
		$obsels = json_decode($json);
		
		return $obsels;
	}
	
	function addObsel($trace, $obsel){
		$trace_id = $trace->id;
		
		$file = $this->db."obsels".$trace_id.".json";
		$json = file_get_contents($file);
		$obsels = json_decode($json);
		
		$obsels[] = $obsel;
		
		$json = json_encode($obsels);
		
		$ok = file_put_contents($file, $json);
		
		return $ok;
	}
	
	
}


