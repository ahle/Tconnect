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
			var el = obsel.element;
			var x = el.getBBox().x;
			var y = el.getBBox().y;
			var w = el.getBBox().width;
			var h = el.getBBox().height;
			
			if(el.nodeName=="foreignObject"){
				el = el.firstChild;
				//x = el.x.baseVal.value;
				//y = el.y.baseVal.value;
				//w = el.width.baseVal.value;
				//h = el.height.baseVal.value;
			}
			
			var g = parent.element;
			
			//var rect = document.createElementNS('http:\/\/www.w3.org\/2000\/svg','rect');
			//rect.setAttributeNS(null,'data-id', this.id );
			//rect.setAttributeNS(null,'x', x );
			//rect.setAttributeNS(null,'y', y );
			//rect.setAttributeNS(null,'width', w );
			//rect.setAttributeNS(null,'height', h );
			//rect.setAttributeNS(null,'style', 'fill:blue;stroke:pink;stroke-width:5;fill-opacity:0.1;stroke-opacity:0.9' );
			
			//g.appendChild(rect);
			el.style.outline = '#f00 solid 2px';
			
			this.element = el;
			
			break;
		}
	}
	
	
	parent.marker = this;	
	
	parent.childs.push(this);
	
	tAssistance.data[this.id] = this;
	
	var parent = parent;
	
	this.clear = function(){
		if(this.element){
			//this.element.parentNode.removeChild(this.element);
			this.element.style.outline = "";
			//this.element = null;
			parent.marker = false;
		}
	}
};