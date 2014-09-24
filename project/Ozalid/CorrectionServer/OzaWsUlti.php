<?php

class OzaWsUlti{
	
	public function getIndPage($doc, $pageId){
		$pageIds = $doc->pageIds;
		
		$indPage = array_search($pageId, $pageIds);
		
		return $indPage;
	}
}