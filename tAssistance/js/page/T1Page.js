tAssistance.T1Page = function(){
	
	var layout = tAssistance.page.T1.dom.Layout();
	
	//var controls = tAssistance.dom.DateTime();
	
	var selected = tAssistance.page.T1.ctler.ConfigPicker();
	
	var datefilter = tAssistance.page.T1.ctler.DateRangePicker();
	
	var params = {
			"after_load": function(params){
				
				//params.panel = panel_body;
								
				var trace = tAssistance.page.T1.ctler.TraceSection(params);
				
				var chard = tAssistance.page.T1.ctler.PieChartSection(params);
				
				var bar = tAssistance.page.T1.ctler.BarChartSection(params);
				
				var bar = tAssistance.page.T1.ctler.StatsByDateSection(params);
				
			},
			"page": tAssistance.page.T1
		}
		
	var chart = tAssistance.page.T1.ctler.TraceMakerByDashBoard(params);
};

tAssistance.page.T1 = {
	"model": {},
	"dom": {},
	"ctler": {},
	"data": {}
};

//tAssistance.page.T1.ctler.DateFilter = function(){
//	
//	var begin_label = document.createElement("label");
//	begin_label.innerHTML = "Begin";
//	
//	var begin = document.createElement("input");
//	begin.setAttribute("type","text");
//	//begin.innerHTML = "test";
//	
//	var page = document.body.querySelector("[placeholder='page']");
//	
//	page.appendChild(begin_label);
//	page.appendChild(begin);
//	
//	$(begin).datetimepicker({
//		inline: true,
//		sideBySide: true,
//		show: true
//	});
//	
//	var end_label = document.createElement("label");
//	end_label.innerHTML = "End";
//	
//	var end = document.createElement("input");
//	end.setAttribute("type","text");
//	//begin.innerHTML = "test";
//	
//	page.appendChild(end_label);
//	page.appendChild(end);
//	page.appendChild(document.createElement("br"));
//	
//	$(end).datetimepicker({
//		inline: true,
//		sideBySide: true,
//		show: true
//	});
//	
//};

tAssistance.page.T1.ctler.ConfigPicker = function(params){
		
	var assistant_store = new tAssistance.Store();
	var userconfig_uri = assistant_store.getUserUri("alain");
	
	jQuery.getJSON(userconfig_uri,function(data){
		var user = data;
		
		//var user = params.user;
		var config = user.configs[1].selected;
		
		var breadcrumb = tAssistance.dom.BreadCrumb({selected: config});
		
		var holder = document.body.querySelector("[placeholder='breadcrumb']");
		
		holder.appendChild(breadcrumb);
	});
}

tAssistance.page.T1.ctler.DateRangePicker = function(params){
	
	var holder = document.body.querySelector("[placeholder='controls']");
	
	var div_0 = document.createElement('div');
	div_0.className = "input-prepend input-group";
	$(div_0).css("margin","5px");

	var span_0 = document.createElement('span');
	span_0.className = "add-on input-group-addon";

	var i_0 = document.createElement('i');
	i_0.className = "glyphicon glyphicon-calendar fa fa-calendar";
	span_0.appendChild(i_0);

	div_0.appendChild(span_0);

	var daterange = document.createElement('input');
	//daterange.value = "03/18/2013 - 03/23/2013";
	daterange.name = "reservation";
	daterange.style.width = "200px";
	daterange.className = "form-control active";
	daterange.id = "reservation";
	daterange.type = "text";
	div_0.appendChild(daterange);
	
	
	holder.appendChild(div_0);
	
	$(daterange).daterangepicker({
		timePicker: true,
		ranges: {
		       'Today': [moment(), moment()],
		       'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
		       'Last 7 Days': [moment().subtract(6, 'days'), moment()],
		       'Last 30 Days': [moment().subtract(29, 'days'), moment()],
		       'This Month': [moment().startOf('month'), moment().endOf('month')],
		       'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
		}
	},function(start, end, label) {
        //console.log(start.toISOString(), end.toISOString(), label);
		
		var params = {
			"begin": start,
			"end": end,
			"trace": tAssistance.page.T1.data.src_trace
		}
		
		tAssistance.page.T1.ctler.UpdateTrace(params);
	});
};

tAssistance.page.T1.ctler.SectionsMaker = function(params){
	
	
};

tAssistance.page.T1.ctler.TraceLoader = function(params){
	
	var success = params.success;
	var panel = params.panel;
	var user = params.user ? params.user : "alain";
	var page = params.page;
	
	var store = new tStore.OzaTStoreClient();
	var user_uri = store.getUserUri(user);
	
	var assistant_store = new tAssistance.Store();
	var userconfig_uri = assistant_store.getUserUri(user);
	
	
	
	var trace_uri = store.getTraceUri("t_all");
	
	//var trace_uri = "http://localhost/tconnect/project/Ozalid/TStore/api.php/traces?traceid=t_all";
	
	
	jQuery.when(
		jQuery.getJSON(trace_uri,function(data){
			var trace = data;
			
			// save the trace to the store
			var store = new tStore.OzaTStore();
			store.deleteTrace(trace.id);
			store.addTrace(trace);
			
			//tAssistance.page.T1.data.trace = trace;
			//tAssistance.page.T1.data.src_trace = trace;
			page.data.trace = trace;
			page.data.src_trace = trace;
		}),
		
		jQuery.getJSON(user_uri,function(data){
			var user = data;
			
			//tAssistance.page.T1.data.user = user;
			page.data.user = user;
		}),
		jQuery.getJSON(userconfig_uri,function(data){
			var userconfig = data;
			
			//tAssistance.page.T1.data.userconfig = userconfig;
			page.data.userconfig = userconfig;
		})
		
	).then(function(){
		//var page = page;
		
		var trace = page.data.trace;
		var user = page.data.user;
		var userconfig = page.data.userconfig;
				
		var params = {
			"id": "abc",
			//"trace": trace,
			//"page": page,
			//"userconfig": userconfig,			
			//"panel": panel
		}		
		
		success(params);
	});	
};

tAssistance.page.T1.ctler.OzaGraTraceMaker = function(params){
	
	var id = params.id;
	var trace = params.trace;
	var panel = params.panel;
	var userconfig = params.userconfig;
	var width = params.width;
	var height = params.height;
		
	console.log(trace);
	
	var container = document.createElement("div");
					
	// make a svg
	var svg = tAssistance.dom.OzaTraceSvg(params);
	
	panel.appendChild(svg);
	
	// make a rect for mouse
	var rect = tAssistance.dom.MousePad();
	svg.appendChild(rect);
	
	var mousepad = new tAssistance.MousePad();
	mousepad.element = rect;
	
//	// make ozaZoom
//	var zoom = new tAssistance.OzaZoomMaker(zoom_place);
//	
//	// add listeners
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
	
	var group = tAssistance.OzaGroupMaker(params);
	
	mousepad.addGroup(group);
	
	var center_line = new tAssistance.dom.CenterLine(width, height);
	svg.appendChild(center_line);
	
	drawedObsels = group.addObsels(trace.obsels);
	
	group.setLabels();
	
};

tAssistance.page.T1.ctler.PieChartSection = function(params){
		
	if(!tAssistance.page.T1.data.trace) return;
	
	var trace = tAssistance.page.T1.data.trace;
	var useconfig = tAssistance.page.T1.data.userconfig;
	var user = tAssistance.page.T1.data.user;
	
	var page = document.body.querySelector("[placeholder='pie']");
	$(page).empty();
	
	var params = {
		"title": "% obsels"	
	};
	
	var panel = tAssistance.dom.Panel(params);
	$(panel).css("width","400px");
	$(panel).css("float","left");
	
	var panel_body = panel.querySelector(".panel-body");
	$(panel_body).css("height","300px");
	
	
	page.appendChild(panel);
	
	var params = {
		"panel": panel_body,
		"trace": trace,
		"width": 300,
		"height": 250
	};
	
	var chart = tAssistance.page.T1.ctler.PieChart(params);
	
};

tAssistance.page.T1.ctler.PieChart = function(params){
	
	var panel = params.panel;
	var trace = params.trace;
	
	
	
	var placeholder = document.createElement("div");
	$(placeholder).css("width","100%");
	$(placeholder).css("height","100%");
	//placeholder.innerHTML = "12";
	
	panel.appendChild(placeholder);
	
	if(trace.obsels.length ==0) {
		placeholder.appendChild(document.createTextNode("No data"));
		return;
	}

	
	// Example Data
	
	var params = {
		"trace": trace
	};

	var data = tAssistance.page.T1.ctler.PieChardDataMaker(params);
	
//	var data = [
//		{ label: "Open dialog",  data: 10},
//		{ label: "Open a view",  data: 30},
//		{ label: "Correct a word",  data: 90},
//		{ label: "Validate a word",  data: 70}
//	];


	//var placeholder = $("#placeholder");

	$("#title").text("Default pie chart");
	$("#description").text("The default pie chart with no options set.");

	$.plot(placeholder, data, {
		series: {
			pie: { 
				show: true,
				label: {
					show: true					
				}
			}			 
		},
		grid: {
	        hoverable: true,
	        clickable: true
	    }
	});
	
	return placeholder;
};

tAssistance.page.T1.ctler.PieChardDataMaker = function(params){
	
	var trace = params.trace;
	var obsels = trace.obsels;
	
	var process = new tAssistance.handler.Obsels(obsels);
	
	var data = [];
	var groups = [];
	
	
	groups = process.groupByType();
	for (var type in groups){
		data.push({"label": type, "data": groups[type].length});
	}
	
	return data;
};

tAssistance.page.T1.ctler.BarChartSection = function(params){
	
	if(!tAssistance.page.T1.data.trace) return;
	
	var trace = tAssistance.page.T1.data.trace;
	var useconfig = tAssistance.page.T1.data.userconfig;
	var user = tAssistance.page.T1.data.user;
	
	var page = document.body.querySelector("[placeholder='bar']");
	$(page).empty();
	
	var params = {
		"title": "Obsel Number"	
	};
	
	var panel = tAssistance.dom.Panel(params);
	$(panel).css("width","400px");
	$(panel).css("float","left");
	
	var panel_body = panel.querySelector(".panel-body");
	$(panel_body).css("height","300px");
	
	page.appendChild(panel);
	
	var params = {
		"panel": panel_body,
		"trace": trace
	};
	
	var chart = tAssistance.page.T1.ctler.BarChart(params);
	
};

tAssistance.page.T1.ctler.BarChart = function(params){
	var panel = params.panel;
	var trace = params.trace;
	
	var plotholder = document.createElement("div");
	$(plotholder).css("width","100%");
	$(plotholder).css("height","100%");
	//placeholder.innerHTML = "12";
	
	panel.appendChild(plotholder);
	
	if(trace.obsels.length ==0) {
		plotholder.appendChild(document.createTextNode("No data"));
		return;
	}

	var data = tAssistance.page.T1.ctler.BarChartDataMaker(params);
	
	$.plot(plotholder, data, {		
		series: {
			bars: {
				show: true,
				barWidth: 0.6,
				align: "center"
			}	
		},
		xaxis: {
			//mode: "categories",
			//rotateTicks: 60,
			//tickLength: 0,
			show: false
		},
		yaxis: {
			tickDecimals: 0,
		},
		grid: {
	        hoverable: true,
	        clickable: true
	    }
	});
	
	var plothover = function (event, pos, item) {
		
		if (item) {
			
			console.log(item);
			
			var x = data[item.dataIndex],
				y = item.datapoint[1];
						
			var x_text = item.series.label+"";
						
			$("#tooltip").html(x_text + " : " + y + " obsels")
				.css({top: item.pageY+5, left: item.pageX+5})
				.fadeIn(200);
		} else {
			$("#tooltip").hide();
		}
		
		//alert(data[item.dataIndex][1]);
		//console.log(event.target);
	};
	
	$(plotholder).bind("plothover", plothover);
}

tAssistance.page.T1.ctler.BarChartDataMaker = function(params){
	
	var trace = params.trace;
	var obsels = trace.obsels;
	
	var process = new tAssistance.handler.Obsels(obsels);
	
	var data = [];
	var groups = [];
	
	
	groups = process.groupByType();
	var i = 0;
	for (var type in groups){
		i++;
		data.push({"label": type, "data": [[i, groups[type].length]]});
	}
	
	return data;
};


tAssistance.page.T1.ctler.TraceSection = function(params){
	
	if(!tAssistance.page.T1.data.trace) return;
	
	var trace = tAssistance.page.T1.data.trace;
	var userconfig = tAssistance.page.T1.data.userconfig;
	
	var page = document.body.querySelector("[placeholder='trace']");
	$(page).empty();
	
	var params = {
		"title": "Trace"	
	};
	
	var panel = tAssistance.dom.Panel(params);
	$(panel).css("width","400px");
	$(panel).css("float","left");
	
	var panel_body = panel.querySelector(".panel-body");
	$(panel_body).css("height","300px");
	
	page.appendChild(panel);
	
	var params = {
		"trace": trace,
		"width": 360,
		"height": 250,
		"panel": panel_body,
		"id": "abc",
		"userconfig": userconfig		
	};
	
	var traceDom = new tAssistance.page.T1.ctler.OzaGraTraceMaker(params);
		
};

tAssistance.page.T1.ctler.StatsByDateSection = function(params){
	
	var trace = tAssistance.page.T1.data.trace;
	var userconfig = tAssistance.page.T1.data.userconfig;
	
	var page = document.body.querySelector("[placeholder='time']");
	$(page).empty();
	
	var params = {
		"title": "Time Statistics"	
	};
	
	var panel = tAssistance.dom.Panel(params);
	$(panel).css("width","400px");
	$(panel).css("float","left");
	
	var panel_body = panel.querySelector(".panel-body");
	$(panel_body).css("height","300px");
	
	page.appendChild(panel);
		
	var params = {
		"trace": trace,
		"panel": panel_body,
		"id": "abc",
		//"userconfig": userconfig			
	};
	
	var chart = tAssistance.page.T1.ctler.StatsByDateMaker(params);
	
};

tAssistance.page.T1.ctler.StatsByDateDataMaker = function(params){
	
	var trace = params.trace;
	var obsels = trace.obsels;
	var mode = params.mode || "M";
	
	var process = new tAssistance.handler.Obsels(obsels);
	
	var data = [];
	var groups = [];
	
	if(mode=="W"){
		groups = process.groupByWeek();
		for (var week in groups){
			data.push([week, groups[week].length]);
		}
	}
	else if(mode=="D"){
		groups = process.groupByDay();
		for (var day in groups){
			data.push([day, groups[day].length]);
		}
	}
	else if(mode=="H"){
		groups = process.groupByHour();
		for (var hour in groups){
			data.push([hour, groups[hour].length]);
		}
	}
	else if(mode=="m"){
		groups = process.groupByMinute();
		for (var min in groups){
			data.push([min, groups[min].length]);
		}
	}
	else if(mode=="M"){
		groups = process.groupByMonth();
		for (var month in groups){
			data.push([month, groups[month].length]);
		}
	}	
	
	return data;
};

tAssistance.page.T1.ctler.StatsByDateMaker = function(params){
	
	var panel = params.panel;
	var trace = params.trace;
	var mode = params.mode ? params.mode : "D";
	
	var statsbydate_params = params;
	
	var placeholder = document.createElement("div");
	$(placeholder).css("width","100%");
	$(placeholder).css("height","90%");
	//placeholder.innerHTML = "12";
	
	panel.appendChild(placeholder);
	
	if(trace.obsels.length==0) return;
	
	//var data = [ ["Open dialog", 10], ["Open a view", 8], ["Correct a word", 4], ["Validate a word", 13]];
	
	var params = {
		"panel": panel,
		"trace": trace,
		"mode": mode
	};
	
	var data = tAssistance.page.T1.ctler.StatsByDateDataMaker(params);
	
	showTooltip = function(x, y, color, contents) {
	    $('<div id="tooltip">' + contents + '</div>').css({
	        position: 'absolute',
	        display: 'none',
	        top: y - 40,
	        left: x - 120,
	        border: '2px solid ' + color,
	        padding: '3px',
	            'font-size': '9px',
	            'border-radius': '5px',
	            'background-color': '#fff',
	            'font-family': 'Verdana, Arial, Helvetica, Tahoma, sans-serif',
	        opacity: 0.9
	    }).appendTo("body").fadeIn(200);
	};
	
	var tickFormater = function(mode){
		
		if(mode=="H"){
			return function(val, axis){				
				return val.split(",")[3];
			};
		}
		else{
			return function(val, axis){				
				return val.split(",")[1];
			};
		}
	}(mode);
	
	$.plot(placeholder, [ data ], {
		series: {
			bars: {
				show: true,
				barWidth: 0.6,
				align: "center",
				label: {
					show: true
				}
			}
		},
		xaxis: {
			mode: "categories",
			show: false,
			tickLength: 0,
			tickFormatter: tickFormater
		},
		yaxis: {
			//label: "Obsels",
			show: false,
			tickLength: 0
		},
		grid: {
			borderWidth: 0,	
	        hoverable: true,
	        clickable: true,
	        highlight: true
	    }
	});
	
	tAssistance.pageSession.previousPoint = null;
	tAssistance.pageSession.previousLabel = null;
	
	$("<div id='tooltip'></div>").css({
		position: "absolute",
		display: "none",
		border: "1px solid #fdd",
		padding: "2px",
		"background-color": "#fee",
		opacity: 0.80
	}).appendTo("body");
	
	var plothover = function (event, pos, item) {
		    			
			if (item) {
				
				console.log(mode);
				
				var x = data[item.dataIndex],
					y = item.datapoint[1];
							
				var x_text = "";
				if(mode=="M"){
					x_text = moment(parseInt(x)).format("YYYY MMMM");
				}
				else if(mode=="W"){
					x_text = moment(parseInt(x)).format("YYYY [Week ] w");
				}
				else if(mode=="D"){
					x_text = moment(parseInt(x)).format("YYYY MMM DD");
				}
				else if(mode=="H"){
					x_text = moment(parseInt(x)).format("YYYY MMM DD HH:00");
				}
				else if(mode=="m"){
					x_text = moment(parseInt(x)).format("YYYY MMM DD HH:mm");
				}
				
				$("#tooltip").html(x_text + " : " + y + " obsels")
					.css({top: item.pageY+5, left: item.pageX+5})
					.fadeIn(200);
			} else {
				$("#tooltip").hide();
			}
			
			//alert(data[item.dataIndex][1]);
			//console.log(event.target);
	};
	
	$(placeholder).bind("plothover", plothover);
	
	var groupbtn = tAssistance.page.T1.dom.StatTimeBG({mode: mode});
	
	panel.appendChild(groupbtn);
	
	var btns = $(groupbtn).find(".time_mode");
	$(btns).click(function(){
		
		var params = statsbydate_params;
		params.mode = this.name;
				
		$(params.panel).empty();
				
		var a = tAssistance.page.T1.ctler.StatsByDateMaker(params);
		
	});
};

tAssistance.page.T1.dom.StatTimeBG = function(params){
	
	var mode = params.mode
	
	var group = document.createElement("div");
	
	var month = tAssistance.dom.CircleButton({text: "M"});
	$(month).addClass("time_mode");
	
	month.setAttribute("name","M");
	
	group.appendChild(month);
		
	var week = tAssistance.dom.CircleButton({text: "W"});
	$(week).addClass("time_mode");	
	week.setAttribute("name","W");
	
	group.appendChild(week);
	
	var day = tAssistance.dom.CircleButton({text: "D"});
	$(day).addClass("time_mode");
	day.setAttribute("name","D");
		
	group.appendChild(day);
	
	var hour = tAssistance.dom.CircleButton({text: "H"});
	$(hour).addClass("time_mode");
	hour.setAttribute("name","H");
	
	group.appendChild(hour);
	
	var minute = tAssistance.dom.CircleButton({text: "m"});
	$(minute).addClass("time_mode");
	minute.setAttribute("name","m");
	
	group.appendChild(minute);
	
	if(mode == "M") 
		$(month).addClass("active");
	if(mode == "W") 
		$(week).addClass("active");
	if(mode == "D") 
		$(day).addClass("active");
	if(mode == "H") 
		$(hour).addClass("active");
	if(mode == "m") 
		$(minute).addClass("active");
	
	return group;
};

tAssistance.page.T1.dom.Layout = function(params){
	var page = document.body.querySelector("[placeholder='page']");
	
	var breadcrumb = document.createElement("div");
	breadcrumb.setAttribute("placeholder","breadcrumb");
	
	page.appendChild(breadcrumb);
	
	var controls = document.createElement("div");
	controls.setAttribute("placeholder","controls");
	
	page.appendChild(controls);
	
	var widgets = document.createElement("div");
	widgets.setAttribute("placeholder","widgets");
	
	var trace = document.createElement("div");
	trace.setAttribute("placeholder","trace");	
	widgets.appendChild(trace);
	
	var pie = document.createElement("div");
	pie.setAttribute("placeholder","pie");	
	widgets.appendChild(pie);
	
	var bar = document.createElement("div");
	bar.setAttribute("placeholder","bar");	
	widgets.appendChild(bar);
	
	var time = document.createElement("div");
	time.setAttribute("placeholder","time");	
	widgets.appendChild(time);
	
	page.appendChild(widgets);
	
};

tAssistance.page.T1.ctler.UpdateTrace = function(params){
	
	var begin = params.begin;
	var end = params.end;	
	var trace = params.trace;
	
	var params = {
		"trace": trace,
		"begin": begin,
		"end": end
	};
	
	var new_trace = tAssistance.page.T1.ctler.TraceMaker(params);
	
	console.log(new_trace);
	
	tAssistance.page.T1.data.trace = new_trace;
	
	var trace = tAssistance.page.T1.ctler.TraceSection();
	
	var chard = tAssistance.page.T1.ctler.PieChartSection();
	
	var bar = tAssistance.page.T1.ctler.BarChartSection();
	
	var time = tAssistance.page.T1.ctler.StatsByDateSection();	
	
};
