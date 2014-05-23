tAssistance.load = function(options){
	var trace_uri = options.trace_uri;
	var fnSuccess = options.success;
	
	function parse_trace_uri(trace_uri){
		var str = trace_uri;
		lastChar = str.substr(str.length-1);
		if(lastChar == "/"){
			str = str.substr(0,str.length-1);
		}
		//console.log("***");
		lastIndexOfSlash = str.lastIndexOf("/");
		if(lastIndexOfSlash!=-1)
		base_uri = str.substr(0,lastIndexOfSlash+1);
		trace_name = str.substr(lastIndexOfSlash+1,str.length);
		
		ret = {
				"base_uri": base_uri,
				"trace_name": trace_name
		}
		return ret;
	}
	
	function parse_base_uri(base_uri){
		var str = base_uri;
		lastChar = str.substr(str.length-1);
		if(lastChar == "/"){
			str = str.substr(0,str.length-1);
		}
		//console.log("***");
		lastIndexOfSlash = str.lastIndexOf("/");
		if(lastIndexOfSlash!=-1)
		root_uri = str.substr(0,lastIndexOfSlash+1);
		base_name = str.substr(lastIndexOfSlash+1,str.length);
		
		ret = {
				"root_uri": root_uri,
				"base_name": base_name
		}
		return ret;
	}
	
//	var url = trace_uri+"@obsels.json";
//	jQuery.getJSON(url,function(data){
//		var id = "t"+(new Date()).getTime();
//		
//		trace = {
//			"id": id,
//			"obsels": data["obsels"]				
//		}
//		
//		localstore = new tStore.LocalTStore();
//		localstore.addTrace(trace);
//		
//		domTrace = new tAssistance.domTrace(document.getElementById("tracePanel"),trace);
//		//domTrace1 = new tAssistance.domTraceLinear(document.getElementById("tracePanel"),trace);
//	});
	
	var url = trace_uri;
	jQuery.getJSON(url,function(data){
		//var id = "t"+(new Date()).getTime();
		//
		//trace = {
		//	"id": id,
		//	"obsels": data["obsels"]			
		//}
		
		trace = data;
		
		localstore = new tStore.LocalTStore();
		localstore.addTrace(trace);
		
		domTrace = new tAssistance.domTrace(document.getElementById("tracePanel"),trace);
		//domTrace1 = new tAssistance.domTraceLinear(document.getElementById("tracePanel"),trace);
	});
	
	
};