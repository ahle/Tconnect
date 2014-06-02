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
		
		$.get("index.php?widget=OzaTraceList&search="+encodeURIComponent(search),function(widget){
			traces = element.querySelector("div[name='traces']");
			
			parts = widget.split("<script>");
			html = parts[0];
			js = parts[1].split("<\/script>")[0];
			
			traces.innerHTML = html;
			eval(js);
		});
		
		
	};
	
	$.get("index.php?widget=OzaTraceList",function(widget){
		parts = widget.split("<script>");
		html = parts[0];
		js = parts[1].split("<\/script>")[0];
		
		traces.innerHTML = html;
		eval(js);
	});
	
};