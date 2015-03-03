tAssistance.dom.UserLink = function(params){
	var id = params.id;
	var user = params.user;
	
	userid = user.id;
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

tAssistance.dom.OzaUserRow = function(params){
	
	var user = params.user;
	
	userid = user.id;
	user_uri = user.uri;
	as_user_uri = user.as_user_uri;
	
	var user_row = document.createElement("div");
	user_row.setAttribute("class","ozatracelist-trace");
	
	user_icon = new tAssistance.dom.UserIcon();
	
	user_row.appendChild(user_icon);
	
	var user_id = document.createElement("a");
	user_id.setAttribute("href", as_user_uri);
	user_id.innerHTML = userid || "Tous";
	
	user_row.appendChild(user_id);
		
	var more_btn = document.createElement("span");
	more_btn.appendChild(document.createTextNode("["));
	
	user_row.appendChild(more_btn);
	
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
	
	user_row.appendChild(more_detail);
		
	return user_row;
};