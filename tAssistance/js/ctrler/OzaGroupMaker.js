tAssistance.OzaGroupMaker = function(params){
	var group_id = params.group_id;
	var gTrace = params.gTrace;
	var trace = params.trace;
	var width = params.width;
	var zoom = params.zoom;
	var userconfig = params.userconfig;
	
	// make ozagroup
	var params = {
			id: group_id,
			parent: gTrace,
			trace: trace,
			width: width,
			zoom: zoom,
			userconfig: userconfig
	}
	
	var group = new tAssistance.OzaGroup(params);
	
	// make ozagroup element
	var groupEl = new tAssistance.dom.OzaGroup("abc");
	
	gTrace.element.appendChild(groupEl);
		
	group.element = groupEl;
	// return the results
	
	return group;
};