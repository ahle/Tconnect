<?php

class OzaObselList{
	
	function __construct($obsels){
		$this->obsels = $obsels;
		$this->id = "OzaTraceList".time();
	}
	
	function search($search){
		$obsels = array();
		$html_traces = "";
		
		foreach($this->obsels as $obsel){
			$search = strtolower($search);
			$type = strtolower($obsel->type);
			if(strpos($type,$search)!==false || $search == "*"){
				$obsels[]= $obsel;
			}
		}
		$this->obsels = $obsel;
	}
	
	function toHtml(){
		//require_once '/var/www/tconnect/tAssistance/php/TAssistantClient.php';
		global $tassist_html_dir;
		require_once '/var/www/tconnect/project/Ozalid/TStore/OzaTStoreClient.php';
	
		$store_client = new OzaTStoreClient();
	
		$assistant_client = new TAssistantClient();
		$id = $this->id;
	
		$page = file_get_contents($tassist_html_dir."/OzaTraceList.html");
		
		$html_traces = "";
		foreach($this->traces as $trace){
			//$traceid = $trace->id;
			//$trace_uri = $store_client->getTraceUri($traceid);
			//$assistant_uri = $assistant_client->getTraceUri($trace_uri);
				
			$html_traces.= "<div class='ozatracelist-trace'><a href='".$assistant_uri."'>".$trace->properties->document_title."</a>[<a href='#' name='more' data-less='Less' data-more='More'>More</a>]<br/>";
			$html_traces.= "<p style='display:none'>Nombre des mots validés: ".$trace->stats->validCnt."</p></div>";
		}
	
		$page = str_replace("\$id", $id, $page);
		$page = str_replace("\$traces", $html_traces, $page);
	
		return $page;
	}
	
	function toJs(){
		$id = $this->id;
		return "tAssistance.widget = new tAssistance.TraceList(\"$id\");";
	}
}