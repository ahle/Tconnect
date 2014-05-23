<?php

class OzaEditorClient{
	public $uri = "http://rd.urbiloglabs.fr/ozalid_node_leaflet/editor/";
	
	function __construct($uri){
		if(isset($uri)){
			$this->uri = $uri;
		}
	}
	
	public function getDocUri($doc_id){
		return $this->uri."summary/summary.html?v=view1&tv=page-text&idDoc=".$doc_id;
	}
	
	public function getPageUri($doc_id,$page_id){
		return $this->uri."view1/page-text.html?v=view1&acc=s&idDoc=$doc_id&idPage=$page_id";
	}
	
}