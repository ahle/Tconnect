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
				
		//document.body.appendChild(svg);
		$.each(positions, function(index, position){
			color = '#'+Math.floor(Math.random()*16777215).toString(16);
		
			myCircle = document.createElementNS(svgNS,"circle");
			myCircle.setAttributeNS(null,"cx",position.x);
			myCircle.setAttributeNS(null,"cy",position.y);
			myCircle.setAttributeNS(null,"r",8);
			myCircle.setAttributeNS(null,"style","fill: "+color+"; stroke: black");
			//myCircle.setAttributeNS(null,"stroke","black");
			
			g.appendChild(myCircle);

			// attach the event
			$(myCircle).click(function(e){
				var obsel_in_html = tAssistance.obsel_property({
		    		"obsel": position.source_obsel, 
		    		"container": "#controlPanel"
		    		});
			});
					
		});
		
	}
	
	tAssistance.position_obsels = function(obsels, opts){
		var x_unit = opts.x_unit,
		x0 = opts.x0,
		y0 = opts.y0;
		
		// calculate the positions of obsels based on x0,y0
		var result = [];
		$.each(obsels, function(index, obsel){
			var item = new Object();
			item.x = index*x_unit+x0;
			item.y = y0;
			item.source_obsel = obsel;
			
			result.push(item);
		});
		
		return result;		
	}
	
	/* Constants: */
    var leftArrow  = 37;	// Key code for the left arrow key.
    var upArrow    = 38;
    var rightArrow = 39;
    var downArrow  = 40;
    var panRate    = 10;	// Number of pixels to pan per key press.
	var zoomRate   = 0.25;
	tAssistance.processKeyPress = function(g,evt){
	  
	 
	function parse_transform(transform){
		// parse the transform property
		  var charTransformSplit = ' ';
		  var charNumberSplit = ' ';
	      
	      var translate = transform.split(')'+charTransformSplit)[0]+')';
	      var translateValues = translate.replace("translate(","").slice(0,-1).split(charNumberSplit);
	      var scale = transform.split(')'+charTransformSplit)[1];
	      var scaleValues = scale.replace("scale(","").slice(0,-1).split(charNumberSplit);
	      var translate_x = 0;
	      var translate_y = 0;
	      var scale_x = 0;
	      var scale_y = 0;
	      
	      translate_x = parseFloat(translateValues[0]);	// Represent the x-coordinate on the transform attribute.
	      if(translateValues.length>1){
	    	  translate_y = parseFloat(translateValues[1]);	// Represent the y coordinate on the transform attribute.
		  }
	      else{// IE
	    	  translate_y = translate_x;
	      }
	      
	      scale_x = parseFloat(scaleValues[0]); // Represent the x-scale on the transform attribute.
	      if(scaleValues.length>1){
	    	  scale_y = parseFloat(scaleValues[1]);	// Represent the y scale on the transform attribute.
		  }
	      else{// IE
	    	  scale_y = scale_x;
	      }	      
	      
	      ret = {
	          "translate.x": translate_x,
	          "translate.y": translate_y,
	          "scale.x": scale_x,
	          "scale.y": scale_y
	      };
	      return ret;	      
	 }
	function make_transform_str(transform_obj){
		var charTransformSplit = ' ';
		var charNumberSplit = ' ';
		
		return "translate("+transform_obj["translate.x"]+charNumberSplit+transform_obj["translate.y"]+") scale("+transform_obj["scale.x"]+charNumberSplit+transform_obj["scale.y"]+")";		
	}
	var transform_str = g.getAttribute('transform');
	var transform_obj = parse_transform(transform_str);
      
      
      switch (evt.keyCode)
      {
        case leftArrow:
        	transform_obj["translate.x"] -= panRate;	// Increase the x-coordinate value of the transform attribute by the amount given by panRate.
          break;
        case rightArrow:
        	transform_obj["translate.x"] += panRate;	// Decrease the x-coordinate value of the transform attribute by the amount given by panRate.
          break;
        case upArrow:
        	transform_obj["scale.x"] += zoomRate;	    // Increase the x-scale value of the transform attribute by the amount given by zoomRate.        
          break;
        case downArrow:
        	transform_obj["scale.x"] -= zoomRate;	// Decrease the x-scale value of the transform attribute by the amount given by zoomRate. 
          break;               
      } // switch
      
      g.setAttribute('transform', make_transform_str(transform_obj));	// Convert the viewBoxValues array into a string with a white space character between the given values.
    }
	
	var isDown = false;
	//var startCoords = {};
	//var last = [0, 0];
	
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
						y0: 10
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
				
				$("#chart1").get(0).appendChild(svg);
				
				var rect = document.createElementNS(svgNS,"rect");
				//rect.setAttribute("style","background-color: yellow");
				rect.setAttribute("style","fill: yellow");
				rect.setAttribute("width","100%");
				rect.setAttribute("height","100%");
				
				svg.appendChild(rect);
				
				var g = document.createElementNS(svgNS,"g");				
				g.setAttribute("transform","translate(0 0) scale(1 1)");
				svg.appendChild(g);
				
				
				
				positions = tAssistance.position_obsels(obsels, opts);
				//console.log(positions);
				
				positions = tAssistance.draw_obsels2({"g": g,"positions": positions});
				//console.log(positions);
				
				/* Add event listeners:  */
			    $(document).keydown(function(e){
			    	tAssistance.processKeyPress(g,e);
			    });
			    
			    var parse_transform = function (transform){
		    		// parse the transform property
		    		  var charTransformSplit = ' ';
		    		  var charNumberSplit = ' ';
		    	      
		    	      var translate = transform.split(')'+charTransformSplit)[0]+')';
		    	      var translateValues = translate.replace("translate(","").slice(0,-1).split(charNumberSplit);
		    	      var scale = transform.split(')'+charTransformSplit)[1];
		    	      var scaleValues = scale.replace("scale(","").slice(0,-1).split(charNumberSplit);
		    	      var translate_x = 0;
		    	      var translate_y = 0;
		    	      var scale_x = 0;
		    	      var scale_y = 0;
		    	      
		    	      translate_x = parseFloat(translateValues[0]);	// Represent the x-coordinate on the transform attribute.
		    	      if(translateValues.length>1){
		    	    	  translate_y = parseFloat(translateValues[1]);	// Represent the y coordinate on the transform attribute.
		    		  }
		    	      else{// IE
		    	    	  translate_y = translate_x;
		    	      }
		    	      
		    	      scale_x = parseFloat(scaleValues[0]); // Represent the x-scale on the transform attribute.
		    	      if(scaleValues.length>1){
		    	    	  scale_y = parseFloat(scaleValues[1]);	// Represent the y scale on the transform attribute.
		    		  }
		    	      else{// IE
		    	    	  scale_y = scale_x;
		    	      }	      
		    	      
		    	      ret = {
		    	          "translate.x": translate_x,
		    	          "translate.y": translate_y,
		    	          "scale.x": scale_x,
		    	          "scale.y": scale_y
		    	      };
		    	      return ret;	      
		    	};
		    	 
		    	var make_transform_str = function(transform_obj){
		    		var charTransformSplit = ' ';
		    		var charNumberSplit = ' ';
		    		
		    		return "translate("+transform_obj["translate.x"]+charNumberSplit+transform_obj["translate.y"]+") scale("+transform_obj["scale.x"]+charNumberSplit+transform_obj["scale.y"]+")";		
		    	};
			    
			    $(rect).mousedown(function(e) {
			    	mouseDown = "true";
			        var posx = 0;
			        var posy = 0;
			        if(!e) var e = window.event;
			        if (e.pageX || e.pageY) {
				        posx = e.pageX;
				        posy = e.pageY;
			        }
			        else if (e.clientX || e.clientY) {
				        posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
				        posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
			        }
			        e.preventDefault();
			        
			        
			    	var transform_str = g.getAttribute('transform');
			    	var transform_obj = parse_transform(transform_str);
			        			        			        
			        g.setAttribute("mouseDown.x",posx);
			        g.setAttribute("mouseDown.y",posy);
			        g.setAttribute("group.x",transform_obj["translate.x"]);
			        g.setAttribute("group.y",transform_obj["translate.y"]);
			        g.setAttribute("mouseDown", mouseDown);
			        
			    });
			    
			    $(rect).mouseup(function(e) {
			    	mouseDown = "";
			    	g.setAttribute("mouseDown", mouseDown);
			        if(!e) var e = window.event;
			        e.preventDefault();
			        
			    });

			    $(rect).mousemove(function(e){
			    	if(!e) var e = window.event;
			    	e.preventDefault();
			    	//return;
			    	var mouseDown = g.getAttribute("mouseDown");
			    	
			        if(!mouseDown || mouseDown == "") return;
			        //console.log("panning");
			        var posx = 0;
			        var posy = 0;
			        if (e.pageX || e.pageY) {
				        posx = e.pageX;
				        posy = e.pageY;
			        }
			        else if (e.clientX || e.clientY) {
				        posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
				        posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
			        }
			        /*function parse_transform(transform){
			    		// parse the transform property
			    		  var charTransformSplit = ' ';
			    		  var charNumberSplit = ' ';
			    	      
			    	      var translate = transform.split(')'+charTransformSplit)[0]+')';
			    	      var translateValues = translate.replace("translate(","").slice(0,-1).split(charNumberSplit);
			    	      var scale = transform.split(')'+charTransformSplit)[1];
			    	      var scaleValues = scale.replace("scale(","").slice(0,-1).split(charNumberSplit);
			    	      var translate_x = 0;
			    	      var translate_y = 0;
			    	      var scale_x = 0;
			    	      var scale_y = 0;
			    	      
			    	      translate_x = parseFloat(translateValues[0]);	// Represent the x-coordinate on the transform attribute.
			    	      if(translateValues.length>1){
			    	    	  translate_y = parseFloat(translateValues[1]);	// Represent the y coordinate on the transform attribute.
			    		  }
			    	      else{// IE
			    	    	  translate_y = translate_x;
			    	      }
			    	      
			    	      scale_x = parseFloat(scaleValues[0]); // Represent the x-scale on the transform attribute.
			    	      if(scaleValues.length>1){
			    	    	  scale_y = parseFloat(scaleValues[1]);	// Represent the y scale on the transform attribute.
			    		  }
			    	      else{// IE
			    	    	  scale_y = scale_x;
			    	      }	      
			    	      
			    	      ret = {
			    	          "translate.x": translate_x,
			    	          "translate.y": translate_y,
			    	          "scale.x": scale_x,
			    	          "scale.y": scale_y
			    	      };
			    	      return ret;	      
			    	 }
			    	function make_transform_str(transform_obj){
			    		var charTransformSplit = ' ';
			    		var charNumberSplit = ' ';
			    		
			    		return "translate("+transform_obj["translate.x"]+charNumberSplit+transform_obj["translate.y"]+") scale("+transform_obj["scale.x"]+charNumberSplit+transform_obj["scale.y"]+")";		
			    	}*/
			    	var transform_str = g.getAttribute('transform');
			    	var transform_obj = parse_transform(transform_str);
			        
			    	// read coordinations
			    	var mousedown_x = parseFloat(g.getAttribute("mouseDown.x"));
			    	var mousedown_y = parseFloat(g.getAttribute("mouseDown.y"));
			        var group_x = parseFloat(g.getAttribute("group.x"));
			        var group_y = parseFloat(g.getAttribute("group.y"));
			    	
			        // transform		    	
			    	
			    	transform_obj["translate.x"] = posx - mousedown_x + group_x;
			        //translateValues[1] = y - startCoords["mouseDown.y"] + startCoords["group.y"];
			    	transform_obj["translate.y"] = group_y;
			        
			        //console.log(startCoords);
			        //this.(1, 0, 0, 1,
			        //                 x - startCoords[0], y - startCoords[1]);
			        //g.setAttributeNS(null,"transform", "translate("+ (x - startCoords[0]) +","+ (startCoords[1]) +")");
			        g.setAttribute('transform', make_transform_str(transform_obj));	
			        
			        
			        //render();
			    });
			    // add TouchEvents
			    rect.addEventListener('touchstart', function(e){
			    	if(!e) var e = window.event;
			    	e.preventDefault();
			    	
			    	touchstart = "true";
			        var posx = 0;
			        var posy = 0;
			        var touchobj = e.changedTouches[0];
			        
			        posx = touchobj.clientX;
			        posy = touchobj.clientY;
			        
			        			        
			    	var transform_str = g.getAttribute('transform');
			    	var transform_obj = parse_transform(transform_str);
			        			        			        
			        g.setAttribute("touchstart.x",posx);
			        g.setAttribute("touchstart.y",posy);
			        g.setAttribute("group.x",transform_obj["translate.x"]);
			        g.setAttribute("group.y",transform_obj["translate.y"]);
			        g.setAttribute("touchstart", touchstart);			    	
			    	
			    }, false);
			    
			    rect.addEventListener('touchend', function(e){
			    	touchstart = "";
			    	g.setAttribute("touchstart", touchstart);
			        if(!e) var e = window.event;
			        e.preventDefault();	
			    	
			    }, false);
			    
			    rect.addEventListener('touchmove',function(e){
			    	if(!e) var e = window.event;
			    	e.preventDefault();
			    	
			    	var touchstart = g.getAttribute("touchstart");
			    	
			        if(!touchstart || touchstart == "") return;
			        
			        var posx = 0;
			        var posy = 0;
			       
			        var touchobj = e.changedTouches[0];
			        
			        posx = touchobj.clientX;
			        posy = touchobj.clientY;
			        
			    	var transform_str = g.getAttribute('transform');
			    	var transform_obj = parse_transform(transform_str);
			        
			    	// read coordinations
			    	var touchstart_x = parseFloat(g.getAttribute("touchstart.x"));
			    	var touchstart_y = parseFloat(g.getAttribute("touchstart.y"));
			        var group_x = parseFloat(g.getAttribute("group.x"));
			        var group_y = parseFloat(g.getAttribute("group.y"));
			    	
			        // transform		    	
			    	
			    	transform_obj["translate.x"] = posx - touchstart_x + group_x;
			        //translateValues[1] = y - startCoords["mouseDown.y"] + startCoords["group.y"];
			    	transform_obj["translate.y"] = group_y;
			        
			        //console.log(startCoords);
			        //this.(1, 0, 0, 1,
			        //                 x - startCoords[0], y - startCoords[1]);
			        //g.setAttributeNS(null,"transform", "translate("+ (x - startCoords[0]) +","+ (startCoords[1]) +")");
			        g.setAttribute('transform', make_transform_str(transform_obj));	
			        
			        
			        //render();
			    });
			}
		});		
	}
	