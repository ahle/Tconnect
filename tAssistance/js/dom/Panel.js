tAssistance.dom.PanelLayout = function(id){
	
	var panel = document.createElement("div");
	panel.setAttribute("class","panel panel-primary");
	panel.setAttribute("style","display:block");
	
	var panel_heading = document.createElement("div");
	panel_heading.setAttribute("class","panel-heading");
	panel_heading.setAttribute("style","padding: 0px; margin: 0px;");
	
	panel.appendChild(panel_heading);
		
	var panel_title = document.createElement("div");
	panel_title.setAttribute("class","panel-title");
	panel_title.setAttribute("style","padding: 5px; margin: 0px;  font-size: 14px");
	panel_title.innerHTML = "Condition Setting";
	
	panel_heading.appendChild(panel_title);
	
	var panel_body = document.createElement("div");
	panel_body.setAttribute("class","panel-body");
		
	panel.appendChild(panel_body);
	
	return panel;
};

tAssistance.dom.Panel = function(params){
	
	var title = params.title;
	
	var panel = document.createElement("div");
	panel.setAttribute("class","panel panel-default");
	panel.setAttribute("style","display:block");
	
	var panel_heading = document.createElement("div");
	panel_heading.setAttribute("class","panel-heading");
	panel_heading.setAttribute("style","padding: 0px;");
	
	panel.appendChild(panel_heading);
		
	var panel_title = document.createElement("div");
	panel_title.setAttribute("class","panel-title");
	panel_title.setAttribute("style","padding: 5px; margin: 0px;  font-size: 14px");
	$(panel_title).css("text-align","center");
	panel_title.innerHTML = title;
	
	panel_heading.appendChild(panel_title);
	
	var panel_body = document.createElement("div");
	panel_body.setAttribute("class","panel-body");
		
	panel.appendChild(panel_body);
	
	return panel;
};