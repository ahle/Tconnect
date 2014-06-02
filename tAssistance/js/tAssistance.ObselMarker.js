tAssistance.ObselMarker = function(id, parent){
	this.id = id;
	this.parent = parent;
	this.obsel = obsel;
	this.src_obsel_id = parent.marked;
	this.type="marker";
	this.element = false;
	
	var src_obsel_id = this.src_obsel_id;
	
	// loop all childs of the group
	for(i=0;i<parent.childs.length;i++){
		var child = parent.childs[i];
		if(child.type!='obsel') continue;
		var obsel = child;
		if(obsel.src_obsel.id == src_obsel_id){
			
			var x = obsel.element.getBBox().x;
			var y = obsel.element.getBBox().y;
			
			var g = parent.element;
			
			var rect = document.createElementNS('http:\/\/www.w3.org\/2000\/svg','rect');
			rect.setAttributeNS(null,'data-id', this.id );
			rect.setAttributeNS(null,'x', x );
			rect.setAttributeNS(null,'y', y );
			rect.setAttributeNS(null,'width', '20' );
			rect.setAttributeNS(null,'height', '20' );
			rect.setAttributeNS(null,'style', 'fill:blue;stroke:pink;stroke-width:5;fill-opacity:0.1;stroke-opacity:0.9' );
			
			g.appendChild(rect);
			
			this.element = rect;
			
			break;
		}
	}
	
	
	parent.marker = this;	
	
	parent.childs.push(this);
	
	tAssistance.data[this.id] = this;
	
	var parent = parent;
	
	this.clear = function(){
		if(this.element){
			this.element.parentNode.removeChild(this.element);
			this.element = null;
			parent.marker = false;
		}
	}
};