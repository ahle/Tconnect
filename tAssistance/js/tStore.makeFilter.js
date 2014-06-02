tStore.makeFilter = function(new_trace, new_obsel){
	var search = new_trace.search;
	var min = new_trace.fromDate;
	var max = new_trace.toDate;
	
	var time_ok = false;
	var search_ok = false;
	
	if(min && max){
		time_ok = new_obsel.begin <= max && new_obsel.end >= min;
	}
	else if(min){
		time_ok = new_obsel.end >= min;
	}
	else if(max){
		time_ok = new_obsel.begin <= max;
	}
	else{
		time_ok = true;
	}
	
	if(search=="*"){
		search_ok = true;
	}
	else if (new_obsel.info_before){
		search_ok =  new_obsel.info_before.toLowerCase().indexOf(search.toLowerCase()) >=0;
	}
	else if (new_obsel.info_after){
		search_ok =  new_obsel.info_after.toLowerCase().indexOf(search.toLowerCase()) >=0;
	}
	else if (new_obsel.type){
		search_ok =  new_obsel.type.toLowerCase().indexOf(search.toLowerCase()) >=0;
	}
	
	if( time_ok && search_ok){
		new_trace.obsels.push(new_obsel);
	}
};
