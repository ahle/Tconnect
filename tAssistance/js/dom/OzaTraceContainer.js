tAssistance.dom.OzaTraceContainer = function(){
		
	var container = document.createElement("div");
	container.setAttribute("class","panel-default panel");
	container.setAttribute("style","background-color: white; display:inline-block; margin: 5px");
	
	var left = document.createElement("div");
	left.setAttribute("class","heading");
	left.setAttribute("style","float:left");
	
	var mid = document.createElement("div");
	mid.setAttribute("style","float:left");
	
	var top = document.createElement("div");
	mid.appendChild(top);
	
	var timeline = document.createElement("div");
	timeline.setAttribute("class","trace panel-default panel");
	timeline.setAttribute("style","margin: 5px");
	top.appendChild(timeline);
	
	var right = document.createElement("div");
	right.setAttribute("style","float:left");
	
	var end = document.createElement("div");
	end.setAttribute("style","clear:both");
		
	var zoom = document.createElement("div");
	zoom.setAttribute("class","zoom panel-default panel");
	zoom.setAttribute("style","margin: 5px");
	right.appendChild(zoom);
	
	var bottom = document.createElement("div");
	mid.appendChild(bottom);
	
	var obselList = document.createElement("div");
	obselList.setAttribute("class","obselList panel-default panel");
	obselList.setAttribute("style","margin: 5px; overflow-y:scroll; height: 500px");
	bottom.appendChild(obselList);
		
	container.appendChild(left);
	container.appendChild(mid);
	container.appendChild(right);
	container.appendChild(end);
	
	return container;
};