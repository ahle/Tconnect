tAssistance.data.Obsels = function(obsels){
	this.obsels = obsels;
	this.obsel_type = "type";
	
	this.listTypes = function(){
		var obsel_types = [];
		for ( var i = 0; i < obsels.length; i++) {
			var obsel = obsels[i];
			if (obsel_types.indexOf(obsel[tAssistance.obsel.type]) == -1) {
				obsel_types.push(obsel[tAssistance.obsel.type]);
			}
		}
		return obsel_types;
	};
	
	
};