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

tAssistance.dom.DashboardIcon = function(){
	var icon = document.createElement("img");
	icon.setAttribute("src","img/icon-dashboard.png");
	icon.setAttribute("height","14px");
	icon.setAttribute("width","14px");
	$(icon).css("margin-right","5px");
	
	return icon;
};

tAssistance.dom.CheckIcon = function(){
	var icon = document.createElement("span");
	icon.setAttribute("class","glyphicon glyphicon-ok");
	$(icon).css("margin-right","5px");
	
	return icon;
};

tAssistance.dom.ObselIconRow = function(params){
	var icon_data = params.icon;
	
	//alert(icon.title);
	
	var obsel_icon = document.createElement("div");
	$(obsel_icon).hover(function(){
	    $(obsel_icon).css("background-color", "orange");
	    }, function(){
	    $(obsel_icon).css("background-color", "");
	});
	
	var icon = document.createElement("img");
	icon.setAttribute("src",icon_data.img);
	icon.setAttribute("height","20px");
	icon.setAttribute("width","20px");
	$(icon).css("margin-right","5px");
	
	obsel_icon.appendChild(icon);
	
	var title = document.createElement("span");
	title.innerHTML = icon_data.title;
	
	obsel_icon.appendChild(title);
	
	return obsel_icon;
};