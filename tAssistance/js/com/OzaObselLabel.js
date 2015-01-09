tAssistance.OzaObselLabel = function(parent, x, time, snap){
	this.type = "label";
	this.parent = parent;
	this.x = x;
	this.time = time;
	this.snap = snap;
	
	this.clear = function(){
		this.element.parentNode.removeChild(this.element);
	};

};