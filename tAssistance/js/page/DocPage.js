tAssistance.DocPage = function(){
	
	var test1 = document.getElementById("test1");
	
	var url = "http://localhost/tconnect/project/Ozalid/TStore/api.php/traces?traceid=t_all";
	
	jQuery.getJSON(url,function(data){
		
		var trace = data;
		
		var store = new tStore.OzaTStore();
		store.deleteTrace(trace.id);
		store.addTrace(trace);
				
		var trace = data;
		
		var widget = new tAssistance.OzaTraceWidget("abc",test1, trace);
		
	});
	
};