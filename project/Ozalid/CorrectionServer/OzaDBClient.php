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

	public function getDocumentSummary($documentId){
		$remote_uri = $this->uri."sec/doc/".$documentId."/summary";
		
		$token = "T33JZIfVQVvOckG72pb54+Xi/RVerupemKUe/342ZNzJpQZfW8UPZI+J5J0SA1pCdcmF+oN3hJof/f4xxsh0gg==";
		
		$json = Http::getHTTPs($remote_uri,$token);
		
		$summary = json_decode($json);
		
		return $summary;
	}
}