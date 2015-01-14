tAssistance.UserListPage = function(){
	
	var store = new tStore.OzaTStoreClient();
	var uri = store.getAllUsers();
	
	var url = uri;
	
	jQuery.getJSON(url,function(data){
		
		var traces = data;
		
		// add trace_uri to trace
		for(var i = 0; i<traces.length;i++){
			var trace = traces[i];
			var store = new tStore.OzaTStoreClient();
			var trace_uri = store.getUserUri(trace.id);
			
			trace.uri = trace_uri;
		}
		
		//var trace_search = new tAssistance.OzaTraceSearch("bcd", document.body);
		
		var trace_list_widget = new tAssistance.OzaUserListMaker("abc",document.querySelector("[placeholder='page']"), traces);
		
	});	
};