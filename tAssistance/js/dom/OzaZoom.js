// zoom with close buttion
tAssistance.dom.OzaZoom = function(id, close_fn){
	
	var zoom = document.createElement("div");
	zoom.setAttribute("style","width: 30px; margin: 5px;");
	zoom.setAttribute("class","zoom");
	//zoom.setAttribute("id", id);
	
	//zoom.appendChild(zoom);
	
	var zoom_out_btn = document.createElement("div");
	zoom_out_btn.setAttribute("class","zoom_out");	
	
	var slider = document.createElement("input");
	slider.setAttribute("id", id);
	slider.setAttribute("class","span3 slider");
	
	var zoom_in_btn = document.createElement("div");
	zoom_in_btn.setAttribute("class","zoom_in");
	
//	var close_btn = document.createElement("button");
//	close_btn.setAttribute("class","close");
//	close_btn.setAttribute("aria-hidden","true");
//	close_btn.innerHTML = "×";
//	close_btn.onclick = close_fn;
	
	zoom.appendChild(zoom_out_btn);
	zoom.appendChild(slider);
	zoom.appendChild(zoom_in_btn);
	//zoom.appendChild(close_btn);
	
	return zoom;
};