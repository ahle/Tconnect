tAssistance.OzaList = function(id, element, list){
	this.id = id;
	this.marked = false;
	this.element = element;
	this.trace;
	this.childs = [];
	this.marker = false;
	//element = document.getElementById(id);
	//traces = element.querySelector("div[name='obsels']");
	
	for(i=0;i<obsels.length;i++){
		src_obsel = obsels[i];
		var obsel_id = "txtObsel_"+(new Date()).getTime()+Math.floor((Math.random() * 1000) + 1);	 
		var obsel = new tAssistance.OzaTextObsel(obsel_id, this,src_obsel);
	}
	
	this.markObsel = function(src_obsel_id){
		if(this.marker){
			this.marker.clear();
		}
		
		this.marked = src_obsel_id;
		var marker_id = "marker"+(new Date()).getTime()+Math.floor((Math.random() * 1000) + 1);	
		var marker = new tAssistance.TextObselMarker(marker_id, this);
	};
	
	this.unmarkObsel = function(){
		//if(this.marked){
		//	this.marked.remove();
		//}
	};
};