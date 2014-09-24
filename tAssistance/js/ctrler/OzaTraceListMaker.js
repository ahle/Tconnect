tAssistance.OzaTraceListMaker = function(id, element, s_traces){
	this.element = element;
	
	for(i=0; i<s_traces.length;i++){
		var s_trace = s_traces[i];
		var m_trace = s_trace;
		var assistant = new tAssistance.OzaAssistantClient();
		m_trace.as_trace_uri = assistant.getTraceUri(m_trace.uri);
				
		var row = new tAssistance.OzaTraceRow("abd", this, s_trace);
	}
	
};