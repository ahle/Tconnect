tAssistance.group = {
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
	    	var drawObsels1 = tAssistance.group.drawObsels(diffs["+"], g);
	    	tAssistance.group.drawObselLabels(drawObsels1);
	    	
	    	
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
		tAssistance.group.clear_all(g);
	
		var obsels = [];
		if(localStorage["tAssistance.obsels"]){// get obsels from cache
			obsels = tAssistance.obsels.getLocalObsels();
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
		var drawnObsels = tAssistance.group.drawObsels(diffs["+"], g);		
		// draw obsel labels as majors & minors
		tAssistance.group.drawObselLabels(drawnObsels);
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
	},
	update: function(g){
		tAssistance.group.clear_all(g);
	
		var obsels = [];
		if(localStorage["tAssistance.obsels"]){// get obsels from cache
			obsels = tAssistance.obsels.getLocalObsels();
		}
		else{
			//obsels = tAssistance.getObsels("http://213.223.171.36/ktbs/ozalid_exp/","trc_u1");		
		}
		console.log(obsels.length);
		g.data["obsels"]=obsels;
		scaleLevel = g.getAttribute("scaleLevel");
		var width = 1000;
		//tAssistance.clear_obsels();
		var scale_x_time = g.getAttribute("scale_x_time");
		var timeoffset = parseFloat(g.getAttribute("timeoffset"));
		var start = timeoffset - width/2/scale_x_time;
		var end = timeoffset + width/2/scale_x_time;
		
		//g.setAttribute("scale_x_time", scale_x_time);
		
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
		//var diffs = tAssistance.obsels.diff(document.querySelectorAll(".obsel"), obsels);		
		
		// draw obsels
		var drawnObsels = tAssistance.group.drawObsels(obsels, g);		
		// draw obsel labels as majors & minors
		tAssistance.group.drawObselLabels(drawnObsels);
		// fire the updated event
		
	},
	// draw obsels to the group
	drawObsels: function(obsels, g){
		//var g;
		var y = tAssistance.svg.lines["line0"],
		r = 8;
//		var rules = [{selector: "function(obsel){return obsel['@type']=='m:oze_view';}",
//		             style: "function(obsel,auto){myCircle = document.createElementNS('http://www.w3.org/2000/svg','circle');myCircle.setAttributeNS(null,'cx', auto.x);myCircle.setAttributeNS(null,'cy', auto.y);myCircle.setAttributeNS(null,'r', auto.r);myCircle.setAttributeNS(null,'class', 'obsel');myCircle.setAttributeNS(null,'style','fill: yellow; stroke: black');return myCircle;}"
//		}];
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
			var x = tAssistance.group.getX(utcBegin, timeoffset, xoffset, scale_x_time);
			
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
					var obsel_in_html = tAssistance.dom.obsel.renderProperty({
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
			
			var x = tAssistance.group.getX(iDateInt, timeOffset, xOffset, scale_x_time);
			
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
			tAssistance.group.addTooltip(text, iDate.toString());
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
			
			var x = tAssistance.group.getX(iDateInt, timeOffset, xOffset, scale_x_time);
			
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
			tAssistance.group.addTooltip(text, iDate.toString());
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
			
			var x = tAssistance.group.getX(iDateInt, timeOffset, xOffset, scale_x_time);
			
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
			tAssistance.group.addTooltip(text, iDate.toString());
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
			
			var x = tAssistance.group.getX(iDateInt, timeOffset, xOffset, scale_x_time);
			
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
			tAssistance.group.addTooltip(text, iDate.toString());
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
			
			var x = tAssistance.group.getX(iDateInt, timeOffset, xOffset, scale_x_time);
			
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
			tAssistance.group.addTooltip(text, iDate.toString());
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
			
			var x = tAssistance.group.getX(iDateInt, timeOffset, xOffset, scale_x_time);
			
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
			tAssistance.group.addTooltip(text, iDate.toString());
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
			
				var x = tAssistance.group.getX(iDateInt, timeOffset, xOffset, scale_x_time);
				
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
			
				var x = tAssistance.group.getX(iDateInt, timeOffset, xOffset, scale_x_time);
				
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
			
				var x = tAssistance.group.getX(iDateInt, timeOffset, xOffset, scale_x_time);
				
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
								
				var x = tAssistance.group.getX(iDateInt, timeOffset, xOffset, scale_x_time);
				
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
								
				var x = tAssistance.group.getX(iDateInt, timeOffset, xOffset, scale_x_time);
				
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
				var x = tAssistance.group.getX(iDateInt, timeOffset, xOffset, scale_x_time);
				
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
			
				var x = tAssistance.group.getX(iDateInt, timeOffset, xOffset, scale_x_time);
				
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
			tAssistance.group.drawYears(drawedObsels);
			tAssistance.group.drawMonths1(drawedObsels);
		}
		else if(scaleLevel==3){// month
			tAssistance.group.drawMonths(drawedObsels);
			tAssistance.group.drawDates1(drawedObsels);
		}else if(scaleLevel==4){// week
			tAssistance.group.drawWeeks(drawedObsels);
			tAssistance.group.drawDates1(drawedObsels);
		}
		else if(scaleLevel==5||scaleLevel==6){// day, 12 hours
			tAssistance.group.drawDates(drawedObsels);
			tAssistance.group.drawHours1(drawedObsels);					
		}
		else if(scaleLevel==7||scaleLevel==8){// hour, 30 minutes
			tAssistance.group.drawHours(drawedObsels);
			tAssistance.group.drawMinutes1(drawedObsels);
		}
		else if(scaleLevel==9){// minutes, 30 minutes
			tAssistance.group.drawMinutes(drawedObsels);
			tAssistance.group.drawSeconds1(drawedObsels);
		}
		else if(scaleLevel==10){// seconds
			tAssistance.group.drawSeconds(drawedObsels);
			tAssistance.group.draw01Seconds1(drawedObsels);
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