/*
	require jQuery
*/

	/** @namespace */
	//tAssistance = {};
			
tAssistance.Util = {

	getMonths_svg: function(svgObsels){
		var months = [];
		for(var i=0;i<svgObsels.length;i++){
			var svgObsel = svgObsels[i];
			// get dateTime from begin				
			var obsel = svgObsel.data["obsel"];
			// get dateTime from begin
			var date = tAssistance.Datetime.utc2LocalDate(obsel.begin);
			// reset date and time to zero 
			date.setDate(1);
			date.setHours(0,0,0,0);
			
			if(!tAssistance.Datetime.in_array(months,date)){
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
			var date = tAssistance.Datetime.utc2LocalDate(obsel.begin);
			// reset all things in a date to zero				
			date.setHours(0,0,0,0);
			
			if(!tAssistance.Datetime.in_array(dates,date)){
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
			var date = tAssistance.Datetime.utc2LocalDate(obsel.begin);
			// reset minute to zero 
			date.setMinutes(0,0,0);
			
			if(!tAssistance.Datetime.in_array(hours,date)){
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
			var date = tAssistance.Datetime.utc2LocalDate(obsel.begin);
			// reset minute to zero 
			date.setSeconds(0,0);
			
			if(!tAssistance.Datetime.in_array(minutes,date)){
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
			var date = tAssistance.Datetime.utc2LocalDate(obsel.begin);
			// reset minute to zero 
			date.setMilliseconds(0);
			
			if(!tAssistance.Datetime.in_array(seconds,date)){
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
			var date = tAssistance.Datetime.utc2LocalDate(obsel.begin);
			// reset milliseconds to 0.x00 
			date.setMilliseconds(Math.floor(date.getMilliseconds()/100)*100);
			
			if(!tAssistance.Datetime.in_array(_01seconds,date)){
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
			var date = tAssistance.Datetime.utc2LocalDate(obsel.begin);
			// reset minute to zero 
			date.setMinutes(0,0,0);
			
			if(!tAssistance.Datetime.in_array(hours,date)){
				hours.push(date);
			}
		}
		if(tAssistance.debug){
			window.hours = hours;
		}
		return hours;
	},
	parse_transform: function(g_dom){
		// parse the transform property
		  var charTransformSplit = ' ';
		  var charNumberSplit = ' ';
	      
		  var transform = g_dom.getAttribute('transform');
	      var translate = transform.split(')'+charTransformSplit)[0]+')';
	      var translateValues = translate.replace("translate(","").slice(0,-1).split(charNumberSplit);
	      var scale = transform.split(')'+charTransformSplit)[1];
	      var scaleValues = scale.replace("scale(","").slice(0,-1).split(charNumberSplit);
	      var translate_x = 0;
	      var translate_y = 0;
	      var scale_x = 0;
	      var scale_y = 0;
	      
	      translate_x = parseFloat(translateValues[0]);	// Represent the x-coordinate on the transform attribute.
	      if(translateValues.length>1){
	    	  translate_y = parseFloat(translateValues[1]);	// Represent the y coordinate on the transform attribute.
		  }
	      else{// IE
	    	  translate_y = translate_x;
	      }
	      
	      scale_x = parseFloat(scaleValues[0]); // Represent the x-scale on the transform attribute.
	      if(scaleValues.length>1){
	    	  scale_y = parseFloat(scaleValues[1]);	// Represent the y scale on the transform attribute.
		  }
	      else{// IE
	    	  scale_y = scale_x;
	      }	      
	      
	      ret = {
	          "translate.x": translate_x,
	          "translate.y": translate_y,
	          "scale.x": scale_x,
	          "scale.y": scale_y
	      };
	      return ret;	      
	 },
	make_transform_str: function(transform_obj){
			var charTransformSplit = ' ';
			var charNumberSplit = ' ';
			
			return "translate("+transform_obj["translate.x"]+charNumberSplit+transform_obj["translate.y"]+") scale("+transform_obj["scale.x"]+charNumberSplit+transform_obj["scale.y"]+")";		
	},

};
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	