<?php

class OzaTraceList{
	
	function __construct($traces){
		$this->traces = $traces;
		$this->id = "OzaTraceList".time();	
	}
	
	function search($search){
		$traces = array();
		$html_traces = "";
	
	
		foreach($this->traces as $trace){
			$search = strtolower($search);
			$title = strtolower($trace->properties->title);
			if(strpos($title,$search)!==false || $search == "*"){
				$traces[]= $trace;
			}
		}
		$this->traces = $traces;
	}
	
	function toHtml(){
		//require_once '/var/www/tconnect/tAssistance/php/TAssistantClient.php';
		//require_once '/var/www/tconnect/project/Ozalid/TStore/OzaTStoreClient.php';
		global $tassist_html_dir;	
		$store_client = new OzaTStoreClient();
		
		$assistant_client = new TAssistantClient();
		$id = $this->id;
		
		$page = file_get_contents($tassist_html_dir."/OzaTraceList.html");
		
		$html_traces = "";
		foreach($this->traces as $trace){
			$traceid = $trace->id;
			$trace_uri = $store_client->getTraceUri($traceid);
			$assistant_uri = $assistant_client->getTraceUri($trace_uri);
			
			$html_traces.= "<div class='ozatracelist-trace'><img src='img/trace.png' height='14px' width='14px'></img> <a href='".$assistant_uri."'>".$trace->properties->title."</a>[<a href='#' name='more' data-less='Less' data-more='More'>More</a>]<br/>";
			$html_traces.= "<p style='display:none'>Nombre des mots validés: ".$trace->stats->validCnt."<br/>";
			$html_traces.= "Modèle de trace: <img src='img/model.png' height='14px' width='14px'>".$trace->properties->model."<br/>";
			$html_traces.= "Nombre des obsels: ".$trace->stats->count."</p></div>";
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