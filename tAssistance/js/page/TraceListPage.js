tAssistance.TraceListPage = function(){
	
	var url = "http://localhost/tconnect/project/Ozalid/TStore/api.php/traces";
	
	jQuery.getJSON(url,function(data){
		
		var traces = data;
		
		// add trace_uri to trace
		for(var i = 0; i<traces.length;i++){
			var trace = traces[i];
			var store = new tStore.OzaTStoreClient();
			var trace_uri = store.getTraceUri(trace.id);
			
			trace.uri = trace_uri;			
		}	
		
		//var trace_search = new tAssistance.OzaTraceSearch("bcd", document.body);
		
		var trace_list_widget = new tAssistance.OzaTraceListMaker("abc",document.body, traces);
		
	});	
};