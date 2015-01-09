tAssistance.dom.CenterLine = function(width, height){
	var svgNS = "http://www.w3.org/2000/svg";
	var center = document.createElementNS(svgNS,"line");
	center.setAttribute("x1", width/2);
	center.setAttribute("y1", 0);
	center.setAttribute("x2", width/2);
	center.setAttribute("y2", height);
	center.setAttribute("style", "stroke:red;stroke-width:0.3");
	
	return center;
};