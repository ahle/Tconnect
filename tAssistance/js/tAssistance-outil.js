/*
	require jQuery
*/

	/** @namespace */
	//tAssistance = {};
			
tAssistance.outil = {

	getMonths_svg: function(svgObsels){
		var months = [];
		for(var i=0;i<svgObsels.length;i++){
			var svgObsel = svgObsels[i];
			// get dateTime from begin				
			var obsel = svgObsel.data["obsel"];
			// get dateTime from begin
			var date = tAssistance.datetime.utc2LocalDate(obsel.begin);
			// reset date and time to zero 
			date.setDate(1);
			date.setHours(0,0,0,0);
			
			if(!tAssistance.datetime.in_array(months,date)){
				months.push(date);
			}
		}
		if(tAssistance.debug){
			window.months = months;
		}
		return months;
	},
	getDates_svg: function(svgObsels){
		var dates = [];
		for(var i=0;i<svgObsels.length;i++){
			var svgObsel = svgObsels[i];
			// get dateTime from begin				
			var obsel = svgObsel.data["obsel"];
			// get dateTime from begin
			var date = tAssistance.datetime.utc2LocalDate(obsel.begin);
			// reset all things in a date to zero				
			date.setHours(0,0,0,0);
			
			if(!tAssistance.datetime.in_array(dates,date)){
				dates.push(date);
			}
		}
		if(tAssistance.debug){
			window.dates = dates;
		}
		return dates;
	},
	getHours_svg: function(svgObsels){
		
		var hours = [];
		for(var i=0;i<svgObsels.length;i++){
			var svgObsel = svgObsels[i];
			var obsel = svgObsel.data["obsel"];
			// get dateTime from begin
			var date = tAssistance.datetime.utc2LocalDate(obsel.begin);
			// reset minute to zero 
			date.setMinutes(0,0,0);
			
			if(!tAssistance.datetime.in_array(hours,date)){
				hours.push(date);
			}
		}
		if(tAssistance.debug){
			window.hours = hours;
		}
		return hours;
	},
	getMinutes_svg: function(svgObsels){
		var minutes = [];
		for(var i=0;i<svgObsels.length;i++){
			var svgObsel = svgObsels[i];
			// get dateTime from begin				
			var obsel = svgObsel.data["obsel"];
			// get dateTime from begin
			var date = tAssistance.datetime.utc2LocalDate(obsel.begin);
			// reset minute to zero 
			date.setSeconds(0,0);
			
			if(!tAssistance.datetime.in_array(minutes,date)){
				minutes.push(date);
			}
		}
		if(tAssistance.debug){
			window.minutes = minutes;
		}
		return minutes;
	},
	getSeconds_svg: function(svgObsels){
		var seconds = [];
		for(var i=0;i<svgObsels.length;i++){
			var svgObsel = svgObsels[i];
			// get dateTime from begin				
			var obsel = svgObsel.data["obsel"];
			// get dateTime from begin
			var date = tAssistance.datetime.utc2LocalDate(obsel.begin);
			// reset minute to zero 
			date.setMilliseconds(0);
			
			if(!tAssistance.datetime.in_array(seconds,date)){
				seconds.push(date);
			}
		}
		if(tAssistance.debug){
			window.seconds = seconds;
		}
		return seconds;
	},
	get01Seconds_svg: function(svgObsels){
		var _01seconds = [];
		for(var i=0;i<svgObsels.length;i++){
			var svgObsel = svgObsels[i];
			// get dateTime from begin				
			var obsel = svgObsel.data["obsel"];
			// get dateTime from begin
			var date = tAssistance.datetime.utc2LocalDate(obsel.begin);
			// reset milliseconds to 0.x00 
			date.setMilliseconds(Math.floor(date.getMilliseconds()/100)*100);
			
			if(!tAssistance.datetime.in_array(_01seconds,date)){
				_01seconds.push(date);
			}
		}
		if(tAssistance.debug){
			window._01seconds = _01seconds;
		}
		return _01seconds;
	},
	getHours: function(obsels){
		var hours = [];
		for(var i=0;i<obsels.length;i++){
			// get dateTime from begin				
			var obsel = obsels[i];
			// get dateTime from begin
			var date = tAssistance.datetime.utc2LocalDate(obsel.begin);
			// reset minute to zero 
			date.setMinutes(0,0,0);
			
			if(!tAssistance.datetime.in_array(hours,date)){
				hours.push(date);
			}
		}
		if(tAssistance.debug){
			window.hours = hours;
		}
		return hours;
	},
};
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	