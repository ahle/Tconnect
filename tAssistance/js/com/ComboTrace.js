tAssistance.ComboTrace = function(parent, element, trace){	
	this.trace = trace;	
	this.obselList = obselList;		
	this.parent = parent;
	this.element = element;
	
	this.clear = function(){
		// clear the dom elements
		this.trace.element.parentNode.removeChild(this.trace.element);
		this.obselList.element.parentNode.removeChild(this.obselList.element);
	};
	
};