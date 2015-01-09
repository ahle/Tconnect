tAssistance.OzaWordListMaker = function(id, parent, wordset){
	this.parent = parent;
	var maker = this;
	
		
	var wordList = new tAssistance.OzaWordList(id, parent, wordset);
	//wordList.element = element;
	wordList.children = [];
	
	for(i=0; i<wordset.length;i++){
		var word = wordset[i];
		//var m_doc = word;
		// add the computed information to the user
		// var assistant = new tAssistance.OzaAssistantClient();
		// m_user.as_user_uri = assistant.getUserUri(m_user.uri);
				
		var row = new tAssistance.OzaWordRow("abd", wordList, word);
		row.parent = wordList;
		wordList.children.push(row);
	}
	
	maker.wordList = wordList;
	
};