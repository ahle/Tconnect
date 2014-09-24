tAssistance.MainPage = function(){
	
	jQuery.getJSON(url,function(data){
		
		var trace = data;
		
		var widget = new tAssistance.OzaTraceWidget("abc",test1, trace);
		
	});
	
};