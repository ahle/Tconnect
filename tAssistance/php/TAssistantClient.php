<?php
class TAssistantClient {
	public $uri = "http://dsi-liris-silex.univ-lyon1.fr/ozalid/tconnect/tAssistance/";// use this line for git
	//public $uri = "http://localhost/tconnect/tAssistance/";// use this line for local dev
	
	function __construct(){
		//$this->uri =  "http://dsi-liris-silex.univ-lyon1.fr/ozalid/tconnect/tAssistance/";
	}
	
	function getTraceUri($trace_uri){
		$uri = $this->uri."index.php?page=Trace&trace_uri=".$trace_uri;
		return $uri;
	}
}