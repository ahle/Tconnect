tAssistance.dom.OzaTraceRow = function(params){
	var id = params.id;
	var trace = params.trace;
	
	traceid = trace.id;
	trace_uri = trace.uri;
	as_trace_uri = trace.as_trace_uri;
	as_user_uri = trace.as_user_uri;
	as_doc_uri = trace.as_doc_uri;
	
	var trace_line = document.createElement("div");
	trace_line.setAttribute("class","ozatracelist-trace");
	$(trace_line).css("margin", "5px");
	$(trace_line).css("display", "inline-block");
	$(trace_line).css("vertical-align", "top");
	$(trace_line).css("width", "300px");
	
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
	
	trace_line.appendChild(document.createElement("br"));
	
	var user_icon = document.createElement("span");
	user_icon.setAttribute("class","glyphicon glyphicon-user");
	
	trace_line.appendChild(user_icon);
	
	var user_id = document.createElement("a");
	user_id.setAttribute("href", as_user_uri);
	user_id.innerHTML = trace.properties.userid || "Tous";
	
	trace_line.appendChild(user_id);
	
	trace_line.appendChild(document.createElement("br"));
	
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
	
	return trace_line;
};

// User Trace inside Doc group

tAssistance.dom.OzaUserTraceLink = function(params){
	var id = params.id;
	var trace = params.trace;
	
	traceid = trace.id;
	trace_uri = trace.uri;
	as_trace_uri = trace.as_trace_uri;
		
	var trace_line = document.createElement("div");
	//trace_line.setAttribute("class","ozatracelist-trace");
	$(trace_line).css("margin", "5px");
	$(trace_line).css("display", "inline-block");
	//$(trace_line).css("vertical-align", "top");
	//$(trace_line).css("width", "300px");
	
	var user_icon = new tAssistance.dom.UserIcon();
	
	trace_line.appendChild(user_icon);
	
	var trace_text =  document.createElement("a");
	trace_text.setAttribute("href", as_trace_uri);
	trace_text.innerHTML = ""+trace.properties.userid || "Tous";
	//trace_name.setAttribute("width","14px");
	
	trace_line.appendChild(trace_text);
			
	return trace_line;
};

tAssistance.dom.OzaDocTraceLink = function(params){
	var id = params.id;
	var trace = params.trace;
	var title = trace.properties.document_title;
	
	traceid = trace.id;
	trace_uri = trace.uri;
	as_trace_uri = trace.as_trace_uri;
		
	var trace_line = document.createElement("div");
	//trace_line.setAttribute("class","ozatracelist-trace");
	$(trace_line).css("margin", "5px");
	$(trace_line).css("display", "block");
	//$(trace_line).css("vertical-align", "top");
	//$(trace_line).css("width", "300px");
	
	var doc_icon = new tAssistance.dom.DocIcon();
	
	trace_line.appendChild(doc_icon);
	
	var trace_text =  document.createElement("a");
	trace_text.setAttribute("href", as_trace_uri);
	trace_text.innerHTML = ""+title || "Tous";
	//trace_name.setAttribute("width","14px");
	
	trace_line.appendChild(trace_text);
			
	return trace_line;
};

tAssistance.dom.TraceLink = function(params){
	var id = params.id;
	var trace = params.trace;
	
	traceid = trace.id;
	trace_uri = trace.uri;
	as_trace_uri = trace.as_trace_uri;
		
	var link = document.createElement("div");
	$(link).css("margin", "5px");
	$(link).css("display", "inline");
	
	var trace_icon = document.createElement("img");
	trace_icon.setAttribute("src","img/trace.png");
	trace_icon.setAttribute("height","14px");
	trace_icon.setAttribute("width","14px");
	
	link.appendChild(trace_icon);
	
	var trace_text =  document.createElement("a");
	trace_text.setAttribute("href", as_trace_uri);
	trace_text.innerHTML = "Trace";
	
	link.appendChild(trace_text);
			
	return link;	
}

tAssistance.dom.OzaDocTraceHeading = function(params){
	
	var id = params.id;
	var doc = params.doc;
	var trace = params.trace;
	
	docid = doc.id;
		
	var heading = document.createElement("div");
	heading.setAttribute("class","ozatracelist-trace");
	
	var doc_icon = tAssistance.dom.DocIcon();
	heading.appendChild(doc_icon);
	
	var title =  document.createElement("span");
	title.innerHTML = "Title: "+doc.title;
	title.style.display = "inline";
	
	if(trace){
		title = document.createElement("a");
		title.innerHTML = "Title: "+doc.title;
		title.href = trace.as_trace_uri;
		title.style.display = "inline";		
	}
	
	heading.appendChild(title);	
	
//	if(trace){
//		var params = {
//			"trace": trace
//		};
//		
//		trace_link = new tAssistance.dom.TraceLink(params);
//		heading.appendChild(trace_link);
//	}
	
	return heading;
};

tAssistance.dom.OzaUserTraceHeading = function(params){
	
	var id = params.id;
	var user = params.user;
	var trace = params.trace;
	
	//docid = doc.id;
		
	var heading = document.createElement("div");
	heading.setAttribute("class","ozatracelist-trace");
	
	var user_icon = tAssistance.dom.UserIcon();
	heading.appendChild(user_icon);
	
	var title =  document.createElement("span");
	title.innerHTML = ""+user.id;
	title.style.display = "inline";
	
	if(trace){
		title = document.createElement("a");
		title.innerHTML = ""+user.id;
		title.href = trace.as_trace_uri;
		title.style.display = "inline";		
	}
	
	heading.appendChild(title);
	
	return heading;
};