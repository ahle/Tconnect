
tStore = {};
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
	}
};

tStore.Trace = function(){
	this.id;
	this.obsels;
}

tStore.Obsel = function(){
	this.id;
	this.begin;
	this.end;	
}

tStore.LocalTStore = function(){
	
	// init if no exists
	if(localStorage["tStore.traces"]===undefined){
		localStorage["tStore.traces"] = "[]";
	}
	
	this.addTrace = function(trace){
		var json = localStorage["tStore.traces"];
		var traces = JSON.parse(json);
		
		traces.push(trace);
		
		json = JSON.stringify(traces);
		
		localStorage["tStore.traces"] = json;
	}
	
	this.getTrace = function(traceid){
		var json = localStorage["tStore.traces"];
		var traces = JSON.parse(json);
				
		for(i=0;i<traces.length;i++){
			trace = traces[i];
			if(trace.id == traceid){
				return trace;
			}
		}
		
		return null;
	}
	
}