tAssistance.OzaUserRow = function(id,parent, m_user){
	var user = m_user;
	userid = user.id;
	user_uri = user.uri;
	//as_trace_uri = user.as_trace_uri;
	as_user_uri = user.as_user_uri;
	//as_doc_uri = user.as_doc_uri;
	
	var user_row = document.createElement("div");
	user_row.setAttribute("class","ozatracelist-trace");
	
	var user_icon = document.createElement("span");
	user_icon.setAttribute("class","glyphicon glyphicon-user");
	
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
		
	parent.element.appendChild(user_row);	
};