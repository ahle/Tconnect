/*
	require jQuery
*/

	/** @namespace */
	//tAssistance = {};
	//jTBA.Version = '0.1';
	tAssistance.datetime = {
		in_array: function(array, date){
			for(var i=0;i<array.length;i++) {
		    	 if(array[i].getTime() === date.getTime()) 
		    		 return true;
		    }
		    return false;
		},
		indexOf: function(array, date){
			for(var i=0;i<array.length;i++) {
		    	 if(array[i].getTime() === date.getTime()) 
		    		 return i;
		    }
		    return -1;
		},
		units: [1000*60*60*24*365,1000*60*60*24*30*6,1000*60*60*24*30*3,1000*60*60*24*30,1000*60*60*24*7,1000*60*60*24,1000*60*60*12,1000*60*60,1000*60*30,1000*60,1000, 100],
		unitTexts: ["year","6 months","3 months","month","week","day","12 hours","hour","30 minutes","minute","second", "0.1s"],
		utc2LocalDate: function(utcTime){
			var date = new Date(0);// UTC epoch
			var seconds = Math.floor(utcTime/1000);
			date.setUTCSeconds(seconds, utcTime % 1000);
			return date;
		},
	};
	
	tAssistance.svg = {
		svgNS: "http://www.w3.org/2000/svg",
		lines: {"major": 25, "minor": 35, "line0": 50 },
		fonts: {"arial": {}},
		getCenter: function(svgElement){
			var bbox = svgElement.getBBox();
			var width = bbox.width;
			var height = bbox.height;
			
			var center = {
					x: bbox.x + width/2,
					y: bbox.y + height/2
			}
			return center;
		},
		align_middle: function(target, source){			
			var center = tAssistance.svg.getCenter(source);						
			target.setAttributeNS(null,"x",center.x);
		},
		group: {
			move: function(group){
				
				
				
			},
			parse_transform: function(group){
				// parse the transform property
				  var charTransformSplit = ' ';
				  var charNumberSplit = ' ';
			      
				  var transform = group.getAttribute('transform');
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
			 },
			make_transform_str: function(transform_obj){
					var charTransformSplit = ' ';
					var charNumberSplit = ' ';
					
					return "translate("+transform_obj["translate.x"]+charNumberSplit+transform_obj["translate.y"]+") scale("+transform_obj["scale.x"]+charNumberSplit+transform_obj["scale.y"]+")";		
			}
		},
		touchpad: function(touchpad,g){
			
			touchpad.addEventListener('touchstart', function(e){
		    	if(g==undefined) return;
				if(!e) var e = window.event;
		    	e.preventDefault();
		    	
		    	touchstart = "true";
		        var posx = 0;
		        var posy = 0;
		        var touchobj = e.changedTouches[0];
		        
		        posx = touchobj.clientX;
		        posy = touchobj.clientY;
		        
		        			        
		        var transform_obj = tAssistance.svg.group.parse_transform(g);
		        			        			        
		        g.setAttribute("touchstart.x",posx);
		        g.setAttribute("touchstart.y",posy);
		        g.setAttribute("group.x",transform_obj["translate.x"]);
		        g.setAttribute("group.y",transform_obj["translate.y"]);
		        g.setAttribute("touchstart", touchstart);			    	
		    	
		    }, false);
		    
			touchpad.addEventListener('touchend', function(e){
				if(g==undefined) return;
		    	touchstart = "";
		    	g.setAttribute("touchstart", touchstart);
		        if(!e) var e = window.event;
		        e.preventDefault();	
		    	
		    }, false);
		    
			touchpad.addEventListener('touchmove',function(e){
				if(g==undefined) return;
		    	if(!e) var e = window.event;
		    	e.preventDefault();
		    	
		    	var touchstart = g.getAttribute("touchstart");
		    	
		        if(!touchstart || touchstart == "") return;
		        
		        var posx = 0;
		        var posy = 0;
		       
		        var touchobj = e.changedTouches[0];
		        
		        posx = touchobj.clientX;
		        posy = touchobj.clientY;
		        
		        var transform_obj = tAssistance.svg.group.parse_transform(g);
		        
		    	// read coordinations
		    	var touchstart_x = parseFloat(g.getAttribute("touchstart.x"));
		    	var touchstart_y = parseFloat(g.getAttribute("touchstart.y"));
		        var group_x = parseFloat(g.getAttribute("group.x"));
		        var group_y = parseFloat(g.getAttribute("group.y"));
		    	
		        // transform
		    	
		    	transform_obj["translate.x"] = posx - touchstart_x + group_x;		        
		    	transform_obj["translate.y"] = group_y;
		        		        
		        g.setAttribute('transform', tAssistance.svg.group.make_transform_str(transform_obj));
		    });
		},
		mousepad: function(mousepad, g){
			mousepad.addEventListener("mousedown",function(e) {
				if(g==undefined) return;
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
		    	var transform_obj = tAssistance.svg.group.parse_transform(g);
 			        
		        g.setAttribute("mouseDown.x",posx);
		        g.setAttribute("mouseDown.y",posy);
		        g.setAttribute("mouseMove.x",posx);
		        g.setAttribute("mouseMove.y",posy);
		        g.setAttribute("group.x",transform_obj["translate.x"]);
		        g.setAttribute("group.y",transform_obj["translate.y"]);
		        g.setAttribute("mouseDown", mouseDown);
		        
		    });
		    
		    document.body.addEventListener("mouseup", function(e) {
		    	if(g==undefined) return;
		    	var mouseDown = g.getAttribute("mouseDown");		    	
		        if(!mouseDown || mouseDown == "") return;
		    	
		    	if(!e) var e = window.event;
		        e.preventDefault();
		        
		        // read delta x,y		        
		        var mousedown_x = parseFloat(g.getAttribute("mouseDown.x"));
		    	var mousedown_y = parseFloat(g.getAttribute("mouseDown.y"));
		        var mousemove_x = parseFloat(g.getAttribute("mouseMove.x"));
		        var mousemove_y = parseFloat(g.getAttribute("mouseMove.y"));
		        var translate_x = mousemove_x - mousedown_x;
		        var translate_y = mousemove_y - mousedown_y;
		        //
		        g.removeAttribute("mouseDown");
		    	g.removeAttribute("mouseMove.x");
		    	g.removeAttribute("mouseMove.y");
		    	g.removeAttribute("mouseDown.x");
		    	g.removeAttribute("mouseDown.y");
		    	
		    	var childNodes = g.childNodes;
		    	
		    	// reset group element
		    	var begin = new Date().getTime();// for debug
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
		    	var oldTimeOffset = parseInt(g.setAttribute("viewport.timeoffset"));
		    	g.setAttribute("transform","translate(0 0) scale(1 1)");
		    	g.setAttribute("viewport.timeoffset", oldTimeOffset - translate_x);
		    	var finish = new Date().getTime();// for debug
		    	if(tAssistance.debug){
		    		//console.log(finish-begin);
		    	}
		    });

		    mousepad.addEventListener("mousemove",function(e){
		    	if(g==undefined) return;
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
		        
		    	var transform_obj = tAssistance.svg.group.parse_transform(g);
		        
		    	// read coordinations
		    	var mousedown_x = parseFloat(g.getAttribute("mouseDown.x"));
		    	var mousedown_y = parseFloat(g.getAttribute("mouseDown.y"));
		        var group_x = parseFloat(g.getAttribute("group.x"));
		        var group_y = parseFloat(g.getAttribute("group.y"));
		        
		        // set coorinations
		        g.setAttribute("mouseMove.x",posx);
		        g.setAttribute("mouseMove.y",posy);
		    	
		        // transform
		    	
		    	transform_obj["translate.x"] = posx - mousedown_x + group_x;
		    	transform_obj["translate.y"] = group_y;

		        g.setAttribute('transform', tAssistance.svg.group.make_transform_str(transform_obj));	
		        			        
		    });
		}
	}
	
	tAssistance.outil = {
		getHours: function(obsels){
			var hours = [];
			for(i=0;i<obsels.length;i++){
				// get dateTime from begin				
				var obsel = obsels[i];
				// get dateTime from begin
				var date = tAssistance.datetime.utc2LocalDate(obsel.begin);
				// reset minute to zero 
				date.setMinutes(0,0,0);
				
				if(!tAssistance.datetime.in_array(hours,date)){
					hours.push(date);
				}
			}
			if(tAssistance.debug){
				window.hours = hours;
			}
			return hours;
		},
		getHours_svg: function(svgObsels){
			
			var hours = [];
			for(i=0;i<svgObsels.length;i++){
				var svgObsel = svgObsels[i];
				var obsel = svgObsel.data["obsel"];
				// get dateTime from begin
				var date = tAssistance.datetime.utc2LocalDate(obsel.begin);
				// reset minute to zero 
				date.setMinutes(0,0,0);
				
				if(!tAssistance.datetime.in_array(hours,date)){
					hours.push(date);
				}
			}
			if(tAssistance.debug){
				window.hours = hours;
			}
			return hours;
		},
		getMinutes_svg: function(svgObsels){
			var minutes = [];
			for(i=0;i<svgObsels.length;i++){
				var svgObsel = svgObsels[i];
				// get dateTime from begin				
				var obsel = svgObsel.data["obsel"];
				// get dateTime from begin
				var date = tAssistance.datetime.utc2LocalDate(obsel.begin);
				// reset minute to zero 
				date.setSeconds(0,0);
				
				if(!tAssistance.datetime.in_array(minutes,date)){
					minutes.push(date);
				}
			}
			if(tAssistance.debug){
				window.minutes = minutes;
			}
			return minutes;
		},
		getSeconds_svg: function(svgObsels){
			var seconds = [];
			for(i=0;i<svgObsels.length;i++){
				var svgObsel = svgObsels[i];
				// get dateTime from begin				
				var obsel = svgObsel.data["obsel"];
				// get dateTime from begin
				var date = tAssistance.datetime.utc2LocalDate(obsel.begin);
				// reset minute to zero 
				date.setMilliseconds(0);
				
				if(!tAssistance.datetime.in_array(seconds,date)){
					seconds.push(date);
				}
			}
			if(tAssistance.debug){
				window.seconds = seconds;
			}
			return seconds;
		},
		getDates_svg: function(svgObsels){
			var dates = [];
			for(i=0;i<svgObsels.length;i++){
				var svgObsel = svgObsels[i];
				// get dateTime from begin				
				var obsel = svgObsel.data["obsel"];
				// get dateTime from begin
				var date = tAssistance.datetime.utc2LocalDate(obsel.begin);
				// reset all things in a date to zero				
				date.setHours(0,0,0,0);
				
				if(!tAssistance.datetime.in_array(dates,date)){
					dates.push(date);
				}
			}
			if(tAssistance.debug){
				window.dates = dates;
			}
			return dates;
		},
		getMonths_svg: function(svgObsels){
			var months = [];
			for(i=0;i<svgObsels.length;i++){
				var svgObsel = svgObsels[i];
				// get dateTime from begin				
				var obsel = svgObsel.data["obsel"];
				// get dateTime from begin
				var date = tAssistance.datetime.utc2LocalDate(obsel.begin);
				// reset date and time to zero 
				date.setDate(1);
				date.setHours(0,0,0,0);
				
				if(!tAssistance.datetime.in_array(months,date)){
					months.push(date);
				}
			}
			if(tAssistance.debug){
				window.months = months;
			}
			return months;
		},
		
	}
	
	tAssistance.tooltip = {		
		setTooltip: function (svgelement, text){
			var svgNS = tAssistance.svg.svgNS;
			var title = document.createElementNS(svgNS,"title");
			title.textContent = text;
			svgelement.appendChild(title);			
		}
	}
	
	tAssistance.map = {			
			
	}
	
	tAssistance.key = {
		leftArrow: 37,	// Key code for the left arrow key.
	    upArrow: 38,
	    rightArrow: 39,
	    downArrow: 40		
	}
	
	tAssistance.config = {
		panRate: 10,	// Number of pixels to pan per key press.
		zoomRate: 0.25
	}