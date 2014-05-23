<?php
$dir = dirname(__FILE__);
require_once $dir."/OzaEditorTrace.php";
require_once $dir."/lib/Http.php";

class OzaTraceRepoClient {
	public $uri = "http://rd.urbiloglabs.fr/oz_trace_repository/ws/";
	
	function __construct($repo_uri){
		if(isset($repo_uri)){
			$this->uri = $repo_uri;
		}
	}
	
	function getObselSet($number_of_packages){
		
		$remote_uri = $this->uri."get/".$number_of_packages;
		$json = Http::get($remote_uri);
		
		$ozaTrace = new OzaEditorTrace($json);
		return $ozaTrace;
	}
	
	function deleteObselSet($request_id){
		$ok = Http::delete($this->uri."delete/".$request_id);
		return $ok;
	}
	
}