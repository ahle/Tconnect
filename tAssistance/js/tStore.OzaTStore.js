tStore.OzaTStore = function(){
	
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
		
		return true;
	};
	
	this.deleteTrace = function(trace_id){
		var json = localStorage["tStore.traces"];
		var traces = JSON.parse(json);
		
		var index = false;
		for(i=0;i<traces.length;i++){
			trace = traces[i];
			if(trace.id == trace_id){
				index = i;
				break;
			}
		}
		
		if(index===false) return false;
		traces.splice(index,1);
		
		json = JSON.stringify(traces);
		
		localStorage["tStore.traces"] = json;
		
		return true;
	};
	
	this.getTrace = function(traceid){
		var json = localStorage["tStore.traces"];
		var traces = JSON.parse(json);
				
		for(i=0;i<traces.length;i++){
			trace = traces[i];
			if(trace.id == traceid){
				return trace;
			}
		}
		
		return false;
	};

	this.createTrace = function(traceid, from, to, search){
		var trace = this.getTrace(traceid);
		
		var id = "t"+(new Date()).getTime()+Math.floor((Math.random() * 1000) + 1);
		var new_trace = new tStore.Trace();
		new_trace.id = id;
		new_trace.type = "TransformedTrace";
		new_trace.source = trace;
		new_trace.fromDate = from;
		new_trace.toDate = to;
		new_trace.search = search;
		new_trace.fnTransform = "";
		new_trace.obsels = [];
		
		for(i=0;i<trace.obsels.length;i++){
			var obsel = trace.obsels[i];
			var fn = new tStore.makeFilter(new_trace, obsel);
		}
		
		this.addTrace(new_trace);
		return new_trace;
	};
	
	this.getTraces = function(){
		var json = localStorage["tStore.traces"];
		var traces = JSON.parse(json);
		return traces;
	};
	
	this.existTrace = function(trace_id){
		
	};

	this.getUser = function(){
		var json = localStorage["tStore.user"];
		var user = JSON.parse(json);
		
		return user;
	};

	






};