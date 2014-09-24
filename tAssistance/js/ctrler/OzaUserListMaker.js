tAssistance.OzaUserListMaker = function(id, element, s_users){
	this.element = element;
	
	for(i=0; i<s_users.length;i++){
		var s_user = s_users[i];
		var m_user = s_user;
		// add the computed information to the user
		var assistant = new tAssistance.OzaAssistantClient();
		m_user.as_user_uri = assistant.getUserUri(m_user.uri);
				
		var row = new tAssistance.OzaUserRow("abd", this, m_user);
	}
	
};