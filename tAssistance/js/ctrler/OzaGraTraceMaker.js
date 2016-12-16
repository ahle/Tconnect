tAssistance.OzaGraTraceMaker = function(params){
	var id = params.id;
	var trace = params.trace;
	var page = params.page;
	var userconfig = params.userconfig;
	var width = params.width ? params.width : 1000;
	var height = params.height ? params.height : 250;
		
	console.log(trace);
	
//	var width = 1000;
//	var height = 250;
//	
	var container = document.createElement("div");
	
	// make a trace heading
	var heading = tAssistance.dom.OzaTraceHeading1(trace);
	page.appendChild(heading);
		
	// make a trace container
	
	var container = tAssistance.dom.OzaTraceContainer(trace.id);
	page.appendChild(container);
	var heading_place = container.querySelector(".heading");
	var trace_place = container.querySelector(".trace");
	var zoom_place = container.querySelector(".zoom");
	var obsellist_place = container.querySelector(".obselList");
		
	// make a trace buttons
	var btnGrp = tAssistance.dom.OzaTraceBtnGroup(trace.id);	
	heading_place.appendChild(btnGrp);
	
	// make a svg
	
	var params = {
		"width": width,
		"height": height
	};
	
	var svg = tAssistance.dom.OzaTraceSvg(params);
	
	trace_place.appendChild(svg);
	
	// make a rect for mouse
	var rect = tAssistance.dom.MousePad();
	svg.appendChild(rect);
	
	var mousepad = new tAssistance.MousePad();
	mousepad.element = rect;
	
	// make ozaZoom
	var zoom = new tAssistance.OzaZoomMaker(zoom_place);
	
	// add listeners
	$("#"+zoom.id).on("changeSetting", function(e, data){
		g = group;
		g.scaleLevel = data.unit;
		g.scale_x_time = 1000/tAssistance.Datetime.units[g.scaleLevel];
		
		
		g.update();
	});
	
	// make a graTrace
	var gTrace = new tAssistance.OzaGraTrace("aaa", width, height);
	gTrace.element = svg;
	// make a group
	var group_id = "group"+(new Date()).getTime()+Math.floor((Math.random() * 1000) + 1);
	
	var params = {
		"group_id": group_id,
		"gTrace": gTrace,
		"trace": trace,
		"width": width,
		"zoom": 2,
		"userconfig": userconfig
	};
	
	var group = tAssistance.OzaGroupMaker(params);
	
	mousepad.addGroup(group);
	
	var center_line = new tAssistance.dom.CenterLine(width, height);
	svg.appendChild(center_line);
	
	drawedObsels = group.addObsels(trace.obsels);
	
	group.setLabels();
	
	// make a obselList
	var params = {
		"id": "abd",
		"obsels": trace.obsels
	}
	
	var obselList = new tAssistance.OzaObselListMaker(params);
	obsellist_place.appendChild(obselList);
};




