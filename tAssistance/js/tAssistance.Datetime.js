tAssistance.Datetime = {
	in_array: function(array, date){
		for(var i=0;i<array.length;i++) {
	    	 if(array[i].getTime() === date.getTime()) 
	    		 return true;
	    }
	    return false;
	},
	indexOf: function(array, date){
		for(var i=0;i<array.length;i++) {
	    	 if(array[i].getTime() === date.getTime()) 
	    		 return i;
	    }
	    return -1;
	},
	units: [1000*60*60*24*365
	        ,1000*60*60*24*30*6
	        ,1000*60*60*24*30*3
	        ,1000*60*60*24*30
	        ,1000*60*60*24*7
	        ,1000*60*60*24*4
	        ,1000*60*60*24
	        ,1000*60*60*12
	        ,1000*60*60*6
	        ,1000*60*60*3
	        ,1000*60*60
	        ,1000*60*30
	        ,1000*60*15
	        ,1000*60*5
	        ,1000*60
	        ,1000*30
	        ,1000*15
	        ,1000*5
	        ,1000
	        ,500
	        ],
	unitTexts: ["year"
	            ,"6 months"
	            ,"3 months"
	            ,"month"
	            ,"week"
	            ,"4 days"
	            ,"day"
	            ,"12 hours"
	            ,"6 hours"
	            ,"3 hours"
	            ,"hour"
	            ,"30 minutes"
	            ,"15 minutes"
	            ,"5 minutes"
	            ,"minute"
	            ,"30 seconds"
	            ,"15 seconds"
	            ,"5 seconds"
	            ,"second"
	            ,"0.5s"
	            ],
	utc2LocalDate: function(utcTime){
		var date = new Date(0);// UTC epoch
		var seconds = Math.floor(utcTime/1000);
		date.setUTCSeconds(seconds, utcTime % 1000);
		return date;
	},
	dates: {
			en: {
				days:        ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
				daysShort:   ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
				daysMin:     ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
				months:      ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
				monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
				meridiem:    ["am", "pm"],
				suffix:      ["st", "nd", "rd", "th"],
				today:       "Today"
			}// other languages
		},
	split: function (date) {
		var dates = tAssistance.Datetime.dates;
		var language = "en";
		if (date == null) {
			return '';
		}
		var val;
		val = {
			// year
			yy:   date.getFullYear().toString().substring(2),
			yyyy: date.getFullYear(),
			// month
			m:    date.getMonth() + 1,
			M:    dates[language].monthsShort[date.getMonth()],
			MM:   dates[language].months[date.getMonth()],
			// day
			d:    date.getDate(),
			D:    dates[language].daysShort[date.getDay()],
			DD:   dates[language].days[date.getDay()],
			p:    (dates[language].meridiem.length == 2 ? dates[language].meridiem[date.getHours() < 12 ? 0 : 1] : ''),
			// hour
			h:    date.getHours(),
			// minute
			i:    date.getMinutes(),
			// second
			s:    date.getSeconds()
		};

		if (dates[language].meridiem.length == 2) {
			val.H = (val.h % 12 == 0 ? 12 : val.h % 12);
		}
		else {
			val.H = val.h;
		}
		val.HH = (val.H < 10 ? '0' : '') + val.H;
		val.P = val.p.toUpperCase();
		val.hh = (val.h < 10 ? '0' : '') + val.h;
		val.ii = (val.i < 10 ? '0' : '') + val.i;
		val.ss = (val.s < 10 ? '0' : '') + val.s;
		val.dd = (val.d < 10 ? '0' : '') + val.d;
		val.mm = (val.m < 10 ? '0' : '') + val.m;
					
		return val;
	},
	splitUTC: function (date) {
		var dates = tAssistance.Datetime.dates;
		var language = "en";
		if (date == null) {
			return '';
		}
		var val;
		val = {
			// year
			yy:   date.getUTCFullYear().toString().substring(2),
			yyyy: date.getUTCFullYear(),
			// month
			m:    date.getUTCMonth() + 1,
			M:    dates[language].monthsShort[date.getUTCMonth()],
			MM:   dates[language].months[date.getUTCMonth()],
			// day
			d:    date.getUTCDate(),
			D:    dates[language].daysShort[date.getUTCDay()],
			DD:   dates[language].days[date.getUTCDay()],
			p:    (dates[language].meridiem.length == 2 ? dates[language].meridiem[date.getUTCHours() < 12 ? 0 : 1] : ''),
			// hour
			h:    date.getUTCHours(),
			// minute
			i:    date.getUTCMinutes(),
			// second
			s:    date.getUTCSeconds()
		};

		if (dates[language].meridiem.length == 2) {
			val.H = (val.h % 12 == 0 ? 12 : val.h % 12);
		}
		else {
			val.H = val.h;
		}
		val.HH = (val.H < 10 ? '0' : '') + val.H;
		val.P = val.p.toUpperCase();
		val.hh = (val.h < 10 ? '0' : '') + val.h;
		val.ii = (val.i < 10 ? '0' : '') + val.i;
		val.ss = (val.s < 10 ? '0' : '') + val.s;
		val.dd = (val.d < 10 ? '0' : '') + val.d;
		val.mm = (val.m < 10 ? '0' : '') + val.m;
					
		return val;
	}
};