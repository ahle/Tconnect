tAssistance.dom.OzaObselLabel = function(x, time, snap){
	
	var parts = tAssistance.Datetime.split(new Date(time));
	var dateText = parts["hh"]+":"+parts["ii"]+":"+parts["ss"]+" on "+parts["DD"]+" "+parts["dd"]+"/"+parts["MM"]+"/"+parts["yyyy"];
	
	if(snap >= 1000*60*60*24){
		dateText = parts["DD"]+" "+parts["dd"]+"/"+parts["MM"]+"/"+parts["yyyy"];
	}
	
	//var x = this.getX(time, timeoffset, xoffset, scale_x_time);
	
	var text = document.createElementNS(tAssistance.svg.svgNS,"text");
	text.setAttributeNS(null,"x", x);
	text.setAttributeNS(null,"y", 10);
	text.setAttributeNS(null,"class","minor");
	text.setAttributeNS(null,"font-family","arial");
	text.setAttributeNS(null,"font-size","10");
	text.setAttributeNS(null,"fill","blue");
	text.setAttributeNS(null,"style","text-anchor:middle;");
	text.textContent = dateText;
	
	//parent.element.appendChild(text);
	//parent.childs.push(this);
	
	return text;
};