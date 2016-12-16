tAssistance.dom.TextInput = function(text){
	
	var input = document.createElement("input");
	input.setAttribute("class","form-control");
	$(input).css("width","200px");
	
	return input;
};