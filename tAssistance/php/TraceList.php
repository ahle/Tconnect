<?php

class TraceList{
	
	function __construct($traces){
		$this->traces = $traces;		
	}
	
	function toHtml(){
		$html = "";
		foreach($this->traces as $trace){
			$html.= "<a href='".$trace."'>$trace</a><br/>";
		}
		return $html;		
	}
}



