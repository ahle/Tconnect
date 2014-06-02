<?php
	
class OzaTraceMenu{
		
	function __construct($users,$traces){
		$this->users = $users;
		$this->traces = $traces;
	}
	
	function toHtml(){	
		global $tassist_html_dir;
		$html = file_get_contents($tassist_html_dir."/OzaTraceMenu.html");
		
		
		
		
		
		
		
		
		$html = str_replace("\$text",$text,$html);
		$html = str_replace("\$details",$details,$html);
		
		return $html;
	}
	
	
	
	
}