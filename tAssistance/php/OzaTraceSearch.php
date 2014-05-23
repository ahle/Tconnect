<?php
require_once "/var/www/tconnect/tAssistance/php/OzaTraceList.php";

class OzaTraceSearch{
	
	function __construct($traces){
		$this->traces = $traces;
	}
	
	function toHtml(){	
		$id="TraceSearch".time();
		
		$html = file_get_contents("/var/www/tconnect/tAssistance/html/OzaTraceSearch.html");
		
		$list = new OzaTraceList($this->traces);
		$html_traces = $list->toHtml();
		
		$html = str_replace("\$traces",$html_traces,$html);
		$html = str_replace("\$id",$id,$html);
		
		return $html;
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
		
		$list = new OzaTraceList($traces);
		$html_traces = $list->toHtml();
		
		return $html_traces;
	}
	
	 
	
}