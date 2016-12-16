tAssistance.dom.TraceListMode = function(){
	
	var btn_group = document.createElement("div");
	btn_group.setAttribute("class","btn-group");
	btn_group.setAttribute("role","group");
	$(btn_group).css("margin","5px");
	
	var btn_user_mode = document.createElement("button");
	btn_user_mode.setAttribute("name","user");
	btn_user_mode.setAttribute("class","btn btn-default");
	btn_user_mode.innerHTML="User";
	
	var btn_doc_mode = document.createElement("button");
	btn_doc_mode.setAttribute("name","doc");
	btn_doc_mode.setAttribute("class","btn btn-default");
	btn_doc_mode.innerHTML="Document";
	
	btn_group.appendChild(btn_user_mode);
	btn_group.appendChild(btn_doc_mode);
	
	return btn_group;
};

tAssistance.dom.ObselToggleButton = function(params){
	var active = params.active;
	
	var active = document.createElement("a");
	active.innerHTML = active ? "show" : "hide";
	$(active).css("margin-left","5px");
	
	return active;
};

tAssistance.dom.ImagePreview = function(){
	
	var container = document.createElement("div");
	container.setAttribute("class","fileinput fileinput-new");
	container.setAttribute("data-provides","fileinput");
	
	var thumbnail = document.createElement("div");
	thumbnail.setAttribute("class","fileinput-new thumbnail");
	thumbnail.setAttribute("style","width: 64px; height: 64px;");
	
	container.appendChild(thumbnail);
	
	var img = document.createElement("img");
	img.setAttribute("src","img/holder/holder64x64.png");
	img.setAttribute("alt","...");
	
	thumbnail.appendChild(img);
	
	var preview = document.createElement("div");
	preview.setAttribute("class","fileinput-preview fileinput-exists thumbnail");
	preview.setAttribute("style","max-width: 200px; max-height: 150px;");
	
	container.appendChild(preview);
	
	var btn_group = document.createElement("div");
	
	container.appendChild(btn_group);
	
	var btn_file = document.createElement("span");
	btn_file.setAttribute("class","btn btn-default btn-file");
	
	btn_group.appendChild(btn_file);
	
	var fileinput_new = document.createElement("span");
	fileinput_new.setAttribute("class","fileinput-new");
	fileinput_new.innerHTML="Select image";
	
	btn_file.appendChild(fileinput_new);
	
	var fileinput_exists = document.createElement("span");
	fileinput_exists.setAttribute("class","fileinput-exists");
	fileinput_exists.innerHTML="Change";
	
	btn_file.appendChild(fileinput_exists);
	
	var fileinput = document.createElement("input");
	fileinput.setAttribute("type","file");
	//fileinput.setAttribute("name","...");
	
	btn_file.appendChild(fileinput);
	
	var fileremove = document.createElement("a");
	fileremove.setAttribute("href","#");
	fileremove.setAttribute("class","btn btn-default fileinput-exists");
	fileremove.setAttribute("data-dismiss","fileinput");
	fileremove.innerHTML="Remove";
	
	btn_group.appendChild(fileremove);
	
	return container;	
};

tAssistance.dom.More = function(params){
	
	var div = document.createElement("div");
	
	var title = document.createElement("div");
	title.setAttribute("class","title");
	$(title).css("display","inline");
	
	var btn = document.createElement("a");
	btn.setAttribute("more","More");
	btn.setAttribute("less","Less");
	btn.innerHTML = "More";
	
	var details = document.createElement("p");
	details.setAttribute("class","details");
	$(details).css("display","none");
	
	div.appendChild(title);
	div.appendChild(document.createTextNode(" ["));
	div.appendChild(btn);
	div.appendChild(document.createTextNode("]"));
	div.appendChild(details);
		
	btn.onclick = function(){
		
		var display = details.style.display;
		if(display=="none"){
			btn.innerHTML = btn.getAttribute("less");
			details.style.display = "block";
		}
		else{
			btn.innerHTML = btn.getAttribute("more");
			details.style.display = "none";
		}	
	};	
	
	return div;
};
