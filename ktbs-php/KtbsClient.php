<?php
$ktbsPhp_dir = dirname(__FILE__);
require_once $ktbsPhp_dir.'/Rest.php';

class KtbsClient {
	public $uri;
	
	function __construct($ktbs_uri){
		$this->uri = $ktbs_uri;		
	}
	
	// creating a new base in ktbs 
	public function postBase($base){
		$doc = $base->toTurtle();
		
		$ok = Rest::post($this->uri,$doc->text);
		return $ok;
	}
	
	// creating a new trace in ktbs
	public function postTrace($trace){
		$doc = $trace->toTurtle();
		
		$ok = Rest::post($trace->base_uri,$doc->text);
		return $ok;
	}
	
	// creating a new obsel in ktbs
	public function postObsel($obsel){
		$doc = $obsel->toTurtle();
		
		$ok = Rest::post($obsel->trace_uri,$doc->text);
		return $ok;
	}
	
	// getting a resource in ktbs
	public function getResource($resource_uri,$format){
		$doc = Rest::get($resource_uri);
		
		if($format=="json"){
			$object = json_decode($json);
			return $object;
		}
		
		return $doc;
	}
	
	// getting bases in ktbs
	public function getBases(){
		$doc = Rest::get($this->uri.".json");
		$ktbs_desc = json_decode($doc);
		
		$bases = $ktbs_desc->{"hasBase"};
		
		//remove the slashes
		$nosplash_bases = array();
		foreach($bases as $base){
			$base = substr($base,0,-1);
			$nosplash_bases[] = $base;
		}
		
		return $nosplash_bases;
	}
	
	// getting traces in ktbs
	public function getTracesByBaseId($base_id){
		$base_uri = $this->uri.$base_id."/";		
		
		$traces = array();
		
		$doc = Rest::get($base_uri.".json");
		$base_desc = json_decode($doc);
		
		$contains = array();
			
		if($base_desc->{"contains"}){
			$contains = $base_desc->{"contains"};
		}		
		
		foreach($contains as $contain){
			if($contain->{"@type"}=="StoredTrace"){
				$trace_id = substr($contain->{"@id"},2);
				
				$traces[] = $base_uri.$trace_id;
			}			
		}		
				
		return $traces;
	}
	
	// getting traces in ktbs
	public function getTraces(){
		
		$bases = $this->getBases();
		
		$traces = array();
		
		foreach($bases as $base){// loop all bases
			$base_uri = $this->uri.$base."/";
			
			$doc = Rest::get($base_uri.".json");
			$base_desc = json_decode($doc);
			
			$contains = array();
			
			if($base_desc->{"contains"}){
				$contains = $base_desc->{"contains"};
			}
			
			foreach($contains as $contain){
				if($contain->{"@type"}=="StoredTrace"){
					$trace_id = substr($contain->{"@id"},2);
			
					$traces[] = $base_uri.$trace_id;
				}
			}
		}
	
		return $traces;
	}
	
	public static function exist($resource_uri){
		$ok = Rest::get($resource_uri);
		return $ok;
	}
	
}