//tAssistance.message = {
//	obsel: function(event_data){
//		var user_id = event_data.user_id;
//		var base_uri = event_data.base_uri;
//		var trace_id = event_data.trace_id;
//		
//		console.log("a message type=obsel is received !");
//		var mgr = new tService.TraceManager({
//			base_uri: base_uri,
//			async: true
//		});
//		var trc = mgr.init_trace({
//			name: trace_id
//		});
//		trc.get_obsels({
//			nocache: true,
//			success: function(obsels){
//				console.log(obsels.length);
//				tAssistance.obsels.setLocalObsels(obsels);
//				var g = document.querySelector("g");
//				tAssistance.svg.group.update(g);
//			}
//		});
//	},
//	trace: function(event_data){
//		var user_id = event_data.user_id;
//		var base_uri = event_data.base_uri;
//		var trace_id = event_data.trace_id;
//		
//		console.log("a message type=trace is received !");
//		var params = {
//			"user_id": user_id,
//			"base_uri": base_uri,
//			"trace_id": trace_id,
//		}
//		tAssistance.http.customReq("index.php?page=TraceView",params, "post");
//		
//	},			
//};

tAssistance.messages = {
	"select_a_model": "Select a model",
	"select_an_obsel": "Select an obsel",
	"select_a_property": "Select a property",
	"select_a_constraint": "Select a contraint",
	"show_more": "More",
	"contain": " Contain ",
		
		
};