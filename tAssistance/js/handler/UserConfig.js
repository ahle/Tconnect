tAssistance.data.UserConfig = {
	"ctler": {},
	"model": {}
};

tAssistance.data.DashboardConfigMaker = function(params){
	var id = params.id;
	var docs = params.docs;
	var users = params.users;
	var all_doc = params.all_doc;
	var all_user = params.all_user;
	var id = params.id;
	
	var new_users = [];
	
	for(var i in users){
		
		var user = {
			"class": "item",
			"type": "user",
			"title": users[i],
			"id": users[i]
		}
		new_users.push(user);		
	};	
	

	var new_docs = [];
	
	for(var i in docs){
		var doc = docs[i];
		
		var doc = {
			"class": "item",
			"type": "doc",
			"title": doc[1],
			"id": doc[0]
		}
		new_docs.push(doc);		
	};	
	
	if(all_doc){
		new_docs = true;
	}
	if(all_user){
		new_users = true;
	}
	
	
	var dashboard = {
		"type": "dashboard",
		"id": id,
		"creationDate": new Date(),
		"lastUsedDate": new Date(),
		"params": {
			"docs": new_docs,
			"users": new_users
		}
	}
	
	return dashboard;
};

tAssistance.handler.UserConfig = function(params){
	this.userconfig = params.userconfig;
	
	this.appendDashBoard = function(dashboard){
		var userconfig = this.userconfig;
		var dashboard_config = userconfig.configs[1];
		var dashboards = dashboard_config.dashboards;
		
		dashboards.push(dashboard);
	};
	
	this.data = function(){
		return this.userconfig;
	};
	
	this.getUserIds = function(dashboard){
		var users = dashboard.params.users;
		var userids = [];
		
		for(var i in users){
			
			var userid = users[i].id;
			userids.push(userid);
		}
		
		return userids;
	};
	
	this.findConfig = function(config_id){
		var userconfig = this.userconfig;
		var configs = userconfig.configs;
		for(var i in configs){
			var config = configs[i];
			if(config_id == config.id) 
				return config;			
		}
		return false;
	};
	
	this.getDocIds=function(dashboard){
		var docs = dashboard.params.docs;
		var docids = [];
		
		for(var i in docs){
			
			var docid = docs[i].id;
			docids.push(docid);
		}
		
		return docids;
	};
	
	this.getDashBoard = function(id){
		var userconfig = this.userconfig;
		var dashboards = userconfig.configs[1].dashboards;
		
		for(var i in dashboards){
			
			var dashboard = dashboards[i];
			if(id==dashboard.id)
				return dashboard;
		}
	};
};