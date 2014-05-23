<?php

class OzaTraceList{
	
	function __construct($traces){
		$this->traces = $traces;		
	}
	
	function toHtml(){
		require_once '/var/www/tconnect/tAssistance/php/TAssistantClient.php';
		require_once '/var/www/tconnect/project/Ozalid/TStore/OzaTStoreClient.php';
				
		$store_client = new OzaTStoreClient();		
		
		$assistant_client = new TAssistantClient();
		
		
		$html = "";
		foreach($this->traces as $trace){
			$traceid = $trace->id;
			$trace_uri = $store_client->getTraceUri($traceid);
			$assistant_uri = $assistant_client->getTraceUri($trace_uri);
			
			$html.= "<a href='".$assistant_uri."'>".$trace->properties->document_title."</a><br/>";
		}
		return $html;		
	}
}