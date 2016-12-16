tAssistance.Store = function(params){
	if(params && params.after_update_userconfig){
		this.after_update_userconfig = params.after_update_userconfig;
	}
	
	//this.db = "http://dsi-liris-silex.univ-lyon1.fr/ozalid/tconnect/tAssistance/api.php/";// use this line for git
	this.db = "http://localhost/tconnect/tAssistance/api.php/";// use this line for local dev
	
	this.getUserById = function(user_id, callback){
		var url = this.db+"users?userid="+user_id;
		$.getJSON( url, function( user ) {
			callback(user);
		});
	};
	
	this.addUser = function(user){
		
		
		
	};
	
	this.updateUserConfig = function(user){
		var url = this.db+"users?o=config";
		var after_update_userconfig = this.after_update_userconfig;
		
		
		$.ajax({
			  type: "PUT",
			  url: url,
			  data: JSON.stringify(user)
			})
			  .done(function( msg ) {
				  var params = {
						  "ok": true
				  };
				  if(after_update_userconfig){
					  after_update_userconfig(params);
				  }
			  });
		
	};
	
	this.getUserUri = function(user_id){
		var url = this.db+"users?userid="+user_id;
		return url;
	};
	
};