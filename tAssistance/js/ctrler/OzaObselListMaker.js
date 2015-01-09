tAssistance.OzaObselListMaker = function(id, parentNode, obsels){
	
	var obselList = new tAssistance.OzaObselList();
	
	
	
	for(i=0;i<obsels.length;i++){
		src_obsel = obsels[i];
		var obsel_id = "txtObsel_"+(new Date()).getTime()+Math.floor((Math.random() * 1000) + 1);	 
		var obsel = new tAssistance.OzaTextObselMaker(obsel_id, parentNode,src_obsel);
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