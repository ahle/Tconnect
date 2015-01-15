tAssistance.UserConfigPage = function(user_id){
	
	//var test1 = document.getElementById("test1");
	
	var store = new tAssistance.Store();
	store.getUserById("alain", function(data){
		
		var user = data;
				
		var widget = new tAssistance.UserConfigMaker(user);
		
	});
	
};