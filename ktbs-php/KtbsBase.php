<?php

class KtbsBase {
	
	function __construct($base){
		$this->root_uri = $base["@root_uri"];
		$this->name = $base["@name"];
		$this->uri = $this->root_uri.$this->name."/";
	}
	
	public function toTurtle(){
	
		$prefixes[] = "@prefix : <http://liris.cnrs.fr/silex/2009/ktbs#> .";
		$prefixes[] = "@prefix skos: <http://www.w3.org/2004/02/skos/core#> .";
	
		$statements[] = "<> :hasBase <".$this->name."/> .";
		$statements[] = "<".$this->name."/> a :Base .";
		$statements[] = "<".$this->name."/> skos:prefLabel \"My new base\" .";

		$this->script = implode("\n", $prefixes)."\n"
				.implode("\n", $statements);
	
		$script = implode("\n", $prefixes)."\n".implode("\n", $statements);
	
		$doc = new stdClass();
		$doc->prefixes = $prefixes;
		$doc->statements = $statements;
		$doc->text = $script;
	
		return $doc;
	}	

	public static function exist($resource_uri){
		$ok = Rest::get($resource_uri);
		return $ok;
	}	
}