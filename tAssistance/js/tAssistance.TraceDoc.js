tAssistance.TraceDoc = function(trace){
	
	this.traceParent = document.getElementById("tracePanel");
	
	
	this.changeTrace = function(traceid){
		
		var traceParent = this.traceParent;
		var store = new tStore.OzaTStore();
		var trace = store.getTrace(traceid);
		
		traceParent.innerHTML = "";
		
		var combo = new tAssistance.ComboTrace(this, traceParent, trace);
		this.combo = combo;
	};
	var traceParent = this.traceParent;
	
	var combo = new tAssistance.ComboTrace(this, traceParent, trace);

	var obselsearch = new tAssistance.OzaObselSearch("hhhh", this, document.getElementById("searchPanel"), document.getElementById("resultPanel"), trace, combo);
	
	this.combo = combo;
	this.obselSearch = obselsearch;
};