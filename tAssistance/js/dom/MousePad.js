tAssistance.dom.MousePad = function(){
	var svgNS = "http://www.w3.org/2000/svg";
	var rect = document.createElementNS(svgNS,"rect");
	rect.setAttribute("style","fill: #F9F9F9");
	rect.setAttribute("width","100%");
	rect.setAttribute("height","100%");
	
	return rect;
};