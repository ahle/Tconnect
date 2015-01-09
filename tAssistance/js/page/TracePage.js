tAssistance.TracePage = function(trace_uri, user_id){
	
	var test1 = document.getElementById("test1");
	
	//var url = trace_uri;
	window.page = {};
	
	var store = new tStore.OzaTStoreClient();
	var user_uri = store.getUserUri("Alain");
	
	jQuery.when(
		jQuery.getJSON(trace_uri,function(data){	
			var trace = data;
			
			// save the trace to the store
			var store = new tStore.OzaTStore();
			store.deleteTrace(trace.id);
			store.addTrace(trace);
			
			window.page.trace = trace;
		}),
		
		jQuery.getJSON(user_uri,function(data){
			var user = data;
			
			window.page.user = user;
		})
		
	).then(function(){
		var trace = window.page.trace;
		var user = window.page.user;
		
		var widget = new tAssistance.OzaGraTraceMaker("abc", trace, user);
		
		
		
	});
	
	
	
};