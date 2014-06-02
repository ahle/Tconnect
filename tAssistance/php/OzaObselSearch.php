<?php
//require_once "/var/www/tconnect/tAssistance/php/OzaTraceList.php";

class OzaObselSearch{
	
	function __construct($obsels){
		$this->obsels = $obsels;
	}
	
	function toHtml(){
		global $tassist_html_dir;
		$id="ObselSearch".time();
		
		$html = file_get_contents($tassist_html_dir."/OzaTraceSearch.html");
		
		//$list = new OzaTraceList($this->traces);
		//$html_traces = $list->toHtml();
		
		$html = str_replace("\$traces","",$html);
		$html = str_replace("\$id",$id,$html);
		
		return $html;
	}
	
	
	
	 
	
}