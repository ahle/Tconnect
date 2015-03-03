tAssistance.TraceListPage = function(){
	
	var store = new tStore.OzaTStoreClient();
	var uri = store.getAllTraces();
	
	var url = uri;
	
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
		
		var params = {
			"id": "abc",
			"traces": traces
		};
		
		var list = new tAssistance.OzaTraceListByDocMaker(params);
		
		var page_place = document.querySelector("[placeholder='page']");
		
		page_place.appendChild(list);
	});	
};