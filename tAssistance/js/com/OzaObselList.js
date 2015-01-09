tAssistance.OzaObselList = function(id, element, obsels){
	this.id = id;
	this.marked = false;
	this.element = element;
	this.trace;
	this.childs = [];
	this.marker = false;
	
	this.markObsel = function(src_obsel_id){
		if(this.marker){
			this.marker.clear();
		}
		
		this.marked = src_obsel_id;
		var marker_id = "marker"+(new Date()).getTime()+Math.floor((Math.random() * 1000) + 1);	
		var marker = new tAssistance.TextObselMarker(marker_id, this);
	};
	
	this.unmarkObsel = function(){
		
	};
};