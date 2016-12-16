tAssistance.dom.OzaTraceHeading1 = function(trace, width, height){
	//this.width = width;
	//this.height = height;
	
	
	//var header = document.createElement("details");
	//header.setAttribute("class","panel-default panel");
	//heading.setAttribute("style","background-color: #b2bac2");
	
	var header = more = tAssistance.dom.More();
    var title = more.querySelector(".title");
    var details = more.querySelector(".details");
	
	//var summary = document.createElement("summary");
	
	var trace_icon = document.createElement("img");
	trace_icon.setAttribute("src","img/trace.png");
	trace_icon.setAttribute("style","display: inline-block");
	trace_icon.setAttribute("height","14px");
	trace_icon.setAttribute("width","14px");
	
	var trace_id = document.createElement("a");
	trace_id.setAttribute("href","#");
	trace_id.innerHTML = "Trace ID: "+trace.id;
	
	title.appendChild(trace_icon);
	title.appendChild(trace_id);
	
	var type = tAssistance.dom.PropertyValueFormatter("Type",trace.properties.type);
	
	var document_id = tAssistance.dom.PropertyValueFormatter("Document ID",trace.properties.document_id);
	
	var document_title = tAssistance.dom.PropertyValueFormatter("Model",trace.properties.model);
	
	var title = tAssistance.dom.PropertyValueFormatter("Title",trace.properties.title);
	
	var numObsels = tAssistance.dom.PropertyValueFormatter("Number of Obsels",trace.stats.count);
	
    var properties = document.createElement("p");
         
    properties.innerHTML = 'properties';
    
    //var details = properties.querySelector("details");
       
    details.appendChild(type);
    details.appendChild(document_id);
    details.appendChild(document_title);
    details.appendChild(title);
    details.appendChild(numObsels);
	
	//header.appendChild(summary);	
    details.appendChild(properties);
	
	return header;
};