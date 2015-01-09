tAssistance.dom.OzaGroup = function(id){
	var svgNS = "http://www.w3.org/2000/svg";
	var group = document.createElementNS(svgNS,"g");
	group.setAttribute("transform","translate(0 0) scale(1 1)");
	group.setAttribute("data-id",this.id);
	
	return group;
};