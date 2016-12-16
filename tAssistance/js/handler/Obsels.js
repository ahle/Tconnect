tAssistance.handler.Obsels = function(obsels){
	this.obsels = obsels;
	this.obsel_type = "type";
	
	this.listTypes = function(){
		var obsel_types = [];
		for ( var i = 0; i < obsels.length; i++) {
			var obsel = obsels[i];
			if (obsel_types.indexOf(obsel[tAssistance.obsel.type]) == -1) {
				obsel_types.push(obsel[tAssistance.obsel.type]);
			}
		}
		return obsel_types;
	};
	
	this.listAttributs = function(){
		
		
		
		
		
		
	};
	
	this.groupByMonth = function(){
		
		var groups = {};
		var obsels = this.obsels;
				
		for(var i in obsels){
			
			var obsel = obsels[i];
			
			var date = new Date(obsel.begin);
			
			var month = moment(date).startOf("month").valueOf()+"";
			
			if(groups[month]){
				groups[month].push(obsel);
			}
			else{
				groups[month] = [obsel];				
			}
		}
		
		return groups;
	};
	
	this.groupByWeek = function(){
		
		var groups = {};
		var obsels = this.obsels;
				
		for(var i in obsels){
			
			var obsel = obsels[i];
			
			var date = new Date(obsel.begin);
			
			var week = moment(date).startOf("week").valueOf()+"";
			
			if(groups[week]){
				groups[week].push(obsel);
			}
			else{
				groups[week] = [obsel];				
			}
		}
		
		return groups;
	};
	
	this.groupByDay = function(){
		
		var groups = {};
		var obsels = this.obsels;
				
		for(var i in obsels){
			
			var obsel = obsels[i];
			
			var date = new Date(obsel.begin);
			
			var day = moment(date).startOf("day").valueOf()+"";
			
			if(groups[day]){
				groups[day].push(obsel);
			}
			else{
				groups[day] = [obsel];				
			}
		}
		
		return groups;
	};
	
	this.groupByHour = function(){
		
		var groups = {};
		var obsels = this.obsels;
				
		for(var i in obsels){
			
			var obsel = obsels[i];
			
			var date = new Date(obsel.begin);
			
			var hour = moment(date).startOf("hour").valueOf()+"";
			
			if(groups[hour]){
				groups[hour].push(obsel);
			}
			else{
				groups[hour] = [obsel];				
			}
		}
		
		return groups;
	};
	
	this.groupByMinute = function(){
		
		var groups = {};
		var obsels = this.obsels;
		
		for(var i in obsels){
			
			var obsel = obsels[i];
			
			var date = new Date(obsel.begin);
			
			var minute = moment(date).startOf("minute").valueOf()+"";
			
			if(groups[minute]){
				groups[minute].push(obsel);
			}
			else{
				groups[minute] = [obsel];				
			}
		}
		
		return groups;
	};
	
	this.groupByType = function(){
		var groups = {};
		var obsels = this.obsels;
				
		for(var i in obsels){
			
			var obsel = obsels[i];
						
			var type = obsel.type;
			
			if(groups[type]){
				groups[type].push(obsel);
			}
			else{
				groups[type] = [obsel];				
			}
		}
		
		return groups;
	};
	
	this.count = function(){
		var obsels = this.obsels;
		var count = obsels.length;
		return count;		
	};
	
	this.groupByWordSelectCorrection = function(){
		
	};
	
};