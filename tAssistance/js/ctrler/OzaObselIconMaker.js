tAssistance.OzaObselIconMaker = function(params){
	
	var userconfig = params.userconfig;
	
//	var userconfig = {
//	    "type": "user",
//	    "id": "alain",
//	    "configs": [
//	      {
//	        "type": "config",
//	        "id": "timeline",
//	        "obsels": [
//	          {
//	            "type": "obselType",
//	            "id": "oze_idg",
//	            "icon": "oze_idg",
//	            "title": "Open a dialog",
//	            "select": "select obsel",
//	            "ofilter": "obsel.type = 'oze_idg'",
//	            "active": true,
//	            "properties": [
//	              {
//	                "class": "property",
//	                "type": "string",
//	                "name": "id",
//	                "contraint": {
//	                  "class": "contraint",
//	                  "name": "string",
//	                  "text": " > 10",
//	                  "min": "1",
//	                  "max": "3",
//	                  "clicked": true,
//	                  "regex": "o"
//	                }
//	              },
//	              {
//	                "class": "property",
//	                "type": "number",
//	                "name": "begin",
//	                "contraint": {
//	                  "class": "contraint",
//	                  "name": "number",
//	                  "text": " > 10",
//	                  "min": "7",
//	                  "max": null,
//	                  "clicked": true
//	                }
//	              },
//	              {
//	                "class": "property",
//	                "type": "number",
//	                "name": "end",
//	                "contraint": {
//	                  "class": "contraint",
//	                  "name": "number",
//	                  "text": " > 10",
//	                  "min": 10,
//	                  "max": null,
//	                  "clicked": true,
//	                  "regex": "alain1"
//	                }
//	              }
//	            ],
//	            "icon_img": "img/oze_idg.png"
//	          },
//	          {
//	            "type": "obselType",
//	            "id": "oze_view",
//	            "icon": "oze_view",
//	            "title": "Open a view",
//	            "active": true,
//	            "select": "select obsel",
//	            "ofilter": "obsel.type = 'oze_idg'",
//	            "properties": [
//	              {
//	                "class": "property",
//	                "type": "string",
//	                "name": "begin",
//	                "contraint": {
//	                  "class": "contraint",
//	                  "name": "number",
//	                  "text": " > 10",
//	                  "min": 10,
//	                  "max": null
//	                }
//	              }
//	            ],
//	            "icon_img": "img/oze_view.png"
//	          },
//	          {
//	            "type": "obselType",
//	            "id": "ozec_w",
//	            "icon": "ozec_w",
//	            "title": "Correct a word",
//	            "active": true,
//	            "select": "select obsel",
//	            "ofilter": "obsel.type = 'oze_idg'",
//	            "properties": [
//	              {
//	                "class": "property",
//	                "type": "string",
//	                "name": "begin",
//	                "contraint": {
//	                  "class": "contraint",
//	                  "name": "number",
//	                  "text": " > 10",
//	                  "min": 10,
//	                  "max": null
//	                }
//	              }
//	            ],
//	            "icon_img": "img/ozec_w.png"
//	          }
//	        ],
//	        "icons": [
//	          {
//	            "class": "icon",
//	            "id": "oze_idg",
//	            "icon-type": "image",
//	            "title": "Open a dialog",
//	            "img": "img/oze_idg.png",
//	            "active": true
//	          },
//	          {
//	            "class": "icon",
//	            "id": "oze_view",
//	            "icon-type": "image",
//	            "title": "Open a view",
//	            "img": "img/oze_view.png",
//	            "active": true
//	          },
//	          {
//	            "class": "icon",
//	            "id": "ozec_w",
//	            "icon-type": "image",
//	            "title": "Correct a word",
//	            "img": "img/ozec_w.png",
//	            "active": true
//	          }
//	        ]
//	      }
//	    ]
//	  }
	
	var obsels = userconfig.configs[0].obsels;
	var new_obsel = params.obsel;
	var x = params.x;
	
	var PropertyTester = function(params){
		var property = params.property;
		var name = property.name;
		var contraint = property.contraint;
		var obsel = params.obsel;
		
		var tester = function(obsel){
			return true;
		};
		
		var ok = false;
		
		if(contraint.name=="string"){
			try{
				var ok =  obsel[name].indexOf(contraint.regex) != -1;
				return ok;
			}
			catch(e){
				
			}
		}else if(contraint.name=="number"){	
			try{
				var ok =  obsel[name] > contraint.min;
				return ok;			
			}
			catch(e){
				
			}
		}
		return ok;
	};
	
	var ObselTester = function(params){
		var obsel = params.obsel;
		var properties = obsel.properties;
		var new_obsel = params.new_obsel;
		
		var tester = true;
		var testers = [];
		var ok = true;
		
		for(var i in properties){
			var property = properties[i];
			
			var params = {
				"property": property,
				"obsel": new_obsel
			}
			
			var property_ok = PropertyTester(params);
			
			ok = ok && property_ok;
		}
		
		return ok;
	};
//		
//	for(var i in obsels){
//		var obsel = obsels[i];
//		
//		var params = {
//			"obsel": obsel
//		};
//		
//		var tester = ObselTesterMaker(params);
//		
//		contraintFunclist.push(contraintFunc);
//	}
//	
//	var contraintFunclist = [];
	
//	for(var i in properties){
//		var property = properties[i];
//		
//		var params = {
//			"property": property			
//		};
//		
//		var contraintFunc = ObselPropertyContraintMaker(params);
//		
//		contraintFunclist.push(contraintFunc);
//	}
//	
//	
//	
//	var obselContraintTesterMaker = function(obsel_config){
//		
//		
//	}
		
	var obselIconFunc = function(new_obsel, obsels){
		//var obsels = userconfig.obsels;
		
		for(var i in obsels){
			var obselConfig = obsels[i]; 
			
			if(new_obsel.type==obselConfig.id){
				if(obselConfig.active==true){
					var params = {
						"obsel": obselConfig,
						"new_obsel": new_obsel
					}
					var ok = ObselTester(params);
					
					if(ok==true){
						var params = {
							"img": obselConfig.icon 
						}
						var icon = tAssistance.dom.OzaObselIcon(params);
						return icon;
					}
				}				
			}
		}
		
		return false;	
	};
	
	var icon = obselIconFunc(new_obsel, obsels);
	
	return icon;
};

