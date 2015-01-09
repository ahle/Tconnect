<?php
$ozalid_dir = $tconnect_dir."/project/Ozalid";
$ozalid_correct = $ozalid_dir."/CorrectionServer";
require_once $ozalid_correct."/lib/Http.php";

class OzaTStoreClient {
	public $uri = "http://localhost/tconnect/project/Ozalid/TStore/api.php/";
	//public $uri = "http://dsi-liris-silex.univ-lyon1.fr/ozalid/tconnect/project/Ozalid/TStore/api.php/";
	
	function __construct($repo_uri){
		if(isset($repo_uri)){
			$this->uri = $repo_uri;
		}
	}

	function getUsers(){

		$uri = $this->uri."users";
		$json = Http::get($uri);

		$users = json_decode($json);
		return $users;
	}
	
	function addUser($user){
		
		
	}
	
	function addTrace($trace){
		
	}

	function getTraces(){
	
		$uri = $this->uri."traces";
		$json = Http::get($uri);
	
		$traces = json_decode($json);
		return $traces;
	}
	
	function getTracesByUserId($userid){
	
		$uri = $this->uri."traces?userid=".$userid;
		$json = Http::get($uri);
	
		$traces = json_decode($json);
		return $traces;
	}
	
	function getTraceUri($traceid){
		$uri = $this->uri."traces?traceid=".$traceid;
		return $uri;
	}
	

}