tAssistance.dom.OzaTraceHeading = function(width, height){
	this.width = width;
	this.height = height;
	
	var heading = document.createElement("div");
	heading.setAttribute("class","panel-heading");
	
	var trace_icon = document.createElement("img");
	trace_icon.setAttribute("src","img/trace.png");
	trace_icon.setAttribute("height","14px");
	trace_icon.setAttribute("width","14px");
	
	var trace_id = document.createElement("a");
	trace_id.setAttribute("href","#");
	trace_id.innerHTML = "Trace ID: 123456";
	
	var user_icon = document.createElement("span");
	user_icon.setAttribute("class","glyphicon glyphicon-user");
	
	var user_id = document.createElement("a");
	user_id.setAttribute("href","#");
	user_id.innerHTML = "User ID: Hoang";
	
	var doc_icon = document.createElement("span");
	doc_icon.setAttribute("class","glyphicon glyphicon-file");
	
	var doc_id = document.createElement("a");
	doc_id.setAttribute("href","#");
	doc_id.innerHTML = "Doc ID: Hoang";
	
	var graph_icon = document.createElement("img");
	graph_icon.setAttribute("src","img/text-graph.png");
	graph_icon.setAttribute("height","14px");
	graph_icon.setAttribute("width","14px");
	
	var graph_text = document.createElement("a");
	graph_text.setAttribute("href","#");
	graph_text.innerHTML = "Graph";
	
	var stats_icon = document.createElement("span");
	stats_icon.setAttribute("class","glyphicon glyphicon-stats");
	
	var stats_text = document.createElement("a");
	stats_text.setAttribute("href","#");
	stats_text.innerHTML = "Charts";
	
	heading.appendChild(trace_icon);
	heading.appendChild(trace_id);
	heading.appendChild(user_icon);
	heading.appendChild(user_id);
	heading.appendChild(doc_icon);
	heading.appendChild(doc_id);
	heading.appendChild(graph_icon);
	heading.appendChild(graph_text);
	heading.appendChild(stats_icon);
	heading.appendChild(stats_text);	
	
	return heading;
};