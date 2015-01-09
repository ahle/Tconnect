tAssistance.OzaTDocListMaker = function(id, element, s_docs){
	var docList = new tAssistance.OzaDocList1(id, s_docs);
	docList.element = element;
	docList.children = [];
	
	for(i=0; i<s_docs.length;i++){
		var s_doc = s_docs[i];
		var m_doc = s_doc;
		// add the computed information to the user
		// var assistant = new tAssistance.OzaAssistantClient();
		// m_user.as_user_uri = assistant.getUserUri(m_user.uri);
				
		var row = new tAssistance.OzaDocRow1("abd", docList, m_doc);
		row.parent = docList;
		docList.children.push(row);
	}
	
	this.docList = docList;
};