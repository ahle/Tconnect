/*
	require jQuery
*/
(function(){
	var root = this;
	//var previous_jTBA = root.jTBA;
	var tAssistant = tAssistant === undefined ? {} : tAssistant;
	
	tAssistant.TraceWidget = function(options){
		var getx = function(d){
			var date = new Date(d["begin"]);
			return date;
		};
		
		var gety = function(d){
			return d["user"];
		};
		
		var color = function(d){ 
			return "green";
		};
		
		var getSymbol = function(d){
			return "/tracestore/tAssistant/img/ozem_m.png";
		}
		
		console.log("initialize TraceView");
					
		var margin = {top: 5.5, right: 19.5, bottom: 80, left: 60};
		var view_mode = d3.fisheye;
		if(options){
			this.container = options.container;
			this.source = options.source;				
		}
		//console.log(this.container);
		container = this.container;
		//console.log("source =" + config);
		
		var timeticks = [[d3.time.days,1,"%Y-%b-%d"],[d3.time.hours,4,"%Y-%b-%d %H"]];
		var win_width = window.outerWidth;
		//var bd = document.body;
		
		// calcul the width and height of the container 
		var width = 600, height = 150;		
		
		//var xs = [];
		// set default for graph and redraw after loading data
		var xScale = d3.time.scale().domain([new Date(), new Date()]).range([0, width]),
	    	yScale = d3.scale.ordinal().domain(["obsel"]).range([height - 20]);

		// The x & y axes.
		var customTimeFormat = timeFormat([
		                                   [d3.time.format("%Y"), function() { return true; }],
		                                   [d3.time.format("%B"), function(d) { return d.getMonth(); }],
		                                   [d3.time.format("%b %d"), function(d) { return d.getDate() != 1; }],
		                                   [d3.time.format("%a %d"), function(d) { return d.getDay() && d.getDate() != 1; }],
		                                   [d3.time.format("%I %p"), function(d) { return d.getHours(); }],
		                                   [d3.time.format("%I:%M"), function(d) { return d.getMinutes(); }],
		                                   [d3.time.format(":%S"), function(d) { return d.getSeconds(); }],
		                                   [d3.time.format(".%L"), function(d) { return d.getMilliseconds(); }]
		                                 ]);
		function timeFormat(formats) {
			  return function(date) {
			    var i = formats.length - 1, f = formats[i];
			    while (!f[1](date)) f = formats[--i];
			    return f[0](date);
			  };
			}
		
		var xAxis = d3.svg.axis().orient("bottom").scale(xScale).ticks(10).tickFormat(customTimeFormat), 
			//d3.svg.axis().orient("bottom").scale(xScale).ticks().tickFormat(d3.time.format("%Y-%b-%d")).tickSubdivide(5).tickSize(-20,-10,0),
	      	yAxis = d3.svg.axis().scale(yScale).orient("left")//.tickFormat(function(d){return "";})//.tickPadding(10).tickSize(-width)
	      	;
		
		// create trace panel
		var idnum = Math.floor(Math.random()*100);
		var rootid = "trace_viz"+idnum;
		this.rootid = rootid;
	    $(container).append("<table id='"+rootid+"'><tr><td class='trace_grid'></td><td style='font-family: arial; font-size: small'>Properties<div class='trace_property' style=' overflow: auto; width:200px'></div></td></tr>"
	    		+"<tr><td colspan='2' style='font-family: arial; font-size: small'>x: <span class='trans_x'>0</span> y:<span class='trans_y'>0</span> scale: <span class='scale'>0</span> source: <span class='source'>"+this.source+"</span></td></tr>"
	    		+"<tr><td colspan='2' style='font-family: arial; font-size: small'>Command <input type='input' class='cmd_input' /><button class='bt_run' >Run</button></td></tr></table>");
		var root_element = $("#"+rootid).get(0);
	    var trace_grid = $("#"+rootid+" .trace_grid").get(0);
		
		// Create the SVG container and set the origin.
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
		  
		  // bind events for runcmd
		  $("#"+rootid+" .bt_run").click(function(){
			  var cmd_input = $("#"+rootid+" .cmd_input").val();
			  var tracegrid_ctl = $("#"+rootid).get(0).tracegrid_ctl;
			  tracegrid_ctl.runCmd(rootid,cmd_input);			  
		  });
	      		      
		  d3.json(this.source, function(obselset) {

			  var xs = d3.extent(obselset, function(d){
						return new Date(d["begin"]);
					});
			  var yset = [];
			  for(var i=0;i<obselset.length;i++){
				  if($.inArray(obselset[i]["user"],yset)==-1){
					  yset.push(obselset[i]["user"]);
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
				
			    // Add a dot per obsel 
			    var dot = svg.append("g")
			        .attr("class", "dots")
			        //.attr("class", "obselset")
			      .selectAll(".dot")
			        .data(obselset)
			      .enter().append("svg:image")
			        .attr("class", "dot")
			        //.attr("d",d3.svg.symbol().type(function(d){return symbol(d);}).size(128))
			        .attr("xlink:href",function(d){return getSymbol(d);})
			        .attr("width","20")
			        .attr("height","20")				        
			        //.style("fill", function(d) { return color(d); })
			        .call(function(dot){
			        	dot.attr("transform", function(d) {
					    	  return "translate("+xScale(getx(d))+","+yScale(gety(d))+")"; 
					      });	
			        })
			        .on("click", function(d,i){// add click event on obsel
			        					        	
			        	var tableHtml = "<table>";
			        	for(var p in d){
			        		if(d.hasOwnProperty(p)){
			        			var o = d[p];
			        			if(p=="begin"||p=="end"){
			        				o = (new Date(o)).toUTCString();
			        			}
			        			var rowHtml = "<tr><td>"+p+"</td><td>"+o+"</td></tr>";
			        			tableHtml+= rowHtml;
			        		}
			        	}
			        	tableHtml+="</table>";
			        	$("#"+rootid+" .trace_property").empty().append(tableHtml);
			        });
			    
			    
			    // Add a title.
			    dot.append("title")
			        .text(function(d) {							
				        return (new Date(d["begin"])).toUTCString();
				});
			    
			    // save dot in tracegrid_ctl
			    tracegrid_ctl.dot = dot;
				
		  });
		  
		  tracegrid_ctl.runCmd = function(rootid, cmdline){
				if(cmdline.indexOf("obsel.size = ")>=0){	
					var size_val = cmdline.substr("obsel.size = ".length);
					tracegrid_ctl = $("#"+rootid).get(0).tracegrid_ctl;
					tracegrid_ctl.svg.selectAll(".dot").call(function(d){ d.attr("d",d3.svg.symbol().type("circle").size(size_val));});
				}
				else if(cmdline.indexOf("xAxis *= ")>=0){
					var multiple_val = parseFloat(cmdline.substr("xAxis *= ".length));
					tracegrid_ctl = $("#"+rootid).get(0).tracegrid_ctl;
					// var
					xScale = tracegrid_ctl.xScale;
					yScale = tracegrid_ctl.yScale;
					getx = tracegrid_ctl.getx;
					gety = tracegrid_ctl.gety;
					width = tracegrid_ctl.width;
					xAxis = tracegrid_ctl.xAxis;
					// update
					width = Math.floor(multiple_val*width);
					xScale = xScale.range([0, width]);
					xAxis = xAxis.scale(xScale);
					
					// save 
					tracegrid_ctl.xScale = xScale;
					tracegrid_ctl.xAxis = xAxis;
					tracegrid_ctl.width = width;
					
					// redraw graph
					tracegrid_ctl.svg.selectAll(".dot").call(function(d){	
						d.attr("transform",function(d1) {
							return "translate("+xScale(getx(d1))+","+yScale(gety(d1))+")"; 
						});
					});
					// redraw xaxis
					tracegrid_ctl.svg.selectAll(".x.axis").call(xAxis);
					// redraw background
					$("#"+rootid+" .background").attr("width", width);
				}
				else if(cmdline.indexOf("mode = array")>=0){
					tracegrid_ctl = $("#"+rootid).get(0).tracegrid_ctl;
					// var
					xScale = tracegrid_ctl.xScale;
					yScale = tracegrid_ctl.yScale;
					getx = tracegrid_ctl.getx;
					gety = tracegrid_ctl.gety;
					width = tracegrid_ctl.width;
					xAxis = tracegrid_ctl.xAxis;	
					
					//update
					length = tracegrid_ctl.svg.selectAll(".dot")[0].length;
					xScale = d3.scale.linear().domain([0, length]).range([0, 20*length]);
					data = [];
					for(var i=0;i<length;i++){
						data.push(i);
					}
					// redraw graph
					tracegrid_ctl.svg.selectAll(".dot").call(function(dots){
						dots.attr("transform",function(dot,i) {
							return "translate("+xScale(i)+","+yScale(gety(dot))+")"; 
						});
					});
					// redraw xaxis
					xAxis = d3.svg.axis().orient("bottom").scale(xScale);
					//tracegrid_ctl.svg.selectAll(".x.axis").remove();
					var axis = tracegrid_ctl.svg.select(".x.axis")
						.call(xAxis)
					// redraw background
					$("#"+rootid+" .background").attr("width", 20*length);						
				}
				else if(cmdline.indexOf("mode = timeline")>=0){
									
			}
		};
	};
			
    // Expose TraceOz à l'objet global
    root.tAssistant.TraceWidget =  tAssistant.TraceWidget;
	
}).call(this);