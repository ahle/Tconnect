tAssistance.OzaDocRow1 = function(id,parent, m_doc){
	this.doc = m_doc;
	//this.parent = parent;
	
	var doc = m_doc;
	var docid = doc.id;

	as_doc_uri = doc.as_doc_uri;

	// build an dom
	var doc_row_el = new tAssistance.dom.OzaDocRow1(id, doc);
	
	
	parent.element.appendChild(doc_row_el);
	this.element = doc_row_el;
};