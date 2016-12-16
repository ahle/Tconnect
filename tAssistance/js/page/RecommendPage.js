tAssistance.RecommendPage = function(){
	
	var layout = tAssistance.page.T1.dom.Layout();
	
	var controls = tAssistance.dom.DateTime();
	
//	var selected = tAssistance.page.T1.ctler.ConfigPicker();
//	
//	var datefilter = tAssistance.page.T1.ctler.DateRangePicker();
//	
//	var params = {
//			"after_load": function(params){
//				
//				//params.panel = panel_body;
//								
//				var trace = tAssistance.page.T1.ctler.TraceSection(params);
//				
//				var chard = tAssistance.page.T1.ctler.PieChartSection(params);
//				
//				var bar = tAssistance.page.T1.ctler.BarChartSection(params);
//				
//				var bar = tAssistance.page.T1.ctler.StatsByDateSection(params);
//				
//			},
//			"page": tAssistance.page.T1
//		}
//		
//	var chart = tAssistance.page.T1.ctler.TraceMakerByDashBoard(params);
};

tAssistance.page.RecommendPage = {
	"model": {},
	"dom": {},
	"ctler": {},
	"data": {}
};

tAssistance.page.RecommendPage.ctler.TraceLoader = function(params){
	
	var success = params.success;
	var panel = params.panel;
	var user = params.user ? params.user : "alain";
	var page = params.page;
	
	var store = new tStore.OzaTStoreClient();
	var user_uri = store.getUserUri(user);
	
	var assistant_store = new tAssistance.Store();
	var userconfig_uri = assistant_store.getUserUri(user);
	
	
	
	var trace_uri = store.getTraceUri("t_all");
	
	//var trace_uri = "http://localhost/tconnect/project/Ozalid/TStore/api.php/traces?traceid=t_all";
	
	
	jQuery.when(
		jQuery.getJSON(trace_uri,function(data){
			var trace = data;
			
			// save the trace to the store
			var store = new tStore.OzaTStore();
			store.deleteTrace(trace.id);
			store.addTrace(trace);
			
			//tAssistance.page.T1.data.trace = trace;
			//tAssistance.page.T1.data.src_trace = trace;
			page.data.trace = trace;
			page.data.src_trace = trace;
		}),
		
		jQuery.getJSON(user_uri,function(data){
			var user = data;
			
			//tAssistance.page.T1.data.user = user;
			page.data.user = user;
		}),
		jQuery.getJSON(userconfig_uri,function(data){
			var userconfig = data;
			
			//tAssistance.page.T1.data.userconfig = userconfig;
			page.data.userconfig = userconfig;
		})
		
	).then(function(){
		//var page = page;
		
		var trace = page.data.trace;
		var user = page.data.user;
		var userconfig = page.data.userconfig;
				
		var params = {
			"id": "abc",
			//"trace": trace,
			//"page": page,
			//"userconfig": userconfig,			
			//"panel": panel
		}		
		
		success(params);
	});	
};


tAssistance.page.Recommend.ctler.UserSectionMaker = function(){
	
	var section = document.createElement("section");
	
	
	
	
};

tAssistance.page.T1.ctler.UpdateTrace = function(params){
	
	var begin = params.begin;
	var end = params.end;	
	var trace = params.trace;
	
	var params = {
		"trace": trace,
		"begin": begin,
		"end": end
	};
	
	var new_trace = tAssistance.page.T1.ctler.TraceMaker(params);
	
	console.log(new_trace);
	
	tAssistance.page.T1.data.trace = new_trace;
	
	var trace = tAssistance.page.T1.ctler.TraceSection();
	
	var chard = tAssistance.page.T1.ctler.PieChartSection();
	
	var bar = tAssistance.page.T1.ctler.BarChartSection();
	
	var time = tAssistance.page.T1.ctler.StatsByDateSection();	
	
};
