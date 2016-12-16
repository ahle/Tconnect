tMining = {};

tMining.ActionSimirality = function(trace, traces){
	
	
	
	
	
	
};

tMining.ActionFilter = function(obsels){
	
	
	
};

tMining.SortAZ = function(obsels){
	
	var new_obsels = [];
	
	function alphabe(a, b){
		var a_str = a.str;
		var b_str = b.str;
		
		if(a_str > b_str){
			return 1;			
		}
		else if(a_str < b_str){
			return -1;
		}
		else{
			return 0;
		}
	}
	
	new_obsels = obsels.sort(alphabe);
	
	return new_obsels;	
};

tMining.SortId = function(obsels){
	
	var new_obsels = [];
	
	function alphabe(a, b){
		var a_str = a.id;
		var b_str = b.id;
		
		if(a_str > b_str){
			return 1;			
		}
		else if(a_str < b_str){
			return -1;
		}
		else{
			return 0;
		}
	}
	
	new_obsels = obsels.sort(alphabe);
	
	return new_obsels;	
};

