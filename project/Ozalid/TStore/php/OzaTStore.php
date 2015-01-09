<?php
$php_tstore = dirname(__FILE__);
$tstore = dirname($php_tstore);

class OzaTStore{
	
	public $db = "/var/www/tconnect/project/Ozalid/TStore/db/";
	
	function __construct(){
		global $tstore;
		$this->db = $tstore."/db/";
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
	
	function getTraceByProperties($properties){
		$file = $this->db."traces.json";
		$json = file_get_contents($file);
		$traces = json_decode($json);
		
		foreach($traces as $trace){
			$match_all = true;
			foreach($properties as $p => $value){
				$match1 = false;
				foreach($trace->properties as $p1 => $value1){
					if($p1==$p){
						if($value1==$value){
							$match1 = true;
						}else{
							$match1 = false;
						}
						break;
					}
				}
				if($match1==false) {
					$match_all = false;
					break;
				}
			}
			if($match_all){
				return $trace;
			}
		}
	
		return false;
	}
	
	function getTraceById($trace_id){
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
		$trace = $this->getTraceById($trace_id);
		
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
	
	function addModel($model){
		$file = $this->db."models.json";
		$json = file_get_contents($file);
		$models = json_decode($json);
		
		$models[] = $model;
		
		$json = json_encode($models);
		
		$ok = file_put_contents($file, $json);
		
		return $ok;
	}
	
	function getModels(){
		
		
	}
	
	function addDoc($doc){
		//$doc_id = $doc->id;
		
		$file = $this->db."docs.json";
		$json = file_get_contents($file);
		$docs = json_decode($json);
		
		$docs[] = $doc;
		
		$json = json_encode($docs);
		
		$ok = file_put_contents($file, $json);
		
		return $ok;
	}
	
	function getDocById($doc_id){
		$file = $this->db."docs.json";
		$json = file_get_contents($file);
		$docs = json_decode($json);
		
		foreach($docs as $doc){
			if($doc->id == $doc_id){
				return $doc;
			}
		}
		
		return false;
	}
	
	function getDocs(){
		$file = $this->db."docs.json";
		$json = file_get_contents($file);
		$docs = json_decode($json);

	
		return $docs;
	}
	
}


