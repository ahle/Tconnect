/*
	require jQuery
*/

	/** @namespace */
	tAssistance = {};
	//jTBA.Version = '0.1';
	tAssistance.location = "http://assist.com/";
	tAssistance.debug = true;
	
	/** 
	 * @function
	 * @memberof tAssistance
	 * @name obsel_serializeHtml
	 * @param options.obsel the obsel needed to be serialized in html
	 * @desc format the obsel in html */	
	tAssistance.obsel_property = function(options){
		var obsel = options.obsel;
		var obsel_container = options.container;
		var obsel_str = JSON.stringify(obsel);
		
		$.get("index.php?page=Property&id=1&obsel="+encodeURIComponent(obsel_str),function(data){
			
			$(obsel_container).empty().append(data);
			$(".trace_property").find("code").tooltip();
		});
	};
	
	
	/** 
	 * @function
	 * @memberof tAssistance
	 * @name draw_obsels
	 * @param options.obsels the obsels needed to be drawed in html 
	 * @desc format the obsels in html */
	tAssistance.draw_obsels = function(options){
		var obsels = options.obsels,
		css_rules = options.css_rules !== undefined ? options.css_rules : 'g_obsels_enter.append("svg:image").attr("class", "obsel").attr("xlink:href",function(d){return getSymbol(d);}).attr("width","20").attr("height","20");',
		parentNode = options.parentNode,
		source = options.source,
		getx = function(d){
			var date = tAssistance.datetime.utc2LocalDate(d["begin"]);
			return date;
		},
		gety = options.gety !== undefined ? options.gety : function(d){ 
			return d["subject"];
		},
		getSymbol = function(d){
			return "img/ozem_fn.png";
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
			return "<table id='"+id+"'><tr><td class='trace_grid'></td><td style='font-family: arial; font-size: small'>Properties<div class='trace_property' style='width:200px'></div></td></tr>"
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
        					        	
        	var obsel_in_html = tAssistance.obsel_property({
        		"obsel": d, 
        		"container": "#"+rootid+" .trace_property"
        		});
        });
	    
	    
	    // Add a title.
	    g_obsels.append("title")
	        .text(function(d) {							
		        return (new Date(d["begin"])).toUTCString();
		});
	    
	    // save dot in tracegrid_ctl
	    tracegrid_ctl.g_obsels = g_obsels;
		
	};
	
	tAssistance.draw_obsels1 = function(options){
		var obsels = options.obsels;
		
		// make a svg
		var svgNS = "http://www.w3.org/2000/svg";

		var svg = document.createElementNS(svgNS,"svg");
		svg.setAttribute("version","1.2");
		
		document.body.appendChild(svg);
		
		myCircle = document.createElementNS(svgNS,"circle");
		myCircle.setAttributeNS(null,"cx",100);
		myCircle.setAttributeNS(null,"cy",100);
		myCircle.setAttributeNS(null,"r",10);
		myCircle.setAttributeNS(null,"fill","none");
		myCircle.setAttributeNS(null,"stroke","black");
		
		svg.appendChild(myCircle);
	}
	
	tAssistance.draw_obsels2 = function(opts){
		var g = opts.g,
		positions = opts.positions;
		
		// make a svg
		var svgNS = "http://www.w3.org/2000/svg";

		//var svg = document.createElementNS(svgNS,"svg");
		//svg.setAttribute("version","1.2");
		if(tAssistance.debug){
			window.drawedObsels = [];
		}
		//document.body.appendChild(svg);
		$.each(positions, function(index, position){
			color = '#'+Math.floor(Math.random()*16777215).toString(16);
		
			myCircle = document.createElementNS(svgNS,"circle");
			myCircle.setAttributeNS(null,"cx",position.x);
			myCircle.setAttributeNS(null,"cy",position.y);
			myCircle.setAttributeNS(null,"r",8);
			myCircle.setAttributeNS(null,"style","fill: "+color+"; stroke: black");
						
			g.appendChild(myCircle);
			myCircle.data = {};
			myCircle.data["obsel"] = position.source_obsel;
						
			// attach the event
			$(myCircle).click(function(e){
				var obsel_in_html = tAssistance.obsel_property({
		    		"obsel": position.source_obsel, 
		    		"container": "#controlPanel"
		    		});
				if(tAssistance.debug){
					if(!window.selectedObsels)
						window.selectedObsels = [];
					window.selectedObsels.push(this);
				}
			});
			if(tAssistance.debug){				
				window.drawedObsels.push(myCircle);
			}			
		});		
	}
	// draw obsels for 
	tAssistance.draw_obsels3 = function(obsels, g, u){
		//var g;
		var y = tAssistance.svg.lines["line0"],
		r = 8,
		unit = u || 10000;
			
		// make a svg
		var svgNS = tAssistance.svg.svgNS;

		//var svg = document.createElementNS(svgNS,"svg");
		//svg.setAttribute("version","1.2");
		
		var drawedObsels = [];
		
		//document.body.appendChild(svg);
		var utcStart = obsels[0].begin;
		//var localStartDate = tAssistance.datetime.utc2LocalDate(utcStart);
		var start = utcStart;
		g.setAttribute("unit",u);
		g.setAttribute("timeoffset",start);
				
		for(i=0;i<obsels.length;i++){
			var obsel = obsels[i];
			var utcBegin = obsel.begin;
			var localBegin = utcBegin;
			var x = Math.round((localBegin - start)/unit);
			
			color = '#'+Math.floor(Math.random()*16777215).toString(16);
		
			myCircle = document.createElementNS(svgNS,"circle");
			myCircle.setAttributeNS(null,"cx", x);
			myCircle.setAttributeNS(null,"cy", y);
			myCircle.setAttributeNS(null,"r", r);
			myCircle.setAttributeNS(null,"class", "obsel");
			myCircle.setAttributeNS(null,"style","fill: "+color+"; stroke: black");
						
			g.appendChild(myCircle);
			myCircle.data = {};
			myCircle.data["obsel"] = obsel;
						
			// attach the event
			$(myCircle).click(function(e){
				var obsel_in_html = tAssistance.obsel_property({
		    		"obsel": this.data["obsel"], 
		    		"container": "#controlPanel"
		    		});
				if(tAssistance.debug){
					if(!window.selectedObsels)
						window.selectedObsels = [];
					window.selectedObsels.push(this);
				}
			});
			drawedObsels.push(myCircle);
		}
		if(tAssistance.debug){				
			window.drawedObsels = drawedObsels;
		}
		return drawedObsels;
	}
	// clear obsels
	tAssistance.clear_obsels = function(){
		var obsels = document.querySelectorAll(".obsel");
		for(i=0;i<obsels.length;i++){
			obsel = obsels[i];
			obsel.parentNode.removeChild(obsel);
		}
	}
	
	
	
	tAssistance.position_obsels = function(obsels, opts){
		var x_unit = opts.x_unit,
		x0 = opts.x0,
		y0 = opts.y0;
		
		// calculate the positions of obsels based on x0, y0
		var result = [];
		$.each(obsels, function(index, obsel){
			var item = new Object();
			item.x = index*x_unit+x0;
			item.y = y0;
			item.source_obsel = obsel;
			
			result.push(item);
		});
		
		//debug
		window.obsels = obsels;
		
		return result;		
	}
	
	tAssistance.getDates = function(obsels){
		
		function in_array(array, value) {
		    for(var i=0;i<array.length;i++) {
		    	 if(array[i].getTime() === value.getTime()) 
		    		 return true;		    	
		    }
		    return false;
		}

		var dates = [];
		for(i=0;i<obsels.length;i++){
			// get dateTime from begin
			var date = new Date(obsels[i].begin);
			// reset hour to zero 
			date.setHours(0,0,0,0);
			
			if(!in_array(dates,date)){
				dates.push(date);
			}
		}
		return dates;
	}
	
	// attach months minors to drawed obsels 
	tAssistance.drawMonths1 = function(drawedObsels){
		
		var months = tAssistance.outil.getMonths_svg(drawedObsels);
		var svg = drawedObsels[0].ownerSVGElement;
		var g = drawedObsels[0].parentNode;
		
		var width = 100,
		height = 18,
		x = 0,
		y = tAssistance.svg.lines["minor"],
		padding = 2;
		var svgNS = tAssistance.svg.svgNS;
		drawMonths = [];
				
		for(var i=0;i<drawedObsels.length;i++) {
			var drawedObsel = drawedObsels[i];
			var obsel = drawedObsel.data["obsel"];
			var obsel_date = tAssistance.datetime.utc2LocalDate(obsel.begin);// convert UTC time to localdate
			obsel_date.setDate(1);
			obsel_date.setHours(0,0,0,0);
			
			var match = tAssistance.datetime.in_array(months,obsel_date);
			if(match){
				var pos = tAssistance.datetime.indexOf(months,obsel_date);
				// get coordinates of the obsel
								
				text = document.createElementNS(svgNS,"text");
				text.setAttributeNS(null,"x", 0);
				text.setAttributeNS(null,"y", y);
				text.setAttributeNS(null,"class","obsel lbl");
				text.setAttributeNS(null,"font-family","arial");
				text.setAttributeNS(null,"font-size","10");
				text.setAttributeNS(null,"fill","blue");
				text.setAttributeNS(null,"style","text-anchor:middle;");
				text.textContent = obsel_date.toLocaleString().substr(4,3);
				
				//find svg				
				svg.appendChild(text);
				
				tAssistance.svg.align_middle(text, drawedObsel);
				
				// remove	
				months.splice(pos, 1);
				// add to the group
				g.appendChild(text);
				// add tooltip for label	
				tAssistance.tooltip.setTooltip(text, obsel_date.toString());
				
				drawMonths.push(text);
			}			
		}
		return drawMonths;
	}
	
	// attach months minors to drawed obsels 
	tAssistance.drawDates1 = function(drawedObsels){
		
		var dates = tAssistance.outil.getDates_svg(drawedObsels);
		var svg = drawedObsels[0].ownerSVGElement;
		var g = drawedObsels[0].parentNode;
		
		var width = 100,
		height = 18,
		x = 0,
		y = tAssistance.svg.lines["minor"],
		padding = 2;
		
		var svgNS = tAssistance.svg.svgNS;
		drawDates = [];
				
		for(var i=0;i<drawedObsels.length;i++) {
			var drawedObsel = drawedObsels[i];
			var obsel = drawedObsel.data["obsel"];
			var obsel_date = tAssistance.datetime.utc2LocalDate(obsel.begin);
			// reset hours in a date
			obsel_date.setHours(0,0,0,0);
			
			var match = tAssistance.datetime.in_array(dates,obsel_date);
			if(match){
				var pos = tAssistance.datetime.indexOf(dates,obsel_date);
				// get coordinates of the obsel								
				text = document.createElementNS(svgNS,"text");
				text.setAttributeNS(null,"x", 0);
				text.setAttributeNS(null,"y", y);
				text.setAttributeNS(null,"class","obsel lbl");
				text.setAttributeNS(null,"font-family","arial");
				text.setAttributeNS(null,"font-size","10");
				text.setAttributeNS(null,"fill","blue");
				text.setAttributeNS(null,"style","text-anchor:middle;");
				text.textContent = obsel_date.getDate();
				
				//find svg				
				svg.appendChild(text);
				
				tAssistance.svg.align_middle(text, drawedObsel);
				
				// remove	
				dates.splice(pos, 1);
				// add to the group
				g.appendChild(text);
				// add tooltip for label	
				tAssistance.tooltip.setTooltip(text, obsel_date.toString());
				
				drawDates.push(text);
			}			
		}
		return drawDates;
	}
	
	// attach hour annotations to drawed obsels 
	tAssistance.drawHours1 = function(drawedObsels){
			
		var hours = tAssistance.outil.getHours_svg(drawedObsels);
		var svg = drawedObsels[0].ownerSVGElement;
		var g = drawedObsels[0].parentNode;
		
		var width = 100,
		height = 11,
		x = 0,
		y = tAssistance.svg.lines["minor"],
		padding = 2;
		var svgNS = "http://www.w3.org/2000/svg";
		drawedHours = [];
				
		for(var i=0;i<drawedObsels.length;i++) {
			var drawedObsel = drawedObsels[i];
			var obsel = drawedObsel.data["obsel"];
			var obsel_date = tAssistance.datetime.utc2LocalDate(obsel.begin);
			obsel_date.setMinutes(0,0,0);
			
			var match = tAssistance.datetime.in_array(hours,obsel_date);
			if(match){
				var pos = tAssistance.datetime.indexOf(hours,obsel_date);
				// get coordinates of the obsel
								
				text = document.createElementNS(svgNS,"text");
				text.setAttributeNS(null,"x", 0);
				text.setAttributeNS(null,"y", y);
				text.setAttributeNS(null,"class","obsel lbl");
				text.setAttributeNS(null,"font-family","arial");
				text.setAttributeNS(null,"font-size","10");
				text.setAttributeNS(null,"fill","blue");
				text.setAttributeNS(null,"style","text-anchor:middle;");
				text.textContent = hours[pos].getHours()+"h";
				
				//find svg				
				svg.appendChild(text);
				
				tAssistance.svg.align_middle(text, drawedObsel);
				
				// remove	
				hours.splice(pos, 1);
				// add to the group
				g.appendChild(text);
				// add tooltip for label	
				tAssistance.tooltip.setTooltip(text, obsel_date.toString());
				
				drawedHours.push(text);
			}			
		}
		return drawedHours;
	}
	// attach minute minors to drawed obsels 
	tAssistance.drawMinutes1 = function(drawedObsels){
		
		var minutes = tAssistance.outil.getMinutes_svg(drawedObsels);
		var svg = drawedObsels[0].ownerSVGElement;
		var g = drawedObsels[0].parentNode;
		
		var width = 100,
		height = 18,
		x = 0,
		y = tAssistance.svg.lines["minor"],
		padding = 2;
		var svgNS = tAssistance.svg.svgNS;
		drawedminutes = [];
				
		for(var i=0;i<drawedObsels.length;i++) {
			var drawedObsel = drawedObsels[i];
			var obsel = drawedObsel.data["obsel"];
			var obsel_date = tAssistance.datetime.utc2LocalDate(obsel.begin);
			obsel_date.setSeconds(0,0);
			
			var match = tAssistance.datetime.in_array(minutes,obsel_date);
			if(match){
				var pos = tAssistance.datetime.indexOf(minutes,obsel_date);
				// get coordinates of the obsel
								
				text = document.createElementNS(svgNS,"text");
				text.setAttributeNS(null,"x", 0);
				text.setAttributeNS(null,"y", y);
				text.setAttributeNS(null,"class","obsel lbl");
				text.setAttributeNS(null,"font-family","arial");
				text.setAttributeNS(null,"font-size","10");
				text.setAttributeNS(null,"fill","blue");
				text.setAttributeNS(null,"style","text-anchor:middle;");
				text.textContent = minutes[pos].getMinutes();
				
				//find svg				
				svg.appendChild(text);
				
				tAssistance.svg.align_middle(text, drawedObsel);
				
				// remove	
				minutes.splice(pos, 1);
				// add to the group
				g.appendChild(text);
				// add tooltip for label	
				tAssistance.tooltip.setTooltip(text, obsel_date.toString());
				
				drawedminutes.push(text);
			}			
		}
		return drawedminutes;
	}
	
	// attach minute minors to drawed obsels 
	tAssistance.drawSeconds1 = function(drawedObsels){
		
		var seconds = tAssistance.outil.getSeconds_svg(drawedObsels);
		var svg = drawedObsels[0].ownerSVGElement;
		var g = drawedObsels[0].parentNode;
		
		var width = 100,
		height = 18,
		x = 0,
		y = tAssistance.svg.lines["minor"],
		padding = 2;
		var svgNS = tAssistance.svg.svgNS;
		drawSeconds = [];
				
		for(var i=0;i<drawedObsels.length;i++) {
			var drawedObsel = drawedObsels[i];
			var obsel = drawedObsel.data["obsel"];
			var obsel_date = tAssistance.datetime.utc2LocalDate(obsel.begin);
			obsel_date.setMilliseconds(0);
			
			var match = tAssistance.datetime.in_array(seconds,obsel_date);
			if(match){
				var pos = tAssistance.datetime.indexOf(seconds,obsel_date);
				// get coordinates of the obsel
								
				text = document.createElementNS(svgNS,"text");
				text.setAttributeNS(null,"x", 0);
				text.setAttributeNS(null,"y", y);
				text.setAttributeNS(null,"class","obsel lbl");
				text.setAttributeNS(null,"font-family","arial");
				text.setAttributeNS(null,"font-size","10");
				text.setAttributeNS(null,"fill","blue");
				text.setAttributeNS(null,"style","text-anchor:middle;");
				text.textContent = seconds[pos].getSeconds();
				
				//find svg				
				svg.appendChild(text);
				
				tAssistance.svg.align_middle(text, drawedObsel);
				
				// remove	
				seconds.splice(pos, 1);
				// add to the group
				g.appendChild(text);
				// add tooltip for label	
				tAssistance.tooltip.setTooltip(text, obsel_date.toString());
				
				drawSeconds.push(text);
			}			
		}
		return drawSeconds;
	}
	// draw years based on the group
	tAssistance.drawYears = function(drawObsels){
		var svgNS = tAssistance.svg.svgNS;
		var firstSvgObsel = drawObsels[0];
		var endSvgObsel = drawObsels[drawObsels.length-1];
		var firstObsel = firstSvgObsel.data["obsel"];
		var endObsel = endSvgObsel.data["obsel"];
		var firstDTInt = firstObsel.begin;
		var firstDT = tAssistance.datetime.utc2LocalDate(firstDTInt);
		var endDTInt = endObsel.begin;
		var endDT = tAssistance.datetime.utc2LocalDate(endObsel.begin);
		var g = firstSvgObsel.parentNode;
		var unit = parseInt(g.getAttribute("unit"));
		var offset = parseInt(g.getAttribute("timeoffset"));
		var y = tAssistance.svg.lines["major"];
		var height = 10;
		// reset all thing in a year to zeros
		firstDT.setMonth(0);
		firstDT.setDate(1);
		firstDT.setHours(0, 0, 0, 0);
		var startX = tAssistance.svg.getCenter(firstSvgObsel);
		
		var drawedYears = [];
		var iDateInt = firstDT.getTime();
		while(iDateInt<=endDTInt){
			var iDate = new Date(iDateInt);// copy don't need to convert
			var x = parseFloat((iDateInt - offset)/unit);
			
			text = document.createElementNS(svgNS,"text");
			text.setAttributeNS(null,"x", x);
			text.setAttributeNS(null,"y", y);
			text.setAttributeNS(null,"class","obsel lbl");
			text.setAttributeNS(null,"font-family","arial");
			text.setAttributeNS(null,"font-size","10");
			text.setAttributeNS(null,"fill","blue");
			text.setAttributeNS(null,"style","text-anchor:middle;");
			text.textContent = iDate.toLocaleString().substr(11, 4);
			
			// add to the group
			g.appendChild(text);
			// add tooltip for label	
			//tAssistance.tooltip.setTooltip(text, obsel_date.toString());
			
			drawedYears.push(text);
			
			// increment a month
			iDate = new Date(iDateInt);
			iDateInt = iDate.setYear(iDate.getYear()+1);
		}
		
		return drawedYears;
	}
	
	// draw months based on the group
	tAssistance.drawMonths = function(drawObsels){
		var svgNS = tAssistance.svg.svgNS;
		var firstSvgObsel = drawObsels[0];
		var endSvgObsel = drawObsels[drawObsels.length-1];
		var firstObsel = firstSvgObsel.data["obsel"];
		var endObsel = endSvgObsel.data["obsel"];
		var firstDTInt = firstObsel.begin;
		var firstDT = tAssistance.datetime.utc2LocalDate(firstDTInt);
		var endDTInt = endObsel.begin;
		var endDT = tAssistance.datetime.utc2LocalDate(endObsel.begin);
		var g = firstSvgObsel.parentNode;
		var unit = parseInt(g.getAttribute("unit"));
		var offset = parseInt(g.getAttribute("timeoffset"));
		var y = tAssistance.svg.lines["major"];
		var height = 10;
		// reset all thing in a month to zeros
		firstDT.setDate(1);
		firstDT.setHours(0, 0, 0, 0);
		var startX = tAssistance.svg.getCenter(firstSvgObsel);
		
		var drawedMonths = [];
		var iDateInt = firstDT.getTime();
		while(iDateInt<=endDTInt){
			var iMonth = new Date(iDateInt);
			var x = parseFloat((iDateInt - offset)/unit);
			
			text = document.createElementNS(svgNS,"text");
			text.setAttributeNS(null,"x", x);
			text.setAttributeNS(null,"y", y);
			text.setAttributeNS(null,"class","obsel lbl");
			text.setAttributeNS(null,"font-family","arial");
			text.setAttributeNS(null,"font-size","10");
			text.setAttributeNS(null,"fill","blue");
			text.setAttributeNS(null,"style","text-anchor:middle;");
			text.textContent = iMonth.toLocaleString().substr(4, 3)+" "+iMonth.toLocaleString().substr(11, 4);
			
			// add to the group
			g.appendChild(text);
			// add tooltip for label	
			//tAssistance.tooltip.setTooltip(text, obsel_date.toString());
			
			drawedMonths.push(text);
			
			// increment a month
			iDate = new Date(iDateInt);
			iDateInt = iDate.setMonth(iDate.getMonth()+1);
		}
		
		return drawedMonths;
	}
	// draw weeks based on the group
	tAssistance.drawWeeks = function(drawObsels){
		var svgNS = tAssistance.svg.svgNS;
		var firstSvgObsel = drawObsels[0];
		var endSvgObsel = drawObsels[drawObsels.length-1];
		var firstObsel = firstSvgObsel.data["obsel"];
		var endObsel = endSvgObsel.data["obsel"];
		var firstDTInt = firstObsel.begin;
		var firstDT = tAssistance.datetime.utc2LocalDate(firstDTInt);
		var endDTInt = endObsel.begin;
		var endDT = tAssistance.datetime.utc2LocalDate(endObsel.begin);
		var g = firstSvgObsel.parentNode;
		var unit = parseInt(g.getAttribute("unit"));
		var offset = parseInt(g.getAttribute("timeoffset"));
		var y = tAssistance.svg.lines["major"];
		var height = 10;
		
		firstDT.setHours(0, 0, 0, 0);
		var day = firstDT.getDay();
		firstDT.setDate(firstDT.getDate()-day+1);
		
		var startX = tAssistance.svg.getCenter(firstSvgObsel);
		
		var drawedDates = [];
		var iDateInt = firstDT.getTime();
		while(iDateInt<=endDTInt){
			var beginWeek = new Date(iDateInt);
			var tmpDate = new Date(iDateInt);
			tmpDate.setDate(tmpDate.getDate()+6);
			var endWeek = tmpDate;
			
			var x = parseFloat((iDateInt - offset)/unit);
			
			text = document.createElementNS(svgNS,"text");
			text.setAttributeNS(null,"x", x);
			text.setAttributeNS(null,"y", y);
			text.setAttributeNS(null,"class","obsel lbl");
			text.setAttributeNS(null,"font-family","arial");
			text.setAttributeNS(null,"font-size","10");
			text.setAttributeNS(null,"fill","blue");
			text.setAttributeNS(null,"style","text-anchor:middle;");
			text.textContent = beginWeek.toLocaleString().substr(4, 11);
			
			// add to the group
			g.appendChild(text);
			// add tooltip for label	
			//tAssistance.tooltip.setTooltip(text, obsel_date.toString());
			
			drawedDates.push(text);
			
			// increment date
			iDate = new Date(iDateInt);
			iDateInt = iDate.setDate(iDate.getDate()+7);
		}
		
		return drawedDates;
	}
	
	// draw dates based on the group
	tAssistance.drawDates = function(drawObsels){
		var svgNS = tAssistance.svg.svgNS;
		var firstSvgObsel = drawObsels[0];
		var endSvgObsel = drawObsels[drawObsels.length-1];
		var firstObsel = firstSvgObsel.data["obsel"];
		var endObsel = endSvgObsel.data["obsel"];
		var firstDTInt = firstObsel.begin;
		var firstDT = tAssistance.datetime.utc2LocalDate(firstDTInt);
		var endDTInt = endObsel.begin;
		var endDT = tAssistance.datetime.utc2LocalDate(endDTInt);
		var g = firstSvgObsel.parentNode;
		var unit = parseInt(g.getAttribute("unit"));
		var offset = parseInt(g.getAttribute("timeoffset"));
		var y = tAssistance.svg.lines["major"];
		var height = 10;
		
		firstDT.setHours(0, 0, 0, 0);
		var startX = tAssistance.svg.getCenter(firstSvgObsel);
		
		var drawedDates = [];
		var iDateInt = firstDT.getTime();
		while(iDateInt<=endDTInt){
			var iDate = new Date(iDateInt); 
			var x = parseFloat((iDateInt - offset)/unit);
			
			text = document.createElementNS(svgNS,"text");
			text.setAttributeNS(null,"x", x);
			text.setAttributeNS(null,"y", y);
			text.setAttributeNS(null,"class","obsel lbl");
			text.setAttributeNS(null,"font-family","arial");
			text.setAttributeNS(null,"font-size","10");
			text.setAttributeNS(null,"fill","blue");
			text.setAttributeNS(null,"style","text-anchor:middle;");
			text.textContent = iDate.toLocaleString().substr(4, 11);
			
			// add to the group
			g.appendChild(text);
			// add tooltip for label	
			//tAssistance.tooltip.setTooltip(text, obsel_date.toString());
			
			drawedDates.push(text);
			
			// increment date			
			iDateInt = iDate.setDate(iDate.getDate()+1);
		}
		
		return drawedDates;
	}
	
	tAssistance.drawHours = function(drawObsels){
		var svgNS = tAssistance.svg.svgNS;
		var firstSvgObsel = drawObsels[0];
		var endSvgObsel = drawObsels[drawObsels.length-1];
		var firstObsel = firstSvgObsel.data["obsel"];
		var endObsel = endSvgObsel.data["obsel"];
		var firstDTInt = firstObsel.begin;
		var firstDT = tAssistance.datetime.utc2LocalDate(firstDTInt);
		var endDTInt = endObsel.begin;
		var endDT = tAssistance.datetime.utc2LocalDate(endDTInt);
		var g = firstSvgObsel.parentNode;
		var unit = parseInt(g.getAttribute("unit"));
		var offset = parseInt(g.getAttribute("timeoffset"));
		var y = tAssistance.svg.lines["major"];
		var height = 10;
		
		firstDT.setMinutes(0, 0, 0);
		var startX = tAssistance.svg.getCenter(firstSvgObsel);
		
		var drawedDates = [];
		var iDateInt = firstDT.getTime();
		while(iDateInt<=endDTInt){
			var iDate = new Date(iDateInt);
			var x = parseFloat((iDateInt - offset)/unit);
			
			text = document.createElementNS(svgNS,"text");
			text.setAttributeNS(null,"x", x);
			text.setAttributeNS(null,"y", y);
			text.setAttributeNS(null,"class","obsel lbl");
			text.setAttributeNS(null,"font-family","arial");
			text.setAttributeNS(null,"font-size","10");
			text.setAttributeNS(null,"fill","blue");
			text.setAttributeNS(null,"style","text-anchor:middle;");
			text.textContent = iDate.toLocaleString().substr(0, 21);
			
			// add to the group
			g.appendChild(text);
			// add tooltip for label	
			//tAssistance.tooltip.setTooltip(text, obsel_date.toString());
			
			drawedDates.push(text);
			
			// increment date			
			iDateInt = iDate.setHours(iDate.getHours()+1);
		}
		
		return drawedDates;
	}
	
	tAssistance.drawMinutes = function(drawObsels){
		var svgNS = tAssistance.svg.svgNS;
		var firstSvgObsel = drawObsels[0];
		var endSvgObsel = drawObsels[drawObsels.length-1];
		var firstObsel = firstSvgObsel.data["obsel"];
		var endObsel = endSvgObsel.data["obsel"];
		var firstDTInt = firstObsel.begin;
		var firstDT = tAssistance.datetime.utc2LocalDate(firstDTInt);
		var endDTInt = endObsel.begin;
		var endDT = tAssistance.datetime.utc2LocalDate(endObsel.begin);
		var g = firstSvgObsel.parentNode;
		var unit = parseInt(g.getAttribute("unit"));
		var offset = parseInt(g.getAttribute("timeoffset"));
		var y = tAssistance.svg.lines["major"];
		var height = 10;
		
		firstDT.setSeconds(0, 0);
		var startX = tAssistance.svg.getCenter(firstSvgObsel);
		
		var drawedDates = [];
		var iDateInt = firstDT.getTime();
		while(iDateInt<=endDTInt){
			var iDate = new Date(iDateInt);
			var x = parseFloat((iDateInt - offset)/unit);
			
			text = document.createElementNS(svgNS,"text");
			text.setAttributeNS(null,"x", x);
			text.setAttributeNS(null,"y", y);
			text.setAttributeNS(null,"class","obsel lbl");
			text.setAttributeNS(null,"font-family","arial");
			text.setAttributeNS(null,"font-size","10");
			text.setAttributeNS(null,"fill","blue");
			text.setAttributeNS(null,"style","text-anchor:middle;");
			text.textContent = iDate.toLocaleString().substr(0, 21);
			
			// add to the group
			g.appendChild(text);
			// add tooltip for label	
			//tAssistance.tooltip.setTooltip(text, obsel_date.toString());
			
			drawedDates.push(text);
			
			// increment date
			
			iDateInt = iDate.setMinutes(iDate.getMinutes()+1);
		}
		
		return drawedDates;
	}
	
	tAssistance.move = function(g, newOffset){
		var unit = parseInt(g.getAttribute("unit"));
		var oldOffset = parseInt(g.getAttribute("timeoffset"));
		var translate_x = - parseFloat((newOffset - oldOffset)/unit);
		var childNodes = g.childNodes;
		
		for(i=0;i<childNodes.length;i++){
    		childNode = childNodes[i];
    		var x = 0;
    		if(childNode.getAttribute("cx")){
    			x = parseFloat(childNode.getAttribute("cx"));
    			childNode.setAttribute("cx", x + translate_x);		    	
    		}
    		else{
    			x = parseFloat(childNode.getAttribute("x"));
    			childNode.setAttribute("x", x + translate_x);		    	
    		}		
    	}
		g.setAttribute("timeoffset",newOffset);
		return childNodes;
	}	
	
tAssistance.processKeyPress = function(g,evt){
	var ta = tAssistance;
	
	var transform_obj = tAssistance.svg.group.parse_transform(g);
            
      switch (evt.keyCode)
      {
        case ta.key.leftArrow:
        	transform_obj["translate.x"] -= ta.config.panRate;	// Increase the x-coordinate value of the transform attribute by the amount given by panRate.
          break;
        case ta.key.rightArrow:
        	transform_obj["translate.x"] += ta.config.panRate;	// Decrease the x-coordinate value of the transform attribute by the amount given by panRate.
          break;
        case ta.key.upArrow:
        	transform_obj["scale.x"] += ta.config.zoomRate;	    // Increase the x-scale value of the transform attribute by the amount given by zoomRate.        
          break;
        case ta.key.downArrow:
        	transform_obj["scale.x"] -= ta.config.zoomRate;	// Decrease the x-scale value of the transform attribute by the amount given by zoomRate. 
          break;               
      } // switch
      
      g.setAttribute('transform', tAssistance.svg.group.make_transform_str(transform_obj));	// Convert the viewBoxValues array into a string with a white space character between the given values.
}
	
	var isDown = false;
	
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
				//rect.setAttribute("style","background-color: yellow");
				rect.setAttribute("style","fill: #F9F9F9");
				rect.setAttribute("width","100%");
				rect.setAttribute("height","100%");
				
				svg.appendChild(rect);
				
				var g = document.createElementNS(svgNS,"g");				
				g.setAttribute("transform","translate(0 0) scale(1 1)");
				svg.appendChild(g);
				
				// debug
				window.svg = svg;
				
				//positions = tAssistance.position_obsels(obsels, opts);
				//console.log(positions);
				
				drawedObsels = tAssistance.draw_obsels3(obsels, g, tAssistance.datetime.units[0]);
				tAssistance.drawYears(drawedObsels);
				tAssistance.drawMonths1(drawedObsels);
				//console.log(positions);
				
				/* Add event listeners:  */
			    $(document).keydown(function(e){
			    	tAssistance.processKeyPress(g,e);
			    });		    
		    	// add MouseEvents		    
			    tAssistance.svg.mousepad(rect,g);
			    // add TouchEvents
			    tAssistance.svg.touchpad(rect,g);
			}
		});		
	}
	
tAssistance.getObsels = function(base_uri, name, callback){
	mgr = new tService.TraceManager({
		"base_uri": base_uri,
		async: true
	});
	trc = mgr.init_trace({
		name: trace_name
	});
	trc.get_obsels({
		success: function(obsels){
			if(tAssistance.debug){
				window.obsels = obsels;
				console.log("ret = obsels");
			}
			callback(obsels);
		}		
	});	
}