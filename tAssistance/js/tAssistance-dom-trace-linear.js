tAssistance.domTraceLinear = function(parentNode,trace){
	obsels = trace.obsels;
	
	opts = {
			x_unit: 20,
			x0: 0,
			y0: 40
	};
	
	// make a svg
	var svgNS = "http://www.w3.org/2000/svg";

	var svg = document.createElementNS(svgNS,"svg");
	svg.setAttribute("version","1.2");
	svg.setAttribute("style","overflow: hidden");// issue #1: obsels overflows the svg element in IE 
	svg.setAttribute("viewBox","0 0 1000 150");
	svg.setAttribute("draggable","false");
	svg.setAttribute("width","1000px");
	svg.setAttribute("height","150px");
	
	parentNode.appendChild(svg);
	
	var rect = document.createElementNS(svgNS,"rect");
	rect.setAttribute("style","fill: #F9F9F9");
	rect.setAttribute("width","100%");
	rect.setAttribute("height","100%");
	
	svg.appendChild(rect);
	
	var g = document.createElementNS(svgNS,"g");		
	g.setAttribute("transform","translate(0 0) scale(1 1)");
	g.setAttribute("scale_x_time", 1000/tAssistance.datetime.units[0]);
	g.setAttribute("scaleLevel", "0");
	svg.appendChild(g);
	g.data = {
		"obsels": obsels
	};
	
	var center = document.createElementNS(svgNS,"line");
	center.setAttribute("x1", 500);
	center.setAttribute("y1", 0);
	center.setAttribute("x2", 500);
	center.setAttribute("y2", 300);
	center.setAttribute("style", "stroke:red;stroke-width:0.3");
	svg.appendChild(center);
					
	drawedObsels = tAssistance.group1.drawObsels(obsels, g);
	//tAssistance.group.drawYears(drawedObsels);
	//tAssistance.group.drawMonths1(drawedObsels);
	
	// add Keydown event
//    $(svg).keydown(function(e){
//    	tAssistance.processKeyPress(g,e);
//    });		    
	// add MouseEvents		    
    tAssistance.mousepad(rect,g);
    
    // add TouchEvents
//    tAssistance.touchpad(rect,g);
    // fire events for loading traces
	//fnSuccess();
	
    if(tAssistance.debug){// debug
    	window.svg = svg;
    }		
};