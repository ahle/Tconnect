tAssistance.TextObselMarker = function(id, parent){
	this.id = id;
	this.type = "marker";
	this.src_obsel_id = parent.marked;
	//this.obsel = obsel;
	this.element = false;
	this.parent = parent;
	
	var src_obsel_id = parent.marked;
		
	for(i=0;i<parent.childs.length;i++){
		var child = parent.childs[i];
		if(child.type!="obsel") continue;
		var obsel = child;
		if(obsel.src_obsel.id == src_obsel_id){
			this.element = obsel.element;
			this.element.setAttribute("class", "textobsel selected");
			
			break;
		}
	}
		
	parent.marker = this;
	
	this.clear = function(){
		// remove the element effect
		this.element.setAttribute("class", "textobsel");
		this.parent.marked = false;
	}
};