<?php
	
class OzaTraceMenu{
		
	function __construct($users,$traces){
		$this->users = $users;
		$this->traces = $traces;
	}
	
	function toHtml(){	
		
		$html = file_get_contents("/var/www/tconnect/tAssistance/html/OzaTraceMenu.html");
		
		
		
		
		
		
		
		
		$html = str_replace("\$text",$text,$html);
		$html = str_replace("\$details",$details,$html);
		
		return $html;
	}
	
	
	
	
}