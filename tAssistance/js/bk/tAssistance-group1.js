tAssistance.group1 = {
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

		rules_str = localStorage["tAssistance.rules"];
		rules = JSON.parse(rules_str);
		
		tAssistance.rules.translateRules(rules);			
		
		// make a svg
		var svgNS = tAssistance.svg.svgNS;
		var drawedObsels = [];
		
		//var scale_x_time = g.getAttribute("scale_x_time");
		
		//if(!g.getAttribute("timeoffset")){
			var firstObsel = obsels[0];
		//	var utcBegin0 = firstObsel.begin;
		//	g.setAttribute("timeoffset",utcBegin0);
		//}
		//var timeoffset = parseInt(g.getAttribute("timeoffset"));
		
		if(!g.getAttribute("xoffset")){
			g.setAttribute("xoffset", 500);
		}
		var xoffset = parseInt(g.getAttribute("xoffset"));
		begin = new Date().getTime();
		//for(i=0;i<obsels.length;i++){
		for(var i=0;i<obsels.length;i++){
			var obsel = obsels[i];
			var utcBegin = obsel.begin;
			var x = i*30;
			
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
					// for debug
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

	// mouse down on the group
	mousedown: function(g,posX,posY){
		
		
	}
};