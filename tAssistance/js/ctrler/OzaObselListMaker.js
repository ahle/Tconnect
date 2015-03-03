tAssistance.OzaObselListMaker = function(params){
	var id = params.id;
	var obsels = params.obsels;
	
	//var obselList = new tAssistance.OzaObselList();
	var obselList = document.createElement("div");
		
	for(i=0;i<obsels.length;i++){
		src_obsel = obsels[i];
		var obsel_id = "txtObsel_"+(new Date()).getTime()+Math.floor((Math.random() * 1000) + 1);	 
		
		var params = {
			"id": obsel_id,
			"obsel": src_obsel
		};
		
		var obsel = new tAssistance.OzaTextObselMaker(params);
		obselList.appendChild(obsel);
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
	
	return obselList;
};