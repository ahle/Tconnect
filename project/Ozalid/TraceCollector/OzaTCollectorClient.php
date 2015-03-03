<?php
$ozalid_dir = $tconnect_dir."/project/Ozalid";
$ozalid_correct = $ozalid_dir."/CorrectionServer";
require_once $ozalid_correct."/lib/Http.php";

class OzaTCollectorClient {
	public $uri = "http://localhost/tconnect/project/Ozalid/TraceCollector/api.php/";
	//public $uri = "http://dsi-liris-silex.univ-lyon1.fr/ozalid/tconnect/project/Ozalid/TraceCollector/api.php/";
	
	function __construct($repo_uri){
		if(isset($repo_uri)){
			$this->uri = $repo_uri;
		}
	}
}
