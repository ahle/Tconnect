tAssistance.OzaAssistantClient = function(){
	this.uri = "http://localhost/tconnect/tAssistance/";
	
	this.getTraceUri = function(trace_uri){
		var as_trace_uri = this.uri + "index.php?page=Trace&trace_uri=" + trace_uri;
		return as_trace_uri;
	};
	
	this.getUserUri = function(user_uri){
		var as_user_uri = this.uri + "index.php?page=User&user_uri=" + user_uri;
		return as_user_uri;
	};
};