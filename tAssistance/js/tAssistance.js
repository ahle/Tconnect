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
	
	// draw obsels for 
	
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
	
	
	
	tAssistance.move = function(g, newOffset){
		var scale_x_time = parseInt(g.getAttribute("scale_x_time"));
		var oldOffset = parseInt(g.getAttribute("timeoffset"));
		var translate_x = - parseFloat((newOffset - oldOffset)/scale_x_time);
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
        	//transform_obj["scale.x"] += ta.config.zoomRate;	    // Increase the x-scale value of the transform attribute by the amount given by zoomRate.        
          break;
        case ta.key.downArrow:
        	//transform_obj["scale.x"] -= ta.config.zoomRate;	// Decrease the x-scale value of the transform attribute by the amount given by zoomRate. 
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
		var fnSuccess = options.success;
		
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
				// save received obsels in the localStorage
				tAssistance.obsels.setLocalObsels(obsels);
				
				
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
				rect.setAttribute("style","fill: #F9F9F9");
				rect.setAttribute("width","100%");
				rect.setAttribute("height","100%");
				
				svg.appendChild(rect);
				
				var g = document.createElementNS(svgNS,"g");				
				g.setAttribute("transform","translate(0 0) scale(1 1)");
				g.setAttribute("scale_x_time", 1000/tAssistance.datetime.units[0]);
				g.setAttribute("scaleLevel", "0");
				svg.appendChild(g);
				g.data = {
					"obsels": obsels
				};
				
				var center = document.createElementNS(svgNS,"line");				
				center.setAttribute("x1", 500);
				center.setAttribute("y1", 0);
				center.setAttribute("x2", 500);
				center.setAttribute("y2", 300);
				center.setAttribute("style", "stroke:red;stroke-width:0.3");
				svg.appendChild(center);
								
				drawedObsels = tAssistance.svg.drawObsels(obsels, g);
				tAssistance.svg.drawYears(drawedObsels);
				tAssistance.svg.drawMonths1(drawedObsels);
				
				// add Keydown event
			    $(svg).keydown(function(e){
			    	tAssistance.processKeyPress(g,e);
			    });		    
		    	// add MouseEvents		    
			    tAssistance.svg.mousepad(rect,g);
			    
			    // add TouchEvents
			    tAssistance.svg.touchpad(rect,g);
			    // fire events for loading traces
				fnSuccess();
				
			    if(tAssistance.debug){// debug
			    	window.svg = svg;
			    }			    
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

tAssistance.loadUserPreference = function(){
	// enable bootstrap-select
	$('.selectpicker').selectpicker();
	// 
	
	// save style
	
	// save rule
};

tAssistance.selector = {
	renderEditor: function(parentNode){
		$.get("index.php?page=selector&p1=new",function(data){
			$(parentNode).empty().append(data);
			
			var btSave = parentNode.querySelector("button[name='save']");
			btSave.addEventListener("click",function(){
				var script = "";
				
				if(parentNode.data_mode=="custom"){
					var selector_id = parentNode.querySelector("input[name='id']").value;
					var script = parentNode.querySelector("textarea[name='script']").value;						
					
					var selector = { "id": selector_id, "script": script };
											
					 $.ajax({
						  type: "PUT",
						  url: "api.php?o=selector",
						 data: JSON.stringify(selector)
						})
						  .done(function( msg ) {
							console.log( "The selector is posted!");
						    tAssistance.selector.renderList(parentNode);
						  });
				}
				else if(parentNode.data_mode=="obsel_type"){
					var selector_id = parentNode.querySelector("input[name='id']").value;
					var obsel_type = parentNode.querySelector("select[name='obsel_type']").value;						
					
					var script = "function(obsel){";
					script += "	if(obsel['"+tAssistance.obsel.type+"']=='"+obsel_type+"'){";
					script += "		return true;";
					script += "	}";
					script += "	return false;";
					script += "}";
					
					var selector = { "id": selector_id, "script": script };
					
					$.ajax({
						  type: "PUT",
						  url: "api.php?o=selector",
						 data: JSON.stringify(selector)
						})
						  .done(function( msg ) {
							console.log( "The selector is posted!");
						    tAssistance.selector.renderList(parentNode);
						  });
				}
			});
			var btClose = parentNode.querySelector("button.close");
			btClose.addEventListener("click", function(){
				parentNode.innerHTML='';
			});
			
			var select_type = parentNode.querySelector("select[name='type']");
			select_type.addEventListener("change", function(){
				var type = select_type.value;
				tAssistance.selector.renderType(parentNode, type);
			});
		});
	},
	renderList: function(parentNode){
		$.get("index.php?page=selector&p1=all",function(data){
			$(parentNode).empty().append(data);
			
			// add event listeners
			var btNew = parentNode.querySelector("button[name='new']");
			var btRemove = parentNode.querySelector("button[name='remove']");
			btNew.addEventListener("click",function(){
				tAssistance.selector.renderEditor(parentNode);
			});
			
			btRemove.addEventListener("click",function(){
				var checkboxes = parentNode.querySelectorAll("input[type='checkbox']");
				for(var i=0;i<checkboxes.length;i++){
					var checkbox = checkboxes[i];
					if(checkbox.checked){
						var selector_id = checkbox.name;
						$.ajax({
							  type: "DELETE",
							  url: "api.php?o=selector&p1="+selector_id,
							})
							  .done(function( msg ) {
							    console.log( "Delete selector !");
							    tAssistance.selector.renderList(parentNode);
							  });
					}
				}				
			});
			
		});
	},
	renderType: function(parentNode,type){
		var selector_div = parentNode.querySelector("div[name='selector_config']");
		
		
		if(type=="obsel_type"){
			var obsels = tAssistance.obsels.getLocalObsels();
			var obsel_types = tAssistance.obsels.selectObselTypes(obsels);
			
			var html="";
			html += "<div class=\"control-group\">";
			html += "<label class=\"col-xs-2 control-label\">Obsel Type <\/label>";
			html += "<div class=\"controls\">";
			html += "  <select name=\"obsel_type\" class=\"span2\">   ";
			for(var i=0;i<obsel_types.length;i++){
				var obsel_type = obsel_types[i];
				html += "      <option value='"+obsel_type+"'>"+obsel_type+"<\/option>";
			}
			html += "  <\/select>";
			html += "<\/div>";
			html += "<\/div>";


			selector_div.innerHTML = html;
			parentNode.data_mode = "obsel_type";
		}
		else if(type=="custom"){
			var html="";
			html += "<div class=\"control-group\">";
			html += "<label class=\"col-xs-2 control-label\">Script <\/label>";
			html += "  <div class=\"controls\">";
			html += "    <textarea name=\"script\" class=\"span3\" rows=\"10\" placeholder=\"The syntax used is Javascript.\">";
			html += "function(obsel){";
			html += "	if(obsel['@type']=='m:oze_cw'){";
			html += "		return true;";
			html += "	}";
			html += "	return false;";
			html += "}";
			html += "    <\/textarea>  ";
			html += "  <\/div>";
			html += "<\/div>";

			selector_div.innerHTML = html;
			parentNode.data_mode = "custom";		
		}
			

			
	}
};

tAssistance.rule = {
	renderEditor: function(parentNode){
		$.get("index.php?page=rule&p1=new",function(data){
			$(parentNode).empty().append(data);
			
			// add event listeners
			var btSave = parentNode.querySelector("button[name='save']");
			btSave.addEventListener("click",function(){
				var script = "";
				
				var rule_id = parentNode.querySelector("input[name='id']").value;
				var select_selector = parentNode.querySelector("select[name='selector']");
				var selector_id = select_selector.value;
				var select_style = parentNode.querySelector("select[name='style']");
				var style_id = select_style.value;
				var priority =  parentNode.querySelector("input[name='priority']").value;
				
				var rule = {
					"id": rule_id,
					"selector": selector_id,
					"style": style_id,
					"priority": priority
				}
				
				$.ajax({
					  type: "PUT",
					  url: "api.php?o=rule",
					 data: JSON.stringify(rule)
					})
					  .done(function( msg ) {
						console.log( "The rule is posted!");
					    tAssistance.rule.renderList(parentNode);
					  });
				
			});
			var btClose = parentNode.querySelector("button.close");
			btClose.addEventListener("click", function(){
				parentNode.innerHTML='';					
			});
		});
	},
	renderList: function(parentNode){
		$.get("index.php?page=rule&p1=all",function(data){
			$(parentNode).empty().append(data);
			
			// add event listeners
			var btNew = parentNode.querySelector("button[name='new']");
			var btRemove = parentNode.querySelector("button[name='remove']");
			btNew.addEventListener("click",function(){
				tAssistance.rule.renderEditor(parentNode);
			});
			
			btRemove.addEventListener("click",function(){
				var checkboxes = parentNode.querySelectorAll("input[type='checkbox']");
				for(var i=0;i<checkboxes.length;i++){
					var checkbox = checkboxes[i];
					if(checkbox.checked){
						var rule_id= checkbox.name;
						$.ajax({
							  type: "DELETE",
							  url: "api.php?o=rule&p1="+rule_id,
							})
							  .done(function( msg ) {
							    console.log( "Delete rule !");
							    tAssistance.rule.renderList(parentNode);
							  });
					}
				}
				
				
			});
		});
	},
	loadRules: function(){
		$.get("api.php?o=rule&p1=full",function(data){
			localStorage["tAssistance.rules"] = data;
			if(document.createEvent){
				event = document.createEvent("CustomEvent");
				event.initEvent("loadedRules", true, true);
				event.data = {};
				document.dispatchEvent(event);
			}
		});
	},
}
tAssistance.style = {
	renderEditor: function(parentNode){
			$.get("index.php?page=style&p1=new",function(data){
				// render the html elements for editor
				$(parentNode).empty().append(data);
				// add event listeners
				var btSave = parentNode.querySelector("button[name='save']");
				btSave.addEventListener("click",function(){
					var script = "";
					if(parentNode.data_element=="circle"){
						var style_id = parentNode.querySelector("input[name='style_id']").value;
						var icon = parentNode.querySelector("input[name='icon']").value;
						var cx = parentNode.querySelector("input[name='cx']").value;
						var cy = parentNode.querySelector("input[name='cy']").value;
						var r =  parentNode.querySelector("input[name='r']").value;
						var color =  parentNode.querySelector("input[name='color']").value || 'orange';
						
						var params = {"cx": cx, "cy": cy, "r": r, "color": color};
						
						var script_no_input = "function(obsel,auto){" +
						"drawnObsel = document.createElementNS('http://www.w3.org/2000/svg','circle');" +
						"drawnObsel.setAttributeNS(null,'cx', '%cx%' || auto.x );" +
						"drawnObsel.setAttributeNS(null,'cy', '%cy%' || auto.y );" +
						"drawnObsel.setAttributeNS(null,'r', '%r%' || auto.r );" +
						"drawnObsel.setAttributeNS(null,'style','fill: %color%; stroke: black');" +
						"return drawnObsel;" +
						"}";
						var script = script_no_input;
						for(var name in params){
							script = script.replace('%'+name+'%', params[name]);
						}
						
						var style = { "id": style_id, "script": script, "icon": icon };
						
						 $.ajax({
							  type: "PUT",
							  url: "api.php?o=style",
							  data: JSON.stringify(style)
							})
							  .done(function( msg ) {
							    console.log( "The style is posted!");
							    tAssistance.style.renderList(parentNode);
							  });
						
					}
					else if(parentNode.data_element=="custom"){
						console.log("custom is logged");
						var style_id = parentNode.querySelector("input[name='style_id']").value;
						var icon = parentNode.querySelector("input[name='icon']").value;
						var script = parentNode.querySelector("textarea[name='script']").value;						
						
						var style = { "id": style_id, "script": script, "icon": icon };
												
						 $.ajax({
							  type: "PUT",
							  url: "api.php?o=style",
							 data: JSON.stringify(style)
							})
							  .done(function( msg ) {
								console.log( "The style is posted!");
							    tAssistance.style.renderList(parentNode);
							  });
						
					}
					
					
				});
				var btClose = parentNode.querySelector("button.close");
				btClose.addEventListener("click", function(){
					parentNode.innerHTML='';					
				});
				
				var select_element = parentNode.querySelector("select[name='elements']");
				// load element parameters
				select_element.addEventListener("change", function(e){
					console.log(e);
					var value = null;
					var options = select_element.getElementsByTagName("option");
					for(var i=0;i<options.length;i++){
						var option = options[i];
						if(option.selected){
							value=option.value;
						}
					}
					tAssistance.style.renderElement(parentNode,value);
					
				},false);
			});
		},
	renderList: function(parentNode){
			$.get("index.php?page=style&p1=all",function(data){
				$(parentNode).empty().append(data);
				// add event listeners
				var btNew = parentNode.querySelector("button[name='new']");
				var btRemove = parentNode.querySelector("button[name='remove']");
				btNew.addEventListener("click",function(){
					tAssistance.style.renderEditor(parentNode);
				});
				
				btRemove.addEventListener("click",function(){
					var checkboxes = parentNode.querySelectorAll("input[type='checkbox']");
					for(var i=0;i<checkboxes.length;i++){
						var checkbox = checkboxes[i];
						if(checkbox.checked){
							var style_id= checkbox.name;
							$.ajax({
								  type: "DELETE",
								  url: "api.php?o=style&p1="+style_id,
								})
								  .done(function( msg ) {
								    console.log( "Delete style !");
								    tAssistance.style.renderList(parentNode);
								  });
						}
					}
					
					
				});
				
			});
		},
	post: function(formNode){
			
			var style_id = formNode.querySelector("input[name='style_id']").value;
			var style =	"function(obsel){" +
				"myCircle = document.createElementNS(svgNS,'circle');" +
				"myCircle.setAttributeNS(null,'cx', x);" +
				"myCircle.setAttributeNS(null,'cy', y);" +
				"myCircle.setAttributeNS(null,'r', r);" +
				"myCircle.setAttributeNS(null,'class', 'obsel');" +
				"myCircle.setAttributeNS(null,'style','fill: yellow; stroke: black');" +
				"return myCircle;" +
				"}";
				
			
			 
		},
	renderElement: function(parentNode,element){
		if(element=="circle"){
			var element_div = parentNode.querySelector("div[name='element_config']");
			
			var html="";
			html += "<div class='control-group'>";
			html += "<label class='col-xs-2 control-label'>Cx<\/label>";
			html += "  <div class='controls'>";
			html += "    <input type='number' name='cx' placeholder='auto' class='span1'>";
			html += "  <\/div>";
			html += "<\/div>";
			html += "<div class='control-group'>";
			html += "<label class='col-xs-2 control-label'>Cy<\/label>";
			html += "  <div class='controls'>";
			html += "    <input type='number' name='cy' placeholder='auto' class='span1'>";
			html += "  <\/div>";
			html += "<\/div>";
			html += "<div class='control-group'>";
			html += "  <label class='col-xs-2 control-label'>Radius<\/label>";
			html += "  <div class='controls'>";
			html += "    <input type='number' name='r' placeholder='auto' class='span1'>";
			html += "  <\/div>";	
			html += "<\/div>";
			html += "<div class='control-group'>";
			html += "  <label class='col-xs-2 control-label'>Color<\/label>";
			html += "  <div class='controls'>";
			html += "    <input type='text' name='color' placeholder='auto' class='span2'>";
			html += "  <\/div>";
			html += "<\/div>";
			html += "";

			element_div.innerHTML = html;
			
			var select_color =  parentNode.querySelector("input[name='color']");
			$(select_color).colorpicker();
			
			parentNode.data_element = "circle";
		}
		else if(element=="rect"){
			var element_div = parentNode.querySelector("div[name='element_config']");
			
			var html="";
			html += "<div class='control-group'>";
			html += "<label class='col-xs-2 control-label'>x<\/label>";
			html += "  <div class='controls'>";
			html += "    <input type='number' name='x' placeholder='auto' class='span1'>";
			html += "  <\/div>";
			html += "<\/div>";
			html += "<div class='control-group'>";
			html += "<label class='col-xs-2 control-label'>y<\/label>";
			html += "  <div class='controls'>";
			html += "    <input type='number' name='y' placeholder='auto' class='span1'>";
			html += "  <\/div>";
			html += "<\/div>";
			html += "<div class='control-group'>";
			html += "  <label class='col-xs-2 control-label'>width<\/label>";
			html += "  <div class='controls'>";
			html += "    <input type='number' name='width' placeholder='auto' class='span1'>";
			html += "  <\/div>";
			html += "<\/div>";
			html += "<div class='control-group'>";
			html += "  <label class='col-xs-2 control-label'>height<\/label>";
			html += "  <div class='controls'>";
			html += "    <input type='number' name='height' placeholder='auto' class='span1'>";
			html += "  <\/div>";
			html += "<\/div>";
			
			element_div.innerHTML = html;
			parentNode.data_element = "rect";

		}
		else if(element=="custom"){
			var element_div = parentNode.querySelector("div[name='element_config']");
			
			var html="";
			html += "<div class=\"control-group\">";
			html += "<label class=\"col-xs-2 control-label\">Script <\/label>";
			html += "  <div class=\"controls\">";
			html += "    <textarea name=\"script\" class=\"span3\" rows=\"10\" placeholder=\"The syntax used is Javascript. The defined variables can be used as x,y\">";
			html += "function(obsel,base){\n" +
					"drawnObsel = document.createElementNS('http:\/\/www.w3.org\/2000\/svg','circle');\n" +
					"drawnObsel.setAttributeNS(null,'cx', '' || base.x );\n" +
					"drawnObsel.setAttributeNS(null,'cy', '' || base.y );\n" +
					"drawnObsel.setAttributeNS(null,'r', '' || base.r );\n" +
					"drawnObsel.setAttributeNS(null,'style','fill: yellow; stroke: black');\n" +
					"return drawnObsel;\n" +
					"}";		
			html += "<\/textarea>  ";
			html += "  <\/div>";
			html += "<\/div>";
			
			element_div.innerHTML = html;
			parentNode.data_element = "custom";

		}
		
		
		
		
		
		
	}
}





