<?php

class OzaObselModifier{
	
	function __construct(){
		
	}
	
	function modify($obsel){
		
		if(isset($obsel->idDoc)){
			$idDoc = $obsel->idDoc;
			
			$ws = new OzaDBClient();
			
			$doc = $ws->getDoc($idDoc);
			
			$obsel->altoID = $doc->altoId;
			
			if(isset($obsel->idPage)){
				$idPage = $obsel->idPage;
				
				$ulti = new OzaWsUlti();
				
				$indPage = $ulti->getIndPage($doc,$idPage);
				
				$obsel->indPage = $indPage;
				
			}
		}
		return $obsel;
	}	
}