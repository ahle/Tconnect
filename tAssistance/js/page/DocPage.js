tAssistance.DocPage = function(doc_uri){
	
	var test1 = document.getElementById("test1");
	
	var tstore = new tStore.OzaTStoreClient();
	var url = tstore.getDocUri("538c8490e4b04f38ac7352c1");
	//var url = "http://localhost/tconnect/project/Ozalid/TStore/api.php/docs?docid=";
	
	jQuery.getJSON(doc_uri,function(data){
		
		var doc = data;
				
		var widget = new tAssistance.OzaDocMaker(doc);
		
	});
	
};