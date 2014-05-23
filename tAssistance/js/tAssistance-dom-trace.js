tAssistance.domTrace = function(parentNode,trace){
	obsels = trace.obsels;
	//width = 1500;
	height = 150;
	width = parentNode.clientWidth - 20;
	
	opts = {
			x_unit: 20,
			x0: 0,
			y0: 40
	};
	//make a div
	var traceid =  "trace"+(new Date()).getTime();
	
	var div = document.createElement("div");
	div.setAttribute("style","width: "+width+"px; border: solid 1px black");
	div.setAttribute("id",traceid)
	parentNode.appendChild(div);	
	
	var zoom_id = "zoom"+(new Date()).getTime();
	div.innerHTML = '<div><div class="zoom_out"></div><input id="'+zoom_id+'" type="range" class="span3 slider" value="0"><div class="zoom_in"></div><button type="button" class="close" aria-hidden="true" onclick=\'document.getElementById("'+traceid+'").innerHTML="";\'>×</button></div>';
	// make slider
	//slider = div.getElementsByClassName("slider");
	
	$("#"+zoom_id).slider({
		formater: function(value){
			return tAssistance.datetime.unitTexts[parseInt(value)];
		},
		value: 0,
		min: 0,
		max: 10,
		step: 1,
		selection: 'none',
		tooltip: 'show'
	}).on('slideStop', function(ev){
		console.log(ev.value);
		var units = tAssistance.datetime.units;
		var unitTexts = tAssistance.datetime.unitTexts;
		//var rangevalue = document.getElementById('rangevalue');
		
		iUnit = parseInt(ev.value);
		
		//rangevalue.value = unitTexts[iUnit];				
		// create an event for update the trace
		
		$("#"+zoom_id).trigger("changeSetting",{
			unit: iUnit,
			unitText: unitTexts[iUnit],
			time: new Date(),
		});
	});	
	
	// make a svg
	var svgNS = "http://www.w3.org/2000/svg";

	var svg = document.createElementNS(svgNS,"svg");
	svg.setAttribute("version","1.2");
	svg.setAttribute("style","overflow: hidden");// issue #1: obsels overflows the svg element in IE 
	svg.setAttribute("viewBox","0 0 "+width+" "+height);
	svg.setAttribute("draggable","false");
	svg.setAttribute("width",width+"px");
	svg.setAttribute("height",height+"px");
	
	div.appendChild(svg);
	// make a rect for mouse
	var rect = document.createElementNS(svgNS,"rect");
	rect.setAttribute("style","fill: #F9F9F9");
	rect.setAttribute("width","100%");
	rect.setAttribute("height","100%");
	
	svg.appendChild(rect);
	
	var group = new tAssistance.group(svg, width, trace.id);
	
	var center = document.createElementNS(svgNS,"line");
	center.setAttribute("x1", width/2);
	center.setAttribute("y1", 0);
	center.setAttribute("x2", width/2);
	center.setAttribute("y2", height);
	center.setAttribute("style", "stroke:red;stroke-width:0.3");
	svg.appendChild(center);
	
	drawedObsels = group.addObsels(obsels);
	
	//drawedObsels = tAssistance.group.drawObsels(obsels, g);
	//tAssistance.group.drawYears(drawedObsels);
	//tAssistance.group.drawMonths1(drawedObsels);
	
	// add Keydown event
//    $(svg).keydown(function(e){
//    	tAssistance.processKeyPress(g,e);
//    });		    
	// add MouseEvents		    
    tAssistance.mousepad(rect,group);
//    
//    // add TouchEvents
//    tAssistance.touchpad(rect,g);
//    // fire events for loading traces
//	//fnSuccess();
    // add listeners
    $("#"+zoom_id).on("changeSetting", function(e, data){
		g = group;
		g.scaleLevel = data.unit;
		g.scale_x_time = 1000/tAssistance.datetime.units[g.scaleLevel];
		
		
		g.update();
	});
    
    
    if(tAssistance.debug){// debug
    	window.svg = svg;
    }		
};