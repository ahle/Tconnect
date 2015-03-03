tAssistance.OzaUserListMaker = function(id, element, s_users){
	this.element = element;
	
	for(i=0; i<s_users.length;i++){
		var s_user = s_users[i];
		var m_user = s_user;
		// add the computed information to the user
		var assistant = new tAssistance.OzaAssistantClient();
		m_user.as_user_uri = assistant.getUserUri(m_user.uri);
		
		var params = {
			"user": m_user
		};
		
		var row = new tAssistance.dom.OzaUserRow(params);
		
		element.appendChild(row);
	}
	
};