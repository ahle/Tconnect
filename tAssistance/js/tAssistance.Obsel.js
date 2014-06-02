tAssistance.Obsel = function(id,parent,x,time,src_obsel, rules){
	this.src_obsel = src_obsel;
	this.x = x;
	this.time = time;
	this.element;
	this.id = id;
	
	this.renderProperty= function(output){
		var obsel_str = JSON.stringify(this.src_obsel);
		
		$.get("index.php?page=Property&id=1&obsel="+encodeURIComponent(obsel_str),function(data){
			
			$(output).append(data);
			//$(".trace_property").find("code").tooltip();
		});
	};
	
	this.clear = function(){
		var id =  this.element.getAttribute("data-id") || this.element.dataset["id"];
		// remove dom element
		this.element.parentNode.removeChild(this.element);
		// remove dataset
		delete tAssistance.data[id];
	}
	
	// create element
	//dom_obsel = new tAssistance.dom.obsel(parent,this, rules);
		
	var color = '#'+Math.floor(Math.random()*16777215).toString(16);
	var y = tAssistance.svg.lines["line0"],
	r = 8;
	
	var base = {
		"x": obsel.x, "y": y, "color": color, "r": '10'
	}
	
	
	element = tAssistance.makeObsel(this.src_obsel, base.x);
	if(element===false) return false;
	element.setAttribute("data-id",id);
	parent.appendChild(element);
	
	var obsel = this;
	// add the event
	$(element).click(function(e){
		var obsel_in_html = obsel.renderProperty("#controlPanel");
	});
	
	// save the bi-references
	this.element = element;
	tAssistance.data[id] = this;
	
};