tAssistance.OzaWordList = function(id, parent, words){
	this.id = id;
	this.words = words;
	this.selectedWords = false;
	this.children = [];
	
	// build an dom
	var word_list_el = new tAssistance.dom.OzaWordList(id, words);
	
	
	parent.element.appendChild(word_list_el);
	this.element = word_list_el;
};