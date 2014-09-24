tAssistance.OzaTraceSearch = function(id, element){
	
	var trace_search = document.createElement("div");
	trace_search.setAttribute("id","ozatracelist-trace");
	trace_search.setAttribute("class","panel");
	
	var form = document.createElement("div");
	form.setAttribute("class","form-inline");
	form.setAttribute("style","border: 1px #F0F0F0 solid; border-radius: 3px; padding: 3px");
	form.setAttribute("width","14px");
		
	trace_search.appendChild(form);
	
	var form_group =  document.createElement("div");
	form_group.setAttribute("class","form-group");
		
	form.appendChild(form_group);
	
	var search_txt = document.createElement("input");
	search_txt.setAttribute("class","form-control");
	search_txt.setAttribute("name","search");
	search_txt.setAttribute("type","text");
	search_txt.setAttribute("placeholder","Tous les traces");
	
	form_group.appendChild(search_txt);
	
	var btn = document.createElement("button");
	btn.setAttribute("class","btn");
	btn.setAttribute("type","button");
	btn.innerHTML = "Rechercher";
		
	form.appendChild(btn);
	
	element.appendChild(trace_search);
	
	//input = element.querySelector("input[name='search']");
	//btn = element.querySelector("button[name='btnsearch']");
	//traces = element.querySelector("div[name='traces']");
		
	//that = this;
	
	// add events to elements
	//btn.onclick = function(){
	//	var search = input.value;
	//	that.search(search);
	//};
	// save reference
	//tAssistance.data[element.id] = this;
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
	
//	$.get("index.php?widget=OzaTraceList",function(widget){
//		parts = widget.split("<script>");
//		html = parts[0];
//		js = parts[1].split("<\/script>")[0];
//		
//		traces.innerHTML = html;
//		eval(js);
//	});
	
};