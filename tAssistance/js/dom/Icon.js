tAssistance.dom.TraceIcon = function(){
	var trace_icon = document.createElement("img");
	trace_icon.setAttribute("src","img/trace.png");
	trace_icon.setAttribute("height","14px");
	trace_icon.setAttribute("width","14px");
	
	return trace_icon;
};

tAssistance.dom.UserIcon = function(){
	var user_icon = document.createElement("span");
	user_icon.setAttribute("class","glyphicon glyphicon-user");
	$(user_icon).css("margin-right","5px");
	
	return user_icon;
};

tAssistance.dom.DocIcon = function(){
	var doc_icon = document.createElement("span");
	doc_icon.setAttribute("class","glyphicon glyphicon-file");
	$(doc_icon).css("margin-right","5px");
	
	return doc_icon;
};