tAssistance.OzaDocListMaker = function(id, element, s_docs){
	this.element = element;
	
	for(i=0; i<s_docs.length;i++){
		var s_doc = s_docs[i];
		var m_doc = s_doc;
		// add the computed information to the doc
				
		var store = new tStore.OzaTStoreClient();
		m_doc.doc_uri = store.getDocUri(m_doc.id);
		
		var assistant = new tAssistance.OzaAssistantClient();
		m_doc.as_doc_uri = assistant.getDocUri(m_doc.doc_uri);
		
		var row = new tAssistance.OzaDocRow("abd", this, m_doc);
	}
	
	this.paint = function(){
		
	};
	
	
};