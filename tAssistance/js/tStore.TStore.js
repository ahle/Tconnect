tStore.TStore = function(){
	
	this.getTraceByDateRange = function(src_trace, dates){
		var start = dates["start"] || 0;
		var end = dates["end"] || 9999999999999;
		
		var src_obsels = src_trace.obsels;
		var obsels = [];
		
		for(var i=0;i<src_obsels.length;i++){
			var obsel = src_obsels[i];
			if(obsel.begin>=start && obsel.end<=end){
				obsels.push(obsel);
			}
		}
		var id = "t"+(new Date()).getTime();
		
		var trace = {
			"id": id,
			"obsels": obsels
		}
		
		return trace;
	};
};