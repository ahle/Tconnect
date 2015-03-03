tAssistance.Popup = function(){
	
	this.close = function(){
		// remove dom element
		this.el.parentNode.removeChild(this.el);		
	}
	
};