tAssistance.OzaSeqGroup = function(id, parent, width, zoom){
	//this.scale_x_time = 1000/tAssistance.Datetime.units[zoom];	
	//this.timeoffset;
	this.obselNb = 10;
	this.xoffset;
	this.childs = [];
	this.element;
	this.scaleLevel = 0;
	this.width = width;
	this.trace_id = parent.trace.id;
	this.id = id;
	this.marked;
	this.parent = parent;
	
	this.changeIOffset = function(iOffset){
		var g = this.element;
		var drawnObsels = [];
		for(i=0;i<g.childNodes.length;i++){
			var node = g.childNodes[i];
			if(node.getAttribute("class")=="obsel"){
				drawnObsels.push(node);
			}
		}
    	
    	var obsels = g.data["obsels"];
    	//var scale_x_time = parseFloat(this.scale_x_time);
    	var oldIOffset = parseFloat(this.iOffset);
    	var newIOffset = iOffset;
    	
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
	    	"start": tAssistance.Datetime.utc2LocalDate(start),
	    	"end": tAssistance.Datetime.utc2LocalDate(end),
	    };
	    console.log(log);
	};
	
	this.clear_all = function(){
		var g = this.element;
		var nbChilds = this.childs.length;
		for(i=0;i<nbChilds;i++){
			this.childs[0].clear();// remove the child object
			this.childs.splice(0,1);// remove the reference
		}		
	};
	
	this.update = function(){
		var g = this.element;
		this.clear_all();
		
		var obsels = [];
		
		var store = new tStore.OzaTStore();
		
		src_obsels = store.getTrace(this.trace_id).obsels;
		
		console.log(src_obsels.length);
		//this.obsels=obsels;
		scaleLevel = this.scaleLevel;
		var width = this.width;
		//tAssistance.clear_obsels();
		var obselNb = 10;
		
		var iOffset = this.iOffset;
		var obselWidth = 120;
		var start = iOffset - Math.round(obselNb/2);
		var end = iOffset + Math.round(obselNb/2);
		if(start<0) start = 0;
		if(end>src_obsels.length-1) end = src_obsels.length-1;
		
		// filter obsels
		//obsels = tAssistance.obsels.filter(obsels, start, end);
		var obsels = [];
		for(var i=start;i<=end;i++){
			src_obsels[i].iObsel = i;
			obsels.push(src_obsels[i]);
		}
		
		var log = {
				"func": "OzaSeqGroup.update",
				"iStart": start,
				"oEnd": end
		};
		
		console.log(log);
		// diff obsels
		//var diffs = tAssistance.obsels.diff(document.querySelectorAll(".obsel"), obsels);		
		
		// draw obsels
		var drawnObsels = this.addObsels(obsels);
		
		// draw labels
		var labels = this.setLabels();
		
		//draw markers
		var marker_id = "marker"+(new Date()).getTime()+Math.floor((Math.random() * 1000) + 1);
		var marker = new tAssistance.ObselMarker(marker_id, this);
		
		// draw obsel labels as majors & minors
		//tAssistance.group.drawObselLabels(drawnObsels);
		// fire the updated event
		console.log("update on the trace"+this.trace_id);
		
		
	};
	this.addObsels = function(obsels){
		//var g;
		var y = tAssistance.svg.lines["line0"],
		r = 8;

		//rules_str = localStorage["tAssistance.rules"];
		//rules = JSON.parse(rules_str);
		
		//tAssistance.rules.translateRules(rules);			
		
		// make a svg
		var svgNS = tAssistance.svg.svgNS;
		var drawedObsels = [];
		
		
		
		if(!this.iOffset){
			var endObsel = obsels[obsels.length-1];
			var utcBegin0 = endObsel.begin;
			this.iOffset = (endObsel.iObsel || obsels.length - 1) -  Math.round(this.obselNb/2);
		}
		var iOffset = this.iOffset;
		
		if(!this.xOffset){
			this.xOffset = this.width/2;
		}
		var xOffset = this.xOffset;
		
		if(!this.obselWidth){
			this.obselWidth = 120;
		}
		var obselWidth = this.obselWidth;
		
		
		begin = new Date().getTime();
		
		for(var i=0;i<obsels.length;i++){
			var src_obsel = obsels[i];
			var utcBegin = src_obsel.begin;
			var iObsel = src_obsel.iObsel || i;
			var x = this.getX(iObsel, xOffset, iOffset, obselWidth);
			var obsel_id = "obsel"+(new Date()).getTime()+Math.floor((Math.random() * 1000) + 1);			
			var obsel = new tAssistance.OzaImageObselMaker(obsel_id,this,x, iObsel, src_obsel);
		}
		end = new Date().getTime();
		console.log("performance: "+(end-begin));
		
		if(tAssistance.debug){
			//window.drawedObsels = dom_obsel;
			
		}
		return true;
	};
	this.getX = function (iObsel, xOffset, iOffset, obselWidth){
		var x = (iObsel - iOffset)*obselWidth + xOffset;
		return parseInt(x);			
	};
	
	this.mouseDown = function(posx, posy){
		var g_dom = this.element;
		var transform_str = g_dom.getAttribute('transform');
    	var transform_obj = tAssistance.Util.parse_transform(g_dom);
	    
        this.mouseDown_x = posx;
        this.mouseDown_y = posy;
        this.mouseMove_x = posx;
        this.mouseMove_y = posy;
        this.group_x = transform_obj["translate.x"];
        this.group_y = transform_obj["translate.y"];
        this.isMouseDown = "1";
	};
	
	this.mouseUp = function(){
		// read delta x,y
        var mousedown_x = this.mouseDown_x;
    	var mousedown_y = this.mouseDown_y;
        var mousemove_x = this.mouseMove_x;
        var mousemove_y = this.mouseMove_y;
        var translate_x = mousemove_x - mousedown_x;
        var translate_y = mousemove_y - mousedown_y;
        //
        this.isMouseDown = false;
    	
    	// calculate new timeoffset
    	var oldIOffset = this.iOffset;
    	var xoffset = this.xoffset;
    	//var scale_x_time = this.scale_x_time;		    	
    	var newIOffset = parseInt(oldIOffset - (translate_x/this.obselWidth));
    	
    	this.iOffset = newIOffset;
    	this.element.setAttribute("transform","translate(0 0) scale(1 1)");
    	this.update();
    	
    	// fire a "changeTimeOffset" event
    	$(document).trigger("changeIOffset", {
    		newIOffset: newIOffset,					
    	});
    	
    	var finish = new Date().getTime();// for debug
    	if(tAssistance.debug){
    		var ret = {
    				"newIOffset": newIOffset,
    				"oldIOffset": oldIOffset
    		}
    		console.log(ret);
    	}
	};
	
	this.mouseMove = function(posx, posy){
		var g_dom = this.element;
		var transform_obj = tAssistance.Util.parse_transform(g_dom);
        
    	// read coordinations
    	var mousedown_x = this.mouseDown_x;
    	var mousedown_y = this.mouseDown_y;
        var group_x = this.group_x;
        var group_y = this.group_y;
        
        // set coorinations
        this.mouseMove_x = posx;
        this.mouseMove_y = posy;
    	
        // transform
    	
    	transform_obj["translate.x"] = posx - mousedown_x + group_x;
    	transform_obj["translate.y"] = group_y;

    	g_dom.setAttribute('transform', tAssistance.Util.make_transform_str(transform_obj));	
	};
	
	// public call for markObsel
	this.markObsel = function(src_obsel_id){
		if(this.marker){
			this.marker.clear();
		}
		
		this.marked = src_obsel_id;
		var marker_id = "marker"+(new Date()).getTime()+Math.floor((Math.random() * 1000) + 1);	
		var marker = new tAssistance.ObselMarker(marker_id, this);
	};
	
	this.unmarkObsel = function(){
//		if(this.marked){
//			this.marked.remove();
//		}
	};
	
	this.setLabels = function(){
		
		//if(drawedObsels.length==0) return;
		//var firstSvgObsel = drawedObsels[0];
		//var g = firstSvgObsel.parentNode;
		var scaleLevel = this.scaleLevel;
		var major = false;
		var minor = false;
		
		if(true){// year, 6 months, 3 months
			major = "year";
			minor = "month";
			snap = tAssistance.Datetime.units[scaleLevel + 1];
		}
//		else if(scaleLevel==3){// month
//			tAssistance.group.drawMonths(drawedObsels);
//			tAssistance.group.drawDates1(drawedObsels);
//		}else if(scaleLevel==4){// week
//			tAssistance.group.drawWeeks(drawedObsels);
//			tAssistance.group.drawDates1(drawedObsels);
//		}
//		else if(scaleLevel==5||scaleLevel==6){// day, 12 hours
//			tAssistance.group.drawDates(drawedObsels);
//			tAssistance.group.drawHours1(drawedObsels);					
//		}
//		else if(scaleLevel==7||scaleLevel==8){// hour, 30 minutes
//			tAssistance.group.drawHours(drawedObsels);
//			tAssistance.group.drawMinutes1(drawedObsels);
//		}
//		else if(scaleLevel==9){// minutes, 30 minutes
//			tAssistance.group.drawMinutes(drawedObsels);
//			tAssistance.group.drawSeconds1(drawedObsels);
//		}
//		else if(scaleLevel==10){// seconds
//			tAssistance.group.drawSeconds(drawedObsels);
//			tAssistance.group.draw01Seconds1(drawedObsels);
//		}
		var xoffset = this.xoffset;
		var scale_x_time = this.scale_x_time;
		var timeoffset = this.timeoffset;
		var mod = timeoffset % snap;
		var width = this.width;
		var nbMinors = (width / scale_x_time) / snap;
		var zeroMinor = timeoffset;
		
		for(var i= 0;i<nbMinors;i++){
			var minorTime = zeroMinor - Math.floor(nbMinors/2 - i) *snap;
			
			var x = this.getX(minorTime, timeoffset, xoffset, scale_x_time);
			
			var label = new tAssistance.OzaObselLabel(this, x, minorTime, snap);
		}
		
		
		
	};
	
	this.clear = function(){
		this.element.parentNode.removeChild(this.element);
	};
	
	this.moveTo = function(s_obsel_id){
		var iObsel = false;
		var s_obsels = this.parent.trace.obsels;
		for(var i=0;i<s_obsels.length;i++){
			if(s_obsels[i].id==s_obsel_id){
				iObsel = i;
				break;
			}
		}
		if(iObsel){
			this.iOffset = iObsel;
			this.update();
		}		
	}
	
	// element
	var svg = parent.element.querySelector("svg");	
	var svgNS = tAssistance.svg.svgNS;
	var group = document.createElementNS(svgNS,"g");
	group.setAttribute("transform","translate(0 0) scale(1 1)");
	group.setAttribute("data-id",this.id);
	svg.appendChild(group);
	// save the bi-references
	this.element = group;
	parent.group = this;
	
	//tAssistance.data[id] = this;
	
	
	
	
	
	
};