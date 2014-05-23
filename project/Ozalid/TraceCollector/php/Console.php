<?php

class Console {
	
	function __construct($filename){
		$this->filename = $filename;
	}
	
	public function log($content){
		
		$filename = $this->filename;
		$fp = fopen($filename, "a");
		//used $content var instead of making new one
		fputs($fp, $content . "\r\n");
		fclose($fp);
	}
	
}