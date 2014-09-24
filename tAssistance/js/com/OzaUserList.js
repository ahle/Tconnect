tAssistance.OzaUserList = function(id, element, users){
	this.id = id;
	this.marked = false;
	this.element = element;
	this.trace;
	this.childs = [];
	this.marker = false;
	
	for(i=0;i<obsels.length;i++){
		src_obsel = obsels[i];
		var obsel_id = "txtUser_"+(new Date()).getTime()+Math.floor((Math.random() * 1000) + 1);	 
		var obsel = new tAssistance.OzaUser(obsel_id, this,src_obsel);
	}
	
	this.markUser = function(src_obsel_id){
		if(this.marker){
			this.marker.clear();
		}
	};
};