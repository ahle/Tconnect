tAssistance.dom.TextButton = function(text, class_name){
	
	var btn = document.createElement("button");
	btn.setAttribute("class","btn btn-default");
	btn.setAttribute('style', 'margin: 5px' );
	btn.innerHTML = text;
	
	return btn;
};

tAssistance.dom.CircleButton = function(params){
	
	var text = params.text;
		
	var btn = document.createElement("a");
	btn.setAttribute("class","btn btn-default");
	
	$(btn).css("width","30px");
	$(btn).css("height","30px");
	$(btn).css("text-align","center");
	$(btn).css("padding","6px 0");
	$(btn).css("border-radius","15px");
	$(btn).css("font-size","12px");
	$(btn).css("line-height","1.42");
	$(btn).css("border-radius","15px");
	
	var icon = document.createElement("i");	
	icon.setAttribute("class","fa fa-user");
	
	btn.appendChild(icon);
	
	btn.innerHTML = text;
	
	return btn;
};