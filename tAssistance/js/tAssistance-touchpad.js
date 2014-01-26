tAssistance.touchpad = function(touchpad, g){
			
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
};