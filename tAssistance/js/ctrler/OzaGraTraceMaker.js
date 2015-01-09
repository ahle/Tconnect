tAssistance.OzaGraTraceMaker = function(id, trace){
	console.log(trace);
		
	var width = 1500;
	var height = 250;
	
	// make a trace heading
	var heading = tAssistance.dom.OzaTraceHeading1(trace.id);
	document.body.appendChild(heading);
		
	// make a trace container
	
	var container = tAssistance.dom.OzaTraceContainer(trace.id);
	document.body.appendChild(container);
		
	// make a trace buttons
	var btnGrp = tAssistance.dom.OzaTraceBtnGroup(trace.id);
	container.querySelector(".heading").appendChild(btnGrp);
	
	// make a svg
	var svg = tAssistance.dom.OzaTraceSvg(width, height);
	
	container.querySelector(".trace").appendChild(svg);
	
	// make a rect for mouse
	var rect = tAssistance.dom.MousePad();
	svg.appendChild(rect);
	
	var mousepad = new tAssistance.MousePad();
	mousepad.element = rect;
	
	// make ozaZoom
	var zoom = new tAssistance.OzaZoomMaker(container.querySelector(".zoom"));
	
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
	var group = tAssistance.OzaGroupMaker(group_id, gTrace, trace, width, 2);
	
	mousepad.addGroup(group);
	
	var center_line = new tAssistance.dom.CenterLine(width, height);
	svg.appendChild(center_line);
	
	drawedObsels = group.addObsels(trace.obsels);
	
	group.setLabels();
	
	// make a obselList
	var obselList = new tAssistance.OzaObselListMaker("aaa", container.querySelector(".obselList"), trace.obsels);
	
	// make setting
	
	// make sidebar layout
	
	var sidebar = new tAssistance.dom.SidebarLayout();
	
	document.body.appendChild(sidebar);
	
	// make 4 layout
	var layout = new tAssistance.dom.Gird4Layout();
	
	sidebar.querySelector("div[name='right']").appendChild(layout);
	
	var setting = new tAssistance.OzaTimelineConfigMaker();
	sidebar.querySelector("div[name='left']").appendChild(setting);	
	
	
	
	//var model = tAssistance.TraceModelMaker("ééé", trace.obsels);
	
	//var propertyList =  tAssistance.dom.PropertyList(model);
	
	//var listSelect = tAssistance.dom.ValueList(model[Object.keys(model)[2]].values);
	
	//var setting2 = new tAssistance.dom.OzaTimelineCondSetting("aaa2", propertyList);
	//document.body.appendChild(setting2);
	
	var store = new tAssistance.Store();
	store.getFilter("hoang", "velement1", function(filter){
		
		//var selector = {"properties": model};
		
		var setting2 = new tAssistance.FilterEditorMaker(filter);
		layout.querySelector("div[name='top-right']").appendChild(setting2);
		
		var pfilter = filter.pfilters[0];
		
		var maker_in = {
			"pfilter": pfilter,
			"user_id": "hoang",
			"velement_id": "velement1",
			"pfilter_id": "pfilter1"
		};
		
		var setting1 = new tAssistance.PFilterPanelMaker(maker_in);
		layout.querySelector("div[name='bot-left']").appendChild(setting1);
	});
	
	store.getUserById("hoang", function(user){
		var velements = user.configs[0].velements;
		
		
		var setting1 = new tAssistance.OzaVElementsEditorMaker(velements);
		layout.querySelector("div[name='top-left']").appendChild(setting1);
	});
	
	
		
	var setting3 = new tAssistance.dom.OzaIconSetting("aaa2");
	layout.querySelector("div[name='bot-right']").appendChild(setting3);
	
	//var valueList = new tAssistance.ValueListEditorMaker();
	
	
	//setting2.querySelector("td[name='td2']").appendChild(valueList);
	// make model
	
	
	
	
	
	jQuery.getJSON("http://localhost/tconnect/project/Ozalid/TStore/api.php/traces?traceid=t_all",function(data){
		var trace = data;
		
		var model = [];		
		
		tAssistance.TraceModelMaker("ééé", trace.obsels);
	});
	
};