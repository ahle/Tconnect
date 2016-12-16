tModel.Trans = function(){
	
	
};

tModel.GroupingNavigationButtons = function(obsels){
	var new_obsels = [];
	var stack = [];
	
	for(var i in obsels){
		var obsel = obsels[i];
		if(obsel.action == "L" || obsel.action == "R" || obsel.action == "U" || obsel.action == "D"){
			stack.push(obsel);
			
		}
		else {
			if(stack.length>0)
				new_obsels.push({
					"begin": stack[0].begin,
					"end": stack[0].end,
					"action": "Nav"
				});
		
			new_obsels.push(obsel);
		}
	}
	
	if(stack.length>0)
		new_obsels.push({
			"begin": stack[0].begin,
			"end": stack[0].end,
			"action": "Nav"
	});
		
	return new_obsels;
};