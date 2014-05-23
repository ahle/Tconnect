tAssistance.OzaTraceSearch = function(element){
	input = element.querySelector("input[name='search']");
	btn = element.querySelector("button[name='btnsearch']");
	traces = element.querySelector("div[name='traces']");
		
	that = this;
	
	// add events to elements
	btn.onclick = function(){
		var search = input.value;
		that.search(search);
	};
	// save reference
	tAssistance.data[element.id] = this;
	// methods
	this.search = function(search){
		
		if(search==""){
			search="*";
		}
		
		$.get("index.php?widget=OzaTraceSearch&search="+encodeURIComponent(search),function(html){
			traces.innerHTML = html;
			//eval(js);
		});
		
		
	};
	
		
};