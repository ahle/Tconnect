tAssistance.DocListPage = function(){
	
	var tStore = tStore.OzaTStoreClient();
	var uri = tStore.getAllDocs();
	
	var url = uri;
	
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
		
		var doc_list_widget = new tAssistance.OzaDocListMaker("abc",document.body, docs);
		
	});	
};