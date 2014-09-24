tAssistance.OzaDocListMaker = function(id, element, s_docs){
	this.element = element;
	
	for(i=0; i<s_docs.length;i++){
		var s_doc = s_docs[i];
		var m_doc = s_doc;
		// add the computed information to the user
		//var assistant = new tAssistance.OzaAssistantClient();
		//m_user.as_user_uri = assistant.getUserUri(m_user.uri);
				
		var row = new tAssistance.OzaDocRow("abd", this, m_doc);
	}
	
};