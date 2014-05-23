<?php
$dir=dirname(__FILE__);
require_once $dir.'/N3Parser.php';
//require_once $dir.'/Rest.php';

class KtbsObsel {
	public $uri = null;
	public $name = null;
	public $type = null;
	public $hasSuperObselType = null;
	public $model_uri = null;
	public $trace_uri = null;
	public $hasBegin = null;
	public $hasEnd = null;
	public $hasBeginDT = null;
	public $hasEndDT = null;
	public $comment = null;
	
	/*
		A new obsel determined by 3 factors: name of the obsel, its model and its trace 
	*/
	function __construct($obsel){
		
		// the meta properties
		$this->name = $obsel->{"@name"};
		$this->trace_uri = $obsel->{"@trace_uri"};
		$this->model_uri = $obsel->{"@model_uri"};
		$this->type = $obsel->{"@type"};
		$this->uri=$this->trace_uri.$this->name;
		$this->begin = $obsel->{"@begin"};
		$this->end = $obsel->{"@end"};

		// the other properties
		foreach($obsel as $p =>$value){
			if(substr($p,0,1)!=="@"){
				$this->properties["$p"] = $value;
			}
		}
	}
	
	public function toTurtle(){
		
		$prefixes[] = "@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .";
		$prefixes[] = "@prefix ktbs: <http://liris.cnrs.fr/silex/2009/ktbs#> .";
		$prefixes[] = "@prefix : <".$this->model_uri."> .";

		$statements[] = "<".$this->name."> ktbs:hasTrace <> .";
		$statements[] = "<".$this->name."> a :".$this->type." .";
		$statements[] = "<".$this->name."> ktbs:hasBegin ".$this->begin." .";
		$statements[] = "<".$this->name."> ktbs:hasEnd ".$this->end." .";
		
		foreach ($this->properties as $p => $value){
			if(is_string($value)){
				$statements[] = "<".$this->name."> :$p ".N3Parser::encode($value)." .";
			}
			if(is_int($value)){
				$statements[] = "<".$this->name."> :$p ".$value." .";
			}
		}
		
		$script = implode("\n", $prefixes)."\n".implode("\n", $statements);
		$result = new stdClass();
		$result->prefixes = $prefixes;
		$result->statements = $statements;
		$result->text = $script;
		
		return $result;
	}
}