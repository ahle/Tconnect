<?php
$dir=dirname(__FILE__);
//require_once $dir.'/N3Parser.php';
//require_once $dir.'/Rest.php';

class KtbsComputedTrace {
	
	function __construct($computedTrace){
		
		$this->base_uri=$computedTrace["@base_uri"];
		$this->name=$computedTrace["@name"];
		$this->uri=$this->base_uri.$this->name."/";
		$this->method_uri = $computedTrace["@method_uri"];		
		$this->source =  $computedTrace["@source"];
		$this->hasParameter = $computedTrace["@parameter"];		
	}
	
	public function toTurtle(){
		
		$prefixes[] = "@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .";
		$prefixes[] = "@prefix : <http://liris.cnrs.fr/silex/2009/ktbs#> .";
		
		$statements[] = "<> :contains <".$this->name."/> .";
		$statements[] = "<".$this->name."/> a :ComputedTrace .";
		$statements[] = "<".$this->name."/> :hasMethod <".$this->model_uri."> .";
		$statements[] = "<".$this->name."/> :hasSource <".$this->source."> .";
		$statements[] = "<".$this->name."/> :hasParameter ".'"'.$this->hasDefaultSubject.'"'." .";
		
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