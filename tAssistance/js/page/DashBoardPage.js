tAssistance.DashBoardPage = function(){
	
	var wordFre = new tAssistance.OzaWordFreMaker();
	
	var url = "http://localhost/tconnect/project/Ozalid/TStore/api.php/docs";
	
	jQuery.getJSON(url,function(data){
		
		var docs = data;
		
		// add trace_uri to trace
		for(var i = 0; i<docs.length;i++){
			var doc = docs[i];
			var store = new tStore.OzaTStoreClient();
			var doc_uri = store.getDocUri(doc.id);
			
			doc.uri = doc_uri;
		}
		
		//var trace_search = new tAssistance.OzaTraceSearch("bcd", document.body);
		
		var doc_list_widget = new tAssistance.OzaTDocListMaker("abc",document.body, docs);
		
	});	
	
};