tStore.OzaTStoreClient = function(){
	
	//this.uri = "http://dsi-liris-silex.univ-lyon1.fr/ozalid/tconnect/project/Ozalid/TStore/api.php/";// use this line for git
	//this.uri = "http://localhost/tconnect/project/Ozalid/TStore/api.php/";// use this line for local dev
	//this.index_uri = "http://localhost/tconnect/project/Ozalid/TStore/index.php";// use this line for local dev
	
	this.uri = "http://88.191.236.98/tconnect/project/Ozalid/TStore/api.php/";// use this line for local dev
	this.index_uri = "http://88.191.236.98/tconnect/project/Ozalid/TStore/index.php";// use this line for local dev
	
	this.getTraceUri = function(trace_id){
		var trace_uri = this.uri + "traces?traceid=" + trace_id;
		return trace_uri;
	};
	
	this.getAllTraces = function(){
		var uri = this.uri + "traces";
		return uri;
	};
	
	this.getUserUri = function(user_id){
		var user_uri = this.uri + "users?userid=" + user_id;
		return user_uri;
	};
	
	this.getAllUsers = function(){
		var uri = this.uri + "users";
		return uri;
	};
	
	this.getDocUri = function(doc_id){
		var doc_uri = this.uri + "docs?docid=" + doc_id;
		return doc_uri;
	};
	
	this.getAllDocs = function(){
		var uri = this.uri + "docs";
		return uri;
	};

	this.getCustomTrace = function(params){
		
		var queryString = "";
		for(var i in params){
			queryString+=i+"="+params[i]+"&";			
		}		
		
		var uri = this.uri + "traces?" + queryString;
		return uri;
	}
};