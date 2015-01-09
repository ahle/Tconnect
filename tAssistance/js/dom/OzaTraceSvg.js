tAssistance.dom.OzaTraceSvg = function(width, height){
	this.width = width;
	this.height = height;
	
	var svgNS = "http://www.w3.org/2000/svg";

	var svg = document.createElementNS(svgNS,"svg");
	svg.setAttribute("version","1.2");
	svg.setAttribute("style","overflow: hidden");// issue #1: obsels overflows the svg element in IE 
	svg.setAttribute("viewBox","0 0 "+width+" "+height);
	svg.setAttribute("draggable","false");
	svg.setAttribute("width",width+"px");
	svg.setAttribute("height",height+"px");
		
	return svg;
};