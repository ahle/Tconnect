tStore.OzaTStoreClient = function(){
	this.uri = "http://localhost/tconnect/project/Ozalid/TStore/api.php/";
	
	this.getTraceUri = function(trace_id){
		var trace_uri = this.uri + "traces?traceid=" + trace_id;
		return trace_uri;
	};
	
	this.getUserUri = function(user_id){
		var user_uri = this.uri + "users?userid=" + user_id;
		return user_uri;
	};
	
	this.getAllUsers = function(){
		//var trace_uri = this.uri + "traces?traceid=" + trace_id;
		//return trace_uri;
	};
	
	this.getDocUri = function(doc_id){
		var doc_uri = this.uri + "docs?docid=" + doc_id;
		return doc_uri;
	};
	
	this.getAllDocs = function(){
		var uri = this.uri + "docs";
		return uri;
	};
};