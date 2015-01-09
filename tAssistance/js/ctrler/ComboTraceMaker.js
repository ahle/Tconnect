tAssistance.ComboTraceMaker = function(parent, element, trace){
	
	var trace_id = "trace"+(new Date()).getTime()+Math.floor((Math.random() * 1000) + 1);
	var domTrace = new tAssistance.OzaTrace(trace_id, element, trace);
	this.trace = domTrace;
	
	var obselList_id = "obselList_"+(new Date()).getTime()+Math.floor((Math.random() * 1000) + 1);
	var obselList = new tAssistance.OzaObselList(obselList_id ,element, trace.obsels);
	this.obselList = obselList;
	
	domTrace.addObselList(obselList);
	
	this.parent = parent;
	this.element = element;
	
	this.clear = function(){
		// clear the dom elements
		this.trace.element.parentNode.removeChild(this.trace.element);
		this.obselList.element.parentNode.removeChild(this.obselList.element);
	};
	
};