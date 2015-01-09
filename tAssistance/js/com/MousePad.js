tAssistance.MousePad = function(){
	
	this.addGroup = function(g){
		this.element.addEventListener("mousedown",function(e) {
			//console.log("mousedown");
			if(g==undefined) return;
			isMouseDown = "true";
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
	        
	    	g.mouseDown(posx, posy);
	        
	    });
	    
	    document.addEventListener("mouseup", function(e) {
			//console.log("mouseup");
	    	if(g==undefined) return;
	    	var isMouseDown = g.isMouseDown;		    	
	        if(!isMouseDown || isMouseDown == "") return;
	    	
	    	if(!e) var e = window.event;
	        e.preventDefault();
	        
	        g.mouseUp();
	    });

	    this.element.addEventListener("mousemove",function(e){
			//console.log("mousemove");
	    	if(g==undefined) return;
	    	if(!e) var e = window.event;
	    	e.preventDefault();
	    	//return;
	    	var isMouseDown = g.isMouseDown;
	    	
	        if(!isMouseDown || isMouseDown == "") return;
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
	        
	    	g.mouseMove(posx,posy);
	        			        
	    });
	};
};