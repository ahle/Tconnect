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
		
		var shared = {
		};
		
		var params = {
			"id": "abc",
			"traces": traces,
			"shared": shared,
			"mode": "doc"
		};		
		
		var page_place = document.querySelector("[placeholder='page']");
		
		var listmode = new tAssistance.TraceListBtnMaker(params);
		
		page_place.appendChild(listmode);
		
		var list = new tAssistance.OzaTraceListByDocMaker(params);
		
		page_place.appendChild(list);
		
		shared.container = list;
	});	
};