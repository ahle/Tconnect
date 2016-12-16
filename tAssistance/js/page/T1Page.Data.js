tAssistance.page.T1.ctler.TraceMaker = function(params){
	var trace = params.trace;	
	var begin = params.begin;
	var end = params.end;
	var obsels = trace.obsels;
	
	var new_obsels = [];
	
	for(var i in obsels){
		var obsel = obsels[i];
		if(begin && end){
			if(obsel.begin > begin && obsel.begin < end){
				new_obsels.push(obsel);
			}			
		}
		else if(begin){
			if(obsel.begin > begin){
				new_obsels.push(obsel);
			}
		}
		else if(end){
			if(obsel.begin < end){
				new_obsels.push(obsel);
			}
		}
		else{
			new_obsels.push(obsel);
		}
	}
	
	var new_trace = {};
	new_trace.obsels = new_obsels;
	
	return new_trace;
};

tAssistance.page.T1.ctler.TraceMakerByDashBoard = function(params){
		
	var after_load = params.after_load;
	var panel = params.panel;
	var user = params.user ? params.user : "alain";
	var page = params.page;
	
	var store = new tStore.OzaTStoreClient();
	var user_uri = store.getUserUri(user);
	
	var assistant_store = new tAssistance.Store();
	var userconfig_uri = assistant_store.getUserUri(user);
	
	var then_userconfig =  function(after_load){
		return function(){
			
			var userconfig = tAssistance.page.T1.data.userconfig;
			
			var handler = new tAssistance.handler.UserConfig({userconfig: userconfig});
			
			var config = handler.findConfig("dashboard");		
			
			var dashboardid = config.selected;
			
			var dashboard = handler.getDashBoard(dashboardid);
			
			var userids = handler.getUserIds(dashboard);
			
			var docids = handler.getDocIds(dashboard);
			
			var params = {
				"docids": docids,
				"userids": userids
			};
			
			var store = new tStore.OzaTStoreClient();
			var trace_uri = store.getCustomTrace(params);
			
			var then_trace = function(after_load){
				return function(){
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
					
					after_load(params);
				};
			}(after_load);
			
			//var page = page;
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
			})
			).then(then_trace);
		}
	}(after_load);
		
	jQuery.when(
				
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
		
	).then(then_userconfig);
};
