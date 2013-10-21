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
			myCircle.setAttributeNS(null,"fill",color);
			myCircle.setAttributeNS(null,"stroke","black");
			
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
			item = new Object();
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
	
	tAssistance.processKeyPress = function(g,evt){
      var transform = g.getAttribute('transform');	// Grab the object representing the SVG element's viewBox attribute.
      var translate = transform.split(' ')[0];
      var translateValues = translate.replace("translate(","").slice(0,-1).split(',');// Create an array and insert each individual view box attribute value (assume they're seperated by a single whitespace character).
      var scale = transform.split(' ')[1];
      var scaleValues = scale.replace("scale(","").slice(0,-1).split(',');
      
      /* The array is filled with strings, convert the first two viewBox values to floats: */
      translateValues[0] = parseFloat(translateValues[0]);	// Represent the x-coordinate on the viewBox attribute.
      translateValues[1] = parseFloat(translateValues[1]);	// Represent the y coordinate on the viewBox attribute.
      
      scaleValues[0] = parseFloat(scaleValues[0]);
      scaleValues[1] = parseFloat(scaleValues[1]);
      
      switch (evt.keyCode)
      {
        case leftArrow:
        	translateValues[0] += panRate;	// Increase the x-coordinate value of the viewBox attribute by the amount given by panRate.
          break;
        case rightArrow:
        	translateValues[0] -= panRate;	// Decrease the x-coordinate value of the viewBox attribute by the amount given by panRate.
          break;
        case upArrow:
        	scaleValues[0] += 0.25;	// Increase the y-coordinate value of the viewBox attribute by the amount given by panRate.          break;          
          break;
        case downArrow:
        	scaleValues[0] -= 0.25;	// Decrease the y-coordinate value of the viewBox attribute by the amount given by panRate.          break;          
          break;               
      } // switch
      
      g.setAttribute('transform', "translate("+translateValues.join(',')+") scale("+scaleValues.join(',')+")");	// Convert the viewBoxValues array into a string with a white space character between the given values.
    }
	
	var isDown = false;
	var startCoords = {};
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
				svg.setAttribute("style","overflow: auto");
				svg.setAttribute("viewBox","0 0 1000 300");
				svg.setAttribute("draggable","false");
				svg.setAttribute("width","1000px");
				svg.setAttribute("height","300px");
				
				$("#chart1").get(0).appendChild(svg);
				
				var rect = document.createElementNS(svgNS,"rect");
				//rect.setAttribute("style","background-color: yellow");
				rect.setAttribute("fill","yellow");
				rect.setAttribute("width","100%");
				rect.setAttribute("height","100%");
				
				svg.appendChild(rect);
				
				var g = document.createElementNS(svgNS,"g");				
				g.setAttribute("transform","translate(0,0) scale(1,1)");
				svg.appendChild(g);
				
				
				
				positions = tAssistance.position_obsels(obsels, opts);
				//console.log(positions);
				
				positions = tAssistance.draw_obsels2({"g": g,"positions": positions});
				//console.log(positions);
				
				/* Add event listeners:  */
			    $(document).keydown(function(e){
			    	tAssistance.processKeyPress(g,e);
			    });
			    
			    $(rect).mousedown(function(e) {
			        isDown = true;
			        e.preventDefault();
			        
			        var transform = g.getAttribute('transform');	// Grab the object representing the SVG element's viewBox attribute.
			        var translate = transform.split(' ')[0];
			        var translateValues = translate.replace("translate(","").slice(0,-1).split(',');// Create an array and insert each individual view box attribute value (assume they're seperated by a single whitespace character).
			        var scale = transform.split(' ')[1];
			        var scaleValues = scale.replace("scale(","").slice(0,-1).split(',');	
			        
			        /* The array is filled with strings, convert the first two viewBox values to floats: */
			        translateValues[0] = parseFloat(translateValues[0]);	// Represent the x-coordinate on the viewBox attribute.
			        translateValues[1] = parseFloat(translateValues[1]);	// Represent the y coordinate on the viewBox attribute.
			        
			        scaleValues[0] = parseFloat(scaleValues[0]);
			        scaleValues[1] = parseFloat(scaleValues[1]);
			        
			        //console.log(startCoords);
			        startCoords = {
			            "mouseDown.x": e.offsetX,
			            "mouseDown.y": e.offsetY,
			            //e.offsetY - last[1]
			            "group.x": translateValues[0],
			            "group.y": translateValues[1]
			        	};
			    });
			    
			    $(rect).mouseup(function(e) {
			        isDown = false;
			        e.preventDefault();
			        //console.log("mouse up");
			       /* last = [
			            e.offsetX - startCoords[0], // set last coordinates
			            //e.offsetY - startCoords[1]
			            startCoords[1]
			        ];*/
			    });

			    $(rect).mousemove(function(e){
			    	e.preventDefault();
			        if(!isDown) return;
			        //console.log("panning");
			        var x = e.offsetX;
			        var y = e.offsetY;
			        //var _x = 
			        	
			        var transform = g.getAttribute('transform');	// Grab the object representing the SVG element's viewBox attribute.
			        var translate = transform.split(' ')[0];
			        var translateValues = translate.replace("translate(","").slice(0,-1).split(',');// Create an array and insert each individual view box attribute value (assume they're seperated by a single whitespace character).
			        var scale = transform.split(' ')[1];
			        var scaleValues = scale.replace("scale(","").slice(0,-1).split(',');	
			        
			        /* The array is filled with strings, convert the first two viewBox values to floats: */
			        translateValues[0] = parseFloat(translateValues[0]);	// Represent the x-coordinate on the viewBox attribute.
			        translateValues[1] = parseFloat(translateValues[1]);	// Represent the y coordinate on the viewBox attribute.
			        
			        scaleValues[0] = parseFloat(scaleValues[0]);
			        scaleValues[1] = parseFloat(scaleValues[1]);
			        
			        // transform
			        translateValues[0] = x - startCoords["mouseDown.x"] + startCoords["group.x"];
			        //translateValues[1] = y - startCoords["mouseDown.y"] + startCoords["group.y"];
			        translateValues[1] = startCoords["group.y"];
			        
			        //console.log(startCoords);
			        //this.(1, 0, 0, 1,
			        //                 x - startCoords[0], y - startCoords[1]);
			        //g.setAttributeNS(null,"transform", "translate("+ (x - startCoords[0]) +","+ (startCoords[1]) +")");
			        g.setAttribute('transform', "translate("+translateValues.join(',')+") scale("+scaleValues.join(',')+")");	
			        
			        
			        //render();
			    });

				
			}
		});		
	}
	