tAssistance.OzaTraceRow = function(id,parent, m_trace){
	var trace = m_trace;
	traceid = trace.id;
	trace_uri = trace.uri;
	as_trace_uri = trace.as_trace_uri;
	as_user_uri = trace.as_user_uri;
	as_doc_uri = trace.as_doc_uri;
	
	var trace_line = document.createElement("div");
	trace_line.setAttribute("class","ozatracelist-trace");
	
	var trace_icon = document.createElement("img");
	trace_icon.setAttribute("src","img/trace.png");
	trace_icon.setAttribute("height","14px");
	trace_icon.setAttribute("width","14px");
	
	trace_line.appendChild(trace_icon);
	
	var trace_id =  document.createElement("a");
	trace_id.setAttribute("href", as_trace_uri);
	trace_id.innerHTML = "Trace ID: "+trace.id;
	//trace_name.setAttribute("width","14px");
	
	trace_line.appendChild(trace_id);
	
	var user_icon = document.createElement("span");
	user_icon.setAttribute("class","glyphicon glyphicon-user");
	
	trace_line.appendChild(user_icon);
	
	var user_id = document.createElement("a");
	user_id.setAttribute("href", as_user_uri);
	user_id.innerHTML = trace.properties.userid || "Tous";
	
	trace_line.appendChild(user_id);
	
	var doc_icon = document.createElement("span");
	doc_icon.setAttribute("class","glyphicon glyphicon-file");
	
	trace_line.appendChild(doc_icon);
	
	var doc_id = document.createElement("a");
	doc_id.setAttribute("href",as_doc_uri);
	doc_id.innerHTML = trace.properties.document_id || "Tous";
	
	trace_line.appendChild(doc_id);
	
	var more_btn = document.createElement("span");
	more_btn.appendChild(document.createTextNode("["));
	
	trace_line.appendChild(more_btn);
	
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
	
	trace_line.appendChild(more_detail);
	
	var valid_word_cnt =  document.createElement("span");
	valid_word_cnt.innerHTML = "Nombre des mots validés: "+trace.stats.validCnt;
	valid_word_cnt.style.display = "block";
	
	var model_trace = document.createElement("span");
	model_trace.innerHTML = "Modèle de trace: "+trace.properties.model;
	model_trace.style.display = "block";
	
	var obsel_cnt = document.createElement("span");
	obsel_cnt.innerHTML = "Nombre des obsels: "+trace.stats.count;
	obsel_cnt.style.display = "block";
	
	more_detail.appendChild(valid_word_cnt);
	
	more_detail.appendChild(model_trace);
	//more_detail.appendChild(document.createElement("br"));
	more_detail.appendChild(obsel_cnt);
	//more_detail.appendChild(document.createElement("br"));
	
	parent.element.appendChild(trace_line);	
};