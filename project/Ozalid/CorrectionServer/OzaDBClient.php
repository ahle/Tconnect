<?php
$correct_dir = dirname(__FILE__);
require_once $correct_dir."/OzaEditorTrace.php";
require_once $correct_dir."/lib/Http.php";

class OzaDBClient {
	public $uri = "https://ozalid.orange-labs.fr/oz/ws/";

	function __construct($uri){
		if(isset($uri)){
			$this->uri = $uri;
		}
	}

// 	public function getDocumentSummary($documentId){
// 		$uri = $this->uri."sec/doc/".$documentId."/summary";
		
// 		$token = "T33JZIfVQVvOckG72pb54+Xi/RVerupemKUe/342ZNzJpQZfW8UPZI+J5J0SA1pCdcmF+oN3hJof/f4xxsh0gg==";
		
// 		$json = Http::getHTTPs($uri,$token);
		
// 		$summary = json_decode($json);
		
// 		return $summary;
// 	}
	
	public function getDoc($doc_id){
		$uri = $this->uri."sec/doc/".$doc_id."";
		
		//$token = "T33JZIfVQVvOckG72pb54+Xi/RVerupemKUe/342ZNzJpQZfW8UPZI+J5J0SA1pCdcmF+oN3hJof/f4xxsh0gg==";
		$token = "rajBeIwdv+qi5jiNddqwrZV7WwJHjxIYoD8JqZMOFDYiyP9MAa8fptlbt1RwYTUqwohJ7e9ij3hW5uYs1enDYg==";
		
		$json = Http::getHTTPs($uri,$token);
		
		$doc = json_decode($json);
		
		return $doc;
	}
	
	public function getDocImg($alto_id,$title_page){
		$uri = "https://ozalid.orange-labs.fr/oztiles/".$alto_id."/".$alto_id."_".$title_page."/0/0/0.png";
		
		return $uri;
	}
}