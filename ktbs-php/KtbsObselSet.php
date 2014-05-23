<?php
$dir=dirname(__FILE__);
require_once $dir.'/N3Parser.php';
require_once $dir.'/Rest.php';
require_once $dir.'/KtbsObsel.php';

class KtbsObselSet {
	public $uri = null;
	public $name = null;
	public $type = null;
	public $hasSuperObselType = null;
	public $model_uri = null;
	public $trace_uri = null;
	
	function __construct($obselset){
				
		$this->model_uri = $obselset["@model_uri"];
		$this->trace_uri = $obselset["@trace_uri"];
		$this->obsels = $obselset["obsels"];
	}
	
	public function toTurtle(){
		
		$prefixes[] = "@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .";
		$prefixes[] = "@prefix ktbs: <http://liris.cnrs.fr/silex/2009/ktbs#> .";
		$prefixes[] = "@prefix : <".$this->model_uri."> .";
		
		foreach($this->obsels as $obsel){
						
			$ktbs_obsel = new KtbsObsel($obsel);
			
			$doc = $obsel->toTurtle();

			foreach($doc->statements as $statement){
				$statements[] = $statement;// reuse the prefixes, only add the statements
			}
		}
		
		$script = implode("\n", $prefixes)."\n".implode("\n", $statements);
		$result = new stdClass();
		$result->prefixes = $prefixes;
		$result->statements = $statements;
		$result->script = $script;
		
		return $result;
	}
}
?>