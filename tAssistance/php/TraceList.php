<?php

class TraceList{
	
	function __construct($traces){
		$this->traces = $traces;
	}
	
	function search($search){
		$traces = array();
		$html_traces = "";
	
	
		foreach($this->traces as $trace){
			$search = strtolower($search);
			$title = strtolower($trace->properties->document_title);
			if(strpos($title,$search)!==false || $search == "*"){
				$traces[]= $trace;
			}
		}
		$this->traces = $traces;
	}
	
	function toHtml(){
		global $tassist_html_dir;
		$page = file_get_contents($tassist_html_dir."/TraceList.html");
		
		$html_traces = "";
		foreach($this->traces as $trace){
			$html_traces.= "<a href='".$trace."'>$trace</a> [<a href='#' name='more'>More</a>]<br/>";
			$html_traces.= "Nombre des mots validés: ".$trace->stats->validCnt."<br/>";
		}
		
		$page = str_replace("\$traces", $html_traces, $page);
		
		return $page;
	}
}