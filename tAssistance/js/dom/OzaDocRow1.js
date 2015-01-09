tAssistance.dom.OzaDocRow1 = function(id, m_doc){
	
	var doc = m_doc;
	var docid = doc.id;
	var title = doc.title.substring(0, 50) || "Tous";
	
	var doc_row = document.createElement("div");
	doc_row.setAttribute("class","ozatracelist-trace");
	
	var doc_icon = document.createElement("span");
	doc_icon.setAttribute("class","glyphicon glyphicon-book");
	
	doc_row.appendChild(doc_icon);
	
	var doc_title = document.createElement("a");
	doc_title.setAttribute("href", as_doc_uri);
	doc_title.innerHTML = title;
	
	doc_row.appendChild(doc_title);
	return doc_row;
};