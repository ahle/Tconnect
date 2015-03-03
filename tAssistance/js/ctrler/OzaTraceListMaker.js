tAssistance.OzaTraceListMaker = function(params){
	
	
	var list = document.createElement("div");
		
	for(i=0; i<traces.length;i++){
		var s_trace = traces[i];
		var m_trace = s_trace;
		var assistant = new tAssistance.OzaAssistantClient();
		m_trace.as_trace_uri = assistant.getTraceUri(m_trace.uri);
		
		var params = {
			"id": "abd",
			"trace": s_trace
		};
		
		var row = new tAssistance.dom.OzaTraceRow(params);
		
		list.appendChild(row);
	}
	return list;
};

tAssistance.OzaTraceListByDocMaker = function(params){
	var id = params.id;
	var traces = params.traces;
	var list = document.createElement("div");
	
	var groups = {};
	
	// group by doc
	
	function isNew(doc_id, groups){
		for(var id in groups){
			if(groups.hasOwnProperty(id)){
				if(doc_id==id)
					return false;
			}
		}
		return true;
	}
		
	for(i=0; i<traces.length;i++){
		
		var trace = traces[i];		
		if(!(trace.properties.type=="UserDoc"||trace.properties.type=="Doc")) continue;
		
		var doc_id = trace.properties.document_id;
		var group = null;
		if(isNew(doc_id, groups)){
			groups[doc_id] = {
				"doc": {
					"title": trace.properties.document_title,
					"id": doc_id
				},
				"trace": null,
				"traces": []
			};			
		}
		group = groups[doc_id];
		
		if(trace.properties.type=="Doc"){
			group.trace = trace;
		}
		else if (trace.properties.type=="UserDoc"){
			group.traces.push(trace);
		}		
	}
	
	for(var doc_id in groups){
		var group = groups[doc_id];
		
		var params = group;
			
		var group_el = new tAssistance.OzaDocTraceGroupMaker(params);
		
		list.appendChild(group_el);	
	}	
	
	return list;
};

tAssistance.OzaDocTraceGroupMaker = function(params){
	var traces = params.traces;
	var trace = params.trace;
	var doc = params.doc;
	
	var layout = new tAssistance.dom.GroupLayout();
	
	var heading_place = layout.querySelector(".group-heading");
	var items_place = layout.querySelector(".group-items");
	
	if(trace){	
		var assistant = new tAssistance.OzaAssistantClient();
		trace.as_trace_uri = assistant.getTraceUri(trace.uri);	
	}
	
	var params = {
		"id": "aa",
		"doc": doc,
		"trace": trace
	}
	
	var doc = new tAssistance.dom.OzaDocTraceHeading(params);
	
	heading_place.appendChild(doc);
	
	for(var i in traces){
		var trace = traces[i];
		
		var assistant = new tAssistance.OzaAssistantClient();
		trace.as_trace_uri = assistant.getTraceUri(trace.uri);
		
		var params = {
			"id": "ee",
			"trace": trace
		}		
		
		var trace_el = new tAssistance.dom.OzaUserTraceLink(params);
		
		items_place.appendChild(trace_el);
	}
	
	
	return layout;
};

tAssistance.OzaTraceListByUserMaker = function(params){
	var id = params.id;
	var traces = params.traces;
	var list = document.createElement("div");
	
	var groups = {};
	
	// group by doc
	
	function isNew(user_id, groups){
		for(var id in groups){
			if(groups.hasOwnProperty(id)){
				if(user_id==id)
					return false;
			}
		}
		return true;
	}
		
	for(i=0; i<traces.length;i++){
		
		var trace = traces[i];		
		if(!(trace.properties.type=="UserDoc"||trace.properties.type=="User")) continue;
		
		var user_id = trace.properties.userid;
		var group = null;
		if(isNew(user_id, groups)){
			groups[user_id] = {
				"user": {					
					"id": user_id
				},
				"trace": null,
				"traces": []
			};			
		}
		group = groups[user_id];
		
		if(trace.properties.type=="User"){
			group.trace = trace;
		}
		else if (trace.properties.type=="UserDoc"){
			group.traces.push(trace);
		}		
	}
	
	for(var user_id in groups){
		var group = groups[user_id];
		
		var params = group;
			
		var group_el = new tAssistance.OzaUserTraceGroupMaker(params);
		
		list.appendChild(group_el);	
	}	
	
	return list;
};

tAssistance.OzaUserTraceGroupMaker = function(params){
	
	var traces = params.traces;
	var trace = params.trace;
	var user = params.user;
	
	var layout = new tAssistance.dom.GroupLayout();
	
	var heading_place = layout.querySelector(".group-heading");
	var items_place = layout.querySelector(".group-items");
	
	if(trace){	
		var assistant = new tAssistance.OzaAssistantClient();
		trace.as_trace_uri = assistant.getTraceUri(trace.uri);	
	}
	
	var params = {
		"id": "aa",
		"user": user,
		"trace": trace
	}
	
	var heading = new tAssistance.dom.OzaUserTraceHeading(params);
	
	heading_place.appendChild(heading);
	
	for(var i in traces){
		var trace = traces[i];
		
		var assistant = new tAssistance.OzaAssistantClient();
		trace.as_trace_uri = assistant.getTraceUri(trace.uri);
		
		var params = {
			"id": "ee",
			"trace": trace
		}		
		
		var trace_el = new tAssistance.dom.OzaDocTraceLink(params);
		
		items_place.appendChild(trace_el);
	}
	
	
	return layout;
};