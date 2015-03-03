tAssistance.TracePage = function(trace_uri, user_id){
	
	var test1 = document.getElementById("test1");
	
	//var url = trace_uri;
	window.page = {};
	
	var store = new tStore.OzaTStoreClient();
	var user_uri = store.getUserUri("Alain");
	
	var assistant_store = new tAssistance.Store();
	var userconfig_uri = assistant_store.getUserUri("alain");
			
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
		}),
		jQuery.getJSON(userconfig_uri,function(data){
			var userconfig = data;
			
			window.page.userconfig = userconfig;
		})
		
	).then(function(){
		var trace = window.page.trace;
		var user = window.page.user;
		var userconfig = window.page.userconfig;
		var page = document.body.querySelector("[placeholder='page']");
		
		var params = {
			"id": "abc",
			"trace": trace,
			"page": page,
			"userconfig": userconfig
		}		
		
		var widget = new tAssistance.OzaGraTraceMaker(params);
		
	});
	
	
	
};