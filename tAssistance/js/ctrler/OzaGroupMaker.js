tAssistance.OzaGroupMaker = function(group_id, gTrace, trace, width, zoom){
		
	// make ozagroup
	var group = new tAssistance.OzaGroup(group_id, gTrace, trace, width, zoom);
	
	// make ozagroup element
	var groupEl = new tAssistance.dom.OzaGroup("abc");
	
	gTrace.element.appendChild(groupEl);
	
	
	group.element = groupEl;
	// return the results
	
	return group;
};