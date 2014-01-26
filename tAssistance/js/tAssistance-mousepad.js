tAssistance.mousepad = function(mousepad, g){
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
    	var transform_obj = tAssistance.group.parse_transform(g);
	        
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
    	
    	tAssistance.group.changeTimeOffset(g, newTimeOffset);
    	
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
        
    	var transform_obj = tAssistance.group.parse_transform(g);
        
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

        g.setAttribute('transform', tAssistance.group.make_transform_str(transform_obj));	
        			        
    });
};