tAssistance.OzaAssistantClient = function(){
	//this.uri = "http://localhost/tconnect/tAssistance/";// use this line for local dev
	this.uri = "http://dsi-liris-silex.univ-lyon1.fr/ozalid/tconnect/tAssistance/";// use this line for git
	
	this.getTraceUri = function(trace_uri){
		var as_trace_uri = this.uri + "index.php?page=Trace&trace_uri=" + trace_uri;
		return as_trace_uri;
	};
	
	this.getUserUri = function(user_uri){
		var as_user_uri = this.uri + "index.php?page=User&user_uri=" + user_uri;
		return as_user_uri;
	};
	
	this.getDocUri = function(doc_uri){
		var as_doc_uri = this.uri + "index.php?page=Doc&doc_uri=" + doc_uri;
		return as_doc_uri;
	};
};