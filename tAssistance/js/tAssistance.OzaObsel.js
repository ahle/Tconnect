tAssistance.OzaObsel = function(id,parent,x,time,src_obsel){
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
	
	var element = tAssistance.makeObsel(this.src_obsel, base.x);
	if(element===false) return false;
	element.setAttribute("data-id",id);
	parent.element.appendChild(element);
	parent.childs.push(this);
	
	var obsel = this;
	// add the event
	element.onclick = function(e){
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
	this.element = element;
	tAssistance.data[id] = this;
	
};