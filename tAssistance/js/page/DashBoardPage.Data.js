tAssistance.page.DashBoard.UpdateData = function(params){
	
	var ok = false;
	
	var docs = params.docs;
	var users = params.users;
	var all_doc = params.all_doc;
	var all_user = params.all_user;
	var name = params.name;
	
	var dashboard = tAssistance.data.DashboardConfigMaker(params);
	
	var userconfig = tAssistance.page.DashBoard.data.userconfig;
	
	var params = {
		"after_update_userconfig": function(params){
			var ok = params.ok;
			alert(ok);
		}
	};
	
	var store = new tAssistance.Store(params);
	store.updateUserConfig(userconfig);
};

tAssistance.page.DashBoard.ctler.UserConfigLoader = function(params){
	var user = params.user ? params.user : "alain";
	var onLoad = params.onLoad;
	
	
	var store = new tAssistance.Store({});	
	store.getUserById(user, function(data){
		
		var userconfig = data;
		
		tAssistance.page.DashBoard.data.userconfig = userconfig;
		
		var config = userconfig.configs[1];
		//var dashboards = config.dashboards;
		
		var params = {			
			"config": config
		};
		
		onLoad(params);
	});
	
};