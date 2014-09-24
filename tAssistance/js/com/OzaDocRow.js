tAssistance.OzaDocRow = function(id,parent, m_doc){
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
	
	var doc_id = document.createElement("a");
	doc_id.setAttribute("href", as_doc_uri);
	doc_id.innerHTML = docid || "Tous";
	
	doc_row.appendChild(doc_id);
		
	var more_btn = document.createElement("span");
	more_btn.appendChild(document.createTextNode("["));
	
	doc_row.appendChild(more_btn);
	
	var more_a = document.createElement("a");
	more_a.href = "#";
	more_a.dataset["less"] = "Less";
	more_a.dataset["more"] = "More";
	more_a.innerHTML = "More";
	
	// add UI dom events
	more_a.onclick = function(){
		var details_node = this.parentNode.parentNode.getElementsByTagName("p")[0];
		if(details_node){
			var display = details_node.style.display;
			if(display=="none"){
				this.innerHTML = this.dataset["less"];
				details_node.style.display = "block";
			}
			else{
				this.innerHTML = this.dataset["more"];
				details_node.style.display = "none";
			}
		}
	};
	
	
	more_btn.appendChild(more_a);
	
	more_btn.appendChild(document.createTextNode("]"));
	
	var more_detail = document.createElement("p");
	more_detail.style.display = "none";
	
	doc_row.appendChild(more_detail);
	
	parent.element.appendChild(doc_row);
	
	var image =  document.createElement("img");
	image.src = doc.img;
	//image.style.display = "block";
	
	var title =  document.createElement("span");
	title.innerHTML = "Title: "+doc.title;
	title.style.display = "block";
	
	var author = document.createElement("span");
	author.innerHTML = "Auteur: "+doc.author;
	author.style.display = "block";
	
	var date = document.createElement("span");
	date.innerHTML = "Date: "+doc.date;
	date.style.display = "block";
	
	more_detail.appendChild(image);	
	more_detail.appendChild(title);	
	more_detail.appendChild(author);	
	more_detail.appendChild(date);
	
};