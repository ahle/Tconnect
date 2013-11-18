/*
	require jQuery
*/

	/** @namespace */
	//tAssistance = {};
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
		dates: {
				en: {
					days:        ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
					daysShort:   ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
					daysMin:     ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
					months:      ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
					monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
					meridiem:    ["am", "pm"],
					suffix:      ["st", "nd", "rd", "th"],
					today:       "Today"
				}// other languages
			},
		split: function (date) {
			var dates = tAssistance.datetime.dates;
			if (date == null) {
				return '';
			}
			var val;
			val = {
				// year
				yy:   date.getUTCFullYear().toString().substring(2),
				yyyy: date.getUTCFullYear(),
				// month
				m:    date.getUTCMonth() + 1,
				M:    dates[language].monthsShort[date.getUTCMonth()],
				MM:   dates[language].months[date.getUTCMonth()],
				// day
				d:    date.getUTCDate(),
				D:    dates[language].daysShort[date.getUTCDay()],
				DD:   dates[language].days[date.getUTCDay()],
				p:    (dates[language].meridiem.length == 2 ? dates[language].meridiem[date.getUTCHours() < 12 ? 0 : 1] : ''),
				// hour
				h:    date.getUTCHours(),
				// minute
				i:    date.getUTCMinutes(),
				// second
				s:    date.getUTCSeconds()
			};

			if (dates[language].meridiem.length == 2) {
				val.H = (val.h % 12 == 0 ? 12 : val.h % 12);
			}
			else {
				val.H = val.h;
			}
			val.HH = (val.H < 10 ? '0' : '') + val.H;
			val.P = val.p.toUpperCase();
			val.hh = (val.h < 10 ? '0' : '') + val.h;
			val.ii = (val.i < 10 ? '0' : '') + val.i;
			val.ss = (val.s < 10 ? '0' : '') + val.s;
			val.dd = (val.d < 10 ? '0' : '') + val.d;
			val.mm = (val.m < 10 ? '0' : '') + val.m;
						
			return val;
		}
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
			};
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
			},
			scale_x: function(time){
				
			},
			// refresh the drawn obsels
			changeTimeOffset: function(g, timeoffset){
				var drawnObsels = [];
				for(i=0;i<g.childNodes.length;i++){
					var node = g.childNodes[i];
					if(node.getAttribute("class")=="obsel"){
						drawnObsels.push(node);
					}
				}
		    	
		    	var obsels = g.data["obsels"];
		    	var scale_x_time = parseFloat(g.getAttribute("scale_x_time"));
		    	var oldTimeOffset = parseFloat(g.getAttribute("timeoffset"));
		    	var newTimeOffset = timeoffset;
		    	
		    	var translate_x = -(newTimeOffset - oldTimeOffset)*scale_x_time;
		    	
		    	var childNodes = g.childNodes;
		    	
		    	// reset group element
		    	
		    	for(i=0;i<childNodes.length;i++){
		    		childNode = childNodes[i];
		    		if(childNode.getAttribute("cx")){// for circle
		    			x = parseFloat(childNode.getAttribute("cx"));
		    			childNode.setAttribute("cx", x + translate_x);   	
		    		}
		    		else{// for x
		    			x = parseFloat(childNode.getAttribute("x"));
		    			childNode.setAttribute("x", x + translate_x);		    	
		    		}		    			
		    	}
		    	
		    	g.setAttribute("transform","translate(0 0) scale(1 1)");
		    	g.setAttribute("timeoffset", newTimeOffset);
		    	
		    	// refresh drawn obsels
		    	var start = timeoffset - 500/scale_x_time;
		    	var end = timeoffset + 500/scale_x_time;
		    	var filteredObsels = tAssistance.obsels.filter(obsels, start, end);
		    	var diffs = tAssistance.obsels.diff(drawnObsels, filteredObsels);
		    	
			    	// remove obsels
			    	for(i=0;i<diffs["-"].length;i++){
			    		var node = diffs["-"][i];
			    		node.parentNode.removeChild(node);
			    	}
			    	// draw new obsels
			    	var drawObsels1 = tAssistance.svg.drawObsels(diffs["+"], g);
			    	tAssistance.svg.drawObselLabels(drawObsels1);
			    	
			    	
			    var log={
			    	"start": tAssistance.datetime.utc2LocalDate(start),
			    	"end": tAssistance.datetime.utc2LocalDate(end),
			    };
			    console.log(log);
			},
			clear_all: function(g){
				while (g.hasChildNodes()) {
				    g.removeChild(g.lastChild);
				}
			},
			changeScale: function(g, scaleLevel){
				tAssistance.svg.group.clear_all(g);
			
				var obsels = [];
				if(localStorage["tAssistance.obsels"]){// get obsels from cache
					obsels = JSON.parse(localStorage["tAssistance.obsels"]);
				}
				else{
					//obsels = tAssistance.getObsels("http://213.223.171.36/ktbs/ozalid_exp/","trc_u1");		
				}
				
				var scaleLevel = scaleLevel;
				var width = 1000;
				//tAssistance.clear_obsels();
				var scale_x_time = width/tAssistance.datetime.units[scaleLevel];
				var g = document.querySelector("g");
				var timeoffset = parseFloat(g.getAttribute("timeoffset"));
				var start = timeoffset - width/2/scale_x_time;
				var end = timeoffset + width/2/scale_x_time;
				
				g.setAttribute("scale_x_time", scale_x_time);
				g.setAttribute("scaleLevel", scaleLevel);
				console.log("scale_x_time="+scale_x_time);
				
				// filter obsels
				obsels = tAssistance.obsels.filter(obsels, start, end);
				var log = {
						"start": start,
						"end": end,
						"startD": tAssistance.datetime.utc2LocalDate(start),
						"endD": tAssistance.datetime.utc2LocalDate(end),
				}
				console.log(log);
				// diff obsels
				var diffs = tAssistance.obsels.diff(document.querySelectorAll(".obsel"), obsels);		
				
				// draw obsels
				var drawnObsels = tAssistance.svg.drawObsels(diffs["+"], g);		
				// draw obsel labels as majors & minors
				tAssistance.svg.drawObselLabels(drawnObsels);
				// fire the changedScale event
				if(document.createEvent){
					event = document.createEvent("CustomEvent");
					event.initEvent("changedScale", true, true);
					event.data = {
						"scaleLevel": scaleLevel,
						"scale_x_time": scale_x_time
					};
					g.dispatchEvent(event);
				}
			}
		},
		touchpad: function(touchpad, g){
			
			touchpad.addEventListener('touchstart', function(e){
				console.log("touchstart");
		    	if(g==undefined) return;
				if(!e) var e = window.event;
		    	e.preventDefault();
		    	
		    	touchstart = "true";
				
				var panning = false;
				var zooming = false;
				// save the translate x,y
				var transform_obj = tAssistance.svg.group.parse_transform(g);
				g.setAttribute("group.x",transform_obj["translate.x"]);
				g.setAttribute("group.y",transform_obj["translate.y"]);
		        g.setAttribute("touchstart", touchstart);	
				
				if(e.touches.length==1){
					panning = true;
					g.setAttribute("action","pan");
				
					var x0 = e.touches[0].clientX;
					var y0 = e.touches[0].clientY;									
					
					// save the coordinates of touchstart										
					g.setAttribute("touchstart.x0",x0);
					g.setAttribute("touchstart.y0",y0);
				}
				if(e.touches.length==2){
					zooming = true;
					g.setAttribute("action","zoom");
				
					var x0 = e.touches[0].clientX;
					var y0 = e.touches[0].clientY;
					var x1 = e.touches[1].clientX;
					var y1 = e.touches[1].clientY;
					var startDistanceBetweenTwoFingers = Math.sqrt(Math.pow(x1-x0,2) + Math.pow(y1-y0,2));
								
					// save the coordinates of touchstart										
					g.setAttribute("touchstart.x0",x0);
					g.setAttribute("touchstart.y0",y0);
					g.setAttribute("touchstart.x0",x1);
					g.setAttribute("touchstart.y0",y1);
					g.setAttribute("touchstart.distance",startDistanceBetweenTwoFingers);
				}	    	
		    	
		    }, false);
		    
			touchpad.addEventListener('touchend', function(e){
				console.log("touchend");
				if(g==undefined) return;
		    	var touchstart = g.getAttribute("touchstart");
				if(!touchstart || touchstart == "") return;

		        if(!e) var e = window.event;
		        e.preventDefault();	
				
				var action = g.getAttribute("action");
				if(!g.getAttribute("touchmove.x0")) return;
				
				if(action=="pan"){
					var touchstart_x0 = parseFloat(g.getAttribute("touchstart.x0"));
					var touchstart_y0 = parseFloat(g.getAttribute("touchstart.y0"));					
					var touchmove_x0 = parseFloat(g.getAttribute("touchmove.x0"));
					var touchmove_y0 = parseFloat(g.getAttribute("touchmove.y0"));
					var translate_x = touchmove_x0 - touchstart_x0;
					var translate_y = touchmove_y0 - touchstart_y0;
				
					g.removeAttribute("touchstart");
					g.removeAttribute("touchstart.x0");
					g.removeAttribute("touchstart.y0");
					g.removeAttribute("touchmove.x0");
					g.removeAttribute("touchmove.y0");
				
					// calculate newOffset
					var oldTimeOffset = parseInt(g.getAttribute("timeoffset"));
					var xoffset = parseInt(g.getAttribute("xoffset"));
					var scale_x_time = parseFloat(g.getAttribute("scale_x_time"));
					
					var newTimeOffset = parseInt(oldTimeOffset - (translate_x/scale_x_time));
					//g.setAttribute("transform","translate(0 0) scale(1 1)");
					
					tAssistance.svg.group.changeTimeOffset(g, newTimeOffset);
					// fire a "changeTimeOffset" event 		    	
					$(document).trigger("changeTimeOffset", {							
									timeoffset: newTimeOffset,
									time: new Date(),					
					});
					
					var finish = new Date().getTime();// for debug
					if(tAssistance.debug){
						console.log("translate_x="+translate_x);
						console.log("scale_x_time="+scale_x_time);
						console.log("delta="+(newTimeOffset-oldTimeOffset));
					}
				}else if(action=="zoom"){
					var touchstart_distance = parseFloat(g.getAttribute("touchstart.distance"));
					var touchmove_distance = parseFloat(g.getAttribute("touchmove.distance"));
					var scaleLevel = parseFloat(g.getAttribute("scaleLevel")); 
					if(touchmove_distance>touchstart_distance*1.5 && scaleLevel<10){// zoom in
						scaleLevel = scaleLevel + 1;
						tAssistance.svg.group.changeScale(g,scaleLevel);
						
					}else if(touchmove_distance<touchstart_distance/1.5 && scaleLevel>0){// zoom out
						scaleLevel = scaleLevel - 1;
						tAssistance.svg.group.changeScale(g,scaleLevel);				
					}
					
					g.removeAttribute("touchstart");
					g.removeAttribute("action");
					g.removeAttribute("touchstart.x0");
					g.removeAttribute("touchstart.y0");
					g.removeAttribute("touchstart.x1");
					g.removeAttribute("touchstart.y1");
					g.removeAttribute("touchstart.distance");
					g.removeAttribute("touchmove.x0");
					g.removeAttribute("touchmove.y0");
					g.removeAttribute("touchmove.x1");
					g.removeAttribute("touchmove.y1");
					g.removeAttribute("touchmove.distance");
					
				}
		    }, false);
		    
			touchpad.addEventListener('touchmove',function(e){
				//console.log("touchmove");
				if(g==undefined) return;
		    	if(!e) var e = window.event;
		    	//e.preventDefault();
		    	
		    	var touchstart = g.getAttribute("touchstart");
		    	
		        if(!touchstart || touchstart == "") return;
		        
				var action = g.getAttribute("action");
				if(action == "pan"){
				
					var x = e.touches[0].clientX;
					var y = e.touches[0].clientY;
					
					var transform_obj = tAssistance.svg.group.parse_transform(g);
					
					// read coordinations
					var touchstart_x0 = parseFloat(g.getAttribute("touchstart.x0"));
					var touchstart_y0 = parseFloat(g.getAttribute("touchstart.y0"));
					var group_x = parseFloat(g.getAttribute("group.x"));
					var group_y = parseFloat(g.getAttribute("group.y"));
					var translate_x  = x - touchstart_x0 + group_x;
					var translate_y = group_y;
					
					// save coorinations
					g.setAttribute("touchmove.x0",x);
					g.setAttribute("touchmove.y0",y);

					// save to the transform
					transform_obj["translate.x"] = translate_x;		        
					transform_obj["translate.y"] = translate_y;					
					g.setAttribute('transform', tAssistance.svg.group.make_transform_str(transform_obj));
				}else if(action == "zoom"){
					var x0 = e.touches[0].clientX;
					var y0 = e.touches[0].clientY;
					var x1 = e.touches[1].clientX;
					var y1 = e.touches[1].clientY;
					var endDistanceBetweenTwoFingers = Math.sqrt(Math.pow(x1-x0,2) + Math.pow(y1-y0,2));
					
					// save coorinations
					g.setAttribute("touchmove.x0",x0);
					g.setAttribute("touchmove.y0",y0);
					g.setAttribute("touchmove.x0",x1);
					g.setAttribute("touchmove.y0",y1);
					g.setAttribute("touchmove.distance",endDistanceBetweenTwoFingers);					
				}
		    });
		},
		mousepad: function(mousepad, g){
			mousepad.addEventListener("mousedown",function(e) {
				//console.log("mousedown");
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
		    
		    mousepad.addEventListener("mouseup", function(e) {
				//console.log("mouseup");
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
		    	
		    	// calculate new timeoffset
		    	var oldTimeOffset = parseInt(g.getAttribute("timeoffset"));
		    	var xoffset = parseInt(g.getAttribute("xoffset"));
		    	var scale_x_time = parseFloat(g.getAttribute("scale_x_time"));		    	
		    	var newTimeOffset = parseInt(oldTimeOffset - (translate_x/scale_x_time));
		    	
		    	tAssistance.svg.group.changeTimeOffset(g, newTimeOffset);
		    	
		    	// fire a "changeTimeOffset" event 		    	
		    	$(document).trigger("changeTimeOffset", {
								timeoffset: newTimeOffset,
								time: new Date(),					
		    	});
		    	
		    	var finish = new Date().getTime();// for debug
		    	if(tAssistance.debug){
		    		var ret = {
		    				"newTimeOffset": newTimeOffset,
		    				"oldTimeOffset": oldTimeOffset,
		    				"newTimeOffsetDate": tAssistance.datetime.utc2LocalDate(newTimeOffset),
		    				"oldTimeOffsetDate": tAssistance.datetime.utc2LocalDate(oldTimeOffset),
		    				"scale_x_time": scale_x_time
		    		}
		    		//console.log("translate_x="+translate_x);
		    		//console.log("scale_x_time="+scale_x_time);
		    		//console.log("delta="+(newTimeOffset-oldTimeOffset));
		    		console.log(ret);
		    	}
		    });

		    mousepad.addEventListener("mousemove",function(e){
				//console.log("mousemove");
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
		},
		// draw obsels to the group
		drawObsels: function(obsels, g){
			//var g;
			var y = tAssistance.svg.lines["line0"],
			r = 8;
//			var rules = [{selector: "function(obsel){return obsel['@type']=='m:oze_view';}",
//			             style: "function(obsel,auto){myCircle = document.createElementNS('http://www.w3.org/2000/svg','circle');myCircle.setAttributeNS(null,'cx', auto.x);myCircle.setAttributeNS(null,'cy', auto.y);myCircle.setAttributeNS(null,'r', auto.r);myCircle.setAttributeNS(null,'class', 'obsel');myCircle.setAttributeNS(null,'style','fill: yellow; stroke: black');return myCircle;}"
//			}];
			rules_str = localStorage["tAssistance.rules"];
			rules = JSON.parse(rules_str);
			
			tAssistance.rules.translateRules(rules);			
			
			// make a svg
			var svgNS = tAssistance.svg.svgNS;
			var drawedObsels = [];
			
			var scale_x_time = g.getAttribute("scale_x_time");
			
			if(!g.getAttribute("timeoffset")){
				var firstObsel = obsels[0];
				var utcBegin0 = firstObsel.begin;
				g.setAttribute("timeoffset",utcBegin0);
			}
			var timeoffset = parseInt(g.getAttribute("timeoffset"));
			
			if(!g.getAttribute("xoffset")){
				g.setAttribute("xoffset", 500);
			}
			var xoffset = parseInt(g.getAttribute("xoffset"));
			begin = new Date().getTime();
			//for(i=0;i<obsels.length;i++){
			for(var i=0;i<obsels.length;i++){
				var obsel = obsels[i];
				var utcBegin = obsel.begin;
				var x = tAssistance.svg.getX(utcBegin, timeoffset, xoffset, scale_x_time);
				
				var color = '#'+Math.floor(Math.random()*16777215).toString(16);
				
				var base = {
					"x": x, "y": y, "color": color, "r": '10'
				}
				
				drawnobsel = tAssistance.rules.applyRules(obsel,rules,base);
				//drawnobsel = document.createElementNS(svgNS,"circle");
				//drawnobsel.setAttributeNS(null,"cx", x);
				//drawnobsel.setAttributeNS(null,"cy", y);
				//drawnobsel.setAttributeNS(null,"r", r);
				//drawnobsel.setAttributeNS(null,"class", "obsel");
				//drawnobsel.setAttributeNS(null,"style","fill: "+color+"; stroke: black");
								
				if(drawnobsel!=null){
					g.appendChild(drawnobsel);
					drawnobsel.data = {
						"obsel": obsel,
						"time": utcBegin
					};
								
					// attach the event
					$(drawnobsel).click(function(e){
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
					drawedObsels.push(drawnobsel);
				}
				//console.log("obsel: begin="+utcBegin+", x="+x);
			}
			end = new Date().getTime();
			console.log("performance: "+(end-begin));
			
			if(tAssistance.debug){				
				window.drawedObsels = drawedObsels;
				
			}
			return drawedObsels;
		},
		// attach month minors to drawed obsels 
		drawMonths1: function(drawedObsels){
			
			var months = tAssistance.outil.getMonths_svg(drawedObsels);
			var svg = drawedObsels[0].ownerSVGElement;
			var g = drawedObsels[0].parentNode;
			var scale_x_time = parseFloat(g.getAttribute("scale_x_time"));
			var timeOffset = parseInt(g.getAttribute("timeoffset"));
			var xOffset = parseInt(g.getAttribute("xoffset"));
			
			var width = 100,
			height = 18,
			x = 0,
			y = tAssistance.svg.lines["minor"],
			padding = 2;
			var svgNS = tAssistance.svg.svgNS;
			drawMonths = [];
					
			for(var i=0;i<months.length;i++){
				var iDate = months[i];
				var iDateInt = iDate.getTime();
				var matched = false;
				for(j=0;j<g.childNodes.length;j++){
					var childNode = g.childNodes[j];
					if(childNode.data["time"]==iDateInt && childNode.data["type"]=="minorLabel"){
						matched = true;
					}
				}
				if (matched) continue;// no duplicate
				
				var x = tAssistance.svg.getX(iDateInt, timeOffset, xOffset, scale_x_time);
				
				text = document.createElementNS(svgNS,"text");
				text.setAttributeNS(null,"x", x);
				text.setAttributeNS(null,"y", y);
				text.setAttributeNS(null,"class","minor");
				text.setAttributeNS(null,"font-family","arial");
				text.setAttributeNS(null,"font-size","10");
				text.setAttributeNS(null,"fill","blue");
				text.setAttributeNS(null,"style","text-anchor:middle;");
				text.textContent = iDate.format("mmmm");
				
				// add to the group	
				g.appendChild(text);				
				text.data = {
						"type": "minorLabel",
						"time": iDateInt,
				};
				tAssistance.svg.addTooltip(text, iDate.toString());
				drawMonths.push(text);
			}			
			
			return drawMonths;
		},
		// attach date minors to drawed obsels 
		drawDates1: function(drawedObsels){
			
			var dates = tAssistance.outil.getDates_svg(drawedObsels);
			var svg = drawedObsels[0].ownerSVGElement;
			var g = drawedObsels[0].parentNode;
			var scale_x_time = parseFloat(g.getAttribute("scale_x_time"));
			var timeOffset = parseInt(g.getAttribute("timeoffset"));
			var xOffset = parseInt(g.getAttribute("xoffset"));
			
			var width = 100,
			height = 18,
			x = 0,
			y = tAssistance.svg.lines["minor"],
			padding = 2;
			
			var svgNS = tAssistance.svg.svgNS;
			drawDates = [];
		
			for(var i=0;i<dates.length;i++){
				var iDate = dates[i];
				var iDateInt = iDate.getTime();
				
				var matched = false;
				for(j=0;j<g.childNodes.length;j++){
					var childNode = g.childNodes[j];
					if(childNode.data["time"]==iDateInt && childNode.data["type"]=="minorLabel"){
						matched = true;
					}
				}
				if (matched) continue;// no duplicate
				
				var x = tAssistance.svg.getX(iDateInt, timeOffset, xOffset, scale_x_time);
				
				text = document.createElementNS(svgNS,"text");
				text.setAttributeNS(null,"x", x);
				text.setAttributeNS(null,"y", y);
				text.setAttributeNS(null,"class","minor");
				text.setAttributeNS(null,"font-family","arial");
				text.setAttributeNS(null,"font-size","10");
				text.setAttributeNS(null,"fill","blue");
				text.setAttributeNS(null,"style","text-anchor:middle;");
				text.textContent = iDate.getDate();
				
				// add to the group	
				g.appendChild(text);				
				text.data = {
						"type": "minorLabel",
						"time": iDateInt,
				};
				tAssistance.svg.addTooltip(text, iDate.toString());
				drawDates.push(text);
			}			
			
			return drawDates;
		},
		// attach hour minors to drawed obsels 
		drawHours1: function(drawedObsels){
				
			var hours = tAssistance.outil.getHours_svg(drawedObsels);
			var svg = drawedObsels[0].ownerSVGElement;
			var g = drawedObsels[0].parentNode;
			var scale_x_time = parseFloat(g.getAttribute("scale_x_time"));
			var timeOffset = parseInt(g.getAttribute("timeoffset"));
			var xOffset = parseInt(g.getAttribute("xoffset"));
			
			var width = 100,
			height = 11,
			x = 0,
			y = tAssistance.svg.lines["minor"],
			padding = 2;
			var svgNS = "http://www.w3.org/2000/svg";
			drawedHours = [];
			
			for(var i=0;i<hours.length;i++){
				var iDate = hours[i];
				var iDateInt = iDate.getTime();
				
				var matched = false;
				for(j=0;j<g.childNodes.length;j++){
					var childNode = g.childNodes[j];
					if(childNode.data["time"]==iDateInt && childNode.data["type"]=="minorLabel"){
						matched = true;
					}
				}
				if (matched) continue;// no duplicate
				
				var x = tAssistance.svg.getX(iDateInt, timeOffset, xOffset, scale_x_time);
				
				text = document.createElementNS(svgNS,"text");
				text.setAttributeNS(null,"x", x);
				text.setAttributeNS(null,"y", y);
				text.setAttributeNS(null,"class","minor");
				text.setAttributeNS(null,"font-family","arial");
				text.setAttributeNS(null,"font-size","10");
				text.setAttributeNS(null,"fill","blue");
				text.setAttributeNS(null,"style","text-anchor:middle;");
				text.textContent = iDate.getHours()+"h";
				
				// add to the group	
				g.appendChild(text);				
				text.data = {
						"type": "minorLabel",
						"time": iDateInt,
				};
				tAssistance.svg.addTooltip(text, iDate.toString());
				drawedHours.push(text);
			}					
			if(tAssistance.debug){
				window.drawedHours = drawedHours;
			}
			return drawedHours;
		},
		// attach minute minors to drawed obsels 
		drawMinutes1: function(drawedObsels){
			
			var minutes = tAssistance.outil.getMinutes_svg(drawedObsels);
			var svg = drawedObsels[0].ownerSVGElement;
			var g = drawedObsels[0].parentNode;
			var scale_x_time = parseFloat(g.getAttribute("scale_x_time"));
			var timeOffset = parseInt(g.getAttribute("timeoffset"));
			var xOffset = parseInt(g.getAttribute("xoffset"));
			
			var width = 100,
			height = 18,
			x = 0,
			y = tAssistance.svg.lines["minor"],
			padding = 2;
			var svgNS = tAssistance.svg.svgNS;
			drawedminutes = [];
			

			for(var i=0;i<minutes.length;i++){
				var iDate = minutes[i];
				var iDateInt = iDate.getTime();
				
				var matched = false;
				for(j=0;j<g.childNodes.length;j++){
					var childNode = g.childNodes[j];
					if(childNode.data["time"]==iDateInt && childNode.data["type"]=="minorLabel"){
						matched = true;
						break;
					}
				}
				if (matched) continue;// no duplicate
				
				var x = tAssistance.svg.getX(iDateInt, timeOffset, xOffset, scale_x_time);
				
				text = document.createElementNS(svgNS,"text");
				text.setAttributeNS(null,"x", x);
				text.setAttributeNS(null,"y", y);
				text.setAttributeNS(null,"class","minor");
				text.setAttributeNS(null,"font-family","arial");
				text.setAttributeNS(null,"font-size","10");
				text.setAttributeNS(null,"fill","blue");
				text.setAttributeNS(null,"style","text-anchor:middle;");
				text.textContent = iDate.getMinutes();
				
				// add to the group	
				g.appendChild(text);				
				text.data = {
						"type": "minorLabel",
						"time": iDateInt,
				};
				tAssistance.svg.addTooltip(text, iDate.toString());
				drawedminutes.push(text);
			}		
			
			return drawedminutes;
		},
		// attach second minors to drawed obsels 
		drawSeconds1: function(drawedObsels){
			
			var seconds = tAssistance.outil.getSeconds_svg(drawedObsels);
			var svg = drawedObsels[0].ownerSVGElement;
			var g = drawedObsels[0].parentNode;
			var scale_x_time = parseFloat(g.getAttribute("scale_x_time"));
			var timeOffset = parseInt(g.getAttribute("timeoffset"));
			var xOffset = parseInt(g.getAttribute("xoffset"));
			
			var width = 100,
			height = 18,
			x = 0,
			y = tAssistance.svg.lines["minor"],
			padding = 2;
			var svgNS = tAssistance.svg.svgNS;
			drawSeconds = [];
			
			for(var i=0;i<seconds.length;i++){
				var iDate = seconds[i];
				var iDateInt = iDate.getTime();
				
				var matched = false;
				for(j=0;j<g.childNodes.length;j++){
					var childNode = g.childNodes[j];
					if(childNode.data["time"]==iDateInt && childNode.data["type"]=="minorLabel"){
						matched = true;
						break;
					}
				}
				if (matched) continue;// no duplicate
				
				var x = tAssistance.svg.getX(iDateInt, timeOffset, xOffset, scale_x_time);
				
				text = document.createElementNS(svgNS,"text");
				text.setAttributeNS(null,"x", x);
				text.setAttributeNS(null,"y", y);
				text.setAttributeNS(null,"class","minor");
				text.setAttributeNS(null,"font-family","arial");
				text.setAttributeNS(null,"font-size","10");
				text.setAttributeNS(null,"fill","blue");
				text.setAttributeNS(null,"style","text-anchor:middle;");
				text.textContent = iDate.getSeconds();
				
				// add to the group	
				g.appendChild(text);				
				text.data = {
						"type": "minorLabel",
						"time": iDateInt,
				};
				tAssistance.svg.addTooltip(text, iDate.toString());
				drawSeconds.push(text);
			}
			return drawSeconds;
		},
		// attach second minors to drawed obsels 
		draw01Seconds1: function(drawedObsels){
			
			var _01seconds = tAssistance.outil.get01Seconds_svg(drawedObsels);
			var svg = drawedObsels[0].ownerSVGElement;
			var g = drawedObsels[0].parentNode;
			var scale_x_time = parseFloat(g.getAttribute("scale_x_time"));
			var timeOffset = parseInt(g.getAttribute("timeoffset"));
			var xOffset = parseInt(g.getAttribute("xoffset"));
			
			var width = 100,
			height = 18,
			x = 0,
			y = tAssistance.svg.lines["minor"],
			padding = 2;
			var svgNS = tAssistance.svg.svgNS;
			draw01Seconds = [];
			
			for(var i=0;i<_01seconds.length;i++){
				var iDate = _01seconds[i];
				var iDateInt = iDate.getTime();
				
				var matched = false;
				for(j=0;j<g.childNodes.length;j++){
					var childNode = g.childNodes[j];
					if(childNode.data["time"]==iDateInt && childNode.data["type"]=="minorLabel"){
						matched = true;
						break;
					}
				}
				if (matched) continue;// no duplicate
				
				var x = tAssistance.svg.getX(iDateInt, timeOffset, xOffset, scale_x_time);
				
				text = document.createElementNS(svgNS,"text");
				text.setAttributeNS(null,"x", x);
				text.setAttributeNS(null,"y", y);
				text.setAttributeNS(null,"class","minor");
				text.setAttributeNS(null,"font-family","arial");
				text.setAttributeNS(null,"font-size","10");
				text.setAttributeNS(null,"fill","blue");
				text.setAttributeNS(null,"style","text-anchor:middle;");
				text.textContent = "."+Math.floor(iDate.getMilliseconds()/100);
				
				// add to the group	
				g.appendChild(text);				
				text.data = {
						"type": "minorLabel",
						"time": iDateInt,
				};
				tAssistance.svg.addTooltip(text, iDate.toString());
				draw01Seconds.push(text);
			}
			
			if(tAssistance.debug){
				window.draw01Seconds = draw01Seconds;
			}
			
			return draw01Seconds;
		},
		// draw year majors to drawed obsels
		drawYears: function(drawObsels){
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
			var scale_x_time = parseFloat(g.getAttribute("scale_x_time"));
			var timeOffset = parseInt(g.getAttribute("timeoffset"));
			var xOffset = parseInt(g.getAttribute("xoffset"));
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
				
				var matched = false;
				for(j=0;j<g.childNodes.length;j++){
					var childNode = g.childNodes[j];
					if(childNode.data["time"]==iDateInt && childNode.data["type"]=="majorLabel"){
						matched = true;
						break;
					}
				}
				if (!matched) {// no duplicate
				
					var x = tAssistance.svg.getX(iDateInt, timeOffset, xOffset, scale_x_time);
					
					text = document.createElementNS(svgNS,"text");
					text.setAttributeNS(null,"x", x);
					text.setAttributeNS(null,"y", y);
					text.setAttributeNS(null,"class","major");
					text.setAttributeNS(null,"font-family","arial");
					text.setAttributeNS(null,"font-size","10");
					text.setAttributeNS(null,"fill","blue");
					text.setAttributeNS(null,"style","text-anchor:middle;");
					text.textContent = iDate.format("yyyy");
					
					// add to the group
					g.appendChild(text);
					text.data = {
							"type": "majorLabel",
							"time": iDateInt,
					};
					// add tooltip for label	
					//tAssistance.tooltip.setTooltip(text, obsel_date.toString());
					
					drawedYears.push(text);
				}
				// increment a month
				iDate = new Date(iDateInt);
				iDateInt = iDate.setYear(iDate.getYear()+1);
			}
			
			return drawedYears;
		},
		// draw months based on the group
		drawMonths: function(drawObsels){
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
			var scale_x_time = parseFloat(g.getAttribute("scale_x_time"));
			var timeOffset = parseInt(g.getAttribute("timeoffset"));
			var xOffset = parseInt(g.getAttribute("xoffset"));
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
				
				var matched = false;
				for(j=0;j<g.childNodes.length;j++){
					var childNode = g.childNodes[j];
					if(childNode.data["time"]==iDateInt && childNode.data["type"]=="majorLabel"){
						matched = true;
						break;
					}
				}
				if (!matched){;// no duplicate
				
					var x = tAssistance.svg.getX(iDateInt, timeOffset, xOffset, scale_x_time);
					
					text = document.createElementNS(svgNS,"text");
					text.setAttributeNS(null,"x", x);
					text.setAttributeNS(null,"y", y);
					text.setAttributeNS(null,"class","major");
					text.setAttributeNS(null,"font-family","arial");
					text.setAttributeNS(null,"font-size","10");
					text.setAttributeNS(null,"fill","blue");
					text.setAttributeNS(null,"style","text-anchor:middle;");
					text.textContent = iMonth.format("mmmm yyyy");
					
					// add to the group
					g.appendChild(text);
					text.data = {
							"type": "majorLabel",
							"time": iDateInt,
					};
					
					// add tooltip for label	
					//tAssistance.tooltip.setTooltip(text, obsel_date.toString());
					
					drawedMonths.push(text);
				}
				// increment a month
				iDate = new Date(iDateInt);
				iDateInt = iDate.setMonth(iDate.getMonth()+1);
			}
			
			return drawedMonths;
		},
		// draw weeks based on the group
		drawWeeks: function(drawObsels){
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
			var scale_x_time = parseFloat(g.getAttribute("scale_x_time"));
			var timeOffset = parseInt(g.getAttribute("timeoffset"));
			var xOffset = parseInt(g.getAttribute("xoffset"));
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
				
				var matched = false;
				for(j=0;j<g.childNodes.length;j++){
					var childNode = g.childNodes[j];
					if(childNode.data["time"]==iDateInt && childNode.data["type"]=="majorLabel"){
						matched = true;
						break;
					}
				}
				if (!matched) {// no duplicate
				
					var x = tAssistance.svg.getX(iDateInt, timeOffset, xOffset, scale_x_time);
					
					text = document.createElementNS(svgNS,"text");
					text.setAttributeNS(null,"x", x);
					text.setAttributeNS(null,"y", y);
					text.setAttributeNS(null,"class","major");
					text.setAttributeNS(null,"font-family","arial");
					text.setAttributeNS(null,"font-size","10");
					text.setAttributeNS(null,"fill","blue");
					text.setAttributeNS(null,"style","text-anchor:middle;");
					text.textContent = beginWeek.format("dd mmmm yyyy");
					
					// add to the group
					g.appendChild(text);
					text.data = {
							"type": "majorLabel",
							"time": iDateInt,
					};
					// add tooltip for label	
					//tAssistance.tooltip.setTooltip(text, obsel_date.toString());
					
					drawedDates.push(text);
				}
				// increment date
				iDate = new Date(iDateInt);
				iDateInt = iDate.setDate(iDate.getDate()+7);
			}
			
			return drawedDates;
		},		
		// draw dates based on the group
		drawDates: function(drawObsels){
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
			var scale_x_time = parseFloat(g.getAttribute("scale_x_time"));
			var timeOffset = parseInt(g.getAttribute("timeoffset"));
			var xOffset = parseInt(g.getAttribute("xoffset"));
			var y = tAssistance.svg.lines["major"];
			var height = 10;
			
			firstDT.setHours(0, 0, 0, 0);
			var startX = tAssistance.svg.getCenter(firstSvgObsel);
			
			var drawedDates = [];
			var iDateInt = firstDT.getTime();
			while(iDateInt<=endDTInt){
				var iDate = new Date(iDateInt);
				
				var matched = false;
				for(j=0;j<g.childNodes.length;j++){
					var childNode = g.childNodes[j];
					if(childNode.data["time"]==iDateInt && childNode.data["type"]=="majorLabel"){
						matched = true;
						break;
					}
				}
				if (!matched) {// no duplicate
									
					var x = tAssistance.svg.getX(iDateInt, timeOffset, xOffset, scale_x_time);
					
					text = document.createElementNS(svgNS,"text");
					text.setAttributeNS(null,"x", x);
					text.setAttributeNS(null,"y", y);
					text.setAttributeNS(null,"class","major");
					text.setAttributeNS(null,"font-family","arial");
					text.setAttributeNS(null,"font-size","10");
					text.setAttributeNS(null,"fill","blue");
					text.setAttributeNS(null,"style","text-anchor:middle;");
					text.textContent = iDate.format("dd mmmm yyyy");
					
					// add to the group
					g.appendChild(text);
					text.data = {
							"type": "majorLabel",
							"time": iDateInt,
					};
					
					// add tooltip for label	
					//tAssistance.tooltip.setTooltip(text, obsel_date.toString());
					
					drawedDates.push(text);
				}
				// increment date			
				iDateInt = iDate.setDate(iDate.getDate()+1);
			}
			
			return drawedDates;
		},		
		// draw dates based on the group
		drawHours: function(drawObsels){
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
			var scale_x_time = parseFloat(g.getAttribute("scale_x_time"));
			var timeOffset = parseInt(g.getAttribute("timeoffset"));
			var xOffset = parseInt(g.getAttribute("xoffset"));
			var y = tAssistance.svg.lines["major"];
			var height = 10;
			
			firstDT.setMinutes(0, 0, 0);
			var startX = tAssistance.svg.getCenter(firstSvgObsel);
			
			var drawedDates = [];
			var iDateInt = firstDT.getTime();
			while(iDateInt<=endDTInt){
				var iDate = new Date(iDateInt);
				
				var matched = false;
				for(j=0;j<g.childNodes.length;j++){
					var childNode = g.childNodes[j];
					if(childNode.data["time"]==iDateInt && childNode.data["type"]=="majorLabel"){
						matched = true;
						break;
					}
				}
				if (!matched) {// no duplicate
									
					var x = tAssistance.svg.getX(iDateInt, timeOffset, xOffset, scale_x_time);
					
					text = document.createElementNS(svgNS,"text");
					text.setAttributeNS(null,"x", x);
					text.setAttributeNS(null,"y", y);
					text.setAttributeNS(null,"class","major");
					text.setAttributeNS(null,"font-family","arial");
					text.setAttributeNS(null,"font-size","10");
					text.setAttributeNS(null,"fill","blue");
					text.setAttributeNS(null,"style","text-anchor:middle;");
					text.textContent = iDate.format("dd mmmm yyyy HH:MM");
					
					// add to the group
					g.appendChild(text);
					text.data = {
							"type": "majorLabel",
							"time": iDateInt,
					};
					
					// add tooltip for label	
					//tAssistance.tooltip.setTooltip(text, obsel_date.toString());
					
					drawedDates.push(text);
				}
				// increment date			
				iDateInt = iDate.setHours(iDate.getHours()+1);
			}
			
			return drawedDates;
		},		
		// draw dates based on the group
		drawMinutes: function(drawObsels){
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
			var scale_x_time = parseFloat(g.getAttribute("scale_x_time"));
			var timeOffset = parseInt(g.getAttribute("timeoffset"));
			var xOffset = parseInt(g.getAttribute("xoffset"));
			var y = tAssistance.svg.lines["major"];
			var height = 10;
			
			firstDT.setSeconds(0, 0);
			var startX = tAssistance.svg.getCenter(firstSvgObsel);
			
			var drawedDates = [];
			var iDateInt = firstDT.getTime();
			while(iDateInt<=endDTInt){
				var iDate = new Date(iDateInt);
				
				var matched = false;
				for(j=0;j<g.childNodes.length;j++){
					var childNode = g.childNodes[j];
					if(childNode.data["time"]==iDateInt && childNode.data["type"]=="majorLabel"){
						matched = true;
						break;
					}
				}
				if (!matched) {// no duplicate
					var x = tAssistance.svg.getX(iDateInt, timeOffset, xOffset, scale_x_time);
					
					text = document.createElementNS(svgNS,"text");
					text.setAttributeNS(null,"x", x);
					text.setAttributeNS(null,"y", y);
					text.setAttributeNS(null,"class","major");
					text.setAttributeNS(null,"font-family","arial");
					text.setAttributeNS(null,"font-size","10");
					text.setAttributeNS(null,"fill","blue");
					text.setAttributeNS(null,"style","text-anchor:middle;");
					text.textContent = iDate.format("dd mmmm yyyy HH:MM");
					
					// add to the group
					g.appendChild(text);
					text.data = {
							"type": "majorLabel",
							"time": iDateInt,
					};
					
					// add tooltip for label	
					//tAssistance.tooltip.setTooltip(text, obsel_date.toString());
					
					drawedDates.push(text);
				}
				// increment date				
				iDateInt = iDate.setMinutes(iDate.getMinutes()+1);
			}
			
			return drawedDates;
		},
		// add tooltip to the svg element
		drawSeconds: function(drawObsels){
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
			var scale_x_time = parseFloat(g.getAttribute("scale_x_time"));
			var timeOffset = parseInt(g.getAttribute("timeoffset"));
			var xOffset = parseInt(g.getAttribute("xoffset"));
			var y = tAssistance.svg.lines["major"];
			var height = 10;
			
			firstDT.setMilliseconds(0);
			var startX = tAssistance.svg.getCenter(firstSvgObsel);
			
			var drawedDates = [];
			var iDateInt = firstDT.getTime();
			while(iDateInt<=endDTInt){
				var iDate = new Date(iDateInt);
				
				var matched = false;
				for(j=0;j<g.childNodes.length;j++){
					var childNode = g.childNodes[j];
					if(childNode.data["time"]==iDateInt && childNode.data["type"]=="majorLabel"){
						matched = true;
						break;
					}
				}
				if (!matched) {// no duplicate
				
					var x = tAssistance.svg.getX(iDateInt, timeOffset, xOffset, scale_x_time);
					
					text = document.createElementNS(svgNS,"text");
					text.setAttributeNS(null,"x", x);
					text.setAttributeNS(null,"y", y);
					text.setAttributeNS(null,"class","major");
					text.setAttributeNS(null,"font-family","arial");
					text.setAttributeNS(null,"font-size","10");
					text.setAttributeNS(null,"fill","blue");
					text.setAttributeNS(null,"style","text-anchor:middle;");
					text.textContent = iDate.format("dd mmmm yyyy HH:MM:ss");
					
					// add to the group
					g.appendChild(text);
					text.data = {
							"type": "majorLabel",
							"time": iDateInt,
					};
					
					// add tooltip for label	
					//tAssistance.tooltip.setTooltip(text, obsel_date.toString());
					
					drawedDates.push(text);
				}
				// increment date
				
				iDateInt = iDate.setSeconds(iDate.getSeconds()+1);
			}
			
			return drawedDates;
		},
		
		drawObselLabels: function(drawedObsels){
			if(drawedObsels.length==0) return;
			var firstSvgObsel = drawedObsels[0];
			var g = firstSvgObsel.parentNode;
			var scaleLevel = parseFloat(g.getAttribute("scaleLevel"));
			
			if(scaleLevel==0||scaleLevel==1||scaleLevel==2){// year, 6 months, 3 months
				tAssistance.svg.drawYears(drawedObsels);
				tAssistance.svg.drawMonths1(drawedObsels);
			}
			else if(scaleLevel==3){// month
				tAssistance.svg.drawMonths(drawedObsels);
				tAssistance.svg.drawDates1(drawedObsels);
			}else if(scaleLevel==4){// week
				tAssistance.svg.drawWeeks(drawedObsels);
				tAssistance.svg.drawDates1(drawedObsels);
			}
			else if(scaleLevel==5||scaleLevel==6){// day, 12 hours
				tAssistance.svg.drawDates(drawedObsels);
				tAssistance.svg.drawHours1(drawedObsels);					
			}
			else if(scaleLevel==7||scaleLevel==8){// hour, 30 minutes
				tAssistance.svg.drawHours(drawedObsels);
				tAssistance.svg.drawMinutes1(drawedObsels);
			}
			else if(scaleLevel==9){// minutes, 30 minutes
				tAssistance.svg.drawMinutes(drawedObsels);
				tAssistance.svg.drawSeconds1(drawedObsels);
			}
			else if(scaleLevel==10){// seconds
				tAssistance.svg.drawSeconds(drawedObsels);
				tAssistance.svg.draw01Seconds1(drawedObsels);
			}
		},
		
		addTooltip: function (svgelement, text){
			var svgNS = tAssistance.svg.svgNS;
			var title = document.createElementNS(svgNS,"title");
			title.textContent = text;
			svgelement.appendChild(title);			
		},
		//
		getX: function (utcTime, timeoffset, xoffset, scale_x_time){
			var x = (utcTime - timeoffset)*scale_x_time + xoffset;
			return parseInt(x);			
		},
		
	};
	
	tAssistance.obsels = {
		filter: function(obsels, start, end){
			var filteredObsels = [];
			for(i=0;i<obsels.length;i++){
				var obsel = obsels[i];
				if(obsel.begin>=start && obsel.begin<=end){
					filteredObsels.push(obsel);
				}				
			}
			
			if(tAssistance.debug){
				console.log(filteredObsels.length);
			}
			
			return filteredObsels;
		},
		filter1: function(svgElements, start, end){
			var filteredSvgElements = [];
			for(i=0;i<svgElements.length;i++){
				var svgElement = svgElements[i];
				if(svgElement.data["time"]>=start && svgElement.data["time"]<=end){
					filteredSvgElements.push(svgElement);
				}				
			}
			
			if(tAssistance.debug){
				console.log(filteredSvgElements.length);
			}
			
			return filteredSvgElements;
		},
		diff: function(drawObsels, obsels){
			var ret = {
					"=": [],// drawn obsels exist
					"-": [],// drawn obsels need to be removed
					"+": [],// obsels need to be added
			};
			var matchedIds = [];
			
			for(var i=0;i<obsels.length;i++){
				var obsel = obsels[i];
				var isMatched = false;
				
				for(j=0;j<drawObsels.length;j++){// need to be improved
					var drawObsel = drawObsels[j];
					if(obsel.begin == drawObsel.data["obsel"].begin){
						isMatched = true;
						matchedIds.push(j);
						break;
					}
				}
				if(isMatched){
					ret["="].push(drawObsel);
				}else{
					ret["+"].push(obsel);
				}
			}
			
			for(i=0;i<drawObsels.length;i++){
				var drawObsel = drawObsels[i];
				if(matchedIds.indexOf(i)==-1){
					ret["-"].push(drawObsel);
				}				
			}
			return ret;
		},
			
			
	}
		
	tAssistance.outil = {

		getMonths_svg: function(svgObsels){
			var months = [];
			for(var i=0;i<svgObsels.length;i++){
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
		getDates_svg: function(svgObsels){
			var dates = [];
			for(var i=0;i<svgObsels.length;i++){
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
		getHours_svg: function(svgObsels){
			
			var hours = [];
			for(var i=0;i<svgObsels.length;i++){
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
			for(var i=0;i<svgObsels.length;i++){
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
			for(var i=0;i<svgObsels.length;i++){
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
		get01Seconds_svg: function(svgObsels){
			var _01seconds = [];
			for(var i=0;i<svgObsels.length;i++){
				var svgObsel = svgObsels[i];
				// get dateTime from begin				
				var obsel = svgObsel.data["obsel"];
				// get dateTime from begin
				var date = tAssistance.datetime.utc2LocalDate(obsel.begin);
				// reset milliseconds to 0.x00 
				date.setMilliseconds(Math.floor(date.getMilliseconds()/100)*100);
				
				if(!tAssistance.datetime.in_array(_01seconds,date)){
					_01seconds.push(date);
				}
			}
			if(tAssistance.debug){
				window._01seconds = _01seconds;
			}
			return _01seconds;
		},
		getHours: function(obsels){
			var hours = [];
			for(var i=0;i<obsels.length;i++){
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
	};
	
	tAssistance.key = {
		leftArrow: 37,	// Key code for the left arrow key.
	    upArrow: 38,
	    rightArrow: 39,
	    downArrow: 40		
	};
	
	tAssistance.config = {
		panRate: 10,	// Number of pixels to pan per key press.
		zoomRate: 0.25
	};
	
	tAssistance.event = {
		
	}
	
	tAssistance.rules = {
		applyRules: function(obsel,rules,base){
			var drawnObsel = null;
			for(var i=0;i<rules.length;i++){
				var rule = rules[i];
												
				var pass = rule.selectorFn(obsel);
				
				if(pass){
					drawnObsel = rule.styleFn(obsel,base);
					drawnObsel.setAttributeNS(null,'class', 'obsel');// attributes for system design
					return drawnObsel;
				}				
			}
			return drawnObsel;
		},
		translateRules: function(rules){			
			for(var i=0;i<rules.length;i++){
				var rule = rules[i];
				var selector_script = rule.selector;
				var style_script = rule.style;
				
				eval("rule.selectorFn = "+selector_script+";");
				eval("rule.styleFn = "+style_script+";");								
			}			
		},
		getNewRules: function(){
			$.get("api.php?o=rule&fn=all",function(data){
				localStorage["rules"]= JSON.parse(data);				
			});			
		},			
			
	}
	
	tAssistance.data = {// an another implementation like jQuery.data
		"_data": [],
		setData: function(node, data){
			var pos = tAssistance.data.indexOf(node);
			if(pos==-1){			
				tAssistance.data["_data"].push([node, data]);
			}
			else{
				tAssistance.data["_data"][pos] = [node, data];
			}
			
		},
		indexOf: function(node){
			for(var i=0;i<tAssistance.data["_data"].length;i++){
				var data = tAssistance.data["_data"][i];
				if(node==data[0]) return i;
			}
			return -1;
		},
		getData: function(node){
			var pos = tAssistance.data.indexOf(node);
			if(pos!=-1){
				return tAssistance.data["_data"][pos][1];
			}
			else{
				return null;
			}
		},
		
	}
	
	tAssistance.message = {
		obsel: function(event_data){
			var user_id = event_data.user_id;
			var base_uri = event_data.base_uri;
			var trace_id = event_data.trace_uri;			
			
			console.log("a message type=obsel is received !");
			var mgr = tService.TraceManager({
				base_uri: base_uri,
				async: true
			});
			var trc = mgr.initTrace({
				name: trace_id
			});
			trc.getObsels({
				success: function(obsels){
					localStorage["tAssistance.obsels"] = JSON.stringify(obsels);				
				}
			});
		},
		trace: function(event_data){
			var user_id = event_data.user_id;
			var base_uri = event_data.base_uri;
			var trace_id = event_data.trace_uri;		
			
			console.log("a message type=trace is received !");
			var params = {
				"user_id": user_id,
				"base_uri": base_uri,
				"trace_id": trace_uri
			}
			tAssistance.http.customReq("index.php?page=TraceView",params, "post");
			
		},			
	}
	tAssistance.http = {
		customReq: function(url, params, method) {
		    method = method || "post"; // Set method to post by default if not specified.

		    // The rest of this code assumes you are not using a library.
		    // It can be made less wordy if you use one.
		    var form = document.createElement("form");
		    form.setAttribute("method", method);
		    form.setAttribute("action", url);

		    for(var key in params) {
		        if(params.hasOwnProperty(key)) {
		            var hiddenField = document.createElement("input");
		            hiddenField.setAttribute("type", "hidden");
		            hiddenField.setAttribute("name", key);
		            hiddenField.setAttribute("value", params[key]);

		            form.appendChild(hiddenField);
		         }
		    }

		    document.body.appendChild(form);
		    form.submit();
		}
	}
	
	tAssistance.obsel = {
		id: "@id",
		type: "@type",
		
	}
	
	