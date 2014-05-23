<?php
$dir=dirname(__FILE__);
//require_once $dir.'/N3Parser.php';
//require_once $dir.'/Rest.php';

class KtbsStoredTrace {
	
	function __construct($storedTrace){
		
		$this->base_uri=$storedTrace["@base_uri"];
		$this->name=$storedTrace["@name"];
		$this->uri=$this->base_uri.$this->name."/";
		$this->model_uri = $storedTrace["@model_uri"];		
		$this->hasOrigin =  $storedTrace["@hasOrigin"] || "1970-01-01T00:00:00Z";
		$this->hasDefaultSubject = $storedTrace["@hasDefaultSubject"] || "me";
		
	}
	
	public function toTurtle(){
		
		$prefixes[] = "@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .";
		$prefixes[] = "@prefix : <http://liris.cnrs.fr/silex/2009/ktbs#> .";				
		
		$statements[] = "<> :contains <".$this->name."/> .";
		$statements[] = "<".$this->name."/> a :StoredTrace .";
		$statements[] = "<".$this->name."/> :hasModel <".$this->model_uri."> .";		
		$statements[] = "<".$this->name."/> :hasOrigin ".'"'.$this->hasOrigin.'"'." .";
		$statements[] = "<".$this->name."/> :hasDefaultSubject ".'"'.$this->hasDefaultSubject.'"'." .";
		
		$this->script = implode("\n", $prefixes)."\n"
					.implode("\n", $statements);
		
		$script = implode("\n", $prefixes)."\n".implode("\n", $statements);
		
		$doc = new stdClass();
		$doc->prefixes = $prefixes;
		$doc->statements = $statements;
		$doc->text = $script;
		
		return $doc;
	}
}