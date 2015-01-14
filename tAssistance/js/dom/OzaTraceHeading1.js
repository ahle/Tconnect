tAssistance.dom.OzaTraceHeading1 = function(trc_id, width, height){
	//this.width = width;
	//this.height = height;
	
	
	var heading = document.createElement("div");
	heading.setAttribute("class","panel-default panel");
	heading.setAttribute("style","background-color: #b2bac2");
	
	var trace_icon = document.createElement("img");
	trace_icon.setAttribute("src","img/trace.png");
	trace_icon.setAttribute("style","display: inline-block");
	trace_icon.setAttribute("height","14px");
	trace_icon.setAttribute("width","14px");
	
	var trace_id = document.createElement("a");
	trace_id.setAttribute("href","#");
	trace_id.innerHTML = "Trace ID: "+trc_id;
		
	var plus_btn = document.createElement("img");
	plus_btn.setAttribute("src","img/zoom_in.png");
	plus_btn.setAttribute("style","display: inline-block");
	plus_btn.setAttribute("height","14px");
	plus_btn.setAttribute("width","14px");
	
	var stats_text = document.createElement("a");
	stats_text.setAttribute("href","#");
	stats_text.innerHTML = "Charts";
	
	heading.appendChild(trace_icon);
	heading.appendChild(trace_id);
	heading.appendChild(plus_btn);
	
	return heading;
};