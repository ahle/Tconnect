tAssistance.OzaWordRow = function(id, parent, word){
	this.word = word;
	this.parent = parent;
	//this.word.id = word.idWord;
	
	//var doc = m_doc;

	// build an dom
	var word_row_el = new tAssistance.dom.OzaWordRow(id, word);
	
	
	parent.element.appendChild(word_row_el);
	this.element = word_row_el;
};