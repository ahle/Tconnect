<?php
//require_once "/var/www/tconnect/tAssistance/php/TraceList.php";

class TraceSearch{
	
	function __construct($traces){
		$this->traces = $traces;
	}
	
	function toHtml(){	
		global $tassist_html_dir;
		$id="TraceSearch".time();
		
		$html = file_get_contents($tassist_html_dir."/TraceSearch.html");
		
		$list = new TraceList($this->traces);
		$html_traces = $list->toHtml();
		
		$html = str_replace("\$traces",$html_traces,$html);
		$html = str_replace("\$id",$id,$html);
		
		return $html;
	}
	
	function search($search){
		$traces = array();
		$html_traces = "";
		
		
		foreach($this->traces as $trace){
			if(strpos($trace,$search)!==false || $search == "*"){
				$traces[]= $trace;	
			}			
		}
		
		$list = new TraceList($traces);
		$html_traces = $list->toHtml();
		
		return $html_traces;
	}
	
	 
	
}