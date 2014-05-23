<?php
class TAssistantClient {
	public $uri = "http://localhost/tconnect/tAssistance/";
	
	function __construct(){
			
	}
	
	function getTraceUri($trace_uri){
		$uri = $this->uri."index.php?page=Trace&trace_uri=".$trace_uri;
		return $uri;
	}
	
}