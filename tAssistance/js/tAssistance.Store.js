tAssistance.Store = function(){
	// assist server
	
	this.db = "http://dsi-liris-silex.univ-lyon1.fr/ozalid/tconnect/tAssistance/api.php/";
	//this.db = "http://localhost/tconnect/tAssistance/api.php/";
	
	this.getUserById = function(user_id, callback){
		var url = this.db+"users?userid="+user_id;
		$.getJSON( url, function( user ) {
			callback(user);
		});
	};
	
	this.addUser = function(user){
		
		
		
	};
	
	this.updatePFilter = function(user_id, velement_id, pfilter_id, updates){
		var url = this.db+"users?o=pfilter&userid="+user_id+"&velement_id="+velement_id+"&pfilter_id="+pfilter_id;
		//var updates = { "property": prop_name, "value": value };
		
		 $.ajax({
			  type: "PUT",
			  url: url,
			  data: JSON.stringify(updates)
			})
			  .done(function( msg ) {
				console.log( "The updates are posted!");			    
			  });
		
	};
	
	this.getFilter = function(user_id, velement_id, callback){
		var url = this.db+"users?o=filter&userid="+user_id+"&velement_id="+velement_id;
		$.getJSON( url, function(filter) {
			 callback(filter);
		});
	};
	
	this.replacePFilter = function(user_id, velement_id, pfilter_id, pfilter){
		var url = this.db+"users?o=pfilter&userid="+user_id+"&velement_id="+velement_id+"&pfilter_id="+pfilter_id+"&type=replace";
		var pfilter = pfilter;
		
		 $.ajax({
			  type: "PUT",
			  url: url,
			  data: JSON.stringify(pfilter)
			})
			  .done(function( msg ) {
				console.log( "The updates are posted!");			    
			  });
	};
	
	
	
};