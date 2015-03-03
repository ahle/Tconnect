tCollector.OzaTCollectorClient = function(){
	this.uri = "http://localhost/tconnect/project/Ozalid/TraceCollector/";
	
	this.getIndexPageUri = function(){
		return this.uri+"index.php";
	}
};