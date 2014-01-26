tAssistance.trace_view = function(options){
	var trace_uri = options.trace_uri;
	var fnSuccess = options.success;
	
	function parse_trace_uri(trace_uri){
		var str = trace_uri;
		lastChar = str.substr(str.length-1);
		if(lastChar == "/"){
			str = str.substr(0,str.length-1);
		}
		//console.log("***");
		lastIndexOfSlash = str.lastIndexOf("/");
		if(lastIndexOfSlash!=-1)
		base_uri = str.substr(0,lastIndexOfSlash+1);
		trace_name = str.substr(lastIndexOfSlash+1,str.length);
		
		ret = {
				"base_uri": base_uri,
				"trace_name": trace_name
		}
		return ret;
	}
	
	var base_uri = parse_trace_uri(trace_uri).base_uri;
	
	var mgr = new tService.TraceManager({
		"base_uri": base_uri,
		async: true
	});
	trc = mgr.init_trace({
		name: trace_name
	});
	trc.get_obsels({
		success: function(obsels){
			// save received obsels in the localStorage
			tAssistance.obsels.setLocalObsels(obsels);
			
			
			console.log("test trace_read correctly");
			
			//var widget = new tAssistance.draw_obsels1({
			//	"obsels": obsels,
			//	"source": trace_uri,
			//	"parentNode": document.getElementById("tracePanel")
			//});
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
			svg.setAttribute("viewBox","0 0 1000 300");
			svg.setAttribute("draggable","false");
			svg.setAttribute("width","1000px");
			svg.setAttribute("height","300px");
			
			$("#tracePanel").get(0).appendChild(svg);
			
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
							
			drawedObsels = tAssistance.group.drawObsels(obsels, g);
			tAssistance.group.drawYears(drawedObsels);
			tAssistance.group.drawMonths1(drawedObsels);
			
			// add Keydown event
		    $(svg).keydown(function(e){
		    	tAssistance.processKeyPress(g,e);
		    });		    
	    	// add MouseEvents		    
		    tAssistance.mousepad(rect,g);
		    
		    // add TouchEvents
		    tAssistance.touchpad(rect,g);
		    // fire events for loading traces
			fnSuccess();
			
		    if(tAssistance.debug){// debug
		    	window.svg = svg;
		    }			    
		}
	});		
};