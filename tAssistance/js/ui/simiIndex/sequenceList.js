tAssistance.ui.sequenceList = {
	"data": {},	
	"ctler": {},
	"dom": {}
};

tAssistance.ui.sequenceList.data.example1 = [
                                    {
                                        "id": "t14008250756428",
                                        "begin": 1432795482684,
                                        "properties": {
                                          "model": "oza_model"
                                        },
                                        "obsels": "obselst14008250756428"
                                      },
                                      {
                                        "id": "t14008250807668",
                                        "begin": 1432795482684,
                                        "obsels": "obselst14008250807668"
                                      }
                                    ];

tAssistance.ui.got.sequenceList.SequenceListMaker = function(params){
	
	//var layout = tAssistance.ui.sequenceobsel.dom.SequenceObselLayout();
	
	var id = params.id;
	var traces = params.traces;
	var placeholder = params.placeholder;
	var userconfig = params.userconfig;
	var width = params.width ? params.width : 1000;
	var height = params.height ? params.height : 250;
		
	console.log(traces);
	
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
	//var zoom = new tAssistance.OzaZoomMaker(zoom_place);
	
	// add listeners
//	$("#"+zoom.id).on("changeSetting", function(e, data){
//		g = group;
//		g.scaleLevel = data.unit;
//		g.scale_x_time = 1000/tAssistance.Datetime.units[g.scaleLevel];
//		
//		
//		g.update();
//	});
	
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
	
	var group = tAssistance.ui.got.ctler.TraceGroupMaker(params);
	
	mousepad.addGroup(group);
	
	var center_line = new tAssistance.dom.CenterLine(width, height);
	svg.appendChild(center_line);
	
	drawedObsels = group.addObsels(trace.obsels);
	
	group.setLabels();
	
	for(var i in obsels){
		
		var obsel = obsels[i];
		
		var params = {
			"obsel": obsel,
			"configs": tAssistance.ui.sequenceobsel.data.example1
		};
		
		var obsel_el = tAssistance.ui.sequenceobsel.ctler.ObselIconMaker(params);
		
		layout.querySelector("div.list").appendChild(obsel_el);
		
	}
	
	return layout;	
};


tAssistance.ui.got.sequenceList.SequenceObselLayout = function(params){
	
	var box = document.createElement('div');
	$(box).css("overflow-x","scroll");
	//$(box).css("overflow-y","scroll");
	//$(box).css('display', "inline" );
	$(box).css("height","40px");
	$(box).css("width","1000px");
	
	var list = document.createElement('div');
	list.setAttribute("class","list");
	$(list).css('white-space', "nowrap" );
	$(list).css('display', "inline" );
	
	box.appendChild(list);
	
	return box;
};

tAssistance.ui.got.sequenceList.TraceIcon = function(params){
	
	var img = 'img/img.php/button';
	if(params && params.img)
		img = params.img;
	
	drawnObsel = document.createElement('img');
	drawnObsel.setAttribute('src', img);
	//$(drawnObsel).css('float', "left" );
	$(drawnObsel).css('display', "inline-block" );
	drawnObsel.setAttribute('width', '20px' );
	drawnObsel.setAttribute('height', '20px' );
	//drawnObsel.appendChild(document.createTextNode(text));
	return drawnObsel;
};

tAssistance.ui.got.sequenceList.TraceIconMaker = function(params){
	var new_obsel = params.obsel;
	var configs = params.configs;
	
	var icon = false;
	
	for(var i in configs){
		var obselConfig = configs[i]; 
		
		if(new_obsel.type==obselConfig.id){
			if(obselConfig.active==true){
				var params = {
					"obsel": obselConfig,
					"new_obsel": new_obsel
				}
				var ok = tAssistance.ui.sequenceobsel.ctler.ObselTester(params);
				
				if(ok==true){
//					var params = {
//						"img": obselConfig.icon_img
//					};						
					
					//var icon = tAssistance.dom.OzaObselIcon(params);
					
					var params = {
							"img": obselConfig.icon_img
					};
					
					var icon = tAssistance.ui.sequenceobsel.dom.ObselIcon(params);
					return icon;
				}				
			}				
		}		
	}
	
	if(icon == false){
		var icon = tAssistance.ui.sequenceobsel.dom.ObselIcon();
		return icon;
	}
};

tAssistance.ui.got.ctler.TraceGroupMaker = function(params){
	
	var group_id = params.group_id;
	var gTrace = params.gTrace;
	var trace = params.trace;
	var width = params.width;
	var zoom = params.zoom;
	var userconfig = params.userconfig;
	
	// make ozagroup
	var params = {
			id: group_id,
			parent: gTrace,
			trace: trace,
			width: width,
			zoom: zoom,
			userconfig: userconfig
	}
	
	var group = new tAssistance.OzaGroup(params);
	
	// make ozagroup element
	var groupEl = new tAssistance.dom.OzaGroup("abc");
	
	gTrace.element.appendChild(groupEl);
		
	group.element = groupEl;
	// return the results
	
	return group;
};