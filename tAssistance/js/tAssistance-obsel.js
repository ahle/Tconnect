tAssistance.obsel = function(parent,x,time,src_obsel, rules){
	this.src_obsel = src_obsel;
	this.x = x;
	this.time = time;
	this.element;
	
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
	
	// create dom obsel
	dom_obsel = new tAssistance.dom.obsel(parent,this, rules);
};