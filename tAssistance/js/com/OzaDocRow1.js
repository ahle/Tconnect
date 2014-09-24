tAssistance.OzaDocRow1 = function(id,parent, m_doc){
	var doc = m_doc;
	docid = doc.id;
	//user_uri = user.uri;
	//as_trace_uri = user.as_trace_uri;
	as_doc_uri = doc.as_doc_uri;
	//as_doc_uri = user.as_doc_uri;
	
	var doc_row = document.createElement("div");
	doc_row.setAttribute("class","ozatracelist-trace");
	
	var doc_icon = document.createElement("span");
	doc_icon.setAttribute("class","glyphicon glyphicon-file");
	
	doc_row.appendChild(doc_icon);
	
	var doc_title = document.createElement("a");
	doc_title.setAttribute("href", as_doc_uri);
	doc_title.innerHTML = m_doc.title.substring(0, 50) || "Tous";
	
	doc_row.appendChild(doc_title);
		
	parent.element.appendChild(doc_row);
	
};