tAssistance.OzaObselMaker = function(params){
	var id = params.id;
	var parent = params.group;
	var x = params.x;
	var time = params.time;
	var src_obsel = params.obsel;
	var userconfig = params.userconfig;
	
	this.src_obsel = src_obsel;
	this.x = x;
	this.time = time;
	this.element;
	this.id = id;
	this.parent = parent;
	this.id = id;
	this.marked = false;
	this.type = "obsel";
	
	this.renderProperty= function(output){
		var obsel_str = JSON.stringify(this.src_obsel);
		
		$.get("index.php?page=Property&id=1&obsel="+encodeURIComponent(obsel_str),function(data){
			
			$(output).append(data);
			//$(".trace_property").find("code").tooltip();
		});
	};
	
	this.clear = function(){
		var id =  this.id;
		// remove element
		this.element.parentNode.removeChild(this.element);
		//remove marked
		//if(this.marked)
		//	this.marked.clear();
		
		// remove dataset
		delete tAssistance.data[id];
	}
	
	// create element		
	var color = '#'+Math.floor(Math.random()*16777215).toString(16);
	var y = tAssistance.svg.lines["line0"],
	r = 8;
	
	var base = {
		"x": x, "y": y, "color": color, "r": '10'
	}
	
	var params = {
		"obsel": this.src_obsel,
		"x": base.x,
		userconfig: userconfig
	};
	
	//var icon = tAssistance.dom.OzaObselIcon(params);
	var icon = tAssistance.OzaObselIconMaker(params);
	
	if(icon===false) return false;
	icon.setAttribute("data-id",id);
	icon.setAttribute("x",x);
	icon.setAttribute("y",y);
	
//	if(params.obsel.index > 0){
//		//y = parseInt(parent.element.lastChild.getAttribute("y"));		
//		if(parent.element.lastChild.getBBox().x > 900){
//			x = parent.element.firstChild.getBBox().x;
//			y = parseInt(parent.element.lastChild.getAttribute("y")) + 20;
//		}
//		else{
//			x = parseInt(parent.element.lastChild.getAttribute("x")) + 20;
//			y = parseInt(parent.element.lastChild.getAttribute("y"));
//		}
//		icon.setAttribute("x",x);
//		icon.setAttribute("y",y);
//	}	
	
	parent.element.appendChild(icon);
	parent.childs.push(this);
	
	var obsel = this;
	// add the event
	icon.onclick = function(e){
		//var obsel_in_html = obsel.renderProperty("#controlPanel");
		parent.markObsel(obsel.src_obsel.id);
		
		var trace_graph = obsel.parent.parent;
		var obsel_list = trace_graph.obsel_list;
		
		if(!obsel_list) return;
		
		obsel_list.markObsel(obsel.src_obsel.id);
		
	};
	// mark if have
	if(this.parent.marked && this.parent.marked.src_obsel_id == this.src_obsel.id){
		var markObsel = new tAssistance.markObsel(this);
	}
		
	// save the bi-references
	this.element = icon;
	tAssistance.data[id] = this;
	
};