<?php

class OzaDocCollector{
	
	function __construct(){
		
	}
	
	function makeDoc($doc_id){
		$doc = new OzaDoc();
		$doc->id = $doc_id;
		
		$ws = new OzaDBClient();
		$doc_src = $ws->getDoc($doc_id);
		
		$doc->altoId = $doc_src->altoId;
		// desc
		$doc->title = $doc_src->desc->title;
		$doc->author = $doc_src->desc->author;
		$doc->genre = $doc_src->desc->genre;
		$doc->publisher = $doc_src->desc->publisher;
		$doc->date = $doc_src->desc->date;
		// image_uri
		$image_uri = $ws->getDocImg($doc_src->altoId, $doc_src->titlePage);
		
		$doc->img = $image_uri;
		
		return $doc;
	}
	
	function receiveDoc($doc_id){
		if($doc_id==null) return;
		
		$new_doc = $this->makeDoc($doc_id);
		
		$store = new OzaTStore();
		
		$old_doc = $store->getDocById($new_doc->id);
		echo json_encode($old_doc);
		
		$doc = false;
		if($old_doc===false){
			$ok = $store->addDoc($new_doc);					
			if(!$ok) return false;
			
			$line = new stdClass();
			$line->type = "newDoc";
			$line->docid = $new_doc->id;
			$line->doc_title = $new_doc->title;
			
			global $console;
			$console->log(json_encode($line));
			
			$doc = $store->getDocById($new_doc->id);
		}else{
			$doc = $old_doc;
		}		
	}	
}