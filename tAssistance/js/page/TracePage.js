tAssistance.TracePage = function(trace_uri){
	
	var test1 = document.getElementById("test1");
	
	//var url = trace_uri;
	
	jQuery.getJSON(trace_uri,function(data){
		
		var trace = data;
		
		var store = new tStore.OzaTStore();
		store.deleteTrace(trace.id);
		store.addTrace(trace);
				
		var trace = data;
		
		var widget = new tAssistance.OzaTraceWidget("abc",test1, trace);
		
	});
	
};