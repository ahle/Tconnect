tAssistance.TraceSelector = function(id, element){
	
	
	
	btn.onclick = function(){
		var search = input.value;
		if(search==""){
			search="*";
		}
		
		$.get("index.php?widget=OzaTraceSearch?search="+encodeURIComponent(search),function(html){
			traces.innerHTML = html;
			//eval(js);
		});
	};
	// save reference
	tAssistance.data[element.id] = this;
	// methods
	this.search = function(){
		
	};
};