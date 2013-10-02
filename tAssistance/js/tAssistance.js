/*
	require jQuery
*/

	/** @namespace */
	tAssistance = {};
	//jTBA.Version = '0.1';
	tAssistance.location = "http://assist.com/";
	
	/** 
	 * @function
	 * @memberof tAssistance
	 * @name obsel_serializeHtml
	 * @param options.obsel the obsel needed to be serialized in html
	 * @desc format the obsel in html */	
	tAssistance.obsel_serializeHtml = function(options){
		var obsel = options.obsel;
		
		var tableHtml = "<table>";
    	for(var p in obsel){
    		if(obsel.hasOwnProperty(p)){
    			var o = obsel[p];
    			if(p=="begin"||p=="end"){
    				o = (new Date(o)).toUTCString();
    			}
    			var rowHtml = "<tr><td>"+p+"</td><td>"+o+"</td></tr>";
    			tableHtml+= rowHtml;
    		}
    	}
    	tableHtml+="</table>";
		return tableHtml;
	};
	
	/** 
	 * @function
	 * @memberof tAssistance
	 * @name draw_obsels
	 * @param options.obsels the obsels needed to be drawed in html
	 * 
	 * @desc format the obsels in html */
	tAssistance.draw_obsels = function(options){
		var obsels = options.obsels,
		css_rules = options.css_rules !== undefined ? options.css_rules : 'g_obsels_enter.append("svg:image").attr("class", "obsel").attr("xlink:href",function(d){return getSymbol(d);}).attr("width","20").attr("height","20");',
		parentNode = options.parentNode,
		source = options.source,
		getx = function(d){
			var date = new Date(d["begin"]);
			return date;
		},
		gety = options.gety !== undefined ? options.gety : function(d){ 
			return d["subject"];
		},
		getSymbol = function(d){
			return tAssistance.location+"img/ozem_fn.png";
		},
		margin = {top: 5.5, right: 19.5, bottom: 80, left: 60},
		timeticks = [[d3.time.days,1,"%Y-%b-%d"],[d3.time.hours,4,"%Y-%b-%d %H"]],
		width = 600,
		height = 150,
		timeFormat = function(formats) {
			  return function(date) {
			    var i = formats.length - 1, f = formats[i];
			    while (!f[1](date)) f = formats[--i];
			    return f[0](date);
			  };
			},
		customTimeFormat = timeFormat([
		                                   [d3.time.format("%Y"), function() { return true; }],
		                                   [d3.time.format("%B"), function(d) { return d.getMonth(); }],
		                                   [d3.time.format("%b %d"), function(d) { return d.getDate() != 1; }],
		                                   [d3.time.format("%a %d"), function(d) { return d.getDay() && d.getDate() != 1; }],
		                                   [d3.time.format("%I %p"), function(d) { return d.getHours(); }],
		                                   [d3.time.format("%I:%M"), function(d) { return d.getMinutes(); }],
		                                   [d3.time.format(":%S"), function(d) { return d.getSeconds(); }],
		                                   [d3.time.format(".%L"), function(d) { return d.getMilliseconds(); }]
		                                 ]),
        
		generateId =function(){
			return Math.floor(Math.random()*100);
		},
		tracePanelTmpl = function(id, source){
			return "<table id='"+id+"'><tr><td class='trace_grid'></td><td style='font-family: arial; font-size: small'>Properties<div class='trace_property' style=' overflow: auto; width:200px'></div></td></tr>"
    		//+"<tr><td colspan='2' style='font-family: arial; font-size: small'>x: <span class='trans_x'>0</span> y:<span class='trans_y'>0</span> scale: <span class='scale'>0</span> source: <span class='source'>"+source+"</span></td></tr>"
    		//+"<tr><td colspan='2' style='font-family: arial; font-size: small'>Command <input type='input' class='cmd_input' /><button class='bt_run' >Run</button></td></tr></table>"
			+"</table>";
		},
		xScale = d3.time.scale().domain([new Date(), new Date()]).range([0, width]),
    	yScale = d3.scale.ordinal().domain(["obsel"]).range([height - 20]),
		xAxis = d3.svg.axis().orient("bottom").scale(xScale).ticks(10).tickFormat(customTimeFormat),
      	yAxis = d3.svg.axis().scale(yScale).orient("left"),
      	autoUpdate = options.autoUpdate !== undefined ? options.autoUpdate : false;
		
		//draw panel
		
		var rootid = "trace_viz" + generateId();
		var tracePanelHtml = tracePanelTmpl(rootid, source);
		$(parentNode).append(tracePanelHtml);
		
		// draw svg
		var root_element = $("#"+rootid).get(0);
	    var trace_grid = $("#"+rootid+" .trace_grid").get(0);
				
		var svg = d3.select(trace_grid).append("svg")
	      .attr("width", width + margin.left + margin.right)
	      .attr("height", height + margin.top + margin.bottom)
	      .attr("pointer-events","all")
	    .append("svg:g")
	      .attr("class", "trace_viz")
	      //.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
	      .attr("transform", "translate(0,0)")
	      .call(d3.behavior.zoom().on("zoom", function(){
	    	  $("#"+rootid+" .trans_x").html(d3.event.translate[0]);
	    	  $("#"+rootid+" .trans_y").html(d3.event.translate[1]);
	    	  $("#"+rootid+" .scale").html(d3.event.scale);
	    	  $("#"+rootid+" .trace_viz").attr("transform","translate("+d3.event.translate+") scale("+d3.event.scale+")");
	    	  
	    	  // synchronize with other trace grid
	    	  var synchronizedRootId = $("#"+rootid).attr("synchronizewith");		
	    	  if(synchronizedRootId){
	    		  	$("#"+synchronizedRootId+" .trans_x").html(d3.event.translate[0]);
	    	  		$("#"+synchronizedRootId+" .trans_y").html(d3.event.translate[1]);
	    	  		$("#"+synchronizedRootId+" .scale").html(d3.event.scale);
	    	  		$("#"+synchronizedRootId+" .trace_viz").attr("transform","translate("+d3.event.translate+") scale("+d3.event.scale+")");
	    	  }
	    	  }));
		
		// draw a background rect for mousemove.
		 svg.append("rect")
		      .attr("class", "background")
		      .attr("y","-100")
		      .attr("width", "100%")
		      .attr("height", "130%");
		
		// draw the x-axis.
		 svg.append("g")
		      .attr("class", "x axis")
		      .attr("transform", "translate(0," + height + ")")
		      .call(xAxis);
		
		// draw the y-axis.
		 svg.append("g")
		     .attr("class", "y axis")
		     //.attr("transform", "translate(0," + width + ")")
		     .call(yAxis);	
		
		tracegrid_ctl = root_element.tracegrid_ctl = this;
		  
	    // save svg object into tracegrid controller
		  tracegrid_ctl.svg = svg;
		  tracegrid_ctl.xAxis = xAxis;
		  tracegrid_ctl.yAxis = yAxis;
		  tracegrid_ctl.xScale = xScale;
		  tracegrid_ctl.yScale = yScale;
		  tracegrid_ctl.getx = getx;
		  tracegrid_ctl.gety = gety;
		  tracegrid_ctl.width = width;
		
		  var xs = d3.extent(obsels, getx);
		  var yset = [];
		  for(var i=0;i<obsels.length;i++){
			  if($.inArray(obsels[i]["subject"],yset)==-1){
				  yset.push(obsels[i]["subject"]);
			  }
		  }
	  
		xScale = xScale.domain(xs).range([0, width]);
		yScale = d3.scale.ordinal().domain(yset).rangePoints([100, -50]);
		xAxis = xAxis.scale(xScale);
		yAxis = d3.svg.axis().scale(yScale).orient("left");
		
		// save xScale,xAxis
		tracegrid_ctl.xScale = xScale;
		tracegrid_ctl.yScale = yScale;
		tracegrid_ctl.xAxis = xAxis;				
		tracegrid_ctl.yAxis = yAxis;
		tracegrid_ctl.testAbc = rootid;
		
		// draw xAxis
		svg.select(".x.axis")
			.call(xAxis)
			.selectAll("text")
				.attr("transform", "translate(-10,30) rotate(-65)");
		// draw yAxis
		svg.select(".y.axis")
		.call(yAxis);
		
	    // Add a symbol per obsel 
	    var g_obsels = svg.append("g")
	        .attr("class", "obselset")
	      .selectAll(".obsel")
	        .data(obsels);
	    var g_obsels_enter = g_obsels
	      .enter().append("g");
	    eval(css_rules);				        
	        
	    g_obsels.call(function(dot){
        	dot.attr("transform", function(d) {
		    	  return "translate("+xScale(getx(d))+","+yScale(gety(d))+")"; 
		      });	
        })
        .on("click", function(d,i){// add click event on obsel
        					        	
        	var obsel_in_html = tAssistant.obsel_serializeHtml({obsel: d});
        	
        	//$("#"+rootid+" .trace_property").empty().append(obsel_in_html);
        	
        	
        });
	    
	    
	    // Add a title.
	    g_obsels.append("title")
	        .text(function(d) {							
		        return (new Date(d["begin"])).toUTCString();
		});
	    
	    // save dot in tracegrid_ctl
	    tracegrid_ctl.g_obsels = g_obsels;
		
	};
	
	/*tAssistance.draw_obsels1 = function(options){
		var obsels = options.obsels,
		css_rules = options.css_rules !== undefined ? options.css_rules : 'g_obsels_enter.append("svg:image").attr("class", "obsel").attr("xlink:href",function(d){return getSymbol(d);}).attr("width","20").attr("height","20");',
		parentNode = options.parentNode,
		source = options.source,
		getx = function(d){
			var date = new Date(d["begin"]);
			return date;
		},
		gety = options.gety !== undefined ? options.gety : function(d){ 
			return d["subject"];
		},
		getSymbol = function(d){
			return "/tracestore/tAssistant/img/ozem_fn.png";
		},
		margin = {top: 5.5, right: 19.5, bottom: 80, left: 60},
		timeticks = [[d3.time.days,1,"%Y-%b-%d"],[d3.time.hours,4,"%Y-%b-%d %H"]],
		width = 600;
		
		
		
	};
	
	tAssistant.config_read = function(options){
		
		
		
	}*/
	/** 
	 * @function
	 * @memberof tAssistance
	 * @name trace_view
	 * @param options.trace_uri the uri of trace 
	 * @desc format the obsels in html */
	tAssistance.trace_view = function(options){
		var trace_uri = options.trace_uri;
		
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
		
		mgr = new tService.TraceManager({
			"base_uri": base_uri,
			async: true
		});
		trc = mgr.init_trace({
			name: trace_name
		});
		trc.get_obsels({			
			success: function(obsels){
				
				console.log("test trace_read correctly");
				
				var widget = new tAssistance.draw_obsels({
					"obsels": obsels,
					"source": trace_uri,
					"parentNode": document.getElementById("tracePanel")
				});			
			}
		});		
	}
	