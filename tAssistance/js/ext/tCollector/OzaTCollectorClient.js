tCollector.OzaTCollectorClient = function(){
	//this.uri = "http://localhost/tconnect/project/Ozalid/TraceCollector/"; // use this line for local dev
	this.uri = "http://dsi-liris-silex.univ-lyon1.fr/ozalid/tconnect/project/Ozalid/TraceCollector/";// use this line for git
	
	this.getIndexPageUri = function(){
		return this.uri+"index.php";
	}
};