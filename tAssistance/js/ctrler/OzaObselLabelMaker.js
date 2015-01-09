tAssistance.OzaObselLabelMaker = function(group, x, minorTime, snap){
	var src_obsel = src_obsel;
	this.x = x;
	//this.time = time;
	//this.element;
	//this.id = id;
	
	var obselLabel = new tAssistance.OzaObselLabel(group, x, minorTime, snap);
	
	var obselLabelEl = tAssistance.dom.OzaObselLabel(x, minorTime, snap);
	
	obselLabel.element = obselLabelEl;
	
	
	
	if(obselLabelEl===false) return false;
	
	group.element.appendChild(obselLabelEl);
	group.childs.push(obselLabel);
	
};