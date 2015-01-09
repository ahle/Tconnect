tAssistance.OzaImageObsel = function(obsel){
	//this.element = element;
	this.src_obsel = obsel;
	//this.id = id;
	this.marked = false;
	this.type = "obsel";
	
	// remove the obsel from the list
	this.clear = function(){
		this.element.parentNode.removeChild(this.element);
	};
	
	
};